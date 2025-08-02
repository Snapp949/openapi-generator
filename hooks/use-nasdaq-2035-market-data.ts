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

export function useNasdaq2035MarketData(symbol = "DAX", updateInterval = 500): UseNasdaq2035MarketDataReturn {
  const [data, setData] = useState<Nasdaq2035MarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "disconnected">("connecting")
  const [latency, setLatency] = useState(0)

  // Generate realistic market data with enhanced volatility patterns
  const generateMarketData = useCallback((): Nasdaq2035MarketData => {
    const now = Date.now()
    const basePrice = symbol === "DAX" ? 17234.56 : symbol === "MDAX" ? 26789.12 : 13456.78

    // Generate intraday data (390 minutes of trading)
    const chartData: MarketDataPoint[] = []
    let currentPrice = basePrice

    for (let i = 390; i >= 0; i--) {
      const timestamp = now - i * 60 * 1000
      const hour = new Date(timestamp).getHours()

      // Market volatility patterns - higher at open/close
      let volatility = 0.0008 // Base volatility
      if (hour === 9 || hour === 15) volatility *= 2.5 // Opening/closing volatility
      if (hour >= 11 && hour <= 14) volatility *= 0.7 // Lunch lull

      const change = (Math.random() - 0.5) * 2 * volatility
      const open = currentPrice
      const close = currentPrice * (1 + change)
      const high = Math.max(open, close) * (1 + Math.random() * 0.0003)
      const low = Math.min(open, close) * (1 - Math.random() * 0.0003)
      const volume = Math.floor(Math.random() * 2000000 + 500000)

      chartData.push({
        timestamp,
        open: Number(open.toFixed(2)),
        high: Number(high.toFixed(2)),
        low: Number(low.toFixed(2)),
        close: Number(close.toFixed(2)),
        volume,
      })

      currentPrice = close
    }

    // Generate realistic order book with 25 levels each side
    const bids: OrderBookEntry[] = []
    const asks: OrderBookEntry[] = []
    const midPrice = currentPrice

    for (let i = 0; i < 25; i++) {
      // Bids - exponentially decreasing size as we go deeper
      const bidPrice = midPrice - (i + 1) * (0.01 + Math.random() * 0.02)
      const bidSize = Math.floor((Math.random() * 8000 + 2000) * Math.exp(-i * 0.1))
      bids.push({
        price: Number(bidPrice.toFixed(2)),
        size: bidSize,
        orders: Math.floor(Math.random() * 25 + 5),
        timestamp: now,
      })

      // Asks - similar pattern
      const askPrice = midPrice + (i + 1) * (0.01 + Math.random() * 0.02)
      const askSize = Math.floor((Math.random() * 8000 + 2000) * Math.exp(-i * 0.1))
      asks.push({
        price: Number(askPrice.toFixed(2)),
        size: askSize,
        orders: Math.floor(Math.random() * 25 + 5),
        timestamp: now,
      })
    }

    const spread = asks[0].price - bids[0].price

    // Generate dynamic top movers
    const topMovers: TopMover[] = [
      { symbol: "SAP", name: "SAP SE", price: 134.56, change: 8.92, changePercent: 7.1, volume: 2500000 },
      { symbol: "ASML", name: "ASML Holding", price: 678.9, change: -23.45, changePercent: -3.3, volume: 1800000 },
      { symbol: "SIE", name: "Siemens AG", price: 156.78, change: 12.34, changePercent: 8.5, volume: 3200000 },
      { symbol: "DTE", name: "Deutsche Telekom", price: 23.45, change: -1.23, changePercent: -5.0, volume: 4100000 },
      { symbol: "ALV", name: "Allianz SE", price: 245.67, change: 15.89, changePercent: 6.9, volume: 1900000 },
      { symbol: "BAS", name: "BASF SE", price: 45.23, change: -2.34, changePercent: -4.9, volume: 2800000 },
      { symbol: "BMW", name: "BMW AG", price: 89.45, change: 4.56, changePercent: 5.4, volume: 2100000 },
      { symbol: "MRK", name: "Merck KGaA", price: 167.89, change: -8.12, changePercent: -4.6, volume: 1600000 },
    ].map((mover) => ({
      ...mover,
      price: mover.price * (1 + (Math.random() - 0.5) * 0.01),
      change: mover.change + (Math.random() - 0.5) * 1.5,
      changePercent: mover.changePercent + (Math.random() - 0.5) * 0.8,
      volume: mover.volume + Math.floor((Math.random() - 0.5) * 300000),
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
      marketCap: currentPrice * 1000000000,
      timestamp: now,
    }
  }, [symbol])

  const fetchData = useCallback(async () => {
    const startTime = Date.now()

    try {
      setConnectionStatus("connecting")
      setError(null)

      // Simulate realistic network latency (10-100ms)
      const networkLatency = Math.random() * 90 + 10
      await new Promise((resolve) => setTimeout(resolve, networkLatency))

      const marketData = generateMarketData()
      setData(marketData)
      setLastUpdated(new Date())
      setConnectionStatus("connected")

      const endTime = Date.now()
      setLatency(Math.round(endTime - startTime))
    } catch (err: any) {
      setError(err.message || "Failed to fetch market data")
      setConnectionStatus("disconnected")
      console.error("Market data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [generateMarketData])

  // Ultra-fast real-time updates
  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      if (connectionStatus === "connected") {
        fetchData()
      }
    }, updateInterval)

    return () => clearInterval(interval)
  }, [fetchData, updateInterval, connectionStatus])

  // Connection recovery mechanism
  useEffect(() => {
    if (connectionStatus === "disconnected") {
      const reconnectTimer = setTimeout(() => {
        setConnectionStatus("connecting")
        fetchData()
      }, 3000)

      return () => clearTimeout(reconnectTimer)
    }
  }, [connectionStatus, fetchData])

  // Simulate occasional connection issues for realism
  useEffect(() => {
    const connectionIssueTimer = setInterval(() => {
      if (Math.random() < 0.001 && connectionStatus === "connected") {
        // 0.1% chance
        setConnectionStatus("disconnected")
      }
    }, 1000)

    return () => clearInterval(connectionIssueTimer)
  }, [connectionStatus])

  return {
    data,
    loading,
    error,
    lastUpdated,
    connectionStatus,
    latency,
  }
}
