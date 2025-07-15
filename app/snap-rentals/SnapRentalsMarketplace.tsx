"use client"
import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { CalendarDays, Search, Home, Hotel } from "lucide-react"
import { RentalPropertyCard } from "@/components/snap-rentals/rental-property-card"
import { RentalDetailsModal } from "@/components/snap-rentals/rental-details-modal"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export interface RentalProperty {
  id: string
  title: string
  location: string
  pricePerNight: number
  type: "house" | "apartment" | "villa" | "cabin" | "hotel"
  bedrooms: number
  bathrooms: number
  guests: number
  sqft: number
  images: string[]
  description: string
  amenities: string[]
  rating: number
  reviews: number
  host: {
    name: string
    avatar: string
  }
  availability: {
    startDate: string
    endDate: string
  }
}

export default function SnapRentalsMarketplace() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([50, 1000])
  const [propertyType, setPropertyType] = useState("all")
  const [numGuests, setNumGuests] = useState(1)
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date } | undefined>(undefined)
  const [sortBy, setSortBy] = useState("price-low")
  const [viewMode, setViewMode] = useState("grid")
  const [selectedProperty, setSelectedProperty] = useState<RentalProperty | null>(null)
  const [properties, setProperties] = useState<RentalProperty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProperties = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.append("location", searchQuery)
      params.append("minPrice", priceRange[0].toString())
      params.append("maxPrice", priceRange[1].toString())
      if (propertyType !== "all") params.append("type", propertyType)
      params.append("guests", numGuests.toString())
      if (dateRange?.from) params.append("checkIn", format(dateRange.from, "yyyy-MM-dd"))
      if (dateRange?.to) params.append("checkOut", format(dateRange.to, "yyyy-MM-dd"))
      params.append("sortBy", sortBy)

      const response = await fetch(`/api/rentals?${params.toString()}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setProperties(data)
    } catch (err: any) {
      console.error("Failed to fetch properties:", err)
      setError("Failed to load properties. Please try again later.")
      // Fallback to demo data if API fails
      setProperties(getDemoProperties())
    } finally {
      setLoading(false)
    }
  }, [searchQuery, priceRange, propertyType, numGuests, dateRange, sortBy])

  useEffect(() => {
    fetchProperties()
  }, [fetchProperties])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const getDemoProperties = (): RentalProperty[] => [
    {
      id: "rent-1",
      title: "Cozy Downtown Apartment",
      location: "New York, NY",
      pricePerNight: 150,
      type: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      guests: 2,
      sqft: 700,
      images: ["/properties/downtown-loft.jpg", "/properties/luxury-interior-1.jpg"],
      description: "A charming apartment in the heart of the city, perfect for a couple's getaway.",
      amenities: ["Wifi", "Kitchen", "AC", "TV"],
      rating: 4.8,
      reviews: 120,
      host: { name: "Alice Smith", avatar: "/placeholder-user.jpg" },
      availability: { startDate: "2025-08-01", endDate: "2025-12-31" },
    },
    {
      id: "rent-2",
      title: "Spacious Family House with Garden",
      location: "Los Angeles, CA",
      pricePerNight: 300,
      type: "house",
      bedrooms: 3,
      bathrooms: 2.5,
      guests: 6,
      sqft: 2200,
      images: ["/properties/suburban-family-home.jpg", "/properties/luxury-interior-2.jpg"],
      description: "Ideal for families, this house offers a large garden and easy access to attractions.",
      amenities: ["Wifi", "Kitchen", "Parking", "Garden", "Washer/Dryer"],
      rating: 4.9,
      reviews: 85,
      host: { name: "Bob Johnson", avatar: "/placeholder-user.jpg" },
      availability: { startDate: "2025-09-01", endDate: "2026-01-31" },
    },
    {
      id: "rent-3",
      title: "Luxury Beachfront Villa",
      location: "Miami, FL",
      pricePerNight: 800,
      type: "villa",
      bedrooms: 4,
      bathrooms: 4,
      guests: 8,
      sqft: 3500,
      images: ["/properties/oceanfront-estate.jpg", "/properties/luxury-interior-3.jpg"],
      description: "Experience luxury in this stunning beachfront villa with private pool.",
      amenities: ["Private Pool", "Beach Access", "Chef's Kitchen", "Ocean View", "Gym"],
      rating: 5.0,
      reviews: 45,
      host: { name: "Charlie Brown", avatar: "/placeholder-user.jpg" },
      availability: { startDate: "2025-07-20", endDate: "2025-11-30" },
    },
    {
      id: "rent-4",
      title: "Secluded Mountain Cabin",
      location: "Aspen, CO",
      pricePerNight: 450,
      type: "cabin",
      bedrooms: 2,
      bathrooms: 1.5,
      guests: 4,
      sqft: 1200,
      images: ["/placeholder.svg?height=400&width=600"],
      description: "Escape to this peaceful cabin nestled in the mountains, perfect for nature lovers.",
      amenities: ["Fireplace", "Hot Tub", "Hiking Trails", "Pet-Friendly"],
      rating: 4.7,
      reviews: 60,
      host: { name: "Diana Prince", avatar: "/placeholder-user.jpg" },
      availability: { startDate: "2025-10-01", endDate: "2026-03-15" },
    },
    {
      id: "rent-5",
      title: "Modern City Studio",
      location: "San Francisco, CA",
      pricePerNight: 120,
      type: "apartment",
      bedrooms: 0,
      bathrooms: 1,
      guests: 1,
      sqft: 400,
      images: ["/placeholder.svg?height=400&width=600"],
      description: "Compact and stylish studio in a vibrant neighborhood, ideal for solo travelers.",
      amenities: ["Wifi", "Kitchenette", "Public Transport Access"],
      rating: 4.5,
      reviews: 90,
      host: { name: "Eve Adams", avatar: "/placeholder-user.jpg" },
      availability: { startDate: "2025-08-15", endDate: "2025-11-15" },
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Snap Rentals
            </h1>
            <p className="text-xl text-blue-200 mt-2">Discover unique homes and experiences</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              <Home className="h-4 w-4 mr-2" />
              {properties.length} Listings
            </Badge>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Hotel className="h-4 w-4 mr-2" />
              List Your Property
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border-slate-700/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="space-y-2 lg:col-span-2">
                <Label htmlFor="search" className="text-white">
                  Location / Keywords
                </Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="search"
                    placeholder="e.g., Paris, beachfront, cozy cabin"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-white">
                  Guests
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  value={numGuests}
                  onChange={(e) => setNumGuests(Number(e.target.value))}
                  className="bg-slate-800/50 border-slate-600 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dates" className="text-white">
                  Dates
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="dates"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-slate-800/50 border-slate-600 text-white hover:bg-slate-700/50",
                        !dateRange && "text-slate-400",
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
                        <span>Pick a date range</span>
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
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="property-type" className="text-white">
                  Property Type
                </Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger id="property-type" className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 text-white">
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="cabin">Cabin</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 lg:col-span-2">
                <Label className="text-white">Price Range per Night</Label>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000}
                    min={50}
                    step={10}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-sm text-slate-400 mt-1">
                    <span>{formatCurrency(priceRange[0])}</span>
                    <span>{formatCurrency(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sort-by" className="text-white">
                  Sort By
                </Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" className="bg-slate-800/50 border-slate-600 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600 text-white">
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rating</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end justify-end lg:col-span-1">
                <Button onClick={fetchProperties} className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? "Searching..." : "Search Rentals"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && <div className="text-center text-red-400 bg-red-900/20 p-4 rounded-lg">{error}</div>}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="bg-slate-800/50 border-slate-700/50 animate-pulse">
                <div className="w-full h-48 bg-slate-700/50 rounded-t-lg" />
                <CardContent className="p-4 space-y-3">
                  <div className="h-6 bg-slate-700/50 rounded w-3/4" />
                  <div className="h-4 bg-slate-700/50 rounded w-1/2" />
                  <div className="flex gap-2">
                    <div className="h-4 bg-slate-700/50 rounded w-1/4" />
                    <div className="h-4 bg-slate-700/50 rounded w-1/4" />
                  </div>
                  <div className="h-10 bg-slate-700/50 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-xl font-semibold text-white mb-2">No rentals found</h3>
            <p className="text-indigo-200/70">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <span className="text-lg font-medium">{properties.length} rentals found</span>
                <span className="text-slate-400 ml-2">• Sorted by {sortBy.replace("-", " ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  List
                </Button>
              </div>
            </div>

            <div
              className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
            >
              {properties.map((property) => (
                <RentalPropertyCard
                  key={property.id}
                  property={property}
                  onViewDetails={() => setSelectedProperty(property)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedProperty && (
        <RentalDetailsModal
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
          property={selectedProperty}
        />
      )}
    </div>
  )
}
