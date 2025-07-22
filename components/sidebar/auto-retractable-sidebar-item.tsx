"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  BarChart3,
  PieChart,
  Receipt,
  Calculator,
  TrendingUp,
  Zap,
  Coins,
  Building,
  Key,
  Briefcase,
  CreditCard,
  ShoppingBag,
  Package,
  Settings,
  User,
  LayoutDashboard,
  DollarSign,
  ShoppingCart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import type { NavigationItem } from "./auto-retractable-sidebar.types"

interface AutoRetractableSidebarItemProps {
  item: NavigationItem
  isExpanded: boolean
}

const iconMap = {
  Home,
  BarChart3,
  PieChart,
  Receipt,
  Calculator,
  TrendingUp,
  Zap,
  Coins,
  Building,
  Key,
  Briefcase,
  CreditCard,
  ShoppingBag,
  Package,
  Settings,
  User,
  LayoutDashboard,
  DollarSign,
  ShoppingCart,
}

export function AutoRetractableSidebarItem({ item, isExpanded }: AutoRetractableSidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

  const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home

  const buttonContent = (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className={`
        w-full justify-start h-10 px-3
        ${isExpanded ? "justify-start" : "justify-center px-0"}
        ${isActive ? "bg-secondary text-secondary-foreground" : ""}
      `}
      asChild
    >
      <Link href={item.href}>
        <IconComponent className={`h-4 w-4 ${isExpanded ? "mr-3" : ""}`} />
        {isExpanded && <span className="transition-opacity duration-200 opacity-100">{item.label}</span>}
      </Link>
    </Button>
  )

  if (!isExpanded) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            {item.label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return buttonContent
}
