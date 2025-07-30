"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Clock, Activity } from "lucide-react"

interface RecentTrade {
  time: string
  price: number
  amount: number
  type: "buy" | "sell"
}

interface TradeHistoryProps {
  trades: RecentTrade[]
}

export function TradeHistory({ trades }: TradeHistoryProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)

  const formatAmount = (value: number) => value.toFixed(4)

  // Calculate volume and trade statistics
  const totalVolume = trades.reduce((sum, trade) => sum + trade.price * trade.amount, 0)
  const buyTrades = trades.filter((t) => t.type === "buy").length
  const sellTrades = trades.filter((t) => t.type === "sell").length

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-lg">
            <Activity className="w-5 h-5 mr-2 text-green-400" />
            Recent Trades
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="border-green-600/30 text-green-400 text-xs">
              {buyTrades} Buys
            </Badge>
            <Badge variant="outline" className="border-red-600/30 text-red-400 text-xs">
              {sellTrades} Sells
            </Badge>
          </div>
        </div>
        <div className="text-slate-400 text-sm">Volume: {formatCurrency(totalVolume)}</div>
      </CardHeader>
      <CardContent className="text-sm">
        {/* Header */}
        <div className="grid grid-cols-3 text-slate-400 font-semibold mb-3 text-xs uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Time
          </span>
          <span>Price (USD)</span>
          <span className="text-right">Amount</span>
        </div>

        <Separator className="bg-slate-700 mb-3" />

        {/* Trades List */}
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {trades.slice(0, 15).map((trade, index) => (
            <div
              key={`trade-${index}`}
              className={`grid grid-cols-3 hover:bg-slate-700/30 px-2 py-1.5 rounded transition-colors ${
                trade.type === "buy" ? "border-l-2 border-green-500/30" : "border-l-2 border-red-500/30"
              }`}
            >
              <span className="text-slate-300 font-mono text-xs">{trade.time}</span>
              <span className={`font-mono ${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                {formatCurrency(trade.price)}
              </span>
              <span className="text-right text-slate-300 font-mono">{formatAmount(trade.amount)}</span>
            </div>
          ))}
        </div>

        {/* Trade Summary */}
        <Separator className="bg-slate-700 my-3" />
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="text-center p-2 bg-green-500/10 rounded">
            <div className="text-green-400 font-semibold">Avg Buy Price</div>
            <div className="text-white">
              {formatCurrency(
                trades.filter((t) => t.type === "buy").reduce((sum, t, _, arr) => sum + t.price / arr.length, 0),
              )}
            </div>
          </div>
          <div className="text-center p-2 bg-red-500/10 rounded">
            <div className="text-red-400 font-semibold">Avg Sell Price</div>
            <div className="text-white">
              {formatCurrency(
                trades.filter((t) => t.type === "sell").reduce((sum, t, _, arr) => sum + t.price / arr.length, 0),
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
