"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Gift, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function DailyChallenge() {
  const [showReward, setShowReward] = useState(false)

  return (
    <Card className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10">
      <div className="absolute inset-0 bg-grid-white/10" />
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-warning" />
          Daily Game Mix Challenge
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress: 2/5 games completed</span>
            <span className="text-primary font-medium">40%</span>
          </div>
          <Progress value={40} className="h-2 bg-background" />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Complete today&apos;s mix for bonus rewards!</p>
          <Button variant="secondary" size="sm" className="gap-2" onClick={() => setShowReward(true)}>
            <Gift className="w-4 h-4" />
            Claim Reward
          </Button>
        </div>
        {showReward && (
          <div className="achievement-unlock flex items-center justify-center gap-2 p-2 rounded-lg bg-success/20 text-success">
            <Star className="w-5 h-5" />
            <span className="font-medium">+50 XP Bonus Earned!</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

