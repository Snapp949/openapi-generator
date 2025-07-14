"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Database,
  Zap,
  Shield,
  TrendingUp,
  Building,
  CreditCard,
  ShoppingBag,
  Briefcase,
  Scale,
  Wifi,
  WifiOff,
} from "lucide-react"
import { useEcosystem } from "@/contexts/ecosystem-context"
import { motion, AnimatePresence } from "framer-motion"

interface SyncStatus {
  platform: string
  name: string
  icon: React.ElementType
  status: "synced" | "syncing" | "error" | "offline"
  lastSync: string
  dataSize: string
  syncProgress: number
  errorMessage?: string
}

interface DataMetrics {
  totalRecords: number
  syncedRecords: number
  pendingSync: number
  errorCount: number
  lastFullSync: string
  syncFrequency: string
}

export function DataSyncManager() {
  const { syncData, lastSyncTime, isSyncing, crossPlatformData, addNotification } = useEcosystem()

  const [syncStatuses, setSyncStatuses] = useState<SyncStatus[]>([
    {
      platform: "credit-suite",
      name: "Credit Suite",
      icon: CreditCard,
      status: "synced",
      lastSync: "2 minutes ago",
      dataSize: "2.3 MB",
      syncProgress: 100,
    },
    {
      platform: "snap-dax",
      name: "SNAP-DAX Trading",
      icon: TrendingUp,
      status: "syncing",
      lastSync: "5 minutes ago",
      dataSize: "15.7 MB",
      syncProgress: 67,
    },
    {
      platform: "real-estate",
      name: "Real Estate Hub",
      icon: Building,
      status: "synced",
      lastSync: "1 minute ago",
      dataSize: "8.4 MB",
      syncProgress: 100,
    },
    {
      platform: "ecommerex",
      name: "EcommereX",
      icon: ShoppingBag,
      status: "error",
      lastSync: "10 minutes ago",
      dataSize: "5.2 MB",
      syncProgress: 45,
      errorMessage: "Connection timeout",
    },
    {
      platform: "business-suite",
      name: "Business Suite",
      icon: Briefcase,
      status: "synced",
      lastSync: "3 minutes ago",
      dataSize: "12.1 MB",
      syncProgress: 100,
    },
    {
      platform: "legal-compliance",
      name: "Legal & Compliance",
      icon: Scale,
      status: "offline",
      lastSync: "1 hour ago",
      dataSize: "1.8 MB",
      syncProgress: 0,
    },
  ])

  const [dataMetrics, setDataMetrics] = useState<DataMetrics>({
    totalRecords: 45672,
    syncedRecords: 43891,
    pendingSync: 1234,
    errorCount: 547,
    lastFullSync: "2024-01-15 14:30:00",
    syncFrequency: "Every 30 seconds",
  })

  const [isOnline, setIsOnline] = useState(true)
  const [autoSync, setAutoSync] = useState(true)

  // Simulate real-time sync updates
  useEffect(() => {
    if (!autoSync) return

    const interval = setInterval(() => {
      setSyncStatuses((prev) =>
        prev.map((status) => {
          if (status.status === "syncing") {
            const newProgress = Math.min(status.syncProgress + Math.random() * 10, 100)
            return {
              ...status,
              syncProgress: newProgress,
              status: newProgress >= 100 ? "synced" : "syncing",
              lastSync: newProgress >= 100 ? "Just now" : status.lastSync,
            }
          }
          return status
        }),
      )
    }, 2000)

    return () => clearInterval(interval)
  }, [autoSync])

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "synced":
        return "text-green-400"
      case "syncing":
        return "text-blue-400"
      case "error":
        return "text-red-400"
      case "offline":
        return "text-gray-400"
      default:
        return "text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return CheckCircle
      case "syncing":
        return RefreshCw
      case "error":
        return AlertCircle
      case "offline":
        return WifiOff
      default:
        return Clock
    }
  }

  const handleManualSync = async (platform?: string) => {
    if (platform) {
      setSyncStatuses((prev) =>
        prev.map((status) =>
          status.platform === platform ? { ...status, status: "syncing", syncProgress: 0 } : status,
        ),
      )
    } else {
      await syncData()
    }

    addNotification({
      title: "Sync Initiated",
      message: platform ? `Syncing ${platform} data...` : "Syncing all platform data...",
      type: "info",
      category: "system",
      read: false,
    })
  }

  const handleRetrySync = (platform: string) => {
    setSyncStatuses((prev) =>
      prev.map((status) =>
        status.platform === platform
          ? { ...status, status: "syncing", syncProgress: 0, errorMessage: undefined }
          : status,
      ),
    )
  }

  const syncedCount = syncStatuses.filter((s) => s.status === "synced").length
  const errorCount = syncStatuses.filter((s) => s.status === "error").length
  const syncingCount = syncStatuses.filter((s) => s.status === "syncing").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Data Synchronization</h2>
          <p className="text-muted-foreground">Manage cross-platform data sync and connectivity</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
            {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
            {isOnline ? "Online" : "Offline"}
          </Badge>
          <Button
            onClick={() => handleManualSync()}
            disabled={isSyncing || !isOnline}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isSyncing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
              </motion.div>
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Sync All
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/20">
                <CheckCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">{syncedCount}</div>
                <div className="text-sm text-muted-foreground">Synced</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/20">
                <RefreshCw className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">{syncingCount}</div>
                <div className="text-sm text-muted-foreground">Syncing</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-red-400">{errorCount}</div>
                <div className="text-sm text-muted-foreground">Errors</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-black/20 border-white/10">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/20">
                <Database className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {((dataMetrics.syncedRecords / dataMetrics.totalRecords) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-muted-foreground">Data Synced</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="platforms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-black/20 border-white/10">
          <TabsTrigger value="platforms">Platform Status</TabsTrigger>
          <TabsTrigger value="metrics">Data Metrics</TabsTrigger>
          <TabsTrigger value="settings">Sync Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="platforms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {syncStatuses.map((status) => {
              const StatusIcon = getStatusIcon(status.status)
              return (
                <Card key={status.platform} className="bg-black/20 border-white/10">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/10">
                          <status.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-sm">{status.name}</CardTitle>
                          <CardDescription className="text-xs">{status.dataSize}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`h-4 w-4 ${getStatusColor(status.status)}`} />
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            status.status === "synced"
                              ? "border-green-500/30 text-green-400"
                              : status.status === "error"
                                ? "border-red-500/30 text-red-400"
                                : status.status === "syncing"
                                  ? "border-blue-500/30 text-blue-400"
                                  : "border-gray-500/30 text-gray-400"
                          }`}
                        >
                          {status.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {status.status === "syncing" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Syncing...</span>
                          <span>{Math.round(status.syncProgress)}%</span>
                        </div>
                        <Progress value={status.syncProgress} className="h-2" />
                      </div>
                    )}

                    {status.errorMessage && (
                      <div className="p-2 rounded bg-red-500/20 border border-red-500/30">
                        <p className="text-xs text-red-400">{status.errorMessage}</p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">Last sync: {status.lastSync}</div>
                      <div className="flex items-center gap-1">
                        {status.status === "error" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRetrySync(status.platform)}
                            className="h-6 text-xs"
                          >
                            Retry
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleManualSync(status.platform)}
                          disabled={status.status === "syncing" || !isOnline}
                          className="h-6 text-xs"
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Records</span>
                    <span className="font-medium">{dataMetrics.totalRecords.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Synced Records</span>
                    <span className="font-medium text-green-400">{dataMetrics.syncedRecords.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pending Sync</span>
                    <span className="font-medium text-yellow-400">{dataMetrics.pendingSync.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Error Count</span>
                    <span className="font-medium text-red-400">{dataMetrics.errorCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Sync Progress</span>
                    <span>{((dataMetrics.syncedRecords / dataMetrics.totalRecords) * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={(dataMetrics.syncedRecords / dataMetrics.totalRecords) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Sync Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Last Full Sync</span>
                    <span className="font-medium">{dataMetrics.lastFullSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sync Frequency</span>
                    <span className="font-medium">{dataMetrics.syncFrequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Auto Sync</span>
                    <Badge variant={autoSync ? "default" : "secondary"}>{autoSync ? "Enabled" : "Disabled"}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Connection Status</span>
                    <Badge variant={isOnline ? "default" : "destructive"}>
                      {isOnline ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Activity */}
          <Card className="bg-black/20 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Real-time Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                <AnimatePresence>
                  {syncStatuses
                    .filter((s) => s.status === "syncing" || s.status === "synced")
                    .map((status) => (
                      <motion.div
                        key={status.platform}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center gap-3 p-2 rounded bg-white/5"
                      >
                        <status.icon className="h-4 w-4" />
                        <span className="text-sm flex-1">{status.name}</span>
                        <span className="text-xs text-muted-foreground">{status.lastSync}</span>
                        {status.status === "syncing" && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <RefreshCw className="h-3 w-3 text-blue-400" />
                          </motion.div>
                        )}
                        {status.status === "synced" && <CheckCircle className="h-3 w-3 text-green-400" />}
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Sync Preferences</CardTitle>
                <CardDescription>Configure how data synchronization works</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto Sync</div>
                    <div className="text-sm text-muted-foreground">Automatically sync data across platforms</div>
                  </div>
                  <Button variant={autoSync ? "default" : "outline"} size="sm" onClick={() => setAutoSync(!autoSync)}>
                    {autoSync ? "Enabled" : "Disabled"}
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Real-time Updates</div>
                    <div className="text-sm text-muted-foreground">Push updates immediately when data changes</div>
                  </div>
                  <Button variant="default" size="sm">
                    Enabled
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Conflict Resolution</div>
                    <div className="text-sm text-muted-foreground">How to handle data conflicts</div>
                  </div>
                  <Button variant="outline" size="sm">
                    Latest Wins
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Backup Before Sync</div>
                    <div className="text-sm text-muted-foreground">Create backup before major sync operations</div>
                  </div>
                  <Button variant="default" size="sm">
                    Enabled
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
                <CardDescription>Data protection and privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">End-to-End Encryption</div>
                    <div className="text-sm text-muted-foreground">Encrypt data during transmission</div>
                  </div>
                  <Badge variant="default" className="bg-green-500/20 text-green-400">
                    <Shield className="h-3 w-3 mr-1" />
                    Active
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Data Anonymization</div>
                    <div className="text-sm text-muted-foreground">Remove personal identifiers from analytics</div>
                  </div>
                  <Button variant="default" size="sm">
                    Enabled
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Audit Logging</div>
                    <div className="text-sm text-muted-foreground">Log all sync operations for security</div>
                  </div>
                  <Button variant="default" size="sm">
                    Enabled
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Data Retention</div>
                    <div className="text-sm text-muted-foreground">How long to keep sync history</div>
                  </div>
                  <Button variant="outline" size="sm">
                    90 Days
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
