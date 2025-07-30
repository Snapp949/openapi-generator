"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, TrendingUp, RefreshCw, Settings } from "lucide-react"

interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

interface OrderBookProps {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
}

export function OrderBook({ bids, asks }: OrderBookProps) {
  const [selectedPair, setSelectedPair] = useState("BTC/USD")
  const [precision, setPrecision] = useState("0.01")
  const [grouping, setGrouping] = useState("1")
  const [showDepth, setShowDepth] = useState(true)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const formatAmount = (value: number) => value.toFixed(4)

  // Calculate spread and market metrics
  const bestBid = Math.max(...bids.map((b) => b.price))
  const bestAsk = Math.min(...asks.map((a) => a.price))
  const spread = bestAsk - bestBid
  const spreadPercent = ((spread / bestBid) * 100).toFixed(3)
  const midPrice = (bestBid + bestAsk) / 2

  // Calculate cumulative volumes
  const bidsWithCumulative = bids
    .sort((a, b) => b.price - a.price)
    .map((bid, index, array) => ({
      ...bid,
      cumulative: array.slice(0, index + 1).reduce((sum, b) => sum + b.amount, 0),
    }))

  const asksWithCumulative = asks
    .sort((a, b) => a.price - b.price)
    .map((ask, index, array) => ({
      ...ask,
      cumulative: array.slice(0, index + 1).reduce((sum, a) => sum + a.amount, 0),
    }))

  const maxCumulative = Math.max(
    ...bidsWithCumulative.map((b) => b.cumulative),
    ...asksWithCumulative.map((a) => a.cumulative),
  )

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-lg">
            <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
            Order Book
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700/50"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700/50"
            >
              <RefreshCw className="w-4 h-4" />
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

          <Select value={grouping} onValueChange={setGrouping}>
            <SelectTrigger className="w-20 bg-slate-900/70 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-700 text-white">
              <SelectItem value="0.1">0.1</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>

          <Button
            size="sm"
            variant={showDepth ? "default" : "outline"}
            onClick={() => setShowDepth(!showDepth)}
            className={showDepth ? "bg-blue-600 text-white" : "border-slate-600 bg-transparent text-slate-300"}
          >
            Depth
          </Button>
        </div>

        {/* Market Info */}
        <div className="grid grid-cols-3 gap-4 mt-3 p-3 bg-slate-900/50 rounded-lg">
          <div className="text-center">
            <div className="text-xs text-slate-400">Best Bid</div>
            <div className="text-green-400 font-mono font-semibold">{formatCurrency(bestBid)}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400">Spread</div>
            <div className="text-yellow-400 font-mono font-semibold">
              {formatCurrency(spread)} ({spreadPercent}%)
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-400">Best Ask</div>
            <div className="text-red-400 font-mono font-semibold">{formatCurrency(bestAsk)}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-sm p-0">
        {/* Header */}
        <div className="grid grid-cols-4 text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wider px-4">
          <span>Price (USD)</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Total</span>
          {showDepth && <span className="text-right">Depth</span>}
        </div>

        <Separator className="bg-slate-700 mb-3" />

        {/* Asks (Sell Orders) */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
            <span className="text-red-400 text-xs font-medium">SELL ORDERS</span>
            <Badge variant="outline" className="border-red-600/30 text-red-400 text-xs">
              {asksWithCumulative.length}
            </Badge>
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {asksWithCumulative.slice(0, 10).map((order, index) => (
              <div
                key={`ask-${index}`}
                className="relative grid grid-cols-4 text-red-400 hover:bg-red-500/10 px-2 py-1 rounded transition-colors"
              >
                {showDepth && (
                  <div
                    className="absolute inset-0 bg-red-500/5"
                    style={{ width: `${(order.cumulative / maxCumulative) * 100}%` }}
                  />
                )}
                <span className="relative font-mono text-xs">{formatCurrency(order.price)}</span>
                <span className="relative text-right font-mono text-xs">{formatAmount(order.amount)}</span>
                <span className="relative text-right font-mono text-xs text-slate-300">
                  {formatCurrency(order.total)}
                </span>
                {showDepth && (
                  <span className="relative text-right font-mono text-xs text-slate-400">
                    {formatAmount(order.cumulative)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Price */}
        <div className="bg-slate-700/50 rounded-lg p-3 mx-4 mb-4 text-center">
          <div className="text-white font-bold text-lg">{formatCurrency(midPrice)}</div>
          <div className="text-slate-400 text-xs">Last Price</div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-xs font-medium">BUY ORDERS</span>
            <Badge variant="outline" className="border-green-600/30 text-green-400 text-xs">
              {bidsWithCumulative.length}
            </Badge>
          </div>
          <div className="space-y-1 max-h-48 overflow-y-auto">
            {bidsWithCumulative.slice(0, 10).map((order, index) => (
              <div
                key={`bid-${index}`}
                className="relative grid grid-cols-4 text-green-400 hover:bg-green-500/10 px-2 py-1 rounded transition-colors"
              >
                {showDepth && (
                  <div
                    className="absolute inset-0 bg-green-500/5"
                    style={{ width: `${(order.cumulative / maxCumulative) * 100}%` }}
                  />
                )}
                <span className="relative font-mono text-xs">{formatCurrency(order.price)}</span>
                <span className="relative text-right font-mono text-xs">{formatAmount(order.amount)}</span>
                <span className="relative text-right font-mono text-xs text-slate-300">
                  {formatCurrency(order.total)}
                </span>
                {showDepth && (
                  <span className="relative text-right font-mono text-xs text-slate-400">
                    {formatAmount(order.cumulative)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <Separator className="bg-slate-700 mb-3" />
        <div className="grid grid-cols-2 gap-4 px-4 pb-4 text-xs">
          <div className="text-center p-2 bg-green-500/10 rounded">
            <div className="text-green-400 font-semibold">Total Bid Volume</div>
            <div className="text-white font-mono">
              {formatAmount(bidsWithCumulative.reduce((sum, b) => sum + b.amount, 0))}
            </div>
          </div>
          <div className="text-center p-2 bg-red-500/10 rounded">
            <div className="text-red-400 font-semibold">Total Ask Volume</div>
            <div className="text-white font-mono">
              {formatAmount(asksWithCumulative.reduce((sum, a) => sum + a.amount, 0))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
