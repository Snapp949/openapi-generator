"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, RefreshCw, Activity, Bot, AlertCircle } from "lucide-react"
import { useDaxMarketData } from "@/hooks/use-dax-market-data"
import { MarketChart } from "@/components/snap-dax/market-chart"
import { OrderBook } from "@/components/snap-dax/order-book"
import { TradeHistory } from "@/components/snap-dax/trade-history"
import { AITradingBots } from "@/components/snap-dax/ai-trading-bots"
import { DollarSign } from "lucide-react"

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
  { title: "New Regulations Proposed for Stablecoins", source: "Reuters", time: "5 hours ago", impact: "Neutral" },
  {
    title: "AI-Powered Trading Bots Show Record Performance",
    source: "TechCrunch",
    time: "8 hours ago",
    impact: "Bullish",
  },
]

export function DaxDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const { data, loading, error, refetch } = useDaxMarketData()

  const totalPortfolioValue = mockPortfolioData.reduce((sum, item) => sum + item.value, 0)
  const totalDailyPnL = mockPortfolioData.reduce((sum, item) => sum + item.pnl, 0)
  const totalDailyPnLPercent = (totalDailyPnL / (totalPortfolioValue - totalDailyPnL)) * 100

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
  const formatPercentage = (value: number) => `${value.toFixed(2)}%`

  const portfolioValue = 125750
  const dailyChange = 2.34
  const totalReturn = 18.7

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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 font-mono">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
            SnapDAX Digital Asset Exchange
          </h1>
          <p className="text-gray-400">Advanced trading platform with AI-powered automation</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-black/40 border-cyan-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Portfolio Value</p>
                  <p className="text-2xl font-bold text-white">${portfolioValue.toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Daily Change</p>
                  <p className="text-2xl font-bold text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-5 h-5" />+{dailyChange}%
                  </p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Return</p>
                  <p className="text-2xl font-bold text-blue-400">+{totalReturn}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Bots</p>
                  <p className="text-2xl font-bold text-purple-400">3</p>
                </div>
                <Bot className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Overview */}
        <Card className="bg-black/40 border-cyan-500/20 backdrop-blur-sm mb-6">
          <CardHeader>
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {!loading &&
                data.slice(0, 8).map((asset) => (
                  <div key={asset.symbol} className="text-center p-3 rounded-lg bg-black/20 border border-cyan-500/10">
                    <div className="font-semibold text-white">{asset.symbol}</div>
                    <div className="text-sm text-gray-300">${asset.price}</div>
                    <Badge
                      variant={Number.parseFloat(asset.change) > 0 ? "default" : "destructive"}
                      className={
                        Number.parseFloat(asset.change) > 0
                          ? "bg-green-500/20 text-green-400 border-green-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }
                    >
                      {asset.change}%
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart - Takes up 2 columns */}
          <div className="lg:col-span-2">
            {data?.historicalData && (
              <MarketChart
                data={data.historicalData}
                title="Market Indices & Charts"
                description="Real-time performance of key digital assets."
              />
            )}
          </div>

          {/* Order Book */}
          <div>{data?.orderBook && <OrderBook bids={data.orderBook.bids} asks={data.orderBook.asks} />}</div>
        </div>

        {/* Trading Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trade History */}
          <div>{data?.recentTrades && <TradeHistory trades={data.recentTrades} />}</div>

          {/* AI Trading Bots */}
          <div>
            <AITradingBots />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-400 text-sm mt-8">
          <p>SnapDAX • Advanced Digital Asset Exchange • Real-time market data and AI-powered trading</p>
        </div>
      </div>
    </div>
  )
}
