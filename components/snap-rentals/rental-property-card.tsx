"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Users, Star, Heart, Eye } from "lucide-react"
import type { RentalProperty } from "@/app/snap-rentals/SnapRentalsMarketplace"

interface RentalPropertyCardProps {
  property: RentalProperty
  onViewDetails: (property: RentalProperty) => void
}

export function RentalPropertyCard({ property, onViewDetails }: RentalPropertyCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (property.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (property.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={() => onViewDetails(property)}
    >
      <Card className="relative overflow-hidden border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-purple-950/30 to-cyan-950/40 backdrop-blur-sm">
        <CardContent className="relative z-10 p-4">
          {/* Property Image Gallery */}
          <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
            <div className="relative w-full h-full">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg?height=400&width=600"}
                alt={property.title}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-110"
                priority={false}
              />

              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    →
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {property.images.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-white" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Property Type Badge */}
            <Badge className="absolute top-2 left-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Badge>

            {/* Like Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 h-8 w-8 bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation()
                setIsLiked(!isLiked)
              }}
            >
              <Heart
                className={`h-4 w-4 transition-all duration-200 ${isLiked ? "fill-red-500 text-red-500 scale-110" : "text-white"}`}
              />
            </Button>
          </div>

          {/* Property Info */}
          <div className="space-y-3">
            {/* Title and Location */}
            <div>
              <h3 className="font-semibold text-lg line-clamp-2 text-white group-hover:text-cyan-300 transition-colors">
                {property.title}
              </h3>
              <div className="flex items-center gap-1 text-indigo-200/70">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>

            {/* Price and Rating */}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-white">
                {formatCurrency(property.pricePerNight)}
                <span className="text-base font-normal text-indigo-200/70"> / night</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="text-sm font-medium">{property.rating.toFixed(1)}</span>
                <span className="text-xs text-indigo-200/70">({property.reviews} reviews)</span>
              </div>
            </div>

            {/* Property Details */}
            <div className="flex items-center gap-4 text-sm text-indigo-200/70">
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms || 0} bed</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms || 0} bath</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{property.guests || 0} guests</span>
              </div>
              <div className="flex items-center gap-1">
                <Square className="w-4 h-4" />
                <span>{property.sqft ? property.sqft.toLocaleString() : "N/A"} sqft</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white shadow-lg hover:shadow-cyan-500/25"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onViewDetails(property)
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
