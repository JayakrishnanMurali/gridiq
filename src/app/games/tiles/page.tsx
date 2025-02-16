"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCcw, Star } from "lucide-react";
import confetti from "canvas-confetti";
import { useTimer } from "@/hooks/useTimer"; // Adjust the path as needed
import { formatTime } from "@/lib/utils";

type Tile = {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const emojis = ["🎮", "🎲", "🎯", "🎨", "🎶", "🎪", "🎟️", "🎬"];

export default function TilesGame() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [flippedTiles, setFlippedTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [showReward, setShowReward] = useState(false);

  // Initialize the timer without auto-start.
  const { time, start, stop, reset } = useTimer(false);

  // initializeGame resets game state and (re)starts the timer.
  const initializeGame = useCallback(() => {
    const initialTiles = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setTiles(initialTiles);
    setFlippedTiles([]);
    setMoves(0);
    setMatches(0);
    setShowReward(false);
    reset(); // Reset the timer state
    start(); // Start the timer
  }, [reset, start]);

  // Start a new game on mount.
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Stop the timer when the game is completed.
  useEffect(() => {
    if (matches === emojis.length) {
      stop();
    }
  }, [matches, stop]);

  const handleTileClick = (id: number) => {
    if (flippedTiles.length === 2) return;
    if (tiles[id]?.isMatched || tiles[id]?.isFlipped) return;

    const newTiles = [...tiles];
    if (newTiles[id]) newTiles[id].isFlipped = true;
    setTiles(newTiles);

    const newFlippedTiles = [...flippedTiles, id];
    setFlippedTiles(newFlippedTiles);

    if (newFlippedTiles.length === 2) {
      setMoves((prevMoves) => prevMoves + 1);
      const [firstId, secondId] = newFlippedTiles;
      if (
        firstId !== undefined &&
        secondId !== undefined &&
        tiles[firstId]?.emoji === tiles[secondId]?.emoji
      ) {
        if (newTiles[firstId]) newTiles[firstId].isMatched = true;
        if (newTiles[secondId]) newTiles[secondId].isMatched = true;
        setTiles(newTiles);
        setFlippedTiles([]);
        setMatches((prev) => prev + 1);

        if (matches + 1 === emojis.length) {
          setTimeout(() => {
            void confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
            setShowReward(true);
          }, 300);
        }
      } else {
        setTimeout(() => {
          if (firstId !== undefined && newTiles[firstId])
            newTiles[firstId].isFlipped = false;
          if (secondId !== undefined && newTiles[secondId])
            newTiles[secondId].isFlipped = false;
          setTiles(newTiles);
          setFlippedTiles([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-2xl font-bold text-transparent">
          Memory Tiles
        </h1>
        <Button variant="outline" size="icon" onClick={initializeGame}>
          <RefreshCcw className="h-4 w-4" />
          <span className="sr-only">Reset game</span>
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="text-sm text-muted-foreground">Moves</div>
          <div className="font-bol text-2xl font-bold text-primary">
            {moves}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-1 text-right">
          <div className="text-sm text-muted-foreground">Time Spent</div>
          <div className="px-2 text-2xl font-bold text-primary">
            {formatTime(time)}
          </div>
        </div>

        <div className="space-y-1 text-right">
          <div className="text-sm text-muted-foreground">Matches</div>
          <div className="text-2xl font-bold text-primary">
            {matches}/{emojis.length}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {tiles.map((tile) => (
          <Card
            key={tile.id}
            className={`flex aspect-square cursor-pointer items-center justify-center text-3xl transition-all duration-300 hover:scale-105 ${
              tile.isFlipped || tile.isMatched
                ? "bg-gradient-to-br from-primary/20 to-secondary/20"
                : "hover:bg-muted"
            }`}
            onClick={() => handleTileClick(tile.id)}
          >
            {(tile.isFlipped || tile.isMatched) && tile.emoji}
          </Card>
        ))}
      </div>
      {showReward && (
        <div className="achievement-unlock bg-success/20 text-success flex items-center justify-center gap-2 rounded-lg p-4">
          <Star className="h-6 w-6" />
          <span className="text-lg font-medium">
            Congratulations! +100 XP Earned!
          </span>
        </div>
      )}
    </div>
  );
}
