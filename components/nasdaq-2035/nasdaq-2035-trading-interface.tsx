"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Target, Zap, Shield, Clock, CheckCircle, Layers } from "lucide-react"

interface TradingInterfaceProps {
  symbol: string
  marketData: any
  eliteMode: boolean
}

export function Nasdaq2035TradingInterface({ symbol, marketData, eliteMode }: TradingInterfaceProps) {
  const [orderType, setOrderType] = useState("market")
  const [side, setSide] = useState("buy")
  const [quantity, setQuantity] = useState("")
  const [price, setPrice] = useState("")
  const [stopPrice, setStopPrice] = useState("")
  const [timeInForce, setTimeInForce] = useState("day")

  // Real-time quote data
  const [quote, setQuote] = useState({
    bid: 17234.45,
    ask: 17234.67,
    bidSize: 2500,
    askSize: 1800,
    last: 17234.56,
    change: 45.67,
    changePercent: 0.27,
    volume: 2450000,
    high: 17289.34,
    low: 17198.23,
  })

  // Update quotes in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote((prev) => ({
        ...prev,
        bid: prev.bid + (Math.random() - 0.5) * 0.5,
        ask: prev.ask + (Math.random() - 0.5) * 0.5,
        last: prev.last + (Math.random() - 0.5) * 0.5,
        bidSize: Math.floor(Math.random() * 5000 + 1000),
        askSize: Math.floor(Math.random() * 5000 + 1000),
        volume: prev.volume + Math.floor(Math.random() * 1000),
      }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const spread = quote.ask - quote.bid
  const spreadBps = (spread / quote.last) * 10000

  const estimatedTotal =
    quantity && price
      ? (Number.parseFloat(quantity) * Number.parseFloat(price)).toFixed(2)
      : quantity && orderType === "market"
        ? (Number.parseFloat(quantity) * (side === "buy" ? quote.ask : quote.bid)).toFixed(2)
        : "0.00"

  return (
    <div className="space-y-6">
      {/* Elite Quote Panel */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-400" />
              {symbol} - Level I Quote
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">Live</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            {/* Bid */}
            <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="text-sm text-red-300 mb-1">BID</div>
              <div className="text-2xl font-bold font-mono text-red-400">{quote.bid.toFixed(2)}</div>
              <div className="text-sm text-red-300">Size: {quote.bidSize.toLocaleString()}</div>
            </div>

            {/* Last */}
            <div className="text-center p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg">
              <div className="text-sm text-slate-300 mb-1">LAST</div>
              <div className="text-3xl font-bold font-mono text-white">{quote.last.toFixed(2)}</div>
              <div
                className={`text-sm flex items-center justify-center ${
                  quote.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {quote.change >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {quote.change >= 0 ? "+" : ""}
                {quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
              </div>
            </div>

            {/* Ask */}
            <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="text-sm text-green-300 mb-1">ASK</div>
              <div className="text-2xl font-bold font-mono text-green-400">{quote.ask.toFixed(2)}</div>
              <div className="text-sm text-green-300">Size: {quote.askSize.toLocaleString()}</div>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-700/30">
            <div className="text-center">
              <div className="text-sm text-slate-400">Spread</div>
              <div className="text-lg font-bold text-white">{spread.toFixed(2)}</div>
              <div className="text-xs text-slate-400">{spreadBps.toFixed(1)} bps</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Volume</div>
              <div className="text-lg font-bold text-white">{quote.volume.toLocaleString()}</div>
              <div className="text-xs text-slate-400">shares</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">High</div>
              <div className="text-lg font-bold text-green-400">{quote.high.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Low</div>
              <div className="text-lg font-bold text-red-400">{quote.low.toFixed(2)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        {/* Order Entry */}
        <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-yellow-400" />
              Elite Order Entry
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Order Side */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={side === "buy" ? "default" : "outline"}
                onClick={() => setSide("buy")}
                className={
                  side === "buy"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    : "border-slate-700 text-slate-300 hover:bg-slate-800"
                }
              >
                BUY
              </Button>
              <Button
                variant={side === "sell" ? "default" : "outline"}
                onClick={() => setSide("sell")}
                className={
                  side === "sell"
                    ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                    : "border-slate-700 text-slate-300 hover:bg-slate-800"
                }
              >
                SELL
              </Button>
            </div>

            {/* Order Type */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Order Type</label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="market">Market Order</SelectItem>
                  <SelectItem value="limit">Limit Order</SelectItem>
                  <SelectItem value="stop">Stop Order</SelectItem>
                  <SelectItem value="stop-limit">Stop-Limit Order</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Quantity</label>
              <Input
                type="number"
                placeholder="0"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400"
              />
            </div>

            {/* Price (for limit orders) */}
            {(orderType === "limit" || orderType === "stop-limit") && (
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Limit Price</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400"
                />
              </div>
            )}

            {/* Stop Price (for stop orders) */}
            {(orderType === "stop" || orderType === "stop-limit") && (
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Stop Price</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={stopPrice}
                  onChange={(e) => setStopPrice(e.target.value)}
                  className="bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400"
                />
              </div>
            )}

            {/* Time in Force */}
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Time in Force</label>
              <Select value={timeInForce} onValueChange={setTimeInForce}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="gtc">Good Till Canceled</SelectItem>
                  <SelectItem value="ioc">Immediate or Cancel</SelectItem>
                  <SelectItem value="fok">Fill or Kill</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Order Summary */}
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Estimated Total</span>
                <span className="text-xl font-bold text-white">€{estimatedTotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Commission</span>
                <span className="text-slate-300">€9.95</span>
              </div>
            </div>

            {/* Submit Order */}
            <Button
              className={`w-full ${
                side === "buy"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
              }`}
              disabled={!quantity}
            >
              <Target className="w-4 h-4 mr-2" />
              {side.toUpperCase()} {quantity} {symbol}
            </Button>
          </CardContent>
        </Card>

        {/* Order Status & Positions */}
        <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Layers className="w-5 h-5 mr-2 text-purple-400" />
              Positions & Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="positions" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800/30">
                <TabsTrigger value="positions">Positions</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="fills">Fills</TabsTrigger>
              </TabsList>

              <TabsContent value="positions" className="space-y-3">
                {/* Sample Position */}
                <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-bold text-white">DAX</div>
                      <div className="text-sm text-slate-400">100 shares</div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">+€456.78</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-400">Avg Cost</div>
                      <div className="text-white">€17,189.00</div>
                    </div>
                    <div>
                      <div className="text-slate-400">Market Value</div>
                      <div className="text-white">€17,234.56</div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="space-y-3">
                <div className="text-center text-slate-400 py-8">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No active orders
                </div>
              </TabsContent>

              <TabsContent value="fills" className="space-y-3">
                <div className="text-center text-slate-400 py-8">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No recent fills
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Risk Management Panel */}
      {eliteMode && (
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-orange-400" />
              Elite Risk Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Buying Power</div>
                <div className="text-lg font-bold text-green-400">€125,000</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Day P&L</div>
                <div className="text-lg font-bold text-green-400">+€2,456</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Portfolio Beta</div>
                <div className="text-lg font-bold text-white">1.23</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Risk Score</div>
                <div className="text-lg font-bold text-orange-400">Medium</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
