"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ClipboardPen, Timer, Users, Moon, Shuffle, RotateCw, Volume2, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";

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

// 🔹 Reglas visuales destacadas
const GAME_RULES = [
    {
        title: "Tiempo entre cartas",
        value: "3.5 segundos",
        icon: Timer,
        text: "Cada carta se canta cada 3.5 segundos.",
    },
    {
        title: "Cantadito",
        value: "Paso de cartas",
        icon: Volume2,
        text: "Puedes activar el 'cantadito' para escuchar el nombre de la carta, algunas pueden tardar más según su nombre.",
    },
    {
        title: "Inactividad del jugador",
        value: "1.5 min + 15 seg",
        icon: Moon,
        text: "Si no hay actividad por 1 minuto y medio, recibirás una advertencia. Tendrás 15 segundos para responder antes de ser desconectado.",
    },
    {
        title: "Límite de jugadores",
        value: "25 jugadores",
        icon: Users,
        text: "Solo pueden participar hasta 25 jugadores por sala.",
    },
    {
        title: "Anfitrión",
        value: "1 por sala",
        icon: Crown,
        text: "El primer jugador en entrar será el anfitrión. Si se desconecta, el rol pasa al siguiente. Solo pueden participar hasta 25 jugadores por partida.",
    },
    {
        title: "Cambio de tabla",
        value: "Solo cuando el juego no está activo",
        icon: RotateCw,
        text: "Puedes generar una nueva tabla desde el botón 'Nueva Tabla', pero solo si la partida no está en curso.",
    },

];

export default function InstructionsPage() {
    const router = useRouter();

    return (
<<<<<<< HEAD
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
=======
        <>
            {/* Encabezado (fuera del main) */}
            <Header />
            <main className="flex min-h-screen flex-col bg-background text-foreground p-6">
>>>>>>> 1603f49c0066a342b5ce3146c1d783869622bb71

                <div className="mb-8 text-center">
                    <h1 className="text-[20px] font-bold flex items-center justify-center gap-2">
                        <img src="/LoteriaSI-InterfazIconoInstructivo.svg" alt="Instructivo Icon" className="h-6 w-6 inline-block mr-2" /> 
                        Instructivo del Juego
                    </h1>
                    <p className="text-muted-foreground mt-2 text-[18px] leading-relaxed">
                        Aquí encontrarás las instrucciones para jugar a la lotería.
                    </p>
                </div>

                {/* Botón volver (arriba) */}
                <div className="mb-8 flex justify-center">
                    <Button className="w-sm" onClick={() => router.push("/")}>
                        Volver al inicio
                    </Button>
                </div>

                {/* Tarjetas de modos de juego */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {MODOS.map((m) => (
                        <Card
                            key={m.key}
                            className="
                            shadow-md hover:shadow-xl
                            transition-all duration-300 ease-in-out
                            rounded-2xl
                            hover:translate-y-[-4px]
                            hover:bg-card/95
                            cursor-pointer
                        "
                        >
                            <CardContent className="p-5 flex flex-col items-center text-center space-y-4">
                                <img
                                    src={m.img}
                                    alt={m.title}
                                    className="w-[100px] sm:w-[120px] md:w-[140px] h-auto rounded-md border mt-2"
                                />
                                <div>
                                    <h3 className="text-lg font-semibold">{m.title}</h3>
                                    <p className="text-muted-foreground mt-2 text-[16px] leading-relaxed">
                                        {m.text}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Tarjetas de reglas */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {GAME_RULES.map((rule, i) => {
                        const Icon = rule.icon;
                        return (
                            <Card
                                key={i}
                                className="
                                shadow-md hover:shadow-xl
                                transition-all duration-300 ease-in-out
                                rounded-2xl
                                hover:translate-y-[-4px]
                                hover:bg-card/95
                                cursor-pointer
                            "
                            >
                                <CardContent className="p-6 flex flex-col items-center space-y-4">
                                    <div
                                        className="
                                        bg-primary/10 p-3 rounded-full
                                        transition-transform duration-300
                                        group-hover:scale-110
                                    "
                                    >
                                        <Icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{rule.title}</h3>
                                    <p className="text-[16px] font-bold text-primary">
                                        {rule.value}
                                    </p>
                                    <p className="text-muted-foreground text-[16px] leading-relaxed">
                                        {rule.text}
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Botón volver (abajo) */}
                <div className="mt-8 flex justify-center">
                    <Button className="w-sm" onClick={() => router.push("/")}>
                        Volver al inicio
                    </Button>
                </div>
            </main>
        </>
    );


}
