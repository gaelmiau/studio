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
    <div className="w-full flex flex-col md:flex-row gap-4 items-start">
      {showCurrentCard && (
        <div className="flex-1">
          <h3 className="font-headline text-xl text-center mb-2"></h3> {/* Carta Actual */}
          <Card className="aspect-[3/4.2] w-full max-w-xs mx-auto overflow-hidden border-2 border-primary bg-card">
            {currentCard ? (
              <div className="relative w-full h-full">
                <Image
                  src={currentCard.imageUrl}
                  alt={currentCard.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted/50">
                <p className="text-muted-foreground">Esperando para empezar...</p>
              </div>
            )}
          </Card>
        </div>
      )}

      {showHistory && (
        <div className="flex-1 min-w-0">
          <h3 className="font-headline text-xl text-center mb-2"></h3> {/* Historial de Cartas */}
          <Card className="h-full">
            <CardContent className="p-2">
              <ScrollArea className="w-full h-[90px]">
                <div className="flex flex-row gap-2 p-2 overflow-x-auto w-full">
                  {[...history].reverse().map((card, idx) => (
                    <div key={`${card.id}-${idx}`} className="w-[50px] h-[70px] relative rounded-md overflow-hidden border border-border">
                      <Image
                        src={card.imageUrl}
                        alt={card.name}
                        width={50}
                        height={70}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}