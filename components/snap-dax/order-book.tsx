"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

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
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  const formatAmount = (value: number) => value.toFixed(4)

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">Order Book</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="grid grid-cols-3 text-slate-400 font-semibold mb-2">
          <span>Price (USD)</span>
          <span className="text-right">Amount</span>
          <span className="text-right">Total</span>
        </div>
        <Separator className="bg-slate-700 mb-2" />
        <div className="space-y-1">
          {asks
            .sort((a, b) => a.price - b.price)
            .map((order, index) => (
              <div key={`ask-${index}`} className="grid grid-cols-3 text-red-400">
                <span>{formatCurrency(order.price)}</span>
                <span className="text-right">{formatAmount(order.amount)}</span>
                <span className="text-right">{formatCurrency(order.total)}</span>
              </div>
            ))}
        </div>
        <Separator className="bg-slate-700 my-2" />
        <div className="space-y-1">
          {bids
            .sort((a, b) => b.price - a.price)
            .map((order, index) => (
              <div key={`bid-${index}`} className="grid grid-cols-3 text-green-400">
                <span>{formatCurrency(order.price)}</span>
                <span className="text-right">{formatAmount(order.amount)}</span>
                <span className="text-right">{formatCurrency(order.total)}</span>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  )
}
