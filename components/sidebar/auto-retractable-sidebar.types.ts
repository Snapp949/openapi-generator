import type React from "react"

/** Props accepted by the sidebar wrapper */
export interface AutoRetractableSidebarProps {
  /** Collapse state passed down from the parent component */
  isCollapsed?: boolean
}

/** Props for each individual navigation item */
export interface AutoRetractableSidebarItemProps {
  /** Text label shown next to the icon */
  title: string
  /** Lucide‐React icon component */
  icon: React.ElementType
  /** Where the item should navigate */
  url: string
  /** Whether the sidebar is currently collapsed */
  isCollapsed?: boolean
}
