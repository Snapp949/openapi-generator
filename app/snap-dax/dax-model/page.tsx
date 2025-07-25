"use client"

import { DaxDashboard } from "@/components/snap-dax/dax-dashboard"
import { useEffect } from "react"
import { useEcosystem } from "@/contexts/ecosystem-context"

export default function DaxModelPage() {
  const { trackPageView } = useEcosystem()

  useEffect(() => {
    trackPageView("/snap-dax/dax-model")
  }, [trackPageView])

  return <DaxDashboard />
}
