"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface HistoricalDataPoint {
  name: string
  BTC: number
  ETH: number
  SOL: number
}

interface MarketChartProps {
  data: HistoricalDataPoint[]
  title: string
  description: string
}

export function MarketChart({ data, title, description }: MarketChartProps) {
  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <p className="text-slate-400 text-sm">{description}</p>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="name" stroke="#CBD5E0" />
            <YAxis stroke="#CBD5E0" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1A202C", border: "1px solid #4A5568", borderRadius: "4px" }}
              labelStyle={{ color: "#E2E8F0" }}
              itemStyle={{ color: "#A0AEC0" }}
            />
            <Legend wrapperStyle={{ color: "#E2E8F0" }} />
            <Line type="monotone" dataKey="BTC" stroke="#8884d8" activeDot={{ r: 8 }} name="Bitcoin" />
            <Line type="monotone" dataKey="ETH" stroke="#82ca9d" name="Ethereum" />
            <Line type="monotone" dataKey="SOL" stroke="#ffc658" name="Solana" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
