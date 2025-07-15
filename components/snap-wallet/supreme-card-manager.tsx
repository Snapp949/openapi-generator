"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { useSnapWallet } from "@/contexts/snap-wallet-context"
import { CreditCard, TrendingUp, Shield, Zap, AlertCircle, CheckCircle, DollarSign } from "lucide-react"

export function SupremeCardManager() {
  const { supremeCard, creditCards, updateSupremeCard, optimizeInterestRates, getPlatformRevenue } = useSnapWallet()

  const [isOptimizing, setIsOptimizing] = useState(false)
  const revenue = getPlatformRevenue()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const handleOptimizeRates = async () => {
    setIsOptimizing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate optimization
    optimizeInterestRates()
    setIsOptimizing(false)
  }

  const handleToggleCard = async (isActive: boolean) => {
    await updateSupremeCard({ isActive })
  }

  if (!supremeCard) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CreditCard className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Supreme Card Found</h3>
          <p className="text-muted-foreground mb-4">
            Create a Supreme Card to consolidate all your credit cards into one powerful solution.
          </p>
          <Button>Create Supreme Card</Button>
        </CardContent>
      </Card>
    )
  }

  const linkedCardDetails = creditCards.filter((card) => supremeCard.linkedCards.includes(card.id))

  const utilizationPercentage = (supremeCard.totalBalance / supremeCard.totalCreditLimit) * 100

  return (
    <div className="space-y-6">
      {/* Supreme Card Display */}
      <Card className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white border-gray-700">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-2">Supreme Card</h2>
              <p className="text-gray-300">Ultimate credit card consolidation</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={supremeCard.isActive ? "default" : "secondary"}>
                {supremeCard.isActive ? "Active" : "Inactive"}
              </Badge>
              <Switch checked={supremeCard.isActive} onCheckedChange={handleToggleCard} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card Visual */}
            <div className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl p-6 text-black">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-medium opacity-80">SUPREME CARD</p>
                  <p className="text-xs opacity-60">SNAPIFI FINANCIAL</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-60">VALID THRU</p>
                  <p className="font-mono text-sm">
                    {supremeCard.expiryMonth.toString().padStart(2, "0")}/{supremeCard.expiryYear}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="font-mono text-xl tracking-wider">•••• •••• •••• {supremeCard.last4}</p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs opacity-60">CARDHOLDER</p>
                  <p className="font-medium">JOHN DOE</p>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-60">CVV</p>
                  <p className="font-mono">•••</p>
                </div>
              </div>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Total Credit Limit</p>
                  <p className="text-2xl font-bold">{formatCurrency(supremeCard.totalCreditLimit)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Available Credit</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(supremeCard.availableCredit)}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Credit Utilization</span>
                  <span className={utilizationPercentage > 30 ? "text-red-400" : "text-green-400"}>
                    {utilizationPercentage.toFixed(1)}%
                  </span>
                </div>
                <Progress value={utilizationPercentage} className="h-2" />
                {utilizationPercentage > 30 && (
                  <p className="text-xs text-red-400 mt-1 flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    High utilization may impact credit score
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Effective Rate</p>
                  <p className="text-xl font-bold text-yellow-400">{supremeCard.effectiveInterestRate.toFixed(2)}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Platform Spread</p>
                  <p className="text-xl font-bold text-green-400">+{supremeCard.platformSpread.toFixed(2)}%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interest Rate Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-500" />
            Interest Rate Optimization
          </CardTitle>
          <CardDescription>
            Automatically optimize interest rates across all linked cards for maximum platform revenue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center">
              <TrendingUp className="w-5 h-5 text-yellow-600 mr-3" />
              <div>
                <p className="font-medium text-yellow-800">Current Optimization Status</p>
                <p className="text-sm text-yellow-600">
                  Using highest rate of {Math.max(...linkedCardDetails.map((c) => c.interestRate)).toFixed(2)}% +{" "}
                  {supremeCard.platformSpread.toFixed(2)}% platform spread
                </p>
              </div>
            </div>
            <Button onClick={handleOptimizeRates} disabled={isOptimizing} className="bg-yellow-600 hover:bg-yellow-700">
              {isOptimizing ? "Optimizing..." : "Optimize Now"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-600 mb-1">Monthly Revenue</p>
              <p className="text-2xl font-bold text-green-800">{formatCurrency(revenue.monthlyRevenue)}</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-blue-600 mb-1">Risk Level</p>
              <p className="text-2xl font-bold text-blue-800">Low</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-purple-600 mb-1">Optimization Score</p>
              <p className="text-2xl font-bold text-purple-800">94%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Linked Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Linked Credit Cards</CardTitle>
          <CardDescription>Cards consolidated into your Supreme Card</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {linkedCardDetails.map((card) => (
              <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium">{card.name}</p>
                    <p className="text-sm text-muted-foreground">•••• {card.last4}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{card.interestRate.toFixed(2)}% APR</p>
                  <p className="text-sm text-muted-foreground">{formatCurrency(card.creditLimit)} limit</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
