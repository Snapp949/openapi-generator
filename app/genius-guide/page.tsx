"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  Clock,
  Star,
  Trophy,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  Brain,
  Navigation,
} from "lucide-react"
import { useGeniusGuideSteps } from "@/hooks/use-genius-guide-steps"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export default function GeniusGuidePage() {
  const {
    currentStep,
    nextStep,
    completedSteps,
    totalSteps,
    progressPercentage,
    getCurrentStepData,
    getNextStepData,
    markStepCompleted,
    proceedToNextStep,
    jumpToStep,
    resetProgress,
    isStepCompleted,
    canProceedToNext,
    getCompletionStatus,
    allSteps,
  } = useGeniusGuideSteps()

  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const currentStepData = getCurrentStepData()
  const nextStepData = getNextStepData()
  const completionStatus = getCompletionStatus()

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && canProceedToNext) {
      const timer = setTimeout(() => {
        proceedToNextStep()
      }, 5000) // Auto-advance every 5 seconds

      return () => clearTimeout(timer)
    }
  }, [isAutoPlay, canProceedToNext, proceedToNextStep])

  const categories = [
    { id: "all", name: "All Steps", count: allSteps.length },
    { id: "setup", name: "Setup", count: allSteps.filter((s) => s.category === "setup").length },
    { id: "financial", name: "Financial", count: allSteps.filter((s) => s.category === "financial").length },
    { id: "investment", name: "Investment", count: allSteps.filter((s) => s.category === "investment").length },
    { id: "credit", name: "Credit", count: allSteps.filter((s) => s.category === "credit").length },
    { id: "business", name: "Business", count: allSteps.filter((s) => s.category === "business").length },
    { id: "advanced", name: "Advanced", count: allSteps.filter((s) => s.category === "advanced").length },
  ]

  const filteredSteps = selectedCategory === "all" ? allSteps : allSteps.filter((s) => s.category === selectedCategory)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "high":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 animate-pulse">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Genius Financial Journey
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your personalized step-by-step guide to financial mastery and platform expertise
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Journey Progress
                </CardTitle>
                <CardDescription>
                  {completedSteps} of {totalSteps} steps completed
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className="bg-white/10 border-white/20"
                >
                  {isAutoPlay ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
                  {isAutoPlay ? "Pause" : "Auto-Play"}
                </Button>
                <Button variant="outline" size="sm" onClick={resetProgress} className="bg-white/10 border-white/20">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-green-500/20">
                <div className="text-2xl font-bold text-green-400">{completedSteps}</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-blue-500/20">
                <div className="text-2xl font-bold text-blue-400">{currentStep + 1}</div>
                <div className="text-sm text-muted-foreground">Current Step</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-purple-500/20">
                <div className="text-2xl font-bold text-purple-400">{totalSteps - completedSteps}</div>
                <div className="text-sm text-muted-foreground">Remaining</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-yellow-500/20">
                <div className="text-2xl font-bold text-yellow-400">
                  {allSteps.filter((s) => s.priority === "critical" || s.priority === "high").length}
                </div>
                <div className="text-sm text-muted-foreground">High Priority</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-black/20 border-white/10">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex flex-col items-center gap-1 data-[state=active]:bg-purple-600/50"
              >
                <span className="text-xs">{category.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="space-y-6">
            {/* Current Step Highlight */}
            {currentStepData && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
                <Card className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border-purple-500/30">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                          <currentStepData.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            Current Step: {currentStepData.title}
                            <Badge className={getPriorityColor(currentStepData.priority)}>
                              {currentStepData.priority}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{currentStepData.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{currentStepData.estimatedTime}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentStepData.benefits && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Benefits:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {currentStepData.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      {!isStepCompleted(currentStep) && (
                        <Button
                          onClick={() => markStepCompleted(currentStep)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Complete
                        </Button>
                      )}

                      {currentStepData.navigation && (
                        <Link href={currentStepData.navigation.path}>
                          <Button variant="outline" className="bg-white/10 border-white/20">
                            <Navigation className="h-4 w-4 mr-2" />
                            Go to Step
                          </Button>
                        </Link>
                      )}

                      {canProceedToNext && nextStepData && (
                        <Button
                          onClick={proceedToNextStep}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                        >
                          Next: {nextStepData.title}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* All Steps List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSteps.map((step, index) => {
                const stepIndex = allSteps.findIndex((s) => s.id === step.id)
                const isCompleted = isStepCompleted(stepIndex)
                const isCurrent = stepIndex === currentStep
                const isAccessible = stepIndex <= currentStep || isCompleted

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card
                      className={`
                        relative transition-all duration-300 cursor-pointer
                        ${isCurrent ? "ring-2 ring-purple-500 bg-purple-500/10" : ""}
                        ${isCompleted ? "bg-green-500/10 border-green-500/30" : "bg-black/20 border-white/10"}
                        ${!isAccessible ? "opacity-50" : "hover:bg-white/5"}
                      `}
                      onClick={() => isAccessible && jumpToStep(stepIndex)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                              p-2 rounded-lg
                              ${isCompleted ? "bg-green-500/20" : isCurrent ? "bg-purple-500/20" : "bg-gray-500/20"}
                            `}
                            >
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5 text-green-400" />
                              ) : (
                                <step.icon className="h-5 w-5" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-sm">{step.title}</h3>
                              <p className="text-xs text-muted-foreground">{step.category}</p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            <Badge className={getPriorityColor(step.priority)} variant="outline">
                              {step.priority}
                            </Badge>
                            <div className="text-xs text-muted-foreground">{step.estimatedTime}</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3">{step.description}</p>

                        {step.prerequisites && (
                          <div className="mb-3">
                            <p className="text-xs font-medium text-muted-foreground mb-1">Prerequisites:</p>
                            <div className="flex flex-wrap gap-1">
                              {step.prerequisites.map((prereq) => (
                                <Badge key={prereq} variant="secondary" className="text-xs">
                                  {allSteps.find((s) => s.id === prereq)?.title || prereq}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">Step {step.order}</div>
                          {step.navigation && isAccessible && (
                            <Link href={step.navigation.path}>
                              <Button variant="ghost" size="sm" className="h-6 text-xs">
                                <ArrowRight className="h-3 w-3" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </CardContent>

                      {/* Step Status Indicator */}
                      <div
                        className={`
                        absolute top-2 right-2 w-3 h-3 rounded-full
                        ${isCompleted ? "bg-green-500" : isCurrent ? "bg-purple-500 animate-pulse" : "bg-gray-500"}
                      `}
                      />
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>
        </Tabs>

        {/* Completion Celebration */}
        <AnimatePresence>
          {completionStatus.isComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30 text-center">
                <CardContent className="py-8">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, repeat: 3 }}
                    className="inline-block mb-4"
                  >
                    <Trophy className="h-16 w-16 text-yellow-500" />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Congratulations! 🎉</h2>
                  <p className="text-muted-foreground mb-4">
                    You've completed your entire financial journey and achieved platform mastery!
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
                      <Star className="h-4 w-4 mr-2" />
                      Claim Rewards
                    </Button>
                    <Button variant="outline" className="bg-white/10 border-white/20">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Advanced Guide
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
