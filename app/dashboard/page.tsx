"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, DollarSign, CreditCard, PieChart, BarChart3, Activity, Zap, Target, ArrowUpRight, ArrowDownRight, Settings, Download, RefreshCw, Shield, Building, Home } from 'lucide-react'
import { useEcosystem } from "@/contexts/ecosystem-context"
import { motion } from "framer-motion"

interface MetricCard {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: any
  description: string
}

interface QuickAction {
  title: string
  description: string
  icon: any
  href: string
  badge?: string
  color: string
}

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState<MetricCard[]>([])
  const [quickActions, setQuickActions] = useState<QuickAction[]>([])
  const { userProfile, trackPageView } = useEcosystem()

  // Track page view only once on mount
  useEffect(() => {
    trackPageView("/dashboard", "Dashboard Overview")

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [trackPageView]) // Added trackPageView to dependencies

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = () => {
      const metricsData: MetricCard[] = [
        {
          title: "Total Balance",
          value: "$124,592.00",
          change: "+12.5%",
          changeType: "positive",
          icon: DollarSign,
          description: "Across all accounts",
        },
        {
          title: "Monthly Income",
          value: "$8,420.00",
          change: "+8.2%",
          changeType: "positive",
          icon: TrendingUp,
          description: "This month vs last",
        },
        {
          title: "Credit Score",
          value: "742",
          change: "+15 pts",
          changeType: "positive",
          icon: CreditCard,
          description: "Excellent rating",
        },
        {
          title: "Investment Growth",
          value: "$2,840.50",
          change: "-2.1%",
          changeType: "negative",
          icon: PieChart,
          description: "Portfolio performance",
        },
        {
          title: "Active Loans",
          value: "3",
          change: "No change",
          changeType: "neutral",
          icon: BarChart3,
          description: "Total active loans",
        },
        {
          title: "Savings Goal",
          value: "68%",
          change: "+5%",
          changeType: "positive",
          icon: Target,
          description: "Emergency fund progress",
        },
      ]

      const actionsData: QuickAction[] = [
        {
          title: "Transfer Money",
          description: "Send money between accounts",
          icon: ArrowUpRight,
          href: "/dashboard/transfers",
          color: "from-blue-500 to-cyan-500",
        },
        {
          title: "Pay Bills",
          description: "Manage and pay your bills",
          icon: CreditCard,
          href: "/dashboard/bills",
          badge: "3 due",
          color: "from-green-500 to-emerald-500",
        },
        {
          title: "Investment Portfolio",
          description: "View and manage investments",
          icon: TrendingUp,
          href: "/dashboard/portfolio",
          color: "from-purple-500 to-pink-500",
        },
        {
          title: "Credit Monitoring",
          description: "Check your credit score",
          icon: Shield,
          href: "/credit-suite",
          color: "from-orange-500 to-red-500",
        },
        {
          title: "Loan Center",
          description: "Apply for loans and mortgages",
          icon: Building,
          href: "/citizen/loan-center",
          badge: "New rates",
          color: "from-indigo-500 to-purple-500",
        },
        {
          title: "Real Estate",
          description: "Browse properties and investments",
          icon: Home,
          href: "/real-estate",
          color: "from-teal-500 to-green-500",
        },
      ]

      setMetrics(metricsData)
      setQuickActions(actionsData)
    }

    loadDashboardData()
  }, [selectedPeriod])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto"></div>
          <p className="text-white/70">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {userProfile?.name || "User"}</h1>
            <p className="text-white/70 mt-1">Here's what's happening with your finances today</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="bg-white/10 border-white/20">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Period Selector */}
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
          <TabsList className="bg-black/20 border-white/10">
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
            <TabsTrigger value="90d">90 Days</TabsTrigger>
            <TabsTrigger value="1y">1 Year</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedPeriod} className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-black/20 border-white/10 hover:bg-black/30 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-white/70">{metric.title}</CardTitle>
                      <metric.icon className="h-4 w-4 text-white/50" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">{metric.value}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className={`flex items-center text-sm ${
                            metric.changeType === "positive"
                              ? "text-green-400"
                              : metric.changeType === "negative"
                                ? "text-red-400"
                                : "text-white/50"
                          }`}
                        >
                          {metric.changeType === "positive" && <ArrowUpRight className="h-3 w-3" />}
                          {metric.changeType === "negative" && <ArrowDownRight className="h-3 w-3" />}
                          {metric.change}
                        </div>
                        <span className="text-xs text-white/50">{metric.description}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="h-auto p-4 bg-white/5 border-white/10 hover:bg-white/10 w-full"
                        onClick={() => (window.location.href = action.href)}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                            <action.icon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-white">{action.title}</h3>
                              {action.badge && (
                                <Badge variant="secondary" className="text-xs">
                                  {action.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-white/70 mt-1">{action.description}</p>
                          </div>
                        </div>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Transactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Grocery Store", amount: "-$127.50", time: "2 hours ago", type: "expense" },
                    { name: "Salary Deposit", amount: "+$3,200.00", time: "1 day ago", type: "income" },
                    { name: "Electric Bill", amount: "-$89.32", time: "2 days ago", type: "expense" },
                    { name: "Investment Dividend", amount: "+$45.20", time: "3 days ago", type: "income" },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{transaction.name}</p>
                        <p className="text-white/50 text-sm">{transaction.time}</p>
                      </div>
                      <div
                        className={`font-medium ${transaction.type === "income" ? "text-green-400" : "text-red-400"}`}
                      >
                        {transaction.amount}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-white/5 border-white/10">
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Financial Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Emergency Fund", current: 6800, target: 10000, color: "bg-blue-500" },
                    { name: "Vacation Savings", current: 2400, target: 5000, color: "bg-green-500" },
                    { name: "New Car Fund", current: 8500, target: 25000, color: "bg-purple-500" },
                  ].map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="text-white font-medium">{goal.name}</p>
                        <p className="text-white/70 text-sm">
                          ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                        </p>
                      </div>
                      <Progress value={(goal.current / goal.target) * 100} className="h-2" />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full bg-white/5 border-white/10">
                    Manage Goals
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
