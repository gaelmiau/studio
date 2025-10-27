"use client";

import { Card as CardType } from "@/lib/loteria";
import { GameCard } from "./GameCard";

interface GameBoardProps {
  board: CardType[];
  onCardClick: (card: CardType, index: number) => void;
  markedIndices: number[];
  calledCardIds: number[];
  isAllowed?: (position: { row: number; col: number }) => boolean;
}

export function GameBoard({ board, onCardClick, markedIndices, calledCardIds, isAllowed }: GameBoardProps) {
  const seleccionadas = markedIndices.length;

  return (
    <div className="grid grid-cols-4 gap-0 p-2 rounded-lg bg-secondary border-1 border-primary/20 w-full h-full">
      {board.map((card, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;

        // Solo mostrar a color si es permitido por la restricción
        const allowed = isAllowed ? isAllowed({ row, col }) : true;

        return (
          <div
            key={card.id}
            className={`w-full h-full transition-all duration-200 ${!allowed ? "grayscale opacity-50 pointer-events-none" : ""}`}
            onClick={() => allowed && onCardClick(card, index)}
          >
            <GameCard
              card={card}
              isMarked={markedIndices.includes(index)}
              isClickable={allowed && calledCardIds.includes(card.id) && !markedIndices.includes(index)}
              onClick={() => allowed && onCardClick(card, index)}
            />
          </div>
        );
      })}

    </div>
  );
}
