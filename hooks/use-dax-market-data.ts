"use client"

import { useState, useEffect, useCallback } from "react"

interface MarketDataPoint {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  marketCap: string
  high24h: number
  low24h: number
  priceChange24h: number
}

interface HistoricalDataPoint {
  name: string
  timestamp: number
  BTC: number
  ETH: number
  SOL: number
  ADA: number
  MATIC: number
  DOT: number
}

interface OrderBookEntry {
  price: number
  amount: number
  total: number
}

interface OrderBook {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
}

interface RecentTrade {
  id: string
  time: string
  timestamp: number
  price: number
  amount: number
  type: "buy" | "sell"
  total: number
}

interface MarketStats {
  totalMarketCap: string
  totalVolume24h: string
  defiTvl: string
  btcDominance: number
  fearGreedIndex: number
  activeTraders: number
}

interface DaxMarketData {
  currentMarketData: MarketDataPoint[]
  historicalData: HistoricalDataPoint[]
  orderBook: OrderBook
  recentTrades: RecentTrade[]
  marketStats: MarketStats
  timestamp: string
}

interface UseDaxMarketDataReturn {
  data: DaxMarketData | null
  loading: boolean
  error: string | null
  refetch: () => void
  lastUpdated: Date | null
}

export function useDaxMarketData(refreshInterval = 5000): UseDaxMarketDataReturn {
  const [data, setData] = useState<DaxMarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch("/api/dax/market-data", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setData(result)
        setLastUpdated(new Date())
      } else {
        throw new Error(result.error || "Failed to fetch market data")
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch market data")
      console.error("Market data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const refetch = useCallback(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()

    // Set up polling for real-time updates
    const interval = setInterval(fetchData, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchData, refreshInterval])

  return {
    data,
    loading,
    error,
    refetch,
    lastUpdated,
  }
}
