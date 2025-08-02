"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Layers, TrendingUp, TrendingDown, Zap } from "lucide-react"

interface MarketDepthProps {
  symbol: string
  data: any
  eliteMode: boolean
}

interface DepthLevel {
  price: number
  size: number
  orders: number
  cumulative: number
  percentage: number
}

export function Nasdaq2035MarketDepth({ symbol, data, eliteMode }: MarketDepthProps) {
  const [precision, setPrecision] = useState("0.01")
  const [showCumulative, setShowCumulative] = useState(true)

  // Generate realistic market depth data
  const [depthData, setDepthData] = useState<{
    bids: DepthLevel[]
    asks: DepthLevel[]
    spread: number
    midPrice: number
  }>({
    bids: [],
    asks: [],
    spread: 0,
    midPrice: 17234.56,
  })

  // Generate market depth levels
  useEffect(() => {
    const generateDepthLevels = () => {
      const midPrice = 17234.56 + (Math.random() - 0.5) * 2
      const bids: DepthLevel[] = []
      const asks: DepthLevel[] = []

      let cumulativeBidSize = 0
      let cumulativeAskSize = 0

      // Generate 15 bid levels
      for (let i = 0; i < 15; i++) {
        const price = midPrice - (i + 1) * (0.01 + Math.random() * 0.05)
        const size = Math.floor(Math.random() * 5000 + 500)
        const orders = Math.floor(Math.random() * 20 + 1)
        cumulativeBidSize += size

        bids.push({
          price: Number(price.toFixed(2)),
          size,
          orders,
          cumulative: cumulativeBidSize,
          percentage: 0, // Will be calculated after all levels
        })
      }

      // Generate 15 ask levels
      for (let i = 0; i < 15; i++) {
        const price = midPrice + (i + 1) * (0.01 + Math.random() * 0.05)
        const size = Math.floor(Math.random() * 5000 + 500)
        const orders = Math.floor(Math.random() * 20 + 1)
        cumulativeAskSize += size

        asks.push({
          price: Number(price.toFixed(2)),
          size,
          orders,
          cumulative: cumulativeAskSize,
          percentage: 0, // Will be calculated after all levels
        })
      }

      // Calculate percentages
      const maxCumulative = Math.max(cumulativeBidSize, cumulativeAskSize)
      bids.forEach((bid) => (bid.percentage = (bid.cumulative / maxCumulative) * 100))
      asks.forEach((ask) => (ask.percentage = (ask.cumulative / maxCumulative) * 100))

      const spread = asks[0].price - bids[0].price

      setDepthData({
        bids,
        asks,
        spread,
        midPrice,
      })
    }

    generateDepthLevels()

    // Update every 2 seconds for realistic market movement
    const interval = setInterval(generateDepthLevels, 2000)
    return () => clearInterval(interval)
  }, [])

  const spreadBps = (depthData.spread / depthData.midPrice) * 10000

  return (
    <div className="space-y-6">
      {/* Market Depth Controls */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Layers className="w-5 h-5 mr-2 text-purple-400" />
              {symbol} - Level II Market Depth
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Live</span>
              </div>
              <Select value={precision} onValueChange={setPrecision}>
                <SelectTrigger className="w-24 bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="0.01">0.01</SelectItem>
                  <SelectItem value="0.05">0.05</SelectItem>
                  <SelectItem value="0.10">0.10</SelectItem>
                  <SelectItem value="0.25">0.25</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Market Summary */}
          <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-slate-800/30 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-slate-400">Best Bid</div>
              <div className="text-lg font-bold text-green-400">{depthData.bids[0]?.price.toFixed(2)}</div>
              <div className="text-xs text-slate-400">{depthData.bids[0]?.size.toLocaleString()} shares</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Spread</div>
              <div className="text-lg font-bold text-white">{depthData.spread.toFixed(2)}</div>
              <div className="text-xs text-slate-400">{spreadBps.toFixed(1)} bps</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Best Ask</div>
              <div className="text-lg font-bold text-red-400">{depthData.asks[0]?.price.toFixed(2)}</div>
              <div className="text-xs text-slate-400">{depthData.asks[0]?.size.toLocaleString()} shares</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Mid Price</div>
              <div className="text-lg font-bold text-white">{depthData.midPrice.toFixed(2)}</div>
              <div className="text-xs text-slate-400">Theoretical</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Book */}
      <div className="grid grid-cols-2 gap-6">
        {/* Bids (Buy Orders) */}
        <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Bids (Buy Orders)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {/* Header */}
              <div className="grid grid-cols-4 text-xs text-slate-400 font-semibold mb-2 pb-2 border-b border-slate-700/30">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Orders</span>
                {showCumulative && <span className="text-right">Cumulative</span>}
              </div>

              {/* Bid Levels */}
              {depthData.bids.map((bid, index) => (
                <div
                  key={index}
                  className="relative grid grid-cols-4 text-sm hover:bg-green-500/10 px-2 py-1 rounded transition-colors"
                >
                  {/* Background bar showing relative size */}
                  <div className="absolute inset-0 bg-green-500/5 rounded" style={{ width: `${bid.percentage}%` }} />

                  <span className="relative font-mono text-green-400 font-semibold">{bid.price.toFixed(2)}</span>
                  <span className="relative text-right text-white font-mono">{bid.size.toLocaleString()}</span>
                  <span className="relative text-right text-slate-300">{bid.orders}</span>
                  {showCumulative && (
                    <span className="relative text-right text-slate-400 font-mono">
                      {bid.cumulative.toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Bid Summary */}
            <div className="mt-4 pt-4 border-t border-slate-700/30">
              <div className="text-center p-2 bg-green-500/10 rounded">
                <div className="text-sm text-green-400 font-semibold">Total Bid Volume</div>
                <div className="text-lg font-bold text-white">
                  {depthData.bids.reduce((sum, bid) => sum + bid.size, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asks (Sell Orders) */}
        <Card className="bg-gradient-to-br from-red-500/5 to-pink-500/5 border-red-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center">
              <TrendingDown className="w-5 h-5 mr-2" />
              Asks (Sell Orders)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {/* Header */}
              <div className="grid grid-cols-4 text-xs text-slate-400 font-semibold mb-2 pb-2 border-b border-slate-700/30">
                <span>Price</span>
                <span className="text-right">Size</span>
                <span className="text-right">Orders</span>
                {showCumulative && <span className="text-right">Cumulative</span>}
              </div>

              {/* Ask Levels */}
              {depthData.asks.map((ask, index) => (
                <div
                  key={index}
                  className="relative grid grid-cols-4 text-sm hover:bg-red-500/10 px-2 py-1 rounded transition-colors"
                >
                  {/* Background bar showing relative size */}
                  <div className="absolute inset-0 bg-red-500/5 rounded" style={{ width: `${ask.percentage}%` }} />

                  <span className="relative font-mono text-red-400 font-semibold">{ask.price.toFixed(2)}</span>
                  <span className="relative text-right text-white font-mono">{ask.size.toLocaleString()}</span>
                  <span className="relative text-right text-slate-300">{ask.orders}</span>
                  {showCumulative && (
                    <span className="relative text-right text-slate-400 font-mono">
                      {ask.cumulative.toLocaleString()}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Ask Summary */}
            <div className="mt-4 pt-4 border-t border-slate-700/30">
              <div className="text-center p-2 bg-red-500/10 rounded">
                <div className="text-sm text-red-400 font-semibold">Total Ask Volume</div>
                <div className="text-lg font-bold text-white">
                  {depthData.asks.reduce((sum, ask) => sum + ask.size, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Elite Market Microstructure Analysis */}
      {eliteMode && (
        <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-400" />
              Elite Market Microstructure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Order Flow Imbalance</div>
                <div className="text-lg font-bold text-green-400">+12.3%</div>
                <div className="text-xs text-slate-400">Bullish</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Market Impact</div>
                <div className="text-lg font-bold text-white">0.08%</div>
                <div className="text-xs text-slate-400">Per €100K</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Liquidity Score</div>
                <div className="text-lg font-bold text-blue-400">8.7/10</div>
                <div className="text-xs text-slate-400">Excellent</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Volatility Regime</div>
                <div className="text-lg font-bold text-orange-400">Normal</div>
                <div className="text-xs text-slate-400">12.4% Ann.</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
