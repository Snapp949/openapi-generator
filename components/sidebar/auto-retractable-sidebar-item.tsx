"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

import type { AutoRetractableSidebarItemProps } from "./auto-retractable-sidebar.types"

/**
 * Renders a single navigation link for the auto-retractable sidebar.
 * When the sidebar is collapsed only the icon is visible, otherwise
 * both the icon and text are shown.
 */
export function AutoRetractableSidebarItem({
  title,
  icon: Icon,
  url,
  isCollapsed = false,
}: AutoRetractableSidebarItemProps) {
  return (
    <Link
      href={url}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent/30 hover:text-accent-foreground",
        isCollapsed ? "justify-center" : "justify-start",
      )}
    >
      {/* Icon */}
      <Icon className="h-5 w-5 flex-shrink-0" />

      {/* Text shown only when the sidebar is expanded */}
      {!isCollapsed && <span className="truncate">{title}</span>}
    </Link>
  )
}
