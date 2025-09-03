"use client";
import React, { useState, useEffect, useCallback } from "react";
import { GameBoard } from "./GameBoard";
import { DealerDisplay } from "./DealerDisplay";
import { WinnerModal } from "./WinnerModal";
import { Button } from "@/components/ui/button";
import { Card as CardType, generateBoard, createDeck, checkWin, shuffle, CARDS } from "@/lib/loteria";
import { Play, RotateCw, Loader2, Users } from "lucide-react";
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
  
  const gameState = roomData?.gameState ?? null;
  const allPlayers = roomData?.players ?? {};

  const isHost = gameState?.host === playerName;

  const updateRoomData = useCallback(() => {
    const data = readFromStorage(roomId);
    if(data) {
        setRoomData(data);
        if (data.players && data.players[playerName]) {
            setPlayer(p => ({...p, ...data.players[playerName]}));
        }
    }
    setIsLoading(false);
  }, [roomId, playerName]);

  // Effect for listening to storage changes
  useEffect(() => {
    if(typeof window === 'undefined') return;
    window.addEventListener('storage', updateRoomData);
    return () => window.removeEventListener('storage', updateRoomData);
  }, [updateRoomData]);

  // Initial setup
  useEffect(() => {
    let currentRoomData = readFromStorage(roomId);
    
    // Initialize player
    const existingPlayer = currentRoomData?.players?.[playerName];
    const userBoard = existingPlayer?.board || generateBoard();
    const newPlayerState: PlayerState = {
        name: playerName,
        board: userBoard,
        markedIndices: existingPlayer?.markedIndices || [],
        isOnline: true,
    };
    setPlayer(newPlayerState);

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
        }
    }
    
    // Add or update player in room
    currentRoomData.players[playerName] = {
        ...currentRoomData.players[playerName],
        ...newPlayerState
    };

    if(!currentRoomData.gameState.host || !currentRoomData.players[currentRoomData.gameState.host]?.isOnline) {
        // Find first online player to be host if current host is offline
        const onlinePlayer = Object.values(currentRoomData.players).find(p => p.isOnline);
        currentRoomData.gameState.host = onlinePlayer?.name || playerName;
    }
    
    setRoomData(currentRoomData);
    writeToStorage(roomId, currentRoomData);
    setIsLoading(false);


    // Handle leaving
    const handleBeforeUnload = () => {
        const data = readFromStorage(roomId);
        if(data && data.players[playerName]) {
            data.players[playerName].isOnline = false;
            // If the host is leaving, assign a new host
            if(data.gameState.host === playerName) {
                const nextHost = Object.values(data.players).find(p => p.isOnline && p.name !== playerName);
                if(nextHost) {
                    data.gameState.host = nextHost.name;
                }
            }
            writeToStorage(roomId, data);
        }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        // To simulate disconnection, we'll mark as offline.
        handleBeforeUnload();
    };
  }, [roomId, playerName]);

  // Main game loop for host
  useEffect(() => {
    if (isHost && gameState?.isGameActive && !gameState.winner) {
      const gameInterval = setInterval(() => {
        const currentData = readFromStorage(roomId);
        if(!currentData || !currentData.gameState.isGameActive || currentData.gameState.winner) {
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


  const startGame = () => {
    if (!isHost) return;
    const currentData = readFromStorage(roomId);
    if(!currentData) return;

    // Reset players' marked cards but keep their boards
    Object.keys(currentData.players).forEach(pName => {
        currentData.players[pName].markedIndices = [];
    });

    currentData.gameState = {
        ...currentData.gameState,
        deck: createDeck(),
        calledCardIds: [currentData.gameState.deck[0].id],
        isGameActive: true,
        winner: null,
        timestamp: Date.now()
    }
    
    writeToStorage(roomId, currentData);
    setRoomData(currentData);
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

      if (checkWin(newMarkedIndices)) {
        currentData.gameState.winner = playerName;
        currentData.gameState.isGameActive = false;
      }
      writeToStorage(roomId, currentData);
      setRoomData(currentData);
    }
  };
  
  const resetGame = () => {
    if (!isHost) return;
    
    const newRoomData = {
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

    // Generate new boards for all existing players
    Object.keys(allPlayers).forEach(pName => {
        newRoomData.players[pName] = {
            ...allPlayers[pName],
            board: generateBoard(),
            markedIndices: []
        };
    });

    writeToStorage(roomId, newRoomData);
    setRoomData(newRoomData);
  };
  
  if (isLoading || !player || !gameState) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-xl text-muted-foreground">Cargando sala, un momento...</p>
      </div>
    );
  }

  const calledCards = gameState.calledCardIds.map(id => CARDS.find(c => c.id === id)).filter(Boolean) as CardType[];
  const currentCard = calledCards.length > 0 ? calledCards[calledCards.length - 1] : null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start">
      <div className="w-full lg:w-1/4">
        <PlayerList players={allPlayers} currentPlayerName={playerName} hostName={gameState.host} />
        <div className="mt-4 flex flex-col gap-2">
            {isHost && (
              <>
                <Button onClick={startGame} disabled={gameState.isGameActive || !!gameState.winner}>
                  <Play className="mr-2" />
                  Iniciar Juego
                </Button>
                <Button onClick={resetGame} variant="outline">
                  <RotateCw className="mr-2" />
                  Reiniciar Juego
                </Button>
              </>
            )}
            {!isHost && gameState.host && (
              <p className="text-center text-muted-foreground p-2 bg-muted rounded-md">
                <span className="font-bold">{gameState.host}</span> es el anfitrión. Esperando a que inicie el juego...
              </p>
            )}
        </div>
      </div>
      
      <div className="w-full lg:w-3/4 flex flex-col gap-6 items-center">
        <DealerDisplay currentCard={currentCard} history={calledCards.slice(0, -1)} />
        
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
        winnerName={gameState.winner}
        onRestart={isHost ? resetGame : undefined} 
      />
    </div>
  );
}
