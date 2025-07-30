"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  Square,
  Settings,
  RefreshCw,
  Bot,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Activity,
  Plus,
  BarChart3,
  Shield,
  Target,
} from "lucide-react"

interface AIBotPerformance {
  totalReturn: number
  dailyReturn: number
  weeklyReturn: number
  monthlyReturn: number
  winRate: number
  sharpeRatio: number
  maxDrawdown: number
  profitFactor: number
  avgWinSize: number
  avgLossSize: number
}

interface AIBot {
  id: string
  name: string
  strategy: string
  description: string
  status: "active" | "inactive" | "error" | "paused"
  performance: AIBotPerformance
  allocation: number
  trades: number
  lastRun: string
  lastActive: number
  riskLevel: "low" | "medium" | "high"
  timeframe: string
  assets: string[]
  createdAt: string
  version: string
}

interface BotSummary {
  totalBots: number
  activeBots: number
  totalAllocation: number
  avgPerformance: number
  totalTrades: number
}

export function AiTradingBots() {
  const [bots, setBots] = useState<AIBot[]>([])
  const [summary, setSummary] = useState<BotSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("overview")

  const fetchBots = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/dax/ai-bots")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      if (result.success) {
        setBots(result.data)
        setSummary(result.summary)
      } else {
        throw new Error(result.error)
      }
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

  const handleBotAction = async (botId: string, action: "start" | "pause" | "stop" | "restart") => {
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
      const result = await response.json()
      if (result.success) {
        // Update bot status locally
        setBots((prev) =>
          prev.map((bot) =>
            bot.id === botId
              ? {
                  ...bot,
                  status: action === "start" ? "active" : action === "stop" ? "inactive" : (action as any),
                  lastActive: action === "start" ? Date.now() : bot.lastActive,
                  lastRun: "just now",
                }
              : bot,
          ),
        )
      }
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
        return <Square className="w-4 h-4 text-gray-400" />
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-400" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Bot className="w-4 h-4 text-blue-400" />
    }
  }

  const getPerformanceColor = (performance: number) => {
    if (performance > 15) return "text-green-400"
    if (performance > 5) return "text-green-300"
    if (performance > 0) return "text-blue-400"
    if (performance > -5) return "text-yellow-400"
    return "text-red-400"
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-400 bg-green-500/10 border-green-500/30"
      case "medium":
        return "text-yellow-400 bg-yellow-500/10 border-yellow-500/30"
      case "high":
        return "text-red-400 bg-red-500/10 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-500/10 border-gray-500/30"
    }
  }

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
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Total Bots</p>
                  <p className="text-2xl font-bold text-white">{summary.totalBots}</p>
                </div>
                <Bot className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Active Bots</p>
                  <p className="text-2xl font-bold text-white">{summary.activeBots}</p>
                </div>
                <Activity className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Total Allocation</p>
                  <p className="text-2xl font-bold text-white">${(summary.totalAllocation / 1000).toFixed(0)}K</p>
                </div>
                <Target className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Avg Performance</p>
                  <p className={`text-2xl font-bold ${getPerformanceColor(summary.avgPerformance)}`}>
                    {summary.avgPerformance >= 0 ? "+" : ""}
                    {summary.avgPerformance.toFixed(1)}%
                  </p>
                </div>
                {summary.avgPerformance >= 0 ? (
                  <TrendingUp className="h-8 w-8 text-green-400" />
                ) : (
                  <TrendingDown className="h-8 w-8 text-red-400" />
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-300 text-sm font-medium">Total Trades</p>
                  <p className="text-2xl font-bold text-white">{summary.totalTrades.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Bots Management */}
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center">
              <Bot className="w-5 h-5 mr-2 text-blue-400" />
              AI Trading Bots
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Deploy Bot
              </Button>
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
          </div>
          <p className="text-slate-400 text-sm">Manage and monitor your automated trading strategies.</p>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-slate-900/50">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              {bots.length === 0 && (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <p className="text-slate-500 mb-4">No AI bots deployed yet.</p>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Deploy Your First Bot
                  </Button>
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
                      <div className="flex items-center gap-2 mb-1">
                        <div className="font-semibold text-white">{bot.name}</div>
                        <Badge className={getRiskColor(bot.riskLevel)}>{bot.riskLevel} risk</Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-400">
                          {bot.version}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-400">{bot.strategy}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {bot.assets.join(", ")} • {bot.timeframe} • {bot.trades} trades
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Status */}
                    <div className="text-center">
                      <Badge
                        className={`${
                          bot.status === "active"
                            ? "bg-green-600/20 text-green-400 border-green-600/30"
                            : bot.status === "paused"
                              ? "bg-yellow-600/20 text-yellow-400 border-yellow-600/30"
                              : bot.status === "inactive"
                                ? "bg-gray-600/20 text-gray-400 border-gray-600/30"
                                : "bg-red-600/20 text-red-400 border-red-600/30"
                        } text-xs mb-2`}
                      >
                        {bot.status.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-slate-500">Last: {bot.lastRun}</div>
                    </div>

                    {/* Performance */}
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getPerformanceColor(bot.performance.totalReturn)}`}>
                        {bot.performance.totalReturn >= 0 ? "+" : ""}
                        {bot.performance.totalReturn.toFixed(1)}%
                      </div>
                      <div className="text-xs text-slate-400">
                        Daily: {bot.performance.dailyReturn >= 0 ? "+" : ""}
                        {bot.performance.dailyReturn.toFixed(2)}%
                      </div>
                      <div className="w-24 mt-2">
                        <Progress value={Math.min(Math.abs(bot.performance.totalReturn), 50) * 2} className="h-1" />
                      </div>
                    </div>

                    {/* Allocation */}
                    <div className="text-right">
                      <div className="font-semibold text-white">${bot.allocation.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">Win Rate: {bot.performance.winRate.toFixed(1)}%</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      {bot.status === "inactive" || bot.status === "error" || bot.status === "paused" ? (
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
                          className="bg-yellow-600 hover:bg-yellow-700 text-white"
                          onClick={() => handleBotAction(bot.id, "pause")}
                          disabled={actionLoading === bot.id}
                        >
                          {actionLoading === bot.id ? (
                            <RefreshCw className="h-4 w-4 animate-spin" />
                          ) : (
                            <Pause className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <Button
                        size="sm"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={() => handleBotAction(bot.id, "stop")}
                        disabled={actionLoading === bot.id}
                      >
                        {actionLoading === bot.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin" />
                        ) : (
                          <Square className="h-4 w-4" />
                        )}
                      </Button>
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
            </TabsContent>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {bots.map((bot) => (
                  <Card key={bot.id} className="bg-slate-900/50 border-slate-700">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-lg flex items-center gap-2">
                        {getStatusIcon(bot.status)}
                        {bot.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-slate-400">Total Return</div>
                          <div className={`font-bold ${getPerformanceColor(bot.performance.totalReturn)}`}>
                            {bot.performance.totalReturn >= 0 ? "+" : ""}
                            {bot.performance.totalReturn.toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-slate-400">Sharpe Ratio</div>
                          <div className="font-bold text-blue-400">{bot.performance.sharpeRatio.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Win Rate</div>
                          <div className="font-bold text-green-400">{bot.performance.winRate.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Max Drawdown</div>
                          <div className="font-bold text-red-400">{bot.performance.maxDrawdown.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Profit Factor</div>
                          <div className="font-bold text-purple-400">{bot.performance.profitFactor.toFixed(2)}</div>
                        </div>
                        <div>
                          <div className="text-slate-400">Trades</div>
                          <div className="font-bold text-white">{bot.trades.toLocaleString()}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="text-center py-8">
                <Settings className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">Bot configuration and settings will be available here.</p>
                <Button variant="outline" className="border-slate-600 text-slate-400 bg-transparent">
                  <Shield className="w-4 h-4 mr-2" />
                  Configure Risk Management
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
