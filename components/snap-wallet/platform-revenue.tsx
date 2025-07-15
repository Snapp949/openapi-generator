"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useSnapWallet } from "@/contexts/snap-wallet-context"
import { DollarSign, TrendingUp, Users, Percent, Target, BarChart3 } from "lucide-react"

export function PlatformRevenue() {
  const { getPlatformRevenue, supremeCard } = useSnapWallet()
  const revenue = getPlatformRevenue()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const monthlyTarget = 50000 // $50k monthly target
  const targetProgress = (revenue.monthlyRevenue / monthlyTarget) * 100

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
      <CardHeader>
        <CardTitle className="flex items-center text-emerald-800">
          <DollarSign className="w-5 h-5 mr-2" />
          Platform Revenue
        </CardTitle>
        <CardDescription className="text-emerald-600">
          Revenue generated from Supreme Card interest optimization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Revenue Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <TrendingUp className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm text-emerald-600 mb-1">Monthly Revenue</p>
            <p className="text-2xl font-bold text-emerald-800">{formatCurrency(revenue.monthlyRevenue)}</p>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-lg">
            <Percent className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm text-emerald-600 mb-1">Average Spread</p>
            <p className="text-2xl font-bold text-emerald-800">{revenue.averageSpread.toFixed(2)}%</p>
          </div>
        </div>

        {/* Monthly Target Progress */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-emerald-700">Monthly Target Progress</span>
            <span className="text-sm text-emerald-600">
              {formatCurrency(revenue.monthlyRevenue)} / {formatCurrency(monthlyTarget)}
            </span>
          </div>
          <Progress value={targetProgress} className="h-3" />
          <p className="text-xs text-emerald-600 mt-1">{targetProgress.toFixed(1)}% of monthly target achieved</p>
        </div>

        {/* Revenue Breakdown */}
        <div className="space-y-4">
          <h4 className="font-semibold text-emerald-800 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Revenue Breakdown
          </h4>

          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-white/50 rounded">
              <span className="text-sm text-emerald-700">Supreme Card Interest</span>
              <span className="font-medium text-emerald-800">{formatCurrency(revenue.monthlyRevenue * 0.85)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 rounded">
              <span className="text-sm text-emerald-700">Transaction Fees</span>
              <span className="font-medium text-emerald-800">{formatCurrency(revenue.monthlyRevenue * 0.1)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/50 rounded">
              <span className="text-sm text-emerald-700">Premium Features</span>
              <span className="font-medium text-emerald-800">{formatCurrency(revenue.monthlyRevenue * 0.05)}</span>
            </div>
          </div>
        </div>

        {/* User Metrics */}
        <div className="p-4 bg-white/50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-emerald-600 mr-2" />
              <div>
                <p className="font-medium text-emerald-800">Active Users</p>
                <p className="text-sm text-emerald-600">Users with Supreme Cards</p>
              </div>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{revenue.activeUsers.toLocaleString()}</p>
          </div>
        </div>

        {/* Projections */}
        <div className="p-4 bg-emerald-100 rounded-lg border border-emerald-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-emerald-800 flex items-center">
                <Target className="w-4 h-4 mr-1" />
                Annual Projection
              </p>
              <p className="text-sm text-emerald-600">Based on current growth rate</p>
            </div>
            <p className="text-2xl font-bold text-emerald-800">{formatCurrency(revenue.totalRevenue)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
