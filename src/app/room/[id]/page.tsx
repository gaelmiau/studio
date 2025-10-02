"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useParams, useRouter } from "next/navigation";
import { listenRoom, handlePlayerLeave, getRoom } from "@/lib/firebaseRoom";
import { Header } from "@/components/Header";
import { LoteriaGame } from "@/components/game/LoteriaGame";
import { ref, onDisconnect } from "firebase/database";
import { database } from "@/lib/firebase";

export default function RoomPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();

  const name = searchParams.get('name');
  const roomId = params.id as string;

  const [roomData, setRoomData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;
    const unsubscribe = listenRoom(roomId, (data) => {
      setRoomData(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [roomId]);

  // Si no hay nombre, redirige a la página principal
  useEffect(() => {
    if (!name) {
      router.replace("/");
    }
  }, [name, router]);

  // Si la sala no existe o no tiene jugadores, redirige a Home
  useEffect(() => {
    if (!loading && (!roomData || !roomData.players || !name || !roomData.players[name])) {
      router.replace("/");
    }
  }, [loading, roomData, name, router]);

  useEffect(() => {
    if (!roomId || !name) return;
    const playerRef = ref(database, `rooms/${roomId}/players/${name}`);
    onDisconnect(playerRef).remove();

    // Cuando el componente se desmonta (jugador se va), reasigna anfitrión si es necesario
    return () => {
      getRoom(roomId).then(roomData => {
        if (roomData) {
          handlePlayerLeave(roomId, name, roomData);
        }
      });
    };
  }, [roomId, name]);

  useEffect(() => {
    if (!roomData || !roomData.players || !roomData.gameState) return;
    const hostName = roomData.gameState.host;
    const playerNames = Object.keys(roomData.players);

    // Si el anfitrión actual ya no está en la lista de jugadores, reasigna
    if (hostName && !playerNames.includes(hostName)) {
      // Solo el primer jugador conectado ejecuta la reasignación para evitar conflictos
      if (name === playerNames[0]) {
        handlePlayerLeave(roomId, hostName, roomData);
      }
    }
  }, [roomData, roomId, name]);

  if (loading || !name || !roomData || !roomData.players || !roomData.players[name]) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">Cargando sala, un momento...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <LoteriaGame
          roomId={roomId}
          playerName={name}
          roomData={roomData}
        />
      </main>
      {/* 
      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>Sala de Juego: <span className="font-bold text-primary">{roomId}</span> | Jugador: <span className="font-bold text-primary">{name}</span></p>
      </footer>
      */}
    </div>
  );
}