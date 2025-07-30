"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, TrendingUp, TrendingDown } from "lucide-react"

interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

interface OrderBookData {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
  spread: number
  lastPrice: number
}

export function OrderBook() {
  const [orderBook, setOrderBook] = useState<OrderBookData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const generateOrderBook = (): OrderBookData => {
      const lastPrice = 43250 + (Math.random() - 0.5) * 100
      const spread = 5 + Math.random() * 10

      const bids: OrderBookEntry[] = []
      const asks: OrderBookEntry[] = []

      // Generate bids (buy orders) - below last price
      for (let i = 0; i < 10; i++) {
        const price = lastPrice - spread / 2 - i * 2
        const amount = Math.random() * 5 + 0.1
        const total = price * amount
        bids.push({ price, amount, total })
      }

      // Generate asks (sell orders) - above last price
      for (let i = 0; i < 10; i++) {
        const price = lastPrice + spread / 2 + i * 2
        const amount = Math.random() * 5 + 0.1
        const total = price * amount
        asks.push({ price, amount, total })
      }

      return { bids, asks, spread, lastPrice }
    }

    const updateOrderBook = () => {
      setOrderBook(generateOrderBook())
      setLoading(false)
    }

    updateOrderBook()
    const interval = setInterval(updateOrderBook, 2000)

    return () => clearInterval(interval)
  }, [])

  if (loading || !orderBook) {
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

  const maxTotal = Math.max(...orderBook.bids.map((b) => b.total), ...orderBook.asks.map((a) => a.total))

  return (
    <Card className="bg-black/40 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Order Book
        </CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div className="text-white">Last: ${orderBook.lastPrice.toFixed(2)}</div>
          <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
            Spread: ${orderBook.spread.toFixed(2)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-0">
          {/* Bids (Buy Orders) */}
          <div className="border-r border-cyan-500/20">
            <div className="p-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2 text-sm font-medium text-green-400">
                <TrendingUp className="w-4 h-4" />
                Bids
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mt-2">
                <div>Price</div>
                <div>Amount</div>
                <div>Total</div>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {orderBook.bids.map((bid, index) => (
                <div key={index} className="relative p-2 hover:bg-green-500/5">
                  <div
                    className="absolute inset-0 bg-green-500/10"
                    style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                  />
                  <div className="relative grid grid-cols-3 gap-2 text-xs">
                    <div className="text-green-400 font-mono">${bid.price.toFixed(2)}</div>
                    <div className="text-white font-mono">{bid.amount.toFixed(4)}</div>
                    <div className="text-gray-400 font-mono">${bid.total.toFixed(0)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Asks (Sell Orders) */}
          <div>
            <div className="p-3 border-b border-cyan-500/20">
              <div className="flex items-center gap-2 text-sm font-medium text-red-400">
                <TrendingDown className="w-4 h-4" />
                Asks
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mt-2">
                <div>Price</div>
                <div>Amount</div>
                <div>Total</div>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {orderBook.asks.map((ask, index) => (
                <div key={index} className="relative p-2 hover:bg-red-500/5">
                  <div
                    className="absolute inset-0 bg-red-500/10"
                    style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                  />
                  <div className="relative grid grid-cols-3 gap-2 text-xs">
                    <div className="text-red-400 font-mono">${ask.price.toFixed(2)}</div>
                    <div className="text-white font-mono">{ask.amount.toFixed(4)}</div>
                    <div className="text-gray-400 font-mono">${ask.total.toFixed(0)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
