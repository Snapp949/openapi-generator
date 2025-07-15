"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Zap, Target, Award, Crown, TrendingUp, Users, Gift, Sparkles, Medal, Flame } from "lucide-react"
import { HolographicHeader } from "@/components/ui/holographic-header"
import { useEcosystem } from "@/contexts/ecosystem-context"

interface Achievement {
  id: string
  title: string
  description: string
  icon: any
  rarity: "common" | "rare" | "epic" | "legendary"
  progress: number
  maxProgress: number
  reward: string
  unlocked: boolean
}

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  reward: string
  timeLeft: string
  progress: number
  maxProgress: number
}

interface Leaderboard {
  rank: number
  name: string
  points: number
  avatar: string
  badge: string
}

export default function GamificationPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [leaderboard, setLeaderboard] = useState<Leaderboard[]>([])
  const [userStats, setUserStats] = useState({
    totalPoints: 15420,
    level: 12,
    nextLevelPoints: 18000,
    streak: 7,
    rank: 23,
  })

  const { trackPageView } = useEcosystem()

  useEffect(() => {
    trackPageView("/dashboard/gamification")

    // Initialize achievements
    setAchievements([
      {
        id: "first-trade",
        title: "First Trade",
        description: "Complete your first trading transaction",
        icon: TrendingUp,
        rarity: "common",
        progress: 1,
        maxProgress: 1,
        reward: "100 XP",
        unlocked: true,
      },
      {
        id: "credit-master",
        title: "Credit Master",
        description: "Achieve a credit score above 800",
        icon: Crown,
        rarity: "epic",
        progress: 785,
        maxProgress: 800,
        reward: "500 XP + Premium Badge",
        unlocked: false,
      },
      {
        id: "property-investor",
        title: "Property Investor",
        description: "View 50 properties in real estate hub",
        icon: Award,
        rarity: "rare",
        progress: 32,
        maxProgress: 50,
        reward: "250 XP",
        unlocked: false,
      },
      {
        id: "streak-warrior",
        title: "Streak Warrior",
        description: "Maintain a 30-day login streak",
        icon: Flame,
        rarity: "legendary",
        progress: 7,
        maxProgress: 30,
        reward: "1000 XP + Exclusive Avatar",
        unlocked: false,
      },
    ])

    // Initialize challenges
    setChallenges([
      {
        id: "weekly-trader",
        title: "Weekly Trader",
        description: "Complete 5 trades this week",
        difficulty: "medium",
        reward: "200 XP",
        timeLeft: "3 days",
        progress: 2,
        maxProgress: 5,
      },
      {
        id: "credit-improver",
        title: "Credit Improver",
        description: "Increase credit score by 10 points",
        difficulty: "hard",
        reward: "300 XP",
        timeLeft: "2 weeks",
        progress: 5,
        maxProgress: 10,
      },
      {
        id: "explorer",
        title: "Platform Explorer",
        description: "Visit all 8 platform environments",
        difficulty: "easy",
        reward: "150 XP",
        timeLeft: "1 week",
        progress: 6,
        maxProgress: 8,
      },
    ])

    // Initialize leaderboard
    setLeaderboard([
      { rank: 1, name: "Alex Chen", points: 25430, avatar: "👑", badge: "Legend" },
      { rank: 2, name: "Sarah Johnson", points: 23890, avatar: "🏆", badge: "Master" },
      { rank: 3, name: "Mike Rodriguez", points: 22150, avatar: "⭐", badge: "Expert" },
      { rank: 4, name: "Emma Wilson", points: 20980, avatar: "💎", badge: "Pro" },
      { rank: 5, name: "David Kim", points: 19750, avatar: "🚀", badge: "Advanced" },
    ])
  }, [trackPageView])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400 border-gray-400/30"
      case "rare":
        return "text-blue-400 border-blue-400/30"
      case "epic":
        return "text-purple-400 border-purple-400/30"
      case "legendary":
        return "text-yellow-400 border-yellow-400/30"
      default:
        return "text-gray-400 border-gray-400/30"
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500/20 text-green-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "hard":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <HolographicHeader
          title="Gamification Hub"
          subtitle="Earn rewards, unlock achievements, and compete with others"
          gradient="from-purple-400 to-pink-400"
        />

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">{userStats.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">Level {userStats.level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
              <Progress value={(userStats.totalPoints / userStats.nextLevelPoints) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">{userStats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>

          <Card className="bg-black/20 border-white/10">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">#{userStats.rank}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  Achievements
                </CardTitle>
                <CardDescription>Track your progress and unlock rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={`bg-white/5 border-2 ${getRarityColor(achievement.rarity)} ${
                        achievement.unlocked ? "opacity-100" : "opacity-70"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-full ${achievement.unlocked ? "bg-green-500/20" : "bg-gray-500/20"}`}
                            >
                              <achievement.icon
                                className={`h-5 w-5 ${achievement.unlocked ? "text-green-400" : "text-gray-400"}`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">{achievement.title}</h3>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                          </div>
                          <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
                          <div className="text-sm text-muted-foreground">Reward: {achievement.reward}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-400" />
                  Active Challenges
                </CardTitle>
                <CardDescription>Complete challenges to earn bonus rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {challenges.map((challenge) => (
                    <Card key={challenge.id} className="bg-white/5 border-white/10">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{challenge.title}</h3>
                            <p className="text-sm text-muted-foreground">{challenge.description}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getDifficultyColor(challenge.difficulty)}>{challenge.difficulty}</Badge>
                            <Badge variant="outline" className="text-xs">
                              {challenge.timeLeft}
                            </Badge>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>
                              {challenge.progress}/{challenge.maxProgress}
                            </span>
                          </div>
                          <Progress value={(challenge.progress / challenge.maxProgress) * 100} />
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Reward: {challenge.reward}</span>
                            <Button size="sm" variant="outline" className="bg-white/10 border-white/20">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-400" />
                  Global Leaderboard
                </CardTitle>
                <CardDescription>See how you rank against other users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        user.rank <= 3
                          ? "bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20"
                          : "bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`text-2xl font-bold ${
                            user.rank === 1
                              ? "text-yellow-400"
                              : user.rank === 2
                                ? "text-gray-300"
                                : user.rank === 3
                                  ? "text-orange-400"
                                  : "text-muted-foreground"
                          }`}
                        >
                          #{user.rank}
                        </div>
                        <div className="text-2xl">{user.avatar}</div>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <Badge variant="secondary" className="text-xs">
                            {user.badge}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{user.points.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-pink-400" />
                  Reward Store
                </CardTitle>
                <CardDescription>Spend your points on exclusive rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Premium Avatar", cost: 1000, icon: Crown },
                    { name: "Trading Boost", cost: 500, icon: Zap },
                    { name: "Credit Insight", cost: 750, icon: Star },
                    { name: "VIP Badge", cost: 2000, icon: Medal },
                    { name: "Platform Theme", cost: 300, icon: Sparkles },
                    { name: "Exclusive Access", cost: 5000, icon: Crown },
                  ].map((reward, index) => (
                    <Card key={index} className="bg-white/5 border-white/10 hover:border-purple-500/30 transition-all">
                      <CardContent className="p-4 text-center">
                        <reward.icon className="h-8 w-8 mx-auto mb-3 text-purple-400" />
                        <h3 className="font-semibold mb-2">{reward.name}</h3>
                        <div className="text-lg font-bold text-yellow-400 mb-3">{reward.cost} points</div>
                        <Button
                          size="sm"
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          disabled={userStats.totalPoints < reward.cost}
                        >
                          {userStats.totalPoints >= reward.cost ? "Purchase" : "Insufficient Points"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
