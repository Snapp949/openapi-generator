"use client"

import { useState, useEffect, useCallback } from "react"

interface MarketData {
  symbol: string
  price: string
  change: string
  volume: string
  marketCap: string
  high24h: string
  low24h: string
  timestamp: number
}

interface UseMarketDataReturn {
  data: MarketData[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useDaxMarketData(refreshInterval = 5000): UseMarketDataReturn {
  const [data, setData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("/api/dax/market-data")
      const result = await response.json()

      if (result.success) {
        setData(result.data)
        setError(null)
      } else {
        setError(result.error || "Failed to fetch data")
      }
    } catch (err) {
      setError("Network error occurred")
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

    const interval = setInterval(fetchData, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchData, refreshInterval])

  return { data, loading, error, refetch }
}
