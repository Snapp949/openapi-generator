"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, Activity, TrendingUp, TrendingDown, Filter, Download } from "lucide-react"

interface RecentTrade {
  id: string
  time: string
  timestamp: number
  price: number
  amount: number
  type: "buy" | "sell"
  total: number
}

interface TradeHistoryProps {
  trades: RecentTrade[]
}

export function TradeHistory({ trades }: TradeHistoryProps) {
  const [selectedPair, setSelectedPair] = useState("BTC/USD")
  const [filterType, setFilterType] = useState("all")
  const [timeRange, setTimeRange] = useState("1h")

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const formatAmount = (value: number) => value.toFixed(4)

  // Filter trades based on selected filters
  const filteredTrades = trades.filter((trade) => {
    if (filterType === "buy") return trade.type === "buy"
    if (filterType === "sell") return trade.type === "sell"
    return true
  })

  // Calculate trade statistics
  const totalVolume = filteredTrades.reduce((sum, trade) => sum + trade.total, 0)
  const buyTrades = filteredTrades.filter((t) => t.type === "buy")
  const sellTrades = filteredTrades.filter((t) => t.type === "sell")
  const avgTradeSize = totalVolume / filteredTrades.length || 0

  const buyVolume = buyTrades.reduce((sum, t) => sum + t.total, 0)
  const sellVolume = sellTrades.reduce((sum, t) => sum + t.total, 0)
  const buyPressure = totalVolume > 0 ? (buyVolume / totalVolume) * 100 : 50

  // Price trend analysis
  const recentTrades = filteredTrades.slice(0, 10)
  const priceChange = recentTrades.length >= 2 ? recentTrades[0].price - recentTrades[recentTrades.length - 1].price : 0
  const priceChangePercent =
    recentTrades.length >= 2 ? (priceChange / recentTrades[recentTrades.length - 1].price) * 100 : 0

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-lg">
            <Activity className="w-5 h-5 mr-2 text-green-400" />
            Recent Trades
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700/50"
            >
              <Download className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700/50"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mt-3">
          <Select value={selectedPair} onValueChange={setSelectedPair}>
            <SelectTrigger className="w-32 bg-slate-900/70 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              <SelectItem value="BTC/USD">BTC/USD</SelectItem>
              <SelectItem value="ETH/USD">ETH/USD</SelectItem>
              <SelectItem value="SOL/USD">SOL/USD</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-24 bg-slate-900/70 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="buy">Buy</SelectItem>
              <SelectItem value="sell">Sell</SelectItem>
            </SelectContent>
          </Select>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-20 bg-slate-900/70 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              <SelectItem value="1h">1H</SelectItem>
              <SelectItem value="4h">4H</SelectItem>
              <SelectItem value="24h">24H</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Trade Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 p-3 bg-slate-900/50 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-slate-400">Volume</div>
            <div className="text-white font-semibold">{formatCurrency(totalVolume)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400">Trades</div>
            <div className="text-white font-semibold">{filteredTrades.length}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400">Avg Size</div>
            <div className="text-white font-semibold">{formatCurrency(avgTradeSize)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400">Buy Pressure</div>
            <div className={`font-semibold ${buyPressure > 50 ? "text-green-400" : "text-red-400"}`}>
              {buyPressure.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Price Trend */}
        <div className="flex items-center justify-between mt-3 p-2 bg-slate-900/30 rounded">
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Price Trend:</span>
            {priceChangePercent > 0 ? (
              <div className="flex items-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="font-semibold">+{priceChangePercent.toFixed(2)}%</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-400">
                <TrendingDown className="w-4 h-4" />
                <span className="font-semibold">{priceChangePercent.toFixed(2)}%</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-green-600/30 text-green-400 text-xs">
              {buyTrades.length} Buys
            </Badge>
            <Badge variant="outline" className="border-red-600/30 text-red-400 text-xs">
              {sellTrades.length} Sells
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-sm p-0">
        {/* Header */}
        <div className="grid grid-cols-4 text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wider px-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Time
          </span>
          <span>Price (USD)</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Total</span>
        </div>

        <Separator className="bg-slate-700 mb-3" />

        {/* Trades List */}
        <div className="space-y-1 max-h-80 overflow-y-auto px-4">
          {filteredTrades.slice(0, 20).map((trade, index) => (
            <div
              key={trade.id}
              className={`grid grid-cols-4 hover:bg-slate-700/30 px-2 py-2 rounded transition-colors ${
                trade.type === "buy"
                  ? "border-l-2 border-green-500/30 bg-green-500/5"
                  : "border-l-2 border-red-500/30 bg-red-500/5"
              }`}
            >
              <span className="text-slate-300 font-mono text-xs flex items-center">
                {trade.time}
                {index === 0 && <div className="w-2 h-2 bg-green-400 rounded-full ml-2 animate-pulse" />}
              </span>
              <span className={`font-mono text-sm ${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                {formatCurrency(trade.price)}
              </span>
              <span className="text-right text-slate-300 font-mono text-sm">{formatAmount(trade.amount)}</span>
              <span className="text-right text-white font-mono text-sm">{formatCurrency(trade.total)}</span>
            </div>
          ))}
        </div>

        {/* Trade Summary */}
        <Separator className="bg-slate-700 my-3" />
        <div className="grid grid-cols-2 gap-4 px-4 pb-4 text-xs">
          <div className="text-center p-3 bg-green-500/10 rounded">
            <div className="text-green-400 font-semibold mb-1">Buy Orders</div>
            <div className="text-white font-mono text-lg">{buyTrades.length}</div>
            <div className="text-green-400 font-mono">{formatCurrency(buyVolume)}</div>
            <div className="text-slate-400 mt-1">
              Avg: {buyTrades.length > 0 ? formatCurrency(buyVolume / buyTrades.length) : "$0"}
            </div>
          </div>
          <div className="text-center p-3 bg-red-500/10 rounded">
            <div className="text-red-400 font-semibold mb-1">Sell Orders</div>
            <div className="text-white font-mono text-lg">{sellTrades.length}</div>
            <div className="text-red-400 font-mono">{formatCurrency(sellVolume)}</div>
            <div className="text-slate-400 mt-1">
              Avg: {sellTrades.length > 0 ? formatCurrency(sellVolume / sellTrades.length) : "$0"}
            </div>
          </div>
        </div>

        {/* Live Feed Indicator */}
        <div className="px-4 pb-3">
          <div className="flex items-center justify-between text-xs bg-slate-900/50 p-2 rounded">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Live feed • Updates every 3s
            </div>
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
              {filteredTrades.length} trades
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
