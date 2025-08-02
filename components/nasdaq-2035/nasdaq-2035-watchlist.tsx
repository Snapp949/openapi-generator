"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Star, Plus, X, Search, Bell, Target } from "lucide-react"

interface WatchlistProps {
  selectedSymbol: string
  onSymbolSelect: (symbol: string) => void
  eliteMode: boolean
}

interface WatchlistItem {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: string
  pe: number
  isAlerted: boolean
}

export function Nasdaq2035Watchlist({ selectedSymbol, onSymbolSelect, eliteMode }: WatchlistProps) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([
    {
      symbol: "DAX",
      name: "DAX 40 Index",
      price: 17234.56,
      change: 45.67,
      changePercent: 0.27,
      volume: 2450000,
      marketCap: "1.84T",
      pe: 14.2,
      isAlerted: false,
    },
    {
      symbol: "SAP",
      name: "SAP SE",
      price: 134.56,
      change: 8.92,
      changePercent: 7.1,
      volume: 2500000,
      marketCap: "165B",
      pe: 18.5,
      isAlerted: true,
    },
    {
      symbol: "SIE",
      name: "Siemens AG",
      price: 156.78,
      change: 12.34,
      changePercent: 8.5,
      volume: 3200000,
      marketCap: "125B",
      pe: 16.3,
      isAlerted: false,
    },
    {
      symbol: "ASML",
      name: "ASML Holding",
      price: 678.9,
      change: -23.45,
      changePercent: -3.3,
      volume: 1800000,
      marketCap: "280B",
      pe: 22.1,
      isAlerted: false,
    },
    {
      symbol: "ALV",
      name: "Allianz SE",
      price: 245.67,
      change: 15.89,
      changePercent: 6.9,
      volume: 1900000,
      marketCap: "98B",
      pe: 12.8,
      isAlerted: true,
    },
  ])

  const [newSymbol, setNewSymbol] = useState("")
  const [sortBy, setSortBy] = useState<"symbol" | "change" | "volume">("symbol")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  // Real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWatchlist((prev) =>
        prev.map((item) => ({
          ...item,
          price: item.price + (Math.random() - 0.5) * (item.price * 0.001),
          change: item.change + (Math.random() - 0.5) * 2,
          changePercent: item.changePercent + (Math.random() - 0.5) * 0.1,
          volume: item.volume + Math.floor((Math.random() - 0.5) * 10000),
        })),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const addToWatchlist = () => {
    if (newSymbol && !watchlist.find((item) => item.symbol === newSymbol.toUpperCase())) {
      const newItem: WatchlistItem = {
        symbol: newSymbol.toUpperCase(),
        name: `${newSymbol.toUpperCase()} Corp`,
        price: Math.random() * 1000 + 50,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 10,
        volume: Math.floor(Math.random() * 5000000 + 100000),
        marketCap: `${Math.floor(Math.random() * 500 + 10)}B`,
        pe: Math.random() * 30 + 5,
        isAlerted: false,
      }
      setWatchlist((prev) => [...prev, newItem])
      setNewSymbol("")
    }
  }

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol))
  }

  const toggleAlert = (symbol: string) => {
    setWatchlist((prev) =>
      prev.map((item) => (item.symbol === symbol ? { ...item, isAlerted: !item.isAlerted } : item)),
    )
  }

  const sortedWatchlist = [...watchlist].sort((a, b) => {
    let aVal: any = a[sortBy]
    let bVal: any = b[sortBy]

    if (sortBy === "change") {
      aVal = a.changePercent
      bVal = b.changePercent
    }

    if (typeof aVal === "string") {
      return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
    }

    return sortOrder === "asc" ? aVal - bVal : bVal - aVal
  })

  return (
    <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            Elite Watchlist
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">{watchlist.length} symbols</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Symbol */}
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Add symbol..."
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addToWatchlist()}
              className="pl-9 bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400"
            />
          </div>
          <Button onClick={addToWatchlist} size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-slate-400">Sort by:</span>
          {["symbol", "change", "volume"].map((sort) => (
            <Button
              key={sort}
              variant={sortBy === sort ? "default" : "ghost"}
              size="sm"
              onClick={() => {
                if (sortBy === sort) {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                } else {
                  setSortBy(sort as any)
                  setSortOrder("desc")
                }
              }}
              className={
                sortBy === sort
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }
            >
              {sort.charAt(0).toUpperCase() + sort.slice(1)}
              {sortBy === sort && <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>}
            </Button>
          ))}
        </div>

        {/* Watchlist Items */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {sortedWatchlist.map((item) => (
            <div
              key={item.symbol}
              className={`p-3 rounded-lg border transition-all cursor-pointer ${
                selectedSymbol === item.symbol
                  ? "bg-blue-500/20 border-blue-500/50"
                  : "bg-slate-800/30 border-slate-700/30 hover:bg-slate-700/30"
              }`}
              onClick={() => onSymbolSelect(item.symbol)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">{item.symbol}</span>
                  {item.isAlerted && <Bell className="w-3 h-3 text-yellow-400" />}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleAlert(item.symbol)
                    }}
                    className="p-1 h-6 w-6 hover:bg-slate-600"
                  >
                    <Bell className={`w-3 h-3 ${item.isAlerted ? "text-yellow-400" : "text-slate-400"}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFromWatchlist(item.symbol)
                    }}
                    className="p-1 h-6 w-6 hover:bg-slate-600 text-slate-400 hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              <div className="text-xs text-slate-400 mb-2">{item.name}</div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-mono text-white font-semibold">€{item.price.toFixed(2)}</div>
                  <div
                    className={`text-sm flex items-center ${
                      item.changePercent >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {item.changePercent >= 0 ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {item.changePercent >= 0 ? "+" : ""}
                    {item.changePercent.toFixed(2)}%
                  </div>
                </div>

                {eliteMode && (
                  <div className="text-right text-xs">
                    <div className="text-slate-400">Vol: {(item.volume / 1000000).toFixed(1)}M</div>
                    <div className="text-slate-400">P/E: {item.pe.toFixed(1)}</div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Watchlist Actions */}
        {eliteMode && (
          <div className="pt-4 border-t border-slate-700/30">
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <Target className="w-4 h-4 mr-2" />
                Set Alerts
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Analyze
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
