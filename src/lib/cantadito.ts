export function cantarCarta(text: string, lang: string = "es-MX") {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utter = new window.SpeechSynthesisUtterance(text);
  utter.lang = lang;
  window.speechSynthesis.speak(utter);
}