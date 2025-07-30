"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Globe,
  Zap,
  Coins,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Bell,
  Wallet,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Settings,
  Lightbulb,
  Network,
  Bot,
  AlertCircle,
  DollarSign,
  BarChart3,
} from "lucide-react"
import { HolographicHeader } from "@/components/snap-dax/holographic-header"
import { useDaxMarketData } from "@/hooks/use-dax-market-data"
import { MarketChart } from "@/components/snap-dax/market-chart"
import { OrderBook } from "@/components/snap-dax/order-book"
import { TradeHistory } from "@/components/snap-dax/trade-history"
import { AiTradingBots } from "@/components/snap-dax/ai-trading-bots"

const mockPortfolioData = [
  {
    asset: "Bitcoin",
    symbol: "BTC",
    quantity: 0.5,
    avgPrice: 65000,
    currentPrice: 68123.45,
    value: 34061.73,
    pnl: 1561.73,
    pnlPercent: 4.8,
  },
  {
    asset: "Ethereum",
    symbol: "ETH",
    quantity: 8.0,
    avgPrice: 4000,
    currentPrice: 3921.78,
    value: 31374.24,
    pnl: -625.76,
    pnlPercent: -1.9,
  },
  {
    asset: "Solana",
    symbol: "SOL",
    quantity: 25.0,
    avgPrice: 190,
    currentPrice: 205.67,
    value: 5141.75,
    pnl: 391.75,
    pnlPercent: 8.2,
  },
  {
    asset: "Cardano",
    symbol: "ADA",
    quantity: 1000.0,
    avgPrice: 0.45,
    currentPrice: 0.4678,
    value: 467.8,
    pnl: 17.8,
    pnlPercent: 3.96,
  },
]

const mockNews = [
  {
    title: "Fed Signals Rate Cuts, Boosting Crypto Sentiment",
    source: "Bloomberg",
    time: "1 hour ago",
    impact: "Bullish",
  },
  {
    title: "Major DeFi Protocol Announces Cross-Chain Integration",
    source: "CoinDesk",
    time: "3 hours ago",
    impact: "Positive",
  },
  {
    title: "New Regulations Proposed for Stablecoins",
    source: "Reuters",
    time: "5 hours ago",
    impact: "Neutral",
  },
  {
    title: "AI-Powered Trading Bots Show Record Performance",
    source: "TechCrunch",
    time: "8 hours ago",
    impact: "Bullish",
  },
  {
    title: "Institutional Adoption Reaches New Highs",
    source: "Financial Times",
    time: "12 hours ago",
    impact: "Positive",
  },
]

export function DaxDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { data, loading, error, refetch, lastUpdated } = useDaxMarketData()

  const totalPortfolioValue = mockPortfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalDailyPnL = mockPortfolioData.reduce((sum, item) => sum + item.pnl, 0)
  const totalDailyPnLPercent = (totalDailyPnL / (totalPortfolioValue - totalDailyPnL)) * 100

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  const formatPercentage = (value: number) => `${value.toFixed(2)}%`

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
        <div className="text-center space-y-4">
          <RefreshCw className="w-12 h-12 animate-spin text-blue-400 mx-auto" />
          <h2 className="text-2xl font-bold">Loading DAX Dashboard...</h2>
          <p className="text-slate-400">Fetching real-time market data</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white">
        <div className="text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h2 className="text-2xl font-bold text-red-400">Error Loading Data</h2>
          <p className="text-slate-400">{error}</p>
          <Button onClick={refetch} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-white p-6 font-mono">
      <div className="container mx-auto space-y-8">
        <HolographicHeader
          title="DAX: Digital Asset Exchange"
          subtitle="Traditional Market Precision Meets DeFi Future"
          gradient="from-blue-400 via-purple-400 to-pink-400"
        />

        {/* Top Level Metrics - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-blue-300 text-sm font-medium flex items-center">
                <BarChart3 className="w-4 h-4 mr-2" />
                Total Market Cap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">{data?.marketStats?.totalMarketCap || "$2.54T"}</div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +1.8% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 border-emerald-500/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-emerald-300 text-sm font-medium flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                24h Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">{data?.marketStats?.totalVolume24h || "$128.7B"}</div>
              <div className="flex items-center text-red-400 text-sm">
                <TrendingDown className="w-4 h-4 mr-1" />
                -0.5% (24h)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-purple-300 text-sm font-medium flex items-center">
                <Network className="w-4 h-4 mr-2" />
                DeFi TVL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">{data?.marketStats?.defiTvl || "$98.2B"}</div>
              <div className="flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +3.2% (7d)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/20 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-orange-300 text-sm font-medium flex items-center">
                <Lightbulb className="w-4 h-4 mr-2" />
                Fear & Greed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-1">{data?.marketStats?.fearGreedIndex || 67}</div>
              <div className="text-orange-400 text-sm">Greed</div>
            </CardContent>
          </Card>
        </div>

        {/* Last Updated Indicator */}
        {lastUpdated && (
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        )}

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              <Globe className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="markets" className="data-[state=active]:bg-purple-600">
              <Coins className="w-4 h-4 mr-2" />
              Markets
            </TabsTrigger>
            <TabsTrigger value="trading" className="data-[state=active]:bg-emerald-600">
              <Zap className="w-4 h-4 mr-2" />
              Trading
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-orange-600">
              <Wallet className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="ai-bots" className="data-[state=active]:bg-cyan-600">
              <Bot className="w-4 h-4 mr-2" />
              AI Bots
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {data?.historicalData && (
                  <MarketChart
                    data={data.historicalData}
                    title="Market Indices & Charts"
                    description="Real-time performance of key digital assets."
                  />
                )}
              </div>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-orange-400" />
                    Latest News & AI Insights
                  </CardTitle>
                  <CardDescription>Curated news and AI-driven market analysis.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 max-h-96 overflow-y-auto">
                  {mockNews.map((item, index) => (
                    <div key={index} className="p-3 bg-slate-900/70 rounded-lg hover:bg-slate-900/90 transition-colors">
                      <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
                      <p className="text-slate-400 text-xs mb-2">
                        {item.source} • {item.time}
                      </p>
                      <Badge
                        className={`${
                          item.impact === "Bullish"
                            ? "bg-green-600/20 text-green-400 border-green-600/30"
                            : item.impact === "Positive"
                              ? "bg-blue-600/20 text-blue-400 border-blue-600/30"
                              : item.impact === "Neutral"
                                ? "bg-gray-600/20 text-gray-400 border-gray-600/30"
                                : "bg-red-600/20 text-red-400 border-red-600/30"
                        } text-xs`}
                      >
                        {item.impact}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Markets Tab Content */}
          <TabsContent value="markets" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Top Digital Assets</CardTitle>
                    <CardDescription>Real-time prices, volume, and market capitalization.</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-700/50"
                    onClick={refetch}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh Data
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data?.currentMarketData.map((crypto) => (
                    <div
                      key={crypto.symbol}
                      className="flex flex-col p-4 bg-slate-900/70 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                            <Coins className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">{crypto.name}</div>
                            <div className="text-slate-400 text-sm">{crypto.symbol}</div>
                          </div>
                        </div>
                        <Badge
                          className={`${
                            crypto.change >= 0
                              ? "bg-green-600/20 text-green-400 border-green-600/30"
                              : "bg-red-600/20 text-red-400 border-red-600/30"
                          } text-xs`}
                        >
                          {crypto.change >= 0 ? "+" : ""}
                          {crypto.change.toFixed(2)}%
                        </Badge>
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">{formatCurrency(crypto.price)}</div>
                      <div className="flex justify-between text-slate-400 text-sm mb-2">
                        <span>24h High: {formatCurrency(crypto.high24h)}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-sm mb-4">
                        <span>24h Low: {formatCurrency(crypto.low24h)}</span>
                      </div>
                      <div className="flex justify-between text-slate-400 text-sm mb-4">
                        <span>Vol: {crypto.volume}</span>
                        <span>MCap: {crypto.marketCap}</span>
                      </div>
                      <div className="flex gap-2 mt-auto">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                          Buy
                        </Button>
                        <Button size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                          Sell
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Trading Tab Content */}
          <TabsContent value="trading" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Place Buy Order
                  </CardTitle>
                  <CardDescription>Execute a long position on a digital asset.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="buy-asset" className="block text-sm font-medium text-slate-300 mb-1">
                      Asset
                    </label>
                    <Select>
                      <SelectTrigger id="buy-asset" className="w-full bg-slate-900/70 border-slate-700 text-white">
                        <SelectValue placeholder="Select Asset" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {data?.currentMarketData.map((asset) => (
                          <SelectItem key={asset.symbol} value={asset.symbol}>
                            {asset.name} ({asset.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="buy-amount" className="block text-sm font-medium text-slate-300 mb-1">
                      Amount
                    </label>
                    <Input
                      id="buy-amount"
                      type="number"
                      placeholder="0.00"
                      className="bg-slate-900/70 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="buy-price" className="block text-sm font-medium text-slate-300 mb-1">
                      Price (Optional)
                    </label>
                    <Input
                      id="buy-price"
                      type="number"
                      placeholder="Market Price"
                      className="bg-slate-900/70 border-slate-700 text-white"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                    Confirm Buy Order
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center">
                    <TrendingDown className="w-5 h-5 mr-2" />
                    Place Sell Order
                  </CardTitle>
                  <CardDescription>Execute a short position or sell existing assets.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label htmlFor="sell-asset" className="block text-sm font-medium text-slate-300 mb-1">
                      Asset
                    </label>
                    <Select>
                      <SelectTrigger id="sell-asset" className="w-full bg-slate-900/70 border-slate-700 text-white">
                        <SelectValue placeholder="Select Asset" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700 text-white">
                        {mockPortfolioData.map((asset) => (
                          <SelectItem key={asset.symbol} value={asset.symbol}>
                            {asset.asset} ({asset.symbol})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="sell-amount" className="block text-sm font-medium text-slate-300 mb-1">
                      Amount
                    </label>
                    <Input
                      id="sell-amount"
                      type="number"
                      placeholder="0.00"
                      className="bg-slate-900/70 border-slate-700 text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="sell-price" className="block text-sm font-medium text-slate-300 mb-1">
                      Price (Optional)
                    </label>
                    <Input
                      id="sell-price"
                      type="number"
                      placeholder="Market Price"
                      className="bg-slate-900/70 border-slate-700 text-white"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white">
                    Confirm Sell Order
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {data?.orderBook && <OrderBook bids={data.orderBook.bids} asks={data.orderBook.asks} />}
              </div>
            </div>

            {/* Trade History */}
            <div className="mt-6">{data?.recentTrades && <TradeHistory trades={data.recentTrades} />}</div>
          </TabsContent>

          {/* Portfolio Tab Content */}
          <TabsContent value="portfolio" className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Your Digital Portfolio</CardTitle>
                <CardDescription>Current holdings, performance, and allocation.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-slate-900/70 p-4 rounded-lg">
                    <h4 className="text-blue-300 font-semibold mb-1 flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Total Portfolio Value
                    </h4>
                    <p className="text-3xl font-bold text-white">{formatCurrency(totalPortfolioValue)}</p>
                    <div
                      className={`flex items-center text-sm mt-2 ${totalDailyPnL >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {totalDailyPnL >= 0 ? (
                        <ArrowUpRight className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 mr-1" />
                      )}
                      {formatCurrency(totalDailyPnL)} ({formatPercentage(totalDailyPnLPercent)}) today
                    </div>
                  </div>

                  <div className="bg-slate-900/70 p-4 rounded-lg">
                    <h4 className="text-purple-300 font-semibold mb-1">Best Performer</h4>
                    <p className="text-2xl font-bold text-green-400">SOL</p>
                    <p className="text-green-400 text-sm">+8.2% today</p>
                  </div>

                  <div className="bg-slate-900/70 p-4 rounded-lg">
                    <h4 className="text-orange-300 font-semibold mb-1">Total Assets</h4>
                    <p className="text-2xl font-bold text-white">{mockPortfolioData.length}</p>
                    <p className="text-slate-400 text-sm">Diversified portfolio</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {mockPortfolioData.map((position) => (
                    <div
                      key={position.symbol}
                      className="flex items-center justify-between p-4 rounded-lg bg-slate-900/70 border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{position.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-white">{position.asset}</div>
                          <div className="text-sm text-slate-400">
                            {position.quantity.toFixed(4)} {position.symbol}
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-white">{formatCurrency(position.value)}</div>
                        <div className="text-sm text-slate-400">@ {formatCurrency(position.currentPrice)}</div>
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
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600/50"
                        >
                          <Settings className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Bots Tab Content */}
          <TabsContent value="ai-bots" className="space-y-6">
            <AiTradingBots />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
