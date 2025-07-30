import { NextResponse } from "next/server"

// Mock AI bot data
const mockBots = [
  {
    id: "bot-001",
    name: "Momentum Trader",
    strategy: "Technical Analysis + Momentum",
    status: "active" as const,
    performance: 12.5,
    lastRun: "2 minutes ago",
  },
  {
    id: "bot-002",
    name: "Arbitrage Hunter",
    strategy: "Cross-Exchange Arbitrage",
    status: "active" as const,
    performance: 8.3,
    lastRun: "1 minute ago",
  },
  {
    id: "bot-003",
    name: "DeFi Yield Optimizer",
    strategy: "Yield Farming + Liquidity Mining",
    status: "inactive" as const,
    performance: -2.1,
    lastRun: "1 hour ago",
  },
  {
    id: "bot-004",
    name: "Market Maker Pro",
    strategy: "Grid Trading + Market Making",
    status: "active" as const,
    performance: 15.7,
    lastRun: "30 seconds ago",
  },
  {
    id: "bot-005",
    name: "Sentiment Analyzer",
    strategy: "AI Sentiment + News Analysis",
    status: "error" as const,
    performance: 5.2,
    lastRun: "5 minutes ago",
  },
]

export async function GET() {
  try {
    // Simulate some randomness in performance
    const botsWithUpdatedPerformance = mockBots.map((bot) => ({
      ...bot,
      performance: bot.performance + (Math.random() - 0.5) * 2, // Small random variation
    }))

    return NextResponse.json(botsWithUpdatedPerformance)
  } catch (error) {
    console.error("Error fetching AI bots:", error)
    return NextResponse.json({ error: "Failed to fetch AI bots" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { botId, action } = await request.json()

    if (!botId || !action) {
      return NextResponse.json({ error: "Missing botId or action" }, { status: 400 })
    }

    // Simulate bot action processing
    console.log(`Processing ${action} action for bot ${botId}`)

    // In a real application, this would update the bot status in a database
    const updatedBot = mockBots.find((bot) => bot.id === botId)
    if (updatedBot) {
      updatedBot.status = action === "start" ? "active" : "inactive"
      updatedBot.lastRun = "just now"
    }

    return NextResponse.json({
      success: true,
      message: `Bot ${action} action completed successfully`,
      botId,
    })
  } catch (error) {
    console.error("Error processing bot action:", error)
    return NextResponse.json({ error: "Failed to process bot action" }, { status: 500 })
  }
}
