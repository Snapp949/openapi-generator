"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { X, ShoppingCart, Type, Palette, Check } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import ImageIcon from "@/components/ui/image-icon" // Added import for ImageIcon
import type { Product } from "@/types/product"

interface HolographicProductCustomizerModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
}

export function HolographicProductCustomizerModal({
  isOpen,
  onClose,
  product,
}: HolographicProductCustomizerModalProps) {
  const [selectedColor, setSelectedColor] = React.useState(product.customizationOptions?.colors?.[0] || null)
  const [engravingText, setEngravingText] = React.useState("")
  const [imageError, setImageError] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      setSelectedColor(product.customizationOptions?.colors?.[0] || null)
      setEngravingText("")
      setImageError(false)
    }
  }, [isOpen, product])

  const getProductImageSrc = () => {
    if (selectedColor && product.image) {
      const baseName = product.image.split(".")[0]
      const extension = product.image.split(".").pop()
      return `${baseName}${selectedColor.imageSuffix}.${extension}`
    }
    return product.image || "/placeholder.svg"
  }

  const handleAddToCart = () => {
    // In a real application, you would send the customized product details to the cart
    console.log("Adding customized product to cart:", {
      productId: product.id,
      selectedColor: selectedColor?.name,
      engravingText,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh] bg-gradient-to-br from-indigo-950/95 via-purple-950/95 to-cyan-950/95 backdrop-blur-xl border-indigo-500/20 flex flex-col">
        <DialogHeader className="relative pb-4">
          <DialogTitle className="text-2xl font-bold text-transparent bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text">
            Customize Your {product.name}
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex flex-1 gap-6 overflow-hidden">
          {/* Product Preview Area */}
          <div className="flex-1 relative flex items-center justify-center bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-lg overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center">
              {!imageError ? (
                <Image
                  src={getProductImageSrc() || "/placeholder.svg"}
                  alt={product.name}
                  width={500}
                  height={500}
                  className="object-contain transition-all duration-300"
                  onError={() => setImageError(true)}
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-800/30 to-purple-800/30">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 text-indigo-400/50 mx-auto mb-2" />
                    <p className="text-xs text-indigo-300/70">Product Image Unavailable</p>
                  </div>
                </div>
              )}

              {/* Engraving Overlay */}
              {product.customizationOptions?.engraving && engravingText && (
                <motion.div
                  className="absolute text-white font-bold text-2xl pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    textShadow: "0 0 8px rgba(34,211,238,0.6), 0 0 15px rgba(168,85,247,0.6)",
                    // You might need to adjust position based on product image
                    top: "70%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {engravingText}
                </motion.div>
              )}
            </div>
          </div>

          {/* Customization Options Panel */}
          <div className="w-96 space-y-6 overflow-y-auto pr-2">
            <Card className="bg-indigo-950/30 border-indigo-500/20">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                <p className="text-indigo-200/70 text-sm">{product.description}</p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-3xl font-bold ${
                      product.isHolographic
                        ? "text-transparent bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text"
                        : "text-white"
                    }`}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge className="bg-emerald-600 text-white">{product.stock} in stock</Badge>
                </div>

                {/* Color Options */}
                {product.customizationOptions?.colors && (
                  <div>
                    <Label className="text-indigo-300 flex items-center mb-2">
                      <Palette className="w-4 h-4 mr-2" />
                      Choose Color:
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {product.customizationOptions.colors.map((color) => (
                        <Button
                          key={color.name}
                          variant="outline"
                          size="icon"
                          className={`w-8 h-8 rounded-full border-2 ${
                            selectedColor?.name === color.name
                              ? "border-cyan-400 ring-2 ring-cyan-400"
                              : "border-indigo-500/30"
                          }`}
                          style={{ backgroundColor: color.hex }}
                          onClick={() => setSelectedColor(color)}
                        >
                          {selectedColor?.name === color.name && <Check className="w-4 h-4 text-white" />}
                          <span className="sr-only">{color.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Engraving Option */}
                {product.customizationOptions?.engraving && (
                  <div>
                    <Label htmlFor="engraving" className="text-indigo-300 flex items-center mb-2">
                      <Type className="w-4 h-4 mr-2" />
                      Engraving Text (Optional):
                    </Label>
                    <Input
                      id="engraving"
                      placeholder="Enter text for engraving"
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value)}
                      maxLength={20}
                      className="bg-indigo-900/50 border-indigo-500/30 text-white placeholder:text-indigo-300/70"
                    />
                    <p className="text-xs text-indigo-300/50 mt-1">Max 20 characters</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 pt-4">
                  <Button
                    className={`w-full text-white ${
                      product.isHolographic
                        ? "bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-700 hover:via-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-cyan-500/25"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/25"
                    }`}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add Customized to Cart
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-indigo-500/20 text-indigo-300 hover:bg-indigo-900/30 bg-transparent"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
