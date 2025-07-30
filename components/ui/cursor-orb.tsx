"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Sparkles, Star, Zap } from "lucide-react"
import { motion } from "framer-motion"

interface CursorOrbProps {
  enabled?: boolean
}

interface TrailPoint {
  x: number
  y: number
  id: number
  timestamp: number
}

export function CursorOrb({ enabled = true }: CursorOrbProps) {
  const [mainOrbPosition, setMainOrbPosition] = useState({ x: -100, y: -100 })
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([])
  const [isVisible, setIsVisible] = useState(false)

  const mousePositionRef = useRef({ x: -100, y: -100 })
  const trailIdRef = useRef(0)
  const animationFrameIdRef = useRef<number | null>(null)
  const lastTrailPointTimeRef = useRef(0)

  // Memoized function to update trail points
  const animateTrail = useCallback(() => {
    const now = Date.now()
    setTrailPoints((prevTrailPoints) => {
      return prevTrailPoints
        .map((point) => ({
          ...point,
          age: (now - point.timestamp) / 1000,
        }))
        .filter((point) => point.age < 1)
    })

    animationFrameIdRef.current = requestAnimationFrame(animateTrail)
  }, [])

  // Mouse move handler with proper dependencies
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY }
    mousePositionRef.current = newPosition
    setMainOrbPosition(newPosition)
    setIsVisible(true)

    const now = Date.now()
    if (now - lastTrailPointTimeRef.current > 50) {
      setTrailPoints((prevTrailPoints) => {
        const newTrailPoint: TrailPoint = {
          x: newPosition.x,
          y: newPosition.y,
          id: trailIdRef.current++,
          timestamp: now,
        }
        return [newTrailPoint, ...prevTrailPoints].slice(0, 15)
      })
      lastTrailPointTimeRef.current = now
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
    if (animationFrameIdRef.current) {
      cancelAnimationFrame(animationFrameIdRef.current)
      animationFrameIdRef.current = null
    }
    setTrailPoints([])
    setMainOrbPosition({ x: -100, y: -100 })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsVisible(true)
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
    <div className="fixed inset-0 pointer-events-none z-[10000]">
      {/* Trail Points */}
      {trailPoints.map((point) => {
        const now = Date.now()
        const age = (now - point.timestamp) / 1000
        const opacity = Math.max(0, 1 - age)
        const scale = Math.max(0.1, 1 - age)

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
          className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 blur-md"
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
          className="absolute inset-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/50"
        >
          <div className="absolute inset-0.5 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
        </motion.div>

        {/* Orbiting Icons */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute w-3 h-3 text-cyan-300 -top-1 left-1/2 transform -translate-x-1/2">
            <Sparkles size={12} />
          </div>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute w-3 h-3 text-blue-300 top-1/2 -right-1 transform -translate-y-1/2">
            <Star size={12} />
          </div>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute w-3 h-3 text-purple-300 -bottom-1 left-1/2 transform -translate-x-1/2">
            <Zap size={12} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
