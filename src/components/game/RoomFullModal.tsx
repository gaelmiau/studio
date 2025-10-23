"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

interface RoomFullModalProps {
  open: boolean;
  onClose: () => void;
  roomId?: string;
  maxPlayers?: number;
}

export function RoomFullModal({ open, onClose, roomId, maxPlayers = 25 }: RoomFullModalProps) {
  const router = useRouter();

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-sm w-[90vw] pt-4 px-6 pb-6 relative">
        {/* Close button inside recuadro (responsive) */}
        <AlertDialogCancel asChild>
          <button
            className="
              absolute top-3 right-3
              rounded-full p-1.5
              bg-[#165C5D] hover:bg-[#1E7374]
              border border-gray-200
              shadow-sm transition-all duration-200
              w-7 h-7 flex items-center justify-center
            "
            aria-label="Cerrar"
            onClick={onClose}
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </AlertDialogCancel>

        <AlertDialogHeader className="mt-6">
          <AlertDialogTitle className="text-lg font-semibold text-center">
            Sala llena
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm text-muted-foreground mt-2">
            {`La sala ${roomId ? `"${roomId}" ` : ""}ha alcanzado el límite de ${maxPlayers} jugadores.`}
            <br />
            Intenta nuevamente cuando alguien se desconecte o únete a otra sala.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">
          <div className="w-full flex flex-col gap-3">
            <Button
              onClick={onClose}
              className="w-full bg-[hsl(180.85,61.74%,22.55%)] hover:bg-[hsl(180.85,61.74%,25%)] text-white"
            >
              Intentar de nuevo
            </Button>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              className="w-full"
            >
              Volver al inicio
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}