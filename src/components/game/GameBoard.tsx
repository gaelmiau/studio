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
    <div className="grid grid-cols-4 gap-2 p-2 rounded-lg bg-secondary border-2 border-primary/20 w-full h-full">
      {board.map((card, index) => {
        const row = Math.floor(index / 4); // suponiendo 4 columnas
        const col = index % 4;

        const allowed = isAllowed ? isAllowed({ row, col }) : true;

        return (
          <div
            key={card.id}
            className={`w-full h-full ${!allowed ? "grayscale opacity-50 pointer-events-none" : ""
              }`}
            onClick={() => allowed && onCardClick(card, index)}
          >
            <GameCard
              card={card}
              isMarked={markedIndices.includes(index)}
              isClickable={allowed && calledCardIds.includes(card.id) && !markedIndices.includes(index)}
              onClick={() => onCardClick(card, index)}
            />

          </div>
        );
      })}
    </div>
  );
}
