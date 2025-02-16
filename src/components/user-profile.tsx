"use client"

import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Flame } from "lucide-react"

export function UserProfile() {
  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="level-badge">42</div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold">Player One</h3>
          <div className="flex items-center gap-1 text-warning">
            <Flame className="w-4 h-4" />
            <span className="text-sm font-medium">7 day streak!</span>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Level 42</span>
            <span>2,840 / 3,000 XP</span>
          </div>
          <Progress value={94} className="xp-bar" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <Trophy className="w-5 h-5 text-warning" />
          <span className="text-sm font-medium">24</span>
        </div>
        <div className="flex flex-col items-center">
          <Star className="w-5 h-5 text-info" />
          <span className="text-sm font-medium">156</span>
        </div>
      </div>
    </div>
  )
}

