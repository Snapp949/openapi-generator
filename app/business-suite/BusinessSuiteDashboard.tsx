"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Zap,
  Shield,
  Brain,
  Briefcase,
  Crown,
  Sparkles,
  ChevronRight,
  Activity,
  PieChart,
  FileText,
} from "lucide-react"
import { motion } from "framer-motion"

interface AIRecommendation {
  id: number
  title: string
  description: string
  impact: "high" | "medium" | "low"
  category: string
  isLocked: boolean
}

interface MarketAnalysisFeature {
  id: number
  name: string
  isEnabled: boolean
  description: string
}

interface CompetitorData {
  name: string
  marketShare: string
  growthRate: string
  strengths: string[]
  weaknesses: string[]
}

interface FinancialTool {
  id: number
  name: string
  isEnabled: boolean
  description: string
  lastUsed?: string
}

export function BusinessSuiteDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for AI Recommendations
  const [aiRecommendations] = useState<AIRecommendation[]>([
    {
      id: 1,
      title: "Optimize Ad Spend",
      description: "Reduce wasted ad spend by 20% through AI-powered targeting",
      impact: "high",
      category: "Marketing",
      isLocked: false,
    },
    {
      id: 2,
      title: "Improve Customer Retention",
      description: "Increase customer lifetime value by 15% with personalized experiences",
      impact: "high",
      category: "Customer Success",
      isLocked: false,
    },
    {
      id: 3,
      title: "Identify New Market Opportunities",
      description: "Discover untapped markets for expansion with 85% confidence",
      impact: "medium",
      category: "Strategy",
      isLocked: false,
    },
    {
      id: 4,
      title: "Automate Invoice Processing",
      description: "Reduce processing time by 60% with intelligent automation",
      impact: "medium",
      category: "Operations",
      isLocked: false,
    },
  ])

  // Mock data for Market Analysis Features
  const [marketAnalysisFeatures] = useState<MarketAnalysisFeature[]>([
    {
      id: 1,
      name: "Market Segmentation",
      isEnabled: true,
      description: "Advanced customer segmentation with AI insights",
    },
    {
      id: 2,
      name: "Trend Analysis",
      isEnabled: true,
      description: "Real-time market trend identification and forecasting",
    },
    {
      id: 3,
      name: "Competitive Benchmarking",
      isEnabled: true,
      description: "Compare performance against industry leaders",
    },
    {
      id: 4,
      name: "Sentiment Analysis",
      isEnabled: true,
      description: "Monitor brand sentiment across social platforms",
    },
  ])

  // Mock data for Competitor Intelligence
  const [competitorData] = useState<Record<string, CompetitorData>>({
    competitorA: {
      name: "Market Leader Corp",
      marketShare: "15%",
      growthRate: "5%",
      strengths: ["Brand Recognition", "Distribution Network"],
      weaknesses: ["High Prices", "Slow Innovation"],
    },
    competitorB: {
      name: "Rising Star Inc",
      marketShare: "10%",
      growthRate: "8%",
      strengths: ["Agile Development", "Customer Service"],
      weaknesses: ["Limited Resources", "Small Market Presence"],
    },
    competitorC: {
      name: "Industry Veteran LLC",
      marketShare: "12%",
      growthRate: "3%",
      strengths: ["Experience", "Reliability"],
      weaknesses: ["Outdated Technology", "Rigid Structure"],
    },
  })

  // Mock data for Financial Forecasting Tools
  const [financialTools] = useState<FinancialTool[]>([
    {
      id: 1,
      name: "Revenue Projection",
      isEnabled: true,
      description: "AI-powered revenue forecasting with 92% accuracy",
      lastUsed: "2 hours ago",
    },
    {
      id: 2,
      name: "Expense Forecasting",
      isEnabled: true,
      description: "Predictive expense analysis and budget optimization",
      lastUsed: "1 day ago",
    },
    {
      id: 3,
      name: "Profitability Analysis",
      isEnabled: true,
      description: "Real-time profit margin analysis and optimization",
      lastUsed: "3 hours ago",
    },
    {
      id: 4,
      name: "Cash Flow Prediction",
      isEnabled: true,
      description: "Advanced cash flow forecasting and risk assessment",
      lastUsed: "5 hours ago",
    },
  ])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
          <p className="text-white/70">Loading Business Suite...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Business Suite</h1>
              <p className="text-white/70">Comprehensive business management and AI-powered insights</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">All Features Unlocked</Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Crown className="h-3 w-3 mr-1" />
              Premium
            </Badge>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-white">$124,500</p>
                  <p className="text-green-400 text-sm flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +12.5%
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Active Customers</p>
                  <p className="text-2xl font-bold text-white">2,847</p>
                  <p className="text-blue-400 text-sm flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    +8.2%
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Conversion Rate</p>
                  <p className="text-2xl font-bold text-white">3.24%</p>
                  <p className="text-purple-400 text-sm flex items-center gap-1">
                    <Target className="h-3 w-3" />
                    +0.8%
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">AI Efficiency</p>
                  <p className="text-2xl font-bold text-white">94.2%</p>
                  <p className="text-yellow-400 text-sm flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    Optimal
                  </p>
                </div>
                <Brain className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-black/20 border-white/10 backdrop-blur-xl">
              <TabsTrigger value="overview" className="data-[state=active]:bg-purple-500/20">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="ai-recommendations" className="data-[state=active]:bg-purple-500/20">
                <Brain className="h-4 w-4 mr-2" />
                AI Recommendations
              </TabsTrigger>
              <TabsTrigger value="market-analysis" className="data-[state=active]:bg-purple-500/20">
                <PieChart className="h-4 w-4 mr-2" />
                Market Analysis
              </TabsTrigger>
              <TabsTrigger value="competitors" className="data-[state=active]:bg-purple-500/20">
                <Shield className="h-4 w-4 mr-2" />
                Competitors
              </TabsTrigger>
              <TabsTrigger value="financial" className="data-[state=active]:bg-purple-500/20">
                <DollarSign className="h-4 w-4 mr-2" />
                Financial Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Business Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Revenue Growth</span>
                        <span className="text-white">85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Customer Satisfaction</span>
                        <span className="text-white">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/70">Market Share</span>
                        <span className="text-white">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/20 border-white/10 backdrop-blur-xl">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      <div>
                        <p className="text-white text-sm font-medium">Q4 Revenue Target Exceeded</p>
                        <p className="text-white/60 text-xs">Achieved 112% of quarterly goal</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      <div>
                        <p className="text-white text-sm font-medium">New Market Expansion</p>
                        <p className="text-white/60 text-xs">Successfully entered 3 new regions</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      <div>
                        <p className="text-white text-sm font-medium">AI Implementation Complete</p>
                        <p className="text-white/60 text-xs">94% efficiency improvement achieved</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="ai-recommendations" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiRecommendations.map((recommendation) => (
                  <Card key={recommendation.id} className="bg-black/20 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-lg">{recommendation.title}</CardTitle>
                          <CardDescription className="text-white/70">{recommendation.description}</CardDescription>
                        </div>
                        <Badge className={getImpactColor(recommendation.impact)}>{recommendation.impact}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-white/70 border-white/20">
                          {recommendation.category}
                        </Badge>
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                          Implement
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="market-analysis" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {marketAnalysisFeatures.map((feature) => (
                  <Card key={feature.id} className="bg-black/20 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{feature.name}</CardTitle>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Enabled</Badge>
                      </div>
                      <CardDescription className="text-white/70">{feature.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        variant="outline"
                        className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analysis
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries(competitorData).map(([key, competitor]) => (
                  <Card key={key} className="bg-black/20 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                      <CardTitle className="text-white">{competitor.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-white/70 text-sm">Market Share</p>
                          <p className="text-white font-semibold">{competitor.marketShare}</p>
                        </div>
                        <div>
                          <p className="text-white/70 text-sm">Growth Rate</p>
                          <p className="text-white font-semibold">{competitor.growthRate}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-white/70 text-sm mb-2">Strengths</p>
                        <div className="space-y-1">
                          {competitor.strengths.map((strength, index) => (
                            <Badge key={index} variant="outline" className="text-green-400 border-green-500/30 mr-1">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-white/70 text-sm mb-2">Weaknesses</p>
                        <div className="space-y-1">
                          {competitor.weaknesses.map((weakness, index) => (
                            <Badge key={index} variant="outline" className="text-red-400 border-red-500/30 mr-1">
                              {weakness}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {financialTools.map((tool) => (
                  <Card key={tool.id} className="bg-black/20 border-white/10 backdrop-blur-xl">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{tool.name}</CardTitle>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Enabled</Badge>
                      </div>
                      <CardDescription className="text-white/70">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        {tool.lastUsed && <p className="text-white/60 text-sm">Last used: {tool.lastUsed}</p>}
                        <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                          <FileText className="h-4 w-4 mr-2" />
                          Open Tool
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
