"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  CreditCard,
  Building,
  ShoppingBag,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Bell,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { useEcosystem } from "@/contexts/ecosystem-context"
import { HolographicHeader } from "@/components/ui/holographic-header"

interface DashboardMetric {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: any
  href: string
}

interface QuickAction {
  title: string
  description: string
  icon: any
  href: string
  badge?: string
}

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<DashboardMetric[]>([])
  const [quickActions, setQuickActions] = useState<QuickAction[]>([])
  const { userProfile, crossPlatformData, trackPageView } = useEcosystem()

  useEffect(() => {
    // Call once on mount
    trackPageView("/dashboard")

    // Dashboard metrics
    setMetrics([
      {
        title: "Total Portfolio Value",
        value: "$124,567.89",
        change: "+12.5%",
        changeType: "positive",
        icon: DollarSign,
        href: "/dashboard/portfolio",
      },
      {
        title: "Credit Score",
        value: "785",
        change: "+15 pts",
        changeType: "positive",
        icon: CreditCard,
        href: "/credit-suite",
      },
      {
        title: "Active Investments",
        value: "23",
        change: "+3",
        changeType: "positive",
        icon: TrendingUp,
        href: "/dashboard/snap-dax",
      },
      {
        title: "Monthly Revenue",
        value: "$45,230",
        change: "+8.2%",
        changeType: "positive",
        icon: BarChart3,
        href: "/business-suite",
      },
    ])

    // Quick Actions
    setQuickActions([
      {
        title: "SNAP-DAX Trading",
        description: "Access digital asset trading platform",
        icon: TrendingUp,
        href: "/dashboard/snap-dax",
        badge: "Live",
      },
      {
        title: "Credit Optimization",
        description: "Improve your credit score with AI",
        icon: CreditCard,
        href: "/credit-suite",
        badge: "AI",
      },
      {
        title: "Real Estate Search",
        description: "Find your next property investment",
        icon: Building,
        href: "/real-estate",
      },
      {
        title: "EcommereX Shop",
        description: "Holographic shopping experience",
        icon: ShoppingBag,
        href: "/dashboard/ecommerex/holographic-products",
        badge: "New",
      },
      {
        title: "Business Analytics",
        description: "Track your business performance",
        icon: BarChart3,
        href: "/business-suite",
      },
      {
        title: "Beta Laboratory",
        description: "Try experimental features",
        icon: Zap,
        href: "/beta-lab",
        badge: "Beta",
      },
    ])
  }, []) // ← depend on nothing so it only runs once

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <HolographicHeader
          title="Dashboard Overview"
          subtitle="Your unified financial command center"
          gradient="from-purple-400 to-pink-400"
        />

        {/* Welcome Section */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Welcome back, {userProfile?.name || "User"}!</CardTitle>
                <CardDescription className="text-lg">
                  Here's what's happening with your financial ecosystem today.
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="outline" size="sm" className="bg-white/10 border-white/20">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Link key={index} href={metric.href}>
              <Card className="bg-black/20 border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground group-hover:text-purple-400 transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {metric.changeType === "positive" ? (
                      <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-400 mr-1" />
                    )}
                    <span className={metric.changeType === "positive" ? "text-green-400" : "text-red-400"}>
                      {metric.change}
                    </span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-400" />
              Quick Actions
            </CardTitle>
            <CardDescription>Access your most used platforms and features</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Card className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-all duration-300 cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <action.icon className="h-6 w-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                        {action.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {action.badge}
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-black/20 border-white/10">
            <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            <TabsTrigger value="investments">Investment Activity</TabsTrigger>
            <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Your latest financial activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <DollarSign className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <p className="font-medium">Transaction #{i}234</p>
                          <p className="text-sm text-muted-foreground">2 hours ago</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-400">+$1,234.56</p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/transactions">
                    <Button variant="outline" className="w-full bg-white/10 border-white/20">
                      View All Transactions
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="investments" className="space-y-4">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Investment Activity</CardTitle>
                <CardDescription>Your portfolio performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <TrendingUp className="h-4 w-4 text-green-400" />
                        </div>
                        <div>
                          <p className="font-medium">Investment Update</p>
                          <p className="text-sm text-muted-foreground">Portfolio rebalanced</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-400">+5.2%</p>
                        <p className="text-sm text-muted-foreground">Today</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/portfolio">
                    <Button variant="outline" className="w-full bg-white/10 border-white/20">
                      View Portfolio
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
                <CardDescription>Important notifications and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
                          <Bell className="h-4 w-4 text-yellow-400" />
                        </div>
                        <div>
                          <p className="font-medium">System Alert</p>
                          <p className="text-sm text-muted-foreground">New feature available</p>
                        </div>
                      </div>
                      <Badge variant="secondary">New</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
