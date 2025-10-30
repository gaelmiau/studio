"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CARDS } from "@/lib/loteria";
import { BookOpen, Fullscreen } from "lucide-react";
import { Header } from "@/components/Header";

export default function GlosaryPage() {
  const router = useRouter();
  return (
    <>
      {/* Encabezado (fuera del main) */}
      <Header />

      <main className="flex min-h-screen flex-col bg-background text-foreground p-12">

        {/* Título e ícono */}
        <div className="text-left justify-center sm:text-left pl-4">
          <h1 className="text-[20px] font-bold flex items-center gap-2 justify-start">
            <BookOpen className="w-6 h-6" />
            Glosario de Cartas
          </h1>
          <p className="text-muted-foreground mt-2 text-[18px]">
            Aquí encontrarás la descripción de cada carta de la lotería.
          </p>
        </div>

        {/* Botón volver (arriba) */}
        <div className="mb-8 flex items-right justify-end">
          <Button className="w-sm" onClick={() => router.push("/")}>
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
                  <div className="w-full sm:w-1/2 flex items-center justify-center">
                    <Image
                      src={card.imageUrl}
                      alt={card.name}
                      width={200}
                      height={260}
                      className="rounded-md border"
                    />
                  </div>
                  <div className="flex-1 text-muted-foreground leading-relaxed text-[16px]">
                    {card.descriptionLong}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botón volver (abajo) */}
        <div className="mt-8 flex items-right justify-end">
          <Button className="w-sm" onClick={() => router.push("/")}>
            Volver al inicio
          </Button>
        </div>
      </main>
    </>
  );

}
