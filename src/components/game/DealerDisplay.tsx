"use client";

import Image from "next/image";
import { Card as CardType } from "@/lib/loteria";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DealerDisplayProps {
  currentCard?: CardType | null;
  history?: CardType[];
  showCurrentCard?: boolean;
  showHistory?: boolean;
}

export function DealerDisplay({
  currentCard = null,
  history = [],
  showCurrentCard = true,
  showHistory = true,
}: DealerDisplayProps) {
  return (
    <div
      className={`
        flex flex-col gap-2 md:flex-row md:gap-4 items-center md:items-start
      `}
    >
      {/* Carta actual */}
      {showCurrentCard && (
        <div className="flex justify-center items-center w-full">
          <Card
            className="
              w-[clamp(160px,20vw,250px)]
              aspect-[3/4]
              overflow-hidden 
              border-2 border-primary 
              bg-card
            "
            style={{ borderColor: "hsl(180.85, 61.74%, 22.55%)", backgroundColor: "hsl(240, 26.39%, 28.24%)", borderWidth: "1px" }} 
          >
            {currentCard ? (
              <div className="relative w-full h-full">
                <Image
                  src={currentCard.imageUrl}
                  alt={currentCard.name}
                  fill
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground text-center">Esperando para empezar...</p>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* Historial */}
      {showHistory && (
        <div className="flex-1 min-w-0">
          <Card className="h-full" style={{ background: "hsl(240, 26.39%, 28.24%)" }}>
            <CardContent className="p-2">
              <div className="w-full h-[clamp(60px,12vw,90px)] flex flex-row gap-2 p-2 justify-center">
                {[...history].reverse().map((card, idx) => (
                  <div
                    key={`${card.id}-${idx}`}
                    className="
                      w-[clamp(35px,6vw,50px)]
                      aspect-[3/4]
                      relative rounded-md 
                      overflow-hidden border border-border
                    "
                  >
                    <Image
                      src={card.imageUrl}
                      alt={card.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
}
