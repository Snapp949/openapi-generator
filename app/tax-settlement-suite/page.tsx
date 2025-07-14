import { Suspense } from "react"
import { TaxSettlementDashboard } from "./TaxSettlementDashboard"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

function TaxSettlementLoading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-6 w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </Card>
        ))}
      </div>
    </div>
  )
}

export default function TaxSettlementSuitePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
      <Suspense fallback={<TaxSettlementLoading />}>
        <TaxSettlementDashboard />
      </Suspense>
    </div>
  )
}
