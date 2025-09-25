"use client";
import React, { useState, useEffect, useRef } from "react";
import { GameBoard } from "./GameBoard";
import { DealerDisplay } from "./DealerDisplay";
import { WinnerModal } from "./WinnerModal";
import { Button } from "@/components/ui/button";
import { Card as CardType, generateBoard, createDeck, checkWin, CARDS } from "@/lib/loteria";
import { Play, RotateCw } from "lucide-react";
import { PlayerList } from "./PlayerList";
import { updateRoom } from "@/lib/firebaseRoom";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


interface LoteriaGameProps {
  roomId: string;
  playerName: string;
  roomData: any;
}

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

    if (isCalled && !player.markedIndices.includes(index)) {
      const newMarkedIndices = [...player.markedIndices, index].sort((a, b) => a - b);
      const updatedPlayers = {
        ...roomData.players,
        [playerName]: { ...player, markedIndices: newMarkedIndices }
      };

      let winner = roomData.gameState.winner;
      let isGameActive = roomData.gameState.isGameActive;
      if (checkWin(newMarkedIndices, player.board, calledCardIds)) {
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
        timestamp: Date.now()
      }
    });
    setRanking([]);
  };

  // Reiniciar juego (solo host)
  const resetGame = async () => {
    if (!isHost) return;
    const newDeck = createDeck();
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
        timestamp: Date.now()
      }
    });
    setRanking([]);
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
      }, 5000); // <-- 5 segundos entre cartas
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


  return (
    <>
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
                        await updateRoom(roomId, {
                          gameState: { ...gameState, isGameActive: false },
                        });
                      }}
                      variant="destructive"
                    >
                      Terminar Juego
                    </Button>
                  )}
                </>
              )}

              {/* Botón para reiniciar la tabla del jugador actual */}
              <Button onClick={resetPlayerBoard} variant="outline" disabled={gameState.isGameActive}>
                <RotateCw className="mr-2" />
                Nueva Tabla
              </Button>

              {/* Mensaje para jugadores que no son anfitrión */}
              {!isHost && gameState.host && !gameState.isGameActive && !gameState.winner && (
                <p className="text-center text-muted-foreground p-2 bg-muted rounded-md">
                  <span className="font-bold">{gameState.host || "Anfitrión"}</span> es el anfitrión. Esperando...
                </p>
              )}

              {/* Cambio de tipo de juego */}
              <Select
                onValueChange={(value) => {
                  console.log("Modo de juego seleccionado:", value);
                  // Aquí podrías actualizar en Firebase el tipo de juego elegido
                  // por ejemplo: updateRoom(roomId, { gameState: { ...gameState, gameMode: value } });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar modo de juego" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Tablero lleno (16 cartas)</SelectItem>
                  <SelectItem value="vertical">Vertical</SelectItem>
                  <SelectItem value="horizontal">Horizontal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* CARTA ACTUAL - visible en móvil y centrada en escritorio */}
        <div className="flex justify-center col-span-1 md:col-span-5 order-first md:order-none">
          <div className="w-full max-w-[280px] sm:max-w-[320px] md:w-[clamp(140px,18vw,250px)] aspect-[250/298]">
            <DealerDisplay
              currentCard={currentCard}
              showCurrentCard={true}
              showHistory={false}
            />
          </div>
        </div>


        {/* TABLERO - derecha */}
        <div className="flex justify-center col-span-1 md:col-span-4">
          {/* Contenedor responsivo que mantiene proporción */}
          <div className="w-[clamp(220px,28vw,400px)] aspect-[265/380]">
            <GameBoard
              board={player.board}
              onCardClick={handleCardClick}
              markedIndices={player.markedIndices}
              calledCardIds={Array.isArray(gameState.calledCardIds) ? gameState.calledCardIds : []}
            />
          </div>

        </div>
      </div>

      {/* HISTORIAL: ocupa todo el ancho en móvil, y solo centro+derecha en escritorio */}
      <div className="grid grid-cols-1 md:grid-cols-12 w-full mt-6">
        <div className="col-span-1 md:col-start-4 md:col-span-9 flex justify-center">
          {/* Contenedor scrollable */}
          <div className="w-full overflow-auto">
            <DealerDisplay
              currentCard={null}
              history={uniqueHistory.slice(0, -1)}
              showCurrentCard={false}
              showHistory={true}
            />
          </div>
        </div>
      </div>

      {/* Modal que muestra el ganador */}
      <WinnerModal
        open={!!gameState.winner}
        ranking={ranking}
        onRestart={isHost ? resetGame : undefined}
      />
    </>
  );


}