"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format, differenceInDays } from "date-fns"
import { cn } from "@/lib/utils"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Users,
  Star,
  Wifi,
  Utensils,
  Car,
  Tv,
  Snowflake,
  Thermometer,
  PawPrint,
  Dumbbell,
  ShowerHeadIcon as SwimmingPool,
  BarcodeIcon as Barbecue,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import type { RentalProperty } from "@/app/snap-rentals/SnapRentalsMarketplace"

interface RentalDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  property: RentalProperty
}

export function RentalDetailsModal({ isOpen, onClose, property }: RentalDetailsModalProps) {
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined)
  const [numGuests, setNumGuests] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [bookingSuccess, setBookingSuccess] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setDateRange(undefined)
      setNumGuests(1)
      setCurrentImageIndex(0)
      setBookingSuccess(false)
    }
  }, [isOpen])

  const numberOfNights = dateRange?.from && dateRange?.to ? differenceInDays(dateRange.to, dateRange.from) : 0
  const totalPrice = numberOfNights > 0 ? numberOfNights * property.pricePerNight : 0

  const handleBooking = () => {
    // Simulate booking process
    console.log("Booking property:", property.title)
    console.log("Dates:", dateRange)
    console.log("Guests:", numGuests)
    console.log("Total Price:", totalPrice)
    setBookingSuccess(true)
    // In a real app, you'd send this to a backend
  }

  const nextImage = () => {
    if (property.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
    }
  }

  const prevImage = () => {
    if (property.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
    }
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />
      case "kitchen":
        return <Utensils className="h-4 w-4" />
      case "parking":
        return <Car className="h-4 w-4" />
      case "tv":
        return <Tv className="h-4 w-4" />
      case "ac":
        return <Snowflake className="h-4 w-4" />
      case "heating":
        return <Thermometer className="h-4 w-4" />
      case "pet-friendly":
        return <PawPrint className="h-4 w-4" />
      case "gym":
        return <Dumbbell className="h-4 w-4" />
      case "private pool":
        return <SwimmingPool className="h-4 w-4" />
      case "barbecue":
        return <Barbecue className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col bg-gradient-to-br from-slate-900/90 to-blue-900/90 backdrop-blur-lg border-blue-500/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            {property.title}
          </DialogTitle>
          <DialogDescription className="text-blue-200 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {property.location}
            <span className="flex items-center gap-1 ml-4 text-yellow-400">
              <Star className="h-4 w-4 fill-yellow-400" />
              {property.rating.toFixed(1)} ({property.reviews} reviews)
            </span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Image Gallery */}
            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-800/50">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg?height=600&width=800"}
                alt={property.title}
                fill
                className="object-cover"
              />
              {property.images.length > 1 && (
                <>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                    onClick={nextImage}
                  >
                    <ChevronRight />
                  </Button>
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

            {/* Property Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">About this place</h3>
                <p className="text-blue-200">{property.description}</p>
              </div>

              <Separator className="bg-blue-700/30" />

              <div className="grid grid-cols-2 gap-4 text-blue-200">
                <div className="flex items-center gap-2">
                  <Bed className="h-5 w-5 text-cyan-400" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-5 w-5 text-cyan-400" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-cyan-400" />
                  <span>{property.guests} Guests</span>
                </div>
                <div className="flex items-center gap-2">
                  <Square className="h-5 w-5 text-cyan-400" />
                  <span>{property.sqft.toLocaleString()} sqft</span>
                </div>
              </div>

              <Separator className="bg-blue-700/30" />

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Amenities</h3>
                <div className="grid grid-cols-2 gap-3 text-blue-200">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {getAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="bg-blue-700/30" />

              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Hosted by {property.host.name}</h3>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-blue-400">
                    <AvatarImage src={property.host.avatar || "/placeholder.svg"} alt={property.host.name} />
                    <AvatarFallback>{property.host.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-blue-200">
                    {property.host.name} is a Superhost with {property.reviews} reviews.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Booking Section */}
        <div className="mt-6 p-4 border-t border-blue-700/30 bg-slate-900/50 rounded-b-lg flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="text-3xl font-bold text-white">
              ${property.pricePerNight}
              <span className="text-xl font-normal text-blue-200"> / night</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="space-y-1">
                <Label htmlFor="guests-modal" className="text-blue-200">
                  Guests
                </Label>
                <Input
                  id="guests-modal"
                  type="number"
                  min="1"
                  max={property.guests}
                  value={numGuests}
                  onChange={(e) => setNumGuests(Number(e.target.value))}
                  className="bg-slate-800/50 border-blue-600 text-white w-24"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="dates-modal" className="text-blue-200">
                  Dates
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dates-modal"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-slate-800/50 border-blue-600 text-white hover:bg-slate-700/50",
                        !dateRange && "text-blue-400",
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-600 text-white">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={(date) =>
                        date < new Date() ||
                        date > new Date(property.availability.endDate) ||
                        date < new Date(property.availability.startDate)
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            {numberOfNights > 0 && (
              <div className="text-xl text-blue-200">
                {property.pricePerNight} x {numberOfNights} nights ={" "}
                <span className="font-bold text-white">
                  {totalPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </span>
              </div>
            )}
            <Button
              className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white text-lg px-8 py-6"
              onClick={handleBooking}
              disabled={!dateRange?.from || !dateRange?.to || numGuests < 1 || bookingSuccess}
            >
              {bookingSuccess ? "Booking Confirmed!" : "Book Now"}
            </Button>
            {bookingSuccess && (
              <p className="text-green-400 text-sm mt-2">Your booking has been successfully placed!</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
