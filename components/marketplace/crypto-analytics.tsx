"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, TrendingDown, Coins, Activity, DollarSign, BarChart3 } from "lucide-react"
import { HolographicDataVisualization } from "@/components/ui/holographic-data-visualization"

interface CryptoAnalyticsProps {
  hologramMode: boolean
  realTime: boolean
  timeframe: string
}

export function CryptoAnalytics({ hologramMode, realTime, timeframe }: CryptoAnalyticsProps) {
  const [cryptoData, setCryptoData] = useState([
    {
      symbol: "BTC",
      name: "Bitcoin",
      price: 68123.45,
      change: 5.2,
      volume: "32.1B",
      marketCap: "1.34T",
      dominance: 52.3,
      fear_greed: 67,
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      price: 3921.78,
      change: -2.1,
      volume: "18.5B",
      marketCap: "471B",
      dominance: 18.7,
      fear_greed: 67,
    },
    {
      symbol: "SOL",
      name: "Solana",
      price: 205.67,
      change: 12.8,
      volume: "4.1B",
      marketCap: "95.8B",
      dominance: 3.2,
      fear_greed: 67,
    },
    {
      symbol: "ADA",
      name: "Cardano",
      price: 0.4678,
      change: -5.3,
      volume: "1.2B",
      marketCap: "16.5B",
      dominance: 0.8,
      fear_greed: 67,
    },
    {
      symbol: "MATIC",
      name: "Polygon",
      price: 0.8534,
      change: 8.9,
      volume: "890M",
      marketCap: "8.2B",
      dominance: 0.4,
      fear_greed: 67,
    },
  ])

  const [priceHistory, setPriceHistory] = useState([
    { name: "00:00", BTC: 67500, ETH: 3850, SOL: 195, ADA: 0.45, MATIC: 0.82 },
    { name: "04:00", BTC: 67800, ETH: 3890, SOL: 198, ADA: 0.46, MATIC: 0.83 },
    { name: "08:00", BTC: 68200, ETH: 3920, SOL: 202, ADA: 0.47, MATIC: 0.85 },
    { name: "12:00", BTC: 68500, ETH: 3950, SOL: 206, ADA: 0.48, MATIC: 0.86 },
    { name: "16:00", BTC: 68100, ETH: 3920, SOL: 204, ADA: 0.47, MATIC: 0.85 },
    { name: "20:00", BTC: 68123, ETH: 3921, SOL: 205, ADA: 0.47, MATIC: 0.85 },
  ])

  useEffect(() => {
    if (realTime) {
      const interval = setInterval(() => {
        setCryptoData((prev) =>
          prev.map((crypto) => ({
            ...crypto,
            price: crypto.price * (1 + (Math.random() - 0.5) * 0.02),
            change: crypto.change + (Math.random() - 0.5) * 2,
          })),
        )
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [realTime])

  const totalMarketCap = cryptoData.reduce((sum, crypto) => {
    const cap = Number.parseFloat(crypto.marketCap.replace(/[TB]/g, "")) * (crypto.marketCap.includes("T") ? 1000 : 1)
    return sum + cap
  }, 0)

  return (
    <div className="space-y-6">
      {/* Crypto Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className={`bg-gradient-to-br from-orange-500/10 to-yellow-500/10 backdrop-blur-sm border-orange-500/20 ${hologramMode ? "shadow-lg shadow-orange-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-200">Total Market Cap</p>
                <p className="text-2xl font-bold text-white">${totalMarketCap.toFixed(1)}T</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.2%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-400" />
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
                <p className="text-2xl font-bold text-white">$127.3B</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.8%
                </p>
              </div>
              <Activity className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20 ${hologramMode ? "shadow-lg shadow-purple-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-200">BTC Dominance</p>
                <p className="text-2xl font-bold text-white">52.3%</p>
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -0.8%
                </p>
              </div>
              <Coins className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm border-green-500/20 ${hologramMode ? "shadow-lg shadow-green-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-200">Fear & Greed</p>
                <p className="text-2xl font-bold text-white">67</p>
                <p className="text-sm text-yellow-400">Greed</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="trading">Trading</TabsTrigger>
          <TabsTrigger value="defi">DeFi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicDataVisualization
              title="Price Trends"
              data={priceHistory}
              type="line"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
            <HolographicDataVisualization
              title="Market Cap Distribution"
              data={cryptoData.map((crypto) => ({
                name: crypto.symbol,
                value:
                  Number.parseFloat(crypto.marketCap.replace(/[TB]/g, "")) *
                  (crypto.marketCap.includes("T") ? 1000 : 1),
              }))}
              type="pie"
              hologramEnabled={hologramMode}
            />
          </div>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Top Cryptocurrencies</CardTitle>
              <CardDescription className="text-slate-400">Real-time cryptocurrency market data</CardDescription>
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
                    <TableHead className="text-slate-300">Dominance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cryptoData.map((crypto) => (
                    <TableRow key={crypto.symbol} className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{crypto.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{crypto.symbol}</div>
                            <div className="text-slate-400 text-sm">{crypto.name}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-mono">
                        $
                        {crypto.price.toLocaleString(undefined, {
                          minimumFractionDigits: crypto.price < 1 ? 4 : 2,
                          maximumFractionDigits: crypto.price < 1 ? 4 : 2,
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={crypto.change >= 0 ? "default" : "destructive"}
                          className={crypto.change >= 0 ? "bg-green-600" : "bg-red-600"}
                        >
                          {crypto.change >= 0 ? "+" : ""}
                          {crypto.change.toFixed(2)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">${crypto.volume}</TableCell>
                      <TableCell className="text-slate-300">${crypto.marketCap}</TableCell>
                      <TableCell className="text-slate-300">{crypto.dominance}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <HolographicDataVisualization
              title="Multi-Asset Price Comparison"
              data={priceHistory}
              type="line"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HolographicDataVisualization
                title="Volume Analysis"
                data={cryptoData.map((crypto) => ({
                  name: crypto.symbol,
                  value:
                    Number.parseFloat(crypto.volume.replace(/[MB]/g, "")) * (crypto.volume.includes("B") ? 1000 : 1),
                }))}
                type="bar"
                hologramEnabled={hologramMode}
              />
              <HolographicDataVisualization
                title="Volatility Index"
                data={cryptoData.map((crypto) => ({
                  name: crypto.symbol,
                  value: Math.abs(crypto.change),
                }))}
                type="radar"
                hologramEnabled={hologramMode}
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trading" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Trading Opportunities</CardTitle>
                <CardDescription className="text-slate-400">
                  AI-powered trading signals and market analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { symbol: "BTC", signal: "BUY", confidence: 85, reason: "Strong support at $67,000" },
                  { symbol: "ETH", signal: "HOLD", confidence: 72, reason: "Consolidating near resistance" },
                  { symbol: "SOL", signal: "BUY", confidence: 91, reason: "Breakout above $200 resistance" },
                  { symbol: "ADA", signal: "SELL", confidence: 68, reason: "Weak momentum, bearish divergence" },
                ].map((signal, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                        <span className="text-sm font-bold text-white">{signal.symbol}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{signal.symbol}</div>
                        <div className="text-slate-400 text-sm">{signal.reason}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          signal.signal === "BUY" ? "default" : signal.signal === "SELL" ? "destructive" : "secondary"
                        }
                        className={
                          signal.signal === "BUY"
                            ? "bg-green-600"
                            : signal.signal === "SELL"
                              ? "bg-red-600"
                              : "bg-yellow-600"
                        }
                      >
                        {signal.signal}
                      </Badge>
                      <div className="text-slate-300 text-sm mt-1">{signal.confidence}% confidence</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Quick Trade</CardTitle>
                <CardDescription className="text-slate-400">Execute trades directly from analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-slate-300">Asset</label>
                  <select className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white">
                    <option>BTC</option>
                    <option>ETH</option>
                    <option>SOL</option>
                    <option>ADA</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-slate-300">Amount (USD)</label>
                  <input
                    type="number"
                    placeholder="1000"
                    className="w-full p-2 rounded bg-slate-800 border border-slate-700 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-green-600 hover:bg-green-700">Buy</Button>
                  <Button
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    Sell
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="defi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">DeFi Protocols</CardTitle>
                <CardDescription className="text-slate-400">Top DeFi protocols by TVL</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "Uniswap", tvl: "$4.2B", apy: "12.5%", category: "DEX" },
                  { name: "Aave", tvl: "$3.8B", apy: "8.9%", category: "Lending" },
                  { name: "Compound", tvl: "$2.1B", apy: "6.7%", category: "Lending" },
                  { name: "MakerDAO", tvl: "$5.9B", apy: "4.2%", category: "CDP" },
                ].map((protocol, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                    <div>
                      <div className="text-white font-medium">{protocol.name}</div>
                      <div className="text-slate-400 text-sm">{protocol.category}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{protocol.tvl}</div>
                      <div className="text-green-400 text-sm">{protocol.apy} APY</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <HolographicDataVisualization
              title="DeFi TVL Trends"
              data={[
                { name: "Jan", value: 45000 },
                { name: "Feb", value: 52000 },
                { name: "Mar", value: 48000 },
                { name: "Apr", value: 61000 },
                { name: "May", value: 55000 },
                { name: "Jun", value: 67000 },
              ]}
              type="area"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
