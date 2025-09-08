"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Gamepad2 } from "lucide-react";

export default function Home() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const router = useRouter();

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && room.trim()) {
      // Validación: revisa si el nombre ya existe en la sala
      const storageKey = `loteria-room-${room.trim()}`;
      const roomDataStr = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
      if (roomDataStr) {
        try {
          const roomData = JSON.parse(roomDataStr);
          if (roomData.players && roomData.players[name.trim()]) {
            alert("Ya existe un jugador con ese nombre en la sala. Elige otro.");
            return;
          }
        } catch (err) {
          // Si hay error al leer, permite el ingreso
        }
      }
      router.push(`/room/${room}?name=${encodeURIComponent(name.trim())}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 flex items-center justify-center">
        <div className="w-full max-w-md">
          <Card className="border-2 border-primary/50 shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-headline">¡Bienvenido!</CardTitle>
              <CardDescription className="pt-2">Ingresa tu nombre y el código de la sala para jugar.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJoinRoom} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">Tu Nombre</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. El Valiente"
                    required
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="room" className="text-base">Código de Sala</Label>
                  <Input
                    id="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value.toUpperCase())}
                    placeholder="Ej. JUEGO123"
                    required
                    className="text-base"
                  />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  <Gamepad2 className="mr-2"/>
                  Entrar a la Sala
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="text-center p-4 text-muted-foreground text-sm">
        <p>Hecho con ♥ para la Lotería Mexicana</p>
      </footer>
    </div>
  );
}
