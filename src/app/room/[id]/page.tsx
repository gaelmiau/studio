"use client";

import { useSearchParams } from 'next/navigation';
import { Header } from "@/components/Header";
import { LoteriaGame } from "@/components/game/LoteriaGame";

export default function RoomPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const name = searchParams.get('name');
  const roomId = params.id;

  if (!name) {
    // This could be a redirect to home page in a real app
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl">Error: Nombre de jugador no proporcionado.</h1>
            <a href="/" className="text-blue-500 underline">Volver al inicio</a>
        </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <LoteriaGame roomId={roomId} playerName={name} />
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>Sala de Juego: <span className="font-bold text-primary">{roomId}</span> | Jugador: <span className="font-bold text-primary">{name}</span></p>
      </footer>
    </div>
  );
}
