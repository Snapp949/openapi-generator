"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
} from "recharts"
import { Activity, Zap, Settings, Download, Share2, Maximize, Play, Pause } from "lucide-react"

interface DataPoint {
  name: string
  value: number
  category?: string
  timestamp?: string
  metadata?: Record<string, any>
}

interface HolographicDataVisualizationProps {
  title: string
  data: DataPoint[]
  type?: "bar" | "line" | "area" | "pie" | "radar" | "scatter" | "treemap"
  hologramEnabled?: boolean
  realTime?: boolean
  interactive?: boolean
  className?: string
}

const sampleData = {
  performance: [
    { name: "Jan", value: 4000, category: "Revenue", growth: 12 },
    { name: "Feb", value: 3000, category: "Revenue", growth: 8 },
    { name: "Mar", value: 5000, category: "Revenue", growth: 15 },
    { name: "Apr", value: 4500, category: "Revenue", growth: 10 },
    { name: "May", value: 6000, category: "Revenue", growth: 18 },
    { name: "Jun", value: 5500, category: "Revenue", growth: 14 },
  ],
  portfolio: [
    { name: "Stocks", value: 45, color: "#8884d8" },
    { name: "Bonds", value: 25, color: "#82ca9d" },
    { name: "Crypto", value: 20, color: "#ffc658" },
    { name: "Real Estate", value: 10, color: "#ff7300" },
  ],
  trading: [
    { name: "BTC", value: 65000, volume: 1200, volatility: 8.5 },
    { name: "ETH", value: 4200, volume: 800, volatility: 12.3 },
    { name: "ADA", value: 1.2, volume: 450, volatility: 15.7 },
    { name: "SOL", value: 180, volume: 320, volatility: 18.2 },
    { name: "DOT", value: 35, volume: 280, volatility: 14.1 },
  ],
  network: [
    { subject: "Speed", A: 120, B: 110, fullMark: 150 },
    { subject: "Reliability", A: 98, B: 130, fullMark: 150 },
    { subject: "Security", A: 86, B: 130, fullMark: 150 },
    { subject: "Scalability", A: 99, B: 100, fullMark: 150 },
    { subject: "Efficiency", A: 85, B: 90, fullMark: 150 },
    { subject: "Cost", A: 65, B: 85, fullMark: 150 },
  ],
}

export function HolographicDataVisualization({
  title,
  data,
  type = "bar",
  hologramEnabled = false,
  realTime = false,
  interactive = true,
  className = "",
}: HolographicDataVisualizationProps) {
  const [isHologramActive, setIsHologramActive] = useState(hologramEnabled)
  const [isRealTime, setIsRealTime] = useState(realTime)
  const [chartType, setChartType] = useState(type)
  const [opacity, setOpacity] = useState([80])
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedDataset, setSelectedDataset] = useState("performance")
  const [animationSpeed, setAnimationSpeed] = useState([1000])
  const [showGrid, setShowGrid] = useState(true)
  const [show3D, setShow3D] = useState(false)
  const [currentData, setCurrentData] = useState(data || sampleData.performance)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRealTime && isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentData((prevData) =>
          prevData.map((item) => ({
            ...item,
            value: item.value + (Math.random() - 0.5) * 100,
          })),
        )
      }, animationSpeed[0])
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRealTime, isPlaying, animationSpeed])

  useEffect(() => {
    setCurrentData(sampleData[selectedDataset as keyof typeof sampleData] || data || sampleData.performance)
  }, [selectedDataset, data])

  const renderChart = () => {
    const commonProps = {
      data: currentData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    }

    const hologramStyle = isHologramActive
      ? {
          filter: "drop-shadow(0 0 20px rgba(59, 130, 246, 0.5)) drop-shadow(0 0 40px rgba(147, 51, 234, 0.3))",
          transform: show3D ? "perspective(1000px) rotateX(10deg)" : "none",
        }
      : {}

    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400} style={hologramStyle}>
            <LineChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2 }}
                opacity={opacity[0] / 100}
              />
            </LineChart>
          </ResponsiveContainer>
        )

      case "area":
        return (
          <ResponsiveContainer width="100%" height={400} style={hologramStyle}>
            <AreaChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="url(#colorGradient)"
                strokeWidth={2}
                opacity={opacity[0] / 100}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        )

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400} style={hologramStyle}>
            <PieChart>
              <Pie
                data={currentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                opacity={opacity[0] / 100}
              >
                {currentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color || `hsl(${index * 45}, 70%, 60%)`} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )

      case "radar":
        return (
          <ResponsiveContainer width="100%" height={400} style={hologramStyle}>
            <RadarChart data={currentData}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: "#94a3b8" }} />
              <PolarRadiusAxis tick={{ fill: "#94a3b8" }} />
              <Radar
                name="Series A"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={opacity[0] / 200}
                strokeWidth={2}
              />
              <Radar
                name="Series B"
                dataKey="B"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={opacity[0] / 200}
                strokeWidth={2}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        )

      case "scatter":
        return (
          <ResponsiveContainer width="100%" height={400} style={hologramStyle}>
            <ScatterChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
              <XAxis dataKey="value" stroke="#94a3b8" />
              <YAxis dataKey="volume" stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Scatter name="Data Points" data={currentData} fill="#3b82f6" opacity={opacity[0] / 100} />
            </ScatterChart>
          </ResponsiveContainer>
        )

      default:
        return (
          <ResponsiveContainer width="100%" height={400} style={hologramStyle}>
            <BarChart {...commonProps}>
              {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />}
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="value" fill="#3b82f6" opacity={opacity[0] / 100} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )
    }
  }

  return (
    <Card
      className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm ${className}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-white">{title}</CardTitle>
              <CardDescription className="text-slate-400">
                {isHologramActive ? "Holographic" : "Standard"} Data Visualization
              </CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isHologramActive ? "default" : "secondary"} className="bg-blue-500/20 text-blue-300">
              <Zap className="w-3 h-3 mr-1" />
              {isHologramActive ? "Hologram ON" : "Hologram OFF"}
            </Badge>
            {isRealTime && (
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <Activity className="w-3 h-3 mr-1" />
                Live
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Controls */}
        <Tabs defaultValue="display" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
            <TabsTrigger value="display" className="data-[state=active]:bg-blue-600">
              Display
            </TabsTrigger>
            <TabsTrigger value="data" className="data-[state=active]:bg-blue-600">
              Data
            </TabsTrigger>
            <TabsTrigger value="effects" className="data-[state=active]:bg-blue-600">
              Effects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="display" className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-sm text-slate-300">Chart Type</Label>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="radar">Radar Chart</SelectItem>
                    <SelectItem value="scatter">Scatter Plot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm text-slate-300">Dataset</Label>
                <Select value={selectedDataset} onValueChange={setSelectedDataset}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="portfolio">Portfolio</SelectItem>
                    <SelectItem value="trading">Trading</SelectItem>
                    <SelectItem value="network">Network</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="grid" checked={showGrid} onCheckedChange={setShowGrid} />
                <Label htmlFor="grid" className="text-sm text-slate-300">
                  Show Grid
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="3d" checked={show3D} onCheckedChange={setShow3D} />
                <Label htmlFor="3d" className="text-sm text-slate-300">
                  3D Effect
                </Label>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="realtime" checked={isRealTime} onCheckedChange={setIsRealTime} />
                <Label htmlFor="realtime" className="text-sm text-slate-300">
                  Real-time Updates
                </Label>
              </div>

              {isRealTime && (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Label className="text-sm text-slate-300">{isPlaying ? "Pause" : "Play"}</Label>
                </div>
              )}
            </div>

            {isRealTime && (
              <div className="space-y-2">
                <Label className="text-sm text-slate-300">Update Speed: {animationSpeed[0]}ms</Label>
                <Slider
                  value={animationSpeed}
                  onValueChange={setAnimationSpeed}
                  max={5000}
                  min={100}
                  step={100}
                  className="w-full"
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="effects" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="hologram" checked={isHologramActive} onCheckedChange={setIsHologramActive} />
              <Label htmlFor="hologram" className="text-sm text-slate-300">
                Holographic Effect
              </Label>
            </div>

            <div className="space-y-2">
              <Label className="text-sm text-slate-300">Opacity: {opacity[0]}%</Label>
              <Slider value={opacity} onValueChange={setOpacity} max={100} min={10} step={5} className="w-full" />
            </div>
          </TabsContent>
        </Tabs>

        {/* Chart */}
        <div className="relative">
          {renderChart()}

          {/* Holographic Overlay */}
          {isHologramActive && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <Maximize className="w-4 h-4 mr-2" />
              Fullscreen
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
