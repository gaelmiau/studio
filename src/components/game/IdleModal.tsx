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

interface IdleModalProps {
  open: boolean;
  onStay: () => void; // Acción si el jugador confirma que sigue
  onExit: () => void; // Acción si el jugador no responde o confirma salida
}

export function IdleModal({ open, onStay, onExit }: IdleModalProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-card border-primary">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center">
            ¿Sigues ahí?
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-center text-lg text-foreground pt-4">
              Parece que no has interactuado en un rato.  
              ¿Quieres seguir en la sala?
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onExit} className="w-full">
            Salir
          </Button>
          <Button onClick={onStay} className="w-full">
            Sí, sigo aquí
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
