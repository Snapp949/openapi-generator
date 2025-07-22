"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Search,
  ChevronDown,
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
  Zap,
  Crown,
  MoreHorizontal,
  ExternalLink,
  Eye,
  EyeOff,
  Pin,
  PinOff,
  Tent,
} from "lucide-react"
import {
  Button,
  Badge,
  Input,
  ScrollArea,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: React.ElementType
  category: string
  description?: string
  badge?: string
  isNew?: boolean
  isPremium?: boolean
  children?: NavigationItem[]
}

interface AutoRetractableSidebarProps {
  className?: string
  collapsedWidth?: number
  expandedWidth?: number
  autoCollapseDelay?: number
}

/* ------------ SAFE FALL-BACKS ------------ */
const defaultUserProfile = { name: "User", tier: "Basic" }
const portalConfig = {
  business: { name: "Business Portal", color: "from-purple-500 to-pink-600" },
  citizen: { name: "Citizen Portal", color: "from-blue-500 to-cyan-600" },
  institutional: { name: "Institutional Portal", color: "from-green-500 to-emerald-600" },
}
/* ---------------------------------------- */

export function AutoRetractableSidebar({
  className,
  collapsedWidth = 64,
  expandedWidth = 320,
  autoCollapseDelay = 500,
}: AutoRetractableSidebarProps) {
  /* ---------- STATE ---------- */
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [autoCollapseTimer, setAutoCollapseTimer] = useState<NodeJS.Timeout | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["essential", "financial"])
  const [bookmarkedItems, setBookmarkedItems] = useState<string[]>([])
  const [hiddenItems, setHiddenItems] = useState<string[]>([])

  /* ---------- REFS & ROUTING ---------- */
  const sidebarRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  /* ---------- DUMMY CONTEXT VALUES ---------- */
  const userProfile = defaultUserProfile
  const currentPortal = "business" satisfies keyof typeof portalConfig
  const getUnreadCount = () => 0

  /* ---------- NAVIGATION DATA ---------- */
  const navigationItems: NavigationItem[] = [
    // Essential
    { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: Home, category: "essential" },
    {
      id: "transactions",
      label: "Transactions",
      href: "/dashboard/transactions",
      icon: CreditCard,
      category: "essential",
      badge: "12",
    },
    { id: "analytics", label: "Analytics", href: "/dashboard/analytics", icon: TrendingUp, category: "essential" },

    // Financial
    {
      id: "credit-suite",
      label: "Credit Suite",
      href: "/credit-suite",
      icon: CreditCard,
      category: "financial",
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
      ],
    },
    {
      id: "snap-dax",
      label: "SNAP-DAX Trading",
      href: "/dashboard/snap-dax",
      icon: TrendingUp,
      category: "financial",
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
      ],
    },
    {
      id: "snap-wallet",
      label: "Snap Wallet",
      href: "/snap-wallet",
      icon: CreditCard,
      category: "financial",
      isNew: true,
    },

    // Investment
    {
      id: "real-estate",
      label: "Real Estate Hub",
      href: "/real-estate",
      icon: Building,
      category: "investment",
    },
    {
      id: "snap-rentals",
      label: "Snap Rentals",
      href: "/snap-rentals",
      icon: Tent,
      category: "investment",
      isNew: true,
    },

    // Commerce
    {
      id: "ecommerex",
      label: "EcommereX",
      href: "/dashboard/ecommerex/holographic-products",
      icon: ShoppingBag,
      category: "commerce",
      isNew: true,
    },

    // Business
    {
      id: "business-suite",
      label: "Business Suite",
      href: "/business-suite",
      icon: Briefcase,
      category: "business",
      isPremium: true,
    },

    // Legal
    {
      id: "legal",
      label: "Legal & Compliance",
      href: "/legal",
      icon: Shield,
      category: "legal",
    },

    // Innovation
    {
      id: "beta-lab",
      label: "Beta Laboratory",
      href: "/beta-lab",
      icon: Zap,
      category: "innovation",
      isNew: true,
    },
  ]

  const categories = [
    { id: "essential", label: "Essential", icon: Home },
    { id: "financial", label: "Financial", icon: CreditCard },
    { id: "investment", label: "Investment", icon: Building },
    { id: "commerce", label: "Commerce", icon: ShoppingBag },
    { id: "business", label: "Business", icon: Briefcase },
    { id: "legal", label: "Legal", icon: Shield },
    { id: "innovation", label: "Innovation", icon: Zap },
  ]

  /* ---------- EFFECTS ---------- */
  useEffect(() => {
    if (isExpanded && !isPinned && !isHovering) {
      const t = setTimeout(() => setIsExpanded(false), autoCollapseDelay + 2500)
      setAutoCollapseTimer(t)
      return () => clearTimeout(t)
    }
  }, [isExpanded, isPinned, isHovering, autoCollapseDelay])

  /* ---------- HANDLERS ---------- */
  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsExpanded(true)
    if (autoCollapseTimer) clearTimeout(autoCollapseTimer)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (!isPinned) {
      const t = setTimeout(() => setIsExpanded(false), autoCollapseDelay)
      setAutoCollapseTimer(t)
    }
  }

  const isItemActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  const handleNavigate = (href: string) => {
    router.push(href)
    if (!isPinned) setTimeout(() => setIsExpanded(false), 800)
  }

  /* ---------- RENDER ---------- */
  return (
    <motion.div
      ref={sidebarRef}
      className={cn(
        "fixed left-0 top-0 z-50 flex h-full flex-col border-r border-white/10 bg-black/20 backdrop-blur-xl",
        className,
      )}
      style={{ width: isExpanded ? expandedWidth : collapsedWidth }}
      animate={{ width: isExpanded ? expandedWidth : collapsedWidth }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ---------- HEADER ---------- */}
      <div className="border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className={`rounded-lg p-2 bg-gradient-to-r ${portalConfig[currentPortal].color}`}>
                  <Crown className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">{portalConfig[currentPortal].name}</h2>
                  <p className="text-xs text-white/50">Navigation</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsPinned((p) => !p)}
              aria-label={isPinned ? "Unpin sidebar" : "Pin sidebar"}
            >
              {isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            </Button>
            {isExpanded && (
              <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
                <Bell className="h-4 w-4" />
                {getUnreadCount() > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-4 w-4 p-0 text-[10px]">{getUnreadCount()}</Badge>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3 w-3 -translate-y-1/2 text-white/50" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="h-8 bg-white/10 pl-9 text-sm text-white placeholder:text-white/50"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------- CONTENT ---------- */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {categories.map((cat) => {
            const catItems = navigationItems.filter(
              (i) =>
                i.category === cat.id &&
                !hiddenItems.includes(i.id) &&
                (!searchQuery ||
                  i.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  i.description?.toLowerCase().includes(searchQuery.toLowerCase())),
            )
            if (catItems.length === 0) return null

            const isCatExpanded = expandedCategories.includes(cat.id)

            return (
              <div key={cat.id} className="space-y-2">
                <Collapsible open={isCatExpanded} onOpenChange={() => toggleCategory(cat.id)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex h-8 w-full items-center justify-between text-xs font-medium uppercase tracking-wider text-white/60 hover:text-white"
                    >
                      <div className="flex items-center gap-2">
                        <cat.icon className="h-3 w-3" />
                        {isExpanded && <span>{cat.label}</span>}
                      </div>
                      {isExpanded && (
                        <ChevronDown className={cn("h-3 w-3 transition-transform", isCatExpanded && "rotate-180")} />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    <AnimatePresence initial={false}>
                      {catItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="relative group">
                            <Button
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "flex h-8 w-full items-center justify-start",
                                isItemActive(item.href)
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "text-white/70 hover:bg-white/5 hover:text-white",
                              )}
                              onClick={() => handleNavigate(item.href)}
                            >
                              <item.icon className="mr-2 h-3 w-3 flex-shrink-0" />
                              {isExpanded && (
                                <>
                                  <span className="flex-1 truncate text-sm">{item.label}</span>
                                  <div className="flex flex-shrink-0 items-center gap-1">
                                    {item.isNew && (
                                      <Badge variant="secondary" className="text-xs text-green-400 bg-green-500/20">
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
                                </>
                              )}
                            </Button>

                            {/* item menu (appear on hover) */}
                            {isExpanded && (
                              <div className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                      <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={() => handleNavigate(item.href)}>
                                      <ExternalLink className="mr-2 h-3 w-3" />
                                      Open
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        setBookmarkedItems((prev) =>
                                          prev.includes(item.id)
                                            ? prev.filter((id) => id !== item.id)
                                            : [...prev, item.id],
                                        )
                                      }
                                    >
                                      <Bookmark className="mr-2 h-3 w-3" />
                                      {bookmarkedItems.includes(item.id) ? "Remove Bookmark" : "Add Bookmark"}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => setHiddenItems((prev) => [...prev, item.id])}>
                                      <EyeOff className="mr-2 h-3 w-3" />
                                      Hide
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            )}
                          </div>

                          {/* Children */}
                          {item.children && isExpanded && (
                            <div className="ml-4 mt-1 space-y-1">
                              {item.children.map((child) => (
                                <Button
                                  key={child.id}
                                  variant="ghost"
                                  size="sm"
                                  className={cn(
                                    "flex h-7 w-full items-center justify-start text-xs",
                                    isItemActive(child.href)
                                      ? "bg-purple-500/20 text-purple-400"
                                      : "text-white/60 hover:bg-white/5 hover:text-white",
                                  )}
                                  onClick={() => handleNavigate(child.href)}
                                >
                                  <child.icon className="mr-2 h-3 w-3" />
                                  <span className="flex-1 text-left">{child.label}</span>
                                  {child.isNew && (
                                    <Badge variant="secondary" className="text-xs text-green-400 bg-green-500/20">
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

      {/* ---------- FOOTER ---------- */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
              <User className="h-3 w-3 text-white" />
            </div>
            {isExpanded && (
              <div>
                <p className="text-xs font-medium text-white">{userProfile.name}</p>
                <p className="text-xs text-white/50">{userProfile.tier}</p>
              </div>
            )}
          </div>
          {isExpanded && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <MoreHorizontal className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings className="mr-2 h-3 w-3" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User className="mr-2 h-3 w-3" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-3 w-3" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </motion.div>
  )

  /* ---------- HELPERS ---------- */
  function toggleCategory(id: string) {
    setExpandedCategories((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]))
  }
}
