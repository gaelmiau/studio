export interface Card {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

// A selection of 24 cards for the game
export const CARDS: Card[] = [
  { id: 1, name: "El Gallo", imageUrl: "/cards/1.jpg", description: "El Gallo simboliza el amanecer y la vigilancia. Es un llamado a estar atentos y preparados para nuevas oportunidades." },
  { id: 2, name: "El Diablo", imageUrl: "/cards/2.jpg", description: "El Diablo representa las tentaciones y los desafíos que enfrentamos. Nos recuerda la importancia de la autodisciplina y la integridad." },
  { id: 3, name: "La Dama", imageUrl: "/cards/3.jpg", description: "La Dama simboliza la elegancia y la gracia. Nos invita a valorar la belleza en nuestras vidas y a actuar con cortesía y respeto hacia los demás." },
  { id: 4, name: "El Catrín", imageUrl: "/cards/4.jpg", description: "El Catrín representa la sofisticación y el estilo. Nos anima a ser auténticos y a expresar nuestra individualidad con confianza." },
  { id: 5, name: "El Paraguas", imageUrl: "/cards/5.jpg", description: "El Paraguas simboliza la protección y la seguridad. Nos recuerda la importancia de cuidar de nosotros mismos y de nuestros seres queridos." },
  { id: 6, name: "La Sirena", imageUrl: "/cards/6.jpg", description: "La Sirena representa la belleza y el misterio del mar. Nos invita a explorar lo desconocido y a confiar en nuestra intuición." },
  { id: 7, name: "La Escalera", imageUrl: "/cards/7.jpg", description: "La Escalera simboliza el progreso y la superación personal. Nos anima a seguir adelante y a alcanzar nuestras metas con determinación." },
  { id: 8, name: "La Botella", imageUrl: "/cards/8.jpg", description: "La Botella representa la celebración y la alegría. Nos recuerda la importancia de disfrutar de los momentos especiales y de compartir con quienes amamos." },
  { id: 9, name: "El Barril", imageUrl: "/cards/9.jpg", description: "El Barril simboliza la abundancia y la prosperidad. Nos invita a ser generosos y a valorar lo que tenemos." },
  { id: 10, name: "El Árbol", imageUrl: "/cards/10.jpg", description: "El Árbol representa la vida y el crecimiento. Nos recuerda la importancia de nuestras raíces y de nutrir nuestro desarrollo personal." },
  { id: 11, name: "El Melón", imageUrl: "/cards/11.jpg", description: "El Melón simboliza la dulzura y la satisfacción. Nos anima a disfrutar de los placeres simples de la vida y a compartir con los demás." },
  { id: 12, name: "El Valiente", imageUrl: "/cards/12.jpg", description: "El Valiente representa el coraje y la determinación. Nos invita a enfrentar nuestros miedos y a actuar con valentía en la búsqueda de nuestros sueños." },
  { id: 13, name: "El Gorrito", imageUrl: "/cards/13.jpg", description: "El Gorrito simboliza la alegría y la festividad. Nos recuerda la importancia de celebrar la vida y de mantener una actitud positiva." },
  { id: 14, name: "La Muerte", imageUrl: "/cards/14.jpg", description: "La Muerte representa la transformación y el renacimiento. Nos invita a aceptar los cambios y a ver las oportunidades que surgen de los finales." },
  { id: 15, name: "La Pera", imageUrl: "/cards/15.jpg", description: "La Pera simboliza la fertilidad y la abundancia. Nos anima a valorar la generosidad de la naturaleza y a compartir nuestros recursos con los demás." },
  { id: 16, name: "La Bandera", imageUrl: "/cards/16.jpg", description: "La Bandera representa la identidad y el orgullo. Nos invita a honrar nuestras raíces y a celebrar nuestra cultura con respeto y dignidad." },
  { id: 17, name: "El Bandolón", imageUrl: "/cards/17.jpg", description: "El Bandolón simboliza la música y la alegría. Nos recuerda la importancia de la expresión artística y de encontrar armonía en nuestras vidas." },
  { id: 18, name: "El Violoncello", imageUrl: "/cards/18.jpg", description: "El Violoncello representa la profundidad y la emoción. Nos invita a conectar con nuestros sentimientos y a expresar nuestra verdad con autenticidad." },
  { id: 19, name: "La Garza", imageUrl: "/cards/19.jpg", description: "La Garza simboliza la elegancia y la paciencia. Nos anima a observar nuestro entorno con atención y a actuar con sabiduría en nuestras decisiones." },
  { id: 20, "name": "El Pájaro", imageUrl: "/cards/20.jpg", description: "El Pájaro representa la libertad y la comunicación. Nos invita a expresar nuestras ideas y a buscar nuevas perspectivas con mente abierta." },
  { id: 21, "name": "La Mano", imageUrl: "/cards/21.jpg", description: "La Mano simboliza la acción y la colaboración. Nos recuerda la importancia de trabajar juntos y de apoyar a quienes nos rodean." },
  { id: 22, "name": "La Bota", imageUrl: "/cards/22.jpg", description: "La Bota representa el viaje y la aventura. Nos anima a explorar nuevos caminos y a abrazar las experiencias que la vida nos ofrece." },
  { id: 23, "name": "La Luna", imageUrl: "/cards/23.jpg", description: "La Luna simboliza la intuición y el misterio. Nos invita a confiar en nuestra voz interior y a explorar las profundidades de nuestro ser." },
  { id: 24, "name": "El Cotorro", imageUrl: "/cards/24.jpg", description: "El Cotorro representa la alegría y la sociabilidad. Nos recuerda la importancia de compartir momentos felices con amigos y familiares." },
];

export const WINNING_PATTERNS: number[][] = [
  // Rows
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // Columns
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // Diagonals
  [0, 5, 10, 15],
  [3, 6, 9, 12],
  // Four Corners
  [0, 3, 12, 15],
  // Square
  [0, 1, 4, 5]
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
