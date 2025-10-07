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
      <DialogContent className="max-w-sm" style={{ backgroundColor: "hsl(180.85 61.74% 22.55%)" }}>
        <DialogHeader>
          <DialogTitle>¿Sigues ahí?</DialogTitle>
          <DialogDescription>
            Detectamos inactividad. Si no respondes, tu sesión finalizará.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4" >
          <Button variant="outline" onClick={onStay} style={{ backgroundColor: "hsl(337.89 81.2% 45.88%)" }}>
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
