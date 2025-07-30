import { NextResponse } from "next/server"

// Mock data generators for comprehensive market data
function generatePrice(basePrice: number, volatility = 0.05): number {
  const change = (Math.random() - 0.5) * 2 * volatility
  return basePrice * (1 + change)
}

function generateHistoricalData() {
  const data = []
  const now = new Date()
  const symbols = ["BTC", "ETH", "SOL", "ADA", "MATIC", "DOT"]

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    const dataPoint: any = {
      name: time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
      timestamp: time.getTime(),
    }

    // Generate prices for each symbol
    dataPoint.BTC = generatePrice(68000, 0.02)
    dataPoint.ETH = generatePrice(3900, 0.03)
    dataPoint.SOL = generatePrice(205, 0.04)
    dataPoint.ADA = generatePrice(0.48, 0.05)
    dataPoint.MATIC = generatePrice(0.85, 0.06)
    dataPoint.DOT = generatePrice(7.2, 0.04)

    data.push(dataPoint)
  }

  return data
}

function generateOrderBook() {
  const bids = []
  const asks = []
  const basePrice = 68000

  // Generate 15 bid orders (buy orders below current price)
  for (let i = 0; i < 15; i++) {
    const price = basePrice - (i + 1) * (10 + Math.random() * 20)
    const amount = Math.random() * 3 + 0.1
    bids.push({
      price: Number(price.toFixed(2)),
      amount: Number(amount.toFixed(4)),
      total: Number((price * amount).toFixed(2)),
    })
  }

  // Generate 15 ask orders (sell orders above current price)
  for (let i = 0; i < 15; i++) {
    const price = basePrice + (i + 1) * (10 + Math.random() * 20)
    const amount = Math.random() * 3 + 0.1
    asks.push({
      price: Number(price.toFixed(2)),
      amount: Number(amount.toFixed(4)),
      total: Number((price * amount).toFixed(2)),
    })
  }

  return { bids, asks }
}

function generateRecentTrades() {
  const trades = []
  const now = new Date()
  const basePrice = 68000

  for (let i = 0; i < 30; i++) {
    const time = new Date(now.getTime() - i * 15000) // 15 seconds apart
    const price = generatePrice(basePrice, 0.001)
    const amount = Math.random() * 1.5 + 0.01
    const type = Math.random() > 0.5 ? "buy" : "sell"

    trades.push({
      id: `trade_${Date.now()}_${i}`,
      time: time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
      timestamp: time.getTime(),
      price: Number(price.toFixed(2)),
      amount: Number(amount.toFixed(4)),
      type,
      total: Number((price * amount).toFixed(2)),
    })
  }

  return trades.reverse() // Most recent first
}

function generateMarketData() {
  const cryptos = [
    { symbol: "BTC", name: "Bitcoin", basePrice: 68123.45, volume: "32.1B", marketCap: "1.34T" },
    { symbol: "ETH", name: "Ethereum", basePrice: 3921.78, volume: "18.5B", marketCap: "471B" },
    { symbol: "SOL", name: "Solana", basePrice: 205.67, volume: "4.1B", marketCap: "95.8B" },
    { symbol: "ADA", name: "Cardano", basePrice: 0.4678, volume: "1.2B", marketCap: "16.5B" },
    { symbol: "MATIC", name: "Polygon", basePrice: 0.8534, volume: "890M", marketCap: "8.2B" },
    { symbol: "DOT", name: "Polkadot", basePrice: 7.23, volume: "650M", marketCap: "9.1B" },
    { symbol: "LINK", name: "Chainlink", basePrice: 15.87, volume: "420M", marketCap: "9.5B" },
    { symbol: "UNI", name: "Uniswap", basePrice: 6.45, volume: "380M", marketCap: "4.8B" },
  ]

  return cryptos.map((crypto) => {
    const price = generatePrice(crypto.basePrice, 0.02)
    const change = (Math.random() - 0.5) * 10 // -5% to +5%
    const high24h = price * (1 + Math.random() * 0.05)
    const low24h = price * (1 - Math.random() * 0.05)

    return {
      symbol: crypto.symbol,
      name: crypto.name,
      price: Number(price.toFixed(crypto.symbol === "BTC" || crypto.symbol === "ETH" ? 2 : 4)),
      change: Number(change.toFixed(2)),
      volume: crypto.volume,
      marketCap: crypto.marketCap,
      high24h: Number(high24h.toFixed(crypto.symbol === "BTC" || crypto.symbol === "ETH" ? 2 : 4)),
      low24h: Number(low24h.toFixed(crypto.symbol === "BTC" || crypto.symbol === "ETH" ? 2 : 4)),
      priceChange24h: Number(((price * change) / 100).toFixed(2)),
    }
  })
}

export async function GET() {
  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 100))

    const response = {
      success: true,
      currentMarketData: generateMarketData(),
      historicalData: generateHistoricalData(),
      orderBook: generateOrderBook(),
      recentTrades: generateRecentTrades(),
      marketStats: {
        totalMarketCap: "2.54T",
        totalVolume24h: "128.7B",
        defiTvl: "98.2B",
        btcDominance: 52.3,
        fearGreedIndex: 67,
        activeTraders: 1247893,
      },
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error generating market data:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch market data",
      },
      { status: 500 },
    )
  }
}
