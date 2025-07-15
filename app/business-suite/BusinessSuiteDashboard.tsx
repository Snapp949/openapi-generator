"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import { HolographicHeader } from "@/components/ui/holographic-header"
import { useEcosystem } from "@/contexts/ecosystem-context"

interface BusinessMetric {
  title: string
  value: string
  change: string
  changeType: "positive" | "negative" | "neutral"
  icon: any
}

interface BusinessGoal {
  id: string
  title: string
  description: string
  progress: number
  target: number
  deadline: string
  status: "on-track" | "at-risk" | "completed"
}

interface TeamMember {
  id: string
  name: string
  role: string
  department: string
  performance: number
  avatar: string
}

export default function BusinessSuiteDashboard() {
  const [metrics, setMetrics] = useState<BusinessMetric[]>([])
  const [goals, setGoals] = useState<BusinessGoal[]>([])
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const { trackPageView } = useEcosystem()

  useEffect(() => {
    trackPageView("/business-suite")
    
    // Initialize business metrics
    setMetrics([
      {
        title: "Monthly Revenue",
        value: "$245,670",
        change: "+12.5%",
        changeType: "positive",
        icon: DollarSign,
      },
      {
        title: "Active Clients",
        value: "1,247",
        change: "+8.2%",
        changeType: "positive",
        icon: Users,
      },
      {
        title: "Profit Margin",
        value: "34.2%",
        change: "+2.1%",
        changeType: "positive",
        icon: TrendingUp,
      },
      {
        title: "Team Productivity",
        value: "87%",
        change: "-1.3%",
        changeType: "negative",
        icon: Activity,
      },
    ])

    // Initialize business goals
    setGoals([
      {
        id: "revenue-q4",
        title: "Q4 Revenue Target",
        description: "Achieve $1M in quarterly revenue",
        progress: 750000,
        target: 1000000,
        deadline: "Dec 31, 2024",
        status: "on-track",
      },
      {
        id: "client-acquisition",
        title: "New Client Acquisition",
        description: "Onboard 50 new enterprise clients",
        progress: 32,
        target: 50,
        deadline: "Nov 30, 2024",
        status: "at-risk",
      },
      {
        id: "team-expansion",
        title: "Team Expansion",
        description: "Hire 15 new team members",
        progress: 15,
        target: 15,
        deadline: "Oct 15, 2024",
        status: "completed",
      },
    ])

    // Initialize team members
    setTeamMembers([
      {
        id: "1",
        name: "Sarah Johnson",
        role: "Sales Director",
        department: "Sales",
        performance: 95,
        avatar: "👩‍💼",
      },
      {
        id: "2",
        name: "Mike Chen",
        role: "Lead Developer",
        department: "Engineering",
        performance: 88,
        avatar: "👨‍💻",
      },
      {
        id: "3",
        name: "Emily Rodriguez",
        role: "Marketing Manager",
        department: "Marketing",
        performance: 92,
        avatar: "👩‍🎨",
      },
      {
        id: "4",
        name: "David Kim",
        role: "Operations Manager",
        department: "Operations",
        performance: 85,
        avatar: "👨‍💼",
      },
    ])
  }, [trackPageView])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30"
      case "on-track": return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "at-risk": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <HolographicHeader
          title="Business Suite"
          subtitle="Comprehensive business management and analytics"
          gradient="from-blue-400 to-purple-400"
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-black/20 border-white/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {metric.changeType === "positive" ? (
                    <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 text-red-400 mr-1" />
                  )}
                  <span className={metric.changeType === "positive" ? "text-green-400\
