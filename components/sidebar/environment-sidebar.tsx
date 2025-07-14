"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  ChevronDown,
  ChevronRight,
  Home,
  CreditCard,
  TrendingUp,
  Building,
  ShoppingBag,
  Briefcase,
  Shield,
  Settings,
  Bell,
  User,
  LogOut,
  Bookmark,
  Clock,
  Zap,
  Crown,
  MoreHorizontal,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
  BarChart3,
} from "lucide-react"
import { useEcosystem } from "@/contexts/ecosystem-context"
import { usePortal } from "@/contexts/portal-context"
import { motion, AnimatePresence } from "framer-motion"

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ElementType
  badge?: string
  isActive?: boolean
  children?: NavigationItem[]
  category: string
  description?: string
  isNew?: boolean
  isPremium?: boolean
  isBookmarked?: boolean
  lastVisited?: string
}

interface EnvironmentSidebarProps {
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function EnvironmentSidebar({ isCollapsed = false, onToggleCollapse }: EnvironmentSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["essential", "financial"])
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])
  const [hiddenItems, setHiddenItems] = useState<string[]>([])
  const [recentItems, setRecentItems] = useState<string[]>([])

  const pathname = usePathname()
  const router = useRouter()
  const { userProfile, notifications, getUnreadCount, currentEnvironment } = useEcosystem()
  const { currentPortal, portalConfig } = usePortal()

  const navigationItems: NavigationItem[] = [
    // Essential
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      icon: Home,
      category: "essential",
      description: "Main dashboard overview",
    },
    {
      id: "transactions",
      label: "Transactions",
      href: "/dashboard/transactions",
      icon: CreditCard,
      category: "essential",
      description: "View and manage transactions",
      badge: "12",
    },
    {
      id: "analytics",
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: TrendingUp,
      category: "essential",
      description: "Financial analytics and insights",
    },

    // Financial
    {
      id: "credit-suite",
      label: "Credit Suite",
      href: "/credit-suite",
      icon: CreditCard,
      category: "financial",
      description: "AI-powered credit optimization",
      isPremium: true,
      children: [
        {
          id: "credit-monitoring",
          label: "Credit Monitoring",
          href: "/credit-suite/monitoring",
          icon: Shield,
          category: "financial",
        },
        {
          id: "credit-optimization",
          label: "Credit Optimization",
          href: "/credit-suite/optimization",
          icon: Zap,
          category: "financial",
          isNew: true,
        },
        {
          id: "credit-reports",
          label: "Credit Reports",
          href: "/credit-suite/reports",
          icon: Eye,
          category: "financial",
        },
      ],
    },
    {
      id: "snap-dax",
      label: "SNAP-DAX Trading",
      href: "/dashboard/snap-dax",
      icon: TrendingUp,
      category: "financial",
      description: "Digital asset trading platform",
      badge: "Live",
      children: [
        {
          id: "trading-dashboard",
          label: "Trading Dashboard",
          href: "/dashboard/snap-dax",
          icon: TrendingUp,
          category: "financial",
        },
        {
          id: "portfolio",
          label: "Portfolio",
          href: "/dashboard/portfolio",
          icon: Eye,
          category: "financial",
        },
        {
          id: "market-data",
          label: "Market Data",
          href: "/snap-dax/market-data",
          icon: Eye,
          category: "financial",
        },
      ],
    },
    {
      id: "financial-planning",
      label: "Financial Planning",
      href: "/dashboard/financial-planning",
      icon: Eye,
      category: "financial",
      description: "Comprehensive financial planning tools",
      children: [
        {
          id: "budget-calculator",
          label: "Budget Calculator",
          href: "/dashboard/financial-planning/budget-calculator",
          icon: Eye,
          category: "financial",
        },
        {
          id: "investment-planner",
          label: "Investment Planner",
          href: "/dashboard/financial-planning/investment-planner",
          icon: Eye,
          category: "financial",
        },
        {
          id: "retirement-simulator",
          label: "Retirement Simulator",
          href: "/dashboard/financial-planning/retirement-simulator",
          icon: Eye,
          category: "financial",
        },
      ],
    },

    // Investment
    {
      id: "real-estate",
      label: "Real Estate Hub",
      href: "/real-estate",
      icon: Building,
      category: "investment",
      description: "Property investment platform",
      children: [
        {
          id: "property-search",
          label: "Property Search",
          href: "/real-estate",
          icon: Search,
          category: "investment",
        },
        {
          id: "loan-center",
          label: "Loan Center",
          href: "/citizen/loan-center",
          icon: CreditCard,
          category: "investment",
          badge: "50yr",
        },
        {
          id: "market-insights",
          label: "Market Insights",
          href: "/real-estate/insights",
          icon: TrendingUp,
          category: "investment",
        },
      ],
    },

    // Commerce
    {
      id: "ecommerex",
      label: "EcommereX",
      href: "/dashboard/ecommerex/holographic-products",
      icon: ShoppingBag,
      category: "commerce",
      description: "Holographic shopping experience",
      isNew: true,
      children: [
        {
          id: "holographic-products",
          label: "Holographic Products",
          href: "/dashboard/ecommerex/holographic-products",
          icon: Sparkles,
          category: "commerce",
        },
        {
          id: "marketplace",
          label: "Marketplace",
          href: "/commerce/marketplace",
          icon: ShoppingBag,
          category: "commerce",
        },
        {
          id: "orders",
          label: "Orders",
          href: "/commerce/orders",
          icon: Eye,
          category: "commerce",
          badge: "3",
        },
      ],
    },

    // Business
    {
      id: "business-suite",
      label: "Business Suite",
      href: "/business-suite",
      icon: Briefcase,
      category: "business",
      description: "Comprehensive business management",
      isPremium: true,
      children: [
        {
          id: "business-dashboard",
          label: "Business Dashboard",
          href: "/business-suite",
          icon: BarChart3,
          category: "business",
        },
        {
          id: "compliance",
          label: "Compliance",
          href: "/institutional/compliance",
          icon: Shield,
          category: "business",
        },
        {
          id: "analytics",
          label: "Business Analytics",
          href: "/business-suite/analytics",
          icon: TrendingUp,
          category: "business",
        },
      ],
    },

    // Legal
    {
      id: "legal-compliance",
      label: "Legal & Compliance",
      href: "/legal",
      icon: Shield,
      category: "legal",
      description: "Legal documentation and compliance",
      children: [
        {
          id: "legal-documents",
          label: "Legal Documents",
          href: "/legal",
          icon: Eye,
          category: "legal",
        },
        {
          id: "diplomatic-immunity",
          label: "Diplomatic Immunity",
          href: "/legal/diplomatic-immunity",
          icon: Crown,
          category: "legal",
          isPremium: true,
        },
        {
          id: "compliance-monitoring",
          label: "Compliance Monitoring",
          href: "/legal/compliance",
          icon: Shield,
          category: "legal",
        },
      ],
    },

    // Innovation
    {
      id: "beta-lab",
      label: "Beta Laboratory",
      href: "/beta-lab",
      icon: Zap,
      category: "innovation",
      description: "Experimental features and tools",
      isNew: true,
      children: [
        {
          id: "quantum-features",
          label: "Quantum Features",
          href: "/beta-lab/quantum",
          icon: Sparkles,
          category: "innovation",
        },
        {
          id: "ai-experiments",
          label: "AI Experiments",
          href: "/beta-lab/ai",
          icon: Eye,
          category: "innovation",
        },
      ],
    },
  ]

  // Filter items based on search and visibility
  const filteredItems = navigationItems.filter((item) => {
    if (hiddenItems.includes(item.id)) return false
    if (searchQuery) {
      return (
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return true
  })

  // Group items by category
  const groupedItems = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, NavigationItem[]>,
  )

  const categories = [
    { id: "essential", label: "Essential", icon: Home },
    { id: "financial", label: "Financial", icon: CreditCard },
    { id: "investment", label: "Investment", icon: Building },
    { id: "commerce", label: "Commerce", icon: ShoppingBag },
    { id: "business", label: "Business", icon: Briefcase },
    { id: "legal", label: "Legal", icon: Shield },
    { id: "innovation", label: "Innovation", icon: Zap },
  ]

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    )
  }

  const toggleBookmark = (itemId: string) => {
    setBookmarkedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const toggleHidden = (itemId: string) => {
    setHiddenItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const handleNavigation = (href: string, itemId: string) => {
    router.push(href)

    // Add to recent items
    setRecentItems((prev) => [itemId, ...prev.filter((id) => id !== itemId)].slice(0, 5))

    // Track navigation
    console.log(`Navigated to: ${href}`)
  }

  const isItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  if (isCollapsed) {
    return (
      <div className="w-16 bg-black/20 border-r border-white/10 flex flex-col items-center py-4 space-y-4">
        {/* Portal Indicator */}
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
          <Crown className="h-5 w-5 text-white" />
        </div>

        {/* Quick Navigation Icons */}
        <div className="space-y-2">
          {filteredItems.slice(0, 6).map((item) => (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              className={`w-10 h-10 p-0 ${isItemActive(item.href) ? "bg-purple-500/20 text-purple-400" : ""}`}
              onClick={() => handleNavigation(item.href, item.id)}
            >
              <item.icon className="h-4 w-4" />
            </Button>
          ))}
        </div>

        {/* Expand Button */}
        <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="w-10 h-10 p-0 mt-auto">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-80 bg-black/20 border-r border-white/10 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${portalConfig[currentPortal].color}`}>
              <Crown className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-sm">{portalConfig[currentPortal].name}</h2>
              <p className="text-xs text-muted-foreground">Navigation</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <Bell className="h-3 w-3" />
              {getUnreadCount() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">{getUnreadCount()}</Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="h-6 w-6 p-0">
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input
            placeholder="Search platforms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-8 bg-white/10 border-white/20 text-sm"
          />
        </div>
      </div>

      {/* Navigation Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Bookmarked Items */}
          {bookmarkedItems.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Bookmark className="h-3 w-3" />
                Bookmarked
              </h3>
              <div className="space-y-1">
                {bookmarkedItems.map((itemId) => {
                  const item = navigationItems.find((nav) => nav.id === itemId)
                  if (!item) return null
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start h-8 ${
                        isItemActive(item.href) ? "bg-purple-500/20 text-purple-400" : ""
                      }`}
                      onClick={() => handleNavigation(item.href, item.id)}
                    >
                      <item.icon className="h-3 w-3 mr-2" />
                      <span className="text-sm">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  )
                })}
              </div>
              <Separator className="bg-white/10" />
            </div>
          )}

          {/* Recent Items */}
          {recentItems.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <Clock className="h-3 w-3" />
                Recent
              </h3>
              <div className="space-y-1">
                {recentItems.slice(0, 3).map((itemId) => {
                  const item = navigationItems.find((nav) => nav.id === itemId)
                  if (!item) return null
                  return (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start h-8 ${
                        isItemActive(item.href) ? "bg-purple-500/20 text-purple-400" : ""
                      }`}
                      onClick={() => handleNavigation(item.href, item.id)}
                    >
                      <item.icon className="h-3 w-3 mr-2" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  )
                })}
              </div>
              <Separator className="bg-white/10" />
            </div>
          )}

          {/* Categories */}
          {categories.map((category) => {
            const categoryItems = groupedItems[category.id] || []
            if (categoryItems.length === 0) return null

            const isExpanded = expandedCategories.includes(category.id)

            return (
              <div key={category.id} className="space-y-2">
                <Collapsible open={isExpanded} onOpenChange={() => toggleCategory(category.id)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between h-8 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <category.icon className="h-3 w-3" />
                        {category.label}
                      </div>
                      <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    <AnimatePresence>
                      {categoryItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="group relative">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={`w-full justify-start h-8 ${
                                isItemActive(item.href) ? "bg-purple-500/20 text-purple-400" : ""
                              }`}
                              onClick={() => handleNavigation(item.href, item.id)}
                            >
                              <item.icon className="h-3 w-3 mr-2" />
                              <span className="text-sm flex-1 text-left">{item.label}</span>
                              <div className="flex items-center gap-1">
                                {item.isNew && (
                                  <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                                    New
                                  </Badge>
                                )}
                                {item.isPremium && <Crown className="h-3 w-3 text-yellow-400" />}
                                {item.badge && (
                                  <Badge variant="secondary" className="text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                              </div>
                            </Button>

                            {/* Item Actions */}
                            <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="h-3 w-3" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-48">
                                  <DropdownMenuItem onClick={() => handleNavigation(item.href, item.id)}>
                                    <ExternalLink className="h-3 w-3 mr-2" />
                                    Open
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toggleBookmark(item.id)}>
                                    <Bookmark className="h-3 w-3 mr-2" />
                                    {bookmarkedItems.includes(item.id) ? "Remove Bookmark" : "Add Bookmark"}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => toggleHidden(item.id)}>
                                    <EyeOff className="h-3 w-3 mr-2" />
                                    Hide
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>

                          {/* Sub-items */}
                          {item.children && (
                            <div className="ml-4 space-y-1 mt-1">
                              {item.children.map((child) => (
                                <Button
                                  key={child.id}
                                  variant="ghost"
                                  size="sm"
                                  className={`w-full justify-start h-7 text-xs ${
                                    isItemActive(child.href) ? "bg-purple-500/20 text-purple-400" : ""
                                  }`}
                                  onClick={() => handleNavigation(child.href, child.id)}
                                >
                                  <child.icon className="h-3 w-3 mr-2" />
                                  <span className="flex-1 text-left">{child.label}</span>
                                  {child.isNew && (
                                    <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400">
                                      New
                                    </Badge>
                                  )}
                                  {child.badge && (
                                    <Badge variant="secondary" className="text-xs">
                                      {child.badge}
                                    </Badge>
                                  )}
                                </Button>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            )
          })}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
              <User className="h-3 w-3 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium">{userProfile?.name || "User"}</p>
              <p className="text-xs text-muted-foreground">{userProfile?.tier || "Basic"}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                <Settings className="h-3 w-3 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="h-3 w-3 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="h-3 w-3 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
