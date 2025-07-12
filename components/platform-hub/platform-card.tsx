"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Users,
  TrendingUp,
  MoreVertical,
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  EyeOff,
  Activity,
  Zap,
  ArrowRight,
  Crown,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

interface Environment {
  id: string
  name: string
  description: string
  category: string
  status: "active" | "beta" | "coming-soon"
  users: number
  growth: number
  icon: any
  href: string
  features: string[]
  priority: number
}

interface PlatformCardProps {
  environment: Environment
  viewMode: "grid" | "list"
  isBookmarked?: boolean
  onToggleBookmark: () => void
  onToggleHidden: () => void
}

export function PlatformCard({
  environment,
  viewMode,
  isBookmarked,
  onToggleBookmark,
  onToggleHidden,
}: PlatformCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "beta":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "coming-soon":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
  }

  const getCategoryGradient = (category: string) => {
    switch (category) {
      case "command":
        return "from-purple-500/20 to-pink-600/20"
      case "financial":
        return "from-green-500/20 to-emerald-600/20"
      case "business":
        return "from-blue-500/20 to-cyan-600/20"
      case "commerce":
        return "from-orange-500/20 to-red-600/20"
      case "innovation":
        return "from-violet-500/20 to-purple-600/20"
      default:
        return "from-gray-500/20 to-slate-600/20"
    }
  }

  const handleCardClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
  }

  if (viewMode === "list") {
    return (
      <Card
        className={`
          bg-gradient-to-r ${getCategoryGradient(environment.category)} 
          border-white/10 hover:border-purple-500/30 
          transition-all duration-300 cursor-pointer
          ${isHovered ? "shadow-lg shadow-purple-500/20 scale-[1.02]" : ""}
          ${isAnimating ? "animate-pulse" : ""}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div
                className={`
                p-3 rounded-full bg-gradient-to-r ${getCategoryGradient(environment.category)}
                ${isHovered ? "animate-spin" : ""}
                transition-all duration-300
              `}
              >
                <environment.icon className="h-6 w-6 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-lg">{environment.name}</h3>
                  <Badge className={getStatusColor(environment.status)}>{environment.status}</Badge>
                  {isBookmarked && <BookmarkCheck className="h-4 w-4 text-yellow-400" />}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{environment.description}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {environment.users.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />+{environment.growth}%
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {environment.features.length} features
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href={environment.href}>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Launch
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onToggleBookmark}>
                    {isBookmarked ? (
                      <>
                        <BookmarkCheck className="h-4 w-4 mr-2" />
                        Remove Bookmark
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4 mr-2" />
                        Add Bookmark
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onToggleHidden}>
                    <EyeOff className="h-4 w-4 mr-2" />
                    Hide Platform
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className={`
        bg-gradient-to-br ${getCategoryGradient(environment.category)} 
        border-white/10 hover:border-purple-500/30 
        transition-all duration-500 cursor-pointer group
        ${isHovered ? "shadow-2xl shadow-purple-500/20 scale-105 -translate-y-2" : ""}
        ${isAnimating ? "animate-bounce" : ""}
        relative overflow-hidden
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Animated Background */}
      <div
        className={`
        absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
      `}
      />

      {/* Sparkle Effect */}
      {isHovered && (
        <div className="absolute top-2 right-2">
          <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
        </div>
      )}

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div
            className={`
            p-3 rounded-full bg-gradient-to-r ${getCategoryGradient(environment.category)}
            ${isHovered ? "animate-pulse scale-110" : ""}
            transition-all duration-300 shadow-lg
          `}
          >
            <environment.icon className="h-8 w-8 text-white" />
          </div>

          <div className="flex items-center gap-1">
            {isBookmarked && <BookmarkCheck className="h-4 w-4 text-yellow-400 animate-bounce" />}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onToggleBookmark}>
                  {isBookmarked ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" />
                      Remove Bookmark
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" />
                      Add Bookmark
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onToggleHidden}>
                  <EyeOff className="h-4 w-4 mr-2" />
                  Hide Platform
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-xl font-bold">{environment.name}</CardTitle>
            <Badge className={getStatusColor(environment.status)}>{environment.status}</Badge>
          </div>
          <CardDescription className="text-sm leading-relaxed">{environment.description}</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-2 rounded-lg bg-white/5">
            <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
              <Users className="h-4 w-4" />
              <span className="text-sm font-medium">Users</span>
            </div>
            <div className="text-lg font-bold">{environment.users.toLocaleString()}</div>
          </div>
          <div className="text-center p-2 rounded-lg bg-white/5">
            <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Growth</span>
            </div>
            <div className="text-lg font-bold text-green-400">+{environment.growth}%</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Key Features</div>
          <div className="flex flex-wrap gap-1">
            {environment.features.slice(0, 3).map((feature, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-white/10 text-white/80">
                {feature}
              </Badge>
            ))}
            {environment.features.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-white/10 text-white/80">
                +{environment.features.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Link href={environment.href} className="block">
          <Button
            className={`
              w-full bg-gradient-to-r from-purple-600 to-pink-600 
              hover:from-purple-700 hover:to-pink-700 
              transition-all duration-300 group/btn
              ${isHovered ? "shadow-lg shadow-purple-500/30" : ""}
            `}
          >
            <span className="flex items-center justify-center gap-2">
              <Zap className="h-4 w-4 group-hover/btn:animate-pulse" />
              Launch Platform
              <ArrowRight
                className={`
                h-4 w-4 transition-transform duration-300
                ${isHovered ? "translate-x-1" : ""}
              `}
              />
            </span>
          </Button>
        </Link>
      </CardContent>

      {/* Priority Indicator */}
      {environment.priority <= 3 && (
        <div className="absolute top-0 left-0">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-br-lg">
            <Crown className="h-3 w-3 inline mr-1" />
            Priority
          </div>
        </div>
      )}
    </Card>
  )
}
