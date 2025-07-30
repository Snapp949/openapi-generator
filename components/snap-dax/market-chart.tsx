"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, BarChart3 } from "lucide-react"

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
  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value.toFixed(0)}`
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 border border-slate-600 rounded-lg p-3 shadow-lg">
          <p className="text-slate-300 text-sm mb-2">{`Time: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {`${entry.dataKey}: ${formatCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              {title}
            </CardTitle>
            <p className="text-slate-400 text-sm mt-1">{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-slate-600 bg-transparent text-slate-300">
              1H
            </Button>
            <Button size="sm" variant="outline" className="border-slate-600 bg-transparent text-slate-300">
              24H
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              7D
            </Button>
          </div>
        </div>
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
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ color: "#E5E7EB", paddingTop: "20px" }} iconType="line" />
            <Line
              type="monotone"
              dataKey="BTC"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: "#F59E0B", strokeWidth: 2, fill: "#1F2937" }}
              name="Bitcoin"
            />
            <Line
              type="monotone"
              dataKey="ETH"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: "#10B981", strokeWidth: 2, fill: "#1F2937" }}
              name="Ethereum"
            />
            <Line
              type="monotone"
              dataKey="SOL"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, stroke: "#8B5CF6", strokeWidth: 2, fill: "#1F2937" }}
              name="Solana"
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Market Indices */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-4 border-t border-slate-700">
          <div className="bg-slate-900/70 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-blue-300 font-semibold text-sm">DAX 500 Index</h4>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              12,345.67 <span className="text-green-400 text-base ml-2">+1.23%</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">Weighted average of top 500 digital assets</p>
          </div>
          <div className="bg-slate-900/70 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-purple-300 font-semibold text-sm">DeFi Pulse Index</h4>
              <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
            </div>
            <p className="text-2xl font-bold text-white">
              4,567.89 <span className="text-red-400 text-base ml-2">-0.45%</span>
            </p>
            <p className="text-slate-400 text-xs mt-1">Performance of leading DeFi protocols</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
