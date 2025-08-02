"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  PieChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  Shield,
  Activity,
  BarChart3,
  AlertTriangle,
  Clock,
} from "lucide-react"

interface Position {
  symbol: string
  name: string
  quantity: number
  avgCost: number
  currentPrice: number
  marketValue: number
  unrealizedPnL: number
  unrealizedPnLPercent: number
  dayChange: number
  dayChangePercent: number
  weight: number
  sector: string
}

interface Transaction {
  id: string
  symbol: string
  type: "buy" | "sell"
  quantity: number
  price: number
  total: number
  commission: number
  timestamp: Date
  status: "filled" | "pending" | "cancelled"
}

interface PortfolioManagerProps {
  eliteMode: boolean
}

export function Nasdaq2035PortfolioManager({ eliteMode }: PortfolioManagerProps) {
  const [positions, setPositions] = useState<Position[]>([
    {
      symbol: "DAX",
      name: "DAX 40 Index",
      quantity: 100,
      avgCost: 17189.0,
      currentPrice: 17234.56,
      marketValue: 1723456,
      unrealizedPnL: 4556,
      unrealizedPnLPercent: 2.65,
      dayChange: 456.78,
      dayChangePercent: 0.27,
      weight: 45.2,
      sector: "Index",
    },
    {
      symbol: "SAP",
      name: "SAP SE",
      quantity: 500,
      avgCost: 128.5,
      currentPrice: 134.56,
      marketValue: 67280,
      unrealizedPnL: 3030,
      unrealizedPnLPercent: 4.71,
      dayChange: 892,
      dayChangePercent: 1.34,
      weight: 17.6,
      sector: "Technology",
    },
    {
      symbol: "SIE",
      name: "Siemens AG",
      quantity: 300,
      avgCost: 145.2,
      currentPrice: 156.78,
      marketValue: 47034,
      unrealizedPnL: 3474,
      unrealizedPnLPercent: 7.97,
      dayChange: 1234,
      dayChangePercent: 2.69,
      weight: 12.3,
      sector: "Industrials",
    },
    {
      symbol: "ALV",
      name: "Allianz SE",
      quantity: 200,
      avgCost: 235.8,
      currentPrice: 245.67,
      marketValue: 49134,
      unrealizedPnL: 1974,
      unrealizedPnLPercent: 4.18,
      dayChange: 589,
      dayChangePercent: 1.21,
      weight: 12.9,
      sector: "Financials",
    },
    {
      symbol: "ASML",
      name: "ASML Holding",
      quantity: 75,
      avgCost: 695.4,
      currentPrice: 678.9,
      marketValue: 50917.5,
      unrealizedPnL: -1237.5,
      unrealizedPnLPercent: -2.37,
      dayChange: -345,
      dayChangePercent: -0.67,
      weight: 13.3,
      sector: "Technology",
    },
  ])

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "txn-001",
      symbol: "DAX",
      type: "buy",
      quantity: 50,
      price: 17234.56,
      total: 861728,
      commission: 9.95,
      timestamp: new Date(Date.now() - 3600000),
      status: "filled",
    },
    {
      id: "txn-002",
      symbol: "SAP",
      type: "buy",
      quantity: 500,
      price: 128.5,
      total: 64250,
      commission: 9.95,
      timestamp: new Date(Date.now() - 7200000),
      status: "filled",
    },
    {
      id: "txn-003",
      symbol: "SIE",
      type: "buy",
      quantity: 300,
      price: 145.2,
      total: 43560,
      commission: 9.95,
      timestamp: new Date(Date.now() - 10800000),
      status: "filled",
    },
  ])

  // Calculate portfolio totals
  const totalMarketValue = positions.reduce((sum, pos) => sum + pos.marketValue, 0)
  const totalUnrealizedPnL = positions.reduce((sum, pos) => sum + pos.unrealizedPnL, 0)
  const totalDayChange = positions.reduce((sum, pos) => sum + pos.dayChange, 0)
  const totalUnrealizedPnLPercent = (totalUnrealizedPnL / (totalMarketValue - totalUnrealizedPnL)) * 100
  const totalDayChangePercent = (totalDayChange / totalMarketValue) * 100

  // Real-time position updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((pos) => {
          const priceChange = (Math.random() - 0.5) * (pos.currentPrice * 0.001)
          const newPrice = pos.currentPrice + priceChange
          const newMarketValue = pos.quantity * newPrice
          const newUnrealizedPnL = newMarketValue - pos.quantity * pos.avgCost
          const newUnrealizedPnLPercent = (newUnrealizedPnL / (pos.quantity * pos.avgCost)) * 100

          return {
            ...pos,
            currentPrice: Number(newPrice.toFixed(2)),
            marketValue: Number(newMarketValue.toFixed(2)),
            unrealizedPnL: Number(newUnrealizedPnL.toFixed(2)),
            unrealizedPnLPercent: Number(newUnrealizedPnLPercent.toFixed(2)),
            dayChange: pos.dayChange + priceChange * pos.quantity,
            dayChangePercent: ((pos.dayChange + priceChange * pos.quantity) / pos.marketValue) * 100,
          }
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Portfolio analytics
  const portfolioMetrics = {
    totalValue: totalMarketValue,
    cashBalance: 125000,
    buyingPower: 250000,
    dayPnL: totalDayChange,
    totalPnL: totalUnrealizedPnL,
    beta: 1.23,
    sharpeRatio: 1.45,
    maxDrawdown: -8.7,
    volatility: 12.4,
  }

  const sectorAllocation = positions.reduce(
    (acc, pos) => {
      acc[pos.sector] = (acc[pos.sector] || 0) + pos.weight
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200">Total Value</p>
                <p className="text-2xl font-bold text-white">€{(portfolioMetrics.totalValue / 1000000).toFixed(2)}M</p>
                <p
                  className={`text-sm flex items-center ${
                    totalDayChangePercent >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {totalDayChangePercent >= 0 ? (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  )}
                  {totalDayChangePercent >= 0 ? "+" : ""}
                  {totalDayChangePercent.toFixed(2)}%
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-200">Day P&L</p>
                <p className="text-2xl font-bold text-white">€{totalDayChange.toFixed(0)}</p>
                <p className="text-sm text-green-400">Today's Performance</p>
              </div>
              <Activity className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-200">Total P&L</p>
                <p className="text-2xl font-bold text-white">€{totalUnrealizedPnL.toFixed(0)}</p>
                <p className={`text-sm ${totalUnrealizedPnLPercent >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {totalUnrealizedPnLPercent >= 0 ? "+" : ""}
                  {totalUnrealizedPnLPercent.toFixed(2)}%
                </p>
              </div>
              <Target className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-200">Buying Power</p>
                <p className="text-2xl font-bold text-white">€{(portfolioMetrics.buyingPower / 1000).toFixed(0)}K</p>
                <p className="text-sm text-orange-400">Available to Trade</p>
              </div>
              <Shield className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="positions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/30 backdrop-blur-xl">
          <TabsTrigger value="positions">Positions</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2 text-blue-400" />
                  Current Positions
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{positions.length} holdings</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positions.map((position) => (
                  <div
                    key={position.symbol}
                    className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-700/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-sm font-bold text-white">{position.symbol.slice(0, 2)}</span>
                        </div>
                        <div>
                          <div className="font-bold text-white">{position.symbol}</div>
                          <div className="text-sm text-slate-400">{position.name}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">€{position.marketValue.toLocaleString()}</div>
                        <div className="text-sm text-slate-400">{position.weight.toFixed(1)}% of portfolio</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4 text-sm">
                      <div>
                        <div className="text-slate-400">Quantity</div>
                        <div className="text-white font-mono">{position.quantity}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Avg Cost</div>
                        <div className="text-white font-mono">€{position.avgCost.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Current Price</div>
                        <div className="text-white font-mono">€{position.currentPrice.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-slate-400">Unrealized P&L</div>
                        <div className={`font-mono ${position.unrealizedPnL >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {position.unrealizedPnL >= 0 ? "+" : ""}€{position.unrealizedPnL.toFixed(0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-slate-400">Day Change</div>
                        <div className={`font-mono ${position.dayChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                          {position.dayChange >= 0 ? "+" : ""}€{position.dayChange.toFixed(0)}
                        </div>
                      </div>
                    </div>

                    {/* Position Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Performance</span>
                        <span>
                          {position.unrealizedPnLPercent >= 0 ? "+" : ""}
                          {position.unrealizedPnLPercent.toFixed(2)}%
                        </span>
                      </div>
                      <Progress value={Math.abs(position.unrealizedPnLPercent)} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-400" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {transactions.map((txn) => (
                  <div
                    key={txn.id}
                    className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg border border-slate-700/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          txn.type === "buy" ? "bg-green-500/20" : "bg-red-500/20"
                        }`}
                      >
                        {txn.type === "buy" ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white">
                          {txn.type.toUpperCase()} {txn.quantity} {txn.symbol}
                        </div>
                        <div className="text-sm text-slate-400">
                          @ €{txn.price.toFixed(2)} • {txn.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-white">€{txn.total.toLocaleString()}</div>
                      <Badge
                        className={
                          txn.status === "filled"
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : txn.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                              : "bg-red-500/20 text-red-400 border-red-500/30"
                        }
                      >
                        {txn.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Sector Allocation */}
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                  Sector Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(sectorAllocation).map(([sector, weight]) => (
                  <div key={sector} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">{sector}</span>
                      <span className="text-white font-medium">{weight.toFixed(1)}%</span>
                    </div>
                    <Progress value={weight} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-400" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Portfolio Beta</span>
                  <span className="text-white font-medium">{portfolioMetrics.beta}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Sharpe Ratio</span>
                  <span className="text-green-400 font-medium">{portfolioMetrics.sharpeRatio}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Max Drawdown</span>
                  <span className="text-red-400 font-medium">{portfolioMetrics.maxDrawdown}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Volatility (Ann.)</span>
                  <span className="text-white font-medium">{portfolioMetrics.volatility}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          {eliteMode && (
            <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
                  Elite Risk Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <div className="text-sm text-slate-400">Risk Score</div>
                    <div className="text-2xl font-bold text-orange-400">Medium</div>
                    <div className="text-xs text-slate-400">6.7/10</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <div className="text-sm text-slate-400">VaR (95%)</div>
                    <div className="text-2xl font-bold text-red-400">-€45K</div>
                    <div className="text-xs text-slate-400">1-day horizon</div>
                  </div>
                  <div className="text-center p-4 bg-slate-800/30 rounded-lg">
                    <div className="text-sm text-slate-400">Correlation</div>
                    <div className="text-2xl font-bold text-white">0.78</div>
                    <div className="text-xs text-slate-400">To DAX index</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
