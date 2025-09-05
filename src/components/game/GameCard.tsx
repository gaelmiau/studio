"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Card as CardType } from "@/lib/loteria";

interface GameCardProps {
  card: CardType;
  isMarked: boolean;
  isClickable: boolean;
  onClick: () => void;
}

export function GameCard({ card, isMarked, isClickable, onClick }: GameCardProps) {
  return (
    <div
      className="aspect-[3/4.2] relative rounded-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
      onClick={isClickable ? onClick : undefined}
      role="button"
      aria-label={`Marcar ${card.name}`}
      tabIndex={isClickable ? 0 : -1}
      onKeyDown={(e) => { if(isClickable && (e.key === 'Enter' || e.key === ' ')) onClick()}}
    >
      <Image
        src={card.imageUrl}
        alt={card.name}
        fill
        sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 150px"
        className="object-cover transition-all duration-500"
      />
      {/* No hay pleca debajo de la carta */}
      {isMarked && (
         <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/70 flex items-center justify-center text-primary-foreground font-bold text-3xl animate-in fade-in zoom-in">
                <span>✓</span>
            </div>
         </div>
      )}
    </div>
  );
}
