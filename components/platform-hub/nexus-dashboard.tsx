"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Search,
  Settings,
  Zap,
  Crown,
  Shield,
  Briefcase,
  Home,
  BarChart3,
  ShoppingCart,
  Brain,
  Sparkles,
  Grid,
  List,
  SortAsc,
  SortDesc,
  HelpCircle,
} from "lucide-react"
import { PlatformCard } from "./platform-card"
import { OnboardingTour } from "./onboarding-tour"
import { DashboardCustomizer } from "./dashboard-customizer"

interface Environment {
  id: string
  name: string
  description: string
  category: string
  status: "active" | "beta" | "coming-soon"
  users: number
  growth: number
  icon: any
  href: string
  features: string[]
  isBookmarked?: boolean
  isHidden?: boolean
  priority: number
}

const environments: Environment[] = [
  {
    id: "imperial-command",
    name: "Imperial Command",
    description: "Executive control center for platform administration",
    category: "command",
    status: "active",
    users: 1247,
    growth: 23.5,
    icon: Crown,
    href: "/imperial/command",
    features: ["Admin Dashboard", "User Management", "System Control"],
    priority: 1,
  },
  {
    id: "citizen-dashboard",
    name: "Citizen Dashboard",
    description: "Personal financial management and services",
    category: "financial",
    status: "active",
    users: 15420,
    growth: 18.2,
    icon: Shield,
    href: "/citizen/dashboard",
    features: ["Personal Finance", "Credit Monitoring", "Loan Center"],
    priority: 2,
  },
  {
    id: "business-suite",
    name: "Business Suite",
    description: "Comprehensive business management platform",
    category: "business",
    status: "active",
    users: 8934,
    growth: 31.7,
    icon: Briefcase,
    href: "/business-suite",
    features: ["Business Analytics", "Team Management", "Revenue Optimization"],
    priority: 3,
  },
  {
    id: "real-estate",
    name: "Real Estate Hub",
    description: "Property investment and management platform",
    category: "commerce",
    status: "active",
    users: 5672,
    growth: 42.1,
    icon: Home,
    href: "/real-estate",
    features: ["Property Search", "Investment Analysis", "Market Insights"],
    priority: 4,
  },
  {
    id: "snap-dax",
    name: "SnapDAX Exchange",
    description: "Digital asset trading and portfolio management",
    category: "financial",
    status: "active",
    users: 12890,
    growth: 67.3,
    icon: BarChart3,
    href: "/snap-dax/digital-asset-exchange",
    features: ["Trading Platform", "Portfolio Analytics", "Market Data"],
    priority: 5,
  },
  {
    id: "ecommerex",
    name: "EcommerEX",
    description: "Advanced e-commerce and marketplace solutions",
    category: "commerce",
    status: "active",
    users: 23456,
    growth: 28.9,
    icon: ShoppingCart,
    href: "/commerce/marketplace",
    features: ["Product Catalog", "Order Management", "Analytics"],
    priority: 6,
  },
  {
    id: "credit-suite",
    name: "Credit Suite",
    description: "AI-powered credit optimization and monitoring",
    category: "financial",
    status: "active",
    users: 18734,
    growth: 45.6,
    icon: Brain,
    href: "/credit-suite",
    features: ["Credit Monitoring", "Score Optimization", "Dispute Management"],
    priority: 7,
  },
  {
    id: "beta-lab",
    name: "Beta Laboratory",
    description: "Experimental features and cutting-edge tools",
    category: "innovation",
    status: "beta",
    users: 892,
    growth: 156.7,
    icon: Sparkles,
    href: "/beta-lab",
    features: ["Quantum Features", "Neural Networks", "AI Experiments"],
    priority: 8,
  },
]

const categories = [
  { id: "all", name: "All Environments", icon: Grid },
  { id: "command", name: "Command Center", icon: Crown },
  { id: "financial", name: "Financial", icon: BarChart3 },
  { id: "business", name: "Business", icon: Briefcase },
  { id: "commerce", name: "Commerce", icon: ShoppingCart },
  { id: "innovation", name: "Innovation", icon: Sparkles },
]

export function NexusDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("priority")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [showCustomizer, setShowCustomizer] = useState(false)
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false)
  const [hideInactive, setHideInactive] = useState(false)
  const [environmentSettings, setEnvironmentSettings] = useState<Record<string, any>>({})

  // Check if user is new (for onboarding)
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem("nexus-onboarding-completed")
    if (!hasSeenOnboarding) {
      setShowOnboarding(true)
    }
  }, [])

  // Load user preferences
  useEffect(() => {
    const savedSettings = localStorage.getItem("nexus-dashboard-settings")
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setViewMode(settings.viewMode || "grid")
      setSortBy(settings.sortBy || "priority")
      setSortOrder(settings.sortOrder || "asc")
      setEnvironmentSettings(settings.environmentSettings || {})
    }
  }, [])

  // Save user preferences
  const saveSettings = () => {
    const settings = {
      viewMode,
      sortBy,
      sortOrder,
      environmentSettings,
    }
    localStorage.setItem("nexus-dashboard-settings", JSON.stringify(settings))
  }

  useEffect(() => {
    saveSettings()
  }, [viewMode, sortBy, sortOrder, environmentSettings])

  // Filter and sort environments
  const filteredEnvironments = useMemo(() => {
    const filtered = environments.filter((env) => {
      const matchesSearch =
        env.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        env.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        env.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || env.category === selectedCategory
      const matchesBookmark = !bookmarkedOnly || environmentSettings[env.id]?.isBookmarked
      const matchesActive = !hideInactive || env.status === "active"
      const notHidden = !environmentSettings[env.id]?.isHidden

      return matchesSearch && matchesCategory && matchesBookmark && matchesActive && notHidden
    })

    // Sort environments
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "name":
          aValue = a.name
          bValue = b.name
          break
        case "users":
          aValue = a.users
          bValue = b.users
          break
        case "growth":
          aValue = a.growth
          bValue = b.growth
          break
        case "priority":
        default:
          aValue = a.priority
          bValue = b.priority
          break
      }

      if (typeof aValue === "string") {
        return sortOrder === "asc" ? aValue.localeCompare(bValue as string) : (bValue as string).localeCompare(aValue)
      } else {
        return sortOrder === "asc" ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number)
      }
    })

    return filtered
  }, [searchQuery, selectedCategory, sortBy, sortOrder, bookmarkedOnly, hideInactive, environmentSettings])

  const toggleBookmark = (envId: string) => {
    setEnvironmentSettings((prev) => ({
      ...prev,
      [envId]: {
        ...prev[envId],
        isBookmarked: !prev[envId]?.isBookmarked,
      },
    }))
  }

  const toggleHidden = (envId: string) => {
    setEnvironmentSettings((prev) => ({
      ...prev,
      [envId]: {
        ...prev[envId],
        isHidden: !prev[envId]?.isHidden,
      },
    }))
  }

  const totalUsers = environments.reduce((sum, env) => sum + env.users, 0)
  const avgGrowth = environments.reduce((sum, env) => sum + env.growth, 0) / environments.length
  const activeEnvironments = environments.filter((env) => env.status === "active").length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 animate-pulse">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              SnapAiFi Nexus
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your unified command center for all financial, business, and innovation platforms
          </p>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{totalUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{activeEnvironments}</div>
              <div className="text-sm text-muted-foreground">Active Platforms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">+{avgGrowth.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Avg Growth</div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Platform Navigator
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowOnboarding(true)}
                  className="bg-white/10 border-white/20"
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Tour
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomizer(true)}
                  className="bg-white/10 border-white/20"
                >
                  <Settings className="h-4 w-4 mr-1" />
                  Customize
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20"
                />
              </div>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <category.icon className="h-4 w-4" />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="growth">Growth</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                  className="bg-white/10 border-white/20"
                >
                  {sortOrder === "asc" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  className="bg-white/10 border-white/20"
                >
                  {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch id="bookmarked-only" checked={bookmarkedOnly} onCheckedChange={setBookmarkedOnly} />
                <Label htmlFor="bookmarked-only" className="text-sm">
                  Bookmarked Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="hide-inactive" checked={hideInactive} onCheckedChange={setHideInactive} />
                <Label htmlFor="hide-inactive" className="text-sm">
                  Active Only
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-black/20 border-white/10">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-purple-600/50"
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-6">
            {filteredEnvironments.length === 0 ? (
              <Card className="bg-black/20 border-white/10">
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No platforms found</h3>
                  <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
                </CardContent>
              </Card>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "space-y-4"
                }
              >
                {filteredEnvironments.map((environment) => (
                  <PlatformCard
                    key={environment.id}
                    environment={environment}
                    viewMode={viewMode}
                    isBookmarked={environmentSettings[environment.id]?.isBookmarked}
                    onToggleBookmark={() => toggleBookmark(environment.id)}
                    onToggleHidden={() => toggleHidden(environment.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Results Summary */}
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredEnvironments.length} of {environments.length} platforms
        </div>
      </div>

      {/* Onboarding Tour */}
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => {
          setShowOnboarding(false)
          localStorage.setItem("nexus-onboarding-completed", "true")
        }}
      />

      {/* Dashboard Customizer */}
      <DashboardCustomizer
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
        environments={environments}
        environmentSettings={environmentSettings}
        onUpdateSettings={setEnvironmentSettings}
      />
    </div>
  )
}
