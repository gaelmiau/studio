"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function GlosaryPage() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">📖 Glosario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Bienvenido al glosario. Aquí encontrarás los términos más usados en
            el juego.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><b>Jugador:</b> Persona que participa en la sala.</li>
            <li><b>Anfitrión:</b> El jugador que crea la sala.</li>
            <li><b>Cartas:</b> Elementos que forman parte del tablero de lotería.</li>
          </ul>
          <Button className="w-full mt-6" onClick={() => router.push("/")}>
            Volver al inicio
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
