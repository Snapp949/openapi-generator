"use client"

import type React from "react"

import { EnvironmentDropdown } from "@/components/ui/environment-dropdown"
import { GeniusOrb } from "@/components/genius-guide-orb/genius-orb"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <EnvironmentDropdown />
            <div className="flex items-center gap-4">
              <GeniusOrb />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
