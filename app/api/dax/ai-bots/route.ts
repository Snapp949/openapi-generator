import { NextResponse } from "next/server"

interface AiBot {
  id: string
  name: string
  strategy: string
  status: "active" | "inactive" | "error"
  performance: number // % gain/loss
  lastRun: string
}

const mockAiBots: AiBot[] = [
  {
    id: "bot-1",
    name: "Arbitrage Hunter",
    strategy: "Cross-exchange arbitrage",
    status: "active",
    performance: 5.2,
    lastRun: "2024-07-25 10:30 AM",
  },
  {
    id: "bot-2",
    name: "Trend Follower Pro",
    strategy: "Moving average crossover",
    status: "inactive",
    performance: -1.5,
    lastRun: "2024-07-24 05:00 PM",
  },
  {
    id: "bot-3",
    name: "Liquidity Provider",
    strategy: "Automated market making",
    status: "active",
    performance: 8.1,
    lastRun: "2024-07-25 11:00 AM",
  },
]

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
  return NextResponse.json(mockAiBots)
}

export async function POST(req: Request) {
  await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate network delay
  const { action, botId } = await req.json()

  const botIndex = mockAiBots.findIndex((bot) => bot.id === botId)

  if (botIndex === -1) {
    return NextResponse.json({ message: "Bot not found" }, { status: 404 })
  }

  if (action === "start") {
    mockAiBots[botIndex].status = "active"
    mockAiBots[botIndex].lastRun = new Date().toLocaleString()
  } else if (action === "stop") {
    mockAiBots[botIndex].status = "inactive"
  } else {
    return NextResponse.json({ message: "Invalid action" }, { status: 400 })
  }

  return NextResponse.json(mockAiBots[botIndex])
}
