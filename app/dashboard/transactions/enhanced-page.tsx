"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { EnhancedTransactionFilters } from "@/components/transactions/enhanced-transaction-filters"
import { EnhancedTransactionDetailsModal } from "@/components/transactions/enhanced-transaction-details-modal"
import { BulkActionsToolbar } from "@/components/transactions/bulk-actions-toolbar"
import { TransactionExportModal } from "@/components/transactions/transaction-export-modal"
import { HolographicDataVisualization } from "@/components/ui/holographic-data-visualization"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  X,
  Search,
  BarChart3,
} from "lucide-react"

interface Transaction {
  id: string
  amount: number
  type: "income" | "expense" | "transfer"
  category: string
  subcategory?: string
  merchant: string
  description: string
  date: string
  status: "completed" | "pending" | "failed" | "cancelled"
  paymentMethod: string
  accountId: string
  accountName: string
  location?: {
    address: string
    city: string
    state: string
    country: string
    coordinates?: { lat: number; lng: number }
  }
  tags: string[]
  notes: string
  receiptUrl?: string
  referenceNumber: string
  fees?: number
  exchangeRate?: number
  originalAmount?: number
  originalCurrency?: string
  recurring?: {
    isRecurring: boolean
    frequency?: string
    nextDate?: string
  }
  relatedTransactions?: string[]
  metadata?: Record<string, any>
}

// Mock data
const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    amount: 89.99,
    type: "expense",
    category: "Food & Dining",
    subcategory: "Restaurants",
    merchant: "The Gourmet Bistro",
    description: "Dinner with clients",
    date: "2024-01-15T19:30:00Z",
    status: "completed",
    paymentMethod: "Credit Card",
    accountId: "acc_main",
    accountName: "Main Checking",
    tags: ["business", "client-dinner"],
    notes: "Business dinner with potential clients",
    referenceNumber: "REF-2024-0115-001",
    fees: 2.5,
  },
  {
    id: "txn_002",
    amount: 2500.0,
    type: "income",
    category: "Business",
    subcategory: "Consulting",
    merchant: "Acme Corp",
    description: "Consulting services payment",
    date: "2024-01-14T10:00:00Z",
    status: "completed",
    paymentMethod: "Bank Transfer",
    accountId: "acc_business",
    accountName: "Business Account",
    tags: ["consulting", "income"],
    notes: "Q1 consulting project payment",
    referenceNumber: "REF-2024-0114-002",
  },
  {
    id: "txn_003",
    amount: 45.67,
    type: "expense",
    category: "Transportation",
    subcategory: "Rideshare",
    merchant: "Uber",
    description: "Airport ride",
    date: "2024-01-13T08:15:00Z",
    status: "completed",
    paymentMethod: "Credit Card",
    accountId: "acc_main",
    accountName: "Main Checking",
    tags: ["travel", "business"],
    notes: "Ride to airport for business trip",
    referenceNumber: "REF-2024-0113-003",
  },
  {
    id: "txn_004",
    amount: 1200.0,
    type: "expense",
    category: "Bills & Utilities",
    subcategory: "Rent",
    merchant: "Property Management Co",
    description: "Monthly rent payment",
    date: "2024-01-01T00:00:00Z",
    status: "pending",
    paymentMethod: "Bank Transfer",
    accountId: "acc_main",
    accountName: "Main Checking",
    tags: ["rent", "monthly"],
    notes: "January rent payment",
    referenceNumber: "REF-2024-0101-004",
    recurring: {
      isRecurring: true,
      frequency: "Monthly",
      nextDate: "2024-02-01T00:00:00Z",
    },
  },
  {
    id: "txn_005",
    amount: 156.78,
    type: "expense",
    category: "Shopping",
    subcategory: "Electronics",
    merchant: "Best Buy",
    description: "Wireless headphones",
    date: "2024-01-12T14:22:00Z",
    status: "failed",
    paymentMethod: "Credit Card",
    accountId: "acc_main",
    accountName: "Main Checking",
    tags: ["electronics", "personal"],
    notes: "Payment failed - insufficient funds",
    referenceNumber: "REF-2024-0112-005",
  },
]

export default function EnhancedTransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(mockTransactions)
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([])
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // Analytics data for visualization
  const analyticsData = [
    { name: "Jan", income: 4000, expenses: 2400, net: 1600 },
    { name: "Feb", income: 3000, expenses: 1398, net: 1602 },
    { name: "Mar", income: 2000, expenses: 9800, net: -7800 },
    { name: "Apr", income: 2780, expenses: 3908, net: -1128 },
    { name: "May", income: 1890, expenses: 4800, net: -2910 },
    { name: "Jun", income: 2390, expenses: 3800, net: -1410 },
  ]

  const categoryData = [
    { name: "Food & Dining", value: 1200, color: "#3b82f6" },
    { name: "Transportation", value: 800, color: "#8b5cf6" },
    { name: "Shopping", value: 600, color: "#10b981" },
    { name: "Bills & Utilities", value: 1500, color: "#f59e0b" },
    { name: "Entertainment", value: 400, color: "#ef4444" },
  ]

  useEffect(() => {
    // Apply search filter
    if (searchQuery) {
      const filtered = transactions.filter(
        (transaction) =>
          transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          transaction.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
      setFilteredTransactions(filtered)
    } else {
      setFilteredTransactions(transactions)
    }
  }, [searchQuery, transactions])

  const handleFiltersChange = (filters: any) => {
    // Apply filters to transactions
    let filtered = [...transactions]

    // Apply search
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.merchant.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          transaction.description.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          transaction.category.toLowerCase().includes(filters.searchQuery.toLowerCase()),
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter((transaction) => filters.categories.includes(transaction.category))
    }

    // Apply type filter
    if (filters.types.length > 0) {
      filtered = filtered.filter((transaction) => filters.types.includes(transaction.type))
    }

    // Apply status filter
    if (filters.statuses.length > 0) {
      filtered = filtered.filter((transaction) => filters.statuses.includes(transaction.status))
    }

    // Apply amount range filter
    filtered = filtered.filter(
      (transaction) => transaction.amount >= filters.amountRange[0] && transaction.amount <= filters.amountRange[1],
    )

    // Apply date range filter
    if (filters.dateRange.from || filters.dateRange.to) {
      filtered = filtered.filter((transaction) => {
        const transactionDate = new Date(transaction.date)
        const fromDate = filters.dateRange.from ? new Date(filters.dateRange.from) : new Date(0)
        const toDate = filters.dateRange.to ? new Date(filters.dateRange.to) : new Date()
        return transactionDate >= fromDate && transactionDate <= toDate
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const aValue = a[filters.sortBy as keyof Transaction]
      const bValue = b[filters.sortBy as keyof Transaction]

      if (filters.sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    setFilteredTransactions(filtered)
  }

  const handleSelectTransaction = (transactionId: string) => {
    setSelectedTransactions((prev) =>
      prev.includes(transactionId) ? prev.filter((id) => id !== transactionId) : [...prev, transactionId],
    )
  }

  const handleSelectAll = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([])
    } else {
      setSelectedTransactions(filteredTransactions.map((t) => t.id))
    }
  }

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDetailsModalOpen(true)
  }

  const handleUpdateTransaction = (updatedTransaction: Transaction) => {
    setTransactions((prev) => prev.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
  }

  const handleDeleteTransaction = (transactionId: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== transactionId))
    setSelectedTransactions((prev) => prev.filter((id) => id !== transactionId))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <X className="w-4 h-4 text-red-400" />
      case "cancelled":
        return <X className="w-4 h-4 text-gray-400" />
      default:
        return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50"
    }
  }

  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)

  const netAmount = totalIncome - totalExpenses

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Enhanced Transactions</h1>
              <p className="text-slate-400">Advanced transaction management and analytics</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setIsExportModalOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-300">Total Income</p>
                  <p className="text-2xl font-bold text-white">${totalIncome.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-600/10 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-300">Total Expenses</p>
                  <p className="text-2xl font-bold text-white">${totalExpenses.toLocaleString()}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-br ${netAmount >= 0 ? "from-blue-500/10 to-blue-600/10 border-blue-500/20" : "from-orange-500/10 to-orange-600/10 border-orange-500/20"}`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${netAmount >= 0 ? "text-blue-300" : "text-orange-300"}`}>Net Amount</p>
                  <p className="text-2xl font-bold text-white">
                    {netAmount >= 0 ? "+" : ""}${netAmount.toLocaleString()}
                  </p>
                </div>
                <BarChart3 className={`w-8 h-8 ${netAmount >= 0 ? "text-blue-400" : "text-orange-400"}`} />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300">Total Transactions</p>
                  <p className="text-2xl font-bold text-white">{filteredTransactions.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Visualization */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <HolographicDataVisualization
            title="Income vs Expenses"
            data={analyticsData}
            type="line"
            hologramEnabled={true}
            realTime={false}
          />
          <HolographicDataVisualization
            title="Spending by Category"
            data={categoryData}
            type="pie"
            hologramEnabled={true}
            realTime={false}
          />
        </div>

        {/* Filters */}
        <EnhancedTransactionFilters
          onFiltersChange={handleFiltersChange}
          onReset={() => setFilteredTransactions(transactions)}
          totalTransactions={transactions.length}
          filteredTransactions={filteredTransactions.length}
        />

        {/* Bulk Actions */}
        {selectedTransactions.length > 0 && (
          <BulkActionsToolbar
            selectedCount={selectedTransactions.length}
            onClearSelection={() => setSelectedTransactions([])}
            onBulkDelete={() => {
              setTransactions((prev) => prev.filter((t) => !selectedTransactions.includes(t.id)))
              setSelectedTransactions([])
            }}
            onBulkExport={() => setIsExportModalOpen(true)}
            onBulkCategorize={(category) => {
              setTransactions((prev) => prev.map((t) => (selectedTransactions.includes(t.id) ? { ...t, category } : t)))
            }}
          />
        )}

        {/* Transactions Table */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Transactions</CardTitle>
                <CardDescription className="text-slate-400">
                  {filteredTransactions.length} of {transactions.length} transactions
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-700/50 text-white w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-slate-700/50 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700/50 hover:bg-slate-800/30">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedTransactions.length === filteredTransactions.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Merchant</TableHead>
                    <TableHead className="text-slate-300">Category</TableHead>
                    <TableHead className="text-slate-300">Amount</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Payment Method</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className="border-slate-700/50 hover:bg-slate-800/30 cursor-pointer"
                      onClick={() => handleViewTransaction(transaction)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedTransactions.includes(transaction.id)}
                          onCheckedChange={() => handleSelectTransaction(transaction.id)}
                        />
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="text-white font-medium">{transaction.merchant}</div>
                          <div className="text-sm text-slate-400">{transaction.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                          {transaction.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`font-medium ${transaction.type === "income" ? "text-green-400" : "text-red-400"}`}
                        >
                          {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(transaction.status)}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1 capitalize">{transaction.status}</span>
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{transaction.paymentMethod}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                            <DropdownMenuItem
                              onClick={() => handleViewTransaction(transaction)}
                              className="text-slate-300 hover:text-white hover:bg-slate-700"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-300 hover:text-white hover:bg-slate-700">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteTransaction(transaction.id)}
                              className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      <EnhancedTransactionDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        transaction={selectedTransaction}
        onUpdate={handleUpdateTransaction}
        onDelete={handleDeleteTransaction}
      />

      <TransactionExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        transactions={
          selectedTransactions.length > 0
            ? filteredTransactions.filter((t) => selectedTransactions.includes(t.id))
            : filteredTransactions
        }
      />
    </div>
  )
}
