export interface Card {
  id: number;
  name: string;
  imageUrl: string;
  hint: string;
}

// A selection of 24 cards for the game
export const CARDS: Card[] = [
  { id: 1, name: "El Gallo", imageUrl: "https://picsum.photos/300/420?random=1", hint: "rooster" },
  { id: 2, name: "El Diablo", imageUrl: "https://picsum.photos/300/420?random=2", hint: "devil" },
  { id: 3, name: "La Dama", imageUrl: "https://picsum.photos/300/420?random=3", hint: "lady" },
  { id: 4, name: "El Catrín", imageUrl: "https://picsum.photos/300/420?random=4", hint: "dandy" },
  { id: 5, name: "El Paraguas", imageUrl: "https://picsum.photos/300/420?random=5", hint: "umbrella" },
  { id: 6, name: "La Sirena", imageUrl: "https://picsum.photos/300/420?random=6", hint: "mermaid" },
  { id: 7, name: "La Escalera", imageUrl: "https://picsum.photos/300/420?random=7", hint: "ladder" },
  { id: 8, name: "La Botella", imageUrl: "https://picsum.photos/300/420?random=8", hint: "bottle" },
  { id: 9, name: "El Barril", imageUrl: "https://picsum.photos/300/420?random=9", hint: "barrel" },
  { id: 10, name: "El Árbol", imageUrl: "https://picsum.photos/300/420?random=10", hint: "tree" },
  { id: 11, name: "El Melón", imageUrl: "https://picsum.photos/300/420?random=11", hint: "melon" },
  { id: 12, name: "El Valiente", imageUrl: "https://picsum.photos/300/420?random=12", hint: "valiant man" },
  { id: 13, name: "El Gorrito", imageUrl: "https://picsum.photos/300/420?random=13", hint: "bonnet" },
  { id: 14, name: "La Muerte", imageUrl: "https://picsum.photos/300/420?random=14", hint: "death" },
  { id: 15, name: "La Pera", imageUrl: "https://picsum.photos/300/420?random=15", hint: "pear" },
  { id: 16, name: "La Bandera", imageUrl: "https://picsum.photos/300/420?random=16", hint: "flag" },
  { id: 17, name: "El Bandolón", imageUrl: "https://picsum.photos/300/420?random=17", hint: "mandolin" },
  { id: 18, name: "El Violoncello", imageUrl: "https://picsum.photos/300/420?random=18", hint: "cello" },
  { id: 19, name: "La Garza", imageUrl: "https://picsum.photos/300/420?random=19", hint: "heron" },
  { id: 20, "name": "El Pájaro", imageUrl: "https://picsum.photos/300/420?random=20", hint: "bird" },
  { id: 21, "name": "La Mano", imageUrl: "https://picsum.photos/300/420?random=21", hint: "hand" },
  { id: 22, "name": "La Bota", imageUrl: "https://picsum.photos/300/420?random=22", hint: "boot" },
  { id: 23, "name": "La Luna", imageUrl: "https://picsum.photos/300/420?random=23", hint: "moon" },
  { id: 24, "name": "El Cotorro", imageUrl: "https://picsum.photos/300/420?random=24", hint: "parrot" },
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
export function checkWin(markedIndices: number[]): boolean {
  if (markedIndices.length < 4) {
    return false;
  }
  return WINNING_PATTERNS.some(pattern =>
    pattern.every(index => markedIndices.includes(index))
  );
}
