"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Timer, Users, Moon, RotateCw, Volume2, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/Header";

const MODOS = [
  { key: "tradicional", title: "Tradicional", img: "/instructive/tradicional.png", text: "El primer jugador en completar toda su tabla gana." },
  { key: "filas", title: "Filas", img: "/instructive/filas.png", text: "El primer jugador en completar una línea horizontal gana." },
  { key: "columnas", title: "Columnas", img: "/instructive/columnas.png", text: "El primer jugador en completar una línea vertical gana." },
  { key: "diagonales", title: "Diagonales", img: "/instructive/diagonales.png", text: "El primer jugador en completar una línea diagonal gana." },
  { key: "esquinas", title: "Esquinas", img: "/instructive/esquinas.png", text: "El primer jugador en completar las 4 esquinas gana." },
  { key: "cuadrado", title: "Cuadrado", img: "/instructive/cuadrado.png", text: "El primer jugador en completar el cuadrado central gana." },
];

const GAME_RULES = [
  { title: "Tiempo entre cartas", value: "3.5 segundos", icon: Timer, text: "Cada carta se canta cada 3.5 segundos." },
  { title: "Cantadito", value: "Paso de cartas", icon: Volume2, text: "Puedes activar el 'cantadito' para escuchar el nombre de la carta, algunas pueden tardar más según su nombre." },
  { title: "Inactividad del jugador", value: "1.5 min + 15 seg", icon: Moon, text: "Si no hay actividad por 1 minuto y medio, recibirás una advertencia. Tendrás 15 segundos para responder antes de ser desconectado." },
  { title: "Límite de jugadores", value: "25 jugadores", icon: Users, text: "Solo pueden participar hasta 25 jugadores por sala." },
  { title: "Anfitrión", value: "1 por sala", icon: Crown, text: "El primer jugador en entrar será el anfitrión. Si se desconecta, el rol pasa al siguiente." },
  { title: "Cambio de tabla", value: "Solo cuando el juego no está activo", icon: RotateCw, text: "Puedes generar una nueva tabla desde el botón 'Nueva Tabla', pero solo si la partida no está en curso." },
];

export default function InstructionsPage() {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col bg-background text-foreground p-12">
        {/* Contenedor */}
        <div className="">
          {/* Título e ícono */}
          <div className="text-left justify-center sm:text-left pl-4">
            <h1 className="text-[20px] font-bold flex items-center gap-2 justify-start">
              <img src="/LoteriaSI-InterfazIconoInstructivo.svg" alt="Instructivo Icon" className="h-6 w-6 inline-block mr-2" />
              Instructivo del Juego
            </h1>
            <p className="text-muted-foreground mt-2 text-[18px]">
              Aquí encontrarás los modos de juego y las instrucciones para jugar a la lotería.
            </p>
          </div>



          {/* Botón volver (arriba) */}
          <div className="mb-8 flex items-right justify-end">
            <Button className="w-sm" onClick={() => router.push("/")}>
              Volver al inicio
            </Button>
          </div>

          {/* Título: Modos de juego */}
          <div className="shadow-md mb-6">
            <CardContent className="p-4 text-start bg-[#D4165C]/40">
              <h2 className="text-[18px] font-semibold pl-1">Modos de juego</h2>
            </CardContent>
          </div>

          {/* Tarjetas de modos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {MODOS.map((m) => (
              <Card key={m.key} className="shadow-md hover:shadow-xl transition-all duration-300 ease-in-out rounded-2xl hover:translate-y-[-4px] hover:bg-card/95 cursor-pointer">
                <CardContent className="p-5 flex flex-col items-center sm:items-center sm:text-center space-y-4">
                  <img src={m.img} alt={m.title} className="w-[100px] sm:w-[120px] md:w-[140px] h-auto rounded-md border mt-2" />
                  <div>
                    <h3 className="text-lg font-semibold text-center">{m.title}</h3>
                    <p className="text-muted-foreground mt-2 text-[16px] leading-relaxed text-left">{m.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Título: Reglas del juego */}
          <div className="shadow-md  mb-6">
            <CardContent className="p-4 text-start bg-[#D4165C]/40">
              <h2 className="text-[18px] font-semibold pl-1">Reglas de juego</h2>
            </CardContent>
          </div>

          {/* Tarjetas de reglas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GAME_RULES.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <Card key={i} className="shadow-md hover:shadow-xl transition-all duration-300 ease-in-out rounded-2xl hover:translate-y-[-4px] hover:bg-card/95 cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center sm:items-center text-left sm:text-center space-y-4">
                    <div className="bg-primary/10 p-3 rounded-full transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{rule.title}</h3>
                    <p className="text-[16px] font-bold text-primary">{rule.value}</p>
                    <p className="text-muted-foreground text-[16px] leading-relaxed text-left">{rule.text}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Botón volver (abajo) */}
          <div className="mt-8 flex items-right justify-end">
            <Button className="w-sm" onClick={() => router.push("/")}>
              Volver al inicio
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
