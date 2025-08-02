"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Zap } from "lucide-react"

export default function DAX2035Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Elite Header Skeleton */}
      <div className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center animate-pulse">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    DAX 2035
                  </h1>
                  <p className="text-xs text-slate-400">Loading Elite Platform...</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Skeleton className="h-4 w-16 bg-slate-700" />
                <Skeleton className="h-4 w-24 bg-slate-700" />
                <Skeleton className="h-4 w-20 bg-slate-700" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-64 bg-slate-700" />
              <Skeleton className="h-8 w-24 bg-slate-700" />
              <Skeleton className="h-8 w-8 bg-slate-700" />
              <Skeleton className="h-8 w-8 bg-slate-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Elite Market Indices Skeleton */}
        <div className="mb-6">
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card
                key={i}
                className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl animate-pulse"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      <Skeleton className="h-4 w-12 bg-slate-700" />
                    </div>
                    <Skeleton className="h-5 w-16 bg-slate-700" />
                  </div>
                  <div className="space-y-1">
                    <Skeleton className="h-8 w-24 bg-slate-700" />
                    <Skeleton className="h-4 w-16 bg-slate-700" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Trading Area Skeleton */}
          <div className="col-span-9">
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-32 bg-slate-700" />
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm text-green-400">Connecting...</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-2 mb-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <Skeleton key={i} className="h-10 bg-slate-700" />
                    ))}
                  </div>
                  <Skeleton className="h-96 w-full bg-slate-700" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Elite Sidebar Skeleton */}
          <div className="col-span-3 space-y-6">
            {/* Top Movers Skeleton */}
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-24 bg-slate-700" />
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/30">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="w-8 h-8 rounded-full bg-slate-700" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-12 bg-slate-700" />
                          <Skeleton className="h-3 w-20 bg-slate-700" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-16 bg-slate-700" />
                        <Skeleton className="h-3 w-12 bg-slate-700" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Watchlist Skeleton */}
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-24 bg-slate-700" />
                    <Skeleton className="h-5 w-16 bg-slate-700" />
                  </div>
                  <Skeleton className="h-8 w-full bg-slate-700" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-16 w-full bg-slate-700" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Status Skeleton */}
            <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-24 bg-slate-700" />
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <Skeleton className="h-4 w-20 bg-slate-700" />
                      <Skeleton className="h-4 w-16 bg-slate-700" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Elite Status Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50 px-6 py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-yellow-400">Connecting...</span>
            </div>
            <Skeleton className="h-4 w-32 bg-slate-700" />
            <Skeleton className="h-4 w-20 bg-slate-700" />
          </div>
          <div className="flex items-center space-x-6">
            <Skeleton className="h-4 w-40 bg-slate-700" />
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-blue-400 animate-pulse" />
              <span className="text-blue-400">Initializing Elite Mode...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
