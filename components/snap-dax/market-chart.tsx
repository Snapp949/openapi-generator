"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { useDaxMarketData } from "@/hooks/use-dax-market-data"

interface ChartData {
  time: string
  price: number
  volume: number
}

export function MarketChart() {
  const { data, loading, error } = useDaxMarketData()
  const [selectedSymbol, setSelectedSymbol] = useState("BTC")
  const [timeframe, setTimeframe] = useState("1H")
  const [chartData, setChartData] = useState<ChartData[]>([])

  // Generate mock chart data
  useEffect(() => {
    const generateChartData = () => {
      const points = 50
      const mockData: ChartData[] = []
      const basePrice = selectedSymbol === "BTC" ? 43000 : selectedSymbol === "ETH" ? 2600 : 100

      for (let i = 0; i < points; i++) {
        const time = new Date(Date.now() - (points - i) * 60000).toLocaleTimeString()
        const variation = (Math.random() - 0.5) * 0.02
        const price = basePrice * (1 + variation * (i / points))
        const volume = Math.random() * 1000000

        mockData.push({ time, price, volume })
      }

      setChartData(mockData)
    }

    generateChartData()
    const interval = setInterval(generateChartData, 5000)
    return () => clearInterval(interval)
  }, [selectedSymbol])

  const selectedData = data.find((item) => item.symbol === selectedSymbol)
  const isPositive = selectedData ? Number.parseFloat(selectedData.change) > 0 : false

  if (loading) {
    return (
      <Card className="bg-black/40 border-cyan-500/20">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-cyan-500/20 rounded w-1/4"></div>
            <div className="h-64 bg-cyan-500/10 rounded"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-black/40 border-red-500/20">
        <CardContent className="p-6 text-center">
          <p className="text-red-400">Error loading chart data: {error}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-black/40 border-cyan-500/20 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-cyan-400 flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Market Chart
            </CardTitle>
            <div className="flex gap-2">
              {data.slice(0, 4).map((item) => (
                <Button
                  key={item.symbol}
                  variant={selectedSymbol === item.symbol ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSymbol(item.symbol)}
                  className={
                    selectedSymbol === item.symbol
                      ? "bg-cyan-500 text-black"
                      : "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  }
                >
                  {item.symbol}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            {["1H", "4H", "1D", "1W"].map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className={
                  timeframe === tf ? "bg-blue-500 text-white" : "border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                }
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>

        {selectedData && (
          <div className="flex items-center gap-4 mt-4">
            <div className="text-2xl font-bold text-white">
              ${Number.parseFloat(selectedData.price).toLocaleString()}
            </div>
            <Badge
              variant={isPositive ? "default" : "destructive"}
              className={
                isPositive
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-red-500/20 text-red-400 border-red-500/30"
              }
            >
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {selectedData.change}%
            </Badge>
            <div className="text-sm text-gray-400">Vol: ${Number.parseInt(selectedData.volume).toLocaleString()}</div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="h-64 relative">
          {/* Simple SVG Chart */}
          <svg className="w-full h-full" viewBox="0 0 800 200">
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(34, 197, 94)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(34, 197, 94)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 50}
                x2="800"
                y2={i * 50}
                stroke="rgb(34, 197, 94)"
                strokeOpacity="0.1"
                strokeWidth="1"
              />
            ))}

            {/* Chart line */}
            {chartData.length > 1 && (
              <>
                <path
                  d={`M ${chartData
                    .map(
                      (point, index) =>
                        `${(index / (chartData.length - 1)) * 800},${200 - (point.price / Math.max(...chartData.map((p) => p.price))) * 180}`,
                    )
                    .join(" L ")}`}
                  fill="url(#chartGradient)"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="2"
                  fillOpacity="0.3"
                />
                <path
                  d={`M ${chartData
                    .map(
                      (point, index) =>
                        `${(index / (chartData.length - 1)) * 800},${200 - (point.price / Math.max(...chartData.map((p) => p.price))) * 180}`,
                    )
                    .join(" L ")}`}
                  fill="none"
                  stroke="rgb(34, 197, 94)"
                  strokeWidth="2"
                />
              </>
            )}
          </svg>

          {/* Chart overlay info */}
          <div className="absolute top-4 right-4 bg-black/60 rounded-lg p-3 text-sm">
            <div className="text-gray-400">24h Range</div>
            <div className="text-white">
              ${selectedData?.low24h} - ${selectedData?.high24h}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
