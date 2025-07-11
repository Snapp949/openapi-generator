"use client"
import { motion } from "framer-motion"
import {
  BarChart3,
  TrendingUp,
  Wallet,
  Target,
  ShoppingBag,
  Building2,
  Scale,
  Settings,
  Brain,
  Rocket,
  Globe,
  Shield,
  CreditCard,
  FileText,
  GraduationCap,
  Heart,
  Plane,
  Music,
} from "lucide-react"
import { HolographicHeader } from "@/components/ui/holographic-header"
import { PlatformCard } from "./platform-card"

const platformEnvironments = {
  command: [
    {
      id: "home",
      title: "Command Center",
      description: "Your personal financial command center with AI insights.",
      icon: Brain,
      href: "/dashboard/home",
      variant: "hologram" as const,
      stats: "12 Active Goals",
    },
    {
      id: "analytics",
      title: "Neural Analytics",
      description: "AI-powered insights and predictive modeling.",
      icon: BarChart3,
      href: "/dashboard/analytics",
      variant: "quantum" as const,
      stats: "98.7% Accuracy",
    },
    {
      id: "portfolio",
      title: "Quantum Portfolio",
      description: "Multi-dimensional asset management system.",
      icon: Wallet,
      href: "/dashboard/portfolio",
      variant: "plasma" as const,
      stats: "$2.4M Managed",
    },
    {
      id: "planning",
      title: "Future Planning",
      description: "AI-driven financial planning and goal optimization.",
      icon: Target,
      href: "/dashboard/financial-planning",
      variant: "glass" as const,
      stats: "15 Year Horizon",
    },
  ],
  commerce: [
    {
      id: "ecommerex",
      title: "EcommereX Nexus",
      description: "Holographic marketplace with quantum product visualization.",
      icon: ShoppingBag,
      href: "/dashboard/ecommerex/holographic-products",
      variant: "hologram" as const,
      stats: "1.2K Products",
    },
    {
      id: "marketplace",
      title: "Commerce Hub",
      description: "Advanced marketplace analytics and vendor management.",
      icon: Globe,
      href: "/commerce/marketplace",
      variant: "neon" as const,
      stats: "847 Vendors",
    },
    {
      id: "real-estate",
      title: "Reality Estate",
      description: "50-year loan marketplace with holographic property tours.",
      icon: Building2,
      href: "/real-estate",
      variant: "neural" as const,
      stats: "2.1K Properties",
    },
    {
      id: "snap-dax",
      title: "SNAP-DAX Trading",
      description: "Advanced quantum trading platform with neural networks.",
      icon: TrendingUp,
      href: "/dashboard/snap-dax",
      variant: "neon" as const,
      stats: "+24.7% Today",
    },
  ],
  financial: [
    {
      id: "credit-suite",
      title: "Credit Matrix",
      description: "Advanced credit management and optimization system.",
      icon: CreditCard,
      href: "/credit-suite",
      variant: "quantum" as const,
      stats: "850 Score",
    },
    {
      id: "loan-center",
      title: "Loan Nexus",
      description: "Comprehensive loan management and application center.",
      icon: FileText,
      href: "/citizen/loan-center",
      variant: "glass" as const,
      stats: "15 Loan Types",
    },
    {
      id: "business-suite",
      title: "Business Command",
      description: "Enterprise-grade business management tools.",
      icon: Building2,
      href: "/business-suite",
      variant: "neural" as const,
      stats: "500+ Tools",
    },
    {
      id: "investment-portal",
      title: "Investment Nexus",
      description: "High-yield investment opportunities and portfolio management.",
      icon: TrendingUp,
      href: "/investors/portal",
      variant: "plasma" as const,
      stats: "25% APY",
    },
  ],
  services: [
    {
      id: "travel",
      title: "Travel Hub",
      description: "Global travel booking and management system.",
      icon: Plane,
      href: "/services/travel",
      variant: "hologram" as const,
      stats: "200+ Countries",
    },
    {
      id: "education",
      title: "Learning Center",
      description: "Educational resources and skill development platform.",
      icon: GraduationCap,
      href: "/services/education",
      variant: "quantum" as const,
      stats: "1000+ Courses",
    },
    {
      id: "health",
      title: "Wellness Hub",
      description: "Health and wellness management platform.",
      icon: Heart,
      href: "/services/health",
      variant: "glass" as const,
      stats: "24/7 Support",
    },
    {
      id: "entertainment",
      title: "Entertainment Zone",
      description: "Digital entertainment and media platform.",
      icon: Music,
      href: "/services/entertainment",
      variant: "neon" as const,
      stats: "10M+ Content",
    },
  ],
  system: [
    {
      id: "legal",
      title: "Legal Matrix",
      description: "Digital domicile and diplomatic immunity framework.",
      icon: Scale,
      href: "/legal",
      variant: "quantum" as const,
      stats: "100% Compliant",
    },
    {
      id: "compliance",
      title: "Compliance Shield",
      description: "Advanced regulatory compliance and risk management.",
      icon: Shield,
      href: "/legal/compliance",
      variant: "glass" as const,
      stats: "Zero Violations",
    },
    {
      id: "admin",
      title: "System Core",
      description: "Advanced system administration and quantum monitoring.",
      icon: Settings,
      href: "/admin/dashboard",
      variant: "neural" as const,
      stats: "99.9% Uptime",
    },
  ],
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function NexusDashboard() {
  return (
    <div className="min-h-screen bg-slate-900/50 relative overflow-hidden p-6 sm:p-12">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.15),transparent_60%)] -z-10" />

      <div className="relative z-10">
        <div className="mb-16">
          <HolographicHeader
            title="SNAPPAIFI NEXUS"
            subtitle="The Future of Integrated Finance"
            description="Navigate through quantum-powered environments, manage assets with neural intelligence, and explore a new reality of financial services."
            variant="rainbow"
            size="lg"
            animated
            glitchEffect
          />
        </div>

        <div className="space-y-16">
          {Object.entries(platformEnvironments).map(([category, environments]) => (
            <motion.div key={category} initial="hidden" animate="visible" variants={containerVariants}>
              <h2 className="text-2xl font-bold text-white mb-6 capitalize flex items-center gap-3">
                <Rocket className="w-6 h-6 text-cyan-400" />
                {category} Environments
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {environments.map((env) => (
                  <PlatformCard key={env.id} {...env} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
