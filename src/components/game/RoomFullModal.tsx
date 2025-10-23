"use client";

import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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
      <AlertDialogContent className="max-w-sm w-[90vw]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-center">
            Sala llena
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm text-muted-foreground mt-2">
            La sala {roomId ? `"${roomId}" ` : ""}ya alcanzó el límite de {maxPlayers} jugadores. Intenta nuevamente cuando alguien se desconecte o únete a otra sala.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4">
          <div className="w-full flex flex-col gap-2">
            <Button onClick={onClose} className="w-full">
              Intentar de nuevo
            </Button>
            <Button onClick={() => router.push("/")} variant="outline" className="w-full">
              Volver al inicio
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}