"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSnapWallet } from "@/contexts/snap-wallet-context"
import { format } from "date-fns"
import { Search, Filter, Download, CreditCard, TrendingUp, TrendingDown } from "lucide-react"

export function TransactionHistory() {
  const { transactions, getTransactionHistory } = useSnapWallet()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const getTransactionIcon = (amount: number) => {
    if (amount > 0) return <TrendingUp className="w-4 h-4 text-green-600" />
    return <TrendingDown className="w-4 h-4 text-red-600" />
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "declined":
        return <Badge variant="destructive">Declined</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const filteredTransactions = transactions
    .filter(
      (txn) =>
        txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.merchant.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((txn) => categoryFilter === "all" || txn.category === categoryFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return Math.abs(b.amount) - Math.abs(a.amount)
        case "category":
          return a.category.localeCompare(b.category)
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
    })

  const categories = Array.from(new Set(transactions.map((txn) => txn.category)))

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="w-5 h-5 mr-2" />
            Transaction Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="amount">Amount</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>{filteredTransactions.length} transactions found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  {getTransactionIcon(transaction.amount)}
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{format(new Date(transaction.date), "MMM dd, yyyy")}</span>
                      <span>•</span>
                      <span>{transaction.category}</span>
                      <span>•</span>
                      <span>{transaction.merchant}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  {getStatusBadge(transaction.status)}
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount >= 0 ? "+" : ""}
                      {formatCurrency(transaction.amount)}
                    </p>
                    {transaction.rewards > 0 && (
                      <p className="text-sm text-blue-600">+{formatCurrency(transaction.rewards)} rewards</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {filteredTransactions.length === 0 && (
              <div className="text-center py-8">
                <CreditCard className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">No transactions found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
