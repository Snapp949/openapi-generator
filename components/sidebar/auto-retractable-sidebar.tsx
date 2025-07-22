"use client"
import { useState, useEffect, useRef } from "react"
import { Pin, PinOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { AutoRetractableSidebarItem } from "./auto-retractable-sidebar-item"
import type { SidebarCategory, NavigationItem } from "./auto-retractable-sidebar.types"

interface AutoRetractableSidebarProps {
  navigationItems?: NavigationItem[]
  className?: string
}

const defaultNavigationItems: NavigationItem[] = [
  // Dashboard
  { id: "home", label: "Home", href: "/dashboard/home", icon: "Home", category: "dashboard" },
  { id: "analytics", label: "Analytics", href: "/dashboard/analytics", icon: "BarChart3", category: "dashboard" },
  { id: "portfolio", label: "Portfolio", href: "/dashboard/portfolio", icon: "PieChart", category: "dashboard" },

  // Financial
  {
    id: "transactions",
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: "Receipt",
    category: "financial",
  },
  {
    id: "budget",
    label: "Budget Calculator",
    href: "/dashboard/financial-planning/budget-calculator",
    icon: "Calculator",
    category: "financial",
  },
  {
    id: "investments",
    label: "Investment Planner",
    href: "/dashboard/financial-planning/investment-planner",
    icon: "TrendingUp",
    category: "financial",
  },

  // Trading
  { id: "snap-dax", label: "SNAP-DAX", href: "/snap-dax", icon: "Zap", category: "trading" },
  {
    id: "digital-assets",
    label: "Digital Assets",
    href: "/snap-dax/digital-asset-exchange",
    icon: "Coins",
    category: "trading",
  },

  // Real Estate
  { id: "properties", label: "Properties", href: "/real-estate", icon: "Building", category: "real-estate" },
  { id: "rentals", label: "Rentals", href: "/snap-rentals", icon: "Key", category: "real-estate" },

  // Business
  { id: "business-suite", label: "Business Suite", href: "/business-suite", icon: "Briefcase", category: "business" },
  { id: "credit-suite", label: "Credit Suite", href: "/credit-suite", icon: "CreditCard", category: "business" },

  // Commerce
  { id: "marketplace", label: "Marketplace", href: "/commerce/marketplace", icon: "ShoppingBag", category: "commerce" },
  { id: "products", label: "Products", href: "/products", icon: "Package", category: "commerce" },

  // Settings
  { id: "settings", label: "Settings", href: "/settings", icon: "Settings", category: "settings" },
  { id: "profile", label: "Profile", href: "/profile", icon: "User", category: "settings" },
]

const categories: SidebarCategory[] = [
  { id: "dashboard", label: "Dashboard", icon: "LayoutDashboard" },
  { id: "financial", label: "Financial", icon: "DollarSign" },
  { id: "trading", label: "Trading", icon: "TrendingUp" },
  { id: "real-estate", label: "Real Estate", icon: "Building" },
  { id: "business", label: "Business", icon: "Briefcase" },
  { id: "commerce", label: "Commerce", icon: "ShoppingCart" },
  { id: "settings", label: "Settings", icon: "Settings" },
]

export function AutoRetractableSidebar({
  navigationItems = defaultNavigationItems,
  className = "",
}: AutoRetractableSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const collapseTimeoutRef = useRef<NodeJS.Timeout>()

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovered(true)
    setIsExpanded(true)
    if (collapseTimeoutRef.current) {
      clearTimeout(collapseTimeoutRef.current)
    }
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false)
    if (!isPinned) {
      collapseTimeoutRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, 300) // 300ms delay before collapsing
    }
  }

  // Toggle pin state
  const togglePin = () => {
    setIsPinned(!isPinned)
    if (!isPinned) {
      setIsExpanded(true)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (collapseTimeoutRef.current) {
        clearTimeout(collapseTimeoutRef.current)
      }
    }
  }, [])

  // Keep expanded if pinned
  useEffect(() => {
    if (isPinned) {
      setIsExpanded(true)
    }
  }, [isPinned])

  return (
    <TooltipProvider>
      <div
        ref={sidebarRef}
        className={`
          fixed left-0 top-0 z-50 h-full bg-background border-r border-border
          transition-all duration-300 ease-in-out
          ${isExpanded ? "w-64" : "w-16"}
          ${className}
        `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className={`transition-opacity duration-200 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
            <h2 className="text-lg font-semibold">Snapifi</h2>
          </div>

          <div className="flex items-center gap-2">
            {isExpanded && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" onClick={togglePin} className="h-8 w-8 p-0">
                    {isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">{isPinned ? "Unpin sidebar" : "Pin sidebar"}</TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-2 py-4">
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryItems = navigationItems.filter((item) => item.category === category.id)

              if (categoryItems.length === 0) return null

              return (
                <div key={category.id} className="space-y-2">
                  {isExpanded && (
                    <div className="px-2">
                      <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {category.label}
                      </h3>
                    </div>
                  )}

                  <div className="space-y-1">
                    {categoryItems.map((item) => (
                      <AutoRetractableSidebarItem key={item.id} item={item} isExpanded={isExpanded} />
                    ))}
                  </div>

                  {isExpanded && <Separator className="my-4" />}
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className={`transition-opacity duration-200 ${isExpanded ? "opacity-100" : "opacity-0"}`}>
            <p className="text-xs text-muted-foreground">{isPinned ? "Sidebar pinned" : "Hover to expand"}</p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
