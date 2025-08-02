"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Layers, TrendingUp, TrendingDown, Zap, Activity } from "lucide-react"

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
  timestamp: number
}

export function Nasdaq2035MarketDepth({ symbol, data, eliteMode }: MarketDepthProps) {
  const [precision, setPrecision] = useState("0.01")
  const [showCumulative, setShowCumulative] = useState(true)
  const [showOrders, setShowOrders] = useState(true)
  const [aggregationLevel, setAggregationLevel] = useState("1")

  // Generate realistic market depth data with enhanced features
  const [depthData, setDepthData] = useState<{
    bids: DepthLevel[]
    asks: DepthLevel[]
    spread: number
    midPrice: number
    totalBidVolume: number
    totalAskVolume: number
    imbalance: number
    marketPressure: "bullish" | "bearish" | "neutral"
  }>({
    bids: [],
    asks: [],
    spread: 0,
    midPrice: 17234.56,
    totalBidVolume: 0,
    totalAskVolume: 0,
    imbalance: 0,
    marketPressure: "neutral",
  })

  // Generate enhanced market depth levels with realistic patterns
  useEffect(() => {
    const generateDepthLevels = () => {
      const midPrice = 17234.56 + (Math.random() - 0.5) * 4
      const bids: DepthLevel[] = []
      const asks: DepthLevel[] = []
      const now = Date.now()

      let cumulativeBidSize = 0
      let cumulativeAskSize = 0

      // Generate 20 bid levels with realistic size distribution
      for (let i = 0; i < 20; i++) {
        const priceStep = Number.parseFloat(precision) * (i + 1) + Math.random() * Number.parseFloat(precision)
        const price = midPrice - priceStep

        // Exponential decay for size with some randomness
        const baseSize = Math.floor((Math.random() * 8000 + 2000) * Math.exp(-i * 0.08))
        const size = Math.max(100, baseSize + Math.floor((Math.random() - 0.5) * 1000))
        const orders = Math.max(1, Math.floor(size / (200 + Math.random() * 300)))

        cumulativeBidSize += size

        bids.push({
          price: Number(price.toFixed(2)),
          size,
          orders,
          cumulative: cumulativeBidSize,
          percentage: 0, // Will be calculated after all levels
          timestamp: now - Math.random() * 5000,
        })
      }

      // Generate 20 ask levels with similar pattern
      for (let i = 0; i < 20; i++) {
        const priceStep = Number.parseFloat(precision) * (i + 1) + Math.random() * Number.parseFloat(precision)
        const price = midPrice + priceStep

        const baseSize = Math.floor((Math.random() * 8000 + 2000) * Math.exp(-i * 0.08))
        const size = Math.max(100, baseSize + Math.floor((Math.random() - 0.5) * 1000))
        const orders = Math.max(1, Math.floor(size / (200 + Math.random() * 300)))

        cumulativeAskSize += size

        asks.push({
          price: Number(price.toFixed(2)),
          size,
          orders,
          cumulative: cumulativeAskSize,
          percentage: 0,
          timestamp: now - Math.random() * 5000,
        })
      }

      // Calculate percentages for visualization
      const maxCumulative = Math.max(cumulativeBidSize, cumulativeAskSize)
      bids.forEach((bid) => (bid.percentage = (bid.cumulative / maxCumulative) * 100))
      asks.forEach((ask) => (ask.percentage = (ask.cumulative / maxCumulative) * 100))

      const spread = asks[0].price - bids[0].price
      const imbalance = ((cumulativeBidSize - cumulativeAskSize) / (cumulativeBidSize + cumulativeAskSize)) * 100

      let marketPressure: "bullish" | "bearish" | "neutral" = "neutral"
      if (imbalance > 15) marketPressure = "bullish"
      else if (imbalance < -15) marketPressure = "bearish"

      setDepthData({
        bids,
        asks,
        spread,
        midPrice,
        totalBidVolume: cumulativeBidSize,
        totalAskVolume: cumulativeAskSize,
        imbalance,
        marketPressure,
      })
    }

    generateDepthLevels()

    // Update every 1 second for realistic market movement
    const interval = setInterval(generateDepthLevels, 1000)
    return () => clearInterval(interval)
  }, [precision])

  const spreadBps = (depthData.spread / depthData.midPrice) * 10000

  // Calculate market impact for different order sizes
  const calculateMarketImpact = (side: "buy" | "sell", orderSize: number) => {
    const levels = side === "buy" ? depthData.asks : depthData.bids
    let remainingSize = orderSize
    let totalCost = 0
    let levelsConsumed = 0

    for (const level of levels) {
      if (remainingSize <= 0) break

      const sizeToTake = Math.min(remainingSize, level.size)
      totalCost += sizeToTake * level.price
      remainingSize -= sizeToTake
      levelsConsumed++

      if (remainingSize <= 0) break
    }

    const avgPrice = totalCost / (orderSize - remainingSize)
    const marketPrice = side === "buy" ? depthData.asks[0].price : depthData.bids[0].price
    const impact = ((avgPrice - marketPrice) / marketPrice) * 100

    return { impact, levelsConsumed, avgPrice }
  }

  return (
    <div className="space-y-6">
      {/* Market Depth Controls */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Layers className="w-5 h-5 mr-2 text-purple-400" />
              {symbol} - Elite Level II Market Depth
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Live • 1s</span>
              </div>
              <Badge
                className={`${
                  depthData.marketPressure === "bullish"
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : depthData.marketPressure === "bearish"
                      ? "bg-red-500/20 text-red-400 border-red-500/30"
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                }`}
              >
                {depthData.marketPressure.toUpperCase()}
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Price Precision</label>
              <Select value={precision} onValueChange={setPrecision}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="0.01">0.01</SelectItem>
                  <SelectItem value="0.05">0.05</SelectItem>
                  <SelectItem value="0.10">0.10</SelectItem>
                  <SelectItem value="0.25">0.25</SelectItem>
                  <SelectItem value="1.00">1.00</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">Aggregation</label>
              <Select value={aggregationLevel} onValueChange={setAggregationLevel}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="1">Level 1</SelectItem>
                  <SelectItem value="5">Level 5</SelectItem>
                  <SelectItem value="10">Level 10</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Button
                variant={showCumulative ? "default" : "outline"}
                size="sm"
                onClick={() => setShowCumulative(!showCumulative)}
                className={showCumulative ? "bg-blue-600" : "border-slate-700 text-slate-300"}
              >
                Cumulative
              </Button>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Button
                variant={showOrders ? "default" : "outline"}
                size="sm"
                onClick={() => setShowOrders(!showOrders)}
                className={showOrders ? "bg-purple-600" : "border-slate-700 text-slate-300"}
              >
                Orders
              </Button>
            </div>
          </div>

          {/* Market Summary */}
          <div className="grid grid-cols-5 gap-4 mb-6 p-4 bg-slate-800/30 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-slate-400">Best Bid</div>
              <div className="text-lg font-bold text-green-400">{depthData.bids[0]?.price.toFixed(2)}</div>
              <div className="text-xs text-slate-400">{depthData.bids[0]?.size.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Spread</div>
              <div className="text-lg font-bold text-white">{depthData.spread.toFixed(2)}</div>
              <div className="text-xs text-slate-400">{spreadBps.toFixed(1)} bps</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Mid Price</div>
              <div className="text-lg font-bold text-blue-400">{depthData.midPrice.toFixed(2)}</div>
              <div className="text-xs text-slate-400">Theoretical</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Best Ask</div>
              <div className="text-lg font-bold text-red-400">{depthData.asks[0]?.price.toFixed(2)}</div>
              <div className="text-xs text-slate-400">{depthData.asks[0]?.size.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Imbalance</div>
              <div
                className={`text-lg font-bold ${
                  depthData.imbalance > 0 ? "text-green-400" : depthData.imbalance < 0 ? "text-red-400" : "text-white"
                }`}
              >
                {depthData.imbalance > 0 ? "+" : ""}
                {depthData.imbalance.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-400">
                {depthData.imbalance > 0 ? "Buy pressure" : depthData.imbalance < 0 ? "Sell pressure" : "Balanced"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Book */}
      <div className="grid grid-cols-2 gap-6">
        {/* Bids (Buy Orders) */}
        <Card className="bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-green-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Bids (Buy Orders)
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {depthData.totalBidVolume.toLocaleString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {/* Header */}
              <div
                className={`grid ${showOrders && showCumulative ? "grid-cols-5" : showOrders || showCumulative ? "grid-cols-4" : "grid-cols-3"} text-xs text-slate-400 font-semibold mb-2 pb-2 border-b border-slate-700/30`}
              >
                <span>Price</span>
                <span className="text-right">Size</span>
                {showOrders && <span className="text-right">Orders</span>}
                {showCumulative && <span className="text-right">Cumulative</span>}
                <span className="text-right">Time</span>
              </div>

              {/* Bid Levels */}
              <div className="max-h-96 overflow-y-auto">
                {depthData.bids.map((bid, index) => (
                  <div
                    key={index}
                    className="relative grid grid-cols-5 text-sm hover:bg-green-500/10 px-2 py-1 rounded transition-colors cursor-pointer group"
                  >
                    {/* Background bar showing relative size */}
                    <div
                      className="absolute inset-0 bg-green-500/5 rounded transition-all duration-300 group-hover:bg-green-500/10"
                      style={{ width: `${(bid.size / Math.max(...depthData.bids.map((b) => b.size))) * 100}%` }}
                    />

                    <span className="relative font-mono text-green-400 font-semibold">{bid.price.toFixed(2)}</span>
                    <span className="relative text-right text-white font-mono">{bid.size.toLocaleString()}</span>
                    {showOrders && <span className="relative text-right text-slate-300">{bid.orders}</span>}
                    {showCumulative && (
                      <span className="relative text-right text-slate-400 font-mono">
                        {bid.cumulative.toLocaleString()}
                      </span>
                    )}
                    <span className="relative text-right text-slate-500 text-xs">
                      {Math.floor((Date.now() - bid.timestamp) / 1000)}s
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bid Summary */}
            <div className="mt-4 pt-4 border-t border-slate-700/30">
              <div className="text-center p-2 bg-green-500/10 rounded">
                <div className="text-sm text-green-400 font-semibold">Total Bid Volume</div>
                <div className="text-lg font-bold text-white">{depthData.totalBidVolume.toLocaleString()}</div>
                <div className="text-xs text-slate-400">
                  Avg Size: {Math.floor(depthData.totalBidVolume / depthData.bids.length).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asks (Sell Orders) */}
        <Card className="bg-gradient-to-br from-red-500/5 to-pink-500/5 border-red-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center justify-between">
              <div className="flex items-center">
                <TrendingDown className="w-5 h-5 mr-2" />
                Asks (Sell Orders)
              </div>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                {depthData.totalAskVolume.toLocaleString()}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {/* Header */}
              <div
                className={`grid ${showOrders && showCumulative ? "grid-cols-5" : showOrders || showCumulative ? "grid-cols-4" : "grid-cols-3"} text-xs text-slate-400 font-semibold mb-2 pb-2 border-b border-slate-700/30`}
              >
                <span>Price</span>
                <span className="text-right">Size</span>
                {showOrders && <span className="text-right">Orders</span>}
                {showCumulative && <span className="text-right">Cumulative</span>}
                <span className="text-right">Time</span>
              </div>

              {/* Ask Levels */}
              <div className="max-h-96 overflow-y-auto">
                {depthData.asks.map((ask, index) => (
                  <div
                    key={index}
                    className="relative grid grid-cols-5 text-sm hover:bg-red-500/10 px-2 py-1 rounded transition-colors cursor-pointer group"
                  >
                    {/* Background bar showing relative size */}
                    <div
                      className="absolute inset-0 bg-red-500/5 rounded transition-all duration-300 group-hover:bg-red-500/10"
                      style={{ width: `${(ask.size / Math.max(...depthData.asks.map((a) => a.size))) * 100}%` }}
                    />

                    <span className="relative font-mono text-red-400 font-semibold">{ask.price.toFixed(2)}</span>
                    <span className="relative text-right text-white font-mono">{ask.size.toLocaleString()}</span>
                    {showOrders && <span className="relative text-right text-slate-300">{ask.orders}</span>}
                    {showCumulative && (
                      <span className="relative text-right text-slate-400 font-mono">
                        {ask.cumulative.toLocaleString()}
                      </span>
                    )}
                    <span className="relative text-right text-slate-500 text-xs">
                      {Math.floor((Date.now() - ask.timestamp) / 1000)}s
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ask Summary */}
            <div className="mt-4 pt-4 border-t border-slate-700/30">
              <div className="text-center p-2 bg-red-500/10 rounded">
                <div className="text-sm text-red-400 font-semibold">Total Ask Volume</div>
                <div className="text-lg font-bold text-white">{depthData.totalAskVolume.toLocaleString()}</div>
                <div className="text-xs text-slate-400">
                  Avg Size: {Math.floor(depthData.totalAskVolume / depthData.asks.length).toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Elite Market Microstructure Analysis */}
      {eliteMode && (
        <div className="grid grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-purple-400" />
                Market Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1000, 5000, 10000, 25000].map((size) => {
                const buyImpact = calculateMarketImpact("buy", size)
                const sellImpact = calculateMarketImpact("sell", size)

                return (
                  <div key={size} className="p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-300 font-medium">{size.toLocaleString()} shares</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-green-400">Buy Impact</div>
                        <div className="text-white font-mono">+{buyImpact.impact.toFixed(3)}%</div>
                        <div className="text-slate-400 text-xs">{buyImpact.levelsConsumed} levels</div>
                      </div>
                      <div>
                        <div className="text-red-400">Sell Impact</div>
                        <div className="text-white font-mono">{sellImpact.impact.toFixed(3)}%</div>
                        <div className="text-slate-400 text-xs">{sellImpact.levelsConsumed} levels</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Liquidity Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                  <div className="text-sm text-slate-400">Liquidity Score</div>
                  <div className="text-2xl font-bold text-blue-400">8.7/10</div>
                  <div className="text-xs text-slate-400">Excellent</div>
                </div>
                <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                  <div className="text-sm text-slate-400">Depth Ratio</div>
                  <div className="text-2xl font-bold text-white">
                    {(depthData.totalBidVolume / depthData.totalAskVolume).toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-400">Bid/Ask</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Order Flow Imbalance</span>
                  <span
                    className={`font-bold ${
                      depthData.imbalance > 5
                        ? "text-green-400"
                        : depthData.imbalance < -5
                          ? "text-red-400"
                          : "text-white"
                    }`}
                  >
                    {depthData.imbalance > 0 ? "+" : ""}
                    {depthData.imbalance.toFixed(1)}%
                  </span>
                </div>
                <Progress value={Math.min(100, Math.abs(depthData.imbalance) * 2)} className="h-2" />

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Volatility Regime</span>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Normal</Badge>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Market Efficiency</span>
                  <span className="text-green-400 font-bold">94.2%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
