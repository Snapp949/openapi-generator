"use client"

import { useEffect, useState } from "react"
import { ComprehensiveOnboarding } from "@/components/onboarding/comprehensive-onboarding"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const [showOnboarding, setShowOnboarding] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("snapifi-onboarding-completed")

    if (onboardingCompleted === "true") {
      // Redirect to dashboard if already completed
      router.push("/dashboard")
    } else {
      setShowOnboarding(true)
    }
  }, [router])

  if (!showOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return <ComprehensiveOnboarding />
}
