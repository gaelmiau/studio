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
    <div
      className="grid grid-cols-4 gap-2 p-2 rounded-lg bg-secondary border-2 border-primary/20"
      style={{ width: 265, height: 380 }} // Puedes ajustar estos valores
    >
      {board.map((card, index) => (
        <div key={card.id} className="w-full h-full">
          <GameCard
            card={card}
            isMarked={markedIndices.includes(index)}
            isClickable={calledCardIds.includes(card.id) && !markedIndices.includes(index)}
            onClick={() => onCardClick(card, index)}
          />
        </div>
      ))}
    </div>
  );
}
