"use client"

import type React from "react"

import { useGlobalUnlock } from "@/hooks/use-global-unlock"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Crown, Zap } from "lucide-react"
import Link from "next/link"

interface FeatureGateProps {
  featureId: string
  featureName: string
  featureDescription: string
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function FeatureGate({ featureId, featureName, featureDescription, children, fallback }: FeatureGateProps) {
  const { isFeatureUnlocked, premiumActive } = useGlobalUnlock()
  const isUnlocked = isFeatureUnlocked(featureId)

  if (isUnlocked || premiumActive) {
    return <>{children}</>
  }

  if (fallback) {
    return <>{fallback}</>
  }

  return (
    <Card className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 border-slate-600/30">
      <CardHeader className="text-center">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
          <Lock className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-white flex items-center justify-center gap-2">
          <Crown className="w-5 h-5 text-yellow-400" />
          {featureName}
        </CardTitle>
        <CardDescription className="text-slate-300">{featureDescription}</CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-slate-400">
          This premium feature is currently locked. Unlock it to access advanced functionality.
        </p>
        <div className="space-y-2">
          <Link href="/unlock">
            <Button className="w-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white">
              <Zap className="w-4 h-4 mr-2" />
              Unlock Premium Features
            </Button>
          </Link>
          <p className="text-xs text-slate-500">Get instant access to all premium features</p>
        </div>
      </CardContent>
    </Card>
  )
}
