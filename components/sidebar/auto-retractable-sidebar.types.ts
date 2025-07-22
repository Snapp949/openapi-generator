import type { LucideIcon } from "lucide-react"

export interface SidebarBadge {
  content: string | number
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export interface SidebarItem {
  id?: string
  label: string
  icon?: LucideIcon
  href?: string
  onClick?: () => void
  badge?: SidebarBadge
  children?: SidebarItem[]
}
