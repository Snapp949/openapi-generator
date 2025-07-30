"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, ArrowUpRight, ArrowDownLeft } from "lucide-react"

interface Trade {
  id: string
  timestamp: number
  price: number
  amount: number
  side: "buy" | "sell"
  total: number
}

export function TradeHistory() {
  const [trades, setTrades] = useState<Trade[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateTrade = (): Trade => {
      const basePrice = 43250
      const price = basePrice + (Math.random() - 0.5) * 100
      const amount = Math.random() * 2 + 0.01
      const side = Math.random() > 0.5 ? "buy" : "sell"

      return {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        price,
        amount,
        side,
        total: price * amount,
      }
    }

    const initializeTrades = () => {
      const initialTrades: Trade[] = []
      for (let i = 0; i < 20; i++) {
        const trade = generateTrade()
        trade.timestamp = Date.now() - i * 30000 // 30 seconds apart
        initialTrades.push(trade)
      }
      setTrades(initialTrades.reverse())
      setLoading(false)
    }

    const addNewTrade = () => {
      const newTrade = generateTrade()
      setTrades((prev) => [newTrade, ...prev.slice(0, 19)]) // Keep last 20 trades
    }

    initializeTrades()
    const interval = setInterval(addNewTrade, 3000) // New trade every 3 seconds

    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <Card className="bg-black/40 border-cyan-500/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-4 bg-cyan-500/20 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/40 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <History className="w-5 h-5" />
          Recent Trades
        </CardTitle>
        <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
          <div>Time</div>
          <div>Price</div>
          <div>Amount</div>
          <div>Total</div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="max-h-64 overflow-y-auto">
          {trades.map((trade) => (
            <div
              key={trade.id}
              className={`p-3 border-b border-cyan-500/10 hover:bg-${trade.side === "buy" ? "green" : "red"}-500/5 transition-colors`}
            >
              <div className="grid grid-cols-4 gap-2 text-xs items-center">
                <div className="text-gray-400">{new Date(trade.timestamp).toLocaleTimeString()}</div>
                <div className={`font-mono ${trade.side === "buy" ? "text-green-400" : "text-red-400"}`}>
                  ${trade.price.toFixed(2)}
                </div>
                <div className="text-white font-mono">{trade.amount.toFixed(4)}</div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-300 font-mono">${trade.total.toFixed(0)}</span>
                  {trade.side === "buy" ? (
                    <ArrowUpRight className="w-3 h-3 text-green-400" />
                  ) : (
                    <ArrowDownLeft className="w-3 h-3 text-red-400" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-cyan-500/20 bg-black/20">
          <div className="flex items-center justify-between text-xs">
            <div className="text-gray-400">Live feed • Updates every 3s</div>
            <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
              {trades.length} trades
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
