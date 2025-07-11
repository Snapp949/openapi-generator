"use client"
import { NexusDashboard } from "@/components/platform-hub/nexus-dashboard"
import { DemoContextProvider } from "@/contexts/demo-context"
import { DemoBanner } from "@/components/ui/demo-banner"

export default function HomePage() {
  return (
    <DemoContextProvider>
      <div className="relative">
        <DemoBanner />
        <NexusDashboard />
      </div>
    </DemoContextProvider>
  )
}
