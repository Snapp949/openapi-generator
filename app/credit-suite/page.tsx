"use client"

import { CreditSuiteDashboard } from "./CreditSuiteDashboard"
import { useEffect } from "react"
import { useEcosystem } from "@/contexts/ecosystem-context"

export default function CreditSuitePage() {
  const { trackPageView } = useEcosystem()

  useEffect(() => {
    trackPageView("/credit-suite", "Credit Suite Dashboard")
  }, [trackPageView])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <CreditSuiteDashboard />
    </div>
  )
}
