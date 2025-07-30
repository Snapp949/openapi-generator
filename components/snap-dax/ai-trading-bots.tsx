"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Play,
  StopCircle,
  Settings,
  RefreshCw,
  Bot,
  TrendingUp,
  TrendingDown,
  Zap,
  AlertTriangle,
  Activity,
} from "lucide-react"

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
  const [actionLoading, setActionLoading] = useState<string | null>(null)

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
    setActionLoading(botId)
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
      await fetchBots()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setActionLoading(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="w-4 h-4 text-green-400" />
      case "inactive":
        return <StopCircle className="w-4 h-4 text-gray-400" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Bot className="w-4 h-4 text-blue-400" />
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance > 10) return "text-green-400"
    if (performance > 0) return "text-green-300"
    if (performance > -5) return "text-yellow-400"
    return "text-red-400"
  }

  const totalPerformance = bots.reduce((sum, bot) => sum + bot.performance, 0) / bots.length || 0
  const activeBots = bots.filter((bot) => bot.status === "active").length

  if (loading)
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-2" />
            <p className="text-slate-400">Loading AI Bots...</p>
          </div>
        </CardContent>
      </Card>
    )

  if (error)
    return (
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400">Error: {error}</p>
            <Button onClick={fetchBots} className="mt-4 bg-blue-600 hover:bg-blue-700" size="sm">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Active Bots</p>
                <p className="text-2xl font-bold text-white">{activeBots}</p>
              </div>
              <Bot className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Avg Performance</p>
                <p className={`text-2xl font-bold ${getPerformanceColor(totalPerformance)}`}>
                  {totalPerformance >= 0 ? "+" : ""}
                  {totalPerformance.toFixed(2)}%
                </p>
              </div>
              {totalPerformance >= 0 ? (
                <TrendingUp className="h-8 w-8 text-green-400" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-400" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Total Bots</p>
                <p className="text-2xl font-bold text-white">{bots.length}</p>
              </div>
              <Zap className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Bots Management */}
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
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
          <p className="text-slate-400 text-sm">Manage and monitor your automated trading strategies.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {bots.length === 0 && (
            <div className="text-center py-8">
              <Bot className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-500">No AI bots deployed yet.</p>
              <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Deploy Your First Bot</Button>
            </div>
          )}

          {bots.map((bot) => (
            <div
              key={bot.id}
              className="flex items-center justify-between p-4 rounded-lg bg-slate-900/70 border border-slate-700 hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  {getStatusIcon(bot.status)}
                </div>
                <div>
                  <div className="font-semibold text-white">{bot.name}</div>
                  <div className="text-sm text-slate-400">{bot.strategy}</div>
                  <div className="text-xs text-slate-500 mt-1">Last Run: {bot.lastRun}</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Performance */}
                <div className="text-right">
                  <Badge
                    className={`${
                      bot.status === "active"
                        ? "bg-green-600/20 text-green-400 border-green-600/30"
                        : bot.status === "inactive"
                          ? "bg-gray-600/20 text-gray-400 border-gray-600/30"
                          : "bg-red-600/20 text-red-400 border-red-600/30"
                    } text-xs mb-2`}
                  >
                    {bot.status.toUpperCase()}
                  </Badge>
                  <div className={`text-lg font-bold ${getPerformanceColor(bot.performance)}`}>
                    {bot.performance >= 0 ? "+" : ""}
                    {bot.performance.toFixed(2)}%
                  </div>

                  {/* Performance Progress Bar */}
                  <div className="w-24 mt-2">
                    <Progress value={Math.min(Math.abs(bot.performance), 20) * 5} className="h-1" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {bot.status === "inactive" || bot.status === "error" ? (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handleBotAction(bot.id, "start")}
                      disabled={actionLoading === bot.id}
                    >
                      {actionLoading === bot.id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => handleBotAction(bot.id, "stop")}
                      disabled={actionLoading === bot.id}
                    >
                      {actionLoading === bot.id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <StopCircle className="h-4 w-4" />
                      )}
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
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
