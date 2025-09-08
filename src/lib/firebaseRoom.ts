import { database } from "./firebase";
import { ref, set, get, onValue, update, off } from "firebase/database";

// Escuchar cambios en la sala en tiempo real
export function listenRoom(roomId: string, callback: (data: any) => void) {
  const roomRef = ref(database, `rooms/${roomId}`);
  const unsubscribe = onValue(roomRef, (snapshot) => {
    callback(snapshot.val());
  });
  // Devuelve función para dejar de escuchar
  return () => off(roomRef, "value", unsubscribe);
}

// Obtener el estado actual de la sala (una sola vez)
export async function getRoom(roomId: string) {
  const roomRef = ref(database, `rooms/${roomId}`);
  const snapshot = await get(roomRef);
  return snapshot.val();
}

// Crear o reemplazar el estado de la sala
export async function setRoom(roomId: string, data: any) {
  const roomRef = ref(database, `rooms/${roomId}`);
  await set(roomRef, data);
}

// Actualizar parcialmente el estado de la sala
export async function updateRoom(roomId: string, data: any) {
  const roomRef = ref(database, `rooms/${roomId}`);
  await update(roomRef, data);
}