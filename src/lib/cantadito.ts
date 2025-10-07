export function cantarCarta(nombre: string, descripcion: string, lang: string = "es-MX") {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new window.SpeechSynthesisUtterance(`${nombre}. ${descripcion}`);
  utter.lang = lang;
  window.speechSynthesis.speak(utter);
}

export function cantarCartaConAudio(card: { id: number; name: string; description: string }, lang: string = "es-MX") {
  // Intenta reproducir audio específico
  const audio = new Audio(`/audios/${card.id}.mp3`);
  audio.onerror = () => {
    // Si no existe el audio, usa la voz sintética
    cantarCarta(card.name, card.description, lang);
  };
  audio.oncanplaythrough = () => {
    audio.play();
  };
  audio.load();
}