import { NextResponse } from "next/server"

// Mock data generators
function generatePrice(basePrice: number, volatility = 0.05): number {
  const change = (Math.random() - 0.5) * 2 * volatility
  return basePrice * (1 + change)
}

function generateHistoricalData() {
  const data = []
  const now = new Date()

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      name: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      BTC: generatePrice(68000, 0.02),
      ETH: generatePrice(3900, 0.03),
      SOL: generatePrice(205, 0.04),
    })
  }

  return data
}

function generateOrderBook() {
  const bids = []
  const asks = []
  const basePrice = 68000

  // Generate 10 bid orders (buy orders below current price)
  for (let i = 0; i < 10; i++) {
    const price = basePrice - (i + 1) * 50
    const amount = Math.random() * 2 + 0.1
    bids.push({
      price,
      amount,
      total: price * amount,
    })
  }

  // Generate 10 ask orders (sell orders above current price)
  for (let i = 0; i < 10; i++) {
    const price = basePrice + (i + 1) * 50
    const amount = Math.random() * 2 + 0.1
    asks.push({
      price,
      amount,
      total: price * amount,
    })
  }

  return { bids, asks }
}

function generateRecentTrades() {
  const trades = []
  const now = new Date()

  for (let i = 0; i < 20; i++) {
    const time = new Date(now.getTime() - i * 30000) // 30 seconds apart
    trades.push({
      time: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      price: generatePrice(68000, 0.001),
      amount: Math.random() * 0.5 + 0.01,
      type: Math.random() > 0.5 ? "buy" : "sell",
    })
  }

  return trades
}

export async function GET() {
  try {
    const marketData = [
      {
        symbol: "BTC",
        name: "Bitcoin",
        price: generatePrice(68123.45),
        change: (Math.random() - 0.5) * 10,
        volume: "32.1B",
        marketCap: "1.34T",
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        price: generatePrice(3921.78),
        change: (Math.random() - 0.5) * 8,
        volume: "18.5B",
        marketCap: "471B",
      },
      {
        symbol: "SOL",
        name: "Solana",
        price: generatePrice(205.67),
        change: (Math.random() - 0.5) * 12,
        volume: "4.1B",
        marketCap: "95.8B",
      },
      {
        symbol: "BNB",
        name: "Binance Coin",
        price: generatePrice(612.34),
        change: (Math.random() - 0.5) * 6,
        volume: "2.8B",
        marketCap: "92.5B",
      },
      {
        symbol: "XRP",
        name: "Ripple",
        price: generatePrice(0.521),
        change: (Math.random() - 0.5) * 8,
        volume: "1.5B",
        marketCap: "28.1B",
      },
      {
        symbol: "ADA",
        name: "Cardano",
        price: generatePrice(0.4678),
        change: (Math.random() - 0.5) * 10,
        volume: "1.2B",
        marketCap: "16.5B",
      },
    ]

    const response = {
      currentMarketData: marketData,
      historicalData: generateHistoricalData(),
      orderBook: generateOrderBook(),
      recentTrades: generateRecentTrades(),
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error generating market data:", error)
    return NextResponse.json({ error: "Failed to fetch market data" }, { status: 500 })
  }
}
