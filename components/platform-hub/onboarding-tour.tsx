"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  Target,
  Zap,
  Crown,
  Shield,
  TrendingUp,
  Building,
  ShoppingBag,
  Briefcase,
  Scale,
  CheckCircle,
  Star,
  Gift,
} from "lucide-react"

interface TourStep {
  id: string
  title: string
  description: string
  icon: React.ElementType
  target?: string
  position: "top" | "bottom" | "left" | "right" | "center"
  highlight?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
}

const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to SnapAiFi Nexus! 🚀",
    description:
      "Your unified command center for all financial, business, and innovation platforms. Let's take a quick tour to get you started.",
    icon: Sparkles,
    position: "center",
    highlight: true,
  },
  {
    id: "search",
    title: "Smart Platform Search",
    description:
      "Use the search bar to quickly find any platform or feature. Our AI understands natural language queries.",
    icon: Target,
    target: "[data-tour='search']",
    position: "bottom",
  },
  {
    id: "categories",
    title: "Platform Categories",
    description:
      "Platforms are organized by category: Command, Financial, Business, Commerce, and Innovation. Filter by category to find what you need.",
    icon: Zap,
    target: "[data-tour='categories']",
    position: "bottom",
  },
  {
    id: "platform-cards",
    title: "Interactive Platform Cards",
    description:
      "Each platform card shows real-time metrics, user count, and growth. Click to launch or bookmark your favorites.",
    icon: Crown,
    target: "[data-tour='platform-cards']",
    position: "top",
  },
  {
    id: "quick-stats",
    title: "Live Statistics",
    description: "Monitor total users, active platforms, and average growth across the entire ecosystem in real-time.",
    icon: TrendingUp,
    target: "[data-tour='stats']",
    position: "bottom",
  },
  {
    id: "customization",
    title: "Personalization Options",
    description:
      "Customize your dashboard layout, bookmark platforms, and set up notifications to match your workflow.",
    icon: Shield,
    target: "[data-tour='customize']",
    position: "left",
  },
  {
    id: "platforms-overview",
    title: "Platform Ecosystem",
    description:
      "Explore our comprehensive suite: Credit Suite, SNAP-DAX Trading, Real Estate Hub, EcommereX, Business Suite, and Legal Compliance.",
    icon: Building,
    position: "center",
  },
  {
    id: "completion",
    title: "You're All Set! 🎉",
    description:
      "You now know how to navigate the SnapAiFi ecosystem. Start exploring and building your financial future!",
    icon: Gift,
    position: "center",
    action: {
      label: "Start Exploring",
      onClick: () => {},
    },
  },
]

export function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const currentStepData = TOUR_STEPS[currentStep]
  const progress = ((currentStep + 1) / TOUR_STEPS.length) * 100

  useEffect(() => {
    if (isOpen && currentStepData?.target) {
      const element = document.querySelector(currentStepData.target)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
        // Add highlight effect
        element.classList.add("tour-highlight")
        return () => element.classList.remove("tour-highlight")
      }
    }
  }, [currentStep, isOpen, currentStepData])

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleted(true)
      setTimeout(() => {
        onClose()
        setCurrentStep(0)
        setIsCompleted(false)
      }, 2000)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onClose()
    setCurrentStep(0)
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]" />

      {/* Tour Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl bg-background/95 backdrop-blur-sm border-white/20 z-[9999]">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600"
                >
                  <currentStepData.icon className="h-5 w-5 text-white" />
                </motion.div>
                <div>
                  <DialogTitle className="text-xl">{currentStepData.title}</DialogTitle>
                  <DialogDescription className="text-sm">
                    Step {currentStep + 1} of {TOUR_STEPS.length}
                  </DialogDescription>
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
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Tour Progress</span>
                <span>{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {currentStepData.highlight && (
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      className="inline-block p-6 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 mb-4"
                    >
                      <currentStepData.icon className="h-12 w-12 text-white" />
                    </motion.div>
                  </div>
                )}

                <div className="text-center space-y-3">
                  <p className="text-muted-foreground leading-relaxed">{currentStepData.description}</p>

                  {/* Special content for specific steps */}
                  {currentStep === 6 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                      {[
                        { name: "Credit Suite", icon: Shield, color: "from-green-500 to-emerald-600" },
                        { name: "SNAP-DAX", icon: TrendingUp, color: "from-blue-500 to-cyan-600" },
                        { name: "Real Estate", icon: Building, color: "from-orange-500 to-red-600" },
                        { name: "EcommereX", icon: ShoppingBag, color: "from-purple-500 to-pink-600" },
                        { name: "Business Suite", icon: Briefcase, color: "from-yellow-500 to-orange-600" },
                        { name: "Legal & Compliance", icon: Scale, color: "from-gray-500 to-slate-600" },
                      ].map((platform) => (
                        <div
                          key={platform.name}
                          className={`p-3 rounded-lg bg-gradient-to-br ${platform.color} bg-opacity-20 border border-white/20`}
                        >
                          <platform.icon className="h-6 w-6 mx-auto mb-1 text-white" />
                          <div className="text-xs font-medium">{platform.name}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {isCompleted && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center space-y-4">
                      <div className="text-6xl">🎉</div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-green-400">Tour Complete!</h3>
                        <p className="text-muted-foreground">Welcome to your financial future with SnapAiFi!</p>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Ready to Explore
                        </Badge>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                          <Star className="h-3 w-3 mr-1" />
                          All Features Unlocked
                        </Badge>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step Indicators */}
            <div className="flex items-center justify-center gap-2">
              {TOUR_STEPS.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep ? "bg-purple-500" : index < currentStep ? "bg-green-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="border-white/20 hover:bg-white/10 bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground hover:text-white">
                Skip Tour
              </Button>

              <Button
                onClick={currentStepData.action?.onClick || handleNext}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {currentStep === TOUR_STEPS.length - 1 ? (
                  currentStepData.action?.label || "Finish"
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Tips */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                💡 Tip: You can always access this tour again from the help menu
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Highlight Styles */}
      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 9999;
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
          border-radius: 8px;
          animation: tour-pulse 2s infinite;
        }

        @keyframes tour-pulse {
          0%, 100% {
            box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(168, 85, 247, 0.3), 0 0 30px rgba(168, 85, 247, 0.5);
          }
        }
      `}</style>
    </>
  )
}
