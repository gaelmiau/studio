"use client";

import React, { useState, useEffect, useCallback } from "react";
import { GameBoard } from "./GameBoard";
import { DealerDisplay } from "./DealerDisplay";
import { WinnerModal } from "./WinnerModal";
import { Button } from "@/components/ui/button";
import { Card as CardType, generateBoard, createDeck, checkWin } from "@/lib/loteria";
import { Play, Pause, RotateCw, Volume2, VolumeX } from "lucide-react";

export function LoteriaGame() {
  const [board, setBoard] = useState<CardType[]>([]);
  const [deck, setDeck] = useState<CardType[]>([]);
  const [calledCards, setCalledCards] = useState<CardType[]>([]);
  const [markedIndices, setMarkedIndices] = useState<number[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const speak = useCallback((text: string) => {
    if (isMuted || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-MX';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  }, [isMuted]);

  const resetGame = useCallback(() => {
    window.speechSynthesis?.cancel();
    setBoard(generateBoard());
    setDeck(createDeck());
    setCalledCards([]);
    setMarkedIndices([]);
    setIsGameActive(false);
    setHasWon(false);
  }, []);

  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (!isGameActive || hasWon) {
      return;
    }

    const gameInterval = setInterval(() => {
      setCalledCards((prev) => {
        if (prev.length < deck.length) {
          const nextCard = deck[prev.length];
          speak(nextCard.name);
          return [...prev, nextCard];
        }
        setIsGameActive(false); // Game over, all cards called
        return prev;
      });
    }, 5000);

    return () => clearInterval(gameInterval);
  }, [isGameActive, hasWon, deck, speak]);
  
  const handleCardClick = useCallback((card: CardType, index: number) => {
    if (hasWon) return;
    const isCalled = calledCards.some(c => c.id === card.id);
    if (isCalled && !markedIndices.includes(index)) {
      const newMarkedIndices = [...markedIndices, index].sort((a,b) => a - b);
      setMarkedIndices(newMarkedIndices);

      if (checkWin(newMarkedIndices)) {
        setHasWon(true);
        setIsGameActive(false);
        speak('¡Lotería!');
      }
    }
  }, [calledCards, hasWon, markedIndices, speak]);

  const toggleGameActive = () => {
    if (calledCards.length === 0) {
      // Speak first card immediately on start
      const firstCard = deck[0];
      setCalledCards([firstCard]);
      speak(firstCard.name);
    }
    setIsGameActive(!isGameActive);
  };

  const currentCard = calledCards.length > 0 ? calledCards[calledCards.length - 1] : null;

  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-center">
        <Button onClick={toggleGameActive} disabled={hasWon || calledCards.length === deck.length} size="lg">
          {isGameActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isGameActive ? "Pausar" : "Jugar"}
        </Button>
        <Button onClick={resetGame} variant="outline" size="lg">
          <RotateCw className="mr-2" />
          Reiniciar
        </Button>
        <Button onClick={() => setIsMuted(!isMuted)} variant="ghost" size="icon">
          {isMuted ? <VolumeX /> : <Volume2 />}
          <span className="sr-only">Toggle Sound</span>
        </Button>
      </div>

      <DealerDisplay currentCard={currentCard} history={calledCards.slice(0, -1)} />
      
      <div className="w-full max-w-2xl mx-auto">
        <h2 className="text-center text-2xl font-headline mb-4">Tu Tabla</h2>
        <GameBoard 
          board={board} 
          onCardClick={handleCardClick}
          markedIndices={markedIndices}
          calledCardIds={calledCards.map(c => c.id)}
        />
      </div>

      <WinnerModal open={hasWon} onRestart={resetGame} />
    </div>
  );
}
