"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator } from "lucide-react"

interface TaxCalculation {
  principalTax: number
  penalties: number
  interest: number
  total: number
  offerAmount: number
  savings: number
}

export function TaxCalculator() {
  const [calculation, setCalculation] = useState<TaxCalculation | null>(null)
  const [formData, setFormData] = useState({
    taxYear: "",
    filingStatus: "",
    income: "",
    taxOwed: "",
    monthsDelinquent: "",
    reasonableCollectionPotential: "",
  })

  const calculateTax = () => {
    const principal = Number.parseFloat(formData.taxOwed) || 0
    const months = Number.parseInt(formData.monthsDelinquent) || 0
    const rcp = Number.parseFloat(formData.reasonableCollectionPotential) || 0

    // Simplified penalty and interest calculation
    const penaltyRate = 0.25 // 25% failure to pay penalty
    const interestRate = 0.06 // 6% annual interest

    const penalties = principal * penaltyRate
    const interest = principal * (interestRate * (months / 12))
    const total = principal + penalties + interest

    // Offer in Compromise calculation (simplified)
    const offerAmount = Math.max(rcp, principal * 0.1) // Minimum 10% of principal
    const savings = total - offerAmount

    setCalculation({
      principalTax: principal,
      penalties,
      interest,
      total,
      offerAmount,
      savings,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Tax Settlement Calculator
          </CardTitle>
          <CardDescription>Calculate potential tax settlements and payment options</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="offer-compromise" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="offer-compromise">Offer in Compromise</TabsTrigger>
              <TabsTrigger value="payment-plan">Payment Plan</TabsTrigger>
              <TabsTrigger value="penalty-interest">Penalty & Interest</TabsTrigger>
            </TabsList>

            <TabsContent value="offer-compromise" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="taxYear">Tax Year</Label>
                    <Select
                      value={formData.taxYear}
                      onValueChange={(value) => setFormData({ ...formData, taxYear: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tax year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                        <SelectItem value="2020">2020</SelectItem>
                        <SelectItem value="2019">2019</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="filingStatus">Filing Status</Label>
                    <Select
                      value={formData.filingStatus}
                      onValueChange={(value) => setFormData({ ...formData, filingStatus: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select filing status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single</SelectItem>
                        <SelectItem value="married-joint">Married Filing Jointly</SelectItem>
                        <SelectItem value="married-separate">Married Filing Separately</SelectItem>
                        <SelectItem value="head-household">Head of Household</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income">Annual Income</Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="Enter annual income"
                      value={formData.income}
                      onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="taxOwed">Tax Owed</Label>
                    <Input
                      id="taxOwed"
                      type="number"
                      placeholder="Enter total tax owed"
                      value={formData.taxOwed}
                      onChange={(e) => setFormData({ ...formData, taxOwed: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthsDelinquent">Months Delinquent</Label>
                    <Input
                      id="monthsDelinquent"
                      type="number"
                      placeholder="Number of months"
                      value={formData.monthsDelinquent}
                      onChange={(e) => setFormData({ ...formData, monthsDelinquent: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rcp">Reasonable Collection Potential</Label>
                    <Input
                      id="rcp"
                      type="number"
                      placeholder="Assets + future income"
                      value={formData.reasonableCollectionPotential}
                      onChange={(e) => setFormData({ ...formData, reasonableCollectionPotential: e.target.value })}
                    />
                  </div>

                  <Button onClick={calculateTax} className="w-full">
                    Calculate Settlement
                  </Button>
                </div>

                {calculation && (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Calculation Results</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span>Principal Tax:</span>
                          <span className="font-medium">${calculation.principalTax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Penalties:</span>
                          <span className="font-medium text-red-600">${calculation.penalties.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Interest:</span>
                          <span className="font-medium text-red-600">${calculation.interest.toLocaleString()}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between text-lg font-bold">
                          <span>Total Owed:</span>
                          <span className="text-red-600">${calculation.total.toLocaleString()}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between text-lg">
                          <span>Offer Amount:</span>
                          <span className="font-bold text-green-600">${calculation.offerAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg">
                          <span>Potential Savings:</span>
                          <span className="font-bold text-green-600">${calculation.savings.toLocaleString()}</span>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                          <p className="text-sm text-green-700 dark:text-green-300">
                            You could potentially save {((calculation.savings / calculation.total) * 100).toFixed(1)}%
                            of your total tax liability through an Offer in Compromise.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="payment-plan">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Plan Calculator</CardTitle>
                  <CardDescription>Calculate monthly payment options</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Payment plan calculator coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="penalty-interest">
              <Card>
                <CardHeader>
                  <CardTitle>Penalty & Interest Calculator</CardTitle>
                  <CardDescription>Calculate accrued penalties and interest</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Penalty & interest calculator coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
