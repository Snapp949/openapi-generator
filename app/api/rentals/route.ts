import { NextResponse } from "next/server"

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

const demoProperties: RentalProperty[] = [
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
  {
    id: "rent-6",
    title: "Charming Lakeside Cottage",
    location: "Lake Tahoe, CA",
    pricePerNight: 280,
    type: "house",
    bedrooms: 2,
    bathrooms: 1,
    guests: 4,
    sqft: 1100,
    images: ["/placeholder.svg?height=400&width=600"],
    description: "A serene cottage by the lake, perfect for a peaceful retreat.",
    amenities: ["Lake Access", "Fire Pit", "BBQ", "Kayaks"],
    rating: 4.6,
    reviews: 70,
    host: { name: "Frank White", avatar: "/placeholder-user.jpg" },
    availability: { startDate: "2025-09-10", endDate: "2026-02-28" },
  },
  {
    id: "rent-7",
    title: "Urban Loft with Skyline View",
    location: "Chicago, IL",
    pricePerNight: 200,
    type: "apartment",
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    sqft: 850,
    images: ["/placeholder.svg?height=400&width=600"],
    description: "Stylish loft with breathtaking city skyline views.",
    amenities: ["City View", "Gym Access", "Balcony", "Smart TV"],
    rating: 4.7,
    reviews: 110,
    host: { name: "Grace Lee", avatar: "/placeholder-user.jpg" },
    availability: { startDate: "2025-08-25", endDate: "2025-12-20" },
  },
  {
    id: "rent-8",
    title: "Desert Oasis Villa",
    location: "Palm Springs, CA",
    pricePerNight: 600,
    type: "villa",
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    sqft: 2800,
    images: ["/placeholder.svg?height=400&width=600"],
    description: "A luxurious desert escape with a private pool and stunning mountain views.",
    amenities: ["Private Pool", "Hot Tub", "Mountain View", "Outdoor Dining"],
    rating: 4.9,
    reviews: 55,
    host: { name: "Henry Green", avatar: "/placeholder-user.jpg" },
    availability: { startDate: "2025-09-05", endDate: "2026-01-10" },
  },
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const location = searchParams.get("location")?.toLowerCase() || ""
  const minPrice = Number(searchParams.get("minPrice")) || 50
  const maxPrice = Number(searchParams.get("maxPrice")) || 1000
  const type = searchParams.get("type") || "all"
  const guests = Number(searchParams.get("guests")) || 1
  const checkIn = searchParams.get("checkIn")
  const checkOut = searchParams.get("checkOut")
  const sortBy = searchParams.get("sortBy") || "price-low"

  const filteredProperties = demoProperties.filter((property) => {
    const matchesLocation =
      property.location.toLowerCase().includes(location) || property.title.toLowerCase().includes(location)
    const matchesPrice = property.pricePerNight >= minPrice && property.pricePerNight <= maxPrice
    const matchesType = type === "all" || property.type === type
    const matchesGuests = property.guests >= guests

    // Basic date availability check (can be expanded)
    let matchesAvailability = true
    if (checkIn && checkOut) {
      const requestedCheckIn = new Date(checkIn)
      const requestedCheckOut = new Date(checkOut)
      const propertyAvailableFrom = new Date(property.availability.startDate)
      const propertyAvailableTo = new Date(property.availability.endDate)

      matchesAvailability =
        requestedCheckIn >= propertyAvailableFrom &&
        requestedCheckOut <= propertyAvailableTo &&
        requestedCheckIn < requestedCheckOut
    }

    return matchesLocation && matchesPrice && matchesType && matchesGuests && matchesAvailability
  })

  // Sorting logic
  filteredProperties.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.pricePerNight - b.pricePerNight
      case "price-high":
        return b.pricePerNight - a.pricePerNight
      case "rating":
        return b.rating - a.rating
      case "reviews":
        return b.reviews - a.reviews
      default:
        return 0
    }
  })

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(filteredProperties)
}
