"use client";

import { Card as CardType } from "@/lib/loteria";
import { GameCard } from "./GameCard";

interface GameBoardProps {
  board: CardType[];
  onCardClick: (card: CardType, index: number) => void;
  markedIndices: number[];
  calledCardIds: number[];
}

export function GameBoard({ board, onCardClick, markedIndices, calledCardIds }: GameBoardProps) {
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 p-2 md:p-4 rounded-lg bg-secondary border-2 border-primary/20 shadow-inner">
      {board.map((card, index) => {
        const isMarked = markedIndices.includes(index);
        const isCalled = calledCardIds.includes(card.id);
        
        return (
          <GameCard
            key={card.id}
            card={card}
            isMarked={isMarked}
            isClickable={!isMarked && isCalled}
            onClick={() => onCardClick(card, index)}
          />
        );
      })}
    </div>
  );
}
