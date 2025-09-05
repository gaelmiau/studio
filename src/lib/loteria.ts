export interface Card {
  id: number;
  name: string;
  imageUrl: string;
}

// A selection of 24 cards for the game
export const CARDS: Card[] = [
  { id: 1, name: "El Gallo", imageUrl: "/cards/1.jpg"},
  { id: 2, name: "El Diablo", imageUrl: "/cards/2.jpg"},
  { id: 3, name: "La Dama", imageUrl: "/cards/3.jpg"},
  { id: 4, name: "El Catrín", imageUrl: "/cards/4.jpg"},
  { id: 5, name: "El Paraguas", imageUrl: "/cards/5.jpg"},
  { id: 6, name: "La Sirena", imageUrl: "/cards/6.jpg"},
  { id: 7, name: "La Escalera", imageUrl: "/cards/7.jpg"},
  { id: 8, name: "La Botella", imageUrl: "/cards/8.jpg"},
  { id: 9, name: "El Barril", imageUrl: "/cards/9.jpg"},
  { id: 10, name: "El Árbol", imageUrl: "/cards/10.jpg"},
  { id: 11, name: "El Melón", imageUrl: "/cards/11.jpg"},
  { id: 12, name: "El Valiente", imageUrl: "/cards/12.jpg"},
  { id: 13, name: "El Gorrito", imageUrl: "/cards/13.jpg"},
  { id: 14, name: "La Muerte", imageUrl: "/cards/14.jpg"},
  { id: 15, name: "La Pera", imageUrl: "/cards/15.jpg"},
  { id: 16, name: "La Bandera", imageUrl: "/cards/16.jpg"},
  { id: 17, name: "El Bandolón", imageUrl: "/cards/17.jpg"},
  { id: 18, name: "El Violoncello", imageUrl: "/cards/18.jpg"},
  { id: 19, name: "La Garza", imageUrl: "/cards/19.jpg"},
  { id: 20, "name": "El Pájaro", imageUrl: "/cards/20.jpg"},
  { id: 21, "name": "La Mano", imageUrl: "/cards/21.jpg"},
  { id: 22, "name": "La Bota", imageUrl: "/cards/22.jpg"},
  { id: 23, "name": "La Luna", imageUrl: "/cards/23.jpg"},
  { id: 24, "name": "El Cotorro", imageUrl: "/cards/24.jpg"},
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
