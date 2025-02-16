"use client";

import { generateSudoku } from "@/app/games/sudoku/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";
import { RefreshCcw, Star } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type Cell = {
  value: number | null;
  isInitial: boolean;
  notes: number[];
};

type Difficulty = "easy" | "medium" | "hard";

const isBoardComplete = (board: Cell[][]): boolean => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i]?.[j]?.value === null) {
        return false;
      }
    }
  }
  return true;
};

const isBoardValid = (board: Cell[][]): boolean => {
  //Implementation to check if the board is valid
  return true; // Replace with actual validation logic
};

export default function SudokuGame() {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(
    null,
  );
  const [isNoteMode, setIsNoteMode] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");

  const initializeGame = useCallback(() => {
    const newBoard = generateSudoku(difficulty);
    setBoard(newBoard);
    setSelectedCell(null);
    setShowReward(false);
  }, [difficulty]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell([row, col]);
  };

  const handleNumberInput = useCallback(
    (number: number) => {
      if (!selectedCell) return;
      const [row, col] = selectedCell;
      if (board[row]?.[col]?.isInitial) return;

      const newBoard = board.map((r) => r.map((cell) => ({ ...cell })));
      if (isNoteMode) {
        const notes = newBoard[row]?.[col]?.notes;
        const noteIndex = notes?.indexOf(number);
        if (noteIndex === -1) {
          notes?.push(number);
          notes?.sort((a, b) => a - b);
        } else {
          if (noteIndex) notes?.splice(noteIndex, 1);
        }
        if (newBoard[row]?.[col]) newBoard[row][col].value = null;
      } else {
        if (newBoard[row]?.[col]) newBoard[row][col].value = number;
        if (newBoard[row]?.[col]) newBoard[row][col].notes = [];

        if (isBoardComplete(newBoard) && isBoardValid(newBoard)) {
          void confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          setShowReward(true);
        }
      }

      setBoard(newBoard);
    },
    [selectedCell, board, , isNoteMode],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedCell) return;
      const [row, col] = selectedCell;

      if (board[row]?.[col]?.isInitial) return;

      const key = e.key;
      if (key >= "1" && key <= "9") {
        handleNumberInput(Number.parseInt(key));
      } else if (key === "Backspace" || key === "Delete") {
        const newBoard = board.map((r) => r.map((cell) => ({ ...cell })));
        if (newBoard[row]?.[col]) newBoard[row][col].value = null;
        if (newBoard[row]?.[col]) newBoard[row][col].notes = [];
        setBoard(newBoard);
      }
    },
    [selectedCell, board, handleNumberInput],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold text-transparent">
          Sudoku
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={initializeGame}>
            <RefreshCcw className="h-4 w-4" />
            <span className="sr-only">New game</span>
          </Button>
        </div>
      </div>

      <div className="mb-4 flex gap-4">
        <Button
          variant={difficulty === "easy" ? "default" : "outline"}
          onClick={() => setDifficulty("easy")}
        >
          Easy
        </Button>
        <Button
          variant={difficulty === "medium" ? "default" : "outline"}
          onClick={() => setDifficulty("medium")}
        >
          Medium
        </Button>
        <Button
          variant={difficulty === "hard" ? "default" : "outline"}
          onClick={() => setDifficulty("hard")}
        >
          Hard
        </Button>
      </div>

      <div className="grid grid-cols-[1fr_auto] gap-6 p-4">
        <div className="grid grid-cols-9 bg-border">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "relative flex aspect-square items-center justify-center border border-l-0 border-t-0 border-secondary text-3xl font-bold transition-colors focus-visible:outline-none",
                  (rowIndex + 1) % 3 === 0 && "border-b-4",
                  (colIndex + 1) % 3 === 0 && "border-r-4",
                  rowIndex === 0 && "border-t-4",
                  colIndex === 0 && "border-l-4",

                  selectedCell?.[0] === rowIndex &&
                    selectedCell?.[1] === colIndex
                    ? "cursor-pointer bg-primary"
                    : "bg-background hover:bg-muted",
                  cell.isInitial && "bg-secondary/50 font-bold text-primary",
                )}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                tabIndex={-1}
              >
                {cell.value}
              </div>
            )),
          )}
        </div>

        <Tabs defaultValue="numbers" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="numbers">Numbers</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>
          <TabsContent value="numbers" className="mt-4">
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                <Button
                  key={number}
                  variant="outline"
                  className="aspect-square text-lg font-medium"
                  onClick={() => {
                    setIsNoteMode(false);
                    handleNumberInput(number);
                  }}
                >
                  {number}
                </Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="notes" className="mt-4">
            <div className="aspect-square rounded-lg border p-2">
              <div className="grid h-full grid-cols-3 grid-rows-3 gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
                  <Button
                    key={number}
                    variant="outline"
                    className="aspect-square p-0 text-sm"
                    onClick={() => {
                      setIsNoteMode(true);
                      handleNumberInput(number);
                    }}
                  >
                    <div className="grid h-full w-full grid-cols-3 grid-rows-3">
                      {Array(9)
                        .fill(null)
                        .map((_, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-center ${index + 1 === number ? "text-primary" : "text-transparent"}`}
                          >
                            {number}
                          </div>
                        ))}
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {showReward && (
        <div className="achievement-unlock bg-success/20 text-success flex items-center justify-center gap-2 rounded-lg p-4">
          <Star className="h-6 w-6" />
          <span className="text-lg font-medium">
            Congratulations! +150 XP Earned!
          </span>
        </div>
      )}
    </div>
  );
}
