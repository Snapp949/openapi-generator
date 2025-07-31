"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  BarChart3,
  Zap,
  ImageIcon,
  Building,
  Search,
  Filter,
  RefreshCw,
  Settings,
} from "lucide-react"
import { useRealTimeMarketData } from "@/hooks/use-real-time-market-data"
import { CryptoAnalytics } from "@/components/marketplace/crypto-analytics"
import { NFTAnalytics } from "@/components/marketplace/nft-analytics"
import { RWAAnalytics } from "@/components/marketplace/rwa-analytics"
import { ETFAnalytics } from "@/components/marketplace/etf-analytics"
import { QGIAnalytics } from "@/components/marketplace/qgi-analytics"
import { HolographicDataVisualization } from "@/components/ui/holographic-data-visualization"

export default function RealTimeAnalyticsMarketplace() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isRealTime, setIsRealTime] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(5000)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("24h")
  const [hologramMode, setHologramMode] = useState(true)

  const { data: marketData, loading, error, lastUpdated } = useRealTimeMarketData(refreshInterval)

  const marketStats = [
    {
      title: "Total Market Cap",
      value: "$2.84T",
      change: "+5.2%",
      icon: DollarSign,
      color: "text-green-500",
      category: "overall",
    },
    {
      title: "24h Volume",
      value: "$127.3B",
      change: "+12.8%",
      icon: Activity,
      color: "text-blue-500",
      category: "volume",
    },
    {
      title: "Active Assets",
      value: "24,847",
      change: "+3.1%",
      icon: ImageIcon,
      color: "text-purple-500",
      category: "assets",
    },
    {
      title: "Live Traders",
      value: "89,234",
      change: "+8.7%",
      icon: TrendingUp,
      color: "text-orange-500",
      category: "traders",
    },
  ]

  const assetCategories = [
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: ImageIcon,
      count: "12,847",
      volume: "$89.2B",
      change: "+15.3%",
      color: "from-orange-500 to-yellow-500",
    },
    {
      id: "nft",
      name: "NFTs",
      icon: ImageIcon,
      count: "8,923",
      volume: "$12.4B",
      change: "+8.9%",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "rwa",
      name: "Real World Assets",
      icon: Building,
      count: "2,156",
      volume: "$45.7B",
      change: "+22.1%",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "etf",
      name: "ETFs",
      icon: BarChart3,
      count: "1,847",
      volume: "$67.8B",
      change: "+6.4%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "qgi",
      name: "Quantum Growth",
      icon: Zap,
      count: "456",
      volume: "$23.9B",
      change: "+31.7%",
      color: "from-indigo-500 to-purple-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Real-Time Analytics Marketplace
            </h1>
            <p className="text-xl text-slate-400 mt-2">Live analytics for QGI, RWA, ETF, NFT, and Crypto assets</p>
            {lastUpdated && (
              <p className="text-sm text-slate-500 mt-1">Last updated: {lastUpdated.toLocaleTimeString()}</p>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="realtime" checked={isRealTime} onCheckedChange={setIsRealTime} />
              <Label htmlFor="realtime" className="text-slate-300">
                Real-time
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="hologram" checked={hologramMode} onCheckedChange={setHologramMode} />
              <Label htmlFor="hologram" className="text-slate-300">
                Hologram
              </Label>
            </div>
            <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search assets, symbols, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1h">1 Hour</SelectItem>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="bg-slate-800/50 border-slate-700">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketStats.map((stat, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50 ${
                hologramMode ? "shadow-lg shadow-cyan-500/10" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className={`text-sm ${stat.color} flex items-center gap-1`}>
                      {stat.change.startsWith("+") ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : (
                        <TrendingDown className="h-3 w-3" />
                      )}
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${stat.color.replace("text-", "from-")}/20 to-transparent`}
                  >
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Asset Categories Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {assetCategories.map((category) => (
            <Card
              key={category.id}
              className={`bg-gradient-to-br ${category.color}/10 to-slate-900/80 backdrop-blur-sm border-slate-700/50 cursor-pointer hover:scale-105 transition-all duration-200 ${
                hologramMode ? "shadow-lg shadow-cyan-500/5" : ""
              }`}
              onClick={() => setActiveTab(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <category.icon
                    className={`h-6 w-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                  />
                  <Badge className={`bg-gradient-to-r ${category.color} text-white text-xs`}>{category.change}</Badge>
                </div>
                <h3 className="font-semibold text-white text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-slate-400 mb-2">{category.count} assets</p>
                <p className="text-lg font-bold text-white">{category.volume}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-slate-800/50">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="crypto" className="data-[state=active]:bg-orange-600">
              Crypto
            </TabsTrigger>
            <TabsTrigger value="nft" className="data-[state=active]:bg-purple-600">
              NFTs
            </TabsTrigger>
            <TabsTrigger value="rwa" className="data-[state=active]:bg-green-600">
              RWA
            </TabsTrigger>
            <TabsTrigger value="etf" className="data-[state=active]:bg-blue-600">
              ETFs
            </TabsTrigger>
            <TabsTrigger value="qgi" className="data-[state=active]:bg-indigo-600">
              QGI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <HolographicDataVisualization
                title="Market Overview"
                data={[
                  { name: "Crypto", value: 89200000000 },
                  { name: "RWA", value: 45700000000 },
                  { name: "ETF", value: 67800000000 },
                  { name: "QGI", value: 23900000000 },
                  { name: "NFT", value: 12400000000 },
                ]}
                type="pie"
                hologramEnabled={hologramMode}
                realTime={isRealTime}
              />
              <HolographicDataVisualization
                title="24h Volume Trends"
                data={[
                  { name: "00:00", value: 45000 },
                  { name: "04:00", value: 52000 },
                  { name: "08:00", value: 67000 },
                  { name: "12:00", value: 89000 },
                  { name: "16:00", value: 78000 },
                  { name: "20:00", value: 94000 },
                ]}
                type="area"
                hologramEnabled={hologramMode}
                realTime={isRealTime}
              />
            </div>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-6">
            <CryptoAnalytics hologramMode={hologramMode} realTime={isRealTime} timeframe={selectedTimeframe} />
          </TabsContent>

          <TabsContent value="nft" className="space-y-6">
            <NFTAnalytics hologramMode={hologramMode} realTime={isRealTime} timeframe={selectedTimeframe} />
          </TabsContent>

          <TabsContent value="rwa" className="space-y-6">
            <RWAAnalytics hologramMode={hologramMode} realTime={isRealTime} timeframe={selectedTimeframe} />
          </TabsContent>

          <TabsContent value="etf" className="space-y-6">
            <ETFAnalytics hologramMode={hologramMode} realTime={isRealTime} timeframe={selectedTimeframe} />
          </TabsContent>

          <TabsContent value="qgi" className="space-y-6">
            <QGIAnalytics hologramMode={hologramMode} realTime={isRealTime} timeframe={selectedTimeframe} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
