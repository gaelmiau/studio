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
  ranking: { name: string; seleccionadas: number }[];
  onRestart?: () => void;
}

export function WinnerModal({ open, onRestart, ranking }: WinnerModalProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-card border-primary">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-4xl font-headline text-primary text-center">
            ¡¡Lotería!!
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="text-center text-lg text-foreground pt-4">
              <div className="mb-2">Ranking final:</div>
              <ol className="space-y-1">
                {ranking.slice(0, 3).map((p, idx) => (
                  <li key={p.name} className="font-bold">
                    {idx === 0 && "🥇"}
                    {idx === 1 && "🥈"}
                    {idx === 2 && "🥉"}
                    {` ${p.name} (${p.seleccionadas} cartas)`}
                  </li>
                ))}
              </ol>
            </div>
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