"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Zap, ArrowUpRight, ArrowDownRight, Eye, RefreshCw } from 'lucide-react'
import Link from "next/link"
import { HolographicHeader } from "@/components/ui/holographic-header"
import { useEcosystem } from "@/contexts/ecosystem-context"
import SnapDaxDashboard from "./SnapDaxDashboard"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: number
  marketCap: number
}

interface PortfolioItem {
  symbol: string
  name: string
  quantity: number
  avgPrice: number
  currentPrice: number
  totalValue: number
  pnl: number
  pnlPercent: number
}

/**
 * /snap-dax
 * Live market experience (Snap DAX) similar to an exchange dashboard.
 * Renders the SnapDaxDashboard wrapper which composes market chart, order book,
 * trade history, and AI trading bots using the existing snap-dax components.
 */
export default function Page() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  const [portfolioValue, setPortfolioValue] = useState(124567.89)
  const [dayChange, setDayChange] = useState(2345.67)
  const [dayChangePercent, setDayChangePercent] = useState(1.92)

  const { trackPageView } = useEcosystem()

  useEffect(() => {
    trackPageView("/snap-dax", "SnapDAX Digital Asset Exchange")

    // Initialize market data
    setMarketData([
      {
        symbol: "BTC",
        name: "Bitcoin",
        price: 43250.0,
        change: 1250.5,
        changePercent: 2.98,
        volume: 28500000000,
        marketCap: 847000000000,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        price: 2650.75,
        change: -45.25,
        changePercent: -1.68,
        volume: 15200000000,
        marketCap: 318000000000,
      },
      {
        symbol: "ADA",
        name: "Cardano",
        price: 0.485,
        change: 0.023,
        changePercent: 4.98,
        volume: 890000000,
        marketCap: 17200000000,
      },
      {
        symbol: "SOL",
        name: "Solana",
        price: 98.45,
        change: 5.67,
        changePercent: 6.11,
        volume: 2100000000,
        marketCap: 42800000000,
      },
      {
        symbol: "DOT",
        name: "Polkadot",
        price: 7.23,
        change: -0.34,
        changePercent: -4.49,
        volume: 456000000,
        marketCap: 9100000000,
      },
    ])

    // Initialize portfolio
    setPortfolio([
      {
        symbol: "BTC",
        name: "Bitcoin",
        quantity: 1.5,
        avgPrice: 41000.0,
        currentPrice: 43250.0,
        totalValue: 64875.0,
        pnl: 3375.0,
        pnlPercent: 5.49,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        quantity: 15.0,
        avgPrice: 2800.0,
        currentPrice: 2650.75,
        totalValue: 39761.25,
        pnl: -2238.75,
        pnlPercent: -5.33,
      },
      {
        symbol: "ADA",
        name: "Cardano",
        quantity: 25000,
        avgPrice: 0.45,
        currentPrice: 0.485,
        totalValue: 12125.0,
        pnl: 875.0,
        pnlPercent: 7.78,
      },
    ])
  }, [trackPageView])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("en-US").format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <SnapDaxDashboard />
    </div>
  )
}
