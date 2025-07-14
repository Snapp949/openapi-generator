"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Unlock,
  Zap,
  Star,
  Diamond,
  Sparkles,
  TrendingUp,
  ShoppingCart,
  Home,
  CreditCard,
  Building2,
  Brain,
  BarChart3,
  Shield,
  Users,
  Rocket,
  CheckCircle,
  Gift,
  Trophy,
  Target,
  Infinity,
} from "lucide-react"

interface UnlockFeature {
  id: string
  name: string
  description: string
  category: string
  icon: React.ReactNode
  premium: boolean
  unlocked: boolean
}

const PLATFORM_FEATURES: UnlockFeature[] = [
  // Trading & Investment
  {
    id: "advanced-trading",
    name: "Advanced Trading Tools",
    description: "Professional trading interface with real-time analytics",
    category: "Trading",
    icon: <TrendingUp className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "ai-trading-signals",
    name: "AI Trading Signals",
    description: "Machine learning powered trading recommendations",
    category: "Trading",
    icon: <Brain className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "portfolio-optimization",
    name: "Portfolio Optimization",
    description: "Advanced portfolio balancing and risk management",
    category: "Trading",
    icon: <Target className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },

  // E-Commerce
  {
    id: "holographic-products",
    name: "Holographic Product Catalog",
    description: "3D holographic product visualization and comparison",
    category: "E-Commerce",
    icon: <ShoppingCart className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "ai-shopping-assistant",
    name: "AI Shopping Assistant",
    description: "Personalized product recommendations and price optimization",
    category: "E-Commerce",
    icon: <Sparkles className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "premium-marketplace",
    name: "Premium Marketplace Access",
    description: "Exclusive access to premium vendors and products",
    category: "E-Commerce",
    icon: <Crown className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },

  // Real Estate
  {
    id: "property-analytics",
    name: "Advanced Property Analytics",
    description: "Comprehensive market analysis and investment insights",
    category: "Real Estate",
    icon: <Home className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "virtual-tours",
    name: "Virtual Property Tours",
    description: "Immersive 3D property walkthroughs",
    category: "Real Estate",
    icon: <Diamond className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "investment-calculator",
    name: "Investment ROI Calculator",
    description: "Advanced property investment analysis tools",
    category: "Real Estate",
    icon: <BarChart3 className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },

  // Credit Suite
  {
    id: "credit-optimization",
    name: "Credit Score Optimization",
    description: "AI-powered credit improvement strategies",
    category: "Credit",
    icon: <CreditCard className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "credit-monitoring",
    name: "Real-time Credit Monitoring",
    description: "24/7 credit score tracking and alerts",
    category: "Credit",
    icon: <Shield className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "loan-matching",
    name: "Advanced Loan Matching",
    description: "AI-powered loan product recommendations",
    category: "Credit",
    icon: <Target className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },

  // Business Suite
  {
    id: "business-analytics",
    name: "Business Intelligence Suite",
    description: "Comprehensive business performance analytics",
    category: "Business",
    icon: <Building2 className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "compliance-automation",
    name: "Compliance Automation",
    description: "Automated regulatory compliance monitoring",
    category: "Business",
    icon: <Shield className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "institutional-tools",
    name: "Institutional Trading Tools",
    description: "Enterprise-grade trading and risk management",
    category: "Business",
    icon: <Users className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },

  // AI & Analytics
  {
    id: "predictive-analytics",
    name: "Predictive Analytics Engine",
    description: "Machine learning powered market predictions",
    category: "AI",
    icon: <Brain className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "conversational-ai",
    name: "Advanced AI Assistant",
    description: "Natural language financial advisory AI",
    category: "AI",
    icon: <Sparkles className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
  {
    id: "quantum-computing",
    name: "Quantum Computing Access",
    description: "Quantum-powered financial modeling",
    category: "AI",
    icon: <Infinity className="w-5 h-5" />,
    premium: true,
    unlocked: false,
  },
]

export function GlobalUnlockPanel() {
  const [features, setFeatures] = useState<UnlockFeature[]>(PLATFORM_FEATURES)
  const [isUnlocking, setIsUnlocking] = useState(false)
  const [unlockProgress, setUnlockProgress] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)

  const totalFeatures = features.length
  const unlockedFeatures = features.filter((f) => f.unlocked).length
  const premiumFeatures = features.filter((f) => f.premium).length
  const unlockedPremiumFeatures = features.filter((f) => f.premium && f.unlocked).length

  const categories = Array.from(new Set(features.map((f) => f.category)))

  const unlockAllFeatures = async () => {
    setIsUnlocking(true)
    setUnlockProgress(0)

    // Simulate progressive unlocking with animation
    for (let i = 0; i < features.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 200))

      setFeatures((prev) => prev.map((feature, index) => (index === i ? { ...feature, unlocked: true } : feature)))

      setUnlockProgress(((i + 1) / features.length) * 100)
    }

    setIsUnlocking(false)
    setShowCelebration(true)

    // Hide celebration after 3 seconds
    setTimeout(() => setShowCelebration(false), 3000)
  }

  const unlockCategory = async (category: string) => {
    setIsUnlocking(true)

    const categoryFeatures = features.filter((f) => f.category === category)

    for (let i = 0; i < categoryFeatures.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150))

      setFeatures((prev) =>
        prev.map((feature) => (feature.category === category ? { ...feature, unlocked: true } : feature)),
      )
    }

    setIsUnlocking(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Crown className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Global Premium Unlock
            </h1>
            <Crown className="w-12 h-12 text-yellow-400" />
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Unlock the full potential of the Snapifi Financial Platform. Access all premium features across trading,
            e-commerce, real estate, credit optimization, business intelligence, and AI-powered tools.
          </p>
        </motion.div>

        {/* Celebration Animation */}
        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <Card className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 border-none text-white">
                <CardContent className="p-8 text-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <Trophy className="w-16 h-16 mx-auto mb-4" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">🎉 ALL FEATURES UNLOCKED! 🎉</h2>
                  <p className="text-lg">You now have access to the complete Snapifi ecosystem!</p>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300">Total Features</p>
                  <p className="text-3xl font-bold text-white">{totalFeatures}</p>
                </div>
                <Rocket className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-300">Unlocked</p>
                  <p className="text-3xl font-bold text-white">{unlockedFeatures}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-yellow-300">Premium Features</p>
                  <p className="text-3xl font-bold text-white">{premiumFeatures}</p>
                </div>
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300">Unlock Progress</p>
                  <p className="text-3xl font-bold text-white">
                    {Math.round((unlockedFeatures / totalFeatures) * 100)}%
                  </p>
                </div>
                <Star className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Bar */}
        {isUnlocking && (
          <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-white">Unlocking Features...</h3>
                  <span className="text-blue-300">{Math.round(unlockProgress)}%</span>
                </div>
                <Progress value={unlockProgress} className="h-3" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Master Unlock Button */}
        <div className="text-center">
          <Button
            onClick={unlockAllFeatures}
            disabled={isUnlocking || unlockedFeatures === totalFeatures}
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white font-bold py-4 px-8 text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-200"
          >
            {isUnlocking ? (
              <>
                <Zap className="w-6 h-6 mr-2 animate-spin" />
                Unlocking All Features...
              </>
            ) : unlockedFeatures === totalFeatures ? (
              <>
                <CheckCircle className="w-6 h-6 mr-2" />
                All Features Unlocked!
              </>
            ) : (
              <>
                <Unlock className="w-6 h-6 mr-2" />
                Unlock All Premium Features
              </>
            )}
          </Button>
        </div>

        {/* Features by Category */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-slate-800/50">
            <TabsTrigger value="all">All Features</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`relative overflow-hidden transition-all duration-300 ${
                      feature.unlocked
                        ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30"
                        : "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/30"
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {feature.icon}
                          <div>
                            <CardTitle className="text-white">{feature.name}</CardTitle>
                            <Badge variant={feature.premium ? "default" : "secondary"} className="mt-1">
                              {feature.premium ? "Premium" : "Standard"}
                            </Badge>
                          </div>
                        </div>
                        {feature.unlocked && <CheckCircle className="w-6 h-6 text-green-400" />}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-300">{feature.description}</CardDescription>
                      <Badge variant="outline" className="mt-3 border-blue-400/30 text-blue-300">
                        {feature.category}
                      </Badge>
                    </CardContent>

                    {feature.unlocked && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 pointer-events-none"
                      />
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{category} Features</h2>
                <Button
                  onClick={() => unlockCategory(category)}
                  disabled={isUnlocking || features.filter((f) => f.category === category).every((f) => f.unlocked)}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Unlock {category}
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features
                  .filter((f) => f.category === category)
                  .map((feature, index) => (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card
                        className={`relative overflow-hidden transition-all duration-300 ${
                          feature.unlocked
                            ? "bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30"
                            : "bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/30"
                        }`}
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {feature.icon}
                              <div>
                                <CardTitle className="text-white">{feature.name}</CardTitle>
                                <Badge variant={feature.premium ? "default" : "secondary"} className="mt-1">
                                  {feature.premium ? "Premium" : "Standard"}
                                </Badge>
                              </div>
                            </div>
                            {feature.unlocked && <CheckCircle className="w-6 h-6 text-green-400" />}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-slate-300">{feature.description}</CardDescription>
                        </CardContent>

                        {feature.unlocked && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-emerald-400/10 pointer-events-none"
                          />
                        )}
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Benefits Section */}
        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-2xl text-white flex items-center gap-3">
              <Gift className="w-8 h-8 text-purple-400" />
              Premium Benefits Unlocked
            </CardTitle>
            <CardDescription className="text-slate-300">
              Enjoy these exclusive benefits with your premium access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Priority customer support",
                "Advanced analytics and reporting",
                "Custom dashboard configurations",
                "API access for integrations",
                "White-label solutions",
                "Dedicated account manager",
                "Early access to new features",
                "Enhanced security features",
                "Custom training sessions",
              ].map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-purple-500/10"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
