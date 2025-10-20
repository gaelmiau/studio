"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BookOpen, ClipboardPen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function InstructionsPage() {
    const router = useRouter();
    return (
        <main className="flex min-h-screen flex-col bg-background text-foreground p-6">
            <div className="mb-8 text-center">
                <h1 className="text-[32px] font-bold flex items-center justify-center gap-2">
                    <ClipboardPen className="w-7 h-7" />
                    Instructivo del Juego
                </h1>
                <p className="text-muted-foreground mt-2">
                    Aquí encontrarás las instrucciones para jugar a la lotería.
                </p>
            </div>
            <div className="mb-8">
                <Button className="w-full" onClick={() => router.push("/")}>
                    Volver al inicio
                </Button>
            </div>
            <Card className="shadow-md p-6">
                <CardContent>
                    <div className="space-y-4 text-muted-foreground leading-relaxed">
                        <h2 className="text-2xl font-semibold">Modos de Juego</h2>
                        <ul className="list-disc list-inside space-y-2">
                            {/* Imágen con descripción para cada modo */}
                            <img src="/instructive/tradicional.png" alt="Modo Tradicional" className="w-full max-w-md mx-auto" />
                            <li><strong>Tradicional:</strong> El primer jugador en completar toda su tabla gana.</li>

                            <img src="/instructive/filas.png" alt="Modo Rápido" className="w-full max-w-md mx-auto" />
                            <li><strong>Filas:</strong> El primer jugador en completar una línea horizontal gana.</li>

                            <img src="/instructive/columnas.png" alt="Modo Columnas" className="w-full max-w-md mx-auto" />
                            <li><strong>Columnas:</strong> El primer jugador en completar una línea vertical gana.</li>

                            <img src="/instructive/diagonales.png" alt="Modo Diagonales" className="w-full max-w-md mx-auto" />
                            <li><strong>Diagonales:</strong> El primer jugador en completar una línea diagonal gana.</li>

                            <img src="/instructive/esquinas.png" alt="Modo Esquinas" className="w-full max-w-md mx-auto" />
                            <li><strong>Esquinas:</strong>El primer jugador en completar las 4 esquinas gana.</li>

                            <img src="/instructive/cuadrado.png" alt="Modo Cuadrado" className="w-full max-w-md mx-auto" />
                            <li><strong>Cuadrado:</strong>El primer jugador en completas el cuadrado central gana.</li>
                        </ul>

                        <p>¡Buena suerte a todos los jugadores!</p>
                    </div>

                </CardContent>
            </Card>

        </main>
    );
}
