"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { FuturisticCard } from "@/components/ui/futuristic-card"
import { QuantumButton } from "@/components/ui/quantum-button"
import { useRouter } from "next/navigation"

interface PlatformCardProps {
  id: string
  title: string
  description: string
  icon: React.ElementType
  href: string
  variant: "glass" | "neon" | "hologram" | "neural" | "quantum" | "plasma"
  stats: string
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function PlatformCard({ id, title, description, icon: Icon, href, variant, stats }: PlatformCardProps) {
  const router = useRouter()

  return (
    <motion.div variants={cardVariants} className="h-full">
      <FuturisticCard
        variant={variant}
        className="h-full flex flex-col group"
        glow
        animated
        interactive
        borderAnimation
      >
        <div className="flex-1 flex flex-col p-2">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-black/20 border border-white/10">
              <Icon className="w-6 h-6 text-cyan-300" />
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400 mb-1">STATUS</div>
              <div className="text-sm font-semibold text-emerald-400">{stats}</div>
            </div>
          </div>

          <div className="flex-1 mb-4">
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
          </div>

          <QuantumButton
            variant={variant === "glass" ? "secondary" : variant}
            size="md"
            className="w-full mt-auto"
            onClick={() => router.push(href)}
          >
            Launch Environment
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </QuantumButton>
        </div>
      </FuturisticCard>
    </motion.div>
  )
}
