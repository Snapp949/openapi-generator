"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { usePortal } from "@/contexts/portal-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Home,
  TrendingUp,
  Building2,
  Users,
  Settings,
  CreditCard,
  PieChart,
  BarChart3,
  Shield,
  Briefcase,
  Crown,
  Activity,
  MapPin,
  Landmark,
  Monitor,
  Coins,
  Brain,
} from "lucide-react"

const navigationSections = {
  imperial: [
    {
      title: "Command Center",
      items: [
        { name: "Imperial Dashboard", path: "/imperial/command", icon: Crown, badge: "ADMIN" },
        { name: "System Control", path: "/imperial/system", icon: Settings, badge: "CRITICAL" },
        { name: "User Management", path: "/imperial/users", icon: Users, badge: "ACTIVE" },
        { name: "Platform Analytics", path: "/imperial/analytics", icon: BarChart3 },
        { name: "AI Command Center", path: "/imperial/ai-control", icon: Brain, badge: "NEURAL" },
      ],
    },
  ],
  citizen: [
    {
      title: "Financial Hub",
      items: [
        { name: "Dashboard", path: "/citizen/dashboard", icon: Home, badge: "HOME" },
        { name: "Investment Portfolio", path: "/investors/portal", icon: TrendingUp, badge: "ACTIVE" },
        { name: "Loan Center", path: "/citizen/loan-center", icon: Building2, badge: "NEW" },
        { name: "Credit Suite", path: "/credit", icon: CreditCard },
        { name: "Real Estate", path: "/real-estate", icon: MapPin },
        { name: "Business Suite", path: "/business-suite", icon: Briefcase, badge: "PRO" },
      ],
    },
    {
      title: "Digital Assets",
      items: [
        { name: "SnapDAX Exchange", path: "/snap-dax/digital-asset-exchange", icon: Coins, badge: "LIVE" },
        { name: "Asset Portfolio", path: "/snap-dax/portfolio", icon: PieChart },
      ],
    },
  ],
  vendor: [
    {
      title: "Business Hub",
      items: [
        { name: "Vendor Dashboard", path: "/vendor/dashboard", icon: Building2, badge: "BUSINESS" },
        { name: "Partnership Portal", path: "/vendor/partnerships", icon: Users },
        { name: "Revenue Analytics", path: "/vendor/revenue", icon: TrendingUp },
      ],
    },
  ],
  institutional: [
    {
      title: "Portfolio Management",
      items: [
        { name: "Institutional Dashboard", path: "/institutional/dashboard", icon: Landmark, badge: "PREMIUM" },
        { name: "Large Cap Investments", path: "/institutional/large-cap", icon: TrendingUp, badge: "HIGH VOLUME" },
        { name: "Fund Management", path: "/institutional/funds", icon: PieChart },
        { name: "Risk Analytics", path: "/institutional/risk", icon: Shield },
      ],
    },
  ],
  admin: [
    {
      title: "Platform Administration",
      items: [
        { name: "Admin Dashboard", path: "/admin/dashboard", icon: Monitor, badge: "SNAPPAIFI" },
        { name: "System Status", path: "/admin/system", icon: Activity, badge: "LIVE" },
        { name: "User Management", path: "/admin/users", icon: Users },
        { name: "Platform Settings", path: "/admin/settings", icon: Settings },
      ],
    },
  ],
}

export function EnvironmentSidebar({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const { currentPortal, portalConfig, getUserPortalAccess, switchPortal } = usePortal()
  const [isExpanded, setIsExpanded] = React.useState(false)

  const currentSections = navigationSections[currentPortal] || []
  const currentPortalConfig = portalConfig[currentPortal]
  const availablePortals = getUserPortalAccess()

  const handleProfileSwitch = async (portal: string) => {
    const success = await switchPortal(portal as any)
    if (success) {
      const newPath =
        {
          imperial: "/imperial/command",
          citizen: "/citizen/dashboard",
          vendor: "/vendor/dashboard",
          institutional: "/institutional/dashboard",
          admin: "/admin/dashboard",
        }[portal] || "/dashboard/home"
      router.push(newPath)
    }
  }

  return (
    <motion.div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={cn("fixed left-0 top-0 h-full z-50 flex transition-width duration-300 ease-in-out", className)}
      animate={{ width: isExpanded ? "20rem" : "5rem" }}
    >
      <div
        className={`h-full w-full bg-gradient-to-b ${currentPortalConfig.color} backdrop-blur-2xl border-r border-white/10 shadow-2xl`}
      >
        <div className="h-full flex flex-col p-3 overflow-y-auto overflow-x-hidden">
          {/* Portal Header */}
          <div className="flex items-center gap-3 mb-4 p-2">
            <div className="text-2xl text-white">{currentPortalConfig.icon}</div>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 overflow-hidden"
                >
                  <h2 className="text-white font-bold text-lg truncate">{currentPortalConfig.name}</h2>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Switcher */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div className="bg-black/20 rounded-lg p-3">
                  <h3 className="text-white/90 font-medium text-sm mb-2">Switch Profile</h3>
                  <div className="space-y-1">
                    {availablePortals.map((portal) => {
                      const config = portalConfig[portal]
                      const isActive = portal === currentPortal
                      return (
                        <Button
                          key={portal}
                          variant="ghost"
                          size="sm"
                          onClick={() => handleProfileSwitch(portal)}
                          disabled={isActive}
                          className={cn(
                            "w-full justify-start text-white/80 hover:bg-white/10 transition-colors",
                            isActive && "bg-white/20 text-white",
                          )}
                        >
                          <span className="text-lg mr-2">{config.icon}</span>
                          <span className="font-medium text-sm">{config.name}</span>
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Separator className="bg-white/20 my-2" />

          {/* Navigation */}
          <div className="flex-1 space-y-4">
            {currentSections.map((section) => (
              <div key={section.title}>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.h3
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-white/70 font-medium text-xs uppercase tracking-wider px-2 mb-2"
                    >
                      {section.title}
                    </motion.h3>
                  )}
                </AnimatePresence>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = pathname === item.path
                    return (
                      <Button
                        key={item.name}
                        variant="ghost"
                        onClick={() => router.push(item.path)}
                        className={cn(
                          "w-full transition-all duration-200 group",
                          isExpanded ? "justify-start pl-2" : "justify-center",
                          isActive
                            ? "bg-white/20 text-white shadow-lg"
                            : "text-white/80 hover:bg-white/10 hover:text-white",
                        )}
                        title={isExpanded ? "" : item.name}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.span
                              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                              animate={{ opacity: 1, width: "auto", marginLeft: "0.75rem" }}
                              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                              className="flex-1 text-left truncate"
                            >
                              {item.name}
                            </motion.span>
                          )}
                        </AnimatePresence>
                        {isExpanded && item.badge && (
                          <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                            {item.badge}
                          </Badge>
                        )}
                      </Button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Status */}
          <Separator className="bg-white/20 my-2" />
          <div className="mt-auto">
            <Button
              variant="ghost"
              className={cn(
                "w-full transition-all duration-200",
                isExpanded ? "justify-start pl-2" : "justify-center",
                "text-white/80 hover:bg-white/10 hover:text-white",
              )}
            >
              <Settings className="w-5 h-5 shrink-0" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span
                    initial={{ opacity: 0, width: 0, marginLeft: 0 }}
                    animate={{ opacity: 1, width: "auto", marginLeft: "0.75rem" }}
                    exit={{ opacity: 0, width: 0, marginLeft: 0 }}
                    className="flex-1 text-left truncate"
                  >
                    Settings
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
