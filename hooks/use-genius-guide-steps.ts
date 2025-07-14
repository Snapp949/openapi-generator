"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  CreditCard,
  TrendingUp,
  Building,
  ShoppingBag,
  Calculator,
  Target,
  PieChart,
  Briefcase,
  Shield,
  BookOpen,
  Zap,
  Star,
  Trophy,
  Key,
} from "lucide-react"

interface StepData {
  id: string
  title: string
  description: string
  category: "setup" | "financial" | "investment" | "credit" | "business" | "advanced"
  priority: "low" | "medium" | "high" | "critical"
  estimatedTime: string
  icon: React.ElementType
  navigation?: {
    path: string
    section?: string
    params?: Record<string, string>
  }
  prerequisites?: string[]
  benefits?: string[]
  completionCriteria: string
  order: number
}

interface ContextualHint {
  id: string
  title: string
  description: string
  icon: React.ElementType
  action: () => void
}

const FINANCIAL_JOURNEY_STEPS: StepData[] = [
  {
    id: "platform-overview",
    title: "Platform Overview",
    description: "Get familiar with the Snapifi Financial Platform and its core features",
    category: "setup",
    priority: "high",
    estimatedTime: "3 min",
    icon: Home,
    navigation: { path: "/" },
    benefits: ["Understand platform capabilities", "Navigate efficiently", "Access all features"],
    completionCriteria: "Complete platform tour",
    order: 1,
  },
  {
    id: "credit-assessment",
    title: "Credit Assessment",
    description: "Check your credit score and get personalized improvement recommendations",
    category: "credit",
    priority: "critical",
    estimatedTime: "5 min",
    icon: CreditCard,
    navigation: { path: "/credit-suite" },
    benefits: ["Know your credit standing", "Get improvement strategies", "Unlock better rates"],
    completionCriteria: "Complete credit score check",
    order: 2,
  },
  {
    id: "financial-goals",
    title: "Set Financial Goals",
    description: "Define your short-term and long-term financial objectives",
    category: "financial",
    priority: "high",
    estimatedTime: "8 min",
    icon: Target,
    navigation: { path: "/dashboard/financial-planning" },
    prerequisites: ["credit-assessment"],
    benefits: ["Clear financial roadmap", "Prioritized objectives", "Progress tracking"],
    completionCriteria: "Set at least 3 financial goals",
    order: 3,
  },
  {
    id: "investment-portfolio",
    title: "Investment Portfolio Setup",
    description: "Create a diversified investment portfolio based on your risk tolerance",
    category: "investment",
    priority: "high",
    estimatedTime: "12 min",
    icon: TrendingUp,
    navigation: { path: "/dashboard/snap-dax" },
    prerequisites: ["financial-goals"],
    benefits: ["Diversified investments", "Risk-adjusted returns", "Automated rebalancing"],
    completionCriteria: "Complete portfolio allocation",
    order: 4,
  },
  {
    id: "real-estate-exploration",
    title: "Real Estate Opportunities",
    description: "Explore real estate investment options and our revolutionary 50-year loan",
    category: "investment",
    priority: "medium",
    estimatedTime: "10 min",
    icon: Building,
    navigation: { path: "/real-estate" },
    prerequisites: ["investment-portfolio"],
    benefits: ["Property investment options", "50-year loan benefits", "Market insights"],
    completionCriteria: "Review property options and loan calculator",
    order: 5,
  },
  {
    id: "ecommerce-setup",
    title: "E-Commerce Integration",
    description: "Set up your e-commerce profile and explore holographic shopping",
    category: "business",
    priority: "medium",
    estimatedTime: "6 min",
    icon: ShoppingBag,
    navigation: { path: "/dashboard/ecommerex/holographic-products" },
    benefits: ["Holographic shopping experience", "Exclusive product access", "Rewards integration"],
    completionCriteria: "Complete e-commerce profile setup",
    order: 6,
  },
  {
    id: "business-suite-activation",
    title: "Business Suite Activation",
    description: "Unlock advanced business tools and compliance features",
    category: "business",
    priority: "medium",
    estimatedTime: "15 min",
    icon: Briefcase,
    navigation: { path: "/business-suite" },
    prerequisites: ["ecommerce-setup"],
    benefits: ["Business intelligence tools", "Compliance automation", "Advanced analytics"],
    completionCriteria: "Activate business suite features",
    order: 7,
  },
  {
    id: "legal-compliance",
    title: "Legal & Compliance Setup",
    description: "Complete legal documentation and compliance requirements",
    category: "advanced",
    priority: "medium",
    estimatedTime: "20 min",
    icon: Shield,
    navigation: { path: "/legal" },
    benefits: ["Legal protection", "Compliance assurance", "Diplomatic immunity options"],
    completionCriteria: "Complete legal documentation",
    order: 8,
  },
  {
    id: "advanced-features",
    title: "Advanced Features Unlock",
    description: "Unlock premium features and advanced AI capabilities",
    category: "advanced",
    priority: "low",
    estimatedTime: "5 min",
    icon: Zap,
    navigation: { path: "/unlock" },
    prerequisites: ["legal-compliance"],
    benefits: ["Premium AI features", "Advanced analytics", "Priority support"],
    completionCriteria: "Unlock all premium features",
    order: 9,
  },
  {
    id: "mastery-achievement",
    title: "Platform Mastery",
    description: "Achieve complete platform mastery and unlock exclusive benefits",
    category: "advanced",
    priority: "low",
    estimatedTime: "Ongoing",
    icon: Trophy,
    benefits: ["Platform expert status", "Exclusive benefits", "Community recognition"],
    completionCriteria: "Complete all previous steps",
    order: 10,
  },
]

export function useGeniusGuideSteps() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([])
  const [userProgress, setUserProgress] = React.useState<Record<string, any>>({})

  const pathname = usePathname()
  const router = useRouter()

  const totalSteps = FINANCIAL_JOURNEY_STEPS.length
  const progressPercentage = (completedSteps.length / totalSteps) * 100

  // Get current step data
  const getCurrentStepData = (): StepData | null => {
    return FINANCIAL_JOURNEY_STEPS[currentStep] || null
  }

  // Get next step data
  const getNextStepData = (): StepData | null => {
    return FINANCIAL_JOURNEY_STEPS[currentStep + 1] || null
  }

  // Check if a step is completed
  const isStepCompleted = (stepIndex: number): boolean => {
    return completedSteps.includes(stepIndex)
  }

  // Check if user can proceed to next step
  const canProceedToNext = (): boolean => {
    const currentStepData = getCurrentStepData()
    if (!currentStepData) return false

    // Check if current step is completed
    if (!isStepCompleted(currentStep)) return false

    // Check prerequisites
    if (currentStepData.prerequisites) {
      const prerequisiteSteps = FINANCIAL_JOURNEY_STEPS.filter((step) =>
        currentStepData.prerequisites!.includes(step.id),
      ).map((step) => step.order - 1)

      return prerequisiteSteps.every((stepIndex) => isStepCompleted(stepIndex))
    }

    return true
  }

  // Mark step as completed
  const markStepCompleted = React.useCallback((stepIndex: number) => {
    setCompletedSteps((prev) => {
      if (!prev.includes(stepIndex)) {
        return [...prev, stepIndex].sort((a, b) => a - b)
      }
      return prev
    })
  }, [])

  // Proceed to next step
  const proceedToNextStep = React.useCallback(async () => {
    const nextStepData = getNextStepData()
    if (!nextStepData || !canProceedToNext()) return null

    // Mark current step as completed if not already
    if (!isStepCompleted(currentStep)) {
      markStepCompleted(currentStep)
    }

    // Move to next step
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1))

    return nextStepData
  }, [currentStep, totalSteps, markStepCompleted])

  // Get contextual hints based on current page
  const getContextualHints = React.useCallback((): ContextualHint[] => {
    const hints: ContextualHint[] = []

    // Add hints based on current page
    if (pathname.includes("/credit")) {
      hints.push({
        id: "credit-optimization",
        title: "Optimize Credit",
        description: "Boost your credit score",
        icon: Star,
        action: () => router.push("/credit-suite"),
      })
    }

    if (pathname.includes("/dashboard")) {
      hints.push({
        id: "portfolio-review",
        title: "Review Portfolio",
        description: "Check investment performance",
        icon: PieChart,
        action: () => router.push("/dashboard/snap-dax"),
      })
    }

    if (pathname.includes("/real-estate")) {
      hints.push({
        id: "loan-calculator",
        title: "Loan Calculator",
        description: "Calculate 50-year loan savings",
        icon: Calculator,
        action: () => router.push("/real-estate"),
      })
    }

    // Add general hints
    hints.push(
      {
        id: "financial-planning",
        title: "Plan Finances",
        description: "Set and track goals",
        icon: Target,
        action: () => router.push("/dashboard/financial-planning"),
      },
      {
        id: "learn-more",
        title: "Learn More",
        description: "Educational resources",
        icon: BookOpen,
        action: () => router.push("/legal"),
      },
      {
        id: "unlock-features",
        title: "Unlock Features",
        description: "Access premium tools",
        icon: Key,
        action: () => router.push("/unlock"),
      },
    )

    return hints.slice(0, 6) // Return max 6 hints
  }, [pathname, router])

  // Auto-advance based on page navigation
  React.useEffect(() => {
    const currentStepData = getCurrentStepData()
    if (currentStepData?.navigation?.path === pathname) {
      // User is on the current step's page, mark as in progress
      setUserProgress((prev) => ({
        ...prev,
        [currentStepData.id]: { inProgress: true, visitedAt: new Date() },
      }))
    }
  }, [pathname, currentStep])

  // Initialize from localStorage
  React.useEffect(() => {
    const savedProgress = localStorage.getItem("genius-guide-progress")
    if (savedProgress) {
      try {
        const { currentStep: saved, completedSteps: savedCompleted } = JSON.parse(savedProgress)
        setCurrentStep(saved || 0)
        setCompletedSteps(savedCompleted || [])
      } catch (error) {
        console.error("Error loading saved progress:", error)
      }
    }
  }, [])

  // Save progress to localStorage
  React.useEffect(() => {
    const progressData = {
      currentStep,
      completedSteps,
      lastUpdated: new Date().toISOString(),
    }
    localStorage.setItem("genius-guide-progress", JSON.stringify(progressData))
  }, [currentStep, completedSteps])

  // Get step by ID
  const getStepById = (stepId: string): StepData | null => {
    return FINANCIAL_JOURNEY_STEPS.find((step) => step.id === stepId) || null
  }

  // Jump to specific step
  const jumpToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < totalSteps) {
      setCurrentStep(stepIndex)
    }
  }

  // Reset progress
  const resetProgress = () => {
    setCurrentStep(0)
    setCompletedSteps([])
    setUserProgress({})
    localStorage.removeItem("genius-guide-progress")
  }

  // Get completion status
  const getCompletionStatus = () => {
    return {
      isComplete: completedSteps.length === totalSteps,
      completedCount: completedSteps.length,
      totalCount: totalSteps,
      percentage: progressPercentage,
    }
  }

  return {
    // Current state
    currentStep,
    nextStep: getNextStepData(),
    completedSteps: completedSteps.length,
    totalSteps,
    progressPercentage,

    // Step data
    getCurrentStepData,
    getNextStepData,
    getStepById,

    // Step management
    markStepCompleted,
    proceedToNextStep,
    jumpToStep,
    resetProgress,

    // Status checks
    isStepCompleted,
    canProceedToNext: canProceedToNext(),
    getCompletionStatus,

    // Contextual features
    getContextualHints,
    userProgress,

    // All steps for reference
    allSteps: FINANCIAL_JOURNEY_STEPS,
  }
}
