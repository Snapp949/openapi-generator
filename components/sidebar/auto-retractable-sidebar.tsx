import type React from "react"
import { Home, LayoutDashboard, ListChecks, Settings, ShoppingCart, Users, Tent } from "lucide-react"

import type { AutoRetractableSidebarProps } from "./auto-retractable-sidebar.types"
import { AutoRetractableSidebarItem } from "./auto-retractable-sidebar-item"

export const AutoRetractableSidebar: React.FC<AutoRetractableSidebarProps> = ({ isCollapsed }) => {
  const navItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/",
    },
    {
      title: "Users",
      icon: Users,
      url: "/users",
    },
    {
      title: "Products",
      icon: ShoppingCart,
      url: "/products",
    },
    {
      title: "Tasks",
      icon: ListChecks,
      url: "/tasks",
    },
    {
      title: "Real Estate",
      icon: Home,
      url: "/real-estate",
    },
    {
      title: "Snap Rentals",
      icon: Tent,
      url: "/snap-rentals",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "/settings",
    },
  ]

  return (
    <div
      className={`flex flex-col h-full ${
        isCollapsed ? "w-20" : "w-64"
      } bg-gray-100 dark:bg-gray-900 transition-width duration-300 ease-in-out`}
    >
      <div className="flex flex-col flex-grow p-4">
        {navItems.map((item) => (
          <AutoRetractableSidebarItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            url={item.url}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
      <div className="p-4">{/* Footer content can go here */}</div>
    </div>
  )
}
