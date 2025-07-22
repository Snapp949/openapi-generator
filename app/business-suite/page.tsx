"use client"

import { Suspense } from "react"
import { BusinessSuiteDashboard } from "./BusinessSuiteDashboard"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

function BusinessSuiteLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-slate-300">Loading Business Suite...</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default function BusinessSuitePage() {
  return (
    <Suspense fallback={<BusinessSuiteLoading />}>
      <BusinessSuiteDashboard />
    </Suspense>
  )
}
