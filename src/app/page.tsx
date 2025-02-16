import { GameGrid } from "@/components/game-grid";

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4 text-center">
        <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-4xl font-bold tracking-tighter text-transparent">
          Welcome to Gridiq
        </h1>
        <p className="mx-auto max-w-[600px] text-muted-foreground">
          Challenge yourself with our collection of daily puzzles and games.
          Complete the daily mix for bonus points!
        </p>
      </section>
      <GameGrid />
    </div>
  );
}
