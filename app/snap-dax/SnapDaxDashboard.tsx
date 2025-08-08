"use client"

import DaxDashboard from "@/components/snap-dax/dax-dashboard"

/**
 * SnapDaxDashboard
 * Thin wrapper to preserve the historical import path used by /app/snap-dax/page.tsx.
 * It simply renders the canonical DaxDashboard from components/snap-dax.
 */
export default function SnapDaxDashboard() {
  return <DaxDashboard />
}
