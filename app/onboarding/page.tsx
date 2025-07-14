"use client"

import { useEffect, useState } from "react"
import { ComprehensiveOnboarding } from "@/components/onboarding/comprehensive-onboarding"
import { useRouter } from "next/navigation"

export default function OnboardingPage() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if onboarding is already completed
    const completed = localStorage.getItem("snapifi-onboarding-completed")
    if (completed === "true") {
      setIsOnboardingCompleted(true)
      router.push("/dashboard")
    }
  }, [router])

  if (isOnboardingCompleted) {
    return null // Will redirect to dashboard
  }

  return <ComprehensiveOnboarding />
}
