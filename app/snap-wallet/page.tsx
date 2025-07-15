"use client"

import { SnapWalletDashboard } from "./SnapWalletDashboard"
import { SnapWalletProvider } from "@/contexts/snap-wallet-context"

export default function SnapWalletPage() {
  return (
    <SnapWalletProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
        <SnapWalletDashboard />
      </div>
    </SnapWalletProvider>
  )
}
