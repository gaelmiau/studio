"use client";

import Image from "next/image";
import { Card as CardType } from "@/lib/loteria";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DealerDisplayProps {
  currentCard: CardType | null;
  history: CardType[];
}

export function DealerDisplay({ currentCard, history }: DealerDisplayProps) {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
      <div className="md:col-span-1">
        <h3 className="font-headline text-xl text-center mb-2">Carta Actual</h3>
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
              {/* Elimina este bloque para quitar la leyenda */}
              {/* <div className="absolute bottom-0 w-full bg-black/60 p-2 text-center">
                <p className="font-bold text-white text-lg">{currentCard.name}</p>
              </div> */}
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted/50">
              <p className="text-muted-foreground">Esperando para empezar...</p>
            </div>
          )}
        </Card>
      </div>

      <div className="md:col-span-2">
        <h3 className="font-headline text-xl text-center mb-2">Historial</h3>
        <Card className="h-full">
          <CardContent className="p-2">
            <ScrollArea className="h-48 md:h-[22rem] w-full">
              {history.length > 0 ? (
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2">
                  {[...history].reverse().map((card, idx) => (
                    <div key={`${card.id}-${idx}`} className="aspect-[3/4.2] relative rounded-md overflow-hidden border border-border">
                      <Image
                        src={card.imageUrl}
                        alt={card.name}
                        width={100}
                        height={140}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground text-sm">El historial de cartas aparecerá aquí.</p>
                </div>
              )}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
