"use client"

import { useGlobalUnlock } from "@/hooks/use-global-unlock"
import { Badge } from "@/components/ui/badge"
import { Crown, Unlock, Lock } from "lucide-react"

interface UnlockStatusIndicatorProps {
  featureId: string
  className?: string
}

export function UnlockStatusIndicator({ featureId, className }: UnlockStatusIndicatorProps) {
  const { isFeatureUnlocked, premiumActive } = useGlobalUnlock()
  const isUnlocked = isFeatureUnlocked(featureId)

  if (!premiumActive && !isUnlocked) {
    return (
      <Badge variant="outline" className={`border-gray-400/30 text-gray-400 ${className}`}>
        <Lock className="w-3 h-3 mr-1" />
        Locked
      </Badge>
    )
  }

  if (isUnlocked) {
    return (
      <Badge className={`bg-gradient-to-r from-green-500 to-emerald-500 text-white ${className}`}>
        <Unlock className="w-3 h-3 mr-1" />
        Unlocked
      </Badge>
    )
  }

  return (
    <Badge className={`bg-gradient-to-r from-yellow-500 to-orange-500 text-white ${className}`}>
      <Crown className="w-3 h-3 mr-1" />
      Premium
    </Badge>
  )
}
