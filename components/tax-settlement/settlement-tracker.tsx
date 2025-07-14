"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, DollarSign, Calendar, Phone, Download } from "lucide-react"

interface Settlement {
  id: string
  type: "offer-compromise" | "payment-plan" | "penalty-abatement"
  status: "pending" | "under-review" | "approved" | "rejected" | "completed"
  amount: number
  originalAmount: number
  submittedDate: string
  expectedResolution: string
  progress: number
  nextAction: string
}

export function SettlementTracker() {
  const [settlements] = useState<Settlement[]>([
    {
      id: "OIC-2024-001",
      type: "offer-compromise",
      status: "under-review",
      amount: 15000,
      originalAmount: 45750,
      submittedDate: "2024-01-15",
      expectedResolution: "2024-04-15",
      progress: 65,
      nextAction: "Awaiting IRS response",
    },
    {
      id: "PP-2024-002",
      type: "payment-plan",
      status: "approved",
      amount: 850,
      originalAmount: 12300,
      submittedDate: "2024-02-01",
      expectedResolution: "2024-02-15",
      progress: 100,
      nextAction: "Make monthly payment",
    },
    {
      id: "PA-2024-003",
      type: "penalty-abatement",
      status: "pending",
      amount: 2500,
      originalAmount: 5420,
      submittedDate: "2024-03-01",
      expectedResolution: "2024-05-01",
      progress: 25,
      nextAction: "Submit additional documentation",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "completed":
        return "bg-blue-500"
      case "under-review":
        return "bg-yellow-500"
      case "pending":
        return "bg-orange-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "approved":
        return "Approved"
      case "completed":
        return "Completed"
      case "under-review":
        return "Under Review"
      case "pending":
        return "Pending"
      case "rejected":
        return "Rejected"
      default:
        return "Unknown"
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case "offer-compromise":
        return "Offer in Compromise"
      case "payment-plan":
        return "Payment Plan"
      case "penalty-abatement":
        return "Penalty Abatement"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Settlement Tracker</h2>
          <p className="text-muted-foreground">Monitor your active tax settlements and applications</p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          New Settlement
        </Button>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Settlements</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {settlements
            .filter((s) => s.status !== "completed")
            .map((settlement) => (
              <Card key={settlement.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getTypeText(settlement.type)}
                        <Badge variant="secondary" className={`${getStatusColor(settlement.status)} text-white`}>
                          {getStatusText(settlement.status)}
                        </Badge>
                      </CardTitle>
                      <CardDescription>Case ID: {settlement.id}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">${settlement.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">
                        Original: ${settlement.originalAmount.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{settlement.progress}%</span>
                    </div>
                    <Progress value={settlement.progress} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Submitted:</span>
                      <div className="font-medium">{new Date(settlement.submittedDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected Resolution:</span>
                      <div className="font-medium">{new Date(settlement.expectedResolution).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next Action:</span>
                      <div className="font-medium">{settlement.nextAction}</div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Forms
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Contact Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Settlements</CardTitle>
              <CardDescription>Your settlement history and resolved cases</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">No completed settlements yet.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Offer in Compromise
                </CardTitle>
                <CardDescription>Settle your tax debt for less than the full amount owed</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Start Application</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Payment Plan
                </CardTitle>
                <CardDescription>Set up monthly payments to resolve your tax debt over time</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Setup Plan</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Penalty Abatement
                </CardTitle>
                <CardDescription>Request removal of penalties for reasonable cause</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Request Abatement</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
