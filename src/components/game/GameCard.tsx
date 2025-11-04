"use client";

import Image from "next/image";
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
      className="relative w-full h-full rounded-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
      onClick={isClickable ? onClick : undefined}
      role="button"
      aria-label={`Marcar ${card.name}`}
      tabIndex={isClickable ? 0 : -1}
      onKeyDown={(e) => {
        if (isClickable && (e.key === "Enter" || e.key === " ")) onClick();
      }}
    >
      <Image
        src={card.imageUrl}
        alt={card.name}
        fill
        sizes="100%"
        className="object-contain transition-all duration-500"
      />
      {isMarked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
              rounded-full bg-[#FBEEDF]/80 flex items-center justify-center text-white font-bold
              animate-in fade-in zoom-in
              w-12 h-12 md:w-12 md:h-12 sm:w-12 sm:h-12 lg:w-16 lg:h-16
              aspect-square
            "
          >
            <Image
              src="/Lotería SI-frijolito-negro64x64.png"
              alt="Frijolito"
              width={64}
              height={64}
              className="object-contain w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
