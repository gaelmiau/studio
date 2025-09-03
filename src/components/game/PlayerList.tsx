"use client";

import { Crown, User, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface PlayerState {
  name: string;
  isOnline: boolean;
}

interface PlayerListProps {
  players: Record<string, PlayerState>;
  currentPlayerName: string;
  hostName: string;
}

export function PlayerList({ players, currentPlayerName, hostName }: PlayerListProps) {
  const playerArray = Object.values(players);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users />
          Jugadores ({playerArray.filter(p => p.isOnline).length}/{playerArray.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {playerArray.map((player) => (
            <li key={player.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className={cn("border-2", player.isOnline ? "border-green-500" : "border-gray-400")}>
                  <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className={cn("font-medium", player.name === currentPlayerName && "text-primary")}>
                  {player.name}
                  {player.name === currentPlayerName && " (Tú)"}
                </span>
              </div>
              {player.name === hostName && (
                <Crown className="w-5 h-5 text-yellow-500" title="Anfitrión" />
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
