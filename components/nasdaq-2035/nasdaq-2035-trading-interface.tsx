"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Target, Zap, Shield, CheckCircle, Layers, AlertTriangle } from "lucide-react"

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

  // Real-time quote data with ultra-fast updates
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
    vwap: 17241.23,
    openInterest: 125000,
  })

  // Advanced order management
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      symbol: "DAX",
      side: "buy",
      quantity: 100,
      price: 17230.0,
      type: "limit",
      status: "working",
      filled: 0,
      remaining: 100,
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "ORD-002",
      symbol: "SAP",
      side: "sell",
      quantity: 500,
      price: 135.5,
      type: "limit",
      status: "filled",
      filled: 500,
      remaining: 0,
      timestamp: new Date(Date.now() - 600000),
    },
  ])

  // Real-time positions
  const [positions, setPositions] = useState([
    {
      symbol: "DAX",
      quantity: 100,
      avgPrice: 17189.0,
      currentPrice: 17234.56,
      unrealizedPnL: 4556,
      unrealizedPnLPercent: 2.65,
      dayPnL: 456.78,
    },
    {
      symbol: "SAP",
      quantity: 500,
      avgPrice: 128.5,
      currentPrice: 134.56,
      unrealizedPnL: 3030,
      unrealizedPnLPercent: 4.71,
      dayPnL: 892,
    },
  ])

  // Update quotes every 250ms for ultra-responsive trading
  useEffect(() => {
    const interval = setInterval(() => {
      setQuote((prev) => {
        const volatility = 0.0002
        const bidChange = (Math.random() - 0.5) * volatility * prev.bid
        const askChange = (Math.random() - 0.5) * volatility * prev.ask
        const lastChange = (Math.random() - 0.5) * volatility * prev.last

        const newBid = Math.max(0, prev.bid + bidChange)
        const newAsk = Math.max(newBid + 0.01, prev.ask + askChange)
        const newLast = Math.max(0, prev.last + lastChange)

        return {
          ...prev,
          bid: Number(newBid.toFixed(2)),
          ask: Number(newAsk.toFixed(2)),
          last: Number(newLast.toFixed(2)),
          bidSize: Math.max(100, prev.bidSize + Math.floor((Math.random() - 0.5) * 500)),
          askSize: Math.max(100, prev.askSize + Math.floor((Math.random() - 0.5) * 500)),
          volume: prev.volume + Math.floor(Math.random() * 1000),
          high: Math.max(prev.high, newLast),
          low: Math.min(prev.low, newLast),
          change: prev.change + lastChange,
          changePercent: ((prev.change + lastChange) / (newLast - (prev.change + lastChange))) * 100,
          vwap: prev.vwap + (Math.random() - 0.5) * 0.1,
        }
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  // Update positions in real-time
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((pos) => {
          const priceChange = (Math.random() - 0.5) * 0.002 * pos.currentPrice
          const newPrice = Math.max(0, pos.currentPrice + priceChange)
          const newUnrealizedPnL = (newPrice - pos.avgPrice) * pos.quantity
          const newUnrealizedPnLPercent = (newUnrealizedPnL / (pos.avgPrice * pos.quantity)) * 100

          return {
            ...pos,
            currentPrice: Number(newPrice.toFixed(2)),
            unrealizedPnL: Number(newUnrealizedPnL.toFixed(2)),
            unrealizedPnLPercent: Number(newUnrealizedPnLPercent.toFixed(2)),
            dayPnL: pos.dayPnL + priceChange * pos.quantity,
          }
        }),
      )
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

  const commission = Number.parseFloat(estimatedTotal) * 0.0005 + 9.95 // 0.05% + fixed fee

  // Risk calculations
  const portfolioValue = positions.reduce((sum, pos) => sum + pos.currentPrice * pos.quantity, 0)
  const totalPnL = positions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0)
  const totalDayPnL = positions.reduce((sum, pos) => sum + pos.dayPnL, 0)

  return (
    <div className="space-y-6">
      {/* Elite Quote Panel with Level I Data */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-400" />
              {symbol} - Elite Level I Quote
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-green-400">Live • 250ms</span>
              </div>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{spreadBps.toFixed(1)} bps</Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6 mb-6">
            {/* Bid */}
            <div className="text-center p-4 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
              <div className="text-sm text-red-300 mb-1">BID</div>
              <div className="text-3xl font-bold font-mono text-red-400">{quote.bid.toFixed(2)}</div>
              <div className="text-sm text-red-300">Size: {quote.bidSize.toLocaleString()}</div>
              <div className="text-xs text-red-200 mt-1">{Math.floor(Math.random() * 15 + 5)} orders</div>
            </div>

            {/* Last */}
            <div className="text-center p-4 bg-slate-800/30 border border-slate-700/30 rounded-lg backdrop-blur-sm">
              <div className="text-sm text-slate-300 mb-1">LAST</div>
              <div className="text-4xl font-bold font-mono text-white">{quote.last.toFixed(2)}</div>
              <div
                className={`text-sm flex items-center justify-center ${
                  quote.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {quote.change >= 0 ? (
                  <TrendingUp className="w-4 h-4 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 mr-1" />
                )}
                {quote.change >= 0 ? "+" : ""}
                {quote.change.toFixed(2)} ({quote.changePercent.toFixed(2)}%)
              </div>
            </div>

            {/* Ask */}
            <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg backdrop-blur-sm">
              <div className="text-sm text-green-300 mb-1">ASK</div>
              <div className="text-3xl font-bold font-mono text-green-400">{quote.ask.toFixed(2)}</div>
              <div className="text-sm text-green-300">Size: {quote.askSize.toLocaleString()}</div>
              <div className="text-xs text-green-200 mt-1">{Math.floor(Math.random() * 12 + 3)} orders</div>
            </div>
          </div>

          {/* Extended Market Stats */}
          <div className="grid grid-cols-6 gap-4 pt-6 border-t border-slate-700/30">
            <div className="text-center">
              <div className="text-sm text-slate-400">Spread</div>
              <div className="text-lg font-bold text-white">{spread.toFixed(2)}</div>
              <div className="text-xs text-slate-400">{spreadBps.toFixed(1)} bps</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Volume</div>
              <div className="text-lg font-bold text-white">{(quote.volume / 1000000).toFixed(1)}M</div>
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
            <div className="text-center">
              <div className="text-sm text-slate-400">VWAP</div>
              <div className="text-lg font-bold text-blue-400">{quote.vwap.toFixed(2)}</div>
            </div>
            <div className="text-center">
              <div className="text-sm text-slate-400">Open Int.</div>
              <div className="text-lg font-bold text-purple-400">{quote.openInterest.toLocaleString()}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        {/* Elite Order Entry */}
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
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
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
                    ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-lg"
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
                  <SelectItem value="iceberg">Iceberg Order</SelectItem>
                  <SelectItem value="twap">TWAP Order</SelectItem>
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
              <div className="flex gap-2">
                {[25, 50, 100, 500].map((qty) => (
                  <Button
                    key={qty}
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(qty.toString())}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
                  >
                    {qty}
                  </Button>
                ))}
              </div>
            </div>

            {/* Price (for limit orders) */}
            {(orderType === "limit" || orderType === "stop-limit" || orderType === "iceberg") && (
              <div className="space-y-2">
                <label className="text-sm text-slate-300">Limit Price</label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPrice(quote.bid.toString())}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
                  >
                    Bid
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPrice(quote.ask.toString())}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
                  >
                    Ask
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPrice(quote.last.toString())}
                    className="border-slate-700 text-slate-300 hover:bg-slate-800 text-xs"
                  >
                    Last
                  </Button>
                </div>
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
                  <SelectItem value="gtd">Good Till Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Order Summary */}
            <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Estimated Total</span>
                  <span className="text-xl font-bold text-white">€{estimatedTotal}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Commission</span>
                  <span className="text-slate-300">€{commission.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">Market Impact</span>
                  <span className="text-slate-300">~0.02%</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-slate-700/30 pt-2">
                  <span className="text-slate-400">Net Total</span>
                  <span className="text-white font-bold">
                    €{(Number.parseFloat(estimatedTotal) + commission).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Order */}
            <Button
              className={`w-full ${
                side === "buy"
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
              } shadow-lg`}
              disabled={!quantity}
            >
              <Target className="w-4 h-4 mr-2" />
              {side.toUpperCase()} {quantity} {symbol}
            </Button>
          </CardContent>
        </Card>

        {/* Positions & Orders */}
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
                {positions.map((position, index) => (
                  <div key={index} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold text-white">{position.symbol}</div>
                        <div className="text-sm text-slate-400">{position.quantity} shares</div>
                      </div>
                      <Badge
                        className={
                          position.unrealizedPnL >= 0
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }
                      >
                        {position.unrealizedPnL >= 0 ? "+" : ""}€{position.unrealizedPnL.toFixed(0)}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Avg Cost</div>
                        <div className="text-white font-mono">€{position.avgPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Market Value</div>
                        <div className="text-white font-mono">
                          €{(position.currentPrice * position.quantity).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400">Day P&L</div>
                        <div className={`font-mono ${position.dayPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {position.dayPnL >= 0 ? "+" : ""}€{position.dayPnL.toFixed(0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400">Return</div>
                        <div
                          className={`font-mono ${position.unrealizedPnLPercent >= 0 ? "text-green-400" : "text-red-400"}`}
                        >
                          {position.unrealizedPnLPercent >= 0 ? "+" : ""}
                          {position.unrealizedPnLPercent.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress value={Math.min(100, Math.abs(position.unrealizedPnLPercent) * 10)} className="h-1" />
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="orders" className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-bold text-white">
                          {order.side.toUpperCase()} {order.quantity} {order.symbol}
                        </div>
                        <div className="text-sm text-slate-400">
                          {order.type} @ €{order.price.toFixed(2)}
                        </div>
                      </div>
                      <Badge
                        className={
                          order.status === "filled"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : order.status === "working"
                              ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Filled</div>
                        <div className="text-white">
                          {order.filled}/{order.quantity}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400">Time</div>
                        <div className="text-white">{order.timestamp.toLocaleTimeString()}</div>
                      </div>
                    </div>
                    {order.status === "working" && (
                      <div className="mt-2">
                        <Progress value={(order.filled / order.quantity) * 100} className="h-1" />
                      </div>
                    )}
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="fills" className="space-y-3">
                <div className="text-center text-slate-400 py-8">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Recent fills will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Elite Risk Management */}
        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-orange-400" />
              Elite Risk Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Portfolio Value</div>
                <div className="text-lg font-bold text-white">€{(portfolioValue / 1000000).toFixed(2)}M</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Buying Power</div>
                <div className="text-lg font-bold text-green-400">€125,000</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Day P&L</div>
                <div className={`text-lg font-bold ${totalDayPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {totalDayPnL >= 0 ? "+" : ""}€{totalDayPnL.toFixed(0)}
                </div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Total P&L</div>
                <div className={`text-lg font-bold ${totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {totalPnL >= 0 ? "+" : ""}€{totalPnL.toFixed(0)}
                </div>
              </div>
            </div>

            {eliteMode && (
              <>
                <div className="border-t border-slate-700/30 pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Portfolio Beta</span>
                      <span className="text-white font-medium">1.23</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">VaR (95%)</span>
                      <span className="text-red-400 font-medium">-€12,500</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Sharpe Ratio</span>
                      <span className="text-green-400 font-medium">1.45</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Max Drawdown</span>
                      <span className="text-orange-400 font-medium">-8.7%</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2" />
                    <span className="text-yellow-400 text-sm">Risk Alert: High correlation detected</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
