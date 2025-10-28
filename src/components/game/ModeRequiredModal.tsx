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

interface ModeRequiredModalProps {
    open: boolean;
    onClose: () => void;
}

export function ModeRequiredModal({ open, onClose }: ModeRequiredModalProps) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="
                max-w-sm w-[90vw]
                pt-4 px-6 pb-6
            ">
                {/* Botón de cerrar (X) reposicionado */}
                <AlertDialogCancel asChild>
                    <button
                        className="
                            absolute 
                            top-3 right-3
                            rounded-full 
                            p-1.5
                            bg-[#165C5D]
                            hover:bg-[#1E7374]
                            border border-gray-200
                            shadow-sm
                            transition-all
                            duration-200
                            w-7 h-7
                            flex items-center justify-center
                        "
                        aria-label="Cerrar"
                        onClick={onClose}
                    >
                        <X className="w-4 h-4 text-[#00000] hover:text-gray-700" />
                    </button>
                </AlertDialogCancel>

                <AlertDialogHeader className="mt-6">
                    <AlertDialogTitle className="text-lg font-semibold text-center">
                        Seleccionar modo de juego
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-sm text-muted-foreground mt-2">
                        Debes seleccionar un modo de juego antes de iniciar la partida.
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
                            Ok
                        </Button>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}