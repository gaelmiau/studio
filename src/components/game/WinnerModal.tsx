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

interface WinnerModalProps {
  open: boolean;
  winnerName?: string | null;
  onRestart?: () => void;
}

export function WinnerModal({ open, onRestart, winnerName }: WinnerModalProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-card border-primary">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-4xl font-headline text-primary text-center">
            ¡¡Lotería!!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg text-foreground pt-4">
            ¡Felicidades, <span className="font-bold">{winnerName}</span> ha ganado el juego!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="text-6xl text-center p-4">🎉🎊🥳</div>
        {onRestart && (
            <AlertDialogFooter>
                <Button onClick={onRestart} className="w-full" size="lg">
                    Jugar de Nuevo (Nuevas Tablas)
                </Button>
            </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
