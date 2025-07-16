import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MarketplaceLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-10 w-80 mb-2" />
            <Skeleton className="h-6 w-96" />
          </div>
          <div className="flex gap-4">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>

        {/* Stats Overview Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card
              key={i}
              className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-4 w-16 mt-2" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs Skeleton */}
        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="products" disabled>
              <Skeleton className="h-5 w-20" />
            </TabsTrigger>
            <TabsTrigger value="vendors" disabled>
              <Skeleton className="h-5 w-20" />
            </TabsTrigger>
            <TabsTrigger value="orders" disabled>
              <Skeleton className="h-5 w-20" />
            </TabsTrigger>
            <TabsTrigger value="analytics" disabled>
              <Skeleton className="h-5 w-20" />
            </TabsTrigger>
            <TabsTrigger value="settings" disabled>
              <Skeleton className="h-5 w-20" />
            </TabsTrigger>
          </TabsList>

          {/* Products Content Skeleton */}
          <div className="space-y-6">
            {/* Search and Filters Skeleton */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <Skeleton className="h-10 w-full max-w-md rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-9 w-9 rounded-md" />
                <Skeleton className="h-9 w-9 rounded-md" />
              </div>
            </div>

            {/* Category Filter Skeleton */}
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-9 w-28 rounded-md" />
              ))}
            </div>

            {/* Products Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card
                  key={i}
                  className="bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm border-white/20"
                >
                  <Skeleton className="w-full h-48 rounded-t-lg" />
                  <CardContent className="p-4 space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-9 w-28 rounded-md" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
