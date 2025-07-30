"use client"

import { useState, useEffect, useCallback } from "react"

interface MarketDataPoint {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  marketCap: string
}

interface HistoricalDataPoint {
  name: string
  BTC: number
  ETH: number
  SOL: number
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
  time: string
  price: number
  amount: number
  type: "buy" | "sell"
}

interface DaxMarketData {
  currentMarketData: MarketDataPoint[]
  historicalData: HistoricalDataPoint[]
  orderBook: OrderBook
  recentTrades: RecentTrade[]
  timestamp: string
}

export function useDaxMarketData() {
  const [data, setData] = useState<DaxMarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      const response = await fetch("/api/dax/market-data")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const marketData: DaxMarketData = await response.json()
      setData(marketData)
    } catch (err: any) {
      setError(err.message || "Failed to fetch market data")
      console.error("Error fetching market data:", err)
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

    // Set up polling for real-time updates every 5 seconds
    const interval = setInterval(fetchData, 5000)

    return () => clearInterval(interval)
  }, [fetchData])

  return {
    data,
    loading,
    error,
    refetch,
  }
}
