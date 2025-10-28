"use client";
import React, { useState, useEffect, useRef } from "react";
import { GameBoard } from "./GameBoard";
import { DealerDisplay } from "./DealerDisplay";
import { WinnerModal } from "./WinnerModal";
import { Button } from "@/components/ui/button";
import { Card as CardType, generateBoard, createDeck, checkWin, CARDS } from "@/lib/loteria";
import { Play, RotateCw, LogOut, Volume2, VolumeOff } from "lucide-react";
import { PlayerList } from "./PlayerList";
import { updateRoom } from "@/lib/firebaseRoom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IdleModal } from "./IdleModal";
import { getRestriction } from "@/lib/loteria";
import { cantarCarta, cantarCartaConAudio } from "@/lib/cantadito";
import { ModeRequiredModal } from "./ModeRequiredModal"; // <-- añadido
import { ResponsiveScale } from "@/components/ResponsiveScale";

interface LoteriaGameProps {
  roomId: string;
  playerName: string;
  roomData: any;
}

const GAME_MODE_LABELS: Record<string, string> = {
  full: "Tradicional",
  horizontal: "Filas",
  vertical: "Columnas",
  diagonal: "Diagonales",
  corners: "Esquinas",
  square: "Cuadrado",
};

export function LoteriaGame({ roomId, playerName, roomData }: LoteriaGameProps) {
  const [ranking, setRanking] = useState<{ name: string; seleccionadas: number }[]>([]);
  const gameState = roomData?.gameState ?? null;
  const allPlayers = roomData?.players ?? {};
  const rawPlayer = allPlayers[playerName];
  const player = rawPlayer
    ? { ...rawPlayer, markedIndices: Array.isArray(rawPlayer.markedIndices) ? rawPlayer.markedIndices : [] }
    : undefined;
  const isHost = gameState?.host === playerName;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  // Restricciones de marcado según modo de juego
  const [firstCard, setFirstCard] = useState<{ row: number; col: number } | null>(null);

  // Manejo de inactividad
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showIdleModal, setShowIdleModal] = useState(false);

  // Cantadito
  const [cantaditoActivo, setCantaditoActivo] = useState(false);

  const [showModeModal, setShowModeModal] = useState(false); // <-- añadido

  // Actualiza ranking cuando hay ganador
  useEffect(() => {
    if (roomData?.gameState?.winner) {
      const rankingArr = Object.values(roomData.players)
        .map((p: any) => ({
          name: p.name,
          seleccionadas: Array.isArray(p.markedIndices) ? p.markedIndices.length : 0,
        }))
        .sort((a, b) => b.seleccionadas - a.seleccionadas);
      setRanking(rankingArr);
    }
  }, [roomData]);

  // Marcar carta
  const handleCardClick = async (card: CardType, index: number) => {
    if (!player || roomData.gameState.winner || !roomData.gameState.calledCardIds) return;
    const { calledCardIds } = roomData.gameState;
    const isCalled = calledCardIds.includes(card.id);

    const row = Math.floor(index / 4);
    const col = index % 4;

    // Bloquear clics fuera de la restricción del modo
    if (!isAllowed({ row, col })) return;

    // Si es la primera carta y el modo no es "full", la guardamos
    if (!firstCard && isCalled) {
      setFirstCard({ row, col });
    }

    if (isCalled && !player.markedIndices.includes(index)) {
      const newMarkedIndices = [...player.markedIndices, index].sort((a, b) => a - b);
      const updatedPlayers = {
        ...roomData.players,
        [playerName]: { ...player, markedIndices: newMarkedIndices }
      };

      let winner = roomData.gameState.winner;
      let isGameActive = roomData.gameState.isGameActive;
      if (checkWin(newMarkedIndices, player.board, calledCardIds, roomData.gameState.gameMode)) {
        winner = playerName;
        isGameActive = false;
      }

      await updateRoom(roomId, {
        players: updatedPlayers,
        gameState: {
          ...roomData.gameState,
          winner: winner ?? null,
          isGameActive,
        }
      });
    }
  };



  // Iniciar juego (solo host)
  const startGame = async () => {
    if (!isHost) return;

    if (!selectedMode) {
      //alert("Debes seleccionar un modo de juego antes de iniciar.");
      setShowModeModal(true); // <-- ahora abre modal en lugar de alert
      return;
    }

    const newDeck = createDeck();
    const updatedPlayers = { ...roomData.players };
    Object.keys(updatedPlayers).forEach(pName => {
      updatedPlayers[pName].markedIndices = [];
    });

    await updateRoom(roomId, {
      players: updatedPlayers,
      gameState: {
        ...roomData.gameState,
        deck: newDeck,
        calledCardIds: [newDeck[0].id],
        isGameActive: true,
        winner: null,
        gameMode: selectedMode, // asegúrate que se use
        timestamp: Date.now()
      }
    });

    setRanking([]);
    setFirstCard(null);
  };


  // Reiniciar juego (solo host)
  const resetGame = async () => {
    if (!isHost) return;

    const updatedPlayers = { ...roomData.players };
    Object.keys(updatedPlayers).forEach(pName => {
      updatedPlayers[pName].board = generateBoard();
      updatedPlayers[pName].markedIndices = [];
    });

    await updateRoom(roomId, {
      players: updatedPlayers,
      gameState: {
        host: playerName,
        isGameActive: false,
        winner: null,
        deck: [],
        calledCardIds: [],
        gameMode: null, // limpia el modo en Firebase
        timestamp: Date.now()
      }
    });

    setRanking([]);
    setFirstCard(null);
    setSelectedMode(""); // resetea el Select
  };


  // Cantada automática de cartas (solo host)
  useEffect(() => {
    if (
      isHost &&
      gameState?.isGameActive &&
      !gameState?.winner &&
      Array.isArray(gameState.deck) &&
      Array.isArray(gameState.calledCardIds)
    ) {
      if (gameState.calledCardIds.length >= gameState.deck.length) return;

      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(async () => {
        // Obtén el estado más reciente
        if (
          !gameState.isGameActive ||
          gameState.winner ||
          gameState.calledCardIds.length >= gameState.deck.length
        ) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return;
        }
        const nextIndex = gameState.calledCardIds.length;
        const newCalledCardIds = [
          ...gameState.calledCardIds,
          gameState.deck[nextIndex].id,
        ];
        await updateRoom(roomId, {
          gameState: {
            ...gameState,
            calledCardIds: newCalledCardIds,
          },
        });
      }, 3500); // <-- 3.5 segundos entre cartas CAMBIAR
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [
    isHost,
    gameState?.isGameActive,
    gameState?.winner,
    gameState?.deck,
    gameState?.calledCardIds,
    roomId,
  ]);

  if (!player || !gameState || !player.board) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-64">
        <p className="text-xl text-muted-foreground">Cargando sala, un momento...</p>
      </div>
    );
  }

  const calledCards = Array.isArray(gameState.calledCardIds)
    ? gameState.calledCardIds.map(id => CARDS.find(c => c.id === id)).filter(Boolean) as CardType[]
    : [];
  const currentCard = calledCards.length > 0 ? calledCards[calledCards.length - 1] : null;
  const uniqueHistory = calledCards.filter(
    (card, index, self) => self.findIndex(c => c.id === card.id) === index
  );
  /*
  // Efecto para cantar la carta con voz tipo jaws
  useEffect(() => {
    if (cantaditoActivo && currentCard?.description) {
      cantarCarta(currentCard.description, currentCard.name);
    }
  }, [currentCard, cantaditoActivo]);
  */

  useEffect(() => {
    if (cantaditoActivo && currentCard?.description) {
      cantarCartaConAudio(currentCard);
    }
  }, [currentCard, cantaditoActivo]);


  // Reiniciar solo la tabla del jugador actual
  const resetPlayerBoard = async () => {
    if (!player) return;
    const updatedPlayers = {
      ...roomData.players,
      [playerName]: {
        ...player,
        board: generateBoard(),
        markedIndices: [],
      }
    };
    await updateRoom(roomId, {
      players: updatedPlayers,
    });
    setRanking([]);
  };

  // Manejo de inactividad
  useEffect(() => {
    const resetActivity = () => setLastActivity(Date.now());

    window.addEventListener("click", resetActivity);
    window.addEventListener("keydown", resetActivity);
    window.addEventListener("mousemove", resetActivity);

    return () => {
      window.removeEventListener("click", resetActivity);
      window.removeEventListener("keydown", resetActivity);
      window.removeEventListener("mousemove", resetActivity);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() - lastActivity > 90_000) { // tiempo de inactividad (1m 30s)
        setShowIdleModal(true);
      }
    }, 15_000); // si no hay actividad, sale 15s después

    return () => clearInterval(interval);
  }, [lastActivity]);


  // Cuando el juego termina, resetea la carta inicial en todos los jugadores
  useEffect(() => {
    // Cuando el juego termina, resetea la carta inicial en todos los jugadores
    if (!gameState.isGameActive) {
      setFirstCard(null);
    }
  }, [gameState.isGameActive]);

  // Función que determina si una carta es clickeable según el modo y la primera carta seleccionada
  const isAllowed = (card: { row: number; col: number }) => {
    const idx = card.row * 4 + card.col;

    // Diagonales: solo permite las cartas de las diagonales antes de seleccionar la primera carta
    if (roomData?.gameState?.gameMode === "diagonal" && !firstCard) {
      const diagonalIndices = [0, 5, 10, 15, 3, 6, 9, 12];
      return diagonalIndices.includes(idx);
    }

    // Esquinas: solo permite las cartas de las esquinas
    if (roomData?.gameState?.gameMode === "corners") {
      const cornerIndices = [0, 3, 12, 15];
      return cornerIndices.includes(idx);
    }


    // Cuadrado central: solo permite las cartas del cuadrado central
    if (roomData?.gameState?.gameMode === "square") {
      const squareIndices = [5, 6, 9, 10];
      return squareIndices.includes(idx);
    }

    /*
    // Cuadrado dinámico: usa getRestriction para cuadrado
    if (roomData?.gameState?.gameMode === "square") {
      const restriction = getRestriction("square", firstCard);
      return restriction(card);
    }
      */

    // Otros modos
    if (!firstCard) return true;
    const restriction = getRestriction(roomData?.gameState?.gameMode || "full", firstCard);
    return restriction(card);
  };

  const [selectedMode, setSelectedMode] = useState<string>(""); // empieza vacío


  return (
    <>
      <ResponsiveScale minWidth={1400} maxScale={1.45}>
        {/* Grid principal: cambia de 1 columna en móvil a 12 columnas en escritorio */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 w-full">

          {/* PLAYER LIST - izquierda */}
          <div className="flex justify-center col-span-1 md:col-span-3">
            {/* Contenedor responsivo para ajustar tamaño según el viewport */}
            <div className="w-[clamp(160px,18vw,260px)]">
              {/* Lista de jugadores */}
              <PlayerList
                players={allPlayers}
                currentPlayerName={playerName}
                hostName={gameState.host || ""}
                roomId={roomId}
              />

              {/* Botones de control del juego */}
              <div className="mt-4 flex flex-col gap-2">
                {/* Solo lo ve el anfitrión */}
                {isHost && (
                  <>
                    {/* Botón para iniciar juego */}
                    <Button onClick={startGame} disabled={gameState.isGameActive || !!gameState.winner}>
                      <Play className="mr-2" />
                      Iniciar Juego
                    </Button>
                    {/* Botón para terminar juego activo */}
                    {gameState.isGameActive && !gameState.winner && (
                      <Button
                        onClick={async () => {
                          if (!isHost) return;

                          // Reinicia solo cartas y firstCard, pero conserva el modo
                          const updatedPlayers = { ...roomData.players };
                          Object.keys(updatedPlayers).forEach(pName => {
                            updatedPlayers[pName].markedIndices = [];
                          });

                          await updateRoom(roomId, {
                            players: updatedPlayers,
                            gameState: {
                              ...gameState,
                              isGameActive: false,
                              winner: null,
                              calledCardIds: [],
                            }
                          });

                          setFirstCard(null); // reinicia carta inicial
                        }}
                        variant="destructive"
                      >
                        Terminar Juego
                      </Button>
                    )}

                    {/* Cambio de tipo de juego */}
                    <Select
                      value={selectedMode}
                      onValueChange={async (value) => {
                        setSelectedMode(value);
                        setFirstCard(null); // resetea la carta inicial al cambiar modo
                        await updateRoom(roomId, {
                          gameState: {
                            ...roomData.gameState,
                            gameMode: value,
                          },
                        });
                      }}
                    >
                      <SelectTrigger className="w-full" disabled={gameState.isGameActive}>
                        <SelectValue placeholder="Seleccionar modo de juego" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(GAME_MODE_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>{label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>


                  </>
                )}

                {/* Botón para reiniciar la tabla del jugador actual */}
                <Button onClick={resetPlayerBoard} variant="outline" disabled={gameState.isGameActive}>
                  <RotateCw className="mr-2" />
                  Nueva Tabla
                </Button>

                {/* Mensaje para jugadores que no son anfitrión */}
                {!isHost && gameState.host && !gameState.isGameActive && !gameState.winner && (
                  <p className="text-center text-muted-foreground p-2 bg-muted">
                    <span className="font-bold">{gameState.host || "Anfitrión"}</span> es el anfitrión. Esperando...
                  </p>
                )}

                {/* Mensaje de modo de juego */}
                {!isHost && gameState.gameMode && (
                  <div className="mt-2 p-2 bg-primary/50 border border-primary/20 text-center">
                    <p className="text-sm">
                      Modo: <span className="font-semibold">
                        {GAME_MODE_LABELS[gameState.gameMode] || gameState.gameMode}
                      </span>
                    </p>
                  </div>
                )}

                {/* Botón Cantadito */}
                <Button
                  variant={cantaditoActivo ? "default" : "outline"}
                  onClick={() => setCantaditoActivo((prev) => !prev)}
                >
                  {cantaditoActivo ? (
                    <>
                      <VolumeOff className="mr-2" />
                      Cantadito
                    </>
                  ) : (
                    <>
                      <Volume2 className="mr-2" />
                      Cantadito
                    </>
                  )}
                </Button>

              </div>
            </div>
          </div>

          {/* COLUMNA CENTRAL: historial + carta actual */}
          <div className="flex flex-col items-center gap-6 col-span-1 md:col-span-5">
            {/* Contenedor con ancho responsivo compartido */}
            <div className="w-[clamp(180px,17vw,250px)] md:w-[clamp(140px,18vw,250px)]">
              {/* HISTORIAL (solo 3 cartas recientes) */}
              <DealerDisplay
                currentCard={null}
                history={uniqueHistory.slice(-3)} // 3 últimas cartas
                showCurrentCard={false}
                showHistory={true}
              />
            </div>
            <div className="w-[clamp(180px,17vw,250px)] md:w-[clamp(140px,18vw,250px)] aspect-[3/4]">
              {/* CARTA ACTUAL */}
              <DealerDisplay
                currentCard={currentCard}
                showCurrentCard={true}
                showHistory={false}
              />
            </div>
          </div>


          {/* TABLERO + BOTÓN - derecha (reemplaza la sección anterior del tablero y el botón flotante) */}
          <div className="flex justify-center col-span-1 md:col-span-4">
            <div className="relative">
              {/* Contenedor responsivo del tablero.
                  En pantallas md+ añadimos padding-bottom para reservar espacio
                  y que el botón pueda situarse "debajo" del tablero dentro del recuadro. */}
              <div className="md:pb-12">
                <div className="w-[clamp(220px,28vw,400px)] aspect-[265/380]">
                  <GameBoard
                    board={player.board}
                    onCardClick={handleCardClick}
                    markedIndices={player.markedIndices}
                    calledCardIds={Array.isArray(gameState.calledCardIds) ? gameState.calledCardIds : []}
                    isAllowed={isAllowed}
                  />
                </div>
              </div>

              {/* Botón dentro del recuadro: en md+ se posiciona absolute bottom-right (dentro del padding que añadimos) */}
              <div className="hidden md:flex absolute right-0 bottom-0 z-20">
                <Button
                  size="icon"
                  className="bg-[#D4165C] text-white hover:bg-[#AA124A] border-2 border-primary"
                  onClick={() => { window.location.href = "/"; }}
                  aria-label="Salir de la sala"
                >
                  <LogOut />
                </Button>
              </div>

              {/* Botón debajo del tablero en móvil (1 columna) */}
              <div className="mt-3 md:hidden flex justify-center">
                <Button
                  size="sm"
                  className="bg-[#D4165C] text-white hover:bg-[#AA124A] border-2 border-primary"
                  onClick={() => { window.location.href = "/"; }}
                >
                  <LogOut />
                  
                </Button>
              </div>
            </div>
          </div>

          {/* Deja modales y botones flotantes fuera del wrapper */}
          {/* Modal que indica que se debe seleccionar modo */}
          <ModeRequiredModal open={showModeModal} onClose={() => setShowModeModal(false)} />

          {/* Modal que muestra el ganador */}
          <WinnerModal
            open={!!gameState.winner}
            ranking={ranking}
            gameMode={gameState.gameMode}
            onRestart={isHost ? resetGame : undefined}
          />
          
          {/* Modal de inactividad */}
          <IdleModal
            open={showIdleModal}
            onStay={() => {
              setShowIdleModal(false);
              setLastActivity(Date.now());
            }}
            onExit={() => {
              window.location.href = "/"; // vuelve al login
            }}
          />

        </div>
      </ResponsiveScale>

    </>
  );
}