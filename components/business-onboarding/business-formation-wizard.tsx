"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Shield,
  CreditCard,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Zap,
  Globe,
  Users,
  TrendingUp,
} from "lucide-react"
import { useRouter } from "next/navigation"

const FORMATION_PACKAGES = [
  {
    id: "starter",
    name: "Starter Package",
    price: 299,
    originalPrice: 399,
    description: "Perfect for new entrepreneurs getting started",
    timeframe: "5-7 business days",
    popular: false,
    features: [
      "LLC or Corporation Formation",
      "State Filing Fees Included",
      "Articles of Organization/Incorporation",
      "Operating Agreement Template",
      "EIN Number Application",
      "Email Support",
    ],
    addOns: [
      { name: "Registered Agent (1 Year)", price: 99 },
      { name: "Business License Research", price: 149 },
    ],
  },
  {
    id: "professional",
    name: "Professional Package",
    price: 499,
    originalPrice: 699,
    description: "Most popular choice for serious business owners",
    timeframe: "3-5 business days",
    popular: true,
    features: [
      "Everything in Starter Package",
      "Registered Agent Service (1 Year)",
      "EIN Number Obtained",
      "Business License Research",
      "Banking Resolution",
      "Priority Processing",
      "Phone & Email Support",
      "Compliance Calendar",
    ],
    addOns: [
      { name: "Business Bank Account Setup", price: 0 },
      { name: "Business Insurance Quote", price: 0 },
    ],
  },
  {
    id: "premium",
    name: "Premium Package",
    price: 799,
    originalPrice: 1199,
    description: "Complete business setup with ongoing support",
    timeframe: "1-3 business days",
    popular: false,
    features: [
      "Everything in Professional Package",
      "Rush Processing",
      "Business Bank Account Assistance",
      "Business Insurance Consultation",
      "Professional Website Setup",
      "Logo Design",
      "Business Plan Template",
      "1-Year Compliance Support",
      "Dedicated Account Manager",
    ],
    addOns: [
      { name: "Trademark Search & Filing", price: 299 },
      { name: "Custom Business Plan", price: 499 },
    ],
  },
]

const BUSINESS_BENEFITS = [
  {
    icon: Shield,
    title: "Asset Protection",
    description: "Protect your personal assets from business liabilities",
  },
  {
    icon: CreditCard,
    title: "Tax Benefits",
    description: "Access business tax deductions and write-offs",
  },
  {
    icon: TrendingUp,
    title: "Build Credit",
    description: "Establish business credit separate from personal credit",
  },
  {
    icon: Users,
    title: "Credibility",
    description: "Gain credibility with customers, vendors, and partners",
  },
  {
    icon: Globe,
    title: "Expand Opportunities",
    description: "Access business banking, loans, and investment opportunities",
  },
  {
    icon: FileText,
    title: "Legal Compliance",
    description: "Ensure proper legal structure and regulatory compliance",
  },
]

export function BusinessFormationWizard() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const router = useRouter()

  const handleGetStarted = (packageId: string) => {
    setSelectedPackage(packageId)
    // Store selected package in localStorage or context
    localStorage.setItem("selected-business-package", packageId)
    router.push("/business-onboarding")
  }

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Start Your Business Today
          </h1>
          <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Form your LLC or Corporation in minutes with our streamlined process. Get everything you need to launch your
            business successfully.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span>50-State Filing</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span>100% Satisfaction Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span>Expert Support</span>
          </div>
        </motion.div>
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Why Form a Business?</h2>
          <p className="text-muted-foreground">
            Incorporating your business provides numerous benefits that can help you succeed
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BUSINESS_BENEFITS.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <Card className="bg-white/5 border-white/10 hover:border-white/20 transition-colors h-full">
                <CardContent className="p-6 text-center">
                  <div className="p-3 rounded-full bg-green-500/20 inline-block mb-4">
                    <benefit.icon className="h-6 w-6 text-green-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Packages Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="space-y-8"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Choose Your Formation Package</h2>
          <p className="text-muted-foreground">Select the package that best fits your business needs and budget</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FORMATION_PACKAGES.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="relative"
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-1">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <Card
                className={`h-full transition-all duration-300 ${
                  pkg.popular
                    ? "border-yellow-500/50 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 scale-105"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.description}</CardDescription>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-3xl font-bold text-green-400">${pkg.price}</span>
                      <span className="text-lg text-muted-foreground line-through">${pkg.originalPrice}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{pkg.timeframe}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Included Features:</h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {pkg.addOns.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-medium">Available Add-ons:</h4>
                      <ul className="space-y-2">
                        {pkg.addOns.map((addOn, idx) => (
                          <li key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{addOn.name}</span>
                            <span className="font-medium">{addOn.price === 0 ? "Free" : `+$${addOn.price}`}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    onClick={() => handleGetStarted(pkg.id)}
                    className={`w-full ${
                      pkg.popular
                        ? "bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                        : "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-white/5 border border-white/10 rounded-lg p-8"
      >
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold">Trusted by 50,000+ Businesses</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">50,000+</div>
              <div className="text-sm text-muted-foreground">Businesses Formed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">4.9/5</div>
              <div className="text-sm text-muted-foreground">Customer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-muted-foreground">Expert Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400">100%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Guarantee</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0 }}
        className="text-center space-y-6"
      >
        <h3 className="text-3xl font-bold">Ready to Start Your Business?</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of entrepreneurs who have successfully launched their businesses with our expert guidance. Get
          started today and take the first step toward your entrepreneurial dreams.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => handleGetStarted("professional")}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Zap className="h-5 w-5 mr-2" />
            Start Your Business Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => router.push("/business-suite")}
            className="border-white/20 hover:bg-white/10"
          >
            Learn More
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
