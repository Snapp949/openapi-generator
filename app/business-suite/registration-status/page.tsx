"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Building,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Mail,
  Phone,
  Calendar,
  Users,
  Zap,
} from "lucide-react"
import { motion } from "framer-motion"

interface RegistrationStatus {
  id: string
  businessName: string
  businessType: string
  state: string
  status: "submitted" | "processing" | "approved" | "completed" | "requires_action"
  progress: number
  submittedDate: string
  estimatedCompletion: string
  steps: RegistrationStep[]
  documents: Document[]
  nextActions: NextAction[]
}

interface RegistrationStep {
  id: string
  name: string
  description: string
  status: "pending" | "in_progress" | "completed" | "failed"
  completedDate?: string
  estimatedDate?: string
}

interface Document {
  id: string
  name: string
  type: string
  status: "pending" | "ready" | "delivered"
  downloadUrl?: string
}

interface NextAction {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  dueDate?: string
}

export default function RegistrationStatusPage() {
  const [registrationStatus, setRegistrationStatus] = useState<RegistrationStatus | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch registration status
    const fetchStatus = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setRegistrationStatus({
        id: "REG-2024-001",
        businessName: "TechStart Solutions LLC",
        businessType: "Limited Liability Company (LLC)",
        state: "Delaware",
        status: "processing",
        progress: 65,
        submittedDate: "2024-01-15",
        estimatedCompletion: "2024-01-22",
        steps: [
          {
            id: "name_check",
            name: "Business Name Verification",
            description: "Checking name availability in Delaware",
            status: "completed",
            completedDate: "2024-01-15",
          },
          {
            id: "documents_prep",
            name: "Document Preparation",
            description: "Preparing Articles of Organization",
            status: "completed",
            completedDate: "2024-01-16",
          },
          {
            id: "state_filing",
            name: "State Filing",
            description: "Filing with Delaware Division of Corporations",
            status: "in_progress",
            estimatedDate: "2024-01-18",
          },
          {
            id: "ein_application",
            name: "EIN Application",
            description: "Applying for Federal Tax ID Number",
            status: "pending",
            estimatedDate: "2024-01-19",
          },
          {
            id: "registered_agent",
            name: "Registered Agent Setup",
            description: "Setting up registered agent service",
            status: "pending",
            estimatedDate: "2024-01-20",
          },
          {
            id: "completion",
            name: "Final Documents",
            description: "Delivering all business documents",
            status: "pending",
            estimatedDate: "2024-01-22",
          },
        ],
        documents: [
          {
            id: "articles",
            name: "Articles of Organization",
            type: "Formation Document",
            status: "ready",
            downloadUrl: "/documents/articles-of-organization.pdf",
          },
          {
            id: "operating_agreement",
            name: "Operating Agreement",
            type: "Governance Document",
            status: "ready",
            downloadUrl: "/documents/operating-agreement.pdf",
          },
          {
            id: "ein_letter",
            name: "EIN Confirmation Letter",
            type: "Tax Document",
            status: "pending",
          },
          {
            id: "certificate",
            name: "Certificate of Formation",
            type: "Official Certificate",
            status: "pending",
          },
        ],
        nextActions: [
          {
            id: "bank_account",
            title: "Open Business Bank Account",
            description: "Use your EIN and formation documents to open a business bank account",
            priority: "high",
            dueDate: "2024-01-25",
          },
          {
            id: "business_license",
            title: "Apply for Business Licenses",
            description: "Research and apply for any required business licenses in your industry",
            priority: "medium",
            dueDate: "2024-02-01",
          },
          {
            id: "insurance",
            title: "Get Business Insurance",
            description: "Protect your business with appropriate insurance coverage",
            priority: "medium",
            dueDate: "2024-02-15",
          },
        ],
      })
      setLoading(false)
    }

    fetchStatus()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 inline-block"
          >
            <Building className="h-8 w-8 text-white" />
          </motion.div>
          <p className="text-muted-foreground">Loading registration status...</p>
        </div>
      </div>
    )
  }

  if (!registrationStatus) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="bg-black/20 border-white/10 max-w-md">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-red-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Registration Not Found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find your business registration. Please check your registration ID or contact support.
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400"
      case "in_progress":
        return "text-blue-400"
      case "processing":
        return "text-yellow-400"
      case "failed":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return <Badge className="bg-blue-500/20 text-blue-400">Submitted</Badge>
      case "processing":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Processing</Badge>
      case "approved":
        return <Badge className="bg-green-500/20 text-green-400">Approved</Badge>
      case "completed":
        return <Badge className="bg-emerald-500/20 text-emerald-400">Completed</Badge>
      case "requires_action":
        return <Badge className="bg-red-500/20 text-red-400">Action Required</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600"
            >
              <Building className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Registration Status
              </h1>
              <p className="text-muted-foreground">Track your business formation progress</p>
            </div>
          </div>
        </div>

        {/* Status Overview */}
        <Card className="bg-black/20 border-white/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{registrationStatus.businessName}</CardTitle>
                <CardDescription className="text-lg">
                  {registrationStatus.businessType} • {registrationStatus.state}
                </CardDescription>
              </div>
              {getStatusBadge(registrationStatus.status)}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 rounded-lg bg-white/5">
                <FileText className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                <div className="text-sm font-medium">Registration ID</div>
                <div className="text-xs text-muted-foreground">{registrationStatus.id}</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-green-400" />
                <div className="text-sm font-medium">Submitted</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(registrationStatus.submittedDate).toLocaleDateString()}
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5">
                <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-sm font-medium">Est. Completion</div>
                <div className="text-xs text-muted-foreground">
                  {new Date(registrationStatus.estimatedCompletion).toLocaleDateString()}
                </div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white/5">
                <Zap className="h-6 w-6 mx-auto mb-2 text-purple-400" />
                <div className="text-sm font-medium">Progress</div>
                <div className="text-xs text-muted-foreground">{registrationStatus.progress}%</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Overall Progress</span>
                <span>{registrationStatus.progress}%</span>
              </div>
              <Progress value={registrationStatus.progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="progress" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="actions">Next Steps</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Formation Progress</CardTitle>
                <CardDescription>Track each step of your business formation process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {registrationStatus.steps.map((step, index) => (
                    <div key={step.id} className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {step.status === "completed" ? (
                          <div className="p-2 rounded-full bg-green-500/20">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          </div>
                        ) : step.status === "in_progress" ? (
                          <div className="p-2 rounded-full bg-blue-500/20">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Clock className="h-5 w-5 text-blue-400" />
                            </motion.div>
                          </div>
                        ) : step.status === "failed" ? (
                          <div className="p-2 rounded-full bg-red-500/20">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                          </div>
                        ) : (
                          <div className="p-2 rounded-full bg-gray-500/20">
                            <Clock className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{step.name}</h4>
                          <Badge variant="outline" className={`text-xs ${getStatusColor(step.status)} border-current`}>
                            {step.status.replace("_", " ").toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                        <div className="text-xs text-muted-foreground">
                          {step.completedDate
                            ? `Completed: ${new Date(step.completedDate).toLocaleDateString()}`
                            : step.estimatedDate
                              ? `Estimated: ${new Date(step.estimatedDate).toLocaleDateString()}`
                              : "Pending"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Business Documents</CardTitle>
                <CardDescription>Download your business formation documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {registrationStatus.documents.map((document) => (
                    <div
                      key={document.id}
                      className="p-4 rounded-lg border border-white/10 bg-white/5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/20">
                          <FileText className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">{document.name}</h4>
                          <p className="text-sm text-muted-foreground">{document.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            document.status === "ready"
                              ? "text-green-400 border-green-400"
                              : document.status === "delivered"
                                ? "text-blue-400 border-blue-400"
                                : "text-gray-400 border-gray-400"
                          }`}
                        >
                          {document.status}
                        </Badge>
                        {document.downloadUrl && (
                          <Button size="sm" variant="outline" className="border-white/20 bg-transparent">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Recommended Next Steps</CardTitle>
                <CardDescription>Complete these actions to fully establish your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registrationStatus.nextActions.map((action) => (
                    <div
                      key={action.id}
                      className="p-4 rounded-lg border border-white/10 bg-white/5 flex items-start justify-between"
                    >
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{action.title}</h4>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              action.priority === "high"
                                ? "text-red-400 border-red-400"
                                : action.priority === "medium"
                                  ? "text-yellow-400 border-yellow-400"
                                  : "text-green-400 border-green-400"
                            }`}
                          >
                            {action.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                        {action.dueDate && (
                          <p className="text-xs text-muted-foreground">
                            Due: {new Date(action.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                        Get Started
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Support
                  </CardTitle>
                  <CardDescription>Get help with your business formation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-green-400" />
                      <span className="font-medium">Phone Support</span>
                    </div>
                    <p className="text-sm text-muted-foreground">1-800-SNAPIFI (24/7)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-blue-400" />
                      <span className="font-medium">Email Support</span>
                    </div>
                    <p className="text-sm text-muted-foreground">business@snapifi.com</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">Contact Support</Button>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Account Manager
                  </CardTitle>
                  <CardDescription>Your dedicated business formation specialist</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium">Sarah Johnson</h4>
                      <p className="text-sm text-muted-foreground">Senior Formation Specialist</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Sarah is handling your business formation and is available to answer any questions.
                    </p>
                  </div>
                  <Button variant="outline" className="w-full border-white/20 bg-transparent">
                    Schedule Call
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
