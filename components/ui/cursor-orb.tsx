"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"

interface TrailPoint {
  id: number
  x: number
  y: number
  age: number // 0 to 1, 0 being new, 1 being old
}

interface CursorOrbProps {
  trailLength?: number // Number of trail points
  trailDecayRate?: number // How fast trail points fade (0 to 1, higher is faster)
  orbSize?: number // Size of the main orb
  orbColor?: string // Color of the main orb
  trailColor?: string // Color of the trail
}

export function CursorOrb({
  trailLength = 20,
  trailDecayRate = 0.05,
  orbSize = 20,
  orbColor = "bg-gradient-to-br from-purple-500 to-cyan-500",
  trailColor = "bg-gradient-to-br from-purple-400 to-cyan-400",
}: CursorOrbProps) {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 }) // Off-screen initially
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateTimeRef = useRef<number>(0)

  const updateTrail = useCallback(
    (timestamp: DOMHighResTimeStamp) => {
      if (!lastUpdateTimeRef.current) {
        lastUpdateTimeRef.current = timestamp
      }
      const deltaTime = timestamp - lastUpdateTimeRef.current
      lastUpdateTimeRef.current = timestamp

      setTrail((prevTrail) => {
        const newTrail = prevTrail
          .map((point) => ({
            ...point,
            age: point.age + trailDecayRate * (deltaTime / 16.67), // Normalize decay rate by frame time
          }))
          .filter((point) => point.age < 1)

        // Add a new point if the mouse has moved significantly or if trail is empty
        const lastPoint = newTrail[0]
        const distance = lastPoint
          ? Math.sqrt(Math.pow(mousePosition.x - lastPoint.x, 2) + Math.pow(mousePosition.y - lastPoint.y, 2))
          : Number.POSITIVE_INFINITY

        if (distance > 5 || newTrail.length === 0) {
          newTrail.unshift({
            id: Date.now(), // Unique ID for React key
            x: mousePosition.x,
            y: mousePosition.y,
            age: 0,
          })
        }

        return newTrail.slice(0, trailLength)
      })

      animationFrameRef.current = requestAnimationFrame(updateTrail)
    },
    [mousePosition, trailDecayRate, trailLength],
  ) // Dependencies for useCallback

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMousePosition({ x: -100, y: -100 }) // Move off-screen
    setTrail([]) // Clear trail
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!animationFrameRef.current) {
      lastUpdateTimeRef.current = 0 // Reset last update time
      animationFrameRef.current = requestAnimationFrame(updateTrail)
    }
  }, [updateTrail])

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseenter", handleMouseEnter)

    // Start animation loop when component mounts
    animationFrameRef.current = requestAnimationFrame(updateTrail)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseenter", handleMouseEnter)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, updateTrail]) // Dependencies for useEffect

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Main Orb */}
      <motion.div
        className={`absolute rounded-full mix-blend-screen ${orbColor}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          translateX: "-50%",
          translateY: "-50%",
          width: orbSize,
          height: orbSize,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Trail */}
      {trail.map((point) => (
        <motion.div
          key={point.id}
          className={`absolute rounded-full mix-blend-screen ${trailColor}`}
          style={{
            left: point.x,
            top: point.y,
            translateX: "-50%",
            translateY: "-50%",
            width: orbSize * (1 - point.age),
            height: orbSize * (1 - point.age),
            opacity: 1 - point.age, // Control opacity directly via style
            scale: 1 - point.age, // Control scale directly via style
          }}
          // Removed animate and transition props to avoid conflict
        />
      ))}
    </div>
  )
}
