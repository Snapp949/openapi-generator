"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Home,
  BarChart3,
  ShoppingCart,
  Briefcase,
  Crown,
  Shield,
  Brain,
  Sparkles,
  Settings,
  User,
  HelpCircle,
  ChevronRight,
  Zap,
  Star,
  Clock,
  TrendingUp,
  Users,
  X,
} from "lucide-react"
import Link from "next/link"
import { QuantumProfileCard } from "@/components/ui/quantum-profile-card"
import { PortalSwitcher } from "@/components/ui/portal-switcher"

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
  lastAccessed?: string
}

const environments: Environment[] = [
  {
    id: "imperial-command",
    name: "Imperial Command",
    description: "Executive control center",
    category: "command",
    status: "active",
    users: 1247,
    growth: 23.5,
    icon: Crown,
    href: "/imperial/command",
    features: ["Admin Dashboard", "User Management", "System Control"],
    lastAccessed: "2 hours ago",
  },
  {
    id: "citizen-dashboard",
    name: "Citizen Dashboard",
    description: "Personal financial hub",
    category: "financial",
    status: "active",
    users: 15420,
    growth: 18.2,
    icon: Shield,
    href: "/citizen/dashboard",
    features: ["Personal Finance", "Credit Monitoring", "Loan Center"],
    isBookmarked: true,
    lastAccessed: "5 minutes ago",
  },
  {
    id: "business-suite",
    name: "Business Suite",
    description: "Business management platform",
    category: "business",
    status: "active",
    users: 8934,
    growth: 31.7,
    icon: Briefcase,
    href: "/business-suite",
    features: ["Business Analytics", "Team Management", "Revenue Optimization"],
    lastAccessed: "1 hour ago",
  },
  {
    id: "real-estate",
    name: "Real Estate Hub",
    description: "Property investment platform",
    category: "commerce",
    status: "active",
    users: 5672,
    growth: 42.1,
    icon: Home,
    href: "/real-estate",
    features: ["Property Search", "Investment Analysis", "Market Insights"],
    isBookmarked: true,
    lastAccessed: "30 minutes ago",
  },
  {
    id: "snap-dax",
    name: "SnapDAX Exchange",
    description: "Digital asset trading",
    category: "financial",
    status: "active",
    users: 12890,
    growth: 67.3,
    icon: BarChart3,
    href: "/snap-dax/digital-asset-exchange",
    features: ["Trading Platform", "Portfolio Analytics", "Market Data"],
    lastAccessed: "15 minutes ago",
  },
  {
    id: "ecommerex",
    name: "EcommerEX",
    description: "E-commerce solutions",
    category: "commerce",
    status: "active",
    users: 23456,
    growth: 28.9,
    icon: ShoppingCart,
    href: "/commerce/marketplace",
    features: ["Product Catalog", "Order Management", "Analytics"],
    lastAccessed: "45 minutes ago",
  },
  {
    id: "credit-suite",
    name: "Credit Suite",
    description: "AI credit optimization",
    category: "financial",
    status: "active",
    users: 18734,
    growth: 45.6,
    icon: Brain,
    href: "/credit-suite",
    features: ["Credit Monitoring", "Score Optimization", "Dispute Management"],
    isBookmarked: true,
    lastAccessed: "10 minutes ago",
  },
  {
    id: "beta-lab",
    name: "Beta Laboratory",
    description: "Experimental features",
    category: "innovation",
    status: "beta",
    users: 892,
    growth: 156.7,
    icon: Sparkles,
    href: "/beta-lab",
    features: ["Quantum Features", "Neural Networks", "AI Experiments"],
    lastAccessed: "3 hours ago",
  },
]

export function EnvironmentSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<"all" | "bookmarked" | "recent">("all")
  const [filteredEnvironments, setFilteredEnvironments] = useState(environments)

  // Filter environments based on search and filter
  useEffect(() => {
    let filtered = environments

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (env) =>
          env.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          env.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          env.features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Apply category filter
    switch (selectedFilter) {
      case "bookmarked":
        filtered = filtered.filter((env) => env.isBookmarked)
        break
      case "recent":
        filtered = filtered
          .sort((a, b) => {
            const aTime = a.lastAccessed || "never"
            const bTime = b.lastAccessed || "never"
            if (aTime === "never") return 1
            if (bTime === "never") return -1
            return 0 // Simple sort for demo
          })
          .slice(0, 5)
        break
    }

    setFilteredEnvironments(filtered)
  }, [searchQuery, selectedFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "beta":
        return "bg-yellow-500"
      case "coming-soon":
        return "bg-gray-500"
      default:
        return "bg-blue-500"
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div
      className={`
        fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900/95 to-purple-900/95 
        backdrop-blur-xl border-r border-white/10 transition-all duration-300 z-50
        ${isExpanded ? "w-80" : "w-16"}
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
              <Zap className="h-5 w-5 text-white" />
            </div>
            {isExpanded && (
              <div className="flex-1">
                <h2 className="font-bold text-lg bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SnapAiFi
                </h2>
                <p className="text-xs text-muted-foreground">Nexus Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Search */}
        {isExpanded && (
          <div className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search environments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-8 bg-white/10 border-white/20 text-sm"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>

            {/* Quick Filters */}
            <div className="flex gap-1">
              <Button
                variant={selectedFilter === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
                className="text-xs h-7"
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "bookmarked" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedFilter("bookmarked")}
                className="text-xs h-7"
              >
                <Star className="h-3 w-3 mr-1" />
                Starred
              </Button>
              <Button
                variant={selectedFilter === "recent" ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedFilter("recent")}
                className="text-xs h-7"
              >
                <Clock className="h-3 w-3 mr-1" />
                Recent
              </Button>
            </div>
          </div>
        )}

        {/* Environment List */}
        <div className="flex-1 overflow-y-auto px-2">
          <div className="space-y-1">
            {filteredEnvironments.map((env) => (
              <Link key={env.id} href={env.href}>
                <div
                  className={`
                    group relative flex items-center gap-3 p-3 rounded-lg 
                    hover:bg-white/10 transition-all duration-200 cursor-pointer
                    ${isExpanded ? "mx-2" : "mx-1 justify-center"}
                  `}
                >
                  {/* Icon */}
                  <div className="relative">
                    <div
                      className={`
                      p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-600/20
                      group-hover:from-purple-500/30 group-hover:to-pink-600/30
                      transition-all duration-200
                    `}
                    >
                      <env.icon className="h-5 w-5 text-white" />
                    </div>

                    {/* Status Indicator */}
                    <div
                      className={`
                      absolute -top-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(env.status)}
                      ${env.status === "beta" ? "animate-pulse" : ""}
                    `}
                    />
                  </div>

                  {/* Content */}
                  {isExpanded && (
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm truncate">{env.name}</h3>
                        {env.isBookmarked && <Star className="h-3 w-3 text-yellow-400 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-1">{env.description}</p>

                      {/* Quick Stats */}
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{env.users > 1000 ? `${Math.round(env.users / 1000)}k` : env.users}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          <span className="text-green-400">+{env.growth}%</span>
                        </div>
                      </div>

                      {/* Last Accessed */}
                      {env.lastAccessed && (
                        <div className="text-xs text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {env.lastAccessed}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Hover Arrow */}
                  {isExpanded && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>
              </Link>
            ))}
          </div>

          {/* No Results */}
          {isExpanded && filteredEnvironments.length === 0 && (
            <div className="text-center py-8 px-4">
              <Search className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No environments found</p>
              {searchQuery && (
                <Button variant="ghost" size="sm" onClick={clearSearch} className="mt-2 text-xs">
                  Clear search
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 p-4">
          {isExpanded ? (
            <div className="space-y-3">
              {/* Profile Card */}
              <QuantumProfileCard />

              {/* Portal Switcher */}
              <PortalSwitcher />

              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="flex-1 text-xs">
                  <Settings className="h-3 w-3 mr-1" />
                  Settings
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 text-xs">
                  <HelpCircle className="h-3 w-3 mr-1" />
                  Help
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full p-2">
                <User className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="w-full p-2">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
