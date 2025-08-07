"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Sparkles, Star, Zap } from 'lucide-react'
import { motion } from "framer-motion"

interface CursorOrbProps {
  enabled?: boolean}

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
  const [isPageVisible, setIsPageVisible] = useState(true)

  const mousePositionRef = useRef({ x: -100, y: -100 })
  const trailIdRef = useRef(0)
  const animationFrameIdRef = useRef<number | null>(null)
  const lastTrailPointTimeRef = useRef(0)
  const isInitializedRef = useRef(false)

  // Handle page visibility changes for performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(!document.hidden)
      if (document.hidden) {
        setIsVisible(false)
        setTrailPoints([])
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current)
          animationFrameIdRef.current = null
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Mouse move handler with throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isPageVisible || !enabled) return

    const newPosition = { x: e.clientX, y: e.clientY }
    mousePositionRef.current = newPosition
    setMainOrbPosition(newPosition)
    
    if (!isVisible) {
      setIsVisible(true)
    }

    const now = Date.now()
    if (now - lastTrailPointTimeRef.current > 50) {
      setTrailPoints((prevTrailPoints) => {
        const newTrailPoint: TrailPoint = {
          x: newPosition.x,
          y: newPosition.y,
          id: trailIdRef.current++,
          timestamp: now,
        }
        return [newTrailPoint, ...prevTrailPoints].slice(0, 12) // Reduced for better performance
      })
      lastTrailPointTimeRef.current = now
    }
  }, [isPageVisible, enabled, isVisible])

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
    if (isPageVisible && enabled) {
      setIsVisible(true)
    }
  }, [isPageVisible, enabled])

  // Animation loop for trail cleanup
  useEffect(() => {
    if (!enabled || !isVisible || !isPageVisible) {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
        animationFrameIdRef.current = null
      }
      return
    }

    const animateTrail = () => {
      const now = Date.now()
      setTrailPoints((prevTrailPoints) => {
        const filtered = prevTrailPoints.filter((point) => now - point.timestamp < 800) // Reduced lifetime
        return filtered
      })
      
      if (isVisible && isPageVisible && enabled) {
        animationFrameIdRef.current = requestAnimationFrame(animateTrail)
      }
    }

    if (!animationFrameIdRef.current) {
      animationFrameIdRef.current = requestAnimationFrame(animateTrail)
    }

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
        animationFrameIdRef.current = null
      }
    }
  }, [enabled, isVisible, isPageVisible])

  // Event listeners setup with proper cleanup
  useEffect(() => {
    if (!enabled || !isPageVisible) {
      setIsVisible(false)
      setTrailPoints([])
      setMainOrbPosition({ x: -100, y: -100 })
      return
    }

    // Delay initialization to prevent issues during page transitions
    const initTimeout = setTimeout(() => {
      if (!isInitializedRef.current) {
        document.addEventListener("mousemove", handleMouseMove, { passive: true })
        document.addEventListener("mouseleave", handleMouseLeave)
        document.addEventListener("mouseenter", handleMouseEnter)
        isInitializedRef.current = true
      }
    }, 100)

    return () => {
      clearTimeout(initTimeout)
      if (isInitializedRef.current) {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseleave", handleMouseLeave)
        document.removeEventListener("mouseenter", handleMouseEnter)
        isInitializedRef.current = false
      }
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current)
        animationFrameIdRef.current = null
      }
    }
  }, [enabled, isPageVisible, handleMouseMove, handleMouseLeave, handleMouseEnter])

  // Reset on route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setTrailPoints([])
      setIsVisible(false)
      setMainOrbPosition({ x: -100, y: -100 })
    }

    // Listen for Next.js route changes
    window.addEventListener('beforeunload', handleRouteChange)
    
    return () => {
      window.removeEventListener('beforeunload', handleRouteChange)
    }
  }, [])

  if (!enabled || !isVisible || !isPageVisible) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-[10000]" style={{ willChange: 'transform' }}>
      {/* Trail Points */}
      {trailPoints.map((point) => {
        const now = Date.now()
        const age = (now - point.timestamp) / 800 // Adjusted for new lifetime
        const opacity = Math.max(0, 1 - age)
        const scale = Math.max(0.2, 1 - age * 0.8)

        return (
          <motion.div
            key={point.id}
            className="absolute"
            style={{
              left: point.x - 3,
              top: point.y - 3,
              opacity,
              transform: `scale(${scale})`,
              willChange: 'transform, opacity'
            }}
          >
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" />
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
          stiffness: 400,
          damping: 25,
          mass: 0.4,
        }}
        style={{ willChange: 'transform' }}
      >
        {/* Outer Glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-sm"
        />

        {/* Core Orb */}
        <motion.div
          animate={{
            scale: [0.85, 1, 0.85],
          }}
          transition={{
            duration: 1.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute inset-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg shadow-cyan-500/30"
        >
          <div className="absolute inset-0.5 bg-gradient-to-r from-white/15 to-transparent rounded-full" />
        </motion.div>

        {/* Orbiting Icons - Reduced for performance */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute w-2.5 h-2.5 text-cyan-300 -top-0.5 left-1/2 transform -translate-x-1/2">
            <Sparkles size={10} />
          </div>
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          <div className="absolute w-2.5 h-2.5 text-blue-300 top-1/2 -right-0.5 transform -translate-y-1/2">
            <Star size={10} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
