"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  const formatAmount = (value: number) => value.toFixed(4)

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Recent Trades</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid grid-cols-3 text-slate-400 font-semibold mb-2">
          <span>Time</span>
          <span>Price (USD)</span>
          <span className="text-right">Amount</span>
        </div>
        <Separator className="bg-slate-700 mb-2" />
        <div className="space-y-1">
          {trades.map((trade, index) => (
            <div key={`trade-${index}`} className="grid grid-cols-3">
              <span className="text-slate-300">{trade.time}</span>
              <span className={`${trade.type === "buy" ? "text-green-400" : "text-red-400"}`}>
                {formatCurrency(trade.price)}
              </span>
              <span className="text-right text-slate-300">{formatAmount(trade.amount)}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
