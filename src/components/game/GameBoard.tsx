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
  const seleccionadas = markedIndices.length;

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 p-2 md:p-4 rounded-lg bg-secondary border-2 border-primary/20">
      {board.map((card, index) => {
        const isMarked = markedIndices.includes(index);
        const isCalled = calledCardIds.includes(card.id);

        // Solo es clickeable si la carta fue llamada y no está marcada
        const isClickable = isCalled && !isMarked;

        return (
          <GameCard
            key={card.id}
            card={card}
            isMarked={isMarked}
            isClickable={isClickable}
            onClick={() => onCardClick(card, index)}
          />
        );
      })}
    </div>
  );
}
