"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Trophy,
  Zap,
  BarChart3,
  Rocket,
  Crown,
  Sparkles,
  Navigation,
  Clock,
  RefreshCw,
} from "lucide-react"
import { useGeniusGuideSteps } from "@/hooks/use-genius-guide-steps"
import { useEcosystem } from "@/contexts/ecosystem-context"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function GeniusGuidePage() {
  const {
    currentStep,
    nextStep,
    completedSteps,
    totalSteps,
    progressPercentage,
    getCurrentStepData,
    markStepCompleted,
    proceedToNextStep,
    getContextualHints,
    isStepCompleted,
    canProceedToNext,
    allSteps,
    jumpToStep,
    resetProgress,
    getCompletionStatus,
  } = useGeniusGuideSteps()

  const { userProfile, addNotification, trackEvent } = useEcosystem()
  const router = useRouter()

  const [selectedStepId, setSelectedStepId] = useState<string | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const currentStepData = getCurrentStepData()
  const completionStatus = getCompletionStatus()

  // Handle step completion celebration
  useEffect(() => {
    if (completionStatus.isComplete && !showCelebration) {
      setShowCelebration(true)
      addNotification({
        title: "🎉 Congratulations! Journey Complete!",
        message: "You've mastered the SnapAiFi platform! All features are now unlocked.",
        type: "success",
        category: "achievement",
        read: false,
        actions: [
          {
            label: "Claim Rewards",
            action: "claim_rewards",
            url: "/rewards",
          },
        ],
      })
    }
  }, [completionStatus.isComplete, showCelebration, addNotification])

  const handleStepNavigation = async (stepIndex: number) => {
    setIsNavigating(true)
    const step = allSteps[stepIndex]

    try {
      // Navigate to step's page if it has navigation
      if (step.navigation?.path) {
        router.push(step.navigation.path)
      }

      // Jump to the step
      jumpToStep(stepIndex)

      // Track the navigation
      trackEvent("genius_guide_navigation", {
        from_step: currentStep,
        to_step: stepIndex,
        step_id: step.id,
      })

      addNotification({
        title: "Step Navigation",
        message: `Navigated to: ${step.title}`,
        type: "info",
        category: "navigation",
        read: false,
      })
    } catch (error) {
      console.error("Navigation error:", error)
      addNotification({
        title: "Navigation Error",
        message: "Failed to navigate to the selected step",
        type: "error",
        category: "system",
        read: false,
      })
    } finally {
      setIsNavigating(false)
    }
  }

  const handleNextStep = async () => {
    if (!canProceedToNext || !nextStep) return

    setIsNavigating(true)

    try {
      // Navigate to next step's page
      if (nextStep.navigation?.path) {
        router.push(nextStep.navigation.path)
      }

      // Proceed to next step
      await proceedToNextStep()

      trackEvent("genius_guide_progress", {
        completed_step: currentStepData?.id,
        next_step: nextStep.id,
        progress_percentage: progressPercentage,
      })
    } catch (error) {
      console.error("Error proceeding to next step:", error)
    } finally {
      setIsNavigating(false)
    }
  }

  const handleCompleteStep = () => {
    if (currentStepData) {
      markStepCompleted(currentStep)
      addNotification({
        title: "Step Completed! ✅",
        message: `Great job completing: ${currentStepData.title}`,
        type: "success",
        category: "achievement",
        read: false,
      })

      trackEvent("step_completed", {
        step_id: currentStepData.id,
        step_title: currentStepData.title,
        completion_time: new Date().toISOString(),
      })
    }
  }

  const handleQuickAction = (hint: any) => {
    trackEvent("quick_action_used", {
      action_id: hint.id,
      action_title: hint.title,
    })

    hint.action()
  }

  const handleResetProgress = () => {
    resetProgress()
    addNotification({
      title: "Progress Reset",
      message: "Your genius guide progress has been reset. Start your journey again!",
      type: "info",
      category: "system",
      read: false,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="p-3 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500"
            >
              <Brain className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Genius Guide Dashboard
              </h1>
              <p className="text-muted-foreground">Your AI-powered financial journey companion</p>
            </div>
          </div>

          {/* Progress Overview */}
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Journey Progress</span>
              <span>
                {completedSteps} of {totalSteps} steps completed
              </span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <div className="flex justify-between text-sm">
              <span className="text-purple-400">{progressPercentage.toFixed(1)}% Complete</span>
              <span className="text-muted-foreground">
                {completionStatus.isComplete
                  ? "🎉 Journey Complete!"
                  : `${totalSteps - completedSteps} steps remaining`}
              </span>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
              <Trophy className="h-3 w-3 mr-1" />
              {completedSteps} Steps Completed
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              <Star className="h-3 w-3 mr-1" />
              {Math.floor(progressPercentage / 10)} Achievements
            </Badge>
            {completionStatus.isComplete && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                <Crown className="h-3 w-3 mr-1" />
                Master Status
              </Badge>
            )}
          </div>
        </div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
              onClick={() => setShowCelebration(false)}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 3 }}
                className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-8 rounded-2xl text-center"
              >
                <Trophy className="h-16 w-16 text-white mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">🎉 Congratulations! 🎉</h2>
                <p className="text-white/90">You've completed your financial journey!</p>
                <Button
                  className="mt-4 bg-white text-black hover:bg-white/90"
                  onClick={() => setShowCelebration(false)}
                >
                  Continue
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Tabs defaultValue="journey" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger
              value="journey"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Journey Map
            </TabsTrigger>
            <TabsTrigger
              value="current"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              <Target className="h-4 w-4 mr-2" />
              Current Step
            </TabsTrigger>
            <TabsTrigger
              value="hints"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-600 data-[state=active]:text-white"
            >
              <Zap className="h-4 w-4 mr-2" />
              Smart Hints
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="journey" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allSteps.map((step, index) => {
                const isCompleted = isStepCompleted(index)
                const isCurrent = index === currentStep
                const isLocked = index > currentStep && !isCompleted

                return (
                  <motion.div
                    key={step.id}
                    whileHover={{ scale: isLocked ? 1 : 1.02 }}
                    whileTap={{ scale: isLocked ? 1 : 0.98 }}
                  >
                    <Card
                      className={`
                        cursor-pointer transition-all duration-300 border-2
                        ${
                          isCurrent
                            ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20"
                            : isCompleted
                              ? "border-green-500/50 bg-green-500/10 hover:border-green-500"
                              : isLocked
                                ? "border-gray-600 bg-gray-800/50 opacity-60 cursor-not-allowed"
                                : "border-white/20 bg-black/20 hover:border-white/40"
                        }
                      `}
                      onClick={() => !isLocked && handleStepNavigation(index)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                                p-2 rounded-lg
                                ${
                                  isCurrent
                                    ? "bg-purple-500/30"
                                    : isCompleted
                                      ? "bg-green-500/30"
                                      : isLocked
                                        ? "bg-gray-600/30"
                                        : "bg-white/10"
                                }
                              `}
                            >
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5 text-green-400" />
                              ) : (
                                <step.icon className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <CardTitle className="text-sm">{step.title}</CardTitle>
                              <CardDescription className="text-xs">{step.estimatedTime}</CardDescription>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Badge variant={step.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                              {step.priority}
                            </Badge>
                            {isCurrent && (
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                                Current
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">{step.description}</p>

                        {step.benefits && (
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">Benefits:</p>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {step.benefits.slice(0, 2).map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-1">
                                  <Star className="h-2 w-2 text-yellow-500" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <Badge variant="outline" className="text-xs">
                            {step.category}
                          </Badge>
                          {!isLocked && (
                            <Button
                              size="sm"
                              variant={isCurrent ? "default" : "ghost"}
                              className="h-6 text-xs"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStepNavigation(index)
                              }}
                            >
                              {isCurrent ? "Continue" : isCompleted ? "Review" : "Start"}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="current" className="space-y-6">
            {currentStepData ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/20 border-white/10">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-lg bg-purple-500/20">
                        <currentStepData.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{currentStepData.title}</CardTitle>
                        <CardDescription>{currentStepData.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-white/5">
                        <Clock className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                        <div className="text-sm font-medium">{currentStepData.estimatedTime}</div>
                        <div className="text-xs text-muted-foreground">Estimated Time</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-white/5">
                        <Target className="h-5 w-5 mx-auto mb-1 text-green-400" />
                        <div className="text-sm font-medium">{currentStepData.category}</div>
                        <div className="text-xs text-muted-foreground">Category</div>
                      </div>
                    </div>

                    {currentStepData.benefits && (
                      <div className="space-y-2">
                        <h4 className="font-medium">Benefits of Completing This Step:</h4>
                        <ul className="space-y-1">
                          {currentStepData.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center gap-3 pt-4">
                      {!isStepCompleted(currentStep) && (
                        <Button
                          onClick={handleCompleteStep}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Complete
                        </Button>
                      )}

                      {canProceedToNext && nextStep && (
                        <Button
                          onClick={handleNextStep}
                          disabled={isNavigating}
                          className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700"
                        >
                          {isNavigating ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                className="h-4 w-4 mr-2"
                              >
                                <Navigation className="h-4 w-4" />
                              </motion.div>
                              Navigating...
                            </>
                          ) : (
                            <>
                              Next Step
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </>
                          )}
                        </Button>
                      )}

                      {currentStepData.navigation?.path && (
                        <Button
                          variant="outline"
                          onClick={() => router.push(currentStepData.navigation!.path)}
                          className="border-white/20 hover:bg-white/10"
                        >
                          <Navigation className="h-4 w-4 mr-2" />
                          Go to Platform
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Next Step Preview */}
                {nextStep && (
                  <Card className="bg-black/20 border-white/10">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Rocket className="h-5 w-5 text-orange-400" />
                        Coming Next
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-500/20">
                          <nextStep.icon className="h-5 w-5 text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">{nextStep.title}</h4>
                          <p className="text-sm text-muted-foreground">{nextStep.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-blue-400" />
                          <span>{nextStep.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-3 w-3 text-green-400" />
                          <span>{nextStep.category}</span>
                        </div>
                      </div>

                      {nextStep.benefits && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">What You'll Gain:</h5>
                          <ul className="space-y-1">
                            {nextStep.benefits.slice(0, 3).map((benefit, index) => (
                              <li key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Star className="h-2 w-2 text-yellow-500" />
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="bg-black/20 border-white/10">
                <CardContent className="text-center py-12">
                  <Trophy className="h-12 w-12 mx-auto text-yellow-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Journey Complete!</h3>
                  <p className="text-muted-foreground mb-4">
                    Congratulations! You've completed all steps in your financial journey.
                  </p>
                  <Button
                    onClick={handleResetProgress}
                    variant="outline"
                    className="border-white/20 hover:bg-white/10 bg-transparent"
                  >
                    Start New Journey
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="hints" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getContextualHints().map((hint) => (
                <Card key={hint.id} className="bg-black/20 border-white/10 hover:border-white/30 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20">
                        <hint.icon className="h-5 w-5 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">{hint.title}</h4>
                        <p className="text-sm text-muted-foreground">{hint.description}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleQuickAction(hint)}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                    >
                      <Zap className="h-3 w-3 mr-2" />
                      Quick Action
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* AI Recommendations */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-400" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Personalized suggestions based on your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="h-4 w-4 text-purple-400" />
                      <h4 className="font-medium">Focus Area</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Based on your progress, we recommend focusing on credit optimization next.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => router.push("/credit-suite")}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Optimize Credit
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <h4 className="font-medium">Investment Opportunity</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Your risk profile suggests exploring diversified portfolio options.
                    </p>
                    <Button
                      size="sm"
                      onClick={() => router.push("/dashboard/snap-dax")}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Explore Investments
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Completion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-400 mb-2">{progressPercentage.toFixed(1)}%</div>
                  <Progress value={progressPercentage} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {completedSteps} of {totalSteps} steps completed
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Time Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {allSteps
                      .slice(0, completedSteps)
                      .reduce((total, step) => total + Number.parseInt(step.estimatedTime), 0)}
                    m
                  </div>
                  <p className="text-xs text-muted-foreground">Total time invested in learning</p>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Achievement Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{Math.floor(progressPercentage * 10)}</div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        key={index}
                        className={`h-3 w-3 ${
                          index < Math.floor(progressPercentage / 20) ? "text-yellow-400" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Financial mastery level</p>
                </CardContent>
              </Card>
            </div>

            {/* Progress Chart */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Learning Progress Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg flex items-center justify-center border border-purple-500/20">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                    <p className="text-white font-medium">Progress Visualization</p>
                    <p className="text-sm text-muted-foreground">Track your learning journey</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Breakdown */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Progress by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["setup", "financial", "investment", "business", "advanced"].map((category) => {
                    const categorySteps = allSteps.filter((step) => step.category === category)
                    const completedCategorySteps = categorySteps.filter((step) =>
                      isStepCompleted(allSteps.indexOf(step)),
                    )
                    const categoryProgress = (completedCategorySteps.length / categorySteps.length) * 100

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{category}</span>
                          <span>
                            {completedCategorySteps.length}/{categorySteps.length}
                          </span>
                        </div>
                        <Progress value={categoryProgress} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions Footer */}
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push("/dashboard")}
                  className="border-white/20 hover:bg-white/10"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetProgress}
                  className="border-white/20 hover:bg-white/10 bg-transparent"
                >
                  <RefreshCw className="h-3 w-3 mr-2" />
                  Reset Progress
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
