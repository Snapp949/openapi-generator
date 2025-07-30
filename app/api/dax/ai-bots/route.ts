import { NextResponse } from "next/server"

// Mock AI bot data
const mockBots = [
  {
    id: "bot-1",
    name: "Quantum Arbitrage",
    strategy: "Cross-exchange arbitrage with quantum optimization",
    status: "active",
    performance: {
      totalReturn: 24.5,
      dailyReturn: 1.2,
      winRate: 78.5,
      sharpeRatio: 2.1,
    },
    allocation: 50000,
    trades: 1247,
    lastActive: Date.now() - 300000, // 5 minutes ago
  },
  {
    id: "bot-2",
    name: "Neural Momentum",
    strategy: "Deep learning momentum trading",
    status: "active",
    performance: {
      totalReturn: 18.7,
      dailyReturn: 0.8,
      winRate: 72.3,
      sharpeRatio: 1.8,
    },
    allocation: 35000,
    trades: 892,
    lastActive: Date.now() - 120000, // 2 minutes ago
  },
  {
    id: "bot-3",
    name: "Sentiment Analyzer",
    strategy: "Social sentiment and news analysis",
    status: "paused",
    performance: {
      totalReturn: 12.3,
      dailyReturn: 0.4,
      winRate: 65.8,
      sharpeRatio: 1.4,
    },
    allocation: 25000,
    trades: 634,
    lastActive: Date.now() - 3600000, // 1 hour ago
  },
]

export async function GET() {
  try {
    // Add some random variation to performance metrics
    const botsWithVariation = mockBots.map((bot) => ({
      ...bot,
      performance: {
        ...bot.performance,
        dailyReturn: bot.performance.dailyReturn + (Math.random() - 0.5) * 0.5,
        totalReturn: bot.performance.totalReturn + (Math.random() - 0.5) * 2,
      },
    }))

    return NextResponse.json({
      success: true,
      data: botsWithVariation,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("AI bots API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch AI bots data" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { action, botId } = await request.json()

    // Mock bot control actions
    if (action === "start" || action === "pause" || action === "stop") {
      return NextResponse.json({
        success: true,
        message: `Bot ${botId} ${action}ed successfully`,
        timestamp: Date.now(),
      })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("AI bots control error:", error)
    return NextResponse.json({ success: false, error: "Failed to control bot" }, { status: 500 })
  }
}
