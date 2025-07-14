"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface GlobalUnlockState {
  unlockedFeatures: string[]
  premiumActive: boolean
  unlockTimestamp: number | null

  // Actions
  unlockFeature: (featureId: string) => void
  unlockAllFeatures: () => void
  unlockCategory: (category: string) => void
  isFeatureUnlocked: (featureId: string) => boolean
  resetUnlocks: () => void
}

const ALL_FEATURE_IDS = [
  // Trading
  "advanced-trading",
  "ai-trading-signals",
  "portfolio-optimization",

  // E-Commerce
  "holographic-products",
  "ai-shopping-assistant",
  "premium-marketplace",

  // Real Estate
  "property-analytics",
  "virtual-tours",
  "investment-calculator",

  // Credit
  "credit-optimization",
  "credit-monitoring",
  "loan-matching",

  // Business
  "business-analytics",
  "compliance-automation",
  "institutional-tools",

  // AI
  "predictive-analytics",
  "conversational-ai",
  "quantum-computing",
]

const CATEGORY_FEATURES = {
  Trading: ["advanced-trading", "ai-trading-signals", "portfolio-optimization"],
  "E-Commerce": ["holographic-products", "ai-shopping-assistant", "premium-marketplace"],
  "Real Estate": ["property-analytics", "virtual-tours", "investment-calculator"],
  Credit: ["credit-optimization", "credit-monitoring", "loan-matching"],
  Business: ["business-analytics", "compliance-automation", "institutional-tools"],
  AI: ["predictive-analytics", "conversational-ai", "quantum-computing"],
}

export const useGlobalUnlock = create<GlobalUnlockState>()(
  persist(
    (set, get) => ({
      unlockedFeatures: [],
      premiumActive: false,
      unlockTimestamp: null,

      unlockFeature: (featureId: string) => {
        set((state) => ({
          unlockedFeatures: [...new Set([...state.unlockedFeatures, featureId])],
          premiumActive: true,
          unlockTimestamp: Date.now(),
        }))
      },

      unlockAllFeatures: () => {
        set({
          unlockedFeatures: ALL_FEATURE_IDS,
          premiumActive: true,
          unlockTimestamp: Date.now(),
        })
      },

      unlockCategory: (category: string) => {
        const categoryFeatures = CATEGORY_FEATURES[category as keyof typeof CATEGORY_FEATURES] || []
        set((state) => ({
          unlockedFeatures: [...new Set([...state.unlockedFeatures, ...categoryFeatures])],
          premiumActive: true,
          unlockTimestamp: Date.now(),
        }))
      },

      isFeatureUnlocked: (featureId: string) => {
        return get().unlockedFeatures.includes(featureId)
      },

      resetUnlocks: () => {
        set({
          unlockedFeatures: [],
          premiumActive: false,
          unlockTimestamp: null,
        })
      },
    }),
    {
      name: "global-unlock-storage",
      version: 1,
    },
  ),
)
