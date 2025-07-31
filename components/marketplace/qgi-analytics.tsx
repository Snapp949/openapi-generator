"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Zap, Activity, DollarSign, Brain, Atom, Sparkles } from "lucide-react"
import { HolographicDataVisualization } from "@/components/ui/holographic-data-visualization"

interface QGIAnalyticsProps {
  hologramMode: boolean
  realTime: boolean
  timeframe: string
}

export function QGIAnalytics({ hologramMode, realTime, timeframe }: QGIAnalyticsProps) {
  const [qgiData, setQgiData] = useState([
    {
      name: "Quantum Growth Alpha",
      symbol: "QGI-A",
      price: 1250.45,
      change: 15.7,
      volume: "$8.9M",
      marketCap: "$12.4B",
      quantumScore: 94.2,
      aiConfidence: 87.5,
      strategy: "Quantum ML",
    },
    {
      name: "Quantum Growth Beta",
      symbol: "QGI-B",
      price: 890.23,
      change: 22.1,
      volume: "$5.2M",
      marketCap: "$7.8B",
      quantumScore: 91.8,
      aiConfidence: 92.3,
      strategy: "Neural Networks",
    },
    {
      name: "Quantum Growth Gamma",
      symbol: "QGI-G",
      price: 2340.67,
      change: 31.4,
      volume: "$12.1M",
      marketCap: "$18.9B",
      quantumScore: 96.7,
      aiConfidence: 95.1,
      strategy: "Quantum Computing",
    },
    {
      name: "Quantum Growth Delta",
      symbol: "QGI-D",
      price: 567.89,
      change: 8.9,
      volume: "$3.4M",
      marketCap: "$4.2B",
      quantumScore: 88.4,
      aiConfidence: 83.7,
      strategy: "Hybrid AI",
    },
    {
      name: "Quantum Growth Omega",
      symbol: "QGI-O",
      price: 3456.78,
      change: 45.2,
      volume: "$15.7M",
      marketCap: "$25.3B",
      quantumScore: 98.9,
      aiConfidence: 97.8,
      strategy: "Quantum Supremacy",
    },
  ])

  const [quantumMetrics, setQuantumMetrics] = useState([
    { name: "Jan", QGI_A: 1100, QGI_B: 750, QGI_G: 2000, QGI_D: 520, QGI_O: 2800 },
    { name: "Feb", QGI_A: 1150, QGI_B: 780, QGI_G: 2100, QGI_D: 540, QGI_O: 2950 },
    { name: "Mar", QGI_A: 1200, QGI_B: 820, QGI_G: 2200, QGI_D: 555, QGI_O: 3100 },
    { name: "Apr", QGI_A: 1220, QGI_B: 850, QGI_G: 2250, QGI_D: 560, QGI_O: 3200 },
    { name: "May", QGI_A: 1240, QGI_B: 870, QGI_G: 2300, QGI_D: 565, QGI_O: 3350 },
    { name: "Jun", QGI_A: 1250, QGI_B: 890, QGI_G: 2340, QGI_D: 567, QGI_O: 3456 },
  ])

  useEffect(() => {
    if (realTime) {
      const interval = setInterval(() => {
        setQgiData((prev) =>
          prev.map((qgi) => ({
            ...qgi,
            price: qgi.price * (1 + (Math.random() - 0.5) * 0.02),
            change: qgi.change + (Math.random() - 0.5) * 2,
            quantumScore: Math.min(100, Math.max(80, qgi.quantumScore + (Math.random() - 0.5) * 2)),
            aiConfidence: Math.min(100, Math.max(70, qgi.aiConfidence + (Math.random() - 0.5) * 3)),
          })),
        )
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [realTime])

  const totalMarketCap = qgiData.reduce((sum, qgi) => {
    return sum + Number.parseFloat(qgi.marketCap.replace(/[$B]/g, ""))
  }, 0)

  return (
    <div className="space-y-6">
      {/* QGI Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className={`bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-sm border-indigo-500/20 ${hologramMode ? "shadow-lg shadow-indigo-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-indigo-200">Total Market Cap</p>
                <p className="text-2xl font-bold text-white">${totalMarketCap.toFixed(1)}B</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +31.7%
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-indigo-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border-purple-500/20 ${hologramMode ? "shadow-lg shadow-purple-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-200">24h Volume</p>
                <p className="text-2xl font-bold text-white">$45.3M</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +28.9%
                </p>
              </div>
              <Activity className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-cyan-500/20 ${hologramMode ? "shadow-lg shadow-cyan-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-cyan-200">Quantum Score</p>
                <p className="text-2xl font-bold text-white">93.8</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +2.4
                </p>
              </div>
              <Zap className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card
          className={`bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm border-pink-500/20 ${hologramMode ? "shadow-lg shadow-pink-500/10" : ""}`}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-pink-200">AI Confidence</p>
                <p className="text-2xl font-bold text-white">91.3%</p>
                <p className="text-sm text-green-400 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +3.7%
                </p>
              </div>
              <Brain className="h-8 w-8 text-pink-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="quantum" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
          <TabsTrigger value="quantum">Quantum</TabsTrigger>
          <TabsTrigger value="ai">AI Models</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="research">Research</TabsTrigger>
        </TabsList>

        <TabsContent value="quantum" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HolographicDataVisualization
              title="Quantum Performance Metrics"
              data={quantumMetrics}
              type="line"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
            <HolographicDataVisualization
              title="Quantum Score Distribution"
              data={qgiData.map((qgi) => ({
                name: qgi.symbol,
                value: qgi.quantumScore,
              }))}
              type="radar"
              hologramEnabled={hologramMode}
            />
          </div>

          <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-white">Quantum Growth Investments</CardTitle>
              <CardDescription className="text-slate-400">
                Advanced quantum-powered investment strategies with AI optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Investment</TableHead>
                    <TableHead className="text-slate-300">Price</TableHead>
                    <TableHead className="text-slate-300">Change</TableHead>
                    <TableHead className="text-slate-300">Volume</TableHead>
                    <TableHead className="text-slate-300">Quantum Score</TableHead>
                    <TableHead className="text-slate-300">AI Confidence</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {qgiData.map((qgi) => (
                    <TableRow key={qgi.symbol} className="border-slate-700 hover:bg-slate-800/50">
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                            <Zap className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{qgi.symbol}</div>
                            <div className="text-slate-400 text-sm">{qgi.strategy}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white font-mono">${qgi.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={qgi.change >= 0 ? "default" : "destructive"}
                          className={qgi.change >= 0 ? "bg-green-600" : "bg-red-600"}
                        >
                          {qgi.change >= 0 ? "+" : ""}
                          {qgi.change.toFixed(1)}%
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{qgi.volume}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="text-cyan-400 font-medium">{qgi.quantumScore.toFixed(1)}</div>
                          <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                              style={{ width: `${qgi.quantumScore}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="text-purple-400 font-medium">{qgi.aiConfidence.toFixed(1)}%</div>
                          <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                              style={{ width: `${qgi.aiConfidence}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">AI Model Performance</CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time AI model accuracy and prediction confidence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { model: "Quantum Neural Network", accuracy: "97.8%", predictions: "1,247", status: "Active" },
                  { model: "Deep Learning Ensemble", accuracy: "94.2%", predictions: "892", status: "Active" },
                  { model: "Reinforcement Learning", accuracy: "91.5%", predictions: "634", status: "Training" },
                  { model: "Transformer Architecture", accuracy: "96.1%", predictions: "1,089", status: "Active" },
                ].map((model, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/50 border border-slate-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{model.model}</div>
                        <div className="text-slate-400 text-sm">{model.predictions} predictions today</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-green-400 font-medium">{model.accuracy}</div>
                      <Badge
                        variant={model.status === "Active" ? "default" : "secondary"}
                        className={model.status === "Active" ? "bg-green-600" : "bg-yellow-600"}
                      >
                        {model.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <HolographicDataVisualization
              title="AI Confidence Trends"
              data={qgiData.map((qgi) => ({
                name: qgi.symbol,
                value: qgi.aiConfidence,
              }))}
              type="bar"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <HolographicDataVisualization
              title="QGI Performance Comparison"
              data={quantumMetrics}
              type="area"
              hologramEnabled={hologramMode}
              realTime={realTime}
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Top Performers</CardTitle>
                  <CardDescription className="text-slate-400">
                    Best performing QGI strategies this month
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { symbol: "QGI-O", performance: "+45.2%", strategy: "Quantum Supremacy" },
                    { symbol: "QGI-G", performance: "+31.4%", strategy: "Quantum Computing" },
                    { symbol: "QGI-B", performance: "+22.1%", strategy: "Neural Networks" },
                    { symbol: "QGI-A", performance: "+15.7%", strategy: "Quantum ML" },
                  ].map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{index + 1}</span>
                        </div>
                        <div>
                          <div className="text-white font-medium">{performer.symbol}</div>
                          <div className="text-slate-400 text-sm">{performer.strategy}</div>
                        </div>
                      </div>
                      <div className="text-green-400 font-medium">{performer.performance}</div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Risk Metrics</CardTitle>
                  <CardDescription className="text-slate-400">Quantum-adjusted risk analysis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Quantum Volatility</span>
                    <span className="text-cyan-400 font-medium">8.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">AI Risk Score</span>
                    <span className="text-purple-400 font-medium">Low</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Sharpe Ratio</span>
                    <span className="text-green-400 font-medium">2.34</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Max Drawdown</span>
                    <span className="text-red-400 font-medium">-3.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-white">Quantum Insights</CardTitle>
                  <CardDescription className="text-slate-400">AI-generated market insights</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { insight: "Quantum advantage detected in volatility prediction", confidence: "High" },
                    { insight: "Neural network identifies emerging pattern", confidence: "Medium" },
                    { insight: "Market sentiment shifting toward quantum assets", confidence: "High" },
                    { insight: "Optimal rebalancing window approaching", confidence: "Medium" },
                  ].map((insight, index) => (
                    <div key={index} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-white text-sm">{insight.insight}</div>
                        <Badge
                          variant={insight.confidence === "High" ? "default" : "secondary"}
                          className={insight.confidence === "High" ? "bg-green-600" : "bg-yellow-600"}
                        >
                          {insight.confidence}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="research" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Quantum Research Pipeline</CardTitle>
                <CardDescription className="text-slate-400">
                  Latest quantum computing and AI research developments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    title: "Quantum Error Correction Breakthrough",
                    status: "In Progress",
                    impact: "High",
                    completion: "78%",
                    team: "Quantum Lab Alpha",
                  },
                  {
                    title: "Neural Quantum Hybrid Architecture",
                    status: "Testing",
                    impact: "Medium",
                    completion: "92%",
                    team: "AI Research Division",
                  },
                  {
                    title: "Quantum Advantage in Portfolio Optimization",
                    status: "Complete",
                    impact: "High",
                    completion: "100%",
                    team: "Quantum Finance Team",
                  },
                  {
                    title: "Scalable Quantum Machine Learning",
                    status: "Planning",
                    impact: "Very High",
                    completion: "15%",
                    team: "Advanced Research",
                  },
                ].map((research, index) => (
                  <div key={index} className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-white font-medium">{research.title}</div>
                        <div className="text-slate-400 text-sm">{research.team}</div>
                      </div>
                      <div className="flex gap-2">
                        <Badge
                          variant={
                            research.status === "Complete"
                              ? "default"
                              : research.status === "Testing"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            research.status === "Complete"
                              ? "bg-green-600"
                              : research.status === "Testing"
                                ? "bg-blue-600"
                                : research.status === "In Progress"
                                  ? "bg-yellow-600"
                                  : "bg-slate-600"
                          }
                        >
                          {research.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            research.impact === "Very High"
                              ? "border-red-500 text-red-400"
                              : research.impact === "High"
                                ? "border-orange-500 text-orange-400"
                                : "border-yellow-500 text-yellow-400"
                          }
                        >
                          {research.impact}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                          style={{ width: `${research.completion}%` }}
                        />
                      </div>
                      <span className="text-slate-300 text-sm">{research.completion}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white">Quantum Computing Metrics</CardTitle>
                <CardDescription className="text-slate-400">
                  Real-time quantum system performance indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Atom className="h-4 w-4 text-cyan-400" />
                      <span className="text-slate-300">Qubit Coherence</span>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-medium">99.7%</div>
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 w-[99.7%]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <span className="text-slate-300">Quantum Volume</span>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-400 font-medium">2^64</div>
                      <div className="text-slate-500 text-sm">128 qubits</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-400" />
                      <span className="text-slate-300">Gate Fidelity</span>
                    </div>
                    <div className="text-right">
                      <div className="text-yellow-400 font-medium">99.9%</div>
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 w-[99.9%]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-pink-400" />
                      <span className="text-slate-300">Quantum Advantage</span>
                    </div>
                    <div className="text-right">
                      <div className="text-pink-400 font-medium">10^6x</div>
                      <div className="text-slate-500 text-sm">vs classical</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
                      Quantum Supremacy Achieved
                    </div>
                    <div className="text-slate-400 text-sm mt-1">Next-generation quantum algorithms active</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
