"use client"

import React from "react"

import type { ReactElement } from "react"
import { useState, useEffect, useRef } from "react"
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
import { Pin, PinOff } from "lucide-react"
import type { SidebarItem } from "./auto-retractable-sidebar.types"
import {
  Search,
  ChevronDown,
  Settings,
  Bell,
  User,
  LogOut,
  Bookmark,
  Crown,
  MoreHorizontal,
  ExternalLink,
  EyeOff,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface NavigationItem {
  id: string
  label: string
  href: string
  icon: ReactElement
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

interface AutoRetractableSidebarProps {
  items?: SidebarItem[]
  className?: string
  collapsedWidth?: number
  expandedWidth?: number
  autoCollapseDelay?: number
}

// Default user profile and portal config to prevent null errors
const defaultUserProfile = {
  name: "User",
  tier: "Basic",
}

const defaultPortalConfig = {
  citizen: {
    name: "Citizen Portal",
    color: "from-blue-500 to-cyan-600",
  },
  business: {
    name: "Business Portal",
    color: "from-purple-500 to-pink-600",
  },
  institutional: {
    name: "Institutional Portal",
    color: "from-green-500 to-emerald-600",
  },
}

export function AutoRetractableSidebar({
  items = [],
  className,
  collapsedWidth = 64,
  expandedWidth = 256,
  autoCollapseDelay = 300,
}: AutoRetractableSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  // Safe context usage with fallbacks
  const userProfile = defaultUserProfile
  const currentPortal = "business" // Default to business portal
  const portalConfig = defaultPortalConfig
  const getUnreadCount = () => 0 // Default to 0 notifications

  // Handle mouse enter
  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsExpanded(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  // Handle mouse leave
  const handleMouseLeave = () => {
    setIsHovering(false)
    if (!isPinned) {
      timeoutRef.current = setTimeout(() => {
        setIsExpanded(false)
      }, autoCollapseDelay)
    }
  }

  // Toggle pin state
  const togglePin = () => {
    setIsPinned(!isPinned)
    if (!isPinned) {
      setIsExpanded(true)
    }
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
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
    <motion.div
      ref={sidebarRef}
      className={cn(
        "fixed left-0 top-0 h-full bg-black/20 backdrop-blur-xl border-r border-white/10 z-50 flex flex-col",
        className,
      )}
      style={{ width: isExpanded ? expandedWidth : collapsedWidth }}
      animate={{ width: isExpanded ? expandedWidth : collapsedWidth }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
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
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${portalConfig[currentPortal]?.color || portalConfig.business.color}`}
                >
                  <Crown className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-sm text-white">
                    {portalConfig[currentPortal]?.name || portalConfig.business.name}
                  </h2>
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
              onClick={() => {
                setIsPinned((prev) => {
                  const newPinnedState = !prev
                  if (newPinnedState) {
                    setIsExpanded(true)
                    if (timeoutRef.current) {
                      clearTimeout(timeoutRef.current)
                    }
                  } else {
                    if (!isHovering) {
                      timeoutRef.current = setTimeout(() => {
                        setIsExpanded(false)
                      }, autoCollapseDelay)
                    }
                  }
                  return newPinnedState
                })
              }}
            >
              {isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
            </Button>
            {isExpanded && (
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Bell className="h-4 w-4" />
                {getUnreadCount() > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">{getUnreadCount()}</Badge>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Search */}
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-white/50" />
                <Input
                  placeholder="Search platforms..."
                  value=""
                  onChange={() => {}}
                  className="pl-9 h-8 bg-white/10 border-white/20 text-sm text-white placeholder:text-white/50"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Content */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {/* Bookmarked Items */}
          {items.filter((item) => item.isBookmarked).length > 0 && isExpanded && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <h3 className="text-xs font-medium text-white/50 uppercase tracking-wider flex items-center gap-2">
                <Bookmark className="h-3 w-3" />
                Bookmarked
              </h3>
              <div className="space-y-1">
                {items
                  .filter((item) => item.isBookmarked)
                  .map((item) => (
                    <Button
                      key={item.id}
                      variant="ghost"
                      size="sm"
                      className={`w-full justify-start h-8 ${
                        item.isActive ? "bg-purple-500/20 text-purple-400" : "text-white/70 hover:text-white"
                      }`}
                      onClick={() => (window.location.href = item.href)}
                    >
                      {item.icon && <item.icon className="h-3 w-3 mr-2" />}
                      <span className="text-sm">{item.label}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Button>
                  ))}
              </div>
              <Separator className="bg-white/10" />
            </motion.div>
          )}

          {/* Categories */}
          {items
            .reduce(
              (acc, item) => {
                if (!acc[item.category]) {
                  acc[item.category] = []
                }
                acc[item.category].push(item)
                return acc
              },
              {} as Record<string, SidebarItem[]>,
            )
            .map((categoryItems, category) => (
              <div key={category} className="space-y-2">
                <Collapsible open={categoryItems.some((item) => item.isActive)} onOpenChange={() => {}}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between h-8 text-xs font-medium text-white/50 uppercase tracking-wider hover:text-white/70"
                    >
                      <div className="flex items-center gap-2">
                        {categoryItems[0].icon && React.createElement(categoryItems[0].icon, { className: "h-3 w-3" })}
                        {isExpanded && <span>{category}</span>}
                      </div>
                      {isExpanded && (
                        <ChevronDown
                          className={`h-3 w-3 transition-transform ${categoryItems.some((item) => item.isActive) ? "rotate-180" : ""}`}
                        />
                      )}
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
                                item.isActive
                                  ? "bg-purple-500/20 text-purple-400"
                                  : "text-white/70 hover:text-white hover:bg-white/5"
                              }`}
                              onClick={() => (window.location.href = item.href)}
                            >
                              {item.icon && <item.icon className="h-3 w-3 mr-2 flex-shrink-0" />}
                              {isExpanded && (
                                <>
                                  <span className="text-sm flex-1 text-left truncate">{item.label}</span>
                                  <div className="flex items-center gap-1 flex-shrink-0">
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
                                </>
                              )}
                            </Button>

                            {/* Item Actions */}
                            {isExpanded && (
                              <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                      <MoreHorizontal className="h-3 w-3" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end" className="w-48">
                                    <DropdownMenuItem onClick={() => (window.location.href = item.href)}>
                                      <ExternalLink className="h-3 w-3 mr-2" />
                                      Open
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => {}}>
                                      <Bookmark className="h-3 w-3 mr-2" />
                                      {item.isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => {}}>
                                      <EyeOff className="h-3 w-3 mr-2" />
                                      Hide
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            )}
                          </div>

                          {/* Sub-items */}
                          {item.children && isExpanded && (
                            <div className="ml-4 space-y-1 mt-1">
                              {item.children.map((child) => (
                                <Button
                                  key={child.id}
                                  variant="ghost"
                                  size="sm"
                                  className={`w-full justify-start h-7 text-xs ${
                                    child.isActive
                                      ? "bg-purple-500/20 text-purple-400"
                                      : "text-white/60 hover:text-white hover:bg-white/5"
                                  }`}
                                  onClick={() => (window.location.href = child.href)}
                                >
                                  {child.icon && <child.icon className="h-3 w-3 mr-2" />}
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
            ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
              <User className="h-3 w-3 text-white" />
            </div>
            {isExpanded && (
              <div>
                <p className="text-xs font-medium text-white">{userProfile?.name || "User"}</p>
                <p className="text-xs text-white/50">{userProfile?.tier || "Basic"}</p>
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
                <DropdownMenuItem onClick={() => (window.location.href = "/settings")}>
                  <Settings className="h-3 w-3 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => (window.location.href = "/profile")}>
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
          )}
        </div>
      </div>
    </motion.div>
  )
}
