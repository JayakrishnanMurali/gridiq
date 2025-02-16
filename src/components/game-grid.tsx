"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Grid3X3Icon,
  LayoutGridIcon,
  CaseSensitiveIcon,
  BombIcon,
  HashIcon,
  TypeIcon,
  SquareStackIcon,
} from "lucide-react"
import Link from "next/link"
import { Star } from "lucide-react" // Import the Star icon

const games = [
  {
    title: "Sudoku",
    description: "Classic number placement puzzle",
    icon: <Grid3X3Icon className="h-6 w-6 text-primary" />,
    href: "/games/sudoku",
    difficulty: "Medium",
    xpReward: 100,
  },
  {
    title: "Word Puzzle",
    description: "Daily word guessing game",
    icon: <CaseSensitiveIcon className="h-6 w-6 text-secondary" />,
    href: "/games/word-puzzle",
    difficulty: "Easy",
    xpReward: 75,
  },
  {
    title: "Tiles",
    description: "Memory matching game",
    icon: <LayoutGridIcon className="h-6 w-6 text-info" />,
    href: "/games/tiles",
    difficulty: "Easy",
    xpReward: 50,
  },
  {
    title: "Minesweeper",
    description: "Classic mine detection puzzle",
    icon: <BombIcon className="h-6 w-6 text-destructive" />,
    href: "/games/minesweeper",
    difficulty: "Hard",
    xpReward: 150,
  },
  {
    title: "Nonogram",
    description: "Grid-based picture puzzle",
    icon: <HashIcon className="h-6 w-6 text-warning" />,
    href: "/games/nonogram",
    difficulty: "Medium",
    xpReward: 100,
  },
  {
    title: "Crossword",
    description: "Daily crossword puzzles",
    icon: <TypeIcon className="h-6 w-6 text-success" />,
    href: "/games/crossword",
    difficulty: "Hard",
    xpReward: 125,
  },
  {
    title: "Block Puzzle",
    description: "Tetris-like block fitting game",
    icon: <SquareStackIcon className="h-6 w-6 text-secondary" />,
    href: "/games/block-puzzle",
    difficulty: "Medium",
    xpReward: 100,
  },
]

export function GameGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {games.map((game) => (
        <Link key={game.title} href={game.href}>
          <Card className="game-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {game.icon}
                <span>{game.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
              <div className="flex items-center justify-between">
                <Badge
                  variant={
                    game.difficulty === "Easy" ? "secondary" : game.difficulty === "Medium" ? "default" : "destructive"
                  }
                >
                  {game.difficulty}
                </Badge>
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <Star className="w-4 h-4" />
                  {game.xpReward} XP
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

