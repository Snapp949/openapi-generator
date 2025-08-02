"use client"

import { useState, useEffect, useCallback } from "react"

interface MarketDataPoint {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface OrderBookEntry {
  price: number
  size: number
  orders: number
  timestamp: number
}

interface OrderBook {
  bids: OrderBookEntry[]
  asks: OrderBookEntry[]
  spread: number
  midPrice: number
}

interface TopMover {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
}

interface Nasdaq2035MarketData {
  chartData: MarketDataPoint[]
  orderBook: OrderBook
  topMovers: TopMover[]
  currentPrice: number
  dayChange: number
  dayChangePercent: number
  volume: number
  marketCap: number
  timestamp: number
}

interface UseNasdaq2035MarketDataReturn {
  data: Nasdaq2035MarketData | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  connectionStatus: "connected" | "connecting" | "disconnected"
  latency: number
}

export function useNasdaq2035MarketData(symbol = "DAX", updateInterval = 1000): UseNasdaq2035MarketDataReturn {
  const [data, setData] = useState<Nasdaq2035MarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connecting")
  const [latency, setLatency] = useState(0)

  // Generate realistic market data
  const generateMarketData = useCallback((): Nasdaq2035MarketData => {
    const now = Date.now()
    const basePrice = 17234.56

    // Generate 24 hours of minute data
    const chartData: MarketDataPoint[] = []
    let currentPrice = basePrice

    for (let i = 1440; i >= 0; i--) {
      const timestamp = now - i * 60 * 1000
      const volatility = 0.002 // 0.2% volatility per minute
      const change = (Math.random() - 0.5) * 2 * volatility

      const open = currentPrice
      const close = currentPrice * (1 + change)
      const high = Math.max(open, close) * (1 + Math.random() * 0.001)
      const low = Math.min(open, close) * (1 - Math.random() * 0.001)
      const volume = Math.floor(Math.random() * 1000000 + 500000)

      chartData.push({
        timestamp,
        open,
        high,
        low,
        close,
        volume,
      })

      currentPrice = close
    }

    // Generate order book with 20 levels each side
    const bids: OrderBookEntry[] = []
    const asks: OrderBookEntry[] = []
    const midPrice = currentPrice

    for (let i = 0; i < 20; i++) {
      // Bids (buy orders) below current price
      const bidPrice = midPrice - (i + 1) * (0.01 + Math.random() * 0.05)
      bids.push({
        price: Number(bidPrice.toFixed(2)),
        size: Math.floor(Math.random() * 10000 + 1000),
        orders: Math.floor(Math.random() * 50 + 5),
        timestamp: now,
      })

      // Asks (sell orders) above current price
      const askPrice = midPrice + (i + 1) * (0.01 + Math.random() * 0.05)
      asks.push({
        price: Number(askPrice.toFixed(2)),
        size: Math.floor(Math.random() * 10000 + 1000),
        orders: Math.floor(Math.random() * 50 + 5),
        timestamp: now,
      })
    }

    const spread = asks[0].price - bids[0].price

    // Generate top movers
    const topMovers: TopMover[] = [
      { symbol: "SAP", name: "SAP SE", price: 134.56, change: 8.92, changePercent: 7.1, volume: 2500000 },
      { symbol: "ASML", name: "ASML Holding", price: 678.9, change: -23.45, changePercent: -3.3, volume: 1800000 },
      { symbol: "SIE", name: "Siemens AG", price: 156.78, change: 12.34, changePercent: 8.5, volume: 3200000 },
      { symbol: "DTE", name: "Deutsche Telekom", price: 23.45, change: -1.23, changePercent: -5.0, volume: 4100000 },
      { symbol: "ALV", name: "Allianz SE", price: 245.67, change: 15.89, changePercent: 6.9, volume: 1900000 },
      { symbol: "BAS", name: "BASF SE", price: 45.23, change: -2.34, changePercent: -4.9, volume: 2800000 },
    ].map((mover) => ({
      ...mover,
      price: mover.price * (1 + (Math.random() - 0.5) * 0.02),
      change: mover.change + (Math.random() - 0.5) * 2,
      changePercent: mover.changePercent + (Math.random() - 0.5) * 1,
      volume: mover.volume + Math.floor((Math.random() - 0.5) * 500000),
    }))

    const dayChange = currentPrice - basePrice
    const dayChangePercent = (dayChange / basePrice) * 100

    return {
      chartData,
      orderBook: {
        bids,
        asks,
        spread,
        midPrice,
      },
      topMovers,
      currentPrice,
      dayChange,
      dayChangePercent,
      volume: chartData.reduce((sum, point) => sum + point.volume, 0),
      marketCap: currentPrice * 1000000000, // Simplified market cap calculation
      timestamp: now,
    }
  }, [])

  const fetchData = useCallback(async () => {
    const startTime = Date.now()

    try {
      setConnectionStatus("connecting")
      setError(null)

      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, Math.random() * 50 + 10))

      const marketData = generateMarketData()
      setData(marketData)
      setLastUpdated(new Date())
      setConnectionStatus("connected")

      const endTime = Date.now()
      setLatency(endTime - startTime)
    } catch (err: any) {
      setError(err.message || "Failed to fetch market data")
      setConnectionStatus("disconnected")
      console.error("Market data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [generateMarketData])

  // Real-time updates with WebSocket simulation
  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      if (connectionStatus === "connected") {
        fetchData()
      }
    }, updateInterval)

    return () => clearInterval(interval)
  }, [fetchData, updateInterval, connectionStatus])

  // Simulate connection recovery
  useEffect(() => {
    if (connectionStatus === "disconnected") {
      const reconnectTimer = setTimeout(() => {
        setConnectionStatus("connecting")
        fetchData()
      }, 5000)

      return () => clearTimeout(reconnectTimer)
    }
  }, [connectionStatus, fetchData])

  return {
    data,
    loading,
    error,
    lastUpdated,
    connectionStatus,
    latency,
  }
}
