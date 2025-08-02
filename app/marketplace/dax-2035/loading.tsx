export default function DAX2035Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Elite Header Skeleton */}
      <div className="border-b border-slate-800/50 bg-slate-900/30 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-slate-800/50 rounded animate-pulse" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse" />
                <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse" />
                <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="h-9 w-64 bg-slate-800/50 rounded animate-pulse" />
              <div className="h-9 w-24 bg-slate-800/50 rounded animate-pulse" />
              <div className="h-9 w-9 bg-slate-800/50 rounded animate-pulse" />
              <div className="h-9 w-9 bg-slate-800/50 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        {/* Elite Indices Skeleton */}
        <div className="mb-6">
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/30 backdrop-blur-xl rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400/50 rounded-full animate-pulse" />
                    <div className="h-4 w-12 bg-slate-700/50 rounded animate-pulse" />
                  </div>
                  <div className="h-6 w-16 bg-slate-700/50 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  <div className="h-8 w-32 bg-slate-700/50 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-slate-800/50 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Main Content Skeleton */}
          <div className="col-span-9">
            <div className="space-y-6">
              {/* Tabs Skeleton */}
              <div className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-lg p-1">
                <div className="grid grid-cols-6 gap-1">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-10 bg-slate-700/50 rounded animate-pulse" />
                  ))}
                </div>
              </div>

              {/* Chart Area Skeleton */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/30 backdrop-blur-xl rounded-lg p-6">
                  <div className="h-6 w-32 bg-slate-700/50 rounded mb-4 animate-pulse" />
                  <div className="h-64 bg-slate-800/50 rounded animate-pulse" />
                </div>
                <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/30 backdrop-blur-xl rounded-lg p-6">
                  <div className="h-6 w-32 bg-slate-700/50 rounded mb-4 animate-pulse" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-slate-700/50 rounded-full animate-pulse" />
                          <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse" />
                          <div className="h-3 w-12 bg-slate-800/50 rounded animate-pulse" />
                        </div>
                        <div className="h-6 w-16 bg-slate-700/50 rounded animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Analytics Cards Skeleton */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/30 backdrop-blur-xl rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-3 w-16 bg-slate-700/50 rounded animate-pulse" />
                        <div className="h-8 w-20 bg-slate-700/50 rounded animate-pulse" />
                        <div className="h-3 w-12 bg-slate-700/50 rounded animate-pulse" />
                      </div>
                      <div className="w-8 h-8 bg-slate-700/50 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="col-span-3 space-y-6">
            {/* Top Movers Skeleton */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/30 backdrop-blur-xl rounded-lg">
              <div className="p-4 border-b border-slate-700/30">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse" />
                  <div className="h-4 w-12 bg-slate-700/50 rounded animate-pulse" />
                </div>
              </div>
              <div className="p-4 space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="space-y-1">
                      <div className="h-4 w-12 bg-slate-700/50 rounded animate-pulse" />
                      <div className="h-3 w-20 bg-slate-800/50 rounded animate-pulse" />
                      <div className="h-3 w-16 bg-slate-800/50 rounded animate-pulse" />
                    </div>
                    <div className="text-right space-y-1">
                      <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse" />
                      <div className="h-3 w-12 bg-slate-700/50 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Watchlist Skeleton */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/30 backdrop-blur-xl rounded-lg">
              <div className="p-4 border-b border-slate-700/30">
                <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse" />
              </div>
              <div className="p-4 space-y-4">
                <div className="flex space-x-2">
                  <div className="flex-1 h-9 bg-slate-800/50 rounded animate-pulse" />
                  <div className="w-9 h-9 bg-slate-800/50 rounded animate-pulse" />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-4 w-12 bg-slate-700/50 rounded animate-pulse" />
                        <div className="h-4 w-8 bg-slate-700/50 rounded animate-pulse" />
                      </div>
                      <div className="h-3 w-20 bg-slate-800/50 rounded animate-pulse mb-2" />
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse" />
                          <div className="h-3 w-12 bg-slate-700/50 rounded animate-pulse" />
                        </div>
                        <div className="h-3 w-16 bg-slate-800/50 rounded animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Status Skeleton */}
            <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/30 backdrop-blur-xl rounded-lg">
              <div className="p-4 border-b border-slate-700/30">
                <div className="h-6 w-24 bg-slate-700/50 rounded animate-pulse" />
              </div>
              <div className="p-4 space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse" />
                    <div className="h-4 w-16 bg-slate-700/50 rounded animate-pulse" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800/50 px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="h-4 w-20 bg-slate-700/50 rounded animate-pulse" />
            <div className="h-4 w-32 bg-slate-700/50 rounded animate-pulse" />
            <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse" />
          </div>
          <div className="flex items-center space-x-6">
            <div className="h-4 w-40 bg-slate-700/50 rounded animate-pulse" />
            <div className="h-4 w-24 bg-slate-700/50 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-xl rounded-lg p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Initializing DAX 2035</h3>
          <p className="text-slate-400 mb-4">Connecting to elite trading systems...</p>
          <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"
              style={{ width: "75%" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
