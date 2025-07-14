"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Calendar, Clock, TrendingDown, Calculator, Phone } from "lucide-react"

interface PaymentPlan {
  id: string
  type: "short-term" | "long-term" | "partial-payment"
  status: "active" | "pending" | "completed" | "defaulted"
  totalAmount: number
  monthlyPayment: number
  remainingBalance: number
  nextPaymentDate: string
  paymentsRemaining: number
  setupFee: number
  interestRate: number
}

export function PaymentPlanManager() {
  const [paymentPlan] = useState<PaymentPlan>({
    id: "PP-2024-001",
    type: "long-term",
    status: "active",
    totalAmount: 45750,
    monthlyPayment: 850,
    remainingBalance: 38200,
    nextPaymentDate: "2024-04-15",
    paymentsRemaining: 45,
    setupFee: 149,
    interestRate: 0.06,
  })

  const [calculatorData, setCalculatorData] = useState({
    totalOwed: "",
    monthlyBudget: "",
    planType: "long-term",
  })

  const progressPercentage = ((paymentPlan.totalAmount - paymentPlan.remainingBalance) / paymentPlan.totalAmount) * 100

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "completed":
        return "bg-blue-500"
      case "defaulted":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "pending":
        return "Pending Approval"
      case "completed":
        return "Completed"
      case "defaulted":
        return "Defaulted"
      default:
        return "Unknown"
    }
  }

  const calculatePaymentPlan = () => {
    const total = Number.parseFloat(calculatorData.totalOwed) || 0
    const budget = Number.parseFloat(calculatorData.monthlyBudget) || 0

    if (total > 0 && budget > 0) {
      const months = Math.ceil(total / budget)
      const interestRate = calculatorData.planType === "short-term" ? 0 : 0.06
      const setupFee = calculatorData.planType === "short-term" ? 0 : 149

      return {
        months,
        monthlyPayment: budget,
        totalWithInterest: total * (1 + interestRate),
        setupFee,
        interestRate,
      }
    }
    return null
  }

  const calculationResult = calculatePaymentPlan()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payment Plan Manager</h2>
          <p className="text-muted-foreground">Manage your tax payment plans and calculate new options</p>
        </div>
        <Button>
          <CreditCard className="w-4 h-4 mr-2" />
          Make Payment
        </Button>
      </div>

      <Tabs defaultValue="current-plan" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current-plan">Current Plan</TabsTrigger>
          <TabsTrigger value="calculator">Payment Calculator</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="options">Plan Options</TabsTrigger>
        </TabsList>

        <TabsContent value="current-plan" className="space-y-6">
          {paymentPlan && (
            <>
              {/* Plan Overview */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Payment Plan {paymentPlan.id}
                        <Badge className={`${getStatusColor(paymentPlan.status)} text-white`}>
                          {getStatusText(paymentPlan.status)}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {paymentPlan.type === "short-term"
                          ? "Short-term"
                          : paymentPlan.type === "long-term"
                            ? "Long-term"
                            : "Partial Payment"}{" "}
                        Payment Plan
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${paymentPlan.monthlyPayment.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Monthly Payment</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Payment Progress</span>
                      <span>{progressPercentage.toFixed(1)}% Complete</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Paid: ${(paymentPlan.totalAmount - paymentPlan.remainingBalance).toLocaleString()}</span>
                      <span>Remaining: ${paymentPlan.remainingBalance.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Next Payment</div>
                        <div className="font-semibold flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {new Date(paymentPlan.nextPaymentDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Payments Remaining</div>
                        <div className="font-semibold">{paymentPlan.paymentsRemaining} payments</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Interest Rate</div>
                        <div className="font-semibold">{(paymentPlan.interestRate * 100).toFixed(2)}% annually</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Setup Fee</div>
                        <div className="font-semibold">${paymentPlan.setupFee}</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Original Amount</div>
                        <div className="font-semibold">${paymentPlan.totalAmount.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Plan Type</div>
                        <div className="font-semibold capitalize">{paymentPlan.type.replace("-", " ")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex gap-2 pt-4 border-t">
                    <Button>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Make Payment
                    </Button>
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Modify Plan
                    </Button>
                    <Button variant="outline">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Payments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Upcoming Payments
                  </CardTitle>
                  <CardDescription>Your next 3 scheduled payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => {
                      const paymentDate = new Date(paymentPlan.nextPaymentDate)
                      paymentDate.setMonth(paymentDate.getMonth() + index)

                      return (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${index === 0 ? "bg-blue-500" : "bg-gray-300"}`} />
                            <div>
                              <div className="font-medium">${paymentPlan.monthlyPayment.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">{paymentDate.toLocaleDateString()}</div>
                            </div>
                          </div>
                          {index === 0 && <Badge variant="secondary">Due Soon</Badge>}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="calculator" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Payment Plan Calculator
              </CardTitle>
              <CardDescription>
                Calculate different payment plan options based on your financial situation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalOwed">Total Amount Owed</Label>
                    <Input
                      id="totalOwed"
                      type="number"
                      placeholder="Enter total tax debt"
                      value={calculatorData.totalOwed}
                      onChange={(e) => setCalculatorData({ ...calculatorData, totalOwed: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyBudget">Monthly Payment Budget</Label>
                    <Input
                      id="monthlyBudget"
                      type="number"
                      placeholder="What can you afford monthly?"
                      value={calculatorData.monthlyBudget}
                      onChange={(e) => setCalculatorData({ ...calculatorData, monthlyBudget: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="planType">Plan Type</Label>
                    <select
                      id="planType"
                      value={calculatorData.planType}
                      onChange={(e) => setCalculatorData({ ...calculatorData, planType: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                      <option value="short-term">Short-term (&lt;=120 days)</option>
                      <option value="long-term">Long-term (&gt;120 days)</option>
                    </select>
                  </div>
                </div>

                {calculationResult && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Calculation Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Payment Duration:</span>
                        <span className="font-medium">{calculationResult.months} months</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Payment:</span>
                        <span className="font-medium">${calculationResult.monthlyPayment.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Setup Fee:</span>
                        <span className="font-medium">${calculationResult.setupFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interest Rate:</span>
                        <span className="font-medium">{(calculationResult.interestRate * 100).toFixed(2)}%</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total with Interest:</span>
                        <span>${calculationResult.totalWithInterest.toLocaleString()}</span>
                      </div>
                      <Button className="w-full mt-4">Apply for This Plan</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Track your payment history and receipts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Payment history will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="options">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Short-term Plan
                </CardTitle>
                <CardDescription>Pay in full within 120 days with no setup fee</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• No setup fee</li>
                  <li>• No interest charges</li>
                  <li>• 120 days maximum</li>
                  <li>• Automatic approval for qualified taxpayers</li>
                </ul>
                <Button className="w-full mt-4">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Long-term Plan
                </CardTitle>
                <CardDescription>Monthly payments over 6+ years with setup fee</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• $149 setup fee</li>
                  <li>• Interest and penalties apply</li>
                  <li>• Up to 72 months</li>
                  <li>• Financial disclosure required</li>
                </ul>
                <Button className="w-full mt-4">Learn More</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  Partial Payment Plan
                </CardTitle>
                <CardDescription>Pay what you can afford when full payment isn't possible</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• $149 setup fee</li>
                  <li>• Based on ability to pay</li>
                  <li>• Collection actions suspended</li>
                  <li>• Reviewed every 2 years</li>
                </ul>
                <Button className="w-full mt-4">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
