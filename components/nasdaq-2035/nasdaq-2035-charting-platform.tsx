"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ReferenceLine,
} from "recharts"
import { LineChartIcon, BarChart3, Activity, Target, Play, Pause } from "lucide-react"

interface ChartingPlatformProps {
  symbol: string
  data: any
  compact?: boolean
  eliteMode: boolean
}

export function Nasdaq2035ChartingPlatform({ symbol, data, compact = false, eliteMode }: ChartingPlatformProps) {
  const [timeframe, setTimeframe] = useState("1D")
  const [chartType, setChartType] = useState("candlestick")
  const [indicators, setIndicators] = useState<string[]>(["sma20", "volume"])
  const [isLive, setIsLive] = useState(true)

  // Generate realistic OHLCV data
  const [chartData, setChartData] = useState<any[]>([])
  const [technicalAnalysis, setTechnicalAnalysis] = useState({
    trend: "Bullish",
    strength: 7.8,
    support: 17200,
    resistance: 17280,
    signals: {
      sma: "BUY",
      rsi: "NEUTRAL",
      macd: "BUY",
      bollinger: "NEUTRAL",
    },
  })

  // Generate chart data based on timeframe
  useEffect(() => {
    const generateChartData = () => {
      const periods = timeframe === "1D" ? 390 : timeframe === "5D" ? 1950 : 7800 // Market minutes
      const interval = timeframe === "1D" ? 1 : timeframe === "5D" ? 5 : 60 // Minutes per candle

      const data = []
      let currentPrice = 17234.56
      const now = Date.now()

      for (let i = periods; i >= 0; i--) {
        const timestamp = now - i * interval * 60 * 1000
        const volatility = 0.001 // 0.1% per period
        const change = (Math.random() - 0.5) * 2 * volatility

        const open = currentPrice
        const close = currentPrice * (1 + change)
        const high = Math.max(open, close) * (1 + Math.random() * 0.0005)
        const low = Math.min(open, close) * (1 - Math.random() * 0.0005)
        const volume = Math.floor(Math.random() * 50000 + 10000)

        // Calculate technical indicators
        const sma20 = data.length >= 20 ? data.slice(-19).reduce((sum, d) => sum + d.close, 0) / 19 + close / 20 : close
        const sma50 = data.length >= 50 ? data.slice(-49).reduce((sum, d) => sum + d.close, 0) / 49 + close / 50 : close

        data.push({
          timestamp,
          time: new Date(timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          open: Number(open.toFixed(2)),
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          close: Number(close.toFixed(2)),
          volume,
          sma20: Number(sma20.toFixed(2)),
          sma50: Number(sma50.toFixed(2)),
          rsi: 30 + Math.random() * 40, // Simplified RSI
          macd: (Math.random() - 0.5) * 10,
          bollingerUpper: close * 1.02,
          bollingerLower: close * 0.98,
        })

        currentPrice = close
      }

      return data
    }

    setChartData(generateChartData())
  }, [timeframe])

  // Real-time updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      setChartData((prev) => {
        const newData = [...prev]
        const lastCandle = newData[newData.length - 1]
        const volatility = 0.001
        const change = (Math.random() - 0.5) * 2 * volatility

        // Update last candle
        const newClose = lastCandle.close * (1 + change)
        newData[newData.length - 1] = {
          ...lastCandle,
          close: Number(newClose.toFixed(2)),
          high: Math.max(lastCandle.high, newClose),
          low: Math.min(lastCandle.low, newClose),
          volume: lastCandle.volume + Math.floor(Math.random() * 1000),
        }

        return newData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isLive])

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-slate-800/95 border border-slate-600 rounded-lg p-4 shadow-xl backdrop-blur-sm">
          <p className="text-slate-300 text-sm mb-2 font-medium">{label}</p>
          <div className="space-y-1">
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Open:</span>
              <span className="text-white font-mono">{data.open}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">High:</span>
              <span className="text-green-400 font-mono">{data.high}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Low:</span>
              <span className="text-red-400 font-mono">{data.low}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Close:</span>
              <span className="text-white font-mono font-bold">{data.close}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-slate-400">Volume:</span>
              <span className="text-blue-400 font-mono">{data.volume?.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  const renderChart = () => {
    if (chartType === "candlestick") {
      // Simplified candlestick using area chart
      return (
        <ResponsiveContainer width="100%" height={compact ? 300 : 500}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} interval="preserveStartEnd" />
            <YAxis stroke="#94a3b8" fontSize={12} domain={["dataMin - 5", "dataMax + 5"]} />
            <Tooltip content={<CustomTooltip />} />

            {/* Price Area */}
            <Area type="monotone" dataKey="close" stroke="#3b82f6" fill="url(#priceGradient)" strokeWidth={2} />

            {/* Technical Indicators */}
            {indicators.includes("sma20") && (
              <Line type="monotone" dataKey="sma20" stroke="#f59e0b" strokeWidth={1} dot={false} />
            )}
            {indicators.includes("sma50") && (
              <Line type="monotone" dataKey="sma50" stroke="#ef4444" strokeWidth={1} dot={false} />
            )}

            {/* Support/Resistance Lines */}
            <ReferenceLine y={technicalAnalysis.support} stroke="#10b981" strokeDasharray="5 5" />
            <ReferenceLine y={technicalAnalysis.resistance} stroke="#ef4444" strokeDasharray="5 5" />

            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      )
    }

    if (chartType === "line") {
      return (
        <ResponsiveContainer width="100%" height={compact ? 300 : 500}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="close"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )
    }

    return (
      <ResponsiveContainer width="100%" height={compact ? 300 : 500}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="close" stroke="#3b82f6" fill="url(#gradient)" strokeWidth={2} />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    )
  }

  if (compact) {
    return (
      <div className="space-y-4">
        {renderChart()}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{technicalAnalysis.trend}</Badge>
            <span className="text-slate-400">
              Strength: <span className="text-white">{technicalAnalysis.strength}/10</span>
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400">Live</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <LineChartIcon className="w-5 h-5 mr-2 text-blue-400" />
              {symbol} - Elite Charting Platform
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={isLive ? "default" : "outline"}
                size="sm"
                onClick={() => setIsLive(!isLive)}
                className={
                  isLive ? "bg-green-600 hover:bg-green-700" : "border-slate-700 text-slate-300 hover:bg-slate-800"
                }
              >
                {isLive ? <Pause className="w-4 h-4 mr-1" /> : <Play className="w-4 h-4 mr-1" />}
                {isLive ? "Live" : "Paused"}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            {/* Timeframe Selection */}
            <div className="flex items-center space-x-2">
              {["1D", "5D", "1M", "3M", "1Y"].map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(tf)}
                  className={
                    timeframe === tf
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-slate-700 text-slate-300 hover:bg-slate-800"
                  }
                >
                  {tf}
                </Button>
              ))}
            </div>

            {/* Chart Type */}
            <div className="flex items-center space-x-2">
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="candlestick">Candlestick</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="area">Area Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Chart */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
        <CardContent className="p-6">{renderChart()}</CardContent>
      </Card>

      {/* Volume Chart */}
      {indicators.includes("volume") && (
        <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
              Volume Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip />
                <Bar dataKey="volume" fill="#8b5cf6" opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Technical Analysis Panel */}
      {eliteMode && (
        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-green-400" />
                Technical Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Overall Trend</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{technicalAnalysis.trend}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Trend Strength</span>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                      style={{ width: `${technicalAnalysis.strength * 10}%` }}
                    />
                  </div>
                  <span className="text-white font-medium">{technicalAnalysis.strength}/10</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Support Level</span>
                <span className="text-green-400 font-mono">{technicalAnalysis.support}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Resistance Level</span>
                <span className="text-red-400 font-mono">{technicalAnalysis.resistance}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Trading Signals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(technicalAnalysis.signals).map(([indicator, signal]) => (
                <div key={indicator} className="flex items-center justify-between">
                  <span className="text-slate-300 capitalize">{indicator.toUpperCase()}</span>
                  <Badge
                    className={
                      signal === "BUY"
                        ? "bg-green-500/20 text-green-400 border-green-500/30"
                        : signal === "SELL"
                          ? "bg-red-500/20 text-red-400 border-red-500/30"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    }
                  >
                    {signal}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
