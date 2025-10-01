export interface Card {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

// A selection of 24 cards for the game
export const CARDS: Card[] = [
  { id: 1, name: "LA INFORMACIÓN", imageUrl: "/cards/1.jpg", description: "Lo que vale oro y no compartes con todos." },
  { id: 2, name: "EL USUARIO", imageUrl: "/cards/2.jpg", description: "El que con buen juicio y atención, es la primera línea de protección." },
  { id: 3, name: "EL CIBERDELINCUENTE", imageUrl: "/cards/3.jpg", description: "El que con malas intenciones, roba información en diferentes situaciones." },
  { id: 4, name: "LA CIBERSEGURIDAD", imageUrl: "/cards/4.jpg", description: "El escudo virtual sin igual, que protege el entorno digital." },
  { id: 5, name: "LA INGENIERÍA SOCIAL", imageUrl: "/cards/5.jpg", description: "La técnica que sabe convencer, para tu información confidencial obtener." },
  { id: 6, name: "LAS CIBERAMENAZAS", imageUrl: "/cards/6.jpg", description: "Los riesgos que debes esquivar, para tu información resguardar." },
  { id: 7, name: "EL PHISHING", imageUrl: "/cards/7.jpg", description: "El correo que te pesca sin anzuelo." },
  { id: 8, name: "EL MALWARE", imageUrl: "/cards/8.jpg", description: "El software que te llega como amigo, pero se comporta como enemigo." },
  { id: 9, name: "INFOSEGURA", imageUrl: "/cards/9.jpg", description: "La estrategia de concientización que te enseña a proteger tu información." },
  { id: 10, name: "LA CONTRASEÑA SEGURA", imageUrl: "/cards/10.jpg", description: "La que en secreto debes tener, para que a tus cuentas nadie pueda acceder." },
  { id: 11, name: "LAS COPIAS DE SEGURIDAD", imageUrl: "/cards/11.jpg", description: "Las que haces sin dudar, por si todo llega a fallar." },
  { id: 12, name: "LAS ACTUALIZACIONES DE SOFTWARE", imageUrl: "/cards/12.jpg", description: "Las que realizar en minutos, y te evitan muchos sustos." },
  { id: 13, name: "EL DOBLE FACTOR DE AUTENTICACIÓN", imageUrl: "/cards/13.jpg", description: "El que te pide doble pase, y al que no eres tú, lo rechace." },
  { id: 14, name: "EL ANTIMALWARE", imageUrl: "/cards/14.jpg", description: "El que al malware enfrenta, y tu tranquilidad aumenta." },
  { id: 15, name: "EL SENTIDO COMÚN", imageUrl: "/cards/15.jpg", description: "El que no se instala, pero siempre debes usar." },
  { id: 16, name: "EL SOFTWARE LEGÍTIMO", imageUrl: "/cards/16.jpg", description: "El que viene sin sorpresas, ni malware que te estresa." },
  { id: 17, name: "EL UV-CIRST", imageUrl: "/cards/17.jpg", description: "El que responde con destreza, para frenar toda amenaza con certeza" },
  { id: 18, name: "LA COMUNIDAD SEGURA", imageUrl: "/cards/18.jpg", description: "El grupo que se asesora y su seguridad mejora." },
  { id: 19, name: "LA NAVEGACIÓN SEGURA", imageUrl: "/cards/19.jpg", description: "La que, sin apuros, te lleva por caminos seguros." },
  { id: 20, name: "LOS DISPOSITIVOS PROTEGIDOS", imageUrl: "/cards/20.jpg", description: "Los que mantienes blindados y siempre respaldados." },
  { id: 21, name: "LA IDENTIDAD DIGITAL", imageUrl: "/cards/21.jpg", description: "La que cuidas en la red, para que nadie te conozca al pie." },
  { id: 22, name: "EL RESPETO EN LÍNEA", imageUrl: "/cards/22.jpg", description: "Lo que al responder implementas sin ofender." },
  { id: 23, name: "LOS FRAUDES EN LÍNEA", imageUrl: "/cards/23.jpg", description: "Los descuentos asombrosos que te salen muy costosos." },
  { id: 24, name: "LAS COMUNICACIONES CIFRADAS", imageUrl: "/cards/24.jpg", description: "Las que van bien protegidas y mantienen tus charlas escondidas." },
  { id: 25, name: "EL WI-FI CONFIABLE", imageUrl: "/cards/25.jpg", description: "La red con clave y cifrado, donde navegas siempre confiado." },
  { id: 26, name: "EL REPORTE", imageUrl: "/cards/26.jpg", description: "El que realizas al momento, para que no avance con el tiempo." },
  { id: 27, name: "EL CIERRE DE SESIÓN", imageUrl: "/cards/27.jpg", description: "La práctica que al concluir, el acceso a extraños no va a permitir." },
  { id: 28, name: "EL ESCRITORIO LIMPIO", imageUrl: "/cards/28.jpg", description: "El espacio que al ordenar, tus secretos sabe guardar." },
  { id: 29, name: "LA PRIVACIDAD EN REDES SOCIALES", imageUrl: "/cards/29.jpg", description: "Las configuraciones de seguridad, que a curiosos frena con facilidad." },
  { id: 30, name: "LA NORMATIVIDAD", imageUrl: "/cards/30.jpg", description: "La que con normas al frente, la información protege siempre." },
  { id: 31, name: "EL AVISO DE PRIVACIDAD", imageUrl: "/cards/31.jpg", description: "El que al revisar con atención, te dice como será tratada tu información" },
  { id: 32, name: "LA ALERTA DE SEGURIDAD", imageUrl: "/cards/32.jpg", description: "La que al sonar, no debes ignorar." },
  { id: 33, name: "LOS PERMISOS DE APLICACIONES", imageUrl: "/cards/33.jpg", description: "Los que a cada app limitarán, y solo lo justo les concederán." },
  { id: 34, name: "LA CUENTA ÚNICA", imageUrl: "/cards/34.jpg", description: "La que para un fin fue creada, y nunca debe ser mezclada." },
  { id: 35, name: "EL BORRADO SEGURO", imageUrl: "/cards/35.jpg", description: "El que al eliminar, nignuna huella dejará." },
  { id: 36, name: "LA HIGIENE DIGITAL", imageUrl: "/cards/36.jpg", description: "Los hábitos de protección, que en línea te evitan una infección." },
  { id: 37, name: "LAS COMPRAS SEGURAS", imageUrl: "/cards/37.jpg", description: "Las que antes de realizar, sus elementos debes verificar." },
  { id: 38, name: "EL BLOQUEO DE PANTALLA", imageUrl: "/cards/38.jpg", description: "El que con huella, clave o patrón, protege los dispositivos de una intrusión." },
  { id: 39, name: "EL ESTUDIANTE CIBERSEGURO", imageUrl: "/cards/39.jpg", description: "El que con buenas prácticas al implementar, su información académica sabe cuidar." },
  { id: 40, name: "EL SMISHING", imageUrl: "/cards/40.jpg", description: "El que por mensaje llega al celular y siempre debes ignorar." },
  { id: 41, name: "EL VISHING", imageUrl: "/cards/41.jpg", description: "El que se hace sonar, y con falsas palabras busca engañar." },
  { id: 42, name: "EL QUISHING", imageUrl: "/cards/42.jpg", description: "El que a simple vista es difícil detectar, por ser un código para escanear." },
  { id: 43, name: "EL RANSOMWARE", imageUrl: "/cards/43.jpg", description: "El que tu información busca cifrar, y nunca debes pagar." },
  { id: 44, name: "LOS DEEPFAKES", imageUrl: "/cards/44.jpg", description: "El video que parece real, pero es un engaño digital." },
  { id: 45, name: "EL CYBERBULLYING", imageUrl: "/cards/45.jpg", description: "El que a personas puede lastimar, y en línea hay que eliminar." },
  { id: 46, name: "LOS DATOS PERSONALES", imageUrl: "/cards/46.jpg", description: "Los datos de identificación, que mantienes bajo protección." },
  { id: 47, name: "LA PUBLICIDAD ENGAÑOSA", imageUrl: "/cards/47.jpg", description: "La que analizas con cuidado, para no ser engañado." },
  { id: 48, name: "EL SPAM", imageUrl: "/cards/48.jpg", description: "El correo molesto y sin razón, que llega sin invitación." },
  { id: 49, name: "EL DISI", imageUrl: "/cards/49.jpg", description: "El que conmemora con unión, la seguridad de la información." },
  { id: 50, name: "EL SOFTWARE PIRATA", imageUrl: "/cards/50.jpg", description: "El que por tu seguridad, no debes instalar." },
  { id: 51, name: "LAS FAKE NEWS", imageUrl: "/cards/51.jpg", description: "Las noticias que desinforman, y la verdad disorsionan." },
  { id: 52, name: "LA USB DESCONOCIDA", imageUrl: "/cards/52.jpg", description: "La que sin conocer no debes conectar, para tu equipo no infectar." },
  { id: 53, name: "EL BORRADO REMOTO", imageUrl: "/cards/53.jpg", description: "El que por seguridad has de usar, si llegas a perder tu celular." },
  { id: 54, name: "LA REPUTACIÓN EN LÍNEA", imageUrl: "/cards/54.jpg", description: "La que con buen actuar, en línea debes cuidar." },
  { id: 55, name: "EL PERFIL DESCONOCIDO", imageUrl: "/cards/55.jpg", description: "Al que no le das tu amistad, si no conoces su identidad." }

];

export const WINNING_PATTERNS: number[][] = [
  // Filas
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // Columnas
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // Diagonales
  [0, 5, 10, 15],
  [3, 6, 9, 12],
  // Esquinas
  [0, 3, 12, 15],
  // Cuadrado central
  [0, 1, 4, 5],
  [2, 3, 6, 7],
  [8, 9, 12, 13],
  [10, 11, 14, 15],
];

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * @param array The array to shuffle.
 * @returns The shuffled array.
 */
export function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

/**
 * Generates a random 16-card Lotería board.
 * @returns An array of 16 unique Card objects.
 */
export function generateBoard(): Card[] {
  return shuffle(CARDS).slice(0, 16);
}

/**
 * Creates a full shuffled deck for the dealer.
 * @returns A shuffled array of all Card objects.
 */
export function createDeck(): Card[] {
  return shuffle(CARDS);
}

/**
 * Checks if a set of marked indices on a board constitutes a win.
 * @param markedIndices The indices of the marked cards (0-15).
 * @returns True if a winning pattern is met, false otherwise.
 */
export function checkWin(
  markedIndices: number[],
  board: Card[],
  calledCardIds: number[]
): boolean {
  // Todas las cartas marcadas deben estar en las llamadas y deben ser 16
  return (
    markedIndices.length === 16 &&
    markedIndices.every(idx => calledCardIds.includes(board[idx].id))
  );
}
