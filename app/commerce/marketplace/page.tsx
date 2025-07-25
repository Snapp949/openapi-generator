"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Star, TrendingUp, Package, Users, BarChart3, Grid3X3, List } from "lucide-react"
import type { Product } from "@/types/product"
import HolographicProductCard from "@/components/HolographicProductCard" // Declare the variable here

export default function MarketplacePage() {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = React.useState("all")

  const categories = [
    { id: "all", name: "All Products", count: 1247 },
    { id: "electronics", name: "Electronics", count: 342 },
    { id: "fashion", name: "Fashion", count: 189 },
    { id: "home", name: "Home & Garden", count: 156 },
    { id: "sports", name: "Sports & Outdoors", count: 98 },
    { id: "books", name: "Books & Media", count: 76 },
    { id: "health", name: "Health & Beauty", count: 134 },
    { id: "holographic", name: "Holographic", count: 5 }, // New category
  ]

  const products: Product[] = [
    {
      id: "1",
      name: "Quantum Earbuds Pro",
      price: 299,
      rating: 4.8,
      stock: 120,
      image: "/products/quantum-earbuds.png",
      category: "electronics",
      platforms: ["iOS", "Android", "PC"],
      description: "Immersive audio experience with active noise cancellation.",
    },
    {
      id: "2",
      name: "SmartWatch X Series",
      price: 449,
      rating: 4.6,
      stock: 80,
      image: "/products/smartwatch-x.png",
      category: "electronics",
      platforms: ["iOS", "Android"],
      description: "Advanced health tracking and smart notifications on your wrist.",
    },
    {
      id: "3",
      name: "HoloVision Webcam",
      price: 199,
      rating: 4.7,
      stock: 60,
      image: "/products/holovision-webcam.png",
      category: "electronics",
      platforms: ["PC", "Mac"],
      description: "Crystal clear video calls with holographic projection capabilities.",
    },
    {
      id: "4",
      name: "Mechanical Gaming Keyboard",
      price: 159,
      rating: 4.9,
      stock: 150,
      image: "/products/mechanical-keyboard.png",
      category: "electronics",
      platforms: ["PC"],
      description: "Responsive mechanical keys for ultimate gaming performance.",
    },
    {
      id: "5",
      name: "Holo-Gaming Mouse",
      price: 99,
      rating: 4.5,
      stock: 90,
      image: "/products/holo-gaming-mouse.png",
      category: "electronics",
      platforms: ["PC"],
      description: "Ergonomic design with customizable holographic lighting.",
    },
    {
      id: "6",
      name: "Bluetooth Speaker X",
      price: 129,
      rating: 4.3,
      stock: 200,
      image: "/products/bluetooth-speaker.png",
      category: "electronics",
      platforms: ["iOS", "Android"],
      description: "Portable speaker with powerful sound and long battery life.",
    },
    {
      id: "7",
      name: "USB-C Hub Pro",
      price: 79,
      rating: 4.7,
      stock: 180,
      image: "/products/usb-c-hub.png",
      category: "electronics",
      platforms: ["PC", "Mac", "Tablet"],
      description: "Expand your device's connectivity with multiple ports.",
    },
    {
      id: "8",
      name: "Noise-Cancelling Headphones",
      price: 249,
      rating: 4.8,
      stock: 100,
      image: "/products/noise-cancelling-headphones.png",
      category: "electronics",
      platforms: ["iOS", "Android", "PC"],
      description: "Immerse yourself in music with superior noise cancellation.",
    },
    {
      id: "9",
      name: "Portable SSD 1TB",
      price: 179,
      rating: 4.6,
      stock: 70,
      image: "/products/portable-ssd.png",
      category: "electronics",
      platforms: ["PC", "Mac", "Console"],
      description: "Fast and reliable external storage for all your files.",
    },
    {
      id: "10",
      name: "Wireless Charging Pad",
      price: 49,
      rating: 4.2,
      stock: 250,
      image: "/products/wireless-charging-pad.png",
      category: "electronics",
      platforms: ["iOS", "Android"],
      description: "Convenient and fast wireless charging for your devices.",
    },
    {
      id: "11",
      name: "Smart Home Hub",
      price: 199,
      rating: 4.7,
      stock: 50,
      image: "/products/smart-home-hub.png",
      category: "electronics",
      platforms: ["iOS", "Android"],
      description: "Centralize control of all your smart home devices.",
    },
    {
      id: "12",
      name: "Gaming Controller Pro",
      price: 89,
      rating: 4.5,
      stock: 110,
      image: "/products/gaming-controller.png",
      category: "electronics",
      platforms: ["PC", "Console"],
      description: "Precision control and immersive feedback for gaming.",
    },
    {
      id: "13",
      name: "Holographic Projector",
      price: 1200,
      rating: 4.9,
      stock: 25,
      image: "/products/holographic-projector.png",
      category: "holographic",
      platforms: ["PC", "Mac", "Standalone"],
      isHolographic: true,
      holographicFeatures: ["True 3D Projection", "Interactive Gestures", "Spatial Audio"],
      has360View: true,
      description: "Experience true 3D holographic projections in your living room.",
      customizationOptions: {
        colors: [
          { name: "Blue", hex: "#007bff", imageSuffix: "-blue" },
          { name: "Red", hex: "#dc3545", imageSuffix: "-red" },
          { name: "Green", hex: "#28a745", imageSuffix: "-green" },
        ],
        engraving: true,
      },
    },
    {
      id: "14",
      name: "Holographic Smart Glasses",
      price: 800,
      rating: 4.7,
      stock: 40,
      image: "/products/holographic-smart-glasses.png",
      category: "holographic",
      platforms: ["iOS", "Android"],
      isHolographic: true,
      holographicFeatures: ["AR Overlay", "Voice Control", "Eye Tracking"],
      has360View: true,
      description: "Augmented reality glasses for seamless digital interaction.",
      customizationOptions: {
        colors: [
          { name: "Black", hex: "#000000", imageSuffix: "-black" },
          { name: "Silver", hex: "#C0C0C0", imageSuffix: "-silver" },
        ],
      },
    },
    {
      id: "15",
      name: "Holographic Drone",
      price: 600,
      rating: 4.6,
      stock: 30,
      image: "/products/holographic-drone.png",
      category: "holographic",
      platforms: ["iOS", "Android", "Remote"],
      isHolographic: true,
      holographicFeatures: ["Flight Path Projection", "Object Recognition", "Live Hologram Feed"],
      has360View: true,
      description: "A drone that projects interactive holograms in the sky.",
      customizationOptions: {
        colors: [
          { name: "Default", hex: "#6366F1", imageSuffix: "" }, // Default image
          { name: "Blue", hex: "#3B82F6", imageSuffix: "-blue" },
          { name: "Red", hex: "#EF4444", imageSuffix: "-red" },
          { name: "Green", hex: "#22C55E", imageSuffix: "-green" },
        ],
        engraving: true,
      },
    },
  ]

  const marketplaceStats = [
    { title: "Total Products", value: "1,247", change: "+12%", icon: Package, color: "text-blue-500" },
    { title: "Active Vendors", value: "89", change: "+8%", icon: Users, color: "text-green-500" },
    { title: "Monthly Sales", value: "$2.4M", change: "+15%", icon: TrendingUp, color: "text-purple-500" },
    { title: "Customer Rating", value: "4.8", change: "+0.2", icon: Star, color: "text-orange-500" },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Marketplace Analytics
            </h1>
            <p className="text-xl text-muted-foreground mt-2">
              Comprehensive marketplace insights and vendor management
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Package className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceStats.map((stat, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products..." className="pl-9 bg-background/50 border-white/20" />
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {category.name}
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredProducts.map((product) => (
                <HolographicProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vendors" className="space-y-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Vendor Management</CardTitle>
                <CardDescription>Manage marketplace vendors and their performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "TechGear Pro", products: 45, sales: "$124K", rating: 4.8, status: "Active" },
                    { name: "Fashion Forward", products: 32, sales: "$89K", rating: 4.6, status: "Active" },
                    { name: "Home Essentials", products: 28, sales: "$67K", rating: 4.7, status: "Pending" },
                    { name: "Sports Central", products: 19, sales: "$45K", rating: 4.5, status: "Active" },
                  ].map((vendor, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{vendor.name}</h4>
                          <p className="text-sm text-muted-foreground">{vendor.products} products</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{vendor.sales}</p>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{vendor.rating}</span>
                        </div>
                      </div>
                      <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>{vendor.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
                <CardDescription>Track and manage customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { id: "#ORD-001", customer: "John Doe", amount: "$299", status: "Delivered", date: "2024-01-15" },
                    { id: "#ORD-002", customer: "Jane Smith", amount: "$449", status: "Shipped", date: "2024-01-14" },
                    {
                      id: "#ORD-003",
                      customer: "Mike Johnson",
                      amount: "$199",
                      status: "Processing",
                      date: "2024-01-13",
                    },
                    { id: "#ORD-004", customer: "Sarah Wilson", amount: "$159", status: "Pending", date: "2024-01-12" },
                  ].map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-500/10 flex items-center justify-center">
                          <Package className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium">{order.id}</h4>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.amount}</p>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                      </div>
                      <Badge
                        variant={
                          order.status === "Delivered"
                            ? "default"
                            : order.status === "Shipped"
                              ? "secondary"
                              : order.status === "Processing"
                                ? "outline"
                                : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Sales Analytics</CardTitle>
                  <CardDescription>Revenue and sales performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-4 text-blue-400" />
                      <p className="text-muted-foreground">Sales Chart Placeholder</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Top Categories</CardTitle>
                  <CardDescription>Best performing product categories</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Electronics", sales: "$847K", growth: "+15%" },
                    { name: "Fashion", sales: "$623K", growth: "+12%" },
                    { name: "Home & Garden", sales: "$445K", growth: "+8%" },
                    { name: "Sports", sales: "$289K", growth: "+22%" },
                  ].map((category, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      <div className="text-right">
                        <span className="font-medium">{category.sales}</span>
                        <span className="text-sm text-green-500 ml-2">{category.growth}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Marketplace Settings</CardTitle>
                  <CardDescription>Configure marketplace parameters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Commission Rate (%)</label>
                    <Input type="number" placeholder="5.0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minimum Order Value</label>
                    <Input type="number" placeholder="25" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Featured Product Slots</label>
                    <Input type="number" placeholder="12" />
                  </div>
                  <Button className="w-full">Save Settings</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle>Payment Settings</CardTitle>
                  <CardDescription>Configure payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Credit Cards</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PayPal</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Crypto Payments</span>
                    <Badge variant="secondary">Disabled</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Buy Now Pay Later</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <Button className="w-full">Update Payment Methods</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
