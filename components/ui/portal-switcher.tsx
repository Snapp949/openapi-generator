"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Crown, Shield, Building, Users, Zap, ChevronDown, Check, Star, Sparkles, Globe } from "lucide-react"
import { usePortal } from "@/contexts/portal-context"
import { useRouter } from "next/navigation"

interface PortalOption {
  id: string
  name: string
  description: string
  icon: React.ElementType
  color: string
  features: string[]
  isActive?: boolean
  isPremium?: boolean
  comingSoon?: boolean
}

const portalOptions: PortalOption[] = [
  {
    id: "citizen",
    name: "Citizen Portal",
    description: "Personal financial management and services",
    icon: Shield,
    color: "from-blue-500 to-cyan-600",
    features: ["Personal Dashboard", "Credit Monitoring", "Loan Center", "Financial Planning"],
    isActive: true,
  },
  {
    id: "business",
    name: "Business Portal",
    description: "Comprehensive business management suite",
    icon: Building,
    color: "from-green-500 to-emerald-600",
    features: ["Business Analytics", "Team Management", "Compliance", "Revenue Optimization"],
    isActive: true,
    isPremium: true,
  },
  {
    id: "institutional",
    name: "Institutional Portal",
    description: "Enterprise-grade institutional services",
    icon: Crown,
    color: "from-yellow-500 to-orange-600",
    features: ["Risk Management", "Compliance Suite", "Trading Desk", "Client Management"],
    isActive: true,
    isPremium: true,
  },
  {
    id: "investor",
    name: "Investor Portal",
    description: "High-yield investment opportunities",
    icon: Star,
    color: "from-purple-500 to-pink-600",
    features: ["Investment Opportunities", "Portfolio Management", "Market Analysis", "Returns Tracking"],
    isActive: true,
    isPremium: true,
  },
  {
    id: "vendor",
    name: "Vendor Portal",
    description: "Supplier and vendor management",
    icon: Users,
    color: "from-indigo-500 to-purple-600",
    features: ["Vendor Management", "Contract Tracking", "Payment Processing", "Performance Analytics"],
    isActive: true,
  },
  {
    id: "global",
    name: "Global Portal",
    description: "International operations and compliance",
    icon: Globe,
    color: "from-teal-500 to-blue-600",
    features: ["Multi-Currency", "Global Compliance", "International Banking", "Cross-Border Payments"],
    comingSoon: true,
  },
]

export function PortalSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentPortal, switchPortal, portalConfig } = usePortal()
  const router = useRouter()

  const currentPortalData = portalOptions.find((portal) => portal.id === currentPortal) || portalOptions[0]

  const handlePortalSwitch = async (portalId: string) => {
    const portal = portalOptions.find((p) => p.id === portalId)
    if (!portal || portal.comingSoon) return

    try {
      await switchPortal(portalId)

      // Navigate to the portal's default route
      const routes = {
        citizen: "/citizen/dashboard",
        business: "/business-suite",
        institutional: "/institutional/dashboard",
        investor: "/investors/portal",
        vendor: "/vendor/dashboard",
        global: "/global/dashboard",
      }

      const route = routes[portalId as keyof typeof routes] || "/dashboard"
      router.push(route)

      setIsOpen(false)
    } catch (error) {
      console.error("Error switching portal:", error)
    }
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-white/5 border-white/20 hover:bg-white/10">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded bg-gradient-to-r ${currentPortalData.color}`}>
              <currentPortalData.icon className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm font-medium">{currentPortalData.name}</span>
          </div>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-80 bg-slate-900/95 backdrop-blur-xl border-purple-500/30">
        <div className="p-3">
          <h3 className="font-semibold text-sm mb-2">Switch Portal</h3>
          <p className="text-xs text-muted-foreground mb-4">Choose your workspace based on your role and needs</p>

          <div className="space-y-2">
            {portalOptions.map((portal) => (
              <motion.div key={portal.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <DropdownMenuItem
                  className={`p-0 ${portal.comingSoon ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                  onSelect={() => !portal.comingSoon && handlePortalSwitch(portal.id)}
                >
                  <div className="w-full p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${portal.color} flex-shrink-0`}>
                        <portal.icon className="h-4 w-4 text-white" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm">{portal.name}</h4>
                          {portal.id === currentPortal && <Check className="h-3 w-3 text-green-400" />}
                          {portal.isPremium && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                              <Crown className="h-2 w-2 mr-1" />
                              Premium
                            </Badge>
                          )}
                          {portal.comingSoon && (
                            <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30 text-xs">
                              <Sparkles className="h-2 w-2 mr-1" />
                              Soon
                            </Badge>
                          )}
                        </div>

                        <p className="text-xs text-muted-foreground mb-2">{portal.description}</p>

                        <div className="flex flex-wrap gap-1">
                          {portal.features.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs bg-white/10 text-white/70">
                              {feature}
                            </Badge>
                          ))}
                          {portal.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs bg-white/10 text-white/70">
                              +{portal.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              </motion.div>
            ))}
          </div>

          <DropdownMenuSeparator className="my-3 bg-white/10" />

          <div className="space-y-2">
            <DropdownMenuItem className="p-0">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8"
                onClick={() => router.push("/portal/settings")}
              >
                <Zap className="h-3 w-3 mr-2" />
                Portal Settings
              </Button>
            </DropdownMenuItem>

            <DropdownMenuItem className="p-0">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start h-8"
                onClick={() => router.push("/portal/permissions")}
              >
                <Shield className="h-3 w-3 mr-2" />
                Manage Permissions
              </Button>
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
