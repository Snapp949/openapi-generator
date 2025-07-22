"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import type { SidebarItem } from "./auto-retractable-sidebar.types"

interface AutoRetractableSidebarItemProps {
  item: SidebarItem
  isExpanded: boolean
}

export function AutoRetractableSidebarItem({ item, isExpanded }: AutoRetractableSidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === item.href

  const ItemIcon = item.icon

  const content = (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
        "hover:bg-slate-700 hover:text-white",
        isActive ? "bg-blue-600 text-white" : "text-slate-300 hover:text-white",
        !isExpanded && "justify-center px-2",
      )}
    >
      {ItemIcon && <ItemIcon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-white" : "text-slate-400")} />}

      {isExpanded && (
        <>
          <span className="font-medium truncate">{item.label}</span>
          {item.badge && (
            <Badge variant={item.badge.variant || "secondary"} className="ml-auto text-xs">
              {item.badge.content}
            </Badge>
          )}
        </>
      )}
    </div>
  )

  if (item.href) {
    return (
      <Link href={item.href} className="block">
        {content}
      </Link>
    )
  }

  if (item.onClick) {
    return (
      <button onClick={item.onClick} className="w-full text-left">
        {content}
      </button>
    )
  }

  return <div>{content}</div>
}
