"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Building, Activity, DollarSign, Globe } from "lucide-react"
import { HolographicDataVisualization } from "@/components/ui/holographic-data-visualization"

interface RWAAnalyticsProps {
  hologramMode: boolean
  realTime: boolean
  timeframe: string
}

export function RWAAnalytics({ hologramMode, realTime, timeframe }: RWAAnalyticsProps) {
  const [rwaData, setRwaData] = useState([
    {
      asset: "Tokenized Gold",
      symbol: "TGOLD",
      price: 2050.45,
      change: 2.3,
      volume: "$45.7M",
      marketCap: "$12.4B",
      yield: "3.2%",
      category: "Commodities",
    },
    {
      asset: "Real Estate REIT",
      symbol: "TREIT",
      price: 125.67,
      change: -1.8,
      volume: "$23.1M",
      marketCap: "$8.9B",
      yield: "5.8%",
      category: "Real Estate",
    },
    {
      asset: "Oil Futures Token",
      symbol: "TOIL",
      price: 78.23,
      change: 4.7,
      volume: "$67.3M",
      marketCap: "$15.2B",
      yield: "2.1%",
      category: "Energy",
    },
    {
      asset: "Treasury Bond Token",
      symbol: "TBOND",
      price: 98.45,
      change: 0.5,
      volume: "$89.4M",
      marketCap: "$45.7B",
      yield: "4.5%",
      category: "Bonds",
    },
    {
      asset: "Carbon Credits",
      symbol: "TCARB",
      price: 45.67,
      change: 8.9,
      volume: "$12.8M",
      marketCap: "$3.4B",
      yield: "1.8%",
      category: "Environmental",
    },
  ])

  const [performanceHistory, setPerformanceHistory] = useState([
    { name: "Jan", TGOLD: 2000, TREIT: 120, TOIL: 75, TBOND: 97, TCARB: 42 },
    { name: "Feb", TGOLD: 2020, TREIT: 122, TOIL: 76, TBOND: 97.5, TCARB: 43 },
    { name: "Mar", TGOLD: 2010, TREIT: 118, TOIL: 78, TBOND: 98, TCARB: 44 },
    { name: "Apr", TGOLD: 2035, TREIT: 124, TOIL: 77, TBOND: 98.2, TCARB: 45 },
    { name: "May", TGOLD: 2045, TREIT: 126, TOIL: 79, TBOND: 98.3, TCARB: 46 },
    { name: "Jun", TGOLD: 2050, TREIT: 125, TOIL: 78, TBOND: 98.4, TCARB: 45.6 },
  ])

  useEffect(() => {
    if (realTime) {
      const interval = setInterval(() => {
        setRwaData((prev) =>
          prev.map((rwa) => ({
            ...rwa,
            price: rwa.price * (1 + (Math.random() - 0.5) * 0.01),
            change: rwa.change + (Math.random() - 0.5) * 1,
          })),
        )
      }, 4000)

      return () => clearInterval(interval)
    }
  }, [realTime])

  const totalMarketCap = rwaData.reduce((sum, rwa) => {
    const cap = Number.parseFloat(rwa.marketCap.replace(/[$MB]/g, "")) * (rwa.marketCap.includes("B") ? 1000 : 1)
    return sum + cap
  }, 0)

  return (
    <div className="space-y-6">
      {/* RWA Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-green-500/20 ${hologramMode ? "shadow-lg shadow-green-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-200">Total Market Cap</p>
                <p className="text-2xl font-bold text-white">${(totalMarketCap / 1000).toFixed(1)}T</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +3.7%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border-blue-500/20 ${hologramMode ? "shadow-lg shadow-blue-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-200">24h Volume</p>
                <p className="text-2xl font-bold text-white">$238.3M</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +15.2%
                </p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-purple-500/10 to-indigo-500/10 backdrop-blur-sm border-purple-500/20 ${hologramMode ? "shadow-lg shadow-purple-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-200">Active Assets</p>
                <p className="text-2xl font-bold text-white">2,156</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +22.1%
                </p>
              </div>
              <Building className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm border-orange-500/20 ${hologramMode ? "shadow-lg shadow-orange-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-200">Avg Yield</p>
                <p className="text-2xl font-bold text-white">4.3%</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.2%
                </p>
              </div>
              <Globe className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="assets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="yields">Yields</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicDataVisualization
              title="Asset Performance"
              data={performanceHistory}
              type="line"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
            <HolographicDataVisualization
              title="Market Cap Distribution"
              data={rwaData.map((rwa) => ({
                name: rwa.symbol,
                value:
                  Number.parseFloat(rwa.marketCap.replace(/[$MB]/g, "")) * (rwa.marketCap.includes("B") ? 1000 : 1),
              }))}
              type="pie"
              hologramEnabled={hologramMode}
            />
          </div>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Real World Assets</CardTitle>
              <CardDescription className="text-slate-400">
                Tokenized real-world asset performance and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Asset</TableHead>
                    <TableHead className="text-slate-300">Price</TableHead>
                    <TableHead className="text-slate-300">24h Change</TableHead>
                    <TableHead className="text-slate-300">Volume</TableHead>
                    <TableHead className="text-slate-300">Market Cap</TableHead>
                    <TableHead className="text-slate-300">Yield</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rwaData.map((rwa) => (
                    <TableRow key={rwa.symbol} className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                            <Building className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{rwa.asset}</div>
                            <div className="text-slate-400 text-sm">{rwa.category}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-mono">${rwa.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={rwa.change >= 0 ? "default" : "destructive"}
                          className={rwa.change >= 0 ? "bg-green-600" : "bg-red-600"}
                        >
                          {rwa.change >= 0 ? "+" : ""}
                          {rwa.change.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{rwa.volume}</TableCell>
                      <TableCell className="text-slate-300">{rwa.marketCap}</TableCell>
                      <TableCell className="text-green-400 font-medium">{rwa.yield}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicDataVisualization
              title="Sector Performance"
              data={[
                { name: "Real Estate", value: 8900 },
                { name: "Commodities", value: 12400 },
                { name: "Energy", value: 15200 },
                { name: "Bonds", value: 45700 },
                { name: "Environmental", value: 3400 },
              ]}
              type="bar"
              hologramEnabled={hologramMode}
            />
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Sector Analysis</CardTitle>
                <CardDescription className="text-slate-400">Performance breakdown by asset category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { sector: "Government Bonds", performance: "+2.1%", allocation: "45.7%" },
                  { sector: "Energy Commodities", performance: "+4.8%", allocation: "23.2%" },
                  { sector: "Precious Metals", performance: "+1.9%", allocation: "18.5%" },
                  { sector: "Real Estate", performance: "-0.8%", allocation: "8.9%" },
                  { sector: "Carbon Credits", performance: "+12.4%", allocation: "3.7%" },
                ].map((sector, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                    <div>
                      <div className="text-white font-medium">{sector.sector}</div>
                      <div className="text-slate-400 text-sm">{sector.allocation} allocation</div>
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

        <TabsContent value="yields" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicDataVisualization
              title="Yield Comparison"
              data={rwaData.map((rwa) => ({
                name: rwa.symbol,
                value: Number.parseFloat(rwa.yield.replace("%", "")),
              }))}
              type="bar"
              hologramEnabled={hologramMode}
            />
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Yield Opportunities</CardTitle>
                <CardDescription className="text-slate-400">High-yield RWA investment opportunities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { asset: "High-Yield REIT", yield: "8.9%", risk: "Medium", liquidity: "High" },
                  { asset: "Corporate Bonds", yield: "6.7%", risk: "Low", liquidity: "High" },
                  { asset: "Infrastructure Debt", yield: "7.2%", risk: "Medium", liquidity: "Medium" },
                  { asset: "Commodity Futures", yield: "5.4%", risk: "High", liquidity: "High" },
                ].map((opportunity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                  >
                    <div>
                      <div className="text-white font-medium">{opportunity.asset}</div>
                      <div className="text-slate-400 text-sm">
                        Risk: {opportunity.risk} • Liquidity: {opportunity.liquidity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-bold text-lg">{opportunity.yield}</div>
                      <div className="text-slate-400 text-sm">Annual Yield</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Regulatory Compliance</CardTitle>
                <CardDescription className="text-slate-400">
                  Asset compliance status and regulatory updates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { asset: "TGOLD", status: "Compliant", jurisdiction: "US, EU", updated: "2 days ago" },
                  { asset: "TREIT", status: "Compliant", jurisdiction: "US", updated: "1 week ago" },
                  { asset: "TOIL", status: "Pending", jurisdiction: "US, UK", updated: "3 days ago" },
                  { asset: "TBOND", status: "Compliant", jurisdiction: "Global", updated: "1 day ago" },
                  { asset: "TCARB", status: "Compliant", jurisdiction: "EU", updated: "5 days ago" },
                ].map((compliance, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{compliance.asset.slice(1, 3)}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{compliance.asset}</div>
                        <div className="text-slate-400 text-sm">{compliance.jurisdiction}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={compliance.status === "Compliant" ? "default" : "secondary"}
                        className={compliance.status === "Compliant" ? "bg-green-600" : "bg-yellow-600"}
                      >
                        {compliance.status}
                      </Badge>
                      <div className="text-slate-400 text-sm mt-1">{compliance.updated}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Regulatory Updates</CardTitle>
                <CardDescription className="text-slate-400">
                  Latest regulatory news and compliance requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "EU MiCA Regulation Update",
                    impact: "Medium",
                    date: "Dec 15, 2024",
                    description: "New requirements for RWA tokenization",
                  },
                  {
                    title: "US SEC Guidance on Tokenized Assets",
                    impact: "High",
                    date: "Dec 10, 2024",
                    description: "Clarification on security token classification",
                  },
                  {
                    title: "UK FCA Digital Asset Framework",
                    impact: "Low",
                    date: "Dec 5, 2024",
                    description: "Updated guidelines for digital asset custody",
                  },
                ].map((update, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-white font-medium">{update.title}</div>
                      <Badge
                        variant={
                          update.impact === "High"
                            ? "destructive"
                            : update.impact === "Medium"
                              ? "secondary"
                              : "outline"
                        }
                        className={
                          update.impact === "High"
                            ? "bg-red-600"
                            : update.impact === "Medium"
                              ? "bg-yellow-600"
                              : "bg-green-600"
                        }
                      >
                        {update.impact}
                      </Badge>
                    </div>
                    <div className="text-slate-400 text-sm mb-2">{update.description}</div>
                    <div className="text-slate-500 text-xs">{update.date}</div>
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
