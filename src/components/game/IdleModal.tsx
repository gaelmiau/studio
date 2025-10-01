"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface IdleModalProps {
  open: boolean;
  onStay: () => void;  // Acción si el jugador confirma que sigue
  onExit: () => void;  // Acción si el jugador no responde o confirma salida
}

export function IdleModal({ open, onStay, onExit }: IdleModalProps) {
  useEffect(() => {
    if (!open) return;

    // Si no responde en 5s, lo sacamos
    const timeout = setTimeout(() => {
      onExit();
    }, 5000);

    return () => clearTimeout(timeout);
  }, [open, onExit]);

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>¿Sigues ahí?</DialogTitle>
          <DialogDescription>
            Detectamos inactividad. Si no respondes, tu sesión terminará.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onStay}>
            Sí, sigo aquí
          </Button>
          <Button variant="destructive" onClick={onExit}>
            Salir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
