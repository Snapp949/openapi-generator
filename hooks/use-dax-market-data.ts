"use client"

import { useState, useEffect, useCallback } from "react"

interface MarketData {
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
  [key: string]: string | number // For dynamic access
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
  historicalData: HistoricalDataPoint[]
  currentMarketData: MarketData[]
  orderBook: OrderBook
  recentTrades: RecentTrade[]
}

export function useDaxMarketData() {
  const [data, setData] = useState<DaxMarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch("/api/dax/market-data")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result: DaxMarketData = await response.json()
      setData(result)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 15000) // Refresh every 15 seconds
    return () => clearInterval(interval)
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
