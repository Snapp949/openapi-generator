"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp } from "lucide-react"

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
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const formatAmount = (value: number) => value.toFixed(4)

  // Calculate spread
  const bestBid = Math.max(...bids.map((b) => b.price))
  const bestAsk = Math.min(...asks.map((a) => a.price))
  const spread = bestAsk - bestBid
  const spreadPercent = ((spread / bestBid) * 100).toFixed(3)

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-lg">
            <BookOpen className="w-5 h-5 mr-2 text-blue-400" />
            Order Book
          </CardTitle>
          <Badge variant="outline" className="border-slate-600 text-slate-300">
            Spread: {formatCurrency(spread)} ({spreadPercent}%)
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        {/* Header */}
        <div className="grid grid-cols-3 text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wider">
          <span>Price (USD)</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Total</span>
        </div>

        <Separator className="bg-slate-700 mb-3" />

        {/* Asks (Sell Orders) */}
        <div className="space-y-1 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />
            <span className="text-red-400 text-xs font-medium">SELL ORDERS</span>
          </div>
          {asks
            .sort((a, b) => b.price - a.price) // Highest price first for asks
            .slice(0, 8)
            .map((order, index) => (
              <div
                key={`ask-${index}`}
                className="grid grid-cols-3 text-red-400 hover:bg-red-500/10 px-2 py-1 rounded transition-colors"
              >
                <span className="font-mono">{formatCurrency(order.price)}</span>
                <span className="text-right font-mono">{formatAmount(order.amount)}</span>
                <span className="text-right font-mono text-slate-300">{formatCurrency(order.total)}</span>
              </div>
            ))}
        </div>

        {/* Current Price */}
        <div className="bg-slate-700/50 rounded-lg p-3 mb-4 text-center">
          <div className="text-white font-bold text-lg">{formatCurrency(bestBid + spread / 2)}</div>
          <div className="text-slate-400 text-xs">Last Price</div>
        </div>

        {/* Bids (Buy Orders) */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 text-xs font-medium">BUY ORDERS</span>
          </div>
          {bids
            .sort((a, b) => b.price - a.price) // Highest price first for bids
            .slice(0, 8)
            .map((order, index) => (
              <div
                key={`bid-${index}`}
                className="grid grid-cols-3 text-green-400 hover:bg-green-500/10 px-2 py-1 rounded transition-colors"
              >
                <span className="font-mono">{formatCurrency(order.price)}</span>
                <span className="text-right font-mono">{formatAmount(order.amount)}</span>
                <span className="text-right font-mono text-slate-300">{formatCurrency(order.total)}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
