"use client"

import { useState, useEffect, useCallback } from "react"

interface MarketDataPoint {
  symbol: string
  name: string
  price: number
  change: number
  volume: string
  marketCap: string
  category: "crypto" | "nft" | "rwa" | "etf" | "qgi"
  high24h: number
  low24h: number
  priceChange24h: number
  timestamp: number
}

interface UseRealTimeMarketDataReturn {
  data: MarketDataPoint[] | null
  loading: boolean
  error: string | null
  lastUpdated: Date | null
  refetch: () => void
}

export function useRealTimeMarketData(refreshInterval = 5000): UseRealTimeMarketDataReturn {
  const [data, setData] = useState<MarketDataPoint[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const generateMockData = useCallback((): MarketDataPoint[] => {
    const assets = [
      // Crypto
      { symbol: "BTC", name: "Bitcoin", basePrice: 68000, category: "crypto" as const },
      { symbol: "ETH", name: "Ethereum", basePrice: 3900, category: "crypto" as const },
      { symbol: "SOL", name: "Solana", basePrice: 205, category: "crypto" as const },
      { symbol: "ADA", name: "Cardano", basePrice: 0.47, category: "crypto" as const },

      // NFTs
      { symbol: "BAYC", name: "Bored Ape Yacht Club", basePrice: 45, category: "nft" as const },
      { symbol: "PUNK", name: "CryptoPunks", basePrice: 89, category: "nft" as const },
      { symbol: "AZUKI", name: "Azuki", basePrice: 12, category: "nft" as const },

      // RWA
      { symbol: "GOLD", name: "Tokenized Gold", basePrice: 2050, category: "rwa" as const },
      { symbol: "REIT", name: "Real Estate Token", basePrice: 125, category: "rwa" as const },
      { symbol: "OIL", name: "Oil Futures Token", basePrice: 78, category: "rwa" as const },

      // ETF
      { symbol: "SPY", name: "SPDR S&P 500", basePrice: 445, category: "etf" as const },
      { symbol: "QQQ", name: "Invesco QQQ", basePrice: 378, category: "etf" as const },
      { symbol: "VTI", name: "Vanguard Total Stock", basePrice: 234, category: "etf" as const },

      // QGI
      { symbol: "QGI1", name: "Quantum Growth Alpha", basePrice: 1250, category: "qgi" as const },
      { symbol: "QGI2", name: "Quantum Growth Beta", basePrice: 890, category: "qgi" as const },
      { symbol: "QGI3", name: "Quantum Growth Gamma", basePrice: 2340, category: "qgi" as const },
    ]

    return assets.map((asset) => {
      const volatility =
        asset.category === "crypto" ? 0.05 : asset.category === "nft" ? 0.08 : asset.category === "qgi" ? 0.12 : 0.02

      const priceChange = (Math.random() - 0.5) * 2 * volatility
      const price = asset.basePrice * (1 + priceChange)
      const change = priceChange * 100

      return {
        symbol: asset.symbol,
        name: asset.name,
        price: Number(price.toFixed(asset.basePrice < 1 ? 4 : 2)),
        change: Number(change.toFixed(2)),
        volume: `$${(Math.random() * 100 + 10).toFixed(1)}M`,
        marketCap: `$${(Math.random() * 1000 + 100).toFixed(1)}B`,
        category: asset.category,
        high24h: Number((price * 1.05).toFixed(asset.basePrice < 1 ? 4 : 2)),
        low24h: Number((price * 0.95).toFixed(asset.basePrice < 1 ? 4 : 2)),
        priceChange24h: Number(((price * change) / 100).toFixed(2)),
        timestamp: Date.now(),
      }
    })
  }, [])

  const fetchData = useCallback(async () => {
    try {
      setError(null)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100))

      const mockData = generateMockData()
      setData(mockData)
      setLastUpdated(new Date())
    } catch (err: any) {
      setError(err.message || "Failed to fetch market data")
      console.error("Market data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [generateMockData])

  const refetch = useCallback(() => {
    setLoading(true)
    fetchData()
  }, [fetchData])

  useEffect(() => {
    fetchData()

    const interval = setInterval(fetchData, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchData, refreshInterval])

  return {
    data,
    loading,
    error,
    lastUpdated,
    refetch,
  }
}
