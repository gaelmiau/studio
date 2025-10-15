"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CARDS } from "@/lib/loteria";
import { BookOpen, Fullscreen } from "lucide-react";

export default function GlosaryPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground p-6">
      {/* Encabezado */}
      <div className="mb-8 text-center">
        <h1 className="text-[32px] font-bold flex items-center justify-center gap-2">
          <BookOpen className="w-7 h-7" />
          Glosario de Cartas
        </h1>
        <p className="text-muted-foreground mt-2">
          Aquí encontrarás la descripción de cada carta de la lotería.
        </p>
      </div>

      {/* Botón volver (arriba) */}
      <div className="mb-8">
        <Button className="w-full" onClick={() => router.push("/")}>
          Volver al inicio
        </Button>
      </div>

      {/* Grid responsivo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
        {CARDS.map((card) => (
          <Card key={card.id} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-[18px] font-semibold">
                {card.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Imagen de la carta */}
                <div className="w-full sm:w-1/2 flex items-center justify-center">
                  <Image
                    src={card.imageUrl}
                    alt={card.name}
                    width={200}
                    height={260}
                    className="rounded-md border"
                  />
                </div>

                {/* Descripción desde loteria.ts */}
                <div
                  className="
                    flex-1 
                    text-muted-foreground 
                    leading-relaxed
                    text-[clamp(16px, 2vw, 20px)]
                  "
                >
                  {card.descriptionLong}
                </div>


              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Botón volver (abajo) */}
      <div className="mt-8">
        <Button className="w-full" onClick={() => router.push("/")}>
          Volver al inicio
        </Button>
      </div>
    </main>
  );
}
