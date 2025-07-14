"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Brain,
  Sparkles,
  Target,
  X,
  Minimize2,
  Volume2,
  VolumeX,
  Settings,
  Mic,
  MicOff,
  ArrowRight,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Rocket,
  Navigation,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { usePathname, useRouter } from "next/navigation"
import { useGeniusGuideSteps } from "@/hooks/use-genius-guide-steps"

interface GeniusGuideOrbProps {
  className?: string
}

export function GeniusGuideOrbWithNextStep({ className }: GeniusGuideOrbProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isMinimized, setIsMinimized] = React.useState(false)
  const [isSpeaking, setIsSpeaking] = React.useState(false)
  const [isListening, setIsListening] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)
  const [isNavigating, setIsNavigating] = React.useState(false)

  const pathname = usePathname()
  const router = useRouter()

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
  } = useGeniusGuideSteps()

  const currentStepData = getCurrentStepData()

  // Floating animation for the orb
  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  // Pulsing glow effect
  const glowAnimation = {
    scale: [1, 1.1, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 2,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  // Particle effects around the orb
  const particleVariants = {
    animate: {
      y: [0, -20, -40],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        delay: Math.random() * 2,
      },
    },
  }

  // Handle next step navigation
  const handleNextStep = async () => {
    if (!canProceedToNext || !nextStep) return

    setIsNavigating(true)

    try {
      // Navigate to the next step
      if (nextStep.navigation?.path) {
        router.push(nextStep.navigation.path)
      }

      // Mark current step as completed and proceed
      await proceedToNextStep()

      // Provide audio feedback
      if (nextStep.title) {
        await handleSpeak(`Moving to ${nextStep.title}`)
      }
    } catch (error) {
      console.error("Error navigating to next step:", error)
    } finally {
      setIsNavigating(false)
    }
  }

  // Voice synthesis
  const handleSpeak = async (text: string) => {
    setIsSpeaking(true)
    try {
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.9
        utterance.pitch = 1.1
        utterance.volume = 0.8

        const voices = speechSynthesis.getVoices()
        const preferredVoice = voices.find((voice) => voice.name.includes("Google") || voice.name.includes("Microsoft"))
        if (preferredVoice) {
          utterance.voice = preferredVoice
        }

        speechSynthesis.speak(utterance)

        return new Promise<void>((resolve) => {
          utterance.onend = () => resolve()
        })
      }
    } finally {
      setIsSpeaking(false)
    }
  }

  // Voice recognition
  const handleVoiceCommand = () => {
    if (isListening) {
      setIsListening(false)
    } else {
      setIsListening(true)
      if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
        const recognition = new SpeechRecognition()

        recognition.continuous = false
        recognition.interimResults = false
        recognition.lang = "en-US"

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript.toLowerCase()
          if (transcript.includes("next step") || transcript.includes("continue")) {
            handleNextStep()
          } else if (transcript.includes("help") || transcript.includes("guide")) {
            setIsExpanded(true)
          }
        }

        recognition.start()
      }
    }
  }

  if (isMinimized) {
    return (
      <motion.div
        className={cn("fixed bottom-4 right-4 z-[9999]", className)}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 p-0 shadow-lg hover:shadow-xl"
        >
          <Brain className="h-6 w-6 text-white" />
        </Button>
      </motion.div>
    )
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-[9999]", className)}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="mb-4"
          >
            <Card className="w-96 bg-background/95 backdrop-blur-sm border-white/20 shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <motion.div
                        animate={glowAnimation}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 blur-sm"
                      />
                      <div className="relative h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-sm">Genius Guide</CardTitle>
                      <p className="text-xs text-muted-foreground">Step-by-Step Financial Journey</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleVoiceCommand}
                      className={cn("h-6 w-6 p-0", isListening && "text-red-500")}
                    >
                      {isListening ? <Mic className="h-3 w-3" /> : <MicOff className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowSettings(!showSettings)}
                      className="h-6 w-6 p-0"
                    >
                      <Settings className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="h-6 w-6 p-0">
                      <Minimize2 className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)} className="h-6 w-6 p-0">
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Overview */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium">Journey Progress</h4>
                    <Badge variant="outline" className="text-xs">
                      {completedSteps}/{totalSteps} Steps
                    </Badge>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progressPercentage}% Complete</span>
                    <span>{totalSteps - completedSteps} Steps Remaining</span>
                  </div>
                </div>

                {/* Current Step */}
                {currentStepData && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "p-2 rounded-lg",
                          isStepCompleted(currentStep)
                            ? "bg-green-500/20 text-green-400"
                            : "bg-blue-500/20 text-blue-400",
                        )}
                      >
                        {isStepCompleted(currentStep) ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          React.createElement(currentStepData.icon, { className: "h-4 w-4" })
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium">{currentStepData.title}</h4>
                          <Badge
                            variant={currentStepData.priority === "high" ? "destructive" : "secondary"}
                            className="text-xs"
                          >
                            {currentStepData.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{currentStepData.description}</p>

                        {/* Step Details */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{currentStepData.estimatedTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Target className="h-3 w-3" />
                              <span>{currentStepData.category}</span>
                            </div>
                          </div>

                          {currentStepData.benefits && (
                            <div className="space-y-1">
                              <p className="text-xs font-medium text-muted-foreground">Benefits:</p>
                              <ul className="text-xs text-muted-foreground space-y-1">
                                {currentStepData.benefits.map((benefit, index) => (
                                  <li key={index} className="flex items-center gap-1">
                                    <Star className="h-2 w-2 text-yellow-500" />
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 pt-2">
                          {!isStepCompleted(currentStep) && (
                            <Button size="sm" className="h-7 text-xs" onClick={() => markStepCompleted(currentStep)}>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Mark Complete
                            </Button>
                          )}

                          {canProceedToNext && nextStep && (
                            <Button
                              size="sm"
                              className="h-7 text-xs bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                              onClick={handleNextStep}
                              disabled={isNavigating}
                            >
                              {isNavigating ? (
                                <>
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    className="h-3 w-3 mr-1"
                                  >
                                    <Navigation className="h-3 w-3" />
                                  </motion.div>
                                  Navigating...
                                </>
                              ) : (
                                <>
                                  Next Step
                                  <ArrowRight className="h-3 w-3 ml-1" />
                                </>
                              )}
                            </Button>
                          )}

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSpeak(currentStepData.description)}
                            className="h-7 w-7 p-0"
                            disabled={isSpeaking}
                          >
                            {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Next Step Preview */}
                {nextStep && (
                  <div className="space-y-2 border-t border-white/10 pt-3">
                    <h5 className="text-xs font-medium text-muted-foreground">Coming Next</h5>
                    <div className="p-2 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded bg-purple-500/20">
                          <Rocket className="h-3 w-3 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <h6 className="text-xs font-medium">{nextStep.title}</h6>
                          <p className="text-xs text-muted-foreground">{nextStep.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contextual Hints */}
                <div className="space-y-2">
                  <h5 className="text-xs font-medium text-muted-foreground">Smart Hints</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {getContextualHints()
                      .slice(0, 4)
                      .map((hint, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs justify-start bg-transparent"
                        >
                          {React.createElement(hint.icon, { className: "h-3 w-3 mr-1" })}
                          {hint.title}
                        </Button>
                      ))}
                  </div>
                </div>

                {/* Achievement Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-medium text-muted-foreground">Achievements</h5>
                    <div className="flex items-center gap-1">
                      <Trophy className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-yellow-500">{completedSteps}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className={cn(
                          "h-2 w-2 rounded-full",
                          index < Math.floor(completedSteps / 2) ? "bg-yellow-500" : "bg-gray-600",
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Settings Panel */}
                <AnimatePresence>
                  {showSettings && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 border-t border-white/10 pt-3"
                    >
                      <h5 className="text-xs font-medium text-muted-foreground">Guide Settings</h5>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Voice Guidance</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                            On
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Auto-Navigate</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                            On
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs">Smart Hints</span>
                          <Button variant="outline" size="sm" className="h-6 text-xs bg-transparent">
                            On
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Orb */}
      <motion.div
        animate={floatingAnimation}
        className="relative cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Particle Effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            variants={particleVariants}
            animate="animate"
            className="absolute inset-0 pointer-events-none"
            style={{
              left: `${20 + i * 10}%`,
              top: `${20 + i * 10}%`,
            }}
          >
            <Sparkles className="h-2 w-2 text-cyan-400" />
          </motion.div>
        ))}

        {/* Outer Glow Ring */}
        <motion.div
          animate={glowAnimation}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 blur-lg opacity-50"
        />

        {/* Middle Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute inset-2 rounded-full border-2 border-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 opacity-60"
        />

        {/* Main Orb */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-2xl"
        >
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <Brain className="h-8 w-8 text-white" />
          </motion.div>

          {/* Activity Indicator */}
          {(isSpeaking || isListening || isNavigating) && (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 flex items-center justify-center"
            >
              {isNavigating ? (
                <Navigation className="h-2 w-2 text-white" />
              ) : isListening ? (
                <Mic className="h-2 w-2 text-white" />
              ) : (
                <Volume2 className="h-2 w-2 text-white" />
              )}
            </motion.div>
          )}

          {/* Progress Badge */}
          {progressPercentage > 0 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold"
            >
              {Math.round(progressPercentage)}
            </motion.div>
          )}

          {/* Next Step Indicator */}
          {canProceedToNext && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-yellow-500 flex items-center justify-center"
            >
              <ArrowRight className="h-2 w-2 text-white" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}
