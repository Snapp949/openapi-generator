"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Calculator,
  FileText,
  DollarSign,
  AlertTriangle,
  Clock,
  TrendingUp,
  Shield,
  Phone,
  Calendar,
  Download,
  CreditCard,
  PieChart,
} from "lucide-react"
import { TaxCalculator } from "@/components/tax-settlement/tax-calculator"
import { SettlementTracker } from "@/components/tax-settlement/settlement-tracker"
import { TaxDocumentManager } from "@/components/tax-settlement/tax-document-manager"
import { ComplianceMonitor } from "@/components/tax-settlement/compliance-monitor"
import { PaymentPlanManager } from "@/components/tax-settlement/payment-plan-manager"

interface TaxProfile {
  totalOwed: number
  penaltiesAndInterest: number
  settledAmount: number
  paymentPlanActive: boolean
  complianceStatus: "compliant" | "warning" | "critical"
  lastFilingDate: string
  nextDueDate: string
  activeSettlements: number
}

export function TaxSettlementDashboard() {
  const [taxProfile, setTaxProfile] = useState<TaxProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setTaxProfile({
        totalOwed: 45750.0,
        penaltiesAndInterest: 8920.0,
        settledAmount: 12300.0,
        paymentPlanActive: true,
        complianceStatus: "warning",
        lastFilingDate: "2023-04-15",
        nextDueDate: "2024-04-15",
        activeSettlements: 2,
      })
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading tax profile...</div>
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "compliant":
        return "Compliant"
      case "warning":
        return "Needs Attention"
      case "critical":
        return "Critical"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Tax Settlement Suite
          </h1>
          <p className="text-muted-foreground mt-2">Comprehensive tax resolution and compliance management</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Phone className="w-4 h-4 mr-2" />
            Contact Expert
          </Button>
          <Button size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Consultation
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      {taxProfile?.complianceStatus === "warning" && (
        <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800 dark:text-yellow-200">Action Required</AlertTitle>
          <AlertDescription className="text-yellow-700 dark:text-yellow-300">
            You have pending tax obligations that require immediate attention. Consider setting up a payment plan or
            exploring settlement options.
          </AlertDescription>
        </Alert>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Tax Owed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${taxProfile?.totalOwed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Including penalties & interest</p>
          </CardContent>
          <div className="absolute top-0 right-0 p-3">
            <DollarSign className="w-8 h-8 text-red-200" />
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Settlement Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${taxProfile?.settledAmount.toLocaleString()}</div>
            <Progress value={27} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">27% of total debt resolved</p>
          </CardContent>
          <div className="absolute top-0 right-0 p-3">
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(taxProfile?.complianceStatus || "")}`} />
              <span className="font-semibold">{getStatusText(taxProfile?.complianceStatus || "")}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Next due: {new Date(taxProfile?.nextDueDate || "").toLocaleDateString()}
            </p>
          </CardContent>
          <div className="absolute top-0 right-0 p-3">
            <Shield className="w-8 h-8 text-blue-200" />
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taxProfile?.activeSettlements}</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">
                {taxProfile?.paymentPlanActive ? "Payment Plan Active" : "No Payment Plan"}
              </Badge>
            </div>
          </CardContent>
          <div className="absolute top-0 right-0 p-3">
            <FileText className="w-8 h-8 text-purple-200" />
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common tax settlement tasks and tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  File Offer in Compromise
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Set Up Payment Plan
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download Tax Forms
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Request Tax Professional
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates on your tax matters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment Plan Approved</p>
                    <p className="text-xs text-muted-foreground">Monthly payment of $850 approved</p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Document Submitted</p>
                    <p className="text-xs text-muted-foreground">Form 656 Offer in Compromise filed</p>
                    <p className="text-xs text-muted-foreground">1 week ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Penalty Assessment</p>
                    <p className="text-xs text-muted-foreground">Additional penalty of $1,250 assessed</p>
                    <p className="text-xs text-muted-foreground">2 weeks ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tax Breakdown Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Tax Liability Breakdown
              </CardTitle>
              <CardDescription>Detailed breakdown of your tax obligations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Principal Tax</span>
                    <span className="text-sm font-medium">$28,500</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Penalties</span>
                    <span className="text-sm font-medium">$5,420</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Interest</span>
                    <span className="text-sm font-medium">$3,500</span>
                  </div>
                  <Progress value={8} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calculator">
          <TaxCalculator />
        </TabsContent>

        <TabsContent value="settlements">
          <SettlementTracker />
        </TabsContent>

        <TabsContent value="documents">
          <TaxDocumentManager />
        </TabsContent>

        <TabsContent value="compliance">
          <ComplianceMonitor />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentPlanManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Named export for compatibility
