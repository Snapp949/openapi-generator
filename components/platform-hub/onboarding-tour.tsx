"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
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
  CheckCircle,
  Star,
} from "lucide-react"

interface TourStep {
  id: string
  title: string
  description: string
  content: string
  target?: string
  position: "top" | "bottom" | "left" | "right" | "center"
  icon: React.ElementType
  category: "welcome" | "navigation" | "features" | "advanced"
}

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Welcome to SnapAiFi Nexus! 🎉",
    description: "Your unified command center for financial intelligence",
    content:
      "SnapAiFi Nexus is your gateway to revolutionary financial services, AI-powered trading, and comprehensive business management. Let's take a quick tour to get you started!",
    position: "center",
    icon: Sparkles,
    category: "welcome",
  },
  {
    id: "navigation",
    title: "Platform Navigator",
    description: "Discover all available environments",
    content:
      "Use the search bar and filters to find exactly what you need. Each platform card shows real-time metrics, user counts, and growth statistics to help you make informed decisions.",
    target: ".platform-navigator",
    position: "bottom",
    icon: Target,
    category: "navigation",
  },
  {
    id: "categories",
    title: "Category Tabs",
    description: "Organize platforms by type",
    content:
      "Switch between different categories like Financial, Business, Commerce, and Innovation. Each category contains specialized tools designed for specific use cases.",
    target: ".category-tabs",
    position: "bottom",
    icon: Zap,
    category: "navigation",
  },
  {
    id: "credit-suite",
    title: "Credit Suite - AI Credit Optimization",
    description: "Boost your credit score with AI",
    content:
      "Our AI-powered Credit Suite analyzes your credit profile and provides personalized recommendations to improve your score by 50+ points in 90 days.",
    target: "[data-platform='credit-suite']",
    position: "right",
    icon: TrendingUp,
    category: "features",
  },
  {
    id: "snap-dax",
    title: "SNAP-DAX - Digital Asset Trading",
    description: "Advanced cryptocurrency trading platform",
    content:
      "Trade digital assets with AI-powered insights, automated trading bots, and real-time market analysis. Perfect for both beginners and professional traders.",
    target: "[data-platform='snap-dax']",
    position: "right",
    icon: TrendingUp,
    category: "features",
  },
  {
    id: "real-estate",
    title: "Real Estate Hub - Revolutionary Loans",
    description: "50-year loans and property investment",
    content:
      "Access our revolutionary 50-year loan products that reduce monthly payments by up to 40%. Find properties, get pre-approved, and invest in real estate.",
    target: "[data-platform='real-estate']",
    position: "right",
    icon: Building,
    category: "features",
  },
  {
    id: "ecommerex",
    title: "EcommereX - Holographic Shopping",
    description: "Next-generation e-commerce experience",
    content:
      "Experience products in stunning holographic detail before you buy. Our AR/VR integration lets you visualize products in your space.",
    target: "[data-platform='ecommerex']",
    position: "right",
    icon: ShoppingBag,
    category: "features",
  },
  {
    id: "business-suite",
    title: "Business Suite - Enterprise Management",
    description: "Comprehensive business tools",
    content:
      "Manage your entire business with integrated analytics, compliance monitoring, team management, and revenue optimization tools.",
    target: "[data-platform='business-suite']",
    position: "right",
    icon: Briefcase,
    category: "features",
  },
  {
    id: "customization",
    title: "Customize Your Experience",
    description: "Personalize your dashboard",
    content:
      "Use the customize button to rearrange platforms, set preferences, and create a personalized workspace that fits your workflow.",
    target: ".customize-button",
    position: "left",
    icon: Crown,
    category: "advanced",
  },
  {
    id: "security",
    title: "Enterprise Security",
    description: "Bank-level protection",
    content:
      "Your data is protected with end-to-end encryption, multi-factor authentication, and compliance with SOC 2 Type II standards.",
    position: "center",
    icon: Shield,
    category: "advanced",
  },
  {
    id: "completion",
    title: "You're All Set! 🚀",
    description: "Start your financial journey",
    content:
      "Congratulations! You're now ready to explore the full power of SnapAiFi. Click on any platform to get started, or use the Genius Guide for personalized recommendations.",
    position: "center",
    icon: CheckCircle,
    category: "welcome",
  },
]

export function OnboardingTour({ isOpen, onClose }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const currentStepData = tourSteps[currentStep]
  const progress = ((currentStep + 1) / tourSteps.length) * 100

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      // Highlight target element if it exists
      if (currentStepData.target) {
        const element = document.querySelector(currentStepData.target)
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" })
          element.classList.add("tour-highlight")
        }
      }
    } else {
      setIsVisible(false)
      // Remove all highlights
      document.querySelectorAll(".tour-highlight").forEach((el) => {
        el.classList.remove("tour-highlight")
      })
    }

    return () => {
      // Cleanup highlights
      document.querySelectorAll(".tour-highlight").forEach((el) => {
        el.classList.remove("tour-highlight")
      })
    }
  }, [isOpen, currentStep, currentStepData.target])

  const handleNext = () => {
    // Mark current step as completed
    setCompletedSteps((prev) => [...prev, currentStepData.id])

    if (currentStep < tourSteps.length - 1) {
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

  const handleSkip = () => {
    setCurrentStep(tourSteps.length - 1)
  }

  const handleComplete = () => {
    // Mark tour as completed
    localStorage.setItem("nexus-tour-completed", "true")
    onClose()
  }

  const jumpToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  if (!isVisible) return null

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />

      {/* Tour Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-purple-500/30">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                  <currentStepData.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-bold">{currentStepData.title}</DialogTitle>
                  <DialogDescription className="text-purple-300">{currentStepData.description}</DialogDescription>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tour Progress</span>
                <span>
                  {currentStep + 1} of {tourSteps.length}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{currentStepData.content}</p>

              {/* Category Badge */}
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`
                    ${
                      currentStepData.category === "welcome"
                        ? "border-purple-500/30 text-purple-400"
                        : currentStepData.category === "navigation"
                          ? "border-blue-500/30 text-blue-400"
                          : currentStepData.category === "features"
                            ? "border-green-500/30 text-green-400"
                            : "border-orange-500/30 text-orange-400"
                    }
                  `}
                >
                  {currentStepData.category}
                </Badge>
                {completedSteps.includes(currentStepData.id) && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>

              {/* Special content for specific steps */}
              {currentStepData.id === "welcome" && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  <div className="text-center p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                    <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-1" />
                    <div className="text-sm font-medium">AI Trading</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                    <Building className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                    <div className="text-sm font-medium">Real Estate</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    <ShoppingBag className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                    <div className="text-sm font-medium">Commerce</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-orange-500/20 border border-orange-500/30">
                    <Briefcase className="h-6 w-6 text-orange-400 mx-auto mb-1" />
                    <div className="text-sm font-medium">Business</div>
                  </div>
                </div>
              )}

              {currentStepData.id === "completion" && (
                <div className="text-center space-y-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="inline-block"
                  >
                    <div className="p-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Welcome to the Future of Finance!</h3>
                    <p className="text-sm text-muted-foreground">
                      You now have access to the most advanced financial platform ever created.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Step Navigation Dots */}
            <div className="flex items-center justify-center gap-2">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => jumpToStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? "bg-purple-500" : index < currentStep ? "bg-green-500" : "bg-gray-600"
                  }`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                {currentStep < tourSteps.length - 2 && (
                  <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
                    Skip Tour
                  </Button>
                )}
              </div>

              <Button
                onClick={handleNext}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {currentStep === tourSteps.length - 1 ? (
                  <>
                    Get Started
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
        </DialogContent>
      </Dialog>

      {/* Floating Tour Controls */}
      <AnimatePresence>
        {isOpen && currentStepData.target && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Card className="bg-black/90 backdrop-blur-xl border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <currentStepData.icon className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{currentStepData.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      Step {currentStep + 1} of {tourSteps.length}
                    </p>
                  </div>
                  <Button size="sm" onClick={handleNext} className="ml-2">
                    {currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS for highlighting */}
      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 51;
          box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.5), 0 0 20px rgba(168, 85, 247, 0.3);
          border-radius: 8px;
          animation: pulse-highlight 2s infinite;
        }

        @keyframes pulse-highlight {
          0%,
          100% {
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
