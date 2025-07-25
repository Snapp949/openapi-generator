import { NextResponse } from "next/server"

// Mock data for market trends over time
const mockHistoricalData = [
  { name: "Jan", BTC: 40000, ETH: 2500, SOL: 100 },
  { name: "Feb", BTC: 42000, ETH: 2600, SOL: 110 },
  { name: "Mar", BTC: 45000, ETH: 2800, SOL: 120 },
  { name: "Apr", BTC: 48000, ETH: 3000, SOL: 130 },
  { name: "May", BTC: 52000, ETH: 3200, SOL: 140 },
  { name: "Jun", BTC: 55000, ETH: 3400, SOL: 150 },
  { name: "Jul", BTC: 58000, ETH: 3600, SOL: 160 },
  { name: "Aug", BTC: 60000, ETH: 3700, SOL: 170 },
  { name: "Sep", BTC: 62000, ETH: 3800, SOL: 180 },
  { name: "Oct", BTC: 65000, ETH: 3900, SOL: 190 },
  { name: "Nov", BTC: 68000, ETH: 4000, SOL: 200 },
  { name: "Dec", BTC: 70000, ETH: 4100, SOL: 210 },
]

// Mock data for current market prices
const mockCurrentMarketData = [
  { symbol: "BTC", name: "Bitcoin", price: 68123.45, change: 2.15, volume: "32.1B", marketCap: "1.34T" },
  { symbol: "ETH", name: "Ethereum", price: 3921.78, change: -0.87, volume: "18.5B", marketCap: "471B" },
  { symbol: "SOL", name: "Solana", price: 205.67, change: 4.52, volume: "4.1B", marketCap: "95.8B" },
  { symbol: "BNB", name: "Binance Coin", price: 612.34, change: 1.23, volume: "2.8B", marketCap: "92.5B" },
  { symbol: "XRP", name: "Ripple", price: 0.521, change: -1.5, volume: "1.5B", marketCap: "28.1B" },
  { symbol: "ADA", name: "Cardano", price: 0.4678, change: 3.1, volume: "1.2B", marketCap: "16.5B" },
]

// Mock data for order book
const mockOrderBook = {
  bids: [
    { price: 68120.0, amount: 0.15, total: 10218.0 },
    { price: 68115.5, amount: 0.2, total: 13623.1 },
    { price: 68110.0, amount: 0.3, total: 20433.0 },
  ],
  asks: [
    { price: 68130.0, amount: 0.1, total: 6813.0 },
    { price: 68135.5, amount: 0.25, total: 17033.88 },
    { price: 68140.0, amount: 0.18, total: 12265.2 },
  ],
}

// Mock data for recent trades
const mockRecentTrades = [
  { time: "12:01:05", price: 68125.0, amount: 0.05, type: "buy" },
  { time: "12:01:00", price: 68124.5, amount: 0.12, type: "sell" },
  { time: "12:00:55", price: 68126.0, amount: 0.08, type: "buy" },
  { time: "12:00:50", price: 68123.0, amount: 0.2, type: "sell" },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    historicalData: mockHistoricalData,
    currentMarketData: mockCurrentMarketData,
    orderBook: mockOrderBook,
    recentTrades: mockRecentTrades,
  })
}
