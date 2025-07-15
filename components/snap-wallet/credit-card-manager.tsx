"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSnapWallet } from "@/contexts/snap-wallet-context"
import { CreditCard, Plus, Trash2, Edit, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export function CreditCardManager() {
  const { creditCards, addCreditCard, removeCreditCard, updateCreditCard } = useSnapWallet()
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCard, setEditingCard] = useState<string | null>(null)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getBrandColor = (brand: string) => {
    switch (brand) {
      case "visa":
        return "from-blue-500 to-blue-600"
      case "mastercard":
        return "from-red-500 to-orange-500"
      case "amex":
        return "from-green-500 to-teal-500"
      case "discover":
        return "from-orange-500 to-yellow-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const getUtilizationStatus = (utilization: number) => {
    if (utilization < 10) return { color: "text-green-600", status: "Excellent", icon: CheckCircle }
    if (utilization < 30) return { color: "text-blue-600", status: "Good", icon: CheckCircle }
    if (utilization < 50) return { color: "text-yellow-600", status: "Fair", icon: AlertCircle }
    return { color: "text-red-600", status: "High", icon: AlertCircle }
  }

  const handleAddCard = async (formData: FormData) => {
    const cardData = {
      name: formData.get("name") as string,
      last4: formData.get("last4") as string,
      brand: formData.get("brand") as "visa" | "mastercard" | "amex" | "discover",
      expiryMonth: Number.parseInt(formData.get("expiryMonth") as string),
      expiryYear: Number.parseInt(formData.get("expiryYear") as string),
      creditLimit: Number.parseFloat(formData.get("creditLimit") as string),
      currentBalance: Number.parseFloat(formData.get("currentBalance") as string),
      availableCredit:
        Number.parseFloat(formData.get("creditLimit") as string) -
        Number.parseFloat(formData.get("currentBalance") as string),
      interestRate: Number.parseFloat(formData.get("interestRate") as string),
      minPayment: Number.parseFloat(formData.get("minPayment") as string),
      dueDate: formData.get("dueDate") as string,
      isActive: true,
      rewards: {
        type: formData.get("rewardsType") as "cashback" | "points" | "miles",
        rate: Number.parseFloat(formData.get("rewardsRate") as string),
        balance: 0,
      },
    }

    await addCreditCard(cardData)
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Credit Cards</h2>
          <p className="text-muted-foreground">Manage your credit card portfolio</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Credit Card</DialogTitle>
              <DialogDescription>Add a new credit card to your Snap Wallet</DialogDescription>
            </DialogHeader>
            <form action={handleAddCard} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Card Name</Label>
                  <Input id="name" name="name" placeholder="Chase Sapphire" required />
                </div>
                <div>
                  <Label htmlFor="last4">Last 4 Digits</Label>
                  <Input id="last4" name="last4" placeholder="1234" maxLength={4} required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Select name="brand" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="mastercard">Mastercard</SelectItem>
                      <SelectItem value="amex">American Express</SelectItem>
                      <SelectItem value="discover">Discover</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="interestRate">Interest Rate (%)</Label>
                  <Input id="interestRate" name="interestRate" type="number" step="0.01" placeholder="18.99" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="creditLimit">Credit Limit</Label>
                  <Input id="creditLimit" name="creditLimit" type="number" placeholder="10000" required />
                </div>
                <div>
                  <Label htmlFor="currentBalance">Current Balance</Label>
                  <Input id="currentBalance" name="currentBalance" type="number" placeholder="2500" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryMonth">Expiry Month</Label>
                  <Input id="expiryMonth" name="expiryMonth" type="number" min="1" max="12" placeholder="12" required />
                </div>
                <div>
                  <Label htmlFor="expiryYear">Expiry Year</Label>
                  <Input id="expiryYear" name="expiryYear" type="number" min="2024" placeholder="2027" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minPayment">Min Payment</Label>
                  <Input id="minPayment" name="minPayment" type="number" placeholder="125" required />
                </div>
                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" name="dueDate" type="date" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rewardsType">Rewards Type</Label>
                  <Select name="rewardsType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cashback">Cashback</SelectItem>
                      <SelectItem value="points">Points</SelectItem>
                      <SelectItem value="miles">Miles</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="rewardsRate">Rewards Rate (%)</Label>
                  <Input id="rewardsRate" name="rewardsRate" type="number" step="0.1" placeholder="2.0" required />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Add Card
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditCards.map((card) => {
          const utilization = (card.currentBalance / card.creditLimit) * 100
          const utilizationStatus = getUtilizationStatus(utilization)
          const StatusIcon = utilizationStatus.icon

          return (
            <Card key={card.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Card Visual */}
                <div className={`bg-gradient-to-br ${getBrandColor(card.brand)} p-6 text-white`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm opacity-80">{card.brand.toUpperCase()}</p>
                      <p className="text-xs opacity-60">{card.name}</p>
                    </div>
                    <Badge variant={card.isActive ? "default" : "secondary"} className="bg-white/20">
                      {card.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <p className="font-mono text-lg tracking-wider">•••• •••• •••• {card.last4}</p>
                  </div>

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs opacity-60">EXPIRES</p>
                      <p className="font-mono text-sm">
                        {card.expiryMonth.toString().padStart(2, "0")}/{card.expiryYear}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-60">APR</p>
                      <p className="font-bold">{card.interestRate.toFixed(2)}%</p>
                    </div>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Credit Limit</p>
                      <p className="font-semibold">{formatCurrency(card.creditLimit)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Available</p>
                      <p className="font-semibold text-green-600">{formatCurrency(card.availableCredit)}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">Utilization</span>
                      <div className="flex items-center">
                        <StatusIcon className={`w-4 h-4 mr-1 ${utilizationStatus.color}`} />
                        <span className={`text-sm font-medium ${utilizationStatus.color}`}>
                          {utilization.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <Progress value={utilization} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="font-semibold">{formatCurrency(card.currentBalance)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Min Payment</p>
                      <p className="font-semibold">{formatCurrency(card.minPayment)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                      <span className="text-sm text-muted-foreground">
                        {card.rewards.rate}% {card.rewards.type}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => setEditingCard(card.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCreditCard(card.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {creditCards.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <CreditCard className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Credit Cards</h3>
            <p className="text-muted-foreground mb-4">Add your first credit card to start using Snap Wallet</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Card
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
