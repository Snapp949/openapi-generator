"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, BarChart3, Activity, DollarSign, PieChart } from "lucide-react"
import { HolographicDataVisualization } from "@/components/ui/holographic-data-visualization"

interface ETFAnalyticsProps {
  hologramMode: boolean
  realTime: boolean
  timeframe: string
}

export function ETFAnalytics({ hologramMode, realTime, timeframe }: ETFAnalyticsProps) {
  const [etfData, setEtfData] = useState([
    {
      name: "SPDR S&P 500 ETF",
      symbol: "SPY",
      price: 445.67,
      change: 1.2,
      volume: "$12.4B",
      aum: "$387.2B",
      expenseRatio: "0.09%",
      dividend: "1.8%",
      category: "Large Cap",
    },
    {
      name: "Invesco QQQ Trust",
      symbol: "QQQ",
      price: 378.23,
      change: 2.1,
      volume: "$8.9B",
      aum: "$198.7B",
      expenseRatio: "0.20%",
      dividend: "0.6%",
      category: "Technology",
    },
    {
      name: "Vanguard Total Stock Market",
      symbol: "VTI",
      price: 234.56,
      change: 0.8,
      volume: "$3.2B",
      aum: "$289.4B",
      expenseRatio: "0.03%",
      dividend: "1.4%",
      category: "Total Market",
    },
    {
      name: "iShares MSCI Emerging Markets",
      symbol: "EEM",
      price: 42.89,
      change: -1.5,
      volume: "$1.8B",
      aum: "$25.6B",
      expenseRatio: "0.68%",
      dividend: "2.9%",
      category: "Emerging Markets",
    },
    {
      name: "SPDR Gold Shares",
      symbol: "GLD",
      price: 189.45,
      change: 0.3,
      volume: "$2.1B",
      aum: "$56.8B",
      expenseRatio: "0.40%",
      dividend: "0.0%",
      category: "Commodities",
    },
  ])

  const [performanceHistory, setPerformanceHistory] = useState([
    { name: "1M", SPY: 445, QQQ: 375, VTI: 232, EEM: 44, GLD: 188 },
    { name: "3M", SPY: 440, QQQ: 370, VTI: 230, EEM: 43, GLD: 185 },
    { name: "6M", SPY: 435, QQQ: 365, VTI: 228, EEM: 42, GLD: 190 },
    { name: "1Y", SPY: 420, QQQ: 350, VTI: 220, EEM: 40, GLD: 195 },
    { name: "2Y", SPY: 400, QQQ: 330, VTI: 210, EEM: 38, GLD: 180 },
    { name: "5Y", SPY: 350, QQQ: 280, VTI: 180, EEM: 35, GLD: 170 },
  ])

  useEffect(() => {
    if (realTime) {
      const interval = setInterval(() => {
        setEtfData((prev) =>
          prev.map((etf) => ({
            ...etf,
            price: etf.price * (1 + (Math.random() - 0.5) * 0.005),
            change: etf.change + (Math.random() - 0.5) * 0.5,
          })),
        )
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [realTime])

  const totalAUM = etfData.reduce((sum, etf) => {
    return sum + Number.parseFloat(etf.aum.replace(/[$B]/g, ""))
  }, 0)

  return (
    <div className="space-y-6">
      {/* ETF Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className={`bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-blue-500/20 ${hologramMode ? "shadow-lg shadow-blue-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200">Total AUM</p>
                <p className="text-2xl font-bold text-white">${totalAUM.toFixed(1)}B</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +6.4%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-cyan-500/10 to-teal-500/10 backdrop-blur-sm border-cyan-500/20 ${hologramMode ? "shadow-lg shadow-cyan-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-200">24h Volume</p>
                <p className="text-2xl font-bold text-white">$28.4B</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +4.2%
                </p>
              </div>
              <Activity className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-indigo-500/10 to-blue-500/10 backdrop-blur-sm border-indigo-500/20 ${hologramMode ? "shadow-lg shadow-indigo-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Active ETFs</p>
                <p className="text-2xl font-bold text-white">1,847</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.8%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-indigo-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-teal-500/10 to-green-500/10 backdrop-blur-sm border-teal-500/20 ${hologramMode ? "shadow-lg shadow-teal-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-teal-200">Avg Dividend</p>
                <p className="text-2xl font-bold text-white">1.3%</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.1%
                </p>
              </div>
              <PieChart className="h-8 w-8 text-teal-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicDataVisualization
              title="ETF Performance Comparison"
              data={performanceHistory}
              type="line"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
            <HolographicDataVisualization
              title="AUM Distribution"
              data={etfData.map((etf) => ({
                name: etf.symbol,
                value: Number.parseFloat(etf.aum.replace(/[$B]/g, "")),
              }))}
              type="pie"
              hologramEnabled={hologramMode}
            />
          </div>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Top ETFs</CardTitle>
              <CardDescription className="text-slate-400">
                Most popular exchange-traded funds by assets under management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">ETF</TableHead>
                    <TableHead className="text-slate-300">Price</TableHead>
                    <TableHead className="text-slate-300">Change</TableHead>
                    <TableHead className="text-slate-300">Volume</TableHead>
                    <TableHead className="text-slate-300">AUM</TableHead>
                    <TableHead className="text-slate-300">Expense</TableHead>
                    <TableHead className="text-slate-300">Dividend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {etfData.map((etf) => (
                    <TableRow key={etf.symbol} className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <BarChart3 className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{etf.symbol}</div>
                            <div className="text-slate-400 text-sm">{etf.category}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-mono">${etf.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={etf.change >= 0 ? "default" : "destructive"}
                          className={etf.change >= 0 ? "bg-green-600" : "bg-red-600"}
                        >
                          {etf.change >= 0 ? "+" : ""}
                          {etf.change.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{etf.volume}</TableCell>
                      <TableCell className="text-slate-300">{etf.aum}</TableCell>
                      <TableCell className="text-slate-300">{etf.expenseRatio}</TableCell>
                      <TableCell className="text-blue-400 font-medium">{etf.dividend}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <HolographicDataVisualization
              title="Long-term Performance Trends"
              data={performanceHistory}
              type="area"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Performance Leaders</CardTitle>
                  <CardDescription className="text-slate-400">
                    Best performing ETFs in the selected timeframe
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { symbol: "QQQ", name: "Invesco QQQ", performance: "+24.7%", category: "Technology" },
                    { symbol: "SPY", name: "SPDR S&P 500", performance: "+18.9%", category: "Large Cap" },
                    { symbol: "VTI", name: "Vanguard Total", performance: "+16.2%", category: "Total Market" },
                    { symbol: "GLD", name: "SPDR Gold", performance: "+8.4%", category: "Commodities" },
                  ].map((leader, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{leader.symbol}</div>
                          <div className="text-slate-400 text-sm">{leader.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-medium">{leader.performance}</div>
                        <div className="text-slate-400 text-sm">YTD</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Risk Metrics</CardTitle>
                  <CardDescription className="text-slate-400">
                    Volatility and risk analysis for top ETFs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { symbol: "SPY", volatility: "12.4%", sharpe: "1.23", beta: "1.00" },
                    { symbol: "QQQ", volatility: "18.7%", sharpe: "1.45", beta: "1.15" },
                    { symbol: "VTI", volatility: "11.8%", sharpe: "1.18", beta: "0.98" },
                    { symbol: "EEM", volatility: "22.3%", sharpe: "0.87", beta: "1.32" },
                  ].map((risk, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                      <div className="text-white font-medium">{risk.symbol}</div>
                      <div className="flex gap-4 text-sm">
                        <div className="text-center">
                          <div className="text-slate-400">Vol</div>
                          <div className="text-white">{risk.volatility}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400">Sharpe</div>
                          <div className="text-white">{risk.sharpe}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-slate-400">Beta</div>
                          <div className="text-white">{risk.beta}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicDataVisualization
              title="Sector Allocation"
              data={[
                { name: "Technology", value: 28.5 },
                { name: "Healthcare", value: 13.2 },
                { name: "Financials", value: 11.8 },
                { name: "Consumer Disc.", value: 10.4 },
                { name: "Communication", value: 8.9 },
                { name: "Industrials", value: 8.1 },
                { name: "Consumer Staples", value: 6.7 },
                { name: "Energy", value: 4.2 },
                { name: "Utilities", value: 2.8 },
                { name: "Real Estate", value: 2.6 },
                { name: "Materials", value: 2.8 },
              ]}
              type="pie"
              hologramEnabled={hologramMode}
            />
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Sector Performance</CardTitle>
                <CardDescription className="text-slate-400">Year-to-date sector returns and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { sector: "Technology", performance: "+32.1%", trend: "up" },
                  { sector: "Communication", performance: "+18.7%", trend: "up" },
                  { sector: "Consumer Discretionary", performance: "+15.4%", trend: "up" },
                  { sector: "Industrials", performance: "+12.8%", trend: "up" },
                  { sector: "Healthcare", performance: "+8.9%", trend: "up" },
                  { sector: "Financials", performance: "+6.2%", trend: "down" },
                  { sector: "Energy", performance: "-2.1%", trend: "down" },
                ].map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-3 h-3 rounded-full ${sector.trend === "up" ? "bg-green-500" : "bg-red-500"}`}
                      />
                      <div className="text-white font-medium">{sector.sector}</div>
                    </div>
                    <Badge
                      variant={sector.performance.startsWith("+") ? "default" : "destructive"}
                      className={sector.performance.startsWith("+") ? "bg-green-600" : "bg-red-600"}
                    >
                      {sector.performance}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">ETF Screener</CardTitle>
                <CardDescription className="text-slate-400">
                  Find ETFs based on your investment criteria
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300">Category</label>
                    <select className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white">
                      <option>All Categories</option>
                      <option>Large Cap</option>
                      <option>Technology</option>
                      <option>International</option>
                      <option>Bonds</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300">Min AUM</label>
                    <select className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white">
                      <option>Any Size</option>
                      <option>$1B+</option>
                      <option>$10B+</option>
                      <option>$50B+</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300">Max Expense Ratio</label>
                    <select className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white">
                      <option>Any</option>
                      <option>0.1%</option>
                      <option>0.25%</option>
                      <option>0.5%</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-slate-300">Min Dividend</label>
                    <select className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white">
                      <option>Any</option>
                      <option>1%+</option>
                      <option>2%+</option>
                      <option>3%+</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Screen ETFs
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Market Insights</CardTitle>
                <CardDescription className="text-slate-400">
                  AI-powered ETF market analysis and recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    insight: "Technology ETFs showing strong momentum",
                    confidence: "High",
                    action: "Consider QQQ for tech exposure",
                  },
                  {
                    insight: "Emerging markets undervalued",
                    confidence: "Medium",
                    action: "EEM may present opportunity",
                  },
                  {
                    insight: "Low volatility ETFs gaining interest",
                    confidence: "High",
                    action: "Defensive positioning recommended",
                  },
                  {
                    insight: "ESG ETFs seeing increased flows",
                    confidence: "Medium",
                    action: "Monitor sustainable investing trend",
                  },
                ].map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-white font-medium">{insight.insight}</div>
                      <Badge
                        variant={insight.confidence === "High" ? "default" : "secondary"}
                        className={insight.confidence === "High" ? "bg-green-600" : "bg-yellow-600"}
                      >
                        {insight.confidence}
                      </Badge>
                    </div>
                    <div className="text-slate-400 text-sm">{insight.action}</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
