"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface CreditCard {
  id: string
  name: string
  last4: string
  brand: "visa" | "mastercard" | "amex" | "discover"
  expiryMonth: number
  expiryYear: number
  creditLimit: number
  currentBalance: number
  availableCredit: number
  interestRate: number
  minPayment: number
  dueDate: string
  isActive: boolean
  rewards: {
    type: "cashback" | "points" | "miles"
    rate: number
    balance: number
  }
}

export interface SupremeCard {
  id: string
  cardNumber: string
  last4: string
  expiryMonth: number
  expiryYear: number
  cvv: string
  totalCreditLimit: number
  totalBalance: number
  availableCredit: number
  effectiveInterestRate: number
  platformSpread: number
  linkedCards: string[]
  isActive: boolean
  monthlySpend: number
  rewardsEarned: number
}

export interface WalletTransaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  cardUsed: string
  merchant: string
  status: "completed" | "pending" | "declined"
  rewards: number
}

interface SnapWalletContextType {
  creditCards: CreditCard[]
  supremeCard: SupremeCard | null
  transactions: WalletTransaction[]
  isLoading: boolean
  error: string | null

  // Card Management
  addCreditCard: (card: Omit<CreditCard, "id">) => Promise<void>
  removeCreditCard: (cardId: string) => Promise<void>
  updateCreditCard: (cardId: string, updates: Partial<CreditCard>) => Promise<void>

  // Supreme Card
  createSupremeCard: (selectedCardIds: string[]) => Promise<void>
  updateSupremeCard: (updates: Partial<SupremeCard>) => Promise<void>
  optimizeInterestRates: () => void

  // Transactions
  processTransaction: (transaction: Omit<WalletTransaction, "id" | "date" | "status">) => Promise<void>
  getTransactionHistory: (days?: number) => WalletTransaction[]

  // Analytics
  getSpendingAnalytics: () => {
    totalSpent: number
    categoryBreakdown: Record<string, number>
    monthlyTrend: number[]
    rewardsEarned: number
    interestSaved: number
  }

  // Platform Revenue
  getPlatformRevenue: () => {
    monthlyRevenue: number
    totalRevenue: number
    averageSpread: number
    activeUsers: number
  }
}

const SnapWalletContext = createContext<SnapWalletContextType | undefined>(undefined)

export const useSnapWallet = () => {
  const context = useContext(SnapWalletContext)
  if (!context) {
    throw new Error("useSnapWallet must be used within a SnapWalletProvider")
  }
  return context
}

// Sample data
const sampleCreditCards: CreditCard[] = [
  {
    id: "card-1",
    name: "Chase Sapphire Preferred",
    last4: "4532",
    brand: "visa",
    expiryMonth: 12,
    expiryYear: 2027,
    creditLimit: 15000,
    currentBalance: 2500,
    availableCredit: 12500,
    interestRate: 18.99,
    minPayment: 125,
    dueDate: "2024-02-15",
    isActive: true,
    rewards: {
      type: "points",
      rate: 2.0,
      balance: 45000,
    },
  },
  {
    id: "card-2",
    name: "Capital One Venture",
    last4: "8765",
    brand: "mastercard",
    expiryMonth: 8,
    expiryYear: 2026,
    creditLimit: 10000,
    currentBalance: 1200,
    availableCredit: 8800,
    interestRate: 22.49,
    minPayment: 60,
    dueDate: "2024-02-20",
    isActive: true,
    rewards: {
      type: "miles",
      rate: 1.5,
      balance: 28000,
    },
  },
  {
    id: "card-3",
    name: "American Express Gold",
    last4: "1234",
    brand: "amex",
    expiryMonth: 6,
    expiryYear: 2028,
    creditLimit: 25000,
    currentBalance: 5600,
    availableCredit: 19400,
    interestRate: 24.99,
    minPayment: 280,
    dueDate: "2024-02-10",
    isActive: true,
    rewards: {
      type: "points",
      rate: 4.0,
      balance: 67000,
    },
  },
]

export const SnapWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [creditCards, setCreditCards] = useState<CreditCard[]>(sampleCreditCards)
  const [supremeCard, setSupremeCard] = useState<SupremeCard | null>(null)
  const [transactions, setTransactions] = useState<WalletTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize Supreme Card if cards exist
  useEffect(() => {
    if (creditCards.length > 0 && !supremeCard) {
      createSupremeCard(creditCards.map((card) => card.id))
    }
  }, [creditCards])

  const addCreditCard = async (card: Omit<CreditCard, "id">) => {
    setIsLoading(true)
    try {
      const newCard: CreditCard = {
        ...card,
        id: `card-${Date.now()}`,
      }
      setCreditCards((prev) => [...prev, newCard])

      // Update Supreme Card if it exists
      if (supremeCard) {
        updateSupremeCardCalculations([...creditCards, newCard])
      }
    } catch (err) {
      setError("Failed to add credit card")
    } finally {
      setIsLoading(false)
    }
  }

  const removeCreditCard = async (cardId: string) => {
    setIsLoading(true)
    try {
      setCreditCards((prev) => prev.filter((card) => card.id !== cardId))

      // Update Supreme Card
      if (supremeCard) {
        const updatedCards = creditCards.filter((card) => card.id !== cardId)
        updateSupremeCardCalculations(updatedCards)
      }
    } catch (err) {
      setError("Failed to remove credit card")
    } finally {
      setIsLoading(false)
    }
  }

  const updateCreditCard = async (cardId: string, updates: Partial<CreditCard>) => {
    setIsLoading(true)
    try {
      setCreditCards((prev) => prev.map((card) => (card.id === cardId ? { ...card, ...updates } : card)))
    } catch (err) {
      setError("Failed to update credit card")
    } finally {
      setIsLoading(false)
    }
  }

  const updateSupremeCardCalculations = (cards: CreditCard[]) => {
    if (!cards.length) return

    const totalCreditLimit = cards.reduce((sum, card) => sum + card.creditLimit, 0)
    const totalBalance = cards.reduce((sum, card) => sum + card.currentBalance, 0)
    const highestInterestRate = Math.max(...cards.map((card) => card.interestRate))

    // Platform takes 2-4% spread on top of highest rate
    const platformSpread = Math.min(4, Math.max(2, highestInterestRate * 0.15))
    const effectiveRate = highestInterestRate + platformSpread

    setSupremeCard((prev) =>
      prev
        ? {
            ...prev,
            totalCreditLimit,
            totalBalance,
            availableCredit: totalCreditLimit - totalBalance,
            effectiveInterestRate: effectiveRate,
            platformSpread,
            linkedCards: cards.map((card) => card.id),
          }
        : null,
    )
  }

  const createSupremeCard = async (selectedCardIds: string[]) => {
    setIsLoading(true)
    try {
      const selectedCards = creditCards.filter((card) => selectedCardIds.includes(card.id))
      const totalCreditLimit = selectedCards.reduce((sum, card) => sum + card.creditLimit, 0)
      const totalBalance = selectedCards.reduce((sum, card) => sum + card.currentBalance, 0)
      const highestInterestRate = Math.max(...selectedCards.map((card) => card.interestRate))

      // Platform spread calculation
      const platformSpread = Math.min(4, Math.max(2, highestInterestRate * 0.15))

      const newSupremeCard: SupremeCard = {
        id: `supreme-${Date.now()}`,
        cardNumber: "5555444433332222",
        last4: "2222",
        expiryMonth: 12,
        expiryYear: 2029,
        cvv: "123",
        totalCreditLimit,
        totalBalance,
        availableCredit: totalCreditLimit - totalBalance,
        effectiveInterestRate: highestInterestRate + platformSpread,
        platformSpread,
        linkedCards: selectedCardIds,
        isActive: true,
        monthlySpend: 0,
        rewardsEarned: 0,
      }

      setSupremeCard(newSupremeCard)
    } catch (err) {
      setError("Failed to create Supreme Card")
    } finally {
      setIsLoading(false)
    }
  }

  const updateSupremeCard = async (updates: Partial<SupremeCard>) => {
    if (!supremeCard) return

    setSupremeCard((prev) => (prev ? { ...prev, ...updates } : null))
  }

  const optimizeInterestRates = () => {
    if (!supremeCard) return

    const linkedCards = creditCards.filter((card) => supremeCard.linkedCards.includes(card.id))
    updateSupremeCardCalculations(linkedCards)
  }

  const processTransaction = async (transaction: Omit<WalletTransaction, "id" | "date" | "status">) => {
    setIsLoading(true)
    try {
      const newTransaction: WalletTransaction = {
        ...transaction,
        id: `txn-${Date.now()}`,
        date: new Date().toISOString(),
        status: "completed",
      }

      setTransactions((prev) => [newTransaction, ...prev])

      // Update Supreme Card balance
      if (supremeCard && transaction.cardUsed === supremeCard.id) {
        setSupremeCard((prev) =>
          prev
            ? {
                ...prev,
                totalBalance: prev.totalBalance + Math.abs(transaction.amount),
                availableCredit: prev.availableCredit - Math.abs(transaction.amount),
                monthlySpend: prev.monthlySpend + Math.abs(transaction.amount),
                rewardsEarned: prev.rewardsEarned + transaction.rewards,
              }
            : null,
        )
      }
    } catch (err) {
      setError("Failed to process transaction")
    } finally {
      setIsLoading(false)
    }
  }

  const getTransactionHistory = (days = 30) => {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)

    return transactions.filter((txn) => new Date(txn.date) >= cutoffDate)
  }

  const getSpendingAnalytics = () => {
    const recentTransactions = getTransactionHistory(30)
    const totalSpent = recentTransactions.reduce((sum, txn) => sum + Math.abs(txn.amount), 0)

    const categoryBreakdown = recentTransactions.reduce(
      (acc, txn) => {
        acc[txn.category] = (acc[txn.category] || 0) + Math.abs(txn.amount)
        return acc
      },
      {} as Record<string, number>,
    )

    const rewardsEarned = recentTransactions.reduce((sum, txn) => sum + txn.rewards, 0)

    // Calculate interest saved by using Supreme Card optimization
    const interestSaved = supremeCard ? (supremeCard.platformSpread * supremeCard.totalBalance) / 100 / 12 : 0

    return {
      totalSpent,
      categoryBreakdown,
      monthlyTrend: [2400, 2600, 2800, 3200, 2900, 3100, totalSpent], // Mock trend data
      rewardsEarned,
      interestSaved,
    }
  }

  const getPlatformRevenue = () => {
    const monthlyRevenue = supremeCard ? ((supremeCard.platformSpread / 100) * supremeCard.totalBalance) / 12 : 0

    return {
      monthlyRevenue,
      totalRevenue: monthlyRevenue * 12, // Simplified calculation
      averageSpread: supremeCard?.platformSpread || 0,
      activeUsers: 1250, // Mock data
    }
  }

  return (
    <SnapWalletContext.Provider
      value={{
        creditCards,
        supremeCard,
        transactions,
        isLoading,
        error,
        addCreditCard,
        removeCreditCard,
        updateCreditCard,
        createSupremeCard,
        updateSupremeCard,
        optimizeInterestRates,
        processTransaction,
        getTransactionHistory,
        getSpendingAnalytics,
        getPlatformRevenue,
      }}
    >
      {children}
    </SnapWalletContext.Provider>
  )
}
