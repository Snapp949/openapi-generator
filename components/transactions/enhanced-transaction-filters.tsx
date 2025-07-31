"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Filter,
  CalendarIcon,
  TrendingUp,
  TrendingDown,
  X,
  Search,
  SlidersHorizontal,
  Download,
  RefreshCw,
} from "lucide-react"
import { format } from "date-fns"

interface TransactionFilters {
  dateRange: {
    from: Date | null
    to: Date | null
  }
  amountRange: [number, number]
  categories: string[]
  types: string[]
  statuses: string[]
  merchants: string[]
  paymentMethods: string[]
  searchQuery: string
  sortBy: string
  sortOrder: "asc" | "desc"
  showPending: boolean
  showRecurring: boolean
  minAmount: number
  maxAmount: number
}

interface EnhancedTransactionFiltersProps {
  onFiltersChange: (filters: TransactionFilters) => void
  onReset: () => void
  totalTransactions: number
  filteredTransactions: number
}

const categories = [
  "Food & Dining",
  "Shopping",
  "Transportation",
  "Entertainment",
  "Bills & Utilities",
  "Healthcare",
  "Travel",
  "Education",
  "Business",
  "Investment",
  "Transfer",
  "Other",
]

const transactionTypes = ["Income", "Expense", "Transfer", "Investment", "Refund"]

const statuses = ["Completed", "Pending", "Failed", "Cancelled", "Processing"]

const paymentMethods = ["Credit Card", "Debit Card", "Bank Transfer", "PayPal", "Crypto", "Cash", "Check"]

const sortOptions = [
  { value: "date", label: "Date" },
  { value: "amount", label: "Amount" },
  { value: "merchant", label: "Merchant" },
  { value: "category", label: "Category" },
  { value: "status", label: "Status" },
]

export function EnhancedTransactionFilters({
  onFiltersChange,
  onReset,
  totalTransactions,
  filteredTransactions,
}: EnhancedTransactionFiltersProps) {
  const [filters, setFilters] = useState<TransactionFilters>({
    dateRange: { from: null, to: null },
    amountRange: [0, 10000],
    categories: [],
    types: [],
    statuses: [],
    merchants: [],
    paymentMethods: [],
    searchQuery: "",
    sortBy: "date",
    sortOrder: "desc",
    showPending: true,
    showRecurring: true,
    minAmount: 0,
    maxAmount: 10000,
  })

  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false)
  const [savedFilters, setSavedFilters] = useState<{ name: string; filters: TransactionFilters }[]>([])

  const updateFilters = (newFilters: Partial<TransactionFilters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category]
    updateFilters({ categories: newCategories })
  }

  const handleTypeToggle = (type: string) => {
    const newTypes = filters.types.includes(type) ? filters.types.filter((t) => t !== type) : [...filters.types, type]
    updateFilters({ types: newTypes })
  }

  const handleStatusToggle = (status: string) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter((s) => s !== status)
      : [...filters.statuses, status]
    updateFilters({ statuses: newStatuses })
  }

  const handlePaymentMethodToggle = (method: string) => {
    const newMethods = filters.paymentMethods.includes(method)
      ? filters.paymentMethods.filter((m) => m !== method)
      : [...filters.paymentMethods, method]
    updateFilters({ paymentMethods: newMethods })
  }

  const handleReset = () => {
    const resetFilters: TransactionFilters = {
      dateRange: { from: null, to: null },
      amountRange: [0, 10000],
      categories: [],
      types: [],
      statuses: [],
      merchants: [],
      paymentMethods: [],
      searchQuery: "",
      sortBy: "date",
      sortOrder: "desc",
      showPending: true,
      showRecurring: true,
      minAmount: 0,
      maxAmount: 10000,
    }
    setFilters(resetFilters)
    onFiltersChange(resetFilters)
    onReset()
  }

  const saveCurrentFilters = () => {
    const name = prompt("Enter a name for this filter preset:")
    if (name) {
      setSavedFilters([...savedFilters, { name, filters }])
    }
  }

  const loadSavedFilters = (savedFilter: { name: string; filters: TransactionFilters }) => {
    setFilters(savedFilter.filters)
    onFiltersChange(savedFilter.filters)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.dateRange.from || filters.dateRange.to) count++
    if (filters.categories.length > 0) count++
    if (filters.types.length > 0) count++
    if (filters.statuses.length > 0) count++
    if (filters.paymentMethods.length > 0) count++
    if (filters.searchQuery) count++
    if (filters.amountRange[0] > 0 || filters.amountRange[1] < 10000) count++
    return count
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
              <Filter className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <CardTitle className="text-white">Transaction Filters</CardTitle>
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <span>
                  {filteredTransactions.toLocaleString()} of {totalTransactions.toLocaleString()} transactions
                </span>
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                    {getActiveFiltersCount()} active
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Advanced
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Quick Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="space-y-2">
            <Label className="text-sm text-slate-300">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search transactions..."
                value={filters.searchQuery}
                onChange={(e) => updateFilters({ searchQuery: e.target.value })}
                className="pl-10 bg-slate-800/50 border-slate-700/50 text-white"
              />
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-2">
            <Label className="text-sm text-slate-300">Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.dateRange.from ? (
                    filters.dateRange.to ? (
                      <>
                        {format(filters.dateRange.from, "LLL dd, y")} - {format(filters.dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(filters.dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={filters.dateRange.from || undefined}
                  selected={{
                    from: filters.dateRange.from || undefined,
                    to: filters.dateRange.to || undefined,
                  }}
                  onSelect={(range) =>
                    updateFilters({
                      dateRange: { from: range?.from || null, to: range?.to || null },
                    })
                  }
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <Label className="text-sm text-slate-300">Sort By</Label>
            <div className="flex space-x-2">
              <Select value={filters.sortBy} onValueChange={(value) => updateFilters({ sortBy: value })}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateFilters({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" })}
                className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
              >
                {filters.sortOrder === "asc" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Amount Range */}
        <div className="space-y-3">
          <Label className="text-sm text-slate-300">
            Amount Range: ${filters.amountRange[0].toLocaleString()} - ${filters.amountRange[1].toLocaleString()}
          </Label>
          <Slider
            value={filters.amountRange}
            onValueChange={(value) => updateFilters({ amountRange: value as [number, number] })}
            max={10000}
            min={0}
            step={50}
            className="w-full"
          />
        </div>

        {/* Quick Category Filters */}
        <div className="space-y-3">
          <Label className="text-sm text-slate-300">Categories</Label>
          <div className="flex flex-wrap gap-2">
            {categories.slice(0, 6).map((category) => (
              <Button
                key={category}
                variant={filters.categories.includes(category) ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryToggle(category)}
                className={
                  filters.categories.includes(category)
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                }
              >
                {category}
              </Button>
            ))}
            {isAdvancedOpen && (
              <>
                {categories.slice(6).map((category) => (
                  <Button
                    key={category}
                    variant={filters.categories.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleCategoryToggle(category)}
                    className={
                      filters.categories.includes(category)
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {isAdvancedOpen && (
          <Tabs defaultValue="types" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="types" className="data-[state=active]:bg-blue-600">
                Types
              </TabsTrigger>
              <TabsTrigger value="status" className="data-[state=active]:bg-blue-600">
                Status
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-blue-600">
                Payment
              </TabsTrigger>
              <TabsTrigger value="options" className="data-[state=active]:bg-blue-600">
                Options
              </TabsTrigger>
            </TabsList>

            <TabsContent value="types" className="space-y-3">
              <Label className="text-sm text-slate-300">Transaction Types</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {transactionTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.types.includes(type)}
                      onCheckedChange={() => handleTypeToggle(type)}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm text-slate-300">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="status" className="space-y-3">
              <Label className="text-sm text-slate-300">Transaction Status</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox
                      id={`status-${status}`}
                      checked={filters.statuses.includes(status)}
                      onCheckedChange={() => handleStatusToggle(status)}
                    />
                    <Label htmlFor={`status-${status}`} className="text-sm text-slate-300">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-3">
              <Label className="text-sm text-slate-300">Payment Methods</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {paymentMethods.map((method) => (
                  <div key={method} className="flex items-center space-x-2">
                    <Checkbox
                      id={`payment-${method}`}
                      checked={filters.paymentMethods.includes(method)}
                      onCheckedChange={() => handlePaymentMethodToggle(method)}
                    />
                    <Label htmlFor={`payment-${method}`} className="text-sm text-slate-300">
                      {method}
                    </Label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="options" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="pending"
                    checked={filters.showPending}
                    onCheckedChange={(checked) => updateFilters({ showPending: checked })}
                  />
                  <Label htmlFor="pending" className="text-sm text-slate-300">
                    Show Pending
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="recurring"
                    checked={filters.showRecurring}
                    onCheckedChange={(checked) => updateFilters({ showRecurring: checked })}
                  />
                  <Label htmlFor="recurring" className="text-sm text-slate-300">
                    Show Recurring
                  </Label>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Active Filters */}
        {getActiveFiltersCount() > 0 && (
          <div className="space-y-2">
            <Label className="text-sm text-slate-300">Active Filters</Label>
            <div className="flex flex-wrap gap-2">
              {filters.categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="bg-blue-500/20 text-blue-300 cursor-pointer hover:bg-blue-500/30"
                  onClick={() => handleCategoryToggle(category)}
                >
                  {category}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {filters.types.map((type) => (
                <Badge
                  key={type}
                  variant="secondary"
                  className="bg-green-500/20 text-green-300 cursor-pointer hover:bg-green-500/30"
                  onClick={() => handleTypeToggle(type)}
                >
                  {type}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {filters.statuses.map((status) => (
                <Badge
                  key={status}
                  variant="secondary"
                  className="bg-yellow-500/20 text-yellow-300 cursor-pointer hover:bg-yellow-500/30"
                  onClick={() => handleStatusToggle(status)}
                >
                  {status}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              {filters.paymentMethods.map((method) => (
                <Badge
                  key={method}
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-300 cursor-pointer hover:bg-purple-500/30"
                  onClick={() => handlePaymentMethodToggle(method)}
                >
                  {method}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Saved Filters */}
        {savedFilters.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm text-slate-300">Saved Filters</Label>
            <div className="flex flex-wrap gap-2">
              {savedFilters.map((savedFilter, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => loadSavedFilters(savedFilter)}
                  className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                >
                  {savedFilter.name}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <Button
            variant="outline"
            size="sm"
            onClick={saveCurrentFilters}
            className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
          >
            Save Filters
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Results
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
