"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useSnapWallet } from "@/contexts/snap-wallet-context"
import { SupremeCardManager } from "@/components/snap-wallet/supreme-card-manager"
import { CreditCardManager } from "@/components/snap-wallet/credit-card-manager"
import { TransactionHistory } from "@/components/snap-wallet/transaction-history"
import { SpendingAnalytics } from "@/components/snap-wallet/spending-analytics"
import { PlatformRevenue } from "@/components/snap-wallet/platform-revenue"
import { CreditCard, Wallet, TrendingUp, Shield, Zap, Star, DollarSign } from "lucide-react"

export function SnapWalletDashboard() {
  const { creditCards, supremeCard, getSpendingAnalytics, getPlatformRevenue, isLoading } = useSnapWallet()

  const [activeTab, setActiveTab] = useState("overview")
  const analytics = getSpendingAnalytics()
  const revenue = getPlatformRevenue()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Snap Wallet
          </h1>
          <p className="text-muted-foreground mt-2">
            Your unified financial command center with Supreme Card optimization
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Shield className="w-4 h-4 mr-1" />
            Secured
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Zap className="w-4 h-4 mr-1" />
            Optimized
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Credit Limit</p>
                <p className="text-2xl font-bold text-blue-900">{formatCurrency(supremeCard?.totalCreditLimit || 0)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Available Credit</p>
                <p className="text-2xl font-bold text-green-900">{formatCurrency(supremeCard?.availableCredit || 0)}</p>
              </div>
              <Wallet className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Monthly Spend</p>
                <p className="text-2xl font-bold text-purple-900">{formatCurrency(analytics.totalSpent)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Rewards Earned</p>
                <p className="text-2xl font-bold text-orange-900">{formatCurrency(analytics.rewardsEarned)}</p>
              </div>
              <Star className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Supreme Card Highlight */}
      {supremeCard && (
        <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white border-gray-700">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Supreme Card</h2>
                <p className="text-gray-300">All your cards, unified into one powerful solution</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Effective Rate</p>
                <p className="text-3xl font-bold text-yellow-400">{supremeCard.effectiveInterestRate.toFixed(2)}%</p>
                <p className="text-xs text-gray-400">Platform Spread: +{supremeCard.platformSpread.toFixed(2)}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Card Number</p>
                <p className="font-mono text-lg">•••• •••• •••• {supremeCard.last4}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Expires</p>
                <p className="font-mono text-lg">
                  {supremeCard.expiryMonth.toString().padStart(2, "0")}/{supremeCard.expiryYear}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Linked Cards</p>
                <p className="text-lg">{supremeCard.linkedCards.length} cards</p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Credit Utilization</span>
                <span>{((supremeCard.totalBalance / supremeCard.totalCreditLimit) * 100).toFixed(1)}%</span>
              </div>
              <Progress value={(supremeCard.totalBalance / supremeCard.totalCreditLimit) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Platform Revenue Dashboard (Admin View) */}
      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center text-emerald-800">
            <DollarSign className="w-5 h-5 mr-2" />
            Platform Revenue Analytics
          </CardTitle>
          <CardDescription className="text-emerald-600">
            Revenue generated from Supreme Card interest rate optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-sm text-emerald-600 mb-1">Monthly Revenue</p>
              <p className="text-3xl font-bold text-emerald-800">{formatCurrency(revenue.monthlyRevenue)}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-emerald-600 mb-1">Average Spread</p>
              <p className="text-3xl font-bold text-emerald-800">{revenue.averageSpread.toFixed(2)}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-emerald-600 mb-1">Active Users</p>
              <p className="text-3xl font-bold text-emerald-800">{revenue.activeUsers.toLocaleString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="supreme">Supreme Card</TabsTrigger>
          <TabsTrigger value="cards">Credit Cards</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SpendingAnalytics />
            <PlatformRevenue />
          </div>
        </TabsContent>

        <TabsContent value="supreme">
          <SupremeCardManager />
        </TabsContent>

        <TabsContent value="cards">
          <CreditCardManager />
        </TabsContent>

        <TabsContent value="transactions">
          <TransactionHistory />
        </TabsContent>

        <TabsContent value="analytics">
          <SpendingAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  )
}
