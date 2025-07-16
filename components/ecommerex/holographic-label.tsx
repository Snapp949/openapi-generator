"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Zap, Gem, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface HolographicLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "premium" | "new" | "exclusive"
  features?: string[]
}

export function HolographicLabel({ variant = "default", features, className, ...props }: HolographicLabelProps) {
  const baseClasses =
    "relative inline-flex items-center gap-1 px-3 py-1 text-xs font-bold rounded-md overflow-hidden whitespace-nowrap"
  const variantClasses = {
    default: "bg-indigo-800/50 border border-indigo-600/50 text-indigo-200",
    premium:
      "bg-gradient-to-r from-cyan-700/60 to-purple-700/60 border border-cyan-400/50 text-white shadow-lg shadow-cyan-500/20",
    new: "bg-gradient-to-r from-green-700/60 to-emerald-700/60 border border-green-400/50 text-white shadow-lg shadow-green-500/20",
    exclusive:
      "bg-gradient-to-r from-pink-700/60 to-red-700/60 border border-pink-400/50 text-white shadow-lg shadow-pink-500/20",
  }

  const Icon = variant === "premium" ? Gem : variant === "new" ? Star : variant === "exclusive" ? Zap : undefined

  const [isHovered, setIsHovered] = useState(false)
  const [animationPhase, setAnimationPhase] = useState(0)

  // Complex animation sequence for premium labels
  useEffect(() => {
    if (variant === "premium" || variant === "exclusive") {
      const sequence = async () => {
        while (true) {
          // Phase 1: Pulse and expand
          await new Promise((resolve) => setTimeout(resolve, 2000))

          // Phase 2: Shimmer wave
          setAnimationPhase(1)
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Phase 3: Particle burst
          setAnimationPhase(2)
          await new Promise((resolve) => setTimeout(resolve, 1500))

          // Phase 4: Reset
          setAnimationPhase(0)
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      }

      if (isHovered) {
        sequence()
      }
    }
  }, [isHovered, variant])

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {/* Animated background glow for premium/exclusive */}
      {(variant === "premium" || variant === "exclusive") && (
        <motion.div
          className="absolute inset-0"
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          style={{
            background:
              variant === "premium"
                ? "radial-gradient(circle at center, rgba(34,211,238,0.3) 0%, transparent 70%)"
                : "radial-gradient(circle at center, rgba(236,72,153,0.3) 0%, transparent 70%)",
          }}
        />
      )}

      {Icon && <Icon className="w-3 h-3 relative z-10" />}
      <span className="relative z-10">{variant.toUpperCase()}</span>

      {features && features.length > 0 && (
        <span className="relative z-10 ml-1 text-indigo-300/80">({features.join(", ")})</span>
      )}
    </motion.div>
  )
}
