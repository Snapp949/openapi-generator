"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Activity,
  Zap,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Users,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Globe,
  Shield,
  Gauge,
  BarChart3,
  PieChartIcon,
  Download,
  Maximize,
  RefreshCw,
} from "lucide-react"

interface MetricData {
  timestamp: string
  value: number
  status: "healthy" | "warning" | "critical"
  metadata?: Record<string, any>
}

interface SystemMetrics {
  cpu: MetricData[]
  memory: MetricData[]
  disk: MetricData[]
  network: MetricData[]
  users: MetricData[]
  revenue: MetricData[]
  transactions: MetricData[]
  uptime: MetricData[]
}

const generateMockData = (points = 24): MetricData[] => {
  return Array.from({ length: points }, (_, i) => {
    const value = Math.random() * 100
    return {
      timestamp: new Date(Date.now() - (points - i) * 60000).toISOString(),
      value: Math.round(value * 100) / 100,
      status: value > 80 ? "critical" : value > 60 ? "warning" : "healthy",
    }
  })
}

const mockSystemMetrics: SystemMetrics = {
  cpu: generateMockData().map((item) => ({ ...item, value: Math.random() * 100 })),
  memory: generateMockData().map((item) => ({ ...item, value: Math.random() * 100 })),
  disk: generateMockData().map((item) => ({ ...item, value: Math.random() * 100 })),
  network: generateMockData().map((item) => ({ ...item, value: Math.random() * 1000 })),
  users: generateMockData().map((item) => ({ ...item, value: Math.floor(Math.random() * 10000) })),
  revenue: generateMockData().map((item) => ({ ...item, value: Math.random() * 100000 })),
  transactions: generateMockData().map((item) => ({ ...item, value: Math.floor(Math.random() * 1000) })),
  uptime: generateMockData().map((item) => ({ ...item, value: 99.9 + Math.random() * 0.1 })),
}

const currentMetrics = {
  cpu: { value: 45.2, status: "healthy" as const, change: "+2.1%" },
  memory: { value: 67.8, status: "warning" as const, change: "+5.3%" },
  disk: { value: 34.1, status: "healthy" as const, change: "+1.2%" },
  network: { value: 234.5, status: "healthy" as const, change: "+12.4%" },
  users: { value: 8547, status: "healthy" as const, change: "+8.7%" },
  revenue: { value: 45678.9, status: "healthy" as const, change: "+15.2%" },
  transactions: { value: 1234, status: "healthy" as const, change: "+23.1%" },
  uptime: { value: 99.97, status: "healthy" as const, change: "+0.01%" },
}

const systemHealth = [
  { name: "API Gateway", status: "healthy", uptime: 99.98, responseTime: 45 },
  { name: "Database", status: "healthy", uptime: 99.95, responseTime: 12 },
  { name: "Cache Layer", status: "warning", uptime: 98.76, responseTime: 8 },
  { name: "File Storage", status: "healthy", uptime: 99.99, responseTime: 23 },
  { name: "Authentication", status: "healthy", uptime: 99.94, responseTime: 67 },
  { name: "Payment Gateway", status: "critical", uptime: 97.23, responseTime: 156 },
]

export function HolographicPerformanceMetrics() {
  const [isHologramActive, setIsHologramActive] = useState(true)
  const [isRealTime, setIsRealTime] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState([5000])
  const [selectedMetric, setSelectedMetric] = useState("cpu")
  const [hologramIntensity, setHologramIntensity] = useState([75])
  const [showAlerts, setShowAlerts] = useState(true)
  const [metrics, setMetrics] = useState(mockSystemMetrics)
  const [currentStats, setCurrentStats] = useState(currentMetrics)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRealTime) {
      intervalRef.current = setInterval(() => {
        // Simulate real-time data updates
        setMetrics((prev) => ({
          ...prev,
          [selectedMetric]: prev[selectedMetric as keyof SystemMetrics].map((item) => ({
            ...item,
            value: Math.max(0, item.value + (Math.random() - 0.5) * 10),
            timestamp: new Date().toISOString(),
          })),
        }))

        // Update current stats
        setCurrentStats((prev) => ({
          ...prev,
          [selectedMetric]: {
            ...prev[selectedMetric as keyof typeof prev],
            value: Math.max(0, prev[selectedMetric as keyof typeof prev].value + (Math.random() - 0.5) * 5),
          },
        }))
      }, refreshInterval[0])
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRealTime, refreshInterval, selectedMetric])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-400"
      case "warning":
        return "text-yellow-400"
      case "critical":
        return "text-red-400"
      default:
        return "text-slate-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case "critical":
        return <XCircle className="w-4 h-4 text-red-400" />
      default:
        return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const hologramStyle = isHologramActive
    ? {
        filter: `drop-shadow(0 0 20px rgba(59, 130, 246, ${hologramIntensity[0] / 100})) drop-shadow(0 0 40px rgba(147, 51, 234, ${hologramIntensity[0] / 200}))`,
        transform: "perspective(1000px) rotateX(2deg)",
      }
    : {}

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
            <Gauge className="w-8 h-8 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Platform Performance</h1>
            <p className="text-slate-400">Real-time system monitoring and analytics</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
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
          <Button
            variant="outline"
            size="sm"
            className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Controls */}
      <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <Switch id="hologram" checked={isHologramActive} onCheckedChange={setIsHologramActive} />
              <Label htmlFor="hologram" className="text-sm text-slate-300">
                Holographic Mode
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="realtime" checked={isRealTime} onCheckedChange={setIsRealTime} />
              <Label htmlFor="realtime" className="text-sm text-slate-300">
                Real-time Updates
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="alerts" checked={showAlerts} onCheckedChange={setShowAlerts} />
              <Label htmlFor="alerts" className="text-sm text-slate-300">
                Show Alerts
              </Label>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-slate-400">Hologram Intensity</Label>
              <Slider
                value={hologramIntensity}
                onValueChange={setHologramIntensity}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(currentStats).map(([key, metric]) => (
          <Card
            key={key}
            className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm cursor-pointer hover:border-blue-500/50 transition-all"
            style={isHologramActive ? hologramStyle : {}}
            onClick={() => setSelectedMetric(key)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {key === "cpu" && <Cpu className="w-5 h-5 text-blue-400" />}
                  {key === "memory" && <Server className="w-5 h-5 text-purple-400" />}
                  {key === "disk" && <HardDrive className="w-5 h-5 text-green-400" />}
                  {key === "network" && <Wifi className="w-5 h-5 text-yellow-400" />}
                  {key === "users" && <Users className="w-5 h-5 text-pink-400" />}
                  {key === "revenue" && <DollarSign className="w-5 h-5 text-emerald-400" />}
                  {key === "transactions" && <BarChart3 className="w-5 h-5 text-orange-400" />}
                  {key === "uptime" && <Globe className="w-5 h-5 text-cyan-400" />}
                  <span className="text-sm text-slate-300 capitalize">{key}</span>
                </div>
                {getStatusIcon(metric.status)}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white">
                  {key === "revenue"
                    ? `$${metric.value.toLocaleString()}`
                    : key === "uptime"
                      ? `${metric.value.toFixed(2)}%`
                      : key === "users" || key === "transactions"
                        ? metric.value.toLocaleString()
                        : `${metric.value.toFixed(1)}${key === "network" ? " MB/s" : "%"}`}
                </div>
                <div className={`text-sm ${metric.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Chart */}
      <Card
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm"
        style={isHologramActive ? hologramStyle : {}}
      >
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white capitalize">{selectedMetric} Performance</CardTitle>
              <CardDescription className="text-slate-400">Real-time monitoring and trends</CardDescription>
            </div>
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
                <Maximize className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={metrics[selectedMetric as keyof SystemMetrics]}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="timestamp"
                stroke="#94a3b8"
                tickFormatter={(value) => new Date(value).toLocaleTimeString()}
              />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.9)",
                  border: "1px solid rgba(59, 130, 246, 0.3)",
                  borderRadius: "8px",
                }}
                labelFormatter={(value) => new Date(value).toLocaleString()}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                fill="url(#colorGradient)"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>

          {/* Holographic Overlay */}
          {isHologramActive && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 animate-pulse" />
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent animate-pulse" />
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent animate-pulse" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm"
          style={isHologramActive ? hologramStyle : {}}
        >
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-400" />
              System Health
            </CardTitle>
            <CardDescription className="text-slate-400">Service status and uptime monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {systemHealth.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(service.status)}
                  <div>
                    <div className="text-white font-medium">{service.name}</div>
                    <div className="text-sm text-slate-400">{service.uptime}% uptime</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{service.responseTime}ms</div>
                  <div className="text-sm text-slate-400">response time</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card
          className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm"
          style={isHologramActive ? hologramStyle : {}}
        >
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChartIcon className="w-5 h-5 mr-2 text-purple-400" />
              Resource Distribution
            </CardTitle>
            <CardDescription className="text-slate-400">Current system resource allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: "CPU", value: currentStats.cpu.value, color: "#3b82f6" },
                    { name: "Memory", value: currentStats.memory.value, color: "#8b5cf6" },
                    { name: "Disk", value: currentStats.disk.value, color: "#10b981" },
                    { name: "Network", value: currentStats.network.value / 10, color: "#f59e0b" },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { name: "CPU", value: currentStats.cpu.value, color: "#3b82f6" },
                    { name: "Memory", value: currentStats.memory.value, color: "#8b5cf6" },
                    { name: "Disk", value: currentStats.disk.value, color: "#10b981" },
                    { name: "Network", value: currentStats.network.value / 10, color: "#f59e0b" },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      {showAlerts && (
        <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
              Active Alerts
            </CardTitle>
            <CardDescription className="text-slate-400">System warnings and critical issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <XCircle className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-white font-medium">Payment Gateway Critical</div>
                  <div className="text-sm text-slate-400">Response time exceeding 150ms threshold</div>
                </div>
              </div>
              <Badge variant="destructive" className="bg-red-500/20 text-red-400">
                Critical
              </Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="text-white font-medium">Memory Usage High</div>
                  <div className="text-sm text-slate-400">Memory utilization at 67.8%</div>
                </div>
              </div>
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400">
                Warning
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
