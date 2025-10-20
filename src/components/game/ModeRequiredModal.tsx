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

interface ModeRequiredModalProps {
    open: boolean;
    onClose: () => void;
}

export function ModeRequiredModal({ open, onClose }: ModeRequiredModalProps) {
    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="max-w-sm w-[90vw]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-semibold text-center">
                        Seleccionar modo de juego
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-sm text-muted-foreground mt-2">
                        Debes seleccionar un modo de juego antes de iniciar la partida.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
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