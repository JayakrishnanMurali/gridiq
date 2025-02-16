type Cell = {
  value: number | null;
  isInitial: boolean;
  notes: number[];
};

export function generateSudoku(
  difficulty: "easy" | "medium" | "hard",
): Cell[][] {
  // First, generate a solved Sudoku board
  const solvedBoard = generateSolvedBoard();

  // Then remove numbers based on difficulty
  const cellsToRemove = {
    easy: 30,
    medium: 45,
    hard: 55,
  }[difficulty];

  const board = solvedBoard.map((row) =>
    row.map((value) => ({
      value,
      isInitial: true,
      notes: [],
    })),
  );

  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);

    if (board[row]?.[col]?.value !== null) {
      if (board[row]?.[col]) board[row][col].value = null;
      if (board[row]?.[col]) board[row][col].isInitial = false;
      removed++;
    }
  }

  return board;
}

function generateSolvedBoard(): (number | null)[][] {
  const board: number[][] = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));
  fillBoard(board);
  return board;
}

function fillBoard(board: (number | null)[][]): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row]?.[col] === null) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

        for (const num of numbers) {
          if (isValidMove(board, row, col, num)) {
            board[row][col] = num;

            if (fillBoard(board)) {
              return true;
            }

            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function shuffle<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function isValidMove(
  board: (number | null)[][],
  row: number,
  col: number,
  num: number,
): boolean {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) return false;
    }
  }

  return true;
}

export function isBoardComplete(board: Cell[][]): boolean {
  return board.every((row) => row.every((cell) => cell.value !== null));
}

export function isBoardValid(board: Cell[][]): boolean {
  // Check each row
  for (let row = 0; row < 9; row++) {
    const numbers = new Set<number>();
    for (let col = 0; col < 9; col++) {
      const value = board[row]?.[col]?.value;
      if (value === null) return false;
      if (numbers.has(value)) return false;
      numbers.add(value);
    }
  }

  // Check each column
  for (let col = 0; col < 9; col++) {
    const numbers = new Set<number>();
    for (let row = 0; row < 9; row++) {
      const value = board[row][col].value;
      if (value === null) return false;
      if (numbers.has(value)) return false;
      numbers.add(value);
    }
  }

  // Check each 3x3 box
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const numbers = new Set<number>();
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const value = board[boxRow + i][boxCol + j].value;
          if (value === null) return false;
          if (numbers.has(value)) return false;
          numbers.add(value);
        }
      }
    }
  }

  return true;
}
