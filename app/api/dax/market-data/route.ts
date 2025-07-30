import { NextResponse } from "next/server"

// Mock market data - in production, this would connect to real APIs
const generateMockData = () => {
  const symbols = ["BTC", "ETH", "ADA", "SOL", "MATIC", "DOT", "LINK", "UNI"]
  const baseData = {
    BTC: { price: 43250, change: 2.5 },
    ETH: { price: 2650, change: -1.2 },
    ADA: { price: 0.48, change: 3.8 },
    SOL: { price: 98.5, change: 5.2 },
    MATIC: { price: 0.85, change: -0.8 },
    DOT: { price: 7.2, change: 1.9 },
    LINK: { price: 15.8, change: -2.1 },
    UNI: { price: 6.4, change: 4.3 },
  }

  return symbols.map((symbol) => {
    const base = baseData[symbol as keyof typeof baseData]
    const variation = (Math.random() - 0.5) * 0.1
    const price = base.price * (1 + variation)
    const change = base.change + (Math.random() - 0.5) * 2

    return {
      symbol,
      price: price.toFixed(symbol === "BTC" ? 0 : symbol === "ETH" ? 0 : 4),
      change: change.toFixed(2),
      volume: (Math.random() * 1000000).toFixed(0),
      marketCap: (price * Math.random() * 100000000).toFixed(0),
      high24h: (price * 1.05).toFixed(symbol === "BTC" ? 0 : symbol === "ETH" ? 0 : 4),
      low24h: (price * 0.95).toFixed(symbol === "BTC" ? 0 : symbol === "ETH" ? 0 : 4),
      timestamp: Date.now(),
    }
  })
}

export async function GET() {
  try {
    const marketData = generateMockData()

    return NextResponse.json({
      success: true,
      data: marketData,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Market data API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch market data" }, { status: 500 })
  }
}
