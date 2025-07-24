"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { usePathname } from "next/navigation"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  tier: "basic" | "premium" | "enterprise"
  joinDate: string
  lastActive: string
  preferences: UserPreferences
  achievements: Achievement[]
  stats: UserStats
}

interface UserPreferences {
  theme: "light" | "dark" | "auto"
  notifications: NotificationSettings
  privacy: PrivacySettings
  accessibility: AccessibilitySettings
  dashboard: DashboardSettings
}

interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
  inApp: boolean
  frequency: "immediate" | "daily" | "weekly"
  categories: {
    financial: boolean
    trading: boolean
    realEstate: boolean
    credit: boolean
    business: boolean
    legal: boolean
    system: boolean
  }
}

interface PrivacySettings {
  profileVisibility: "public" | "private" | "friends"
  dataSharing: boolean
  analytics: boolean
  marketing: boolean
}

interface AccessibilitySettings {
  fontSize: "small" | "medium" | "large" | "xl"
  contrast: "normal" | "high"
  motion: "full" | "reduced" | "none"
  screenReader: boolean
  voiceNavigation: boolean
}

interface DashboardSettings {
  layout: "grid" | "list" | "compact"
  widgets: string[]
  pinnedEnvironments: string[]
  quickActions: string[]
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string
  category: string
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface UserStats {
  totalLogins: number
  platformsUsed: string[]
  featuresUnlocked: number
  transactionsCompleted: number
  creditScoreImprovement: number
  investmentReturns: number
  realEstateViewed: number
  businessMetricsTracked: number
}

interface CrossPlatformData {
  financialGoals: FinancialGoal[]
  portfolioData: PortfolioData
  creditData: CreditData
  realEstateData: RealEstateData
  businessData: BusinessData
  legalData: LegalData
}

interface FinancialGoal {
  id: string
  name: string
  targetAmount: number
  currentAmount: number
  deadline: string
  category: "savings" | "investment" | "debt" | "purchase"
  priority: "low" | "medium" | "high"
  status: "active" | "completed" | "paused"
}

interface PortfolioData {
  totalValue: number
  dayChange: number
  dayChangePercent: number
  positions: Position[]
  performance: PerformanceData[]
  riskScore: number
  diversificationScore: number
}

interface Position {
  symbol: string
  name: string
  quantity: number
  currentPrice: number
  totalValue: number
  dayChange: number
  dayChangePercent: number
  allocation: number
}

interface PerformanceData {
  date: string
  value: number
  return: number
  benchmark: number
}

interface CreditData {
  score: number
  scoreChange: number
  factors: CreditFactor[]
  recommendations: CreditRecommendation[]
  accounts: CreditAccount[]
  inquiries: CreditInquiry[]
  utilization: number
  paymentHistory: number
  accountAge: number
  creditMix: number
}

interface CreditFactor {
  factor: string
  impact: "positive" | "negative" | "neutral"
  description: string
  weight: number
}

interface CreditRecommendation {
  id: string
  title: string
  description: string
  impact: number
  timeframe: string
  difficulty: "easy" | "medium" | "hard"
  category: string
}

interface CreditAccount {
  id: string
  name: string
  type: "credit_card" | "loan" | "mortgage" | "line_of_credit"
  balance: number
  limit: number
  utilization: number
  paymentStatus: "current" | "late" | "missed"
  openDate: string
}

interface CreditInquiry {
  id: string
  creditor: string
  date: string
  type: "hard" | "soft"
  purpose: string
}

interface RealEstateData {
  savedProperties: SavedProperty[]
  viewedProperties: string[]
  searchCriteria: SearchCriteria
  loanApplications: LoanApplication[]
  marketInsights: MarketInsight[]
}

interface SavedProperty {
  id: string
  address: string
  price: number
  bedrooms: number
  bathrooms: number
  sqft: number
  propertyType: string
  listingDate: string
  savedAt: string
  notes: string
}

interface SearchCriteria {
  location: string
  priceRange: [number, number]
  bedrooms: number
  bathrooms: number
  propertyTypes: string[]
  features: string[]
}

interface LoanApplication {
  id: string
  propertyId: string
  loanType: "conventional" | "fha" | "va" | "usda" | "50_year"
  amount: number
  status: "draft" | "submitted" | "under_review" | "approved" | "denied"
  submittedAt: string
  documents: LoanDocument[]
}

interface LoanDocument {
  id: string
  name: string
  type: string
  uploadedAt: string
  status: "pending" | "verified" | "rejected"
}

interface MarketInsight {
  id: string
  location: string
  insight: string
  trend: "up" | "down" | "stable"
  confidence: number
  date: string
}

interface BusinessData {
  companies: BusinessEntity[]
  metrics: BusinessMetrics
  compliance: ComplianceStatus
  integrations: BusinessIntegration[]
}

interface BusinessEntity {
  id: string
  name: string
  type: "llc" | "corporation" | "partnership" | "sole_proprietorship"
  status: "active" | "inactive" | "pending"
  registrationDate: string
  ein: string
  address: string
}

interface BusinessMetrics {
  revenue: number
  expenses: number
  profit: number
  cashFlow: number
  growth: number
  employees: number
  customers: number
}

interface ComplianceStatus {
  overall: "compliant" | "warning" | "non_compliant"
  items: ComplianceItem[]
  lastReview: string
  nextReview: string
}

interface ComplianceItem {
  id: string
  requirement: string
  status: "compliant" | "warning" | "non_compliant"
  dueDate: string
  description: string
}

interface BusinessIntegration {
  id: string
  name: string
  type: "accounting" | "crm" | "payment" | "analytics"
  status: "connected" | "disconnected" | "error"
  lastSync: string
}

interface LegalData {
  documents: LegalDocument[]
  compliance: LegalCompliance
  diplomaticStatus: DiplomaticStatus
  jurisdictions: Jurisdiction[]
}

interface LegalDocument {
  id: string
  name: string
  type: "contract" | "agreement" | "policy" | "certificate"
  status: "draft" | "active" | "expired" | "terminated"
  createdAt: string
  expiresAt?: string
}

interface LegalCompliance {
  status: "compliant" | "warning" | "non_compliant"
  requirements: ComplianceRequirement[]
  lastAudit: string
  nextAudit: string
}

interface ComplianceRequirement {
  id: string
  name: string
  description: string
  status: "met" | "pending" | "overdue"
  dueDate: string
  jurisdiction: string
}

interface DiplomaticStatus {
  isAgent: boolean
  agentLevel: "basic" | "advanced" | "diplomatic"
  immunities: string[]
  certifications: Certification[]
}

interface Certification {
  id: string
  name: string
  issuedAt: string
  expiresAt: string
  authority: string
}

interface Jurisdiction {
  id: string
  name: string
  type: "digital" | "physical" | "hybrid"
  status: "active" | "pending" | "inactive"
  benefits: string[]
}

interface SystemNotification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  category: string
  timestamp: string
  read: boolean
  actions?: NotificationAction[]
}

interface NotificationAction {
  label: string
  action: string
  url?: string
}

interface EcosystemContextType {
  // User Management
  userProfile: UserProfile | null
  updateUserProfile: (updates: Partial<UserProfile>) => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void

  // Cross-Platform Data
  crossPlatformData: CrossPlatformData
  updateCrossPlatformData: (updates: Partial<CrossPlatformData>) => void

  // Real-time Synchronization
  syncData: () => Promise<void>
  lastSyncTime: string | null
  isSyncing: boolean

  // Notifications
  notifications: SystemNotification[]
  addNotification: (notification: Omit<SystemNotification, "id" | "timestamp">) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  getUnreadCount: () => number

  // Navigation & State
  currentEnvironment: string
  setCurrentEnvironment: (env: string) => void
  navigationHistory: string[]
  addToHistory: (path: string) => void

  // Analytics & Tracking
  trackEvent: (event: string, properties?: Record<string, any>) => void
  trackPageView: (path: string) => void
  getAnalytics: () => any

  // Feature Flags & Permissions
  hasFeatureAccess: (feature: string) => boolean
  hasPermission: (permission: string) => boolean
  unlockFeature: (feature: string) => void

  // Cross-Environment Communication
  sendMessage: (targetEnv: string, message: any) => void
  subscribeToMessages: (callback: (message: any) => void) => () => void

  // Data Export/Import
  exportUserData: () => Promise<string>
  importUserData: (data: string) => Promise<void>

  // System Health
  systemStatus: "healthy" | "degraded" | "down"
  getSystemHealth: () => Promise<any>
}

const EcosystemContext = createContext<EcosystemContextType | undefined>(undefined)

export function EcosystemProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [crossPlatformData, setCrossPlatformData] = useState<CrossPlatformData>({
    financialGoals: [],
    portfolioData: {
      totalValue: 0,
      dayChange: 0,
      dayChangePercent: 0,
      positions: [],
      performance: [],
      riskScore: 0,
      diversificationScore: 0,
    },
    creditData: {
      score: 0,
      scoreChange: 0,
      factors: [],
      recommendations: [],
      accounts: [],
      inquiries: [],
      utilization: 0,
      paymentHistory: 0,
      accountAge: 0,
      creditMix: 0,
    },
    realEstateData: {
      savedProperties: [],
      viewedProperties: [],
      searchCriteria: {
        location: "",
        priceRange: [0, 1000000],
        bedrooms: 0,
        bathrooms: 0,
        propertyTypes: [],
        features: [],
      },
      loanApplications: [],
      marketInsights: [],
    },
    businessData: {
      companies: [],
      metrics: {
        revenue: 0,
        expenses: 0,
        profit: 0,
        cashFlow: 0,
        growth: 0,
        employees: 0,
        customers: 0,
      },
      compliance: {
        overall: "compliant",
        items: [],
        lastReview: "",
        nextReview: "",
      },
      integrations: [],
    },
    legalData: {
      documents: [],
      compliance: {
        status: "compliant",
        requirements: [],
        lastAudit: "",
        nextAudit: "",
      },
      diplomaticStatus: {
        isAgent: false,
        agentLevel: "basic",
        immunities: [],
        certifications: [],
      },
      jurisdictions: [],
    },
  })

  const [notifications, setNotifications] = useState<SystemNotification[]>([])
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [currentEnvironment, setCurrentEnvironment] = useState("")
  const [navigationHistory, setNavigationHistory] = useState<string[]>([])
  const [systemStatus, setSystemStatus] = useState<"healthy" | "degraded" | "down">("healthy")
  const [messageSubscribers, setMessageSubscribers] = useState<((message: any) => void)[]>([])

  const pathname = usePathname()

  // Initialize user profile
  useEffect(() => {
    const initializeUser = async () => {
      try {
        const savedProfile = localStorage.getItem("snapifi-user-profile")
        if (savedProfile) {
          setUserProfile(JSON.parse(savedProfile))
        } else {
          // Create default profile
          const defaultProfile: UserProfile = {
            id: crypto.randomUUID(),
            name: "User",
            email: "user@snapifi.com",
            tier: "premium",
            joinDate: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            preferences: {
              theme: "dark",
              notifications: {
                email: true,
                push: true,
                sms: false,
                inApp: true,
                frequency: "immediate",
                categories: {
                  financial: true,
                  trading: true,
                  realEstate: true,
                  credit: true,
                  business: true,
                  legal: true,
                  system: true,
                },
              },
              privacy: {
                profileVisibility: "private",
                dataSharing: false,
                analytics: true,
                marketing: false,
              },
              accessibility: {
                fontSize: "medium",
                contrast: "normal",
                motion: "full",
                screenReader: false,
                voiceNavigation: false,
              },
              dashboard: {
                layout: "grid",
                widgets: [],
                pinnedEnvironments: [],
                quickActions: [],
              },
            },
            achievements: [],
            stats: {
              totalLogins: 1,
              platformsUsed: [],
              featuresUnlocked: 0,
              transactionsCompleted: 0,
              creditScoreImprovement: 0,
              investmentReturns: 0,
              realEstateViewed: 0,
              businessMetricsTracked: 0,
            },
          }
          setUserProfile(defaultProfile)
        }
      } catch (error) {
        console.error("Error initializing user profile:", error)
      }
    }

    initializeUser()
  }, [])

  // Track current environment
  useEffect(() => {
    const env = pathname.split("/")[1] || "home"
    setCurrentEnvironment(env)
    addToHistory(pathname)
  }, [pathname])

  // Auto-sync data periodically
  useEffect(() => {
    const syncInterval = setInterval(() => {
      syncData()
    }, 30000) // Sync every 30 seconds

    return () => clearInterval(syncInterval)
  }, [])

  // Save user profile to localStorage
  useEffect(() => {
    if (userProfile) {
      localStorage.setItem("snapifi-user-profile", JSON.stringify(userProfile))
    }
  }, [userProfile])

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile((prev) => (prev ? { ...prev, ...updates } : null))
  }, [])

  const updatePreferences = useCallback((preferences: Partial<UserPreferences>) => {
    setUserProfile((prev) =>
      prev
        ? {
            ...prev,
            preferences: { ...prev.preferences, ...preferences },
          }
        : null,
    )
  }, [])

  const updateCrossPlatformData = useCallback((updates: Partial<CrossPlatformData>) => {
    setCrossPlatformData((prev) => ({ ...prev, ...updates }))
  }, [])

  const syncData = useCallback(async () => {
    setIsSyncing(true)
    try {
      // Simulate API call to sync data
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setLastSyncTime(new Date().toISOString())

      // Add sync notification
      addNotification({
        title: "Data Synchronized",
        message: "Your data has been synchronized across all platforms",
        type: "success",
        category: "system",
        read: false,
      })
    } catch (error) {
      console.error("Sync error:", error)
      addNotification({
        title: "Sync Failed",
        message: "Failed to synchronize data. Please try again.",
        type: "error",
        category: "system",
        read: false,
      })
    } finally {
      setIsSyncing(false)
    }
  }, [])

  const addNotification = useCallback((notification: Omit<SystemNotification, "id" | "timestamp">) => {
    const newNotification: SystemNotification = {
      ...notification,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    }
    setNotifications((prev) => [newNotification, ...prev].slice(0, 50)) // Keep only 50 notifications
  }, [])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const getUnreadCount = useCallback(() => {
    return notifications.filter((n) => !n.read).length
  }, [notifications])

  const addToHistory = useCallback((path: string) => {
    setNavigationHistory((prev) => [path, ...prev.filter((p) => p !== path)].slice(0, 20))
  }, [])

  const trackEvent = useCallback((event: string, properties?: Record<string, any>) => {
    // Analytics tracking
    console.log("Event tracked:", event, properties)

    // Update user stats
    setUserProfile((prev) => {
      if (!prev) return null

      const updatedStats = { ...prev.stats }

      if (event === "page_view") {
        updatedStats.totalLogins += 1
      } else if (event === "feature_used") {
        updatedStats.featuresUnlocked += 1
      } else if (event === "transaction_completed") {
        updatedStats.transactionsCompleted += 1
      }

      return { ...prev, stats: updatedStats }
    })
  }, [])

  const trackPageView = useCallback(
    (path: string) => {
      trackEvent("page_view", { path })
    },
    [trackEvent],
  )

  const getAnalytics = useCallback(() => {
    return {
      userProfile,
      crossPlatformData,
      navigationHistory,
      systemStatus,
    }
  }, [userProfile, crossPlatformData, navigationHistory, systemStatus])

  const hasFeatureAccess = useCallback(
    (feature: string) => {
      if (!userProfile) return false

      // Premium users have access to all features
      if (userProfile.tier === "premium" || userProfile.tier === "enterprise") {
        return true
      }

      // Basic tier restrictions
      const basicFeatures = ["basic_dashboard", "credit_monitoring", "basic_trading", "property_search"]

      return basicFeatures.includes(feature)
    },
    [userProfile],
  )

  const hasPermission = useCallback(
    (permission: string) => {
      if (!userProfile) return false

      // Enterprise users have all permissions
      if (userProfile.tier === "enterprise") {
        return true
      }

      // Premium users have most permissions
      if (userProfile.tier === "premium") {
        const restrictedPermissions = ["admin_access", "system_config"]
        return !restrictedPermissions.includes(permission)
      }

      // Basic users have limited permissions
      const basicPermissions = ["view_dashboard", "basic_trading", "property_search"]
      return basicPermissions.includes(permission)
    },
    [userProfile],
  )

  const unlockFeature = useCallback(
    (feature: string) => {
      addNotification({
        title: "Feature Unlocked",
        message: `You now have access to ${feature}`,
        type: "success",
        category: "system",
        read: false,
      })

      trackEvent("feature_unlocked", { feature })
    },
    [addNotification, trackEvent],
  )

  const sendMessage = useCallback(
    (targetEnv: string, message: any) => {
      // Broadcast message to subscribers
      messageSubscribers.forEach((callback) => {
        callback({ targetEnv, message, timestamp: new Date().toISOString() })
      })
    },
    [messageSubscribers],
  )

  const subscribeToMessages = useCallback((callback: (message: any) => void) => {
    setMessageSubscribers((prev) => [...prev, callback])

    // Return unsubscribe function
    return () => {
      setMessageSubscribers((prev) => prev.filter((cb) => cb !== callback))
    }
  }, [])

  const exportUserData = useCallback(async () => {
    const exportData = {
      userProfile,
      crossPlatformData,
      notifications,
      navigationHistory,
      exportedAt: new Date().toISOString(),
    }

    return JSON.stringify(exportData, null, 2)
  }, [userProfile, crossPlatformData, notifications, navigationHistory])

  const importUserData = useCallback(
    async (data: string) => {
      try {
        const importedData = JSON.parse(data)

        if (importedData.userProfile) {
          setUserProfile(importedData.userProfile)
        }

        if (importedData.crossPlatformData) {
          setCrossPlatformData(importedData.crossPlatformData)
        }

        addNotification({
          title: "Data Imported",
          message: "Your data has been successfully imported",
          type: "success",
          category: "system",
          read: false,
        })
      } catch (error) {
        addNotification({
          title: "Import Failed",
          message: "Failed to import data. Please check the format.",
          type: "error",
          category: "system",
          read: false,
        })
      }
    },
    [addNotification],
  )

  const getSystemHealth = useCallback(async () => {
    // Simulate system health check
    const health = {
      status: systemStatus,
      uptime: "99.9%",
      responseTime: "120ms",
      activeUsers: 15420,
      systemLoad: 0.65,
      lastCheck: new Date().toISOString(),
    }

    return health
  }, [systemStatus])

  const value: EcosystemContextType = {
    userProfile,
    updateUserProfile,
    updatePreferences,
    crossPlatformData,
    updateCrossPlatformData,
    syncData,
    lastSyncTime,
    isSyncing,
    notifications,
    addNotification,
    markNotificationRead,
    clearNotifications,
    getUnreadCount,
    currentEnvironment,
    setCurrentEnvironment,
    navigationHistory,
    addToHistory,
    trackEvent,
    trackPageView,
    getAnalytics,
    hasFeatureAccess,
    hasPermission,
    unlockFeature,
    sendMessage,
    subscribeToMessages,
    exportUserData,
    importUserData,
    systemStatus,
    getSystemHealth,
  }

  return <EcosystemContext.Provider value={value}>{children}</EcosystemContext.Provider>
}

export function useEcosystem() {
  const context = useContext(EcosystemContext)
  if (context === undefined) {
    throw new Error("useEcosystem must be used within an EcosystemProvider")
  }
  return context
}
