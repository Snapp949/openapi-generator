"use client"

import { RealEstateMarketplace } from "./RealEstateMarketplace"
import { useEffect } from "react"
import { useEcosystem } from "@/contexts/ecosystem-context"

export default function RealEstatePage() {
  const { trackPageView } = useEcosystem()

  useEffect(() => {
    trackPageView("/real-estate", "Real Estate Marketplace")
  }, [trackPageView])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <RealEstateMarketplace />
    </div>
  )
}
