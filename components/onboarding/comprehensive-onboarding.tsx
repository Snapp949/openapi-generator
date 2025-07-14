"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  CreditCard,
  Target,
  TrendingUp,
  Building,
  ShoppingBag,
  Briefcase,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Brain,
  Zap,
  Star,
  Trophy,
  Gift,
  Rocket,
  Crown,
} from "lucide-react"
import { useEcosystem } from "@/contexts/ecosystem-context"
import { useRouter } from "next/navigation"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ElementType
  component: React.ComponentType<any>
  category: "profile" | "financial" | "preferences" | "platforms" | "completion"
  required: boolean
  estimatedTime: string
}

interface OnboardingData {
  profile: {
    name: string
    email: string
    phone: string
    dateOfBirth: string
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
    employment: {
      status: "employed" | "self_employed" | "unemployed" | "retired" | "student"
      company: string
      position: string
      income: number
    }
  }
  financial: {
    creditScore: number
    annualIncome: number
    monthlyExpenses: number
    currentDebt: number
    savingsGoal: number
    investmentExperience: "beginner" | "intermediate" | "advanced" | "expert"
    riskTolerance: "conservative" | "moderate" | "aggressive"
    investmentGoals: string[]
  }
  preferences: {
    primaryGoals: string[]
    interestedPlatforms: string[]
    communicationPreferences: string[]
    investmentTypes: string[]
    realEstateInterest: boolean
    businessInterest: boolean
    legalCompliance: boolean
  }
  platforms: {
    enabledEnvironments: string[]
    dashboardLayout: "grid" | "list" | "compact"
    notifications: boolean
    autoSync: boolean
    premiumFeatures: boolean
  }
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to SnapAiFi",
    description: "Let's get you set up for financial success",
    icon: Sparkles,
    component: WelcomeStep,
    category: "profile",
    required: true,
    estimatedTime: "1 min",
  },
  {
    id: "profile",
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: User,
    component: ProfileStep,
    category: "profile",
    required: true,
    estimatedTime: "3 min",
  },
  {
    id: "financial",
    title: "Financial Profile",
    description: "Help us understand your financial situation",
    icon: CreditCard,
    component: FinancialStep,
    category: "financial",
    required: true,
    estimatedTime: "5 min",
  },
  {
    id: "goals",
    title: "Financial Goals",
    description: "What do you want to achieve?",
    icon: Target,
    component: GoalsStep,
    category: "financial",
    required: true,
    estimatedTime: "4 min",
  },
  {
    id: "platforms",
    title: "Platform Selection",
    description: "Choose your preferred environments",
    icon: Zap,
    component: PlatformsStep,
    category: "platforms",
    required: true,
    estimatedTime: "3 min",
  },
  {
    id: "preferences",
    title: "Preferences & Settings",
    description: "Customize your experience",
    icon: Brain,
    component: PreferencesStep,
    category: "preferences",
    required: false,
    estimatedTime: "2 min",
  },
  {
    id: "verification",
    title: "Identity Verification",
    description: "Secure your account",
    icon: Shield,
    component: VerificationStep,
    category: "profile",
    required: true,
    estimatedTime: "5 min",
  },
  {
    id: "completion",
    title: "You're All Set!",
    description: "Welcome to your financial future",
    icon: Trophy,
    component: CompletionStep,
    category: "completion",
    required: true,
    estimatedTime: "1 min",
  },
]

export function ComprehensiveOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    profile: {
      name: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
      },
      employment: {
        status: "employed",
        company: "",
        position: "",
        income: 0,
      },
    },
    financial: {
      creditScore: 0,
      annualIncome: 0,
      monthlyExpenses: 0,
      currentDebt: 0,
      savingsGoal: 0,
      investmentExperience: "beginner",
      riskTolerance: "moderate",
      investmentGoals: [],
    },
    preferences: {
      primaryGoals: [],
      interestedPlatforms: [],
      communicationPreferences: [],
      investmentTypes: [],
      realEstateInterest: false,
      businessInterest: false,
      legalCompliance: false,
    },
    platforms: {
      enabledEnvironments: [],
      dashboardLayout: "grid",
      notifications: true,
      autoSync: true,
      premiumFeatures: true,
    },
  })
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [isCompleting, setIsCompleting] = useState(false)

  const { updateUserProfile, updateCrossPlatformData, addNotification, unlockFeature } = useEcosystem()
  const router = useRouter()

  const currentStepData = ONBOARDING_STEPS[currentStep]
  const progress = ((currentStep + 1) / ONBOARDING_STEPS.length) * 100
  const totalEstimatedTime = ONBOARDING_STEPS.reduce((total, step) => {
    const minutes = Number.parseInt(step.estimatedTime)
    return total + minutes
  }, 0)

  const updateOnboardingData = (section: keyof OnboardingData, data: any) => {
    setOnboardingData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }

  const markStepCompleted = (stepId: string) => {
    setCompletedSteps((prev) => [...prev.filter((id) => id !== stepId), stepId])
  }

  const canProceedToNext = () => {
    const step = currentStepData
    if (!step.required) return true

    // Add validation logic for each step
    switch (step.id) {
      case "profile":
        return onboardingData.profile.name && onboardingData.profile.email
      case "financial":
        return onboardingData.financial.annualIncome > 0
      case "goals":
        return onboardingData.preferences.primaryGoals.length > 0
      case "platforms":
        return onboardingData.platforms.enabledEnvironments.length > 0
      default:
        return true
    }
  }

  const handleNext = () => {
    if (canProceedToNext()) {
      markStepCompleted(currentStepData.id)
      if (currentStep < ONBOARDING_STEPS.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        completeOnboarding()
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const completeOnboarding = async () => {
    setIsCompleting(true)

    try {
      // Update user profile
      updateUserProfile({
        name: onboardingData.profile.name,
        email: onboardingData.profile.email,
        tier: onboardingData.platforms.premiumFeatures ? "premium" : "basic",
        preferences: {
          theme: "dark",
          notifications: {
            email: true,
            push: onboardingData.platforms.notifications,
            sms: false,
            inApp: true,
            frequency: "immediate",
            categories: {
              financial: true,
              trading: onboardingData.preferences.interestedPlatforms.includes("trading"),
              realEstate: onboardingData.preferences.realEstateInterest,
              credit: true,
              business: onboardingData.preferences.businessInterest,
              legal: onboardingData.preferences.legalCompliance,
              system: true,
            },
          },
          privacy: {
            profileVisibility: "private",
            dataSharing: false,
            analytics: true,
            marketing: false,
          },
          accessibility: {
            fontSize: "medium",
            contrast: "normal",
            motion: "full",
            screenReader: false,
            voiceNavigation: false,
          },
          dashboard: {
            layout: onboardingData.platforms.dashboardLayout,
            widgets: [],
            pinnedEnvironments: onboardingData.platforms.enabledEnvironments,
            quickActions: [],
          },
        },
      })

      // Update cross-platform data
      updateCrossPlatformData({
        financialGoals: onboardingData.preferences.primaryGoals.map((goal, index) => ({
          id: crypto.randomUUID(),
          name: goal,
          targetAmount: onboardingData.financial.savingsGoal,
          currentAmount: 0,
          deadline: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          category: "savings" as const,
          priority: index === 0 ? "high" : ("medium" as const),
          status: "active" as const,
        })),
        creditData: {
          score: onboardingData.financial.creditScore,
          scoreChange: 0,
          factors: [],
          recommendations: [],
          accounts: [],
          inquiries: [],
          utilization: 0,
          paymentHistory: 0,
          accountAge: 0,
          creditMix: 0,
        },
      })

      // Unlock features based on selections
      if (onboardingData.platforms.premiumFeatures) {
        unlockFeature("premium_analytics")
        unlockFeature("advanced_trading")
        unlockFeature("ai_recommendations")
      }

      // Add welcome notification
      addNotification({
        title: "Welcome to SnapAiFi! 🎉",
        message: "Your account has been set up successfully. Start exploring your financial journey!",
        type: "success",
        category: "system",
        read: false,
        actions: [
          {
            label: "Start Tour",
            action: "start_tour",
            url: "/genius-guide",
          },
        ],
      })

      // Mark onboarding as completed
      localStorage.setItem("snapifi-onboarding-completed", "true")

      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (error) {
      console.error("Error completing onboarding:", error)
      addNotification({
        title: "Setup Error",
        message: "There was an error setting up your account. Please try again.",
        type: "error",
        category: "system",
        read: false,
      })
    } finally {
      setIsCompleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Progress Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
              <currentStepData.icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {currentStepData.title}
              </h1>
              <p className="text-muted-foreground">{currentStepData.description}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep + 1} of {ONBOARDING_STEPS.length}
              </span>
              <span>~{totalEstimatedTime} minutes total</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black/20 border-white/10">
              <CardContent className="p-8">
                <currentStepData.component
                  data={onboardingData}
                  updateData={updateOnboardingData}
                  onComplete={() => markStepCompleted(currentStepData.id)}
                />
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="bg-white/10 border-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {ONBOARDING_STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStep
                    ? "bg-purple-500"
                    : completedSteps.includes(step.id)
                      ? "bg-green-500"
                      : "bg-gray-600"
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={!canProceedToNext() || isCompleting}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isCompleting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="h-4 w-4 mr-2"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                Setting up...
              </>
            ) : currentStep === ONBOARDING_STEPS.length - 1 ? (
              <>
                Complete Setup
                <CheckCircle className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Step Components
function WelcomeStep({ data, updateData, onComplete }: any) {
  useEffect(() => {
    onComplete()
  }, [onComplete])

  return (
    <div className="text-center space-y-6">
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="inline-block"
      >
        <div className="p-6 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500">
          <Rocket className="h-16 w-16 text-white" />
        </div>
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Welcome to the Future of Finance</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          SnapAiFi is your comprehensive financial ecosystem, combining AI-powered insights, revolutionary loan
          products, holographic commerce, and advanced trading platforms all in one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
            <CreditCard className="h-8 w-8 text-green-400 mb-2" />
            <h3 className="font-semibold">Credit Optimization</h3>
            <p className="text-sm text-muted-foreground">AI-powered credit improvement strategies</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30">
            <TrendingUp className="h-8 w-8 text-blue-400 mb-2" />
            <h3 className="font-semibold">Smart Investing</h3>
            <p className="text-sm text-muted-foreground">AI-driven portfolio management and trading</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30">
            <Building className="h-8 w-8 text-purple-400 mb-2" />
            <h3 className="font-semibold">Real Estate Revolution</h3>
            <p className="text-sm text-muted-foreground">50-year loans and property investment tools</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
            <Star className="h-3 w-3 mr-1" />
            Premium Features Included
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
            <Shield className="h-3 w-3 mr-1" />
            Bank-Level Security
          </Badge>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
            <Brain className="h-3 w-3 mr-1" />
            AI-Powered Insights
          </Badge>
        </div>
      </div>
    </div>
  )
}

function ProfileStep({ data, updateData, onComplete }: any) {
  const handleInputChange = (field: string, value: string) => {
    updateData("profile", { [field]: value })
  }

  const handleAddressChange = (field: string, value: string) => {
    updateData("profile", {
      address: { ...data.profile.address, [field]: value },
    })
  }

  const handleEmploymentChange = (field: string, value: string | number) => {
    updateData("profile", {
      employment: { ...data.profile.employment, [field]: value },
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Tell Us About Yourself</h2>
        <p className="text-muted-foreground">This information helps us personalize your experience</p>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-black/20 border-white/10">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={data.profile.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter your full name"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={data.profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={data.profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={data.profile.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                className="bg-white/10 border-white/20"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="address" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={data.profile.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                placeholder="Enter your street address"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={data.profile.address.city}
                onChange={(e) => handleAddressChange("city", e.target.value)}
                placeholder="Enter your city"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={data.profile.address.state}
                onChange={(e) => handleAddressChange("state", e.target.value)}
                placeholder="Enter your state"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={data.profile.address.zipCode}
                onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                placeholder="Enter your ZIP code"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={data.profile.address.country}
                onValueChange={(value) => handleAddressChange("country", value)}
              >
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="UK">United Kingdom</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="employment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employment-status">Employment Status</Label>
              <Select
                value={data.profile.employment.status}
                onValueChange={(value) => handleEmploymentChange("status", value)}
              >
                <SelectTrigger className="bg-white/10 border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self_employed">Self-Employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={data.profile.employment.company}
                onChange={(e) => handleEmploymentChange("company", e.target.value)}
                placeholder="Enter your company name"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                value={data.profile.employment.position}
                onChange={(e) => handleEmploymentChange("position", e.target.value)}
                placeholder="Enter your job title"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">Annual Income</Label>
              <Input
                id="income"
                type="number"
                value={data.profile.employment.income}
                onChange={(e) => handleEmploymentChange("income", Number.parseInt(e.target.value) || 0)}
                placeholder="Enter your annual income"
                className="bg-white/10 border-white/20"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FinancialStep({ data, updateData, onComplete }: any) {
  const handleFinancialChange = (field: string, value: string | number | string[]) => {
    updateData("financial", { [field]: value })
  }

  const investmentGoalOptions = [
    "Retirement Planning",
    "Emergency Fund",
    "Home Purchase",
    "Education Funding",
    "Wealth Building",
    "Passive Income",
    "Short-term Savings",
    "Business Investment",
  ]

  const toggleInvestmentGoal = (goal: string) => {
    const currentGoals = data.financial.investmentGoals || []
    const updatedGoals = currentGoals.includes(goal)
      ? currentGoals.filter((g: string) => g !== goal)
      : [...currentGoals, goal]
    handleFinancialChange("investmentGoals", updatedGoals)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Financial Profile</h2>
        <p className="text-muted-foreground">
          Help us understand your financial situation to provide better recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="credit-score">Credit Score (if known)</Label>
            <Input
              id="credit-score"
              type="number"
              min="300"
              max="850"
              value={data.financial.creditScore}
              onChange={(e) => handleFinancialChange("creditScore", Number.parseInt(e.target.value) || 0)}
              placeholder="Enter your credit score"
              className="bg-white/10 border-white/20"
            />
            <p className="text-xs text-muted-foreground">We'll help you check and improve this</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="annual-income">Annual Income *</Label>
            <Input
              id="annual-income"
              type="number"
              value={data.financial.annualIncome}
              onChange={(e) => handleFinancialChange("annualIncome", Number.parseInt(e.target.value) || 0)}
              placeholder="Enter your annual income"
              className="bg-white/10 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly-expenses">Monthly Expenses</Label>
            <Input
              id="monthly-expenses"
              type="number"
              value={data.financial.monthlyExpenses}
              onChange={(e) => handleFinancialChange("monthlyExpenses", Number.parseInt(e.target.value) || 0)}
              placeholder="Enter your monthly expenses"
              className="bg-white/10 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="current-debt">Current Debt</Label>
            <Input
              id="current-debt"
              type="number"
              value={data.financial.currentDebt}
              onChange={(e) => handleFinancialChange("currentDebt", Number.parseInt(e.target.value) || 0)}
              placeholder="Enter your total debt"
              className="bg-white/10 border-white/20"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="savings-goal">Savings Goal</Label>
            <Input
              id="savings-goal"
              type="number"
              value={data.financial.savingsGoal}
              onChange={(e) => handleFinancialChange("savingsGoal", Number.parseInt(e.target.value) || 0)}
              placeholder="Enter your savings target"
              className="bg-white/10 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="investment-experience">Investment Experience</Label>
            <Select
              value={data.financial.investmentExperience}
              onValueChange={(value) => handleFinancialChange("investmentExperience", value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="risk-tolerance">Risk Tolerance</Label>
            <Select
              value={data.financial.riskTolerance}
              onValueChange={(value) => handleFinancialChange("riskTolerance", value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Investment Goals (select all that apply)</Label>
            <div className="grid grid-cols-2 gap-2">
              {investmentGoalOptions.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={data.financial.investmentGoals?.includes(goal)}
                    onCheckedChange={() => toggleInvestmentGoal(goal)}
                  />
                  <Label htmlFor={goal} className="text-sm">
                    {goal}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GoalsStep({ data, updateData, onComplete }: any) {
  const primaryGoalOptions = [
    "Build Emergency Fund",
    "Pay Off Debt",
    "Save for Home",
    "Retirement Planning",
    "Start Investing",
    "Improve Credit Score",
    "Build Business",
    "Generate Passive Income",
  ]

  const togglePrimaryGoal = (goal: string) => {
    const currentGoals = data.preferences.primaryGoals || []
    const updatedGoals = currentGoals.includes(goal)
      ? currentGoals.filter((g: string) => g !== goal)
      : [...currentGoals, goal]
    updateData("preferences", { primaryGoals: updatedGoals })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">What Are Your Financial Goals?</h2>
        <p className="text-muted-foreground">Select your top priorities to help us customize your experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {primaryGoalOptions.map((goal) => {
          const isSelected = data.preferences.primaryGoals?.includes(goal)
          return (
            <motion.div
              key={goal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all
                ${
                  isSelected ? "border-purple-500 bg-purple-500/20" : "border-white/20 bg-white/5 hover:border-white/40"
                }
              `}
              onClick={() => togglePrimaryGoal(goal)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`
                    p-2 rounded-lg
                    ${isSelected ? "bg-purple-500/30" : "bg-white/10"}
                  `}
                  >
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{goal}</h3>
                    <p className="text-sm text-muted-foreground">{getGoalDescription(goal)}</p>
                  </div>
                </div>
                {isSelected && <CheckCircle className="h-5 w-5 text-purple-400" />}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Selected {data.preferences.primaryGoals?.length || 0} goals. You can change these later.
        </p>
      </div>
    </div>
  )
}

function PlatformsStep({ data, updateData, onComplete }: any) {
  const platformOptions = [
    {
      id: "credit-suite",
      name: "Credit Suite",
      description: "AI-powered credit optimization and monitoring",
      icon: CreditCard,
      category: "Essential",
      recommended: true,
    },
    {
      id: "snap-dax",
      name: "SNAP-DAX Trading",
      description: "Advanced cryptocurrency and digital asset trading",
      icon: TrendingUp,
      category: "Investment",
      recommended: true,
    },
    {
      id: "real-estate",
      name: "Real Estate Hub",
      description: "Property investment and 50-year loan products",
      icon: Building,
      category: "Investment",
      recommended: false,
    },
    {
      id: "ecommerex",
      name: "EcommereX",
      description: "Holographic shopping and e-commerce platform",
      icon: ShoppingBag,
      category: "Commerce",
      recommended: false,
    },
    {
      id: "business-suite",
      name: "Business Suite",
      description: "Comprehensive business management tools",
      icon: Briefcase,
      category: "Business",
      recommended: false,
    },
    {
      id: "legal-compliance",
      name: "Legal & Compliance",
      description: "Legal documentation and compliance management",
      icon: Shield,
      category: "Legal",
      recommended: false,
    },
  ]

  const togglePlatform = (platformId: string) => {
    const currentPlatforms = data.platforms.enabledEnvironments || []
    const updatedPlatforms = currentPlatforms.includes(platformId)
      ? currentPlatforms.filter((p: string) => p !== platformId)
      : [...currentPlatforms, platformId]
    updateData("platforms", { enabledEnvironments: updatedPlatforms })
  }

  const categories = ["Essential", "Investment", "Commerce", "Business", "Legal"]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Choose Your Platforms</h2>
        <p className="text-muted-foreground">Select the environments you'd like to access</p>
      </div>

      {categories.map((category) => {
        const categoryPlatforms = platformOptions.filter((p) => p.category === category)
        return (
          <div key={category} className="space-y-3">
            <h3 className="font-medium text-lg">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryPlatforms.map((platform) => {
                const isSelected = data.platforms.enabledEnvironments?.includes(platform.id)
                return (
                  <motion.div
                    key={platform.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      p-4 rounded-lg border-2 cursor-pointer transition-all relative
                      ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/20"
                          : "border-white/20 bg-white/5 hover:border-white/40"
                      }
                    `}
                    onClick={() => togglePlatform(platform.id)}
                  >
                    {platform.recommended && (
                      <Badge className="absolute -top-2 -right-2 bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        <Star className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    )}

                    <div className="flex items-start gap-3">
                      <div
                        className={`
                          p-3 rounded-lg
                          ${isSelected ? "bg-purple-500/30" : "bg-white/10"}
                        `}
                      >
                        <platform.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{platform.name}</h4>
                          {isSelected && <CheckCircle className="h-5 w-5 text-purple-400" />}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{platform.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )
      })}

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Selected {data.platforms.enabledEnvironments?.length || 0} platforms. You can enable more later.
        </p>
      </div>
    </div>
  )
}

function PreferencesStep({ data, updateData, onComplete }: any) {
  const handlePlatformSettingChange = (field: string, value: any) => {
    updateData("platforms", { [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Customize Your Experience</h2>
        <p className="text-muted-foreground">Set your preferences for the best experience</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Dashboard Layout</Label>
            <Select
              value={data.platforms.dashboardLayout}
              onValueChange={(value) => handlePlatformSettingChange("dashboardLayout", value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grid">Grid View</SelectItem>
                <SelectItem value="list">List View</SelectItem>
                <SelectItem value="compact">Compact View</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enable Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive important updates and alerts</p>
            </div>
            <Checkbox
              checked={data.platforms.notifications}
              onCheckedChange={(checked) => handlePlatformSettingChange("notifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Auto-Sync Data</Label>
              <p className="text-sm text-muted-foreground">Automatically sync data across platforms</p>
            </div>
            <Checkbox
              checked={data.platforms.autoSync}
              onCheckedChange={(checked) => handlePlatformSettingChange("autoSync", checked)}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Premium Features</Label>
              <p className="text-sm text-muted-foreground">Access advanced AI and analytics</p>
            </div>
            <Checkbox
              checked={data.platforms.premiumFeatures}
              onCheckedChange={(checked) => handlePlatformSettingChange("premiumFeatures", checked)}
            />
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-yellow-400" />
              <h4 className="font-medium">Premium Benefits</h4>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Advanced AI recommendations</li>
              <li>• Priority customer support</li>
              <li>• Exclusive investment opportunities</li>
              <li>• Advanced analytics and reporting</li>
              <li>• Early access to new features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function VerificationStep({ data, updateData, onComplete }: any) {
  const [verificationStep, setVerificationStep] = useState("identity")
  const [isVerifying, setIsVerifying] = useState(false)

  const handleVerification = async (type: string) => {
    setIsVerifying(true)
    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsVerifying(false)

    if (type === "identity") {
      setVerificationStep("phone")
    } else if (type === "phone") {
      setVerificationStep("email")
    } else {
      onComplete()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">Secure Your Account</h2>
        <p className="text-muted-foreground">Complete verification to ensure account security</p>
      </div>

      <div className="max-w-md mx-auto space-y-6">
        {verificationStep === "identity" && (
          <div className="text-center space-y-4">
            <div className="p-6 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-600/20 inline-block">
              <Shield className="h-12 w-12 text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Identity Verification</h3>
              <p className="text-sm text-muted-foreground mb-4">
                We use bank-level security to protect your information
              </p>
              <Button
                onClick={() => handleVerification("identity")}
                disabled={isVerifying}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isVerifying ? "Verifying..." : "Verify Identity"}
              </Button>
            </div>
          </div>
        )}

        {verificationStep === "phone" && (
          <div className="text-center space-y-4">
            <div className="p-6 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-600/20 inline-block">
              <CheckCircle className="h-12 w-12 text-green-400" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Phone Verification</h3>
              <p className="text-sm text-muted-foreground mb-4">Verify your phone number for account security</p>
              <Button
                onClick={() => handleVerification("phone")}
                disabled={isVerifying}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                {isVerifying ? "Sending Code..." : "Send Verification Code"}
              </Button>
            </div>
          </div>
        )}

        {verificationStep === "email" && (
          <div className="text-center space-y-4">
            <div className="p-6 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-600/20 inline-block">
              <CheckCircle className="h-12 w-12 text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium mb-2">Email Verification</h3>
              <p className="text-sm text-muted-foreground mb-4">Confirm your email address to complete setup</p>
              <Button
                onClick={() => handleVerification("email")}
                disabled={isVerifying}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isVerifying ? "Verifying..." : "Verify Email"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function CompletionStep({ data, updateData, onComplete }: any) {
  useEffect(() => {
    onComplete()
  }, [onComplete])

  return (
    <div className="text-center space-y-6">
      <motion.div
        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: 2 }}
        className="inline-block"
      >
        <div className="p-6 rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
          <Trophy className="h-16 w-16 text-white" />
        </div>
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-3xl font-bold">Congratulations! 🎉</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Your SnapAiFi account is now set up and ready to go. You have access to all the tools you need to achieve your
          financial goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
            <Gift className="h-8 w-8 text-green-400 mb-2 mx-auto" />
            <h3 className="font-semibold">Welcome Bonus</h3>
            <p className="text-sm text-muted-foreground">$50 credit applied to your account</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-600/20 border border-blue-500/30">
            <Brain className="h-8 w-8 text-blue-400 mb-2 mx-auto" />
            <h3 className="font-semibold">AI Guide Ready</h3>
            <p className="text-sm text-muted-foreground">Your personal financial assistant is active</p>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30">
            <Crown className="h-8 w-8 text-purple-400 mb-2 mx-auto" />
            <h3 className="font-semibold">Premium Access</h3>
            <p className="text-sm text-muted-foreground">All premium features unlocked</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <Badge variant="secondary" className="bg-green-500/20 text-green-400">
            <CheckCircle className="h-3 w-3 mr-1" />
            Account Verified
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
            <Shield className="h-3 w-3 mr-1" />
            Security Enabled
          </Badge>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
            <Zap className="h-3 w-3 mr-1" />
            AI Activated
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mt-6">Redirecting to your dashboard in a few seconds...</p>
      </div>
    </div>
  )
}

// Helper function for goal descriptions
function getGoalDescription(goal: string): string {
  const descriptions: Record<string, string> = {
    "Build Emergency Fund": "Save 3-6 months of expenses for unexpected situations",
    "Pay Off Debt": "Eliminate high-interest debt and improve financial health",
    "Save for Home": "Build down payment for your dream home",
    "Retirement Planning": "Secure your financial future with smart investing",
    "Start Investing": "Begin building wealth through diversified investments",
    "Improve Credit Score": "Optimize your credit for better rates and opportunities",
    "Build Business": "Fund and grow your entrepreneurial ventures",
    "Generate Passive Income": "Create income streams that work for you",
  }
  return descriptions[goal] || "Achieve your financial objectives"
}
