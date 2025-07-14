"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, Calendar, FileText, Clock, Bell } from "lucide-react"

interface ComplianceItem {
  id: string
  title: string
  description: string
  dueDate: string
  status: "compliant" | "warning" | "overdue" | "upcoming"
  priority: "low" | "medium" | "high" | "critical"
  category: "filing" | "payment" | "reporting" | "documentation"
}

export function ComplianceMonitor() {
  const [complianceItems] = useState<ComplianceItem[]>([
    {
      id: "1",
      title: "2024 Tax Return Filing",
      description: "Annual tax return must be filed by April 15, 2024",
      dueDate: "2024-04-15",
      status: "upcoming",
      priority: "high",
      category: "filing",
    },
    {
      id: "2",
      title: "Quarterly Estimated Tax Payment",
      description: "Q1 2024 estimated tax payment",
      dueDate: "2024-04-15",
      status: "upcoming",
      priority: "medium",
      category: "payment",
    },
    {
      id: "3",
      title: "Payment Plan Installment",
      description: "Monthly payment plan installment",
      dueDate: "2024-03-15",
      status: "compliant",
      priority: "medium",
      category: "payment",
    },
    {
      id: "4",
      title: "Form 1099 Reporting",
      description: "Submit 1099 forms for contractors",
      dueDate: "2024-01-31",
      status: "overdue",
      priority: "critical",
      category: "reporting",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />
      case "overdue":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "upcoming":
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "overdue":
        return "bg-red-500"
      case "upcoming":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const complianceScore = Math.round(
    (complianceItems.filter((item) => item.status === "compliant").length / complianceItems.length) * 100,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Compliance Monitor</h2>
          <p className="text-muted-foreground">Stay on top of your tax obligations and deadlines</p>
        </div>
        <Button>
          <Bell className="w-4 h-4 mr-2" />
          Set Reminders
        </Button>
      </div>

      {/* Compliance Score */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Compliance Score
          </CardTitle>
          <CardDescription>Your overall tax compliance rating</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Overall Compliance</span>
                <span className="text-sm font-medium">{complianceScore}%</span>
              </div>
              <Progress value={complianceScore} className="h-3" />
            </div>
            <div className="text-3xl font-bold text-green-600">{complianceScore}%</div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {complianceItems.filter((item) => item.status === "compliant").length}
              </div>
              <div className="text-sm text-muted-foreground">Compliant</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {complianceItems.filter((item) => item.status === "upcoming").length}
              </div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {complianceItems.filter((item) => item.status === "warning").length}
              </div>
              <div className="text-sm text-muted-foreground">Warning</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {complianceItems.filter((item) => item.status === "overdue").length}
              </div>
              <div className="text-sm text-muted-foreground">Overdue</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      {complianceItems.some((item) => item.status === "overdue" || item.priority === "critical") && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800 dark:text-red-200">Critical Items Require Attention</AlertTitle>
          <AlertDescription className="text-red-700 dark:text-red-300">
            You have {complianceItems.filter((item) => item.status === "overdue").length} overdue items and{" "}
            {complianceItems.filter((item) => item.priority === "critical").length} critical priority items that need
            immediate attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Compliance Items */}
      <div className="space-y-4">
        {complianceItems.map((item) => {
          const daysUntilDue = getDaysUntilDue(item.dueDate)

          return (
            <Card key={item.id} className={`${item.status === "overdue" ? "border-red-200" : ""}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {getStatusIcon(item.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <Badge variant="secondary" className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <Badge variant="outline">{item.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div
                          className={`font-medium ${
                            daysUntilDue < 0 ? "text-red-600" : daysUntilDue <= 7 ? "text-yellow-600" : "text-green-600"
                          }`}
                        >
                          {daysUntilDue < 0
                            ? `${Math.abs(daysUntilDue)} days overdue`
                            : daysUntilDue === 0
                              ? "Due today"
                              : `${daysUntilDue} days remaining`}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    {item.status !== "compliant" && <Button size="sm">Take Action</Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
