"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ChevronLeft,
  ChevronRight,
  X,
  Search,
  Bookmark,
  Settings,
  Zap,
  Target,
  CheckCircle,
  Sparkles,
} from "lucide-react"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: any
  content: string
  tips?: string[]
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Welcome to SnapAiFi Nexus",
    description: "Your unified command center for all platforms",
    icon: Zap,
    content:
      "The Nexus Dashboard is your central hub for accessing all SnapAiFi platforms. From here, you can navigate to different environments, manage your preferences, and track your progress across all services.",
    tips: [
      "Each platform card shows real-time statistics",
      "Use the search bar to quickly find specific platforms",
      "Bookmark your favorite platforms for quick access",
    ],
  },
  {
    id: "navigation",
    title: "Platform Navigation",
    description: "Discover and access all available platforms",
    icon: Target,
    content:
      "Browse through different platform categories using the tabs at the top. Each platform card displays key information including user count, growth metrics, and current status.",
    tips: [
      "Click on category tabs to filter platforms",
      "Green badges indicate active platforms",
      "Yellow badges show beta features",
      "Hover over cards for additional options",
    ],
  },
  {
    id: "search",
    title: "Smart Search & Filtering",
    description: "Find exactly what you need, when you need it",
    icon: Search,
    content:
      "Use the powerful search and filtering system to quickly locate platforms, features, or content. Search by name, description, or even specific features within platforms.",
    tips: [
      "Search works across platform names and descriptions",
      "Use category filters to narrow results",
      "Sort by priority, users, or growth rate",
      "Toggle between grid and list views",
    ],
  },
  {
    id: "bookmarks",
    title: "Bookmarks & Personalization",
    description: "Customize your dashboard experience",
    icon: Bookmark,
    content:
      "Bookmark your frequently used platforms and customize your dashboard layout. Your preferences are automatically saved and synced across sessions.",
    tips: [
      "Click the bookmark icon to save favorites",
      "Use 'Bookmarked Only' filter for quick access",
      "Hide platforms you don't use regularly",
      "Your settings are automatically saved",
    ],
  },
  {
    id: "customization",
    title: "Dashboard Customization",
    description: "Make the Nexus truly yours",
    icon: Settings,
    content:
      "Access the customization panel to personalize your dashboard. Rearrange platforms, adjust view preferences, and configure notifications to match your workflow.",
    tips: [
      "Click the 'Customize' button to open settings",
      "Drag and drop to reorder platforms",
      "Choose between grid and list layouts",
      "Set up custom categories and groups",
    ],
  },
  {
    id: "launch",
    title: "Ready to Launch!",
    description: "You're all set to explore the SnapAiFi ecosystem",
    icon: CheckCircle,
    content:
      "You now know how to navigate, search, and customize your Nexus Dashboard. Start exploring the platforms that interest you most and unlock the full potential of SnapAiFi.",
    tips: [
      "Start with the Citizen Dashboard for personal finance",
      "Explore Business Suite for company management",
      "Try Beta Lab for cutting-edge features",
      "Use the help button anytime for assistance",
    ],
  },
]

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleting, setIsCompleting] = useState(false)

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsCompleting(true)
    setTimeout(() => {
      onClose()
      setIsCompleting(false)
      setCurrentStep(0)
    }, 1000)
  }

  const handleSkip = () => {
    onClose()
    setCurrentStep(0)
  }

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100
  const step = onboardingSteps[currentStep]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-gradient-to-br from-slate-900 to-purple-900 border-purple-500/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                <step.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {step.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">{step.description}</DialogDescription>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Step {currentStep + 1} of {onboardingSteps.length}
              </span>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
                {Math.round(progress)}% Complete
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{step.content}</p>

            {step.tips && (
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  Pro Tips
                </h4>
                <ul className="space-y-1">
                  {step.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="bg-white/10 border-white/20"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-purple-400" : index < currentStep ? "bg-green-400" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={isCompleting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isCompleting ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1 animate-spin" />
                  Completing...
                </>
              ) : currentStep === onboardingSteps.length - 1 ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Get Started
                </>
              ) : (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
