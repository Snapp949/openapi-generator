"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useProductComparison } from "@/contexts/product-comparison-context"
import { ProductComparisonModal } from "./product-comparison-modal"
import { useState } from "react"
import Image from "next/image"

export function ComparisonBar() {
  const { comparisonProducts, removeFromComparison, clearComparison } = useProductComparison()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (comparisonProducts.length === 0) {
    return null
  }

  return (
    <>
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-900/90 via-purple-900/90 to-cyan-900/90 backdrop-blur-md border-t border-indigo-700/30 shadow-lg"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-indigo-200 font-semibold text-sm flex-shrink-0">
              Compare ({comparisonProducts.length}):
            </span>
            <AnimatePresence initial={false}>
              {comparisonProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="relative flex items-center gap-2 bg-indigo-800/50 rounded-full pr-3 py-1 pl-1 border border-indigo-600/50 flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <span className="text-indigo-100 text-xs font-medium line-clamp-1">{product.name}</span>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => removeFromComparison(product.id)}
                    className="h-5 w-5 text-indigo-300 hover:text-red-300 hover:bg-red-900/20 rounded-full"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Compare Now
            </Button>
            <Button
              variant="outline"
              onClick={clearComparison}
              className="border-red-500/20 bg-red-950/30 text-red-300 hover:bg-red-900/30"
            >
              Clear All
            </Button>
          </div>
        </div>
      </motion.div>
      <ProductComparisonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
