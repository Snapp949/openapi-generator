"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface HolographicBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: "default" | "premium" | "new" | "sale"
}

export function HolographicBadge({ children, variant = "default", className, ...props }: HolographicBadgeProps) {
  const baseClasses =
    "relative inline-flex items-center justify-center px-3 py-1 text-xs font-bold rounded-full overflow-hidden"
  const variantClasses = {
    default: "bg-gradient-to-br from-indigo-700/50 to-purple-700/50 border border-indigo-500/30 text-indigo-200",
    premium:
      "bg-gradient-to-br from-cyan-600/60 to-purple-600/60 border border-cyan-400/50 text-white shadow-lg shadow-cyan-500/20",
    new: "bg-gradient-to-br from-green-600/60 to-emerald-600/60 border border-green-400/50 text-white shadow-lg shadow-green-500/20",
    sale: "bg-gradient-to-br from-red-600/60 to-orange-600/60 border border-red-400/50 text-white shadow-lg shadow-red-500/20",
  }

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0.5, 1.2, 0.5],
      rotate: [0, 180, 360],
    },
  }

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {/* Background gradient for subtle glow */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background:
            variant === "premium"
              ? "radial-gradient(circle at center, rgba(34,211,238,0.3) 0%, transparent 70%)"
              : "none",
        }}
      />

      {/* Animated sparkles for premium variant */}
      {variant === "premium" && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.5,
                ease: "linear",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Sparkles className="w-3 h-3 text-cyan-300" />
            </motion.div>
          ))}
        </>
      )}

      <span className="relative z-10">{children}</span>
    </motion.div>
  )
}
