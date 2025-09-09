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

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className="w-full lg:w-1/4">
        <PlayerList
          players={allPlayers}
          currentPlayerName={playerName}
          hostName={gameState.host || ""}
        />
        <div className="mt-4 flex flex-col gap-2">
          {isHost && (
            <>
              <Button onClick={startGame} disabled={gameState.isGameActive || !!gameState.winner}>
                <Play className="mr-2" />
                {(Array.isArray(gameState.calledCardIds) && gameState.calledCardIds.length > 0)
                  ? 'Continuar Juego'
                  : 'Iniciar Juego'}
              </Button>
              <Button onClick={resetGame} variant="outline">
                <RotateCw className="mr-2" />
                Reiniciar Sala (Nuevas Tablas)
              </Button>
            </>
          )}
          {!isHost && gameState.host && !gameState.isGameActive && !gameState.winner && (
            <p className="text-center text-muted-foreground p-2 bg-muted rounded-md">
              <span className="font-bold">{gameState.host || "Anfitrión"}</span> es el anfitrión. Esperando a que inicie el juego...
            </p>
          )}
        </div>
      </div>

      <div className="w-full lg:w-3/4 flex flex-col gap-6 items-center">
        <DealerDisplay currentCard={currentCard} history={uniqueHistory.slice(0, -1)} />

        <div className="w-full max-w-2xl mx-auto">
          <h2 className="text-center text-2xl font-headline mb-4">Tu Tabla</h2>
          <GameBoard
            board={player.board}
            onCardClick={handleCardClick}
            markedIndices={player.markedIndices}
            calledCardIds={Array.isArray(gameState.calledCardIds) ? gameState.calledCardIds : []}
          />
        </div>
      </div>

      <WinnerModal
        open={!!gameState.winner}
        ranking={ranking}
        onRestart={isHost ? resetGame : undefined}
      />
    </div>
  );
}