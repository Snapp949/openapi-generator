"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { GeniusGuideOrbWithNextStep } from "@/components/genius-guide-orb/genius-guide-orb-with-next-step"
import { useGeniusGuideSteps } from "@/hooks/use-genius-guide-steps"
import { Brain, CheckCircle, Clock, Target, Trophy, Star, ArrowRight, RotateCcw, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

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

  const currentStepData = getCurrentStepData()
  const nextStepData = getNextStepData()
  const completionStatus = getCompletionStatus()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
      {/* Header */}
      <div className="border-b border-white/10 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                <Brain className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Genius Guide
                </h1>
                <p className="text-sm text-muted-foreground">Your AI-powered financial journey companion</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                Step {currentStep + 1} of {totalSteps}
              </Badge>
              <Button variant="outline" size="sm" onClick={resetProgress}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  Journey Progress
                </CardTitle>
                <CardDescription>Complete your financial journey step by step</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Progress</span>
                    <span className="font-medium">{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{completedSteps} steps completed</span>
                    <span>{totalSteps - completedSteps} steps remaining</span>
                  </div>
                </div>

                {completionStatus.isComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30"
                  >
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <div>
                        <h3 className="font-medium text-green-400">Journey Complete!</h3>
                        <p className="text-sm text-muted-foreground">
                          Congratulations on mastering the Snapifi Financial Platform!
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Current Step */}
            {currentStepData && (
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      {React.createElement(currentStepData.icon, { className: "h-5 w-5 text-blue-400" })}
                      {currentStepData.title}
                    </CardTitle>
                    <Badge
                      variant={currentStepData.priority === "critical" ? "destructive" : "secondary"}
                      className="capitalize"
                    >
                      {currentStepData.priority}
                    </Badge>
                  </div>
                  <CardDescription>{currentStepData.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{currentStepData.estimatedTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span className="capitalize">{currentStepData.category}</span>
                    </div>
                  </div>

                  {currentStepData.benefits && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Benefits:</h4>
                      <ul className="space-y-1">
                        {currentStepData.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="h-3 w-3 text-yellow-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                    {!isStepCompleted(currentStep) && (
                      <Button onClick={() => markStepCompleted(currentStep)}>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}

                    {canProceedToNext && nextStepData && (
                      <Button
                        variant="outline"
                        onClick={proceedToNextStep}
                        className="bg-gradient-to-r from-purple-500/10 to-blue-500/10"
                      >
                        Next: {nextStepData.title}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* All Steps Overview */}
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-400" />
                  Complete Journey Map
                </CardTitle>
                <CardDescription>Overview of all steps in your financial journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allSteps.map((step, index) => (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={cn(
                        "p-3 rounded-lg border transition-all cursor-pointer",
                        index === currentStep
                          ? "border-blue-500/50 bg-blue-500/10"
                          : isStepCompleted(index)
                            ? "border-green-500/50 bg-green-500/10"
                            : "border-white/10 bg-white/5 hover:bg-white/10",
                      )}
                      onClick={() => jumpToStep(index)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            index === currentStep
                              ? "bg-blue-500/20 text-blue-400"
                              : isStepCompleted(index)
                                ? "bg-green-500/20 text-green-400"
                                : "bg-white/10 text-muted-foreground",
                          )}
                        >
                          {isStepCompleted(index) ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            React.createElement(step.icon, { className: "h-4 w-4" })
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm">{step.title}</h4>
                            <Badge variant="outline" size="sm" className="text-xs capitalize">
                              {step.category}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">{step.description}</p>
                        </div>
                        <div className="text-xs text-muted-foreground">{step.estimatedTime}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{completedSteps}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{totalSteps - completedSteps}</div>
                    <div className="text-xs text-muted-foreground">Remaining</div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">{Math.round(progressPercentage)}%</div>
                  <div className="text-xs text-muted-foreground">Progress</div>
                </div>
              </CardContent>
            </Card>

            {/* Next Step Preview */}
            {nextStepData && (
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-lg">Coming Next</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      {React.createElement(nextStepData.icon, { className: "h-5 w-5 text-purple-400" })}
                      <h4 className="font-medium">{nextStepData.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{nextStepData.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{nextStepData.estimatedTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievement Badge */}
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Steps Completed</span>
                    <Badge variant="outline">{completedSteps}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Journey Progress</span>
                    <Badge variant="outline">{Math.round(progressPercentage)}%</Badge>
                  </div>
                  {completionStatus.isComplete && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Platform Master</span>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500">
                        <Trophy className="h-3 w-3 mr-1" />
                        Achieved
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Genius Orb */}
      <GeniusGuideOrbWithNextStep />
    </div>
  )
}
