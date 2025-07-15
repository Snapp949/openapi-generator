"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { HolographicHeader } from "@/components/ui/holographic-header"
import { useEcosystem } from "@/contexts/ecosystem-context"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
}

interface PortfolioItem {
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  totalValue: number
  pnl: number
  pnlPercent: number
}

export default function SnapDaxPage() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [portfolioValue, setPortfolioValue] = useState(124567.89)
  const [dayChange, setDayChange] = useState(2345.67)
  const [dayChangePercent, setDayChangePercent] = useState(1.92)

  const { trackPageView } = useEcosystem()

  useEffect(() => {
    trackPageView("/snap-dax")

    // Initialize market data
    setMarketData([
      {
        symbol: "BTC",
        name: "Bitcoin",
        price: 43250.0,
        change: 1250.5,
        changePercent: 2.98,
        volume: 28500000000,
        marketCap: 847000000000,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        price: 2650.75,
        change: -45.25,
        changePercent: -1.68,
        volume: 15200000000,
        marketCap: 318000000000,
      },
      {
        symbol: "ADA",
        name: "Cardano",
        price: 0.485,
        change: 0.023,
        changePercent: 4.98,
        volume: 890000000,
        marketCap: 17200000000,
      },
      {
        symbol: "SOL",
        name: "Solana",
        price: 98.45,
        change: 5.67,
        changePercent: 6.11,
        volume: 2100000000,
        marketCap: 42800000000,
      },
      {
        symbol: "DOT",
        name: "Polkadot",
        price: 7.23,
        change: -0.34,
        changePercent: -4.49,
        volume: 456000000,
        marketCap: 9100000000,
      },
    ])

    // Initialize portfolio
    setPortfolio([
      {
        symbol: "BTC",
        name: "Bitcoin",
        quantity: 1.5,
        avgPrice: 41000.0,
        currentPrice: 43250.0,
        totalValue: 64875.0,
        pnl: 3375.0,
        pnlPercent: 5.49,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        quantity: 15.0,
        avgPrice: 2800.0,
        currentPrice: 2650.75,
        totalValue: 39761.25,
        pnl: -2238.75,
        pnlPercent: -5.33,
      },
      {
        symbol: "ADA",
        name: "Cardano",
        quantity: 25000,
        avgPrice: 0.45,
        currentPrice: 0.485,
        totalValue: 12125.0,
        pnl: 875.0,
        pnlPercent: 7.78,
      },
    ])
  }, [trackPageView])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <HolographicHeader
          title="SNAP-DAX Exchange"
          subtitle="Advanced digital asset trading platform"
          gradient="from-green-400 to-blue-400"
        />

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-black/20 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(portfolioValue)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {dayChange >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-400 mr-1" />
                )}
                <span className={dayChange >= 0 ? "text-green-400" : "text-red-400"}>
                  {formatCurrency(Math.abs(dayChange))} ({Math.abs(dayChangePercent).toFixed(2)}%)
                </span>
                <span className="ml-1">today</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Positions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolio.length}</div>
              <p className="text-xs text-muted-foreground">Across {portfolio.length} different assets</p>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">24h Volume</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2.4M</div>
              <p className="text-xs text-muted-foreground">+12.5% from yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Trading Interface */}
        <Tabs defaultValue="markets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger value="markets">Markets</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="markets" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Market Overview</CardTitle>
                    <CardDescription>Real-time cryptocurrency prices and data</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="bg-white/10 border-white/20">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.map((asset) => (
                    <div
                      key={asset.symbol}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{asset.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{asset.name}</div>
                          <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(asset.price)}</div>
                        <div
                          className={`text-sm flex items-center ${
                            asset.change >= 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {asset.change >= 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          {asset.changePercent.toFixed(2)}%
                        </div>
                      </div>

                      <div className="text-right text-sm text-muted-foreground">
                        <div>Vol: {formatNumber(asset.volume / 1000000)}M</div>
                        <div>MCap: {formatNumber(asset.marketCap / 1000000000)}B</div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-green-500/20 border-green-500/30 text-green-400"
                        >
                          Buy
                        </Button>
                        <Button size="sm" variant="outline" className="bg-red-500/20 border-red-500/30 text-red-400">
                          Sell
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Your Portfolio</CardTitle>
                <CardDescription>Current holdings and performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolio.map((position) => (
                    <div key={position.symbol} className="flex items-center justify-between p-4 rounded-lg bg-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{position.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{position.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {position.quantity} {position.symbol}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(position.totalValue)}</div>
                        <div className="text-sm text-muted-foreground">@ {formatCurrency(position.currentPrice)}</div>
                      </div>

                      <div className="text-right">
                        <div className={`font-semibold ${position.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {position.pnl >= 0 ? "+" : ""}
                          {formatCurrency(position.pnl)}
                        </div>
                        <div className={`text-sm ${position.pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {position.pnlPercent >= 0 ? "+" : ""}
                          {position.pnlPercent.toFixed(2)}%
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-white/10 border-white/20">
                          <Eye className="h-4 w-4 mr-1" />
                          Details
                        </Button>
                        <Button size="sm" variant="outline" className="bg-red-500/20 border-red-500/30 text-red-400">
                          Sell
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-green-400">Buy Order</CardTitle>
                  <CardDescription>Place a buy order</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Asset</label>
                    <select className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded-md">
                      <option>Bitcoin (BTC)</option>
                      <option>Ethereum (ETH)</option>
                      <option>Cardano (ADA)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <input
                      type="number"
                      placeholder="Market Price"
                      className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded-md"
                    />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Place Buy Order</Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-red-400">Sell Order</CardTitle>
                  <CardDescription>Place a sell order</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Asset</label>
                    <select className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded-md">
                      <option>Bitcoin (BTC)</option>
                      <option>Ethereum (ETH)</option>
                      <option>Cardano (ADA)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Price</label>
                    <input
                      type="number"
                      placeholder="Market Price"
                      className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded-md"
                    />
                  </div>
                  <Button className="w-full bg-red-600 hover:bg-red-700">Place Sell Order</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Trading Analytics</CardTitle>
                <CardDescription>Performance metrics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-green-400">+15.2%</div>
                    <div className="text-sm text-muted-foreground">Total Return</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-blue-400">47</div>
                    <div className="text-sm text-muted-foreground">Total Trades</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-white/5">
                    <div className="text-2xl font-bold text-purple-400">68%</div>
                    <div className="text-sm text-muted-foreground">Win Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/dashboard/snap-dax">
            <Card className="bg-black/20 border-white/10 hover:border-purple-500/30 transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-3 text-green-400" />
                <h3 className="font-semibold mb-2">Advanced Trading</h3>
                <p className="text-sm text-muted-foreground">Access professional trading tools</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/portfolio">
            <Card className="bg-black/20 border-white/10 hover:border-purple-500/30 transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-3 text-blue-400" />
                <h3 className="font-semibold mb-2">Portfolio Analysis</h3>
                <p className="text-sm text-muted-foreground">Detailed portfolio insights</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/snap-dax/digital-asset-exchange">
            <Card className="bg-black/20 border-white/10 hover:border-purple-500/30 transition-all cursor-pointer">
              <CardContent className="p-6 text-center">
                <Zap className="h-8 w-8 mx-auto mb-3 text-purple-400" />
                <h3 className="font-semibold mb-2">Digital Assets</h3>
                <p className="text-sm text-muted-foreground">Explore digital asset exchange</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
