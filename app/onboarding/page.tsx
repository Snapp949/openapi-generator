"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ComprehensiveOnboarding } from "@/components/onboarding/comprehensive-onboarding"
import { useEcosystem } from "@/contexts/ecosystem-context"

export default function OnboardingPage() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const router = useRouter()
  const { addNotification } = useEcosystem()

  useEffect(() => {
    // Check if onboarding was already completed
    const isCompleted = localStorage.getItem("snapifi-onboarding-completed")
    if (isCompleted) {
      router.push("/dashboard")
      return
    }

    // Add welcome notification
    addNotification({
      title: "Welcome to SnapAiFi! 🎉",
      message: "Let's get you set up for financial success",
      type: "info",
      category: "onboarding",
      read: false,
    })
  }, [router, addNotification])

  const handleOnboardingComplete = () => {
    setShowOnboarding(false)
    router.push("/dashboard")
  }

  if (!showOnboarding) {
    return null
  }

  return <ComprehensiveOnboarding />
}
