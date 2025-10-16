"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface WinnerModalProps {
  open: boolean;
  ranking: { name: string; seleccionadas: number }[];
  onRestart?: () => void;
  gameMode?: string; //  Dependiendo del modo de juego, podrías mostrar diferentes mensajes o estilos
}

export function WinnerModal({ open, onRestart, ranking, gameMode }: WinnerModalProps) {
  const mostrarCartas = !gameMode || gameMode === "full"; // Solo en Tradicional

  return (
    <AlertDialog open={open}>
      <AlertDialogContent
        className="
          bg-cover bg-center border-none
          rounded-2xl shadow-lg overflow-hidden
          text-white text-center
          w-[90vw] max-w-[520px] sm:max-w-[480px] md:max-w-[500px] lg:max-w-[520px]
          aspect-[16/10] sm:aspect-[16/10] xs:aspect-auto
          transition-all duration-300 ease-in-out
          flex flex-col justify-between items-center
          min-h-[340px]
        "
        style={{
          backgroundImage: "url('/loteriaGanador2.png')",
          backgroundPosition: "center",
        }}
      >
        {/* Contenido principal: ranking */}
        <div className="flex-grow w-full flex flex-col justify-center items-center px-[clamp(0.5rem,3vw,1.5rem)] py-[clamp(1rem,4vw,2rem)]">
          <AlertDialogHeader>
            <AlertDialogTitle>
              <VisuallyHidden>Ganador del juego</VisuallyHidden>
            </AlertDialogTitle>
            <AlertDialogDescription asChild
              className="flex flex-col justify-center items-center 
                  text-[clamp(1rem,2vw,1.3rem)]
                  leading-snug">
              <div className="text-center text-lg text-black pt-[clamp(1rem,10vw,5rem)] text-[clamp(1.1rem,2.5vw,1.4rem)]">
                {/* Recuadro centrado para el ranking */}
                <div
                  className="
                    absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-20%]
                    w-[clamp(220px,60vw,270px)] min-h-[120px] max-h-[210px]
                    bg-white/50 rounded-xl shadow-lg flex flex-col justify-center items-center z-10
                    px-6 py-4
                  "
                >
                  
                  <ol className="space-y-1">
                    {ranking.slice(0, 3).map((p, idx) => (
                      <li key={p.name} className="font-bold text-[clamp(1rem,2vw,1.3rem)] text-[#165c5d]">
                        {idx === 0 && "🥇"}
                        {idx === 1 && "🥈"}
                        {idx === 2 && "🥉"}
                        {mostrarCartas
                          ? ` ${p.name} (${p.seleccionadas} cartas)`
                          : ` ${p.name}`}
                      </li>
                    ))}
                  </ol>
                </div>

              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>

        {/* Botón siempre abajo y responsivo */}
        <div className="mt-auto">
          {onRestart && (
            <AlertDialogFooter className="flex justify-center mt-[clamp(0.8rem, 2vw, 1.5rem)]">
              <Button onClick={onRestart} size="sm"
                className="
                  w-[clamp(10rem, 80vw, 20rem)]
                  text-[clamp(0.9rem, 2vw, 1.1rem)]
                  px-[clamp(1rem, 3vw, 2rem)] py-[clamp(0.4rem, 1vw, 0.8rem)]
                  shadow-md
                  transition-all duration-200 ease-in-out
                " >
                Jugar de Nuevo
              </Button>
            </AlertDialogFooter>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}