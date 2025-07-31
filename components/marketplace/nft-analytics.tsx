"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, ImageIcon, Activity, DollarSign, Users } from "lucide-react"
import { HolographicDataVisualization } from "@/components/ui/holographic-data-visualization"

interface NFTAnalyticsProps {
  hologramMode: boolean
  realTime: boolean
  timeframe: string
}

export function NFTAnalytics({ hologramMode, realTime, timeframe }: NFTAnalyticsProps) {
  const [nftData, setNftData] = useState([
    {
      collection: "Bored Ape Yacht Club",
      symbol: "BAYC",
      floorPrice: 45.2,
      change: 8.5,
      volume: "1,247 ETH",
      sales: 89,
      owners: 5847,
      totalSupply: 10000,
    },
    {
      collection: "CryptoPunks",
      symbol: "PUNK",
      floorPrice: 89.7,
      change: -3.2,
      volume: "892 ETH",
      sales: 23,
      owners: 3421,
      totalSupply: 10000,
    },
    {
      collection: "Azuki",
      symbol: "AZUKI",
      floorPrice: 12.4,
      change: 15.7,
      volume: "2,156 ETH",
      sales: 234,
      owners: 4892,
      totalSupply: 10000,
    },
    {
      collection: "Mutant Ape Yacht Club",
      symbol: "MAYC",
      floorPrice: 8.9,
      change: 5.3,
      volume: "1,789 ETH",
      sales: 156,
      owners: 7234,
      totalSupply: 19423,
    },
    {
      collection: "Doodles",
      symbol: "DOODLE",
      floorPrice: 6.7,
      change: -8.1,
      volume: "567 ETH",
      sales: 78,
      owners: 4567,
      totalSupply: 10000,
    },
  ])

  const [volumeHistory, setVolumeHistory] = useState([
    { name: "Mon", BAYC: 1200, PUNK: 800, AZUKI: 2100, MAYC: 1700, DOODLE: 500 },
    { name: "Tue", BAYC: 1350, PUNK: 750, AZUKI: 2300, MAYC: 1850, DOODLE: 480 },
    { name: "Wed", BAYC: 1180, PUNK: 920, AZUKI: 2000, MAYC: 1650, DOODLE: 620 },
    { name: "Thu", BAYC: 1420, PUNK: 680, AZUKI: 2450, MAYC: 1920, DOODLE: 540 },
    { name: "Fri", BAYC: 1290, PUNK: 890, AZUKI: 2200, MAYC: 1780, DOODLE: 580 },
    { name: "Sat", BAYC: 1247, PUNK: 892, AZUKI: 2156, MAYC: 1789, DOODLE: 567 },
  ])

  useEffect(() => {
    if (realTime) {
      const interval = setInterval(() => {
        setNftData((prev) =>
          prev.map((nft) => ({
            ...nft,
            floorPrice: nft.floorPrice * (1 + (Math.random() - 0.5) * 0.05),
            change: nft.change + (Math.random() - 0.5) * 3,
            sales: nft.sales + Math.floor((Math.random() - 0.5) * 10),
          })),
        )
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [realTime])

  const totalVolume = nftData.reduce((sum, nft) => {
    return sum + Number.parseFloat(nft.volume.replace(/[, ETH]/g, ""))
  }, 0)

  return (
    <div className="space-y-6">
      {/* NFT Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20 ${hologramMode ? "shadow-lg shadow-purple-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-200">Total Volume</p>
                <p className="text-2xl font-bold text-white">{totalVolume.toFixed(0)} ETH</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.4%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm border-pink-500/20 ${hologramMode ? "shadow-lg shadow-pink-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-pink-200">24h Sales</p>
                <p className="text-2xl font-bold text-white">1,247</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8.9%
                </p>
              </div>
              <Activity className="h-8 w-8 text-pink-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border-indigo-500/20 ${hologramMode ? "shadow-lg shadow-indigo-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Active Collections</p>
                <p className="text-2xl font-bold text-white">8,923</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +5.7%
                </p>
              </div>
              <ImageIcon className="h-8 w-8 text-indigo-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-cyan-500/20 ${hologramMode ? "shadow-lg shadow-cyan-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-200">Unique Owners</p>
                <p className="text-2xl font-bold text-white">234K</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +3.2%
                </p>
              </div>
              <Users className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="collections" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="rarity">Rarity</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>

        <TabsContent value="collections" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicDataVisualization
              title="Floor Price Trends"
              data={nftData.map((nft) => ({
                name: nft.symbol,
                value: nft.floorPrice,
              }))}
              type="bar"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
            <HolographicDataVisualization
              title="Volume Distribution"
              data={nftData.map((nft) => ({
                name: nft.symbol,
                value: Number.parseFloat(nft.volume.replace(/[, ETH]/g, "")),
              }))}
              type="pie"
              hologramEnabled={hologramMode}
            />
          </div>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Top NFT Collections</CardTitle>
              <CardDescription className="text-slate-400">Real-time NFT collection analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Collection</TableHead>
                    <TableHead className="text-slate-300">Floor Price</TableHead>
                    <TableHead className="text-slate-300">24h Change</TableHead>
                    <TableHead className="text-slate-300">Volume</TableHead>
                    <TableHead className="text-slate-300">Sales</TableHead>
                    <TableHead className="text-slate-300">Owners</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {nftData.map((nft, index) => (
                    <TableRow key={nft.symbol} className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                            <span className="text-xs font-bold text-white">{index + 1}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">{nft.collection}</div>
                            <div className="text-slate-400 text-sm">{nft.symbol}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-mono">{nft.floorPrice.toFixed(2)} ETH</TableCell>
                      <TableCell>
                        <Badge
                          variant={nft.change >= 0 ? "default" : "destructive"}
                          className={nft.change >= 0 ? "bg-green-600" : "bg-red-600"}
                        >
                          {nft.change >= 0 ? "+" : ""}
                          {nft.change.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{nft.volume}</TableCell>
                      <TableCell className="text-slate-300">{nft.sales}</TableCell>
                      <TableCell className="text-slate-300">{nft.owners.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <HolographicDataVisualization
              title="Weekly Volume Trends"
              data={volumeHistory}
              type="line"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Trending Collections</CardTitle>
                  <CardDescription className="text-slate-400">Most active collections in the last 24h</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Pudgy Penguins", change: "+45.2%", volume: "892 ETH" },
                    { name: "Art Blocks", change: "+32.1%", volume: "567 ETH" },
                    { name: "World of Women", change: "+28.9%", volume: "423 ETH" },
                    { name: "Cool Cats", change: "+24.7%", volume: "389 ETH" },
                  ].map((collection, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </div>
                        <div className="text-white font-medium">{collection.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-medium">{collection.change}</div>
                        <div className="text-slate-400 text-sm">{collection.volume}</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Market Sentiment</CardTitle>
                  <CardDescription className="text-slate-400">
                    NFT market indicators and sentiment analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Market Sentiment</span>
                    <Badge className="bg-green-600">Bullish</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Whale Activity</span>
                    <Badge className="bg-yellow-600">High</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">New Listings</span>
                    <Badge className="bg-blue-600">+15.2%</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Floor Stability</span>
                    <Badge className="bg-purple-600">Stable</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rarity" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicDataVisualization
              title="Rarity Distribution"
              data={[
                { name: "Common", value: 6500 },
                { name: "Uncommon", value: 2000 },
                { name: "Rare", value: 1200 },
                { name: "Epic", value: 250 },
                { name: "Legendary", value: 50 },
              ]}
              type="pie"
              hologramEnabled={hologramMode}
            />
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Rarity Rankings</CardTitle>
                <CardDescription className="text-slate-400">Most valuable traits and attributes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { trait: "Golden Fur", rarity: "0.1%", premium: "15.2x" },
                  { trait: "Laser Eyes", rarity: "0.3%", premium: "12.8x" },
                  { trait: "Crown", rarity: "0.5%", premium: "8.9x" },
                  { trait: "Diamond Teeth", rarity: "0.8%", premium: "6.7x" },
                  { trait: "Rainbow Background", rarity: "1.2%", premium: "4.5x" },
                ].map((trait, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                    <div>
                      <div className="text-white font-medium">{trait.trait}</div>
                      <div className="text-slate-400 text-sm">{trait.rarity} rarity</div>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-400 font-medium">{trait.premium}</div>
                      <div className="text-slate-400 text-sm">floor premium</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="marketplace" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Live Marketplace Activity</CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time NFT sales and listings across major marketplaces
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    collection: "Bored Ape #7234",
                    price: "45.2 ETH",
                    marketplace: "OpenSea",
                    type: "Sale",
                    time: "2m ago",
                  },
                  {
                    collection: "CryptoPunk #1234",
                    price: "89.7 ETH",
                    marketplace: "LooksRare",
                    type: "Listing",
                    time: "5m ago",
                  },
                  {
                    collection: "Azuki #5678",
                    price: "12.4 ETH",
                    marketplace: "X2Y2",
                    type: "Sale",
                    time: "8m ago",
                  },
                  {
                    collection: "Mutant Ape #9876",
                    price: "8.9 ETH",
                    marketplace: "OpenSea",
                    type: "Offer",
                    time: "12m ago",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{activity.collection}</div>
                        <div className="text-slate-400 text-sm">
                          {activity.marketplace} • {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{activity.price}</div>
                      <Badge
                        variant={
                          activity.type === "Sale" ? "default" : activity.type === "Listing" ? "secondary" : "outline"
                        }
                        className={
                          activity.type === "Sale"
                            ? "bg-green-600"
                            : activity.type === "Listing"
                              ? "bg-blue-600"
                              : "bg-yellow-600"
                        }
                      >
                        {activity.type}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-slate-400">NFT marketplace tools and utilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Browse Collections
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-white hover:bg-slate-700 bg-transparent"
                >
                  <Activity className="w-4 h-4 mr-2" />
                  Set Price Alerts
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-white hover:bg-slate-700 bg-transparent"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Portfolio Tracker
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-700 text-white hover:bg-slate-700 bg-transparent"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Whale Tracker
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
