"use client";

import { useState } from "react";
import { Crown, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PlayerState {
  name: string;
  isOnline: boolean;
}

interface PlayerListProps {
  players: Record<string, PlayerState>;
  currentPlayerName: string;
  hostName: string;
  roomId: string;
}

export function PlayerList({
  players,
  currentPlayerName,
  hostName,
  roomId,
}: PlayerListProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const playerArray = Object.values(players);

  return (
    <Card>
      <CardHeader>
        <div className="mb-2 text-sm text-muted-foreground text-center">
          Sala de Juego:{" "}
          <span className="font-bold text-primary">{roomId}</span>
        </div>

        {/* Encabezado con botón toggle */}
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users />
            Jugadores (
            {playerArray.filter((p) => p.isOnline).length}/{playerArray.length})
          </div>

          {/* Botón circular */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[hsl(var(--primary))] text-white text-lg"
          >
            {isExpanded ? "–" : "+"}
          </button>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div
          className={cn(
            "transition-all duration-500 ease-in-out overflow-hidden",
            isExpanded ? "opacity-100" : "max-h-0 opacity-0"
          )}
        >
          {/* Contenedor con scroll */}
          <div
            className=" "
            style={{
              maxHeight: "6.5rem", // Ajustar este valor para controlar cuántos jugadores se ven
              // Ejemplo:
              // ~12rem ≈ 3 jugadores
              // ~16rem ≈ 4 jugadores
              // ~20rem ≈ 5 jugadores
            }}
          >
            <ul className="space-y-3 py-2">
              {playerArray.map((player) => (
                <li
                  key={player.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      className={cn(
                        "border-2",
                        player.isOnline ? "border-green-500" : "border-gray-400"
                      )}
                    >
                      <AvatarFallback>
                        {player.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "font-medium",
                        player.name === currentPlayerName && "text-primary"
                      )}
                    >
                      {player.name}
                      {player.name === currentPlayerName && " (Tú)"}
                    </span>
                  </div>
                  {player.name === hostName && (
                    <Crown className="w-5 h-5 text-yellow-500">
                      <title>Anfitrión</title>
                    </Crown>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
