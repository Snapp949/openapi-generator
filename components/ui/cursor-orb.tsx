"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Zap, Star, Crown } from "lucide-react"

interface CursorOrbProps {
  variant?: "default" | "premium" | "royal" | "quantum"
  size?: "sm" | "md" | "lg"
  intensity?: "low" | "medium" | "high"
}

export function CursorOrb({ variant = "default", size = "md", intensity = "medium" }: CursorOrbProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])

  useEffect(() => {
    let trailId = 0

    const updateMousePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setMousePosition(newPosition)

      // Add to trail
      if (intensity !== "low") {
        setTrail((prev) => {
          const newTrail = [{ ...newPosition, id: trailId++ }, ...prev.slice(0, 8)]
          return newTrail
        })
      }

      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", updateMousePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [isVisible, intensity])

  const getOrbSize = () => {
    switch (size) {
      case "sm":
        return "w-4 h-4"
      case "lg":
        return "w-8 h-8"
      default:
        return "w-6 h-6"
    }
  }

  const getOrbColors = () => {
    switch (variant) {
      case "premium":
        return "from-blue-400 via-cyan-400 to-blue-600"
      case "royal":
        return "from-yellow-400 via-orange-400 to-red-500"
      case "quantum":
        return "from-purple-400 via-pink-400 to-purple-600"
      default:
        return "from-purple-400 via-blue-400 to-cyan-400"
    }
  }

  const getIcon = () => {
    switch (variant) {
      case "premium":
        return Zap
      case "royal":
        return Crown
      case "quantum":
        return Star
      default:
        return Sparkles
    }
  }

  const Icon = getIcon()

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Trail Effect */}
            {intensity !== "low" &&
              trail.map((point, index) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0.8, scale: 1 }}
                  animate={{ opacity: 0, scale: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className={`absolute ${getOrbSize()} rounded-full bg-gradient-to-r ${getOrbColors()} opacity-30`}
                  style={{
                    left: point.x - (size === "sm" ? 8 : size === "lg" ? 16 : 12),
                    top: point.y - (size === "sm" ? 8 : size === "lg" ? 16 : 12),
                  }}
                />
              ))}

            {/* Main Orb */}
            <motion.div
              className={`absolute ${getOrbSize()} rounded-full bg-gradient-to-r ${getOrbColors()} shadow-lg`}
              style={{
                left: mousePosition.x - (size === "sm" ? 8 : size === "lg" ? 16 : 12),
                top: mousePosition.y - (size === "sm" ? 8 : size === "lg" ? 16 : 12),
              }}
              animate={{
                scale: isClicking ? 1.5 : 1,
                rotate: [0, 360],
              }}
              transition={{
                scale: { duration: 0.1 },
                rotate: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              }}
            >
              <div className="absolute inset-0 rounded-full bg-white/20 animate-pulse" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-3 h-3 text-white" />
              </div>
            </motion.div>

            {/* Click Ripple Effect */}
            <AnimatePresence>
              {isClicking && (
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`absolute w-12 h-12 rounded-full border-2 border-white/50`}
                  style={{
                    left: mousePosition.x - 24,
                    top: mousePosition.y - 24,
                  }}
                />
              )}
            </AnimatePresence>

            {/* Particle Effects for High Intensity */}
            {intensity === "high" && (
              <div className="absolute inset-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    style={{
                      left: mousePosition.x + Math.random() * 40 - 20,
                      top: mousePosition.y + Math.random() * 40 - 20,
                    }}
                    animate={{
                      y: [0, -20],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
