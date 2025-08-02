"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Globe,
  Search,
  Bell,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  Cpu,
  Shield,
  Sparkles,
  Target,
  Layers,
  Network,
} from "lucide-react"
import { useNasdaq2035MarketData } from "@/hooks/use-nasdaq-2035-market-data"
import { Nasdaq2035TradingInterface } from "@/components/nasdaq-2035/nasdaq-2035-trading-interface"
import { Nasdaq2035MarketDepth } from "@/components/nasdaq-2035/nasdaq-2035-market-depth"
import { Nasdaq2035ChartingPlatform } from "@/components/nasdaq-2035/nasdaq-2035-charting-platform"
import { Nasdaq2035PortfolioManager } from "@/components/nasdaq-2035/nasdaq-2035-portfolio-manager"
import { Nasdaq2035NewsFeed } from "@/components/nasdaq-2035/nasdaq-2035-news-feed"
import { Nasdaq2035Watchlist } from "@/components/nasdaq-2035/nasdaq-2035-watchlist"

export default function DAX2035Marketplace() {
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedSymbol, setSelectedSymbol] = useState("DAX")
  const [searchQuery, setSearchQuery] = useState("")
  const [isEliteMode, setIsEliteMode] = useState(true)

  const { data: marketData, loading, error, lastUpdated, connectionStatus, latency } = useNasdaq2035MarketData()

  // Market status with real-time updates
  const [marketStatus, setMarketStatus] = useState({
    status: "OPEN",
    nextClose: "16:30 CET",
    session: "Regular Trading",
    volume: "€2.4B",
    timestamp: new Date(),
  })

  // Elite market indices with real-time updates every 500ms
  const [eliteIndices, setEliteIndices] = useState([
    { symbol: "DAX", name: "DAX 40", price: 17234.56, change: 2.34, changePercent: 0.14, volume: 2450000 },
    { symbol: "MDAX", name: "MDAX", price: 26789.12, change: -45.67, changePercent: -0.17, volume: 1200000 },
    { symbol: "SDAX", name: "SDAX", price: 13456.78, change: 123.45, changePercent: 0.93, volume: 800000 },
    { symbol: "TECDAX", name: "TecDAX", price: 3234.56, change: 67.89, changePercent: 2.14, volume: 950000 },
  ])

  // Real-time market statistics
  const [marketStats, setMarketStats] = useState({
    totalMarketCap: 1.84,
    totalVolume: 2.4,
    volatility: 12.4,
    peRatio: 14.2,
    advancers: 28,
    decliners: 12,
    unchanged: 0,
  })

  // Real-time updates every 500ms for ultra-responsive feel
  useEffect(() => {
    const interval = setInterval(() => {
      setEliteIndices((prev) =>
        prev.map((index) => {
          const volatility = index.symbol === "DAX" ? 0.0005 : 0.001
          const priceChange = (Math.random() - 0.5) * 2 * volatility * index.price
          const newPrice = Math.max(0, index.price + priceChange)
          const newChange = index.change + priceChange
          const newChangePercent = (newChange / (newPrice - newChange)) * 100
          const volumeChange = Math.floor((Math.random() - 0.5) * 50000)

          return {
            ...index,
            price: Number(newPrice.toFixed(2)),
            change: Number(newChange.toFixed(2)),
            changePercent: Number(newChangePercent.toFixed(2)),
            volume: Math.max(0, index.volume + volumeChange),
          }
        }),
      )

      // Update market stats
      setMarketStats((prev) => ({
        ...prev,
        totalVolume: prev.totalVolume + (Math.random() - 0.5) * 0.1,
        volatility: Math.max(8, Math.min(20, prev.volatility + (Math.random() - 0.5) * 0.2)),
        peRatio: Math.max(10, Math.min(25, prev.peRatio + (Math.random() - 0.5) * 0.1)),
      }))

      // Update market status
      setMarketStatus((prev) => ({
        ...prev,
        volume: `€${(prev.totalVolume || 2.4).toFixed(1)}B`,
        timestamp: new Date(),
      }))
    }, 500) // Ultra-fast 500ms updates

    return () => clearInterval(interval)
  }, [])

  // Generate top movers with real-time updates
  const [topMovers, setTopMovers] = useState([
    { symbol: "SAP", name: "SAP SE", price: 134.56, change: 8.92, changePercent: 7.1, volume: 2500000 },
    { symbol: "ASML", name: "ASML Holding", price: 678.9, change: -23.45, changePercent: -3.3, volume: 1800000 },
    { symbol: "SIE", name: "Siemens AG", price: 156.78, change: 12.34, changePercent: 8.5, volume: 3200000 },
    { symbol: "DTE", name: "Deutsche Telekom", price: 23.45, change: -1.23, changePercent: -5.0, volume: 4100000 },
    { symbol: "ALV", name: "Allianz SE", price: 245.67, change: 15.89, changePercent: 6.9, volume: 1900000 },
  ])

  // Update top movers every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTopMovers((prev) =>
        prev.map((stock) => {
          const volatility = 0.002
          const priceChange = (Math.random() - 0.5) * 2 * volatility * stock.price
          const newPrice = Math.max(0.01, stock.price + priceChange)
          const newChange = stock.change + priceChange
          const newChangePercent = (newChange / (newPrice - newChange)) * 100
          const volumeChange = Math.floor((Math.random() - 0.5) * 100000)

          return {
            ...stock,
            price: Number(newPrice.toFixed(2)),
            change: Number(newChange.toFixed(2)),
            changePercent: Number(newChangePercent.toFixed(2)),
            volume: Math.max(0, stock.volume + volumeChange),
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const sectorPerformance = [
    { sector: "Technology", weight: 28.5, change: 2.34, color: "from-blue-500 to-cyan-500" },
    { sector: "Healthcare", weight: 15.2, change: 1.67, color: "from-green-500 to-emerald-500" },
    { sector: "Financials", weight: 12.8, change: -0.89, color: "from-purple-500 to-indigo-500" },
    { sector: "Industrials", weight: 11.4, change: 0.45, color: "from-orange-500 to-red-500" },
    { sector: "Consumer", weight: 9.7, change: 1.23, color: "from-pink-500 to-rose-500" },
    { sector: "Energy", weight: 8.9, change: -2.1, color: "from-yellow-500 to-amber-500" },
  ]

  // Connection status indicator
  const getConnectionStatus = () => {
    switch (connectionStatus) {
      case "connected":
        return { color: "text-green-400", bg: "bg-green-400", text: "LIVE" }
      case "connecting":
        return { color: "text-yellow-400", bg: "bg-yellow-400", text: "CONNECTING" }
      default:
        return { color: "text-red-400", bg: "bg-red-400", text: "DISCONNECTED" }
    }
  }

  const status = getConnectionStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Elite Header */}
      <div className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    DAX 2035
                  </h1>
                  <p className="text-xs text-slate-400">Elite Trading Platform</p>
                </div>
              </div>

              {/* Real-time Market Status */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 ${status.bg} rounded-full animate-pulse`} />
                  <span className={`text-sm font-medium ${status.color}`}>{status.text}</span>
                </div>
                <div className="text-sm text-slate-400">
                  {marketStatus.session} • Close: {marketStatus.nextClose}
                </div>
                <div className="text-sm text-slate-400">Volume: {marketStatus.volume}</div>
                <div className="text-sm text-slate-400">
                  Latency: <span className="text-green-400">{latency}ms</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Elite Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search symbols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64 bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/25"
                />
              </div>

              {/* Elite Mode Toggle */}
              <Button
                variant={isEliteMode ? "default" : "outline"}
                size="sm"
                onClick={() => setIsEliteMode(!isEliteMode)}
                className={
                  isEliteMode
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/25"
                    : "border-slate-700 text-slate-300 hover:bg-slate-800"
                }
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Elite Mode
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <Bell className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Elite Market Indices Ticker */}
        <div className="mb-6">
          <div className="grid grid-cols-4 gap-4">
            {eliteIndices.map((index) => (
              <Card
                key={index.symbol}
                className={`bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl hover:border-blue-500/30 transition-all cursor-pointer transform hover:scale-[1.02] ${
                  selectedSymbol === index.symbol ? "border-blue-500/50 shadow-lg shadow-blue-500/10" : ""
                }`}
                onClick={() => setSelectedSymbol(index.symbol)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <span className="font-bold text-white">{index.symbol}</span>
                    </div>
                    <Badge
                      variant={index.changePercent >= 0 ? "default" : "destructive"}
                      className={
                        index.changePercent >= 0
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }
                    >
                      {index.changePercent >= 0 ? "+" : ""}
                      {index.changePercent.toFixed(2)}%
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-white font-mono">
                      {index.price.toLocaleString("de-DE", { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-sm flex items-center ${index.change >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {index.change >= 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {index.change >= 0 ? "+" : ""}
                      {index.change.toFixed(2)}
                    </div>
                    <div className="text-xs text-slate-400">Vol: {(index.volume / 1000000).toFixed(1)}M</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Trading Area */}
          <div className="col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-6 bg-slate-800/30 backdrop-blur-xl border border-slate-700/30">
                <TabsTrigger
                  value="overview"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Overview
                </TabsTrigger>
                <TabsTrigger
                  value="trading"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Trading
                </TabsTrigger>
                <TabsTrigger
                  value="charts"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <LineChart className="w-4 h-4 mr-2" />
                  Charts
                </TabsTrigger>
                <TabsTrigger
                  value="depth"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Depth
                </TabsTrigger>
                <TabsTrigger
                  value="portfolio"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <PieChart className="w-4 h-4 mr-2" />
                  Portfolio
                </TabsTrigger>
                <TabsTrigger
                  value="news"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  <Network className="w-4 h-4 mr-2" />
                  News
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {/* Market Overview Chart */}
                  <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                        {selectedSymbol} Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Nasdaq2035ChartingPlatform
                        symbol={selectedSymbol}
                        data={marketData?.chartData}
                        compact={true}
                        eliteMode={isEliteMode}
                      />
                    </CardContent>
                  </Card>

                  {/* Sector Performance */}
                  <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                        Sector Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {sectorPerformance.map((sector, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${sector.color}`} />
                            <span className="text-white font-medium">{sector.sector}</span>
                            <span className="text-slate-400 text-sm">{sector.weight}%</span>
                          </div>
                          <Badge
                            variant={sector.change >= 0 ? "default" : "destructive"}
                            className={
                              sector.change >= 0
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-red-500/20 text-red-400 border-red-500/30"
                            }
                          >
                            {sector.change >= 0 ? "+" : ""}
                            {sector.change.toFixed(2)}%
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Elite Analytics Dashboard */}
                <div className="grid grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-blue-200">Market Cap</p>
                          <p className="text-2xl font-bold text-white">€{marketStats.totalMarketCap.toFixed(2)}T</p>
                          <p className="text-sm text-green-400 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +2.4%
                          </p>
                        </div>
                        <Cpu className="w-8 h-8 text-blue-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-200">Volume</p>
                          <p className="text-2xl font-bold text-white">€{marketStats.totalVolume.toFixed(1)}B</p>
                          <p className="text-sm text-green-400 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +15.7%
                          </p>
                        </div>
                        <Activity className="w-8 h-8 text-green-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 backdrop-blur-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-purple-200">Volatility</p>
                          <p className="text-2xl font-bold text-white">{marketStats.volatility.toFixed(1)}%</p>
                          <p className="text-sm text-red-400 flex items-center">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            -0.8%
                          </p>
                        </div>
                        <Shield className="w-8 h-8 text-purple-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-xl">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-orange-200">P/E Ratio</p>
                          <p className="text-2xl font-bold text-white">{marketStats.peRatio.toFixed(1)}</p>
                          <p className="text-sm text-green-400 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +0.3
                          </p>
                        </div>
                        <Sparkles className="w-8 h-8 text-orange-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="trading">
                <Nasdaq2035TradingInterface symbol={selectedSymbol} marketData={marketData} eliteMode={isEliteMode} />
              </TabsContent>

              <TabsContent value="charts">
                <Nasdaq2035ChartingPlatform
                  symbol={selectedSymbol}
                  data={marketData?.chartData}
                  eliteMode={isEliteMode}
                />
              </TabsContent>

              <TabsContent value="depth">
                <Nasdaq2035MarketDepth symbol={selectedSymbol} data={marketData?.orderBook} eliteMode={isEliteMode} />
              </TabsContent>

              <TabsContent value="portfolio">
                <Nasdaq2035PortfolioManager eliteMode={isEliteMode} />
              </TabsContent>

              <TabsContent value="news">
                <Nasdaq2035NewsFeed eliteMode={isEliteMode} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Elite Sidebar */}
          <div className="col-span-3 space-y-6">
            {/* Top Movers */}
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                    Top Movers
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topMovers.map((stock, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30 hover:bg-slate-700/30 transition-colors cursor-pointer transform hover:scale-[1.02]"
                    onClick={() => setSelectedSymbol(stock.symbol)}
                  >
                    <div>
                      <div className="font-bold text-white">{stock.symbol}</div>
                      <div className="text-sm text-slate-400">{stock.name}</div>
                      <div className="text-xs text-slate-500">Vol: {(stock.volume / 1000000).toFixed(1)}M</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-white">€{stock.price.toFixed(2)}</div>
                      <div
                        className={`text-sm flex items-center justify-end ${
                          stock.changePercent >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stock.changePercent >= 0 ? (
                          <TrendingUp className="w-3 h-3 mr-1" />
                        ) : (
                          <TrendingDown className="w-3 h-3 mr-1" />
                        )}
                        {stock.changePercent >= 0 ? "+" : ""}
                        {stock.changePercent.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Elite Watchlist */}
            <Nasdaq2035Watchlist
              selectedSymbol={selectedSymbol}
              onSymbolSelect={setSelectedSymbol}
              eliteMode={isEliteMode}
            />

            {/* Market Status */}
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-blue-400" />
                  Market Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Frankfurt Exchange</span>
                  <Badge
                    className={`${status.color.replace("text-", "bg-").replace("400", "500/20")} ${status.color} border-${status.color.replace("text-", "").replace("400", "500/30")}`}
                  >
                    {marketStatus.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Trading Session</span>
                  <span className="text-white">{marketStatus.session}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Next Close</span>
                  <span className="text-white">{marketStatus.nextClose}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Last Update</span>
                  <span className="text-blue-400 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse mr-2" />
                    {marketStatus.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Connection</span>
                  <span className={`${status.color} flex items-center`}>
                    <div className={`w-2 h-2 ${status.bg} rounded-full animate-pulse mr-2`} />
                    {latency}ms
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Elite Market Breadth */}
            {isEliteMode && (
              <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                    Market Breadth
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Advancers</span>
                    <span className="text-green-400 font-bold">{marketStats.advancers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Decliners</span>
                    <span className="text-red-400 font-bold">{marketStats.decliners}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Unchanged</span>
                    <span className="text-slate-400 font-bold">{marketStats.unchanged}</span>
                  </div>
                  <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-slate-400">A/D Ratio</div>
                      <div className="text-xl font-bold text-green-400">
                        {(marketStats.advancers / Math.max(1, marketStats.decliners)).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Elite Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50 px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 ${status.bg} rounded-full animate-pulse`} />
              <span className={status.color}>{status.text}</span>
            </div>
            <span className="text-slate-400">Last Update: {lastUpdated?.toLocaleTimeString() || "Connecting..."}</span>
            <span className="text-slate-400">
              Latency: <span className="text-green-400">{latency}ms</span>
            </span>
            <span className="text-slate-400">
              Updates: <span className="text-blue-400">500ms</span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-slate-400">DAX 2035 Elite Platform v3.0</span>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400">Elite Mode Active</span>
            </div>
            <span className="text-slate-400">
              {eliteIndices.reduce((sum, idx) => sum + idx.volume, 0).toLocaleString()} shares traded
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
