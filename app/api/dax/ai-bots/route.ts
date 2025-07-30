import { NextResponse } from "next/server"

interface AIBotPerformance {
  totalReturn: number
  dailyReturn: number
  weeklyReturn: number
  monthlyReturn: number
  winRate: number
  sharpeRatio: number
  maxDrawdown: number
  profitFactor: number
  avgWinSize: number
  avgLossSize: number
}

interface AIBot {
  id: string
  name: string
  strategy: string
  description: string
  status: "active" | "inactive" | "error" | "paused"
  performance: AIBotPerformance
  allocation: number
  trades: number
  lastRun: string
  lastActive: number
  riskLevel: "low" | "medium" | "high"
  timeframe: string
  assets: string[]
  createdAt: string
  version: string
}

// Mock AI bot data with comprehensive metrics
const mockBots: AIBot[] = [
  {
    id: "bot-001",
    name: "Quantum Arbitrage Pro",
    strategy: "Cross-Exchange Arbitrage",
    description:
      "Advanced arbitrage bot using quantum computing algorithms to identify price discrepancies across multiple exchanges",
    status: "active",
    performance: {
      totalReturn: 24.5,
      dailyReturn: 1.2,
      weeklyReturn: 8.7,
      monthlyReturn: 18.3,
      winRate: 78.5,
      sharpeRatio: 2.1,
      maxDrawdown: -3.2,
      profitFactor: 2.8,
      avgWinSize: 0.8,
      avgLossSize: -0.3,
    },
    allocation: 50000,
    trades: 1247,
    lastRun: "2 minutes ago",
    lastActive: Date.now() - 120000,
    riskLevel: "medium",
    timeframe: "1m-5m",
    assets: ["BTC", "ETH", "SOL"],
    createdAt: "2024-01-15",
    version: "v2.1.3",
  },
  {
    id: "bot-002",
    name: "Neural Momentum Trader",
    strategy: "Deep Learning Momentum",
    description:
      "AI-powered momentum trading using neural networks trained on historical price patterns and market sentiment",
    status: "active",
    performance: {
      totalReturn: 18.7,
      dailyReturn: 0.8,
      weeklyReturn: 5.2,
      monthlyReturn: 15.1,
      winRate: 72.3,
      sharpeRatio: 1.8,
      maxDrawdown: -5.1,
      profitFactor: 2.2,
      avgWinSize: 1.2,
      avgLossSize: -0.5,
    },
    allocation: 35000,
    trades: 892,
    lastRun: "1 minute ago",
    lastActive: Date.now() - 60000,
    riskLevel: "high",
    timeframe: "5m-1h",
    assets: ["BTC", "ETH", "ADA", "SOL"],
    createdAt: "2024-02-01",
    version: "v1.8.2",
  },
  {
    id: "bot-003",
    name: "Sentiment Analyzer Alpha",
    strategy: "Social Sentiment Analysis",
    description: "Analyzes social media sentiment, news, and on-chain data to predict market movements",
    status: "paused",
    performance: {
      totalReturn: 12.3,
      dailyReturn: 0.4,
      weeklyReturn: 2.8,
      monthlyReturn: 9.7,
      winRate: 65.8,
      sharpeRatio: 1.4,
      maxDrawdown: -7.3,
      profitFactor: 1.8,
      avgWinSize: 0.9,
      avgLossSize: -0.6,
    },
    allocation: 25000,
    trades: 634,
    lastRun: "1 hour ago",
    lastActive: Date.now() - 3600000,
    riskLevel: "low",
    timeframe: "1h-4h",
    assets: ["BTC", "ETH", "MATIC", "DOT"],
    createdAt: "2024-01-20",
    version: "v1.5.1",
  },
  {
    id: "bot-004",
    name: "Grid Master Elite",
    strategy: "Advanced Grid Trading",
    description:
      "Sophisticated grid trading algorithm with dynamic grid adjustment based on volatility and market conditions",
    status: "active",
    performance: {
      totalReturn: 31.2,
      dailyReturn: 1.5,
      weeklyReturn: 10.8,
      monthlyReturn: 22.4,
      winRate: 82.1,
      sharpeRatio: 2.4,
      maxDrawdown: -2.8,
      profitFactor: 3.2,
      avgWinSize: 0.6,
      avgLossSize: -0.2,
    },
    allocation: 75000,
    trades: 2156,
    lastRun: "30 seconds ago",
    lastActive: Date.now() - 30000,
    riskLevel: "medium",
    timeframe: "1m-15m",
    assets: ["BTC", "ETH"],
    createdAt: "2024-01-10",
    version: "v3.0.1",
  },
  {
    id: "bot-005",
    name: "DeFi Yield Optimizer",
    strategy: "Yield Farming & Liquidity Mining",
    description: "Automatically optimizes yield farming positions across multiple DeFi protocols",
    status: "error",
    performance: {
      totalReturn: 8.9,
      dailyReturn: 0.2,
      weeklyReturn: 1.4,
      monthlyReturn: 6.8,
      winRate: 58.3,
      sharpeRatio: 1.1,
      maxDrawdown: -12.1,
      profitFactor: 1.4,
      avgWinSize: 1.1,
      avgLossSize: -0.9,
    },
    allocation: 40000,
    trades: 423,
    lastRun: "2 hours ago",
    lastActive: Date.now() - 7200000,
    riskLevel: "high",
    timeframe: "1h-1d",
    assets: ["ETH", "UNI", "LINK"],
    createdAt: "2024-02-10",
    version: "v1.2.0",
  },
]

export async function GET() {
  try {
    // Add some random variation to performance metrics for realism
    const botsWithVariation = mockBots.map((bot) => ({
      ...bot,
      performance: {
        ...bot.performance,
        dailyReturn: Number((bot.performance.dailyReturn + (Math.random() - 0.5) * 0.5).toFixed(2)),
        totalReturn: Number((bot.performance.totalReturn + (Math.random() - 0.5) * 2).toFixed(1)),
      },
      lastActive: bot.status === "active" ? Date.now() - Math.random() * 300000 : bot.lastActive,
    }))

    const summary = {
      totalBots: botsWithVariation.length,
      activeBots: botsWithVariation.filter((bot) => bot.status === "active").length,
      totalAllocation: botsWithVariation.reduce((sum, bot) => sum + bot.allocation, 0),
      avgPerformance:
        botsWithVariation.reduce((sum, bot) => sum + bot.performance.totalReturn, 0) / botsWithVariation.length,
      totalTrades: botsWithVariation.reduce((sum, bot) => sum + bot.trades, 0),
    }

    return NextResponse.json({
      success: true,
      data: botsWithVariation,
      summary,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Error fetching AI bots:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch AI bots data",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: Request) {
  try {
    const { botId, action, config } = await request.json()

    if (!botId || !action) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing botId or action",
        },
        { status: 400 },
      )
    }

    // Simulate bot control actions
    const validActions = ["start", "pause", "stop", "restart", "configure"]

    if (!validActions.includes(action)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid action",
        },
        { status: 400 },
      )
    }

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock response based on action
    let message = ""
    switch (action) {
      case "start":
        message = `Bot ${botId} started successfully`
        break
      case "pause":
        message = `Bot ${botId} paused successfully`
        break
      case "stop":
        message = `Bot ${botId} stopped successfully`
        break
      case "restart":
        message = `Bot ${botId} restarted successfully`
        break
      case "configure":
        message = `Bot ${botId} configuration updated successfully`
        break
    }

    return NextResponse.json({
      success: true,
      message,
      botId,
      action,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error("Error processing bot action:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process bot action",
      },
      { status: 500 },
    )
  }
}
