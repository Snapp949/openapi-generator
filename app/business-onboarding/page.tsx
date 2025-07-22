"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Building,
  FileText,
  Shield,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Star,
  DollarSign,
  Clock,
  AlertCircle,
  Info,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEcosystem } from "@/contexts/ecosystem-context"

interface BusinessFormData {
  businessInfo: {
    name: string
    description: string
    industry: string
    businessType: "llc" | "corporation" | "partnership" | "sole_proprietorship"
    state: string
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
  }
  ownerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    ssn: string
    dateOfBirth: string
    address: {
      street: string
      city: string
      state: string
      zipCode: string
      country: string
    }
  }
  services: {
    registeredAgent: boolean
    einNumber: boolean
    businessLicense: boolean
    bankAccount: boolean
    businessInsurance: boolean
    website: boolean
    logo: boolean
    businessPlan: boolean
  }
  timeline: "immediate" | "1_week" | "2_weeks" | "1_month"
  budget: string
}

const BUSINESS_TYPES = [
  {
    id: "llc",
    name: "Limited Liability Company (LLC)",
    description: "Popular choice for small businesses. Protects personal assets.",
    pros: ["Personal asset protection", "Tax flexibility", "Simple management"],
    cons: ["Self-employment taxes", "Limited life in some states"],
    cost: "$299",
    timeframe: "5-7 business days",
  },
  {
    id: "corporation",
    name: "Corporation (C-Corp)",
    description: "Best for businesses seeking investment or going public.",
    pros: ["Strong asset protection", "Easy to raise capital", "Perpetual existence"],
    cons: ["Double taxation", "More paperwork", "Strict formalities"],
    cost: "$399",
    timeframe: "7-10 business days",
  },
  {
    id: "partnership",
    name: "Partnership",
    description: "For businesses with multiple owners sharing profits and losses.",
    pros: ["Simple formation", "Pass-through taxation", "Shared responsibilities"],
    cons: ["Personal liability", "Potential conflicts", "Limited life"],
    cost: "$199",
    timeframe: "3-5 business days",
  },
  {
    id: "sole_proprietorship",
    name: "Sole Proprietorship",
    description: "Simplest form for individual business owners.",
    pros: ["Easy to start", "Complete control", "Simple taxes"],
    cons: ["Personal liability", "Hard to raise capital", "Limited growth"],
    cost: "$99",
    timeframe: "1-2 business days",
  },
]

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Real Estate",
  "Retail",
  "Food & Beverage",
  "Professional Services",
  "Manufacturing",
  "Construction",
  "Transportation",
  "Education",
  "Entertainment",
  "Non-Profit",
  "Other",
]

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

export default function BusinessOnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<BusinessFormData>({
    businessInfo: {
      name: "",
      description: "",
      industry: "",
      businessType: "llc",
      state: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
      },
    },
    ownerInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      ssn: "",
      dateOfBirth: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
      },
    },
    services: {
      registeredAgent: true,
      einNumber: true,
      businessLicense: false,
      bankAccount: false,
      businessInsurance: false,
      website: false,
      logo: false,
      businessPlan: false,
    },
    timeline: "immediate",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const { addNotification, trackEvent } = useEcosystem()
  const router = useRouter()

  const steps = [
    { id: "business-type", title: "Choose Business Type", icon: Building },
    { id: "business-info", title: "Business Information", icon: FileText },
    { id: "owner-info", title: "Owner Information", icon: Users },
    { id: "services", title: "Additional Services", icon: Shield },
    { id: "review", title: "Review & Submit", icon: CheckCircle },
  ]

  const progress = ((currentStep + 1) / steps.length) * 100

  const updateFormData = (section: keyof BusinessFormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }))
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 0:
        return formData.businessInfo.businessType
      case 1:
        return formData.businessInfo.name && formData.businessInfo.industry && formData.businessInfo.state
      case 2:
        return (
          formData.ownerInfo.firstName &&
          formData.ownerInfo.lastName &&
          formData.ownerInfo.email &&
          formData.ownerInfo.phone
        )
      case 3:
        return true
      case 4:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceedToNext()) {
      setCompletedSteps((prev) => [...prev.filter((step) => step !== currentStep), currentStep])
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Track the business registration
      trackEvent("business_registration_submitted", {
        business_type: formData.businessInfo.businessType,
        industry: formData.businessInfo.industry,
        state: formData.businessInfo.state,
        services_selected: Object.keys(formData.services).filter(
          (key) => formData.services[key as keyof typeof formData.services],
        ),
        timeline: formData.timeline,
      })

      addNotification({
        title: "Business Registration Submitted! 🎉",
        message: `Your ${formData.businessInfo.name} registration is being processed. You'll receive updates via email.`,
        type: "success",
        category: "business",
        read: false,
        actions: [
          {
            label: "View Status",
            action: "view_status",
            url: "/business-suite/registration-status",
          },
        ],
      })

      // Redirect to business suite
      setTimeout(() => {
        router.push("/business-suite")
      }, 2000)
    } catch (error) {
      console.error("Error submitting business registration:", error)
      addNotification({
        title: "Registration Error",
        message: "There was an error submitting your business registration. Please try again.",
        type: "error",
        category: "business",
        read: false,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const calculateTotalCost = () => {
    const selectedBusinessType = BUSINESS_TYPES.find((type) => type.id === formData.businessInfo.businessType)
    let total = selectedBusinessType ? Number.parseInt(selectedBusinessType.cost.replace("$", "")) : 0

    // Add service costs
    if (formData.services.registeredAgent) total += 99
    if (formData.services.einNumber) total += 49
    if (formData.services.businessLicense) total += 199
    if (formData.services.bankAccount) total += 0 // Free
    if (formData.services.businessInsurance) total += 299
    if (formData.services.website) total += 499
    if (formData.services.logo) total += 199
    if (formData.services.businessPlan) total += 399

    return total
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
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
                Start Your Business Today
              </h1>
              <p className="text-muted-foreground">Complete business formation and registration in minutes</p>
            </div>
          </div>

          {/* Progress */}
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                Step {currentStep + 1} of {steps.length}
              </span>
              <span>{steps[currentStep].title}</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  index === currentStep
                    ? "bg-green-500/20 text-green-400"
                    : completedSteps.includes(index)
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-gray-600/20 text-gray-400"
                }`}
              >
                <step.icon className="h-4 w-4" />
                <span className="text-sm font-medium hidden md:block">{step.title}</span>
                {completedSteps.includes(index) && <CheckCircle className="h-4 w-4" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-black/20 border-white/10">
              <CardContent className="p-8">
                {currentStep === 0 && <BusinessTypeStep formData={formData} updateFormData={updateFormData} />}
                {currentStep === 1 && <BusinessInfoStep formData={formData} updateFormData={updateFormData} />}
                {currentStep === 2 && <OwnerInfoStep formData={formData} updateFormData={updateFormData} />}
                {currentStep === 3 && <ServicesStep formData={formData} updateFormData={updateFormData} />}
                {currentStep === 4 && (
                  <ReviewStep formData={formData} totalCost={calculateTotalCost()} onSubmit={handleSubmit} />
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="bg-white/10 border-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">${calculateTotalCost()}</div>
            <div className="text-sm text-muted-foreground">Total Cost</div>
          </div>

          <Button
            onClick={currentStep === steps.length - 1 ? handleSubmit : handleNext}
            disabled={!canProceedToNext() || isSubmitting}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="h-4 w-4 mr-2"
                >
                  <Sparkles className="h-4 w-4" />
                </motion.div>
                Processing...
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                Register Business
                <CheckCircle className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// Step Components
function BusinessTypeStep({ formData, updateFormData }: any) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Choose Your Business Structure</h2>
        <p className="text-muted-foreground">Select the business type that best fits your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BUSINESS_TYPES.map((type) => {
          const isSelected = formData.businessInfo.businessType === type.id
          return (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-6 rounded-lg border-2 cursor-pointer transition-all
                ${
                  isSelected
                    ? "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/20"
                    : "border-white/20 bg-white/5 hover:border-white/40"
                }
              `}
              onClick={() => updateFormData("businessInfo", { businessType: type.id })}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{type.name}</h3>
                  {isSelected && <CheckCircle className="h-5 w-5 text-green-400" />}
                </div>

                <p className="text-sm text-muted-foreground">{type.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 rounded-lg bg-green-500/10">
                    <DollarSign className="h-5 w-5 mx-auto mb-1 text-green-400" />
                    <div className="text-sm font-medium">{type.cost}</div>
                    <div className="text-xs text-muted-foreground">Formation Cost</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-blue-500/10">
                    <Clock className="h-5 w-5 mx-auto mb-1 text-blue-400" />
                    <div className="text-sm font-medium">{type.timeframe}</div>
                    <div className="text-xs text-muted-foreground">Processing Time</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <h4 className="text-sm font-medium text-green-400 mb-1">Pros:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {type.pros.map((pro, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <CheckCircle className="h-2 w-2 text-green-400" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-400 mb-1">Cons:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {type.cons.map((con, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <AlertCircle className="h-2 w-2 text-orange-400" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-400 mb-1">Need Help Choosing?</h4>
            <p className="text-sm text-muted-foreground">
              Most small businesses choose LLC for its simplicity and protection. Corporations are better for businesses
              seeking investment or planning to go public.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BusinessInfoStep({ formData, updateFormData }: any) {
  const handleBusinessInfoChange = (field: string, value: string) => {
    updateFormData("businessInfo", { [field]: value })
  }

  const handleAddressChange = (field: string, value: string) => {
    updateFormData("businessInfo", {
      address: { ...formData.businessInfo.address, [field]: value },
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Business Information</h2>
        <p className="text-muted-foreground">Tell us about your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Name *</Label>
            <Input
              id="business-name"
              value={formData.businessInfo.name}
              onChange={(e) => handleBusinessInfoChange("name", e.target.value)}
              placeholder="Enter your business name"
              className="bg-white/10 border-white/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Select
              value={formData.businessInfo.industry}
              onValueChange={(value) => handleBusinessInfoChange("industry", value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue placeholder="Select your industry" />
              </SelectTrigger>
              <SelectContent>
                {INDUSTRIES.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State of Formation *</Label>
            <Select
              value={formData.businessInfo.state}
              onValueChange={(value) => handleBusinessInfoChange("state", value)}
            >
              <SelectTrigger className="bg-white/10 border-white/20">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {US_STATES.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={formData.businessInfo.description}
              onChange={(e) => handleBusinessInfoChange("description", e.target.value)}
              placeholder="Describe what your business does"
              className="bg-white/10 border-white/20"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Business Address</Label>
            <div className="space-y-2">
              <Input
                value={formData.businessInfo.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                placeholder="Street Address"
                className="bg-white/10 border-white/20"
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={formData.businessInfo.address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="City"
                  className="bg-white/10 border-white/20"
                />
                <Input
                  value={formData.businessInfo.address.zipCode}
                  onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                  placeholder="ZIP Code"
                  className="bg-white/10 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-green-400 mb-1">Name Availability</h4>
            <p className="text-sm text-muted-foreground">
              We'll check name availability in your chosen state and suggest alternatives if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function OwnerInfoStep({ formData, updateFormData }: any) {
  const handleOwnerInfoChange = (field: string, value: string) => {
    updateFormData("ownerInfo", { [field]: value })
  }

  const handleAddressChange = (field: string, value: string) => {
    updateFormData("ownerInfo", {
      address: { ...formData.ownerInfo.address, [field]: value },
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Owner Information</h2>
        <p className="text-muted-foreground">We need your personal information for business registration</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-black/20 border-white/10">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first-name">First Name *</Label>
              <Input
                id="first-name"
                value={formData.ownerInfo.firstName}
                onChange={(e) => handleOwnerInfoChange("firstName", e.target.value)}
                placeholder="Enter your first name"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="last-name">Last Name *</Label>
              <Input
                id="last-name"
                value={formData.ownerInfo.lastName}
                onChange={(e) => handleOwnerInfoChange("lastName", e.target.value)}
                placeholder="Enter your last name"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.ownerInfo.email}
                onChange={(e) => handleOwnerInfoChange("email", e.target.value)}
                placeholder="Enter your email"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.ownerInfo.phone}
                onChange={(e) => handleOwnerInfoChange("phone", e.target.value)}
                placeholder="Enter your phone number"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ssn">Social Security Number</Label>
              <Input
                id="ssn"
                value={formData.ownerInfo.ssn}
                onChange={(e) => handleOwnerInfoChange("ssn", e.target.value)}
                placeholder="XXX-XX-XXXX"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input
                id="dob"
                type="date"
                value={formData.ownerInfo.dateOfBirth}
                onChange={(e) => handleOwnerInfoChange("dateOfBirth", e.target.value)}
                className="bg-white/10 border-white/20"
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="address" className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Personal Address</Label>
              <Input
                value={formData.ownerInfo.address.street}
                onChange={(e) => handleAddressChange("street", e.target.value)}
                placeholder="Street Address"
                className="bg-white/10 border-white/20"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>City</Label>
                <Input
                  value={formData.ownerInfo.address.city}
                  onChange={(e) => handleAddressChange("city", e.target.value)}
                  placeholder="City"
                  className="bg-white/10 border-white/20"
                />
              </div>

              <div className="space-y-2">
                <Label>State</Label>
                <Select
                  value={formData.ownerInfo.address.state}
                  onValueChange={(value) => handleAddressChange("state", value)}
                >
                  <SelectTrigger className="bg-white/10 border-white/20">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>ZIP Code</Label>
                <Input
                  value={formData.ownerInfo.address.zipCode}
                  onChange={(e) => handleAddressChange("zipCode", e.target.value)}
                  placeholder="ZIP Code"
                  className="bg-white/10 border-white/20"
                />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-400 mb-1">Your Information is Secure</h4>
            <p className="text-sm text-muted-foreground">
              All personal information is encrypted and used only for business registration purposes. We never share
              your data with third parties.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServicesStep({ formData, updateFormData }: any) {
  const services = [
    {
      key: "registeredAgent",
      name: "Registered Agent Service",
      description: "Required in most states. We'll serve as your registered agent.",
      cost: 99,
      recommended: true,
      required: true,
    },
    {
      key: "einNumber",
      name: "EIN (Tax ID) Number",
      description: "Federal tax identification number for your business.",
      cost: 49,
      recommended: true,
      required: false,
    },
    {
      key: "businessLicense",
      name: "Business License Research",
      description: "We'll research and help obtain required business licenses.",
      cost: 199,
      recommended: false,
      required: false,
    },
    {
      key: "bankAccount",
      name: "Business Bank Account Setup",
      description: "Help setting up your business banking relationship.",
      cost: 0,
      recommended: true,
      required: false,
    },
    {
      key: "businessInsurance",
      name: "Business Insurance",
      description: "General liability and professional insurance options.",
      cost: 299,
      recommended: false,
      required: false,
    },
    {
      key: "website",
      name: "Professional Website",
      description: "Custom business website with domain and hosting.",
      cost: 499,
      recommended: false,
      required: false,
    },
    {
      key: "logo",
      name: "Logo Design",
      description: "Professional logo design for your business brand.",
      cost: 199,
      recommended: false,
      required: false,
    },
    {
      key: "businessPlan",
      name: "Business Plan",
      description: "Professional business plan for funding and strategy.",
      cost: 399,
      recommended: false,
      required: false,
    },
  ]

  const handleServiceToggle = (serviceKey: string) => {
    const service = services.find((s) => s.key === serviceKey)
    if (service?.required) return // Can't toggle required services

    updateFormData("services", {
      [serviceKey]: !formData.services[serviceKey as keyof typeof formData.services],
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Additional Services</h2>
        <p className="text-muted-foreground">Choose additional services to get your business running faster</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => {
          const isSelected = formData.services[service.key as keyof typeof formData.services]
          return (
            <motion.div
              key={service.key}
              whileHover={{ scale: service.required ? 1 : 1.02 }}
              whileTap={{ scale: service.required ? 1 : 0.98 }}
              className={`
                p-4 rounded-lg border-2 transition-all
                ${service.required ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}
                ${isSelected ? "border-green-500 bg-green-500/20" : "border-white/20 bg-white/5 hover:border-white/40"}
              `}
              onClick={() => !service.required && handleServiceToggle(service.key)}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{service.name}</h3>
                    {service.recommended && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                        <Star className="h-2 w-2 mr-1" />
                        Recommended
                      </Badge>
                    )}
                    {service.required && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Required</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-green-400">
                      {service.cost === 0 ? "Free" : `$${service.cost}`}
                    </span>
                    {isSelected && <CheckCircle className="h-5 w-5 text-green-400" />}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>When do you need your business registered?</Label>
          <Select value={formData.timeline} onValueChange={(value) => updateFormData("", { timeline: value })}>
            <SelectTrigger className="bg-white/10 border-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediately (Rush Processing)</SelectItem>
              <SelectItem value="1_week">Within 1 week</SelectItem>
              <SelectItem value="2_weeks">Within 2 weeks</SelectItem>
              <SelectItem value="1_month">Within 1 month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Budget Range (Optional)</Label>
          <Select value={formData.budget} onValueChange={(value) => updateFormData("", { budget: value })}>
            <SelectTrigger className="bg-white/10 border-white/20">
              <SelectValue placeholder="Select your budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under_500">Under $500</SelectItem>
              <SelectItem value="500_1000">$500 - $1,000</SelectItem>
              <SelectItem value="1000_2500">$1,000 - $2,500</SelectItem>
              <SelectItem value="2500_5000">$2,500 - $5,000</SelectItem>
              <SelectItem value="over_5000">Over $5,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

function ReviewStep({ formData, totalCost, onSubmit }: any) {
  const selectedBusinessType = BUSINESS_TYPES.find((type) => type.id === formData.businessInfo.businessType)

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Review Your Business Registration</h2>
        <p className="text-muted-foreground">Please review all information before submitting</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Business Information */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Business Name</Label>
              <p className="font-medium">{formData.businessInfo.name}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Business Type</Label>
              <p className="font-medium">{selectedBusinessType?.name}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Industry</Label>
              <p className="font-medium">{formData.businessInfo.industry}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">State</Label>
              <p className="font-medium">{formData.businessInfo.state}</p>
            </div>
            {formData.businessInfo.description && (
              <div>
                <Label className="text-xs text-muted-foreground">Description</Label>
                <p className="font-medium text-sm">{formData.businessInfo.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Owner Information */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Owner Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Name</Label>
              <p className="font-medium">
                {formData.ownerInfo.firstName} {formData.ownerInfo.lastName}
              </p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Email</Label>
              <p className="font-medium">{formData.ownerInfo.email}</p>
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Phone</Label>
              <p className="font-medium">{formData.ownerInfo.phone}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Selected Services */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Selected Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>Business Formation ({selectedBusinessType?.name})</span>
              <span className="font-medium">{selectedBusinessType?.cost}</span>
            </div>
            {Object.entries(formData.services).map(([key, selected]) => {
              if (!selected) return null
              const service = [
                { key: "registeredAgent", name: "Registered Agent Service", cost: 99 },
                { key: "einNumber", name: "EIN Number", cost: 49 },
                { key: "businessLicense", name: "Business License Research", cost: 199 },
                { key: "bankAccount", name: "Business Bank Account Setup", cost: 0 },
                { key: "businessInsurance", name: "Business Insurance", cost: 299 },
                { key: "website", name: "Professional Website", cost: 499 },
                { key: "logo", name: "Logo Design", cost: 199 },
                { key: "businessPlan", name: "Business Plan", cost: 399 },
              ].find((s) => s.key === key)

              return (
                <div key={key} className="flex justify-between items-center">
                  <span>{service?.name}</span>
                  <span className="font-medium">{service?.cost === 0 ? "Free" : `$${service?.cost}`}</span>
                </div>
              )
            })}
            <div className="border-t border-white/10 pt-3 flex justify-between items-center text-lg font-bold">
              <span>Total</span>
              <span className="text-green-400">${totalCost}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Timeline & Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Processing Timeline</Label>
            <p className="font-medium">
              {formData.timeline === "immediate"
                ? "Rush processing - 1-2 business days"
                : formData.timeline === "1_week"
                  ? "Standard processing - 5-7 business days"
                  : formData.timeline === "2_weeks"
                    ? "Standard processing - 7-14 business days"
                    : "Standard processing - 2-4 weeks"}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">What happens next:</Label>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                We'll verify your business name availability
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                File formation documents with the state
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                Obtain your EIN number (if selected)
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                Set up registered agent service
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-400" />
                Deliver your business documents and certificates
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-yellow-400">Important Terms</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• State filing fees are included in the formation cost</p>
              <p>• Registered agent service is billed annually after the first year</p>
              <p>• Business name availability is subject to state approval</p>
              <p>• Additional state requirements may apply based on your business type</p>
            </div>
            <div className="flex items-center space-x-2 mt-3">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions and authorize the business formation
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
