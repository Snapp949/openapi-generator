"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  Award,
  Zap,
  Eye,
  RotateCcw,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
} from "lucide-react"
import { HolographicProductCard } from "@/components/ecommerex/holographic-product-card"
import { ProductComparisonModal } from "@/components/ecommerex/product-comparison-modal"
import { Product360Modal } from "@/components/ecommerex/product-360-modal"
import { HolographicProductCustomizerModal } from "@/components/ecommerex/holographic-product-customizer-modal"
import type { Product } from "@/types/product" // Import Product type

interface ProductDetails extends Product {
  longDescription: string
  specifications: Record<string, string>
  reviews: {
    id: string
    user: string
    rating: number
    comment: string
    date: string
    verified: boolean
  }[]
  relatedProducts: Product[]
  availability: {
    inStock: boolean
    quantity: number
    estimatedDelivery: string
  }
  warranty: {
    duration: string
    coverage: string[]
  }
  dimensions: {
    weight: string
    size: string
  }
  gallery: string[]
}

const sampleProduct: ProductDetails = {
  id: "1",
  name: "Quantum Earbuds Pro",
  price: 299.99,
  originalPrice: 399.99,
  image: "/products/quantum-earbuds.png",
  category: "Audio",
  rating: 4.8,
  reviews: 1247,
  inStock: true,
  featured: true,
  discount: 25,
  longDescription:
    "Experience the future of audio with our revolutionary Quantum Earbuds Pro. Featuring advanced noise cancellation, spatial audio, and quantum-enhanced drivers that deliver unprecedented sound quality. These earbuds adapt to your environment and preferences using AI-powered audio optimization.",
  specifications: {
    "Driver Size": "12mm Quantum Enhanced",
    "Frequency Response": "5Hz - 40kHz",
    "Battery Life": "8 hours + 32 hours case",
    Charging: "USB-C + Wireless",
    "Water Resistance": "IPX7",
    Connectivity: "Bluetooth 5.3, USB-C",
    Weight: "5.2g per earbud",
    "Noise Cancellation": "Active + Adaptive",
    "Spatial Audio": "360° Immersive",
    "Voice Assistant": "Built-in AI",
  },
  reviews: [
    {
      id: "1",
      user: "Alex Chen",
      rating: 5,
      comment:
        "Absolutely incredible sound quality! The quantum enhancement really makes a difference. Best earbuds I've ever owned.",
      date: "2024-01-15",
      verified: true,
    },
    {
      id: "2",
      user: "Sarah Johnson",
      rating: 5,
      comment: "The noise cancellation is phenomenal. I can focus completely in noisy environments. Worth every penny!",
      date: "2024-01-12",
      verified: true,
    },
    {
      id: "3",
      user: "Mike Rodriguez",
      rating: 4,
      comment:
        "Great earbuds overall. The spatial audio feature is amazing for movies and games. Battery life is excellent.",
      date: "2024-01-10",
      verified: true,
    },
  ],
  relatedProducts: [
    {
      id: "2",
      name: "SmartWatch X",
      price: 399.99,
      image: "/products/smartwatch-x.png",
      category: "Wearables",
      rating: 4.6,
      reviews: 892,
      inStock: true,
      featured: false,
    },
    {
      id: "3",
      name: "HoloVision Webcam",
      price: 199.99,
      image: "/products/holovision-webcam.png",
      category: "Cameras",
      rating: 4.7,
      reviews: 634,
      inStock: true,
      featured: true,
    },
  ],
  availability: {
    inStock: true,
    quantity: 47,
    estimatedDelivery: "2-3 business days",
  },
  warranty: {
    duration: "2 years",
    coverage: ["Manufacturing defects", "Battery degradation", "Water damage", "Accidental drops"],
  },
  dimensions: {
    weight: "5.2g per earbud",
    size: "2.1 x 1.8 x 2.4 cm",
  },
  gallery: [
    "/products/quantum-earbuds.png",
    "/products/quantum-earbuds-case.png",
    "/products/quantum-earbuds-colors.png",
    "/products/quantum-earbuds-lifestyle.png",
  ],
}

export default function ProductDetailsPage() {
  const params = useParams()
  const [product, setProduct] = useState<ProductDetails>(sampleProduct)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)
  const [is360Open, setIs360Open] = useState(false)
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false)
  const [isHologramActive, setIsHologramActive] = useState(false)
  const [selectedColor, setSelectedColor] = useState("Midnight Black")
  const [selectedVariant, setSelectedVariant] = useState("Standard")

  const colors = ["Midnight Black", "Pearl White", "Ocean Blue", "Rose Gold", "Space Gray"]
  const variants = ["Standard", "Pro", "Max"]

  const handleAddToCart = () => {
    console.log("Added to cart:", { product: product.id, quantity, color: selectedColor, variant: selectedVariant })
  }

  const handleBuyNow = () => {
    console.log("Buy now:", { product: product.id, quantity, color: selectedColor, variant: selectedVariant })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-slate-300">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span>Products</span>
          <ChevronRight className="w-4 h-4" />
          <span>{product.category}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                  <img
                    src={product.gallery[selectedImage] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Hologram Toggle */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-4 right-4 bg-black/50 border-white/20 text-white hover:bg-white/10"
                    onClick={() => setIsHologramActive(!isHologramActive)}
                  >
                    <Zap className={`w-4 h-4 mr-2 ${isHologramActive ? "text-blue-400" : ""}`} />
                    {isHologramActive ? "Hologram ON" : "Hologram OFF"}
                  </Button>

                  {/* 360 View Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-4 left-4 bg-black/50 border-white/20 text-white hover:bg-white/10"
                    onClick={() => setIs360Open(true)}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    360° View
                  </Button>

                  {/* AR View Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute bottom-4 right-4 bg-black/50 border-white/20 text-white hover:bg-white/10"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    AR View
                  </Button>

                  {/* Navigation Arrows */}
                  {product.gallery.length > 1 && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-white/10"
                        onClick={() =>
                          setSelectedImage(selectedImage > 0 ? selectedImage - 1 : product.gallery.length - 1)
                        }
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 border-white/20 text-white hover:bg-white/10"
                        onClick={() =>
                          setSelectedImage(selectedImage < product.gallery.length - 1 ? selectedImage + 1 : 0)
                        }
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex space-x-2 overflow-x-auto">
                  {product.gallery.map((image, index) => (
                    <button
                      key={index}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? "border-blue-400" : "border-slate-600"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                className="flex-1 bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                onClick={() => setIsComparisonOpen(true)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Compare
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                onClick={() => setIsCustomizerOpen(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Customize
              </Button>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                  {product.category}
                </Badge>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="text-slate-300 hover:text-white"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                  <span className="text-slate-300 ml-2">{product.rating}</span>
                </div>
                <span className="text-slate-400">({product.reviews.toLocaleString()} reviews)</span>
                <Badge variant="outline" className="border-green-500/50 text-green-400">
                  <Award className="w-3 h-3 mr-1" />
                  Best Seller
                </Badge>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-white">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-slate-400 line-through">${product.originalPrice}</span>
                    <Badge variant="destructive" className="bg-red-500/20 text-red-400">
                      {product.discount}% OFF
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-slate-300 leading-relaxed mb-6">{product.longDescription}</p>
            </div>

            {/* Availability */}
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-medium">In Stock</span>
                    <span className="text-slate-300">({product.availability.quantity} available)</span>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-300">
                    <Truck className="w-4 h-4" />
                    <span>{product.availability.estimatedDelivery}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Selection */}
            <div className="space-y-3">
              <span className="text-white font-medium">Color: {selectedColor}</span>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    className={`w-12 h-12 rounded-full border-2 ${
                      selectedColor === color ? "border-blue-400" : "border-slate-600"
                    } ${
                      color === "Midnight Black"
                        ? "bg-black"
                        : color === "Pearl White"
                          ? "bg-white"
                          : color === "Ocean Blue"
                            ? "bg-blue-500"
                            : color === "Rose Gold"
                              ? "bg-rose-400"
                              : "bg-gray-500"
                    }`}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Variant Selection */}
            <div className="space-y-3">
              <span className="text-white font-medium">Variant: {selectedVariant}</span>
              <div className="flex space-x-2">
                {variants.map((variant) => (
                  <Button
                    key={variant}
                    variant={selectedVariant === variant ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedVariant(variant)}
                    className={
                      selectedVariant === variant
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                    }
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <span className="text-white font-medium">Quantity</span>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-white font-medium w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleBuyNow}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
              >
                Buy Now - ${(product.price * quantity).toFixed(2)}
              </Button>
              <Button
                variant="outline"
                onClick={handleAddToCart}
                className="w-full bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50 py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Warranty & Security */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <p className="text-sm text-blue-300 font-medium">{product.warranty.duration} Warranty</p>
                  <p className="text-xs text-slate-400">Full Coverage</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
                <CardContent className="p-4 text-center">
                  <Truck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-sm text-green-300 font-medium">Free Shipping</p>
                  <p className="text-xs text-slate-400">Orders over $200</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <Tabs defaultValue="specifications" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
                <TabsTrigger value="specifications" className="data-[state=active]:bg-blue-600">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-blue-600">
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="warranty" className="data-[state=active]:bg-blue-600">
                  Warranty
                </TabsTrigger>
                <TabsTrigger value="shipping" className="data-[state=active]:bg-blue-600">
                  Shipping
                </TabsTrigger>
              </TabsList>

              <TabsContent value="specifications" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-slate-800/30 rounded-lg">
                      <span className="text-slate-300 font-medium">{key}</span>
                      <span className="text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white">Customer Reviews</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center space-x-1">{renderStars(product.rating)}</div>
                        <span className="text-white font-medium">{product.rating} out of 5</span>
                        <span className="text-slate-400">({product.reviews.length} reviews)</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                    >
                      Write a Review
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {product.reviews.map((review) => (
                      <Card key={review.id} className="bg-slate-800/30 border-slate-700/30">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-white">{review.user}</span>
                              {review.verified && (
                                <span className="border-green-500/50 text-green-400 text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Verified
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-slate-400">{review.date}</span>
                          </div>
                          <div className="flex items-center space-x-1 mb-2">{renderStars(review.rating)}</div>
                          <p className="text-slate-300">{review.comment}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="warranty" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-8 h-8 text-blue-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {product.warranty.duration} Comprehensive Warranty
                      </h3>
                      <p className="text-slate-300">Complete protection for your investment</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.warranty.coverage.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 bg-slate-800/30 rounded-lg">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shipping" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Truck className="w-8 h-8 text-green-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Shipping Information</h3>
                      <p className="text-slate-300">Fast and secure delivery options</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-slate-800/30 border-slate-700/30">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-white mb-2">Standard Shipping</h4>
                        <p className="text-slate-300 text-sm mb-2">5-7 business days</p>
                        <p className="text-green-400 font-medium">FREE on orders over $200</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-800/30 border-slate-700/30">
                      <CardContent className="p-4">
                        <h4 className="font-medium text-white mb-2">Express Shipping</h4>
                        <p className="text-slate-300 text-sm mb-2">2-3 business days</p>
                        <p className="text-blue-400 font-medium">$19.99</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.relatedProducts.map((relatedProduct) => (
              <HolographicProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ProductComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        products={[product, ...product.relatedProducts]}
      />

      <Product360Modal isOpen={is360Open} onClose={() => setIs360Open(false)} product={product} />

      <HolographicProductCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
        product={product}
      />
    </div>
  )
}
