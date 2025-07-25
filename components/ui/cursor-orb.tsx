"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Sparkles, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CursorOrbProps {
  enabled?: boolean
}

interface TrailPoint {
  x: number
  y: number
  id: number
  timestamp: number // Time when the point was created
}

export function CursorOrb({ enabled = true }: CursorOrbProps) {
  const [mainOrbPosition, setMainOrbPosition] = useState({ x: -100, y: -100 }) // Position for the main orb
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const mousePositionRef = useRef({ x: -100, y: -100 }) // Ref to store the latest mouse position
  const trailIdRef = useRef(0)
  const animationFrameIdRef = useRef<number | null>(null)
  const lastTrailPointTimeRef = useRef(0) // To control how often new trail points are added

  // Function to update trail points (aging and removal)
  const animateTrail = useCallback(() => {
    setTrailPoints((prevTrailPoints) => {
      const now = Date.now()
      const updatedTrail = prevTrailPoints
        .map((point) => ({
          ...point,
          // Calculate age based on current time vs. creation time
          // Max age of 1000ms (1 second) for a point
          age: (now - point.timestamp) / 1000,
        }))
        .filter((point) => point.age < 1) // Remove points older than 1 second

      return updatedTrail
    })

    animationFrameIdRef.current = requestAnimationFrame(animateTrail)
  }, []) // No dependencies, as it uses functional update for setTrailPoints

  // Mouse move handler
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      mousePositionRef.current = newPosition // Update ref for main orb and trail point creation
      setMainOrbPosition(newPosition) // Update state for main orb animation

      setIsVisible(true)

      const now = Date.now()
      // Add a new trail point only if enough time has passed since the last one
      // or if it's the very first point
      if (now - lastTrailPointTimeRef.current > 50 || trailPoints.length === 0) {
        setTrailPoints((prevTrailPoints) => {
          const newTrailPoint: TrailPoint = {
            x: newPosition.x,
            y: newPosition.y,
            id: trailIdRef.current++,
            timestamp: now,
          }
          // Add new point to the beginning, keep trail length limited
          return [newTrailPoint, ...prevTrailPoints].slice(0, 15) // Keep last 15 points
        })
        lastTrailPointTimeRef.current = now
      }
    },
    [trailPoints.length],
  ) // Dependency on trailPoints.length to ensure new points are added correctly

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
    // Stop animation frame when mouse leaves
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current)
      animationFrameIdRef.current = null
    }
    setTrailPoints([])
    setMainOrbPosition({ x: -100, y: -100 }) // Move main orb off-screen
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
    // Restart animation frame when mouse enters
    if (!animationFrameIdRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(animateTrail)
    }
  }, [animateTrail])

  useEffect(() => {
    if (!enabled) {
      setIsVisible(false)
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
        animationFrameIdRef.current = null
      }
      setTrailPoints([])
      setMainOrbPosition({ x: -100, y: -100 })
      return
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)

    // Start the trail animation loop
    animationFrameIdRef.current = requestAnimationFrame(animateTrail)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
      }
    }
  }, [enabled, handleMouseMove, handleMouseLeave, handleMouseEnter, animateTrail])

  if (!enabled || !isVisible) return null

  return (
    <div className={cn("fixed inset-0 pointer-events-none z-[10000]", "")}>
      {/* Trail Points */}
      {trailPoints.map((point) => {
        const opacity = Math.max(0, 1 - point.age) // 1 (new) to 0 (old)
        const scale = Math.max(0.1, 1 - point.age) // 1 (new) to 0.1 (old)

        return (
          <motion.div
            key={point.id}
            className="absolute"
            style={{
              left: point.x - 4,
              top: point.y - 4,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
          </motion.div>
        )
      })}

      {/* Main Orb */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mainOrbPosition.x - 16,
          y: mainOrbPosition.y - 16,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
      >
        {/* Outer Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-md animate-pulse"
        />

        {/* Rotating Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute inset-1 w-6 h-6 rounded-full border border-cyan-400/50 animate-spin"
          style={{ animationDuration: "3s" }}
        />

        {/* Core Orb */}
        <motion.div
          animate={{
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse shadow-lg shadow-cyan-500/50"
        >
          <motion.div className="absolute inset-0.5 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
        </motion.div>

        {/* Orbiting Icons */}
        <motion.div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
          <motion.div className="absolute w-3 h-3 text-cyan-300 -top-1 left-1/2 transform -translate-x-1/2">
            <Sparkles />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 animate-spin"
          style={{ animationDuration: "4s", animationDirection: "reverse" }}
        >
          <motion.div className="absolute w-3 h-3 text-blue-300 top-1/2 -right-1 transform -translate-y-1/2">
            <Star />
          </motion.div>
        </motion.div>
        <motion.div className="absolute inset-0 animate-spin" style={{ animationDuration: "5s" }}>
          <motion.div className="absolute w-3 h-3 text-purple-300 -bottom-1 left-1/2 transform -translate-x-1/2">
            <Zap />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
