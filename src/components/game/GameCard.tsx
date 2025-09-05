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
      className={cn(
        "aspect-[3/4.2] relative rounded-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105",
        isClickable && "cursor-pointer ring-4 ring-accent ring-offset-2 ring-offset-secondary",
        isMarked && "ring-4 ring-primary ring-offset-2 ring-offset-secondary"
      )}
      onClick={isClickable ? onClick : undefined}
      role="button"
      aria-label={`Marcar ${card.name}`}
      tabIndex={isClickable ? 0 : -1}
      onKeyDown={(e) => { if(isClickable && (e.key === 'Enter' || e.key === ' ')) onClick()}}
    >
      <Image
        src={card.imageUrl}
        alt={card.name}
        data-ai-hint={card.hint}
        fill
        sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, 150px"
        className={cn(
          "object-cover transition-all duration-500",
          !isMarked ? "grayscale" : "grayscale-0"
        )}
      />
      <div className="absolute bottom-0 w-full bg-black/50 p-1 text-center">
        <p className="font-bold text-white text-[10px] md:text-xs truncate">{card.name}</p>
      </div>
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
