"use client";
import React, { useState, useEffect, useCallback } from "react";
import { GameBoard } from "./GameBoard";
import { DealerDisplay } from "./DealerDisplay";
import { WinnerModal } from "./WinnerModal";
import { Button } from "@/components/ui/button";
import { Card as CardType, generateBoard, createDeck, checkWin, CARDS } from "@/lib/loteria";
import { Play, RotateCw, Loader2 } from "lucide-react";
import { PlayerList } from "./PlayerList";

interface LoteriaGameProps {
  roomId: string;
  playerName: string;
}

interface GameState {
  deck: CardType[];
  calledCardIds: number[];
  isGameActive: boolean;
  winner?: string | null;
  host: string;
  timestamp: number;
}

interface PlayerState {
  name: string;
  board: CardType[];
  markedIndices: number[];
  isOnline: boolean;
}

// Helper to get data from localStorage
const getStorageKey = (roomId: string) => `loteria-room-${roomId}`;

const readFromStorage = (roomId: string) => {
  if (typeof window === 'undefined') return null;
  try {
    const data = localStorage.getItem(getStorageKey(roomId));
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to read from storage", error);
    return null;
  }
};

const writeToStorage = (roomId: string, data: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(getStorageKey(roomId), JSON.stringify(data));
    window.dispatchEvent(new Event('storage')); // Notify other tabs
  } catch (error) {
    console.error("Failed to write to storage", error);
  }
};

export function LoteriaGame({ roomId, playerName }: LoteriaGameProps) {
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [roomData, setRoomData] = useState<{ gameState: GameState | null, players: Record<string, PlayerState> } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [ranking, setRanking] = useState<{ name: string; seleccionadas: number }[]>([]);

  const gameState = roomData?.gameState ?? null;
  const allPlayers = roomData?.players ?? {};
  const isHost = gameState?.host === playerName;

  const updateRoomData = useCallback(() => {
    const data = readFromStorage(roomId);
    if (data) {
      setRoomData(data);
      if (data.players && data.players[playerName]) {
        setPlayer(p => ({ ...p, ...data.players[playerName] }));
      }
    }
    setIsLoading(false);
  }, [roomId, playerName]);

  // Effect for listening to storage changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('storage', updateRoomData);
    return () => window.removeEventListener('storage', updateRoomData);
  }, [updateRoomData]);

  // Initial setup
  useEffect(() => {
    setIsLoading(true);
    let currentRoomData = readFromStorage(roomId);

    // Initialize room if it doesn't exist
    if (!currentRoomData) {
      currentRoomData = {
        gameState: {
          deck: createDeck(),
          calledCardIds: [],
          isGameActive: false,
          winner: null,
          host: playerName,
          timestamp: Date.now()
        },
        players: {}
      };
    }

    // Smart logic for joining an existing room
    const existingPlayer = currentRoomData.players?.[playerName];
    let userBoard: CardType[];
    let userMarkedIndices: number[] = [];

    // If the game has a winner, we assume the user wants to join a new game.
    // We give them a new board and reset their marks.
    if (currentRoomData.gameState.winner && !existingPlayer) {
      userBoard = generateBoard();
    } else {
      // Otherwise, use existing board or generate a new one.
      userBoard = existingPlayer?.board && existingPlayer.board.length > 0 ? existingPlayer.board : generateBoard();
      userMarkedIndices = existingPlayer?.markedIndices || [];
    }

    const newPlayerState: PlayerState = {
      name: playerName,
      board: userBoard,
      markedIndices: userMarkedIndices,
      isOnline: true,
    };
    setPlayer(newPlayerState);

    // Add or update player in room
    currentRoomData.players[playerName] = {
      ...currentRoomData.players[playerName],
      ...newPlayerState
    };

    // If the user is joining a room that already has a winner, we clear the winner
    // to allow a new game to start. The host can then press "Start Game".
    if (currentRoomData.gameState.winner) {
      currentRoomData.gameState.winner = null;
      currentRoomData.gameState.isGameActive = false;
    }

    // Host assignment logic
    const host = currentRoomData.gameState.host;
    const hostIsOffline = !host || !currentRoomData.players[host]?.isOnline;
    if (hostIsOffline) {
      const onlinePlayer = Object.values(currentRoomData.players).find(p => p.isOnline);
      currentRoomData.gameState.host = onlinePlayer?.name || playerName;
    }

    setRoomData(currentRoomData);
    writeToStorage(roomId, currentRoomData);
    setIsLoading(false);

    // Handle leaving
    const handleBeforeUnload = () => {
      const data = readFromStorage(roomId);
      if (data && data.players[playerName]) {
        data.players[playerName].isOnline = false;
        // If the host is leaving, assign a new host
        if (data.gameState.host === playerName) {
          const nextHost = Object.values(data.players).find((p: any) => p.isOnline && p.name !== playerName);
          if (nextHost) {
            data.gameState.host = nextHost.name;
          } else {
            // if no one is left, reset game state
            data.gameState.isGameActive = false;
          }
        }
        writeToStorage(roomId, data);
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [roomId, playerName]);

  // Main game loop for host
  useEffect(() => {
    if (isHost && gameState?.isGameActive && !gameState.winner) {
      const gameInterval = setInterval(() => {
        const currentData = readFromStorage(roomId);
        if (!currentData || !currentData.gameState.isGameActive || currentData.gameState.winner) {
          clearInterval(gameInterval);
          return;
        }

        const { deck, calledCardIds } = currentData.gameState;
        if (calledCardIds.length < deck.length) {
          const nextCard = deck[calledCardIds.length];
          currentData.gameState.calledCardIds.push(nextCard.id);
          currentData.gameState.timestamp = Date.now();
          writeToStorage(roomId, currentData);
          setRoomData(currentData); // Update local state to re-render
        } else {
          currentData.gameState.isGameActive = false; // Game over
          writeToStorage(roomId, currentData);
          setRoomData(currentData);
        }
      }, 4000);
      return () => clearInterval(gameInterval);
    }
  }, [isHost, gameState?.isGameActive, gameState?.winner, roomId]);

  const cleanupInactivePlayers = (currentData: any) => {
    const activePlayers: Record<string, PlayerState> = {};
    Object.keys(currentData.players).forEach(pName => {
      if (currentData.players[pName].isOnline) {
        activePlayers[pName] = currentData.players[pName];
      }
    });
    currentData.players = activePlayers;
    return currentData;
  };

  const startGame = () => {
    if (!isHost) return;
    let currentData = readFromStorage(roomId);
    if (!currentData) return;

    currentData = cleanupInactivePlayers(currentData);

    // Reset players' marked cards but keep their boards for this round
    Object.keys(currentData.players).forEach(pName => {
      currentData.players[pName].markedIndices = [];
    });

    const newDeck = createDeck();
    currentData.gameState = {
      ...currentData.gameState,
      deck: newDeck,
      calledCardIds: [newDeck[0].id], // Start with one card
      isGameActive: true,
      winner: null,
      timestamp: Date.now()
    };

    writeToStorage(roomId, currentData);
    setRoomData(currentData);
    setRanking([]); // Limpiar ranking al iniciar juego nuevo
  };

  const handleCardClick = (card: CardType, index: number) => {
    const currentData = readFromStorage(roomId);
    if (!currentData || !player || currentData.gameState.winner || !currentData.gameState.calledCardIds) return;

    const { calledCardIds } = currentData.gameState;
    const isCalled = calledCardIds.includes(card.id);

    if (isCalled && !player.markedIndices.includes(index)) {
      const newMarkedIndices = [...player.markedIndices, index].sort((a, b) => a - b);

      const updatedPlayer = { ...player, markedIndices: newMarkedIndices };
      currentData.players[playerName] = updatedPlayer;
      setPlayer(updatedPlayer);

      // Cambia aquí: pasa board y calledCardIds a checkWin
      if (checkWin(newMarkedIndices, player.board, currentData.gameState.calledCardIds)) {
        currentData.gameState.winner = playerName;
        currentData.gameState.isGameActive = false;
        writeToStorage(roomId, currentData);
        setRoomData(currentData);
      } else {
        writeToStorage(roomId, currentData);
        setRoomData(currentData);
      }
    }
  };

  // Calcular ranking siempre que haya un ganador y roomData cambie
  useEffect(() => {
    if (roomData?.gameState?.winner) {
      const rankingArr = Object.values(roomData.players)
        .map((p) => ({
          name: p.name,
          seleccionadas: p.markedIndices.length,
        }))
        .sort((a, b) => b.seleccionadas - a.seleccionadas);
      setRanking(rankingArr);
    }
  }, [roomData]);

  const resetGame = () => {
    if (!isHost) return;
    let currentData = readFromStorage(roomId);
    if (!currentData) return;

    currentData = cleanupInactivePlayers(currentData);

    // Genera un nuevo mazo y una nueva tabla para cada jugador
    const newDeck = createDeck();
    Object.keys(currentData.players).forEach(pName => {
      currentData.players[pName].board = generateBoard();
      currentData.players[pName].markedIndices = [];
    });

    currentData.gameState = {
      ...currentData.gameState,
      deck: newDeck,
      calledCardIds: [],
      isGameActive: false,
      winner: null,
      timestamp: Date.now()
    };

    writeToStorage(roomId, currentData);
    setRoomData(currentData);
    setRanking([]); // Limpiar ranking al reiniciar
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (isLoading || !player || !gameState || !player.board) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-xl text-muted-foreground">Cargando sala, un momento...</p>
      </div>
    );
  }

  const calledCards = gameState.calledCardIds.map(id => CARDS.find(c => c.id === id)).filter(Boolean) as CardType[];
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
                {gameState.calledCardIds.length > 0 ? 'Continuar Juego' : 'Iniciar Juego'}
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
            calledCardIds={gameState.calledCardIds}
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