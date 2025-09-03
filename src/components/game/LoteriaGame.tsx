"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ref, onValue, set, get, update, onDisconnect } from "firebase/database";
import { database } from "@/lib/firebase";
import { GameBoard } from "./GameBoard";
import { DealerDisplay } from "./DealerDisplay";
import { WinnerModal } from "./WinnerModal";
import { Button } from "@/components/ui/button";
import { Card as CardType, generateBoard, createDeck, checkWin, shuffle } from "@/lib/loteria";
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

export function LoteriaGame({ roomId, playerName }: LoteriaGameProps) {
  const [player, setPlayer] = useState<PlayerState | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [allPlayers, setAllPlayers] = useState<Record<string, PlayerState>>({});
  
  const isHost = gameState?.host === playerName;

  // Refs to Firebase
  const roomRef = ref(database, `rooms/${roomId}`);
  const playerRef = ref(database, `rooms/${roomId}/players/${playerName}`);
  const gameStateRef = ref(database, `rooms/${roomId}/gameState`);
  const presenceRef = ref(database, `.info/connected`);

  // Effect for handling player connection and disconnection
  useEffect(() => {
    const onConnected = onValue(presenceRef, async (snap) => {
      if (snap.val() === true) {
        await set(playerRef, player);
        onDisconnect(playerRef).update({ isOnline: false });
      }
    });

    return () => {
      onDisconnect(playerRef).cancel();
      onConnected();
    };
  }, [player, playerRef, presenceRef]);

  // Effect for joining the room and initializing player state
  useEffect(() => {
    get(playerRef).then(snap => {
      let userBoard: CardType[];
      if (snap.exists() && snap.val().board) {
        userBoard = snap.val().board;
      } else {
        userBoard = generateBoard();
      }
      const initialPlayerState = {
        name: playerName,
        board: userBoard,
        markedIndices: [],
        isOnline: true,
      };
      setPlayer(initialPlayerState);
      set(playerRef, initialPlayerState);
    });
  }, [roomId, playerName]); // Should only run once


  // Effect for syncing game state and players
  useEffect(() => {
    const unsubscribe = onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      if (roomData) {
        setGameState(roomData.gameState || null);
        setAllPlayers(roomData.players || {});
        
        // Update local player state from Firebase
        if(roomData.players && roomData.players[playerName]) {
          setPlayer(p => ({...p, ...roomData.players[playerName]}));
        }
      }
    });
    return () => unsubscribe();
  }, [roomId, playerName]);

  // Effect to determine host on join
  useEffect(() => {
    get(gameStateRef).then((snapshot) => {
      if (!snapshot.exists()) {
        const initialGameState: GameState = {
          deck: createDeck(),
          calledCardIds: [],
          isGameActive: false,
          winner: null,
          host: playerName,
          timestamp: Date.now()
        };
        set(gameStateRef, initialGameState);
      }
    });
  }, [isHost, playerName, gameStateRef]);

  const startGame = () => {
    if (!isHost || !gameState) return;
    const newGameState: Partial<GameState> = {
        isGameActive: true,
        calledCardIds: [gameState.deck[0].id],
        timestamp: Date.now()
    };
    update(gameStateRef, newGameState);
  };
  
  const callNextCard = useCallback(() => {
    if (!isHost || !gameState || !gameState.isGameActive || gameState.winner) return;

    if (gameState.calledCardIds.length < gameState.deck.length) {
      const nextCard = gameState.deck[gameState.calledCardIds.length];
      const newCalledCardIds = [...gameState.calledCardIds, nextCard.id];
      update(gameStateRef, { calledCardIds: newCalledCardIds, timestamp: Date.now() });
    } else {
      update(gameStateRef, { isGameActive: false }); // Game over
    }
  },[isHost, gameState, gameStateRef]);


  useEffect(() => {
    if (isHost && gameState?.isGameActive && !gameState.winner) {
      const gameInterval = setInterval(callNextCard, 4000);
      return () => clearInterval(gameInterval);
    }
  }, [isHost, gameState?.isGameActive, gameState?.winner, callNextCard]);


  const handleCardClick = (card: CardType, index: number) => {
    if (!player || gameState?.winner || !gameState?.calledCardIds) return;

    const isCalled = gameState.calledCardIds.includes(card.id);
    if (isCalled && !player.markedIndices.includes(index)) {
      const newMarkedIndices = [...player.markedIndices, index].sort((a, b) => a - b);
      
      const updatedPlayer = { ...player, markedIndices: newMarkedIndices };
      setPlayer(updatedPlayer); // Optimistic update
      set(playerRef, updatedPlayer);


      if (checkWin(newMarkedIndices)) {
        update(gameStateRef, { winner: playerName, isGameActive: false });
      }
    }
  };
  
  const resetGame = () => {
    if (!isHost) return;
    
    // New game state
    const newGameState: GameState = {
      deck: createDeck(),
      calledCardIds: [],
      isGameActive: false,
      winner: null,
      host: playerName,
      timestamp: Date.now()
    };
    set(gameStateRef, newGameState);

    // Reset all players
    const updates: Record<string, any> = {};
    Object.keys(allPlayers).forEach(pName => {
      updates[`/rooms/${roomId}/players/${pName}/markedIndices`] = [];
      updates[`/rooms/${roomId}/players/${pName}/board`] = generateBoard();
    });
    update(ref(database), updates);
  };
  
  if (!player || !gameState) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-64">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
        <p className="text-xl text-muted-foreground">Cargando sala, un momento...</p>
      </div>
    );
  }

  const calledCards = gameState.calledCardIds.map(id => gameState.deck.find(c => c.id === id)).filter(Boolean) as CardType[];
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
            {!isHost && (
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
