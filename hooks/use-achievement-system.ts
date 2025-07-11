// Stub implementation to replace deleted gamification system
// Provides minimal interface to prevent import errors

export interface Achievement {
  id: string
  name: string
  description: string
  unlocked: boolean
  progress: number
  maxProgress: number
}

export function useAchievementSystem() {
  // Stub functions that return default values
  const unlockAchievement = (achievementId: string) => {
    // No-op stub
    return false
  }

  const getAchievementLevel = (userId?: string) => {
    // Return default level
    return 1
  }

  const isAchievementUnlocked = (achievementId: string) => {
    // Always return false since gamification is disabled
    return false
  }

  const getUserAchievements = () => {
    // Return empty array
    return []
  }

  const getAchievementProgress = (achievementId: string) => {
    // Return zero progress
    return { current: 0, total: 100, percentage: 0 }
  }

  return {
    unlockAchievement,
    getAchievementLevel,
    isAchievementUnlocked,
    getUserAchievements,
    getAchievementProgress,
  }
}
