"use client"

import { HolographicPerformanceMetrics } from "@/components/platform-hub/holographic-performance-metrics"

export default function PerformancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <HolographicPerformanceMetrics />
      </div>
    </div>
  )
}
