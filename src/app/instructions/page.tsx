"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ClipboardPen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const MODOS = [
    {
        key: "tradicional",
        title: "Tradicional",
        img: "/instructive/tradicional.png",
        text: "El primer jugador en completar toda su tabla gana.",
    },
    {
        key: "filas",
        title: "Filas",
        img: "/instructive/filas.png",
        text: "El primer jugador en completar una línea horizontal gana.",
    },
    {
        key: "columnas",
        title: "Columnas",
        img: "/instructive/columnas.png",
        text: "El primer jugador en completar una línea vertical gana.",
    },
    {
        key: "diagonales",
        title: "Diagonales",
        img: "/instructive/diagonales.png",
        text: "El primer jugador en completar una línea diagonal gana.",
    },
    {
        key: "esquinas",
        title: "Esquinas",
        img: "/instructive/esquinas.png",
        text: "El primer jugador en completar las 4 esquinas gana.",
    },
    {
        key: "cuadrado",
        title: "Cuadrado",
        img: "/instructive/cuadrado.png",
        text: "El primer jugador en completar el cuadrado central gana.",
    },
];

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

            {/* Botón volver (arriba) */}
            <div className="mb-8 flex justify-center">
                <Button className="w-full" onClick={() => router.push("/")}>
                    Volver al inicio
                </Button>
            </div>  

            {/* Tarjetas de modos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {MODOS.map((m) => (
                    <Card
                        key={m.key}
                        className="shadow-lg transition-all duration-200 rounded-2xl"
                    >
                        <CardContent className="p-5 flex flex-col items-center text-center space-y-4">
                            <img
                                src={m.img}
                                alt={m.title}
                                className="w-[100px] sm:w-[120px] md:w-[140px] h-auto rounded-md border mt-2"
                            />
                            <div>
                                <h3 className="text-lg font-semibold">{m.title}</h3>
                                <p className="text-muted-foreground mt-2 text-[15px] leading-relaxed">
                                    {m.text}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Botón volver (abajo) */}
            <div className="mt-8 flex justify-center">
                <Button className="w-full" onClick={() => router.push("/")}>
                    Volver al inicio
                </Button>
            </div>

        </main>
    );
}
