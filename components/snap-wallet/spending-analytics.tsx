"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useSnapWallet } from "@/contexts/snap-wallet-context"
import { BarChart3, TrendingUp, DollarSign, Star, PieChart } from "lucide-react"

export function SpendingAnalytics() {
  const { getSpendingAnalytics } = useSnapWallet()
  const analytics = getSpendingAnalytics()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const topCategories = Object.entries(analytics.categoryBreakdown)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const totalSpending = Object.values(analytics.categoryBreakdown).reduce((sum, amount) => sum + amount, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Spending Analytics
        </CardTitle>
        <CardDescription>Your spending patterns and insights</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-blue-600 mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-blue-800">{formatCurrency(analytics.totalSpent)}</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-green-600 mb-1">Rewards Earned</p>
            <p className="text-2xl font-bold text-green-800">{formatCurrency(analytics.rewardsEarned)}</p>
          </div>
        </div>

        {/* Category Breakdown */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center">
            <PieChart className="w-4 h-4 mr-2" />
            Top Spending Categories
          </h4>
          <div className="space-y-3">
            {topCategories.map(([category, amount]) => {
              const percentage = totalSpending > 0 ? (amount / totalSpending) * 100 : 0
              return (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category}</span>
                    <span className="font-medium">{formatCurrency(amount)}</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Monthly Trend */}
        <div>
          <h4 className="font-semibold mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Monthly Spending Trend
          </h4>
          <div className="flex items-end space-x-2 h-32">
            {analytics.monthlyTrend.map((amount, index) => {
              const maxAmount = Math.max(...analytics.monthlyTrend)
              const height = (amount / maxAmount) * 100
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: `${height}%` }} />
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date(Date.now() - (6 - index) * 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
                      month: "short",
                    })}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Interest Savings */}
        <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-yellow-800">Interest Optimization Savings</p>
              <p className="text-sm text-yellow-600">Saved through Supreme Card rate optimization</p>
            </div>
            <p className="text-2xl font-bold text-yellow-800">{formatCurrency(analytics.interestSaved)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
