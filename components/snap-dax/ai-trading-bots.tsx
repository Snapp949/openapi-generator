"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, StopCircle, Settings, RefreshCw, Bot } from "lucide-react"

interface AiBot {
  id: string
  name: string
  strategy: string
  status: "active" | "inactive" | "error"
  performance: number // % gain/loss
  lastRun: string
}

export function AiTradingBots() {
  const [bots, setBots] = useState<AiBot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBots = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/dax/ai-bots")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: AiBot[] = await response.json()
      setBots(data)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchBots()
    const interval = setInterval(fetchBots, 30000) // Refresh every 30 seconds
    return () => clearInterval(interval)
  }, [fetchBots])

  const handleBotAction = async (botId: string, action: "start" | "stop") => {
    try {
      const response = await fetch("/api/dax/ai-bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ botId, action }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      // Re-fetch bots to update status
      fetchBots()
    } catch (e: any) {
      setError(e.message)
    }
  }

  if (loading) return <div className="text-center text-slate-400">Loading AI Bots...</div>
  if (error) return <div className="text-center text-red-400">Error: {error}</div>

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center">
            <Bot className="w-5 h-5 mr-2 text-blue-400" />
            AI Trading Bots
          </CardTitle>
          <Button
            size="sm"
            variant="outline"
            className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700/50"
            onClick={fetchBots}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <p className="text-slate-400 text-sm">Manage and monitor your automated trading strategies.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {bots.length === 0 && <p className="text-center text-slate-500">No AI bots deployed yet.</p>}
        {bots.map((bot) => (
          <div
            key={bot.id}
            className="flex items-center justify-between p-4 rounded-lg bg-slate-900/70 border border-slate-700"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">{bot.name}</div>
                <div className="text-sm text-slate-400">{bot.strategy}</div>
              </div>
            </div>

            <div className="text-right">
              <Badge
                className={`${
                  bot.status === "active"
                    ? "bg-green-600/20 text-green-400"
                    : bot.status === "inactive"
                      ? "bg-gray-600/20 text-gray-400"
                      : "bg-red-600/20 text-red-400"
                } text-xs`}
              >
                {bot.status.toUpperCase()}
              </Badge>
              <div className={`text-sm font-semibold mt-1 ${bot.performance >= 0 ? "text-green-400" : "text-red-400"}`}>
                {bot.performance >= 0 ? "+" : ""}
                {bot.performance.toFixed(2)}%
              </div>
              <div className="text-xs text-slate-500">Last Run: {bot.lastRun}</div>
            </div>

            <div className="flex gap-2">
              {bot.status === "inactive" ? (
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleBotAction(bot.id, "start")}
                >
                  <Play className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleBotAction(bot.id, "stop")}
                >
                  <StopCircle className="h-4 w-4" />
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
