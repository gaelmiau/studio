"use client";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { X } from "lucide-react";

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
      <DialogContent
        className="max-w-sm"
        style={{ backgroundColor: "hsl(180.85 61.74% 22.55%)" }}
      >
        {/* Botón de cerrar dentro del recuadro (arriba derecha) */}
        <button
          className="
            absolute top-3 right-3
            w-8 h-8 rounded-sm
            bg-[#165C5D] hover:bg-[#D4165C]
            flex items-center justify-center
            border border-gray-200 shadow-sm
            transition-colors duration-150
            z-20
          "
          aria-label="Cerrar"
          onClick={onStay}
        >
          <X className="w-4 h-4 text-white" />
        </button>

        <DialogHeader>
          <DialogTitle className="text-white">¿Sigues ahí?</DialogTitle>
          <DialogDescription className="text-white/90">
            Detectamos inactividad. Si no respondes, tu sesión finalizará.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={onStay}
            style={{ backgroundColor: "hsl(337.89 81.2% 45.88%)" }}
          >
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
