"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Play, Pause, Square, TrendingUp, TrendingDown, Zap } from "lucide-react"

interface AIBot {
  id: string
  name: string
  strategy: string
  status: "active" | "paused" | "stopped"
  performance: {
    totalReturn: number
    dailyReturn: number
    winRate: number
    sharpeRatio: number
  }
  allocation: number
  trades: number
  lastActive: number
}

export function AITradingBots() {
  const [bots, setBots] = useState<AIBot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await fetch("/api/dax/ai-bots")
        const result = await response.json()
        if (result.success) {
          setBots(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch AI bots:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBots()
    const interval = setInterval(fetchBots, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const handleBotAction = async (botId: string, action: "start" | "pause" | "stop") => {
    try {
      const response = await fetch("/api/dax/ai-bots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, botId }),
      })

      const result = await response.json()
      if (result.success) {
        // Update bot status locally
        setBots((prev) =>
          prev.map((bot) =>
            bot.id === botId ? { ...bot, status: action === "start" ? "active" : (action as any) } : bot,
          ),
        )
      }
    } catch (error) {
      console.error("Failed to control bot:", error)
    }
  }

  if (loading) {
    return (
      <Card className="bg-black/40 border-cyan-500/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-20 bg-cyan-500/20 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/40 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Bot className="w-5 h-5" />
          AI Trading Bots
        </CardTitle>
        <div className="text-sm text-gray-400">Autonomous trading algorithms powered by machine learning</div>
      </CardHeader>

      <CardContent className="space-y-4">
        {bots.map((bot) => (
          <div key={bot.id} className="border border-cyan-500/20 rounded-lg p-4 bg-black/20">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-white">{bot.name}</h3>
                  <Badge
                    variant={bot.status === "active" ? "default" : "outline"}
                    className={
                      bot.status === "active"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : bot.status === "paused"
                          ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                    }
                  >
                    {bot.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400">{bot.strategy}</p>
              </div>

              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBotAction(bot.id, "start")}
                  disabled={bot.status === "active"}
                  className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                >
                  <Play className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBotAction(bot.id, "pause")}
                  disabled={bot.status !== "active"}
                  className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                >
                  <Pause className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleBotAction(bot.id, "stop")}
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <Square className="w-3 h-3" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Total Return</div>
                <div
                  className={`font-semibold flex items-center gap-1 ${
                    bot.performance.totalReturn > 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {bot.performance.totalReturn > 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {bot.performance.totalReturn.toFixed(1)}%
                </div>
              </div>

              <div>
                <div className="text-gray-400">Daily Return</div>
                <div className={`font-semibold ${bot.performance.dailyReturn > 0 ? "text-green-400" : "text-red-400"}`}>
                  {bot.performance.dailyReturn.toFixed(2)}%
                </div>
              </div>

              <div>
                <div className="text-gray-400">Win Rate</div>
                <div className="font-semibold text-blue-400">{bot.performance.winRate.toFixed(1)}%</div>
              </div>

              <div>
                <div className="text-gray-400">Allocation</div>
                <div className="font-semibold text-white">${bot.allocation.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-cyan-500/10">
              <div className="text-xs text-gray-400">
                {bot.trades} trades • Last active {Math.floor((Date.now() - bot.lastActive) / 60000)}m ago
              </div>
              <div className="flex items-center gap-1 text-xs text-cyan-400">
                <Zap className="w-3 h-3" />
                Sharpe: {bot.performance.sharpeRatio.toFixed(1)}
              </div>
            </div>
          </div>
        ))}

        <div className="text-center pt-4">
          <Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 bg-transparent">
            <Bot className="w-4 h-4 mr-2" />
            Deploy New Bot
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
