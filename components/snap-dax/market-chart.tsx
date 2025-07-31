"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, BarChart3, Activity, Maximize2 } from "lucide-react"

interface HistoricalDataPoint {
  name: string
  timestamp: number
  BTC: number
  ETH: number
  SOL: number
  ADA: number
  MATIC: number
  DOT: number
}

interface MarketChartProps {
  data: HistoricalDataPoint[]
  title: string
  description: string
}

export function MarketChart({ data, title, description }: MarketChartProps) {
  const [selectedSymbols, setSelectedSymbols] = useState(["BTC", "ETH", "SOL"])
  const [timeframe, setTimeframe] = useState("24H")
  const [chartType, setChartType] = useState<"line" | "area">("area")
  const [isFullscreen, setIsFullscreen] = useState(false)

  const symbols = ["BTC", "ETH", "SOL", "ADA", "MATIC", "DOT"]
  const symbolColors = {
    BTC: "#F7931A",
    ETH: "#627EEA",
    SOL: "#9945FF",
    ADA: "#0033AD",
    MATIC: "#8247E5",
    DOT: "#E6007A",
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value.toFixed(value < 1 ? 4 : 0)}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800/95 border border-slate-600 rounded-lg p-4 shadow-xl backdrop-blur-sm">
          <p className="text-slate-300 text-sm mb-2 font-medium">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 mb-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm font-medium" style={{ color: entry.color }}>
                  {entry.dataKey}
                </span>
              </div>
              <span className="text-white font-mono text-sm">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      )
    }
    return null
  }

  const toggleSymbol = (symbol: string) => {
    setSelectedSymbols((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  const chartData = data.slice(-24) // Last 24 hours

  return (
    <Card
      className={`bg-slate-800/50 border-slate-700 backdrop-blur-sm transition-all duration-300 ${
        isFullscreen ? "fixed inset-4 z-50" : ""
      }`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              {title}
            </CardTitle>
            <p className="text-slate-400 text-sm mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700/50"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mt-4">
          {/* Symbol Selection */}
          <div className="flex flex-wrap gap-2">
            {symbols.map((symbol) => (
              <Button
                key={symbol}
                size="sm"
                variant={selectedSymbols.includes(symbol) ? "default" : "outline"}
                onClick={() => toggleSymbol(symbol)}
                className={
                  selectedSymbols.includes(symbol)
                    ? "text-white"
                    : "border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700/50"
                }
                style={
                  selectedSymbols.includes(symbol)
                    ? {
                        backgroundColor: symbolColors[symbol as keyof typeof symbolColors],
                        borderColor: symbolColors[symbol as keyof typeof symbolColors],
                      }
                    : {}
                }
              >
                {symbol}
              </Button>
            ))}
          </div>

          {/* Timeframe Selection */}
          <div className="flex gap-2">
            {["1H", "4H", "24H", "7D", "30D"].map((tf) => (
              <Button
                key={tf}
                size="sm"
                variant={timeframe === tf ? "default" : "outline"}
                onClick={() => setTimeframe(tf)}
                className={
                  timeframe === tf
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700/50"
                }
              >
                {tf}
              </Button>
            ))}
          </div>

          {/* Chart Type */}
          <Select value={chartType} onValueChange={(value: "line" | "area") => setChartType(value)}>
            <SelectTrigger className="w-32 bg-slate-900/70 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent className={isFullscreen ? "h-[calc(100vh-200px)]" : "h-96"}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "area" ? (
            <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#E5E7EB", paddingTop: "20px" }} iconType="line" />
              {selectedSymbols.map((symbol) => (
                <Area
                  key={symbol}
                  type="monotone"
                  dataKey={symbol}
                  stroke={symbolColors[symbol as keyof typeof symbolColors]}
                  fill={symbolColors[symbol as keyof typeof symbolColors]}
                  fillOpacity={0.1}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: symbolColors[symbol as keyof typeof symbolColors],
                    strokeWidth: 2,
                    fill: "#1F2937",
                  }}
                />
              ))}
            </AreaChart>
          ) : (
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#E5E7EB", paddingTop: "20px" }} iconType="line" />
              {selectedSymbols.map((symbol) => (
                <Line
                  key={symbol}
                  type="monotone"
                  dataKey={symbol}
                  stroke={symbolColors[symbol as keyof typeof symbolColors]}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: symbolColors[symbol as keyof typeof symbolColors],
                    strokeWidth: 2,
                    fill: "#1F2937",
                  }}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>

        {/* Market Indices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-slate-700">
          <div className="bg-slate-900/70 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-blue-300 font-semibold text-sm">DAX 500 Index</h4>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              12,345.67 <span className="text-green-400 text-base ml-2">+1.23%</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">Weighted average of top 500 digital assets</p>
          </div>

          <div className="bg-slate-900/70 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-purple-300 font-semibold text-sm">DeFi Pulse Index</h4>
              <TrendingDown className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              4,567.89 <span className="text-red-400 text-base ml-2">-0.45%</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">Performance of leading DeFi protocols</p>
          </div>

          <div className="bg-slate-900/70 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-orange-300 font-semibold text-sm">Volatility Index</h4>
              <Activity className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              23.45 <span className="text-orange-400 text-base ml-2">+2.1%</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">Market volatility indicator</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
