"use client";

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface NameExistsModalProps {
    open: boolean;
    onClose: () => void;
}

export function NameExistsModal({ open, onClose }: NameExistsModalProps) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent
                className="max-w-sm w-[90vw] pt-4 px-6 pb-6"
            >
                {/* Botón de cerrar (X) */}
                <AlertDialogCancel asChild>
                    <button
                        className="
                            absolute top-3 right-3
                            rounded-full p-1.5
                            bg-[#165C5D] hover:bg-[#1E7374]
                            border border-gray-200 shadow-sm
                            transition-all duration-200
                            w-7 h-7 flex items-center justify-center
                        "
                        aria-label="Cerrar"
                        onClick={onClose}
                    >
                        <X className="w-4 h-4 text-[#ffffff] hover:text-gray-700" />
                    </button>
                </AlertDialogCancel>

                <AlertDialogHeader className="mt-6">
                    <AlertDialogTitle className="text-lg font-semibold text-center">
                        Nombre ya en uso
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-sm text-muted-foreground mt-2">
                        Ya existe un jugador con ese nombre en la sala. Por favor, elige otro nombre para continuar.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6">
                    <div className="w-full flex justify-center">
                        <Button
                            onClick={onClose}
                            className="
                                w-[min(80%,240px)]
                                bg-[hsl(180.85,61.74%,22.55%)]
                                hover:bg-[hsl(180.85,61.74%,25%)]
                                text-white
                            "
                        >
                            Entendido
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
