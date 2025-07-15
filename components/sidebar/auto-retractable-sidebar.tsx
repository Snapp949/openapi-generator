"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  BarChart3,
  Briefcase,
  CreditCard,
  Building,
  Users,
  Settings,
  Search,
  Pin,
  PinOff,
  Wallet,
  Crown,
  Zap,
  TrendingUp,
  Shield,
  Globe,
  BookOpen,
  FlaskConical,
  Download,
  Star,
  Clock,
  Bookmark,
} from "lucide-react"

interface NavigationItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: string
  category: string
  description?: string
}

const navigationItems: NavigationItem[] = [
  // Core Dashboard
  { id: "home", label: "Dashboard Home", icon: Home, href: "/dashboard", category: "Dashboard" },
  { id: "analytics", label: "Analytics", icon: BarChart3, href: "/dashboard/analytics", category: "Dashboard" },
  { id: "portfolio", label: "Portfolio", icon: Briefcase, href: "/dashboard/portfolio", category: "Dashboard" },
  {
    id: "transactions",
    label: "Transactions",
    icon: CreditCard,
    href: "/dashboard/transactions",
    category: "Dashboard",
  },

  // Snap Wallet - NEW
  {
    id: "snap-wallet",
    label: "Snap Wallet",
    icon: Wallet,
    href: "/snap-wallet",
    badge: "NEW",
    category: "Financial",
    description: "Unified credit card management with Supreme Card",
  },

  // Financial Services
  { id: "credit-suite", label: "Credit Suite", icon: TrendingUp, href: "/credit-suite", category: "Financial" },
  {
    id: "financial-planning",
    label: "Financial Planning",
    icon: BarChart3,
    href: "/dashboard/financial-planning",
    category: "Financial",
  },

  // Trading & Investment
  { id: "snap-dax", label: "SNAP-DAX", icon: Zap, href: "/snap-dax/digital-asset-exchange", category: "Trading" },
  { id: "real-estate", label: "Real Estate Hub", icon: Building, href: "/real-estate", category: "Trading" },
  { id: "investors", label: "Investor Portal", icon: Users, href: "/investors/portal", category: "Trading" },

  // Business
  { id: "business-suite", label: "Business Suite", icon: Briefcase, href: "/business-suite", category: "Business" },
  {
    id: "ecommerex",
    label: "EcommereX",
    icon: Globe,
    href: "/dashboard/ecommerex/holographic-products",
    category: "Business",
  },

  // Legal & Compliance
  { id: "legal", label: "Legal Center", icon: Shield, href: "/legal", category: "Legal" },
  { id: "compliance", label: "Compliance", icon: BookOpen, href: "/institutional/compliance", category: "Legal" },

  // Beta & Labs
  { id: "beta-lab", label: "Beta Laboratory", icon: FlaskConical, href: "/beta-lab", badge: "BETA", category: "Labs" },
  { id: "suggestions", label: "Suggestions Hub", icon: Star, href: "/suggestions-hub", category: "Labs" },

  // Downloads
  { id: "download", label: "Downloads", icon: Download, href: "/download", category: "Resources" },
  { id: "clone", label: "Clone Platform", icon: Download, href: "/clone-download", category: "Resources" },
]

export function AutoRetractableSidebar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [recentItems, setRecentItems] = useState<string[]>([])
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>(["snap-wallet", "snap-dax", "credit-suite"])

  const pathname = usePathname()
  const router = useRouter()
  const sidebarRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Auto-collapse functionality
  useEffect(() => {
    if (isExpanded && !isPinned) {
      timeoutRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, 3000) // Auto-collapse after 3 seconds
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isExpanded, isPinned])

  // Handle mouse events
  const handleMouseEnter = () => {
    setIsExpanded(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleMouseLeave = () => {
    if (!isPinned) {
      timeoutRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, 500) // Small delay before collapsing
    }
  }

  // Handle navigation
  const handleNavigation = (href: string, itemId: string) => {
    router.push(href)

    // Add to recent items
    setRecentItems((prev) => {
      const filtered = prev.filter((id) => id !== itemId)
      return [itemId, ...filtered].slice(0, 5)
    })

    // Auto-collapse after navigation (unless pinned)
    if (!isPinned) {
      setTimeout(() => setIsExpanded(false), 300)
    }
  }

  // Filter items based on search
  const filteredItems = navigationItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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

  const toggleBookmark = (itemId: string) => {
    setBookmarkedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  return (
    <motion.div
      ref={sidebarRef}
      className="fixed left-0 top-0 h-full z-50 bg-background border-r border-border shadow-lg"
      initial={{ width: 64 }}
      animate={{ width: isExpanded ? 320 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm">Snapifi</h2>
                    <p className="text-xs text-muted-foreground">Financial Platform</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsPinned(!isPinned)}
              className={`${isExpanded ? "opacity-100" : "opacity-0"} transition-opacity`}
            >
              {isPinned ? <PinOff className="w-4 h-4" /> : <Pin className="w-4 h-4" />}
            </Button>
          </div>

          {/* Search */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="mt-4"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search environments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-8"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                className="p-2 space-y-4"
              >
                {/* Bookmarks */}
                {bookmarkedItems.length > 0 && (
                  <div>
                    <div className="flex items-center px-2 py-1 mb-2">
                      <Bookmark className="w-4 h-4 text-muted-foreground mr-2" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Bookmarks
                      </span>
                    </div>
                    <div className="space-y-1">
                      {navigationItems
                        .filter((item) => bookmarkedItems.includes(item.id))
                        .map((item) => (
                          <Button
                            key={item.id}
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className="w-full justify-start h-8 px-2"
                            onClick={() => handleNavigation(item.href, item.id)}
                          >
                            <item.icon className="w-4 h-4 mr-2 shrink-0" />
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </Button>
                        ))}
                    </div>
                    <Separator className="my-3" />
                  </div>
                )}

                {/* Recent Items */}
                {recentItems.length > 0 && (
                  <div>
                    <div className="flex items-center px-2 py-1 mb-2">
                      <Clock className="w-4 h-4 text-muted-foreground mr-2" />
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recent</span>
                    </div>
                    <div className="space-y-1">
                      {navigationItems
                        .filter((item) => recentItems.includes(item.id))
                        .slice(0, 3)
                        .map((item) => (
                          <Button
                            key={item.id}
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className="w-full justify-start h-8 px-2"
                            onClick={() => handleNavigation(item.href, item.id)}
                          >
                            <item.icon className="w-4 h-4 mr-2 shrink-0" />
                            <span className="truncate">{item.label}</span>
                          </Button>
                        ))}
                    </div>
                    <Separator className="my-3" />
                  </div>
                )}

                {/* Grouped Navigation */}
                {Object.entries(groupedItems).map(([category, items]) => (
                  <div key={category}>
                    <div className="flex items-center px-2 py-1 mb-2">
                      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        {category}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {items.map((item) => (
                        <div key={item.id} className="group relative">
                          <Button
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className="w-full justify-start h-8 px-2"
                            onClick={() => handleNavigation(item.href, item.id)}
                          >
                            <item.icon className="w-4 h-4 mr-2 shrink-0" />
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </Button>

                          {/* Bookmark toggle */}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleBookmark(item.id)
                            }}
                          >
                            <Bookmark
                              className={`w-3 h-3 ${bookmarkedItems.includes(item.id) ? "fill-current" : ""}`}
                            />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            ) : (
              // Collapsed view - icons only
              <div className="p-2 space-y-2">
                {navigationItems.slice(0, 8).map((item) => (
                  <Button
                    key={item.id}
                    variant={pathname === item.href ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full h-12 p-0 relative group"
                    onClick={() => handleNavigation(item.href, item.id)}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.badge && <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />}

                    {/* Tooltip */}
                    <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      {item.description && <div className="text-xs text-muted-foreground mt-1">{item.description}</div>}
                    </div>
                  </Button>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <AnimatePresence>
            {isExpanded ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                <Button variant="ghost" className="w-full justify-start h-8" onClick={() => router.push("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <div className="text-xs text-muted-foreground px-2">
                  {isPinned ? "Sidebar pinned" : "Auto-collapse in 3s"}
                </div>
              </motion.div>
            ) : (
              <Button variant="ghost" size="sm" className="w-full h-12 p-0" onClick={() => router.push("/settings")}>
                <Settings className="w-5 h-5" />
              </Button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
