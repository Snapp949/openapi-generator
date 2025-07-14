"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, Crown, Star, Shield, Settings, LogOut, Award, ChevronDown, Sparkles } from "lucide-react"
import { useEcosystem } from "@/contexts/ecosystem-context"
import { useRouter } from "next/navigation"

interface QuantumProfileCardProps {
  variant?: "compact" | "expanded" | "minimal"
  showStats?: boolean
  showActions?: boolean
}

export function QuantumProfileCard({
  variant = "compact",
  showStats = true,
  showActions = true,
}: QuantumProfileCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { userProfile, crossPlatformData } = useEcosystem()
  const router = useRouter()

  if (!userProfile) {
    return (
      <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 border-purple-500/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-medium">Guest User</div>
              <div className="text-sm text-muted-foreground">Sign in to access features</div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const getTierIcon = () => {
    switch (userProfile.tier) {
      case "enterprise":
        return Crown
      case "premium":
        return Star
      default:
        return Shield
    }
  }

  const getTierColor = () => {
    switch (userProfile.tier) {
      case "enterprise":
        return "from-yellow-400 to-orange-500"
      case "premium":
        return "from-purple-400 to-pink-500"
      default:
        return "from-blue-400 to-cyan-500"
    }
  }

  const getTierBadgeColor = () => {
    switch (userProfile.tier) {
      case "enterprise":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "premium":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  const TierIcon = getTierIcon()

  const achievements = userProfile.achievements || []
  const stats = userProfile.stats || {
    totalLogins: 0,
    platformsUsed: [],
    featuresUnlocked: 0,
    transactionsCompleted: 0,
    creditScoreImprovement: 0,
    investmentReturns: 0,
    realEstateViewed: 0,
    businessMetricsTracked: 0,
  }

  const profileCompleteness =
    Math.min(
      ((userProfile.name ? 20 : 0) +
        (userProfile.email ? 20 : 0) +
        (stats.platformsUsed.length > 0 ? 20 : 0) +
        (achievements.length > 0 ? 20 : 0) +
        (stats.featuresUnlocked > 5 ? 20 : 0)) /
        100,
      1,
    ) * 100

  if (variant === "minimal") {
    return (
      <div className="flex items-center gap-2">
        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getTierColor()} flex items-center justify-center`}>
          <TierIcon className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="font-medium text-sm">{userProfile.name}</div>
          <div className="text-xs text-muted-foreground capitalize">{userProfile.tier}</div>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/50 border-purple-500/30 overflow-hidden">
      <CardContent className="p-0">
        <motion.div initial={false} animate={{ height: isExpanded ? "auto" : "auto" }} transition={{ duration: 0.3 }}>
          {/* Header */}
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${getTierColor()} flex items-center justify-center`}
                >
                  <TierIcon className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <Badge className={`text-xs px-1 py-0 ${getTierBadgeColor()}`}>
                    {userProfile.tier.charAt(0).toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">{userProfile.name}</h3>
                  {userProfile.tier === "enterprise" && <Crown className="h-4 w-4 text-yellow-400" />}
                  {userProfile.tier === "premium" && <Star className="h-4 w-4 text-purple-400" />}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getTierBadgeColor()}`}>{userProfile.tier}</Badge>
                  {achievements.length > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      {achievements.length}
                    </Badge>
                  )}
                </div>
              </div>

              {showActions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router.push("/upgrade")}>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Upgrade Plan
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>

            {/* Profile Completeness */}
            {showStats && (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Profile Completeness</span>
                  <span className="font-medium">{Math.round(profileCompleteness)}%</span>
                </div>
                <Progress value={profileCompleteness} className="h-2" />
              </div>
            )}
          </div>

          {/* Expanded Stats */}
          <AnimatePresence>
            {(variant === "expanded" || isExpanded) && showStats && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-white/10 p-4 space-y-4"
              >
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg font-bold text-green-400">{stats.platformsUsed.length}</div>
                    <div className="text-xs text-muted-foreground">Platforms Used</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg font-bold text-blue-400">{stats.featuresUnlocked}</div>
                    <div className="text-xs text-muted-foreground">Features Unlocked</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg font-bold text-purple-400">{stats.totalLogins}</div>
                    <div className="text-xs text-muted-foreground">Total Logins</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-white/5">
                    <div className="text-lg font-bold text-yellow-400">{achievements.length}</div>
                    <div className="text-xs text-muted-foreground">Achievements</div>
                  </div>
                </div>

                {/* Recent Achievements */}
                {achievements.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Recent Achievements</h4>
                    <div className="space-y-1">
                      {achievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-2 text-sm">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                            <Award className="h-3 w-3 text-white" />
                          </div>
                          <span className="flex-1">{achievement.name}</span>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              achievement.rarity === "legendary"
                                ? "border-yellow-500/30 text-yellow-400"
                                : achievement.rarity === "epic"
                                  ? "border-purple-500/30 text-purple-400"
                                  : achievement.rarity === "rare"
                                    ? "border-blue-500/30 text-blue-400"
                                    : "border-gray-500/30 text-gray-400"
                            }`}
                          >
                            {achievement.rarity}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Financial Overview */}
                {crossPlatformData && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Financial Overview</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Credit Score:</span>
                        <span className="font-medium text-green-400">
                          {crossPlatformData.creditData?.score || "N/A"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Portfolio:</span>
                        <span className="font-medium text-blue-400">
                          ${crossPlatformData.portfolioData?.totalValue?.toLocaleString() || "0"}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Goals:</span>
                        <span className="font-medium text-purple-400">
                          {crossPlatformData.financialGoals?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Properties:</span>
                        <span className="font-medium text-orange-400">
                          {crossPlatformData.realEstateData?.savedProperties?.length || 0}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button for Compact Variant */}
          {variant === "compact" && showStats && (
            <div className="border-t border-white/10 p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full h-8 text-xs"
              >
                {isExpanded ? "Show Less" : "Show More"}
                <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
              </Button>
            </div>
          )}
        </motion.div>
      </CardContent>
    </Card>
  )
}
