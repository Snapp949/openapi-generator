"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Settings,
  Palette,
  Layout,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Star,
  Bookmark,
  Grid,
  List,
  Columns,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Environment {
  id: string
  name: string
  description: string
  category: string
  status: "active" | "beta" | "coming-soon"
  users: number
  growth: number
  icon: any
  href: string
  features: string[]
  priority: number
}

interface DashboardCustomizerProps {
  isOpen: boolean
  onClose: () => void
  environments: Environment[]
  environmentSettings: Record<string, any>
  onUpdateSettings: (settings: Record<string, any>) => void
}

interface CustomizationSettings {
  theme: "light" | "dark" | "auto"
  layout: "grid" | "list" | "compact"
  cardSize: "small" | "medium" | "large"
  showMetrics: boolean
  showDescriptions: boolean
  enableAnimations: boolean
  autoRefresh: boolean
  refreshInterval: number
  notifications: {
    newPlatforms: boolean
    updates: boolean
    maintenance: boolean
    achievements: boolean
  }
  privacy: {
    hideUsageStats: boolean
    anonymizeData: boolean
    shareAnalytics: boolean
  }
  accessibility: {
    highContrast: boolean
    reducedMotion: boolean
    largeText: boolean
    screenReader: boolean
  }
  quickActions: string[]
  pinnedEnvironments: string[]
  hiddenEnvironments: string[]
  customCategories: Array<{
    id: string
    name: string
    environments: string[]
    color: string
  }>
}

export function DashboardCustomizer({
  isOpen,
  onClose,
  environments,
  environmentSettings,
  onUpdateSettings,
}: DashboardCustomizerProps) {
  const [settings, setSettings] = useState<CustomizationSettings>({
    theme: "dark",
    layout: "grid",
    cardSize: "medium",
    showMetrics: true,
    showDescriptions: true,
    enableAnimations: true,
    autoRefresh: true,
    refreshInterval: 30,
    notifications: {
      newPlatforms: true,
      updates: true,
      maintenance: true,
      achievements: true,
    },
    privacy: {
      hideUsageStats: false,
      anonymizeData: true,
      shareAnalytics: false,
    },
    accessibility: {
      highContrast: false,
      reducedMotion: false,
      largeText: false,
      screenReader: false,
    },
    quickActions: ["sync", "search", "help", "settings"],
    pinnedEnvironments: [],
    hiddenEnvironments: [],
    customCategories: [],
  })

  const [activeTab, setActiveTab] = useState("appearance")
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const updateSetting = (path: string, value: any) => {
    setSettings((prev) => {
      const keys = path.split(".")
      const newSettings = { ...prev }
      let current: any = newSettings

      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] }
        current = current[keys[i]]
      }

      current[keys[keys.length - 1]] = value
      return newSettings
    })
    setHasUnsavedChanges(true)
  }

  const handleSave = () => {
    // Save settings to localStorage and update context
    localStorage.setItem("nexus-customization", JSON.stringify(settings))
    onUpdateSettings(environmentSettings)
    setHasUnsavedChanges(false)

    // Show success notification
    console.log("Settings saved successfully")
  }

  const handleReset = () => {
    setSettings({
      theme: "dark",
      layout: "grid",
      cardSize: "medium",
      showMetrics: true,
      showDescriptions: true,
      enableAnimations: true,
      autoRefresh: true,
      refreshInterval: 30,
      notifications: {
        newPlatforms: true,
        updates: true,
        maintenance: true,
        achievements: true,
      },
      privacy: {
        hideUsageStats: false,
        anonymizeData: true,
        shareAnalytics: false,
      },
      accessibility: {
        highContrast: false,
        reducedMotion: false,
        largeText: false,
        screenReader: false,
      },
      quickActions: ["sync", "search", "help", "settings"],
      pinnedEnvironments: [],
      hiddenEnvironments: [],
      customCategories: [],
    })
    setHasUnsavedChanges(true)
  }

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `nexus-settings-${new Date().toISOString().split("T")[0]}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedSettings = JSON.parse(e.target?.result as string)
          setSettings(importedSettings)
          setHasUnsavedChanges(true)
        } catch (error) {
          console.error("Error importing settings:", error)
        }
      }
      reader.readAsText(file)
    }
  }

  const toggleEnvironmentPin = (envId: string) => {
    const isPinned = settings.pinnedEnvironments.includes(envId)
    const newPinned = isPinned
      ? settings.pinnedEnvironments.filter((id) => id !== envId)
      : [...settings.pinnedEnvironments, envId]

    updateSetting("pinnedEnvironments", newPinned)
  }

  const toggleEnvironmentHidden = (envId: string) => {
    const isHidden = settings.hiddenEnvironments.includes(envId)
    const newHidden = isHidden
      ? settings.hiddenEnvironments.filter((id) => id !== envId)
      : [...settings.hiddenEnvironments, envId]

    updateSetting("hiddenEnvironments", newHidden)
  }

  const addCustomCategory = () => {
    const newCategory = {
      id: crypto.randomUUID(),
      name: "New Category",
      environments: [],
      color: "#8b5cf6",
    }
    updateSetting("customCategories", [...settings.customCategories, newCategory])
  }

  const removeCustomCategory = (categoryId: string) => {
    const newCategories = settings.customCategories.filter((cat) => cat.id !== categoryId)
    updateSetting("customCategories", newCategories)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-background/95 backdrop-blur-sm border-white/20">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">Dashboard Customization</DialogTitle>
                <DialogDescription>Personalize your SnapAiFi Nexus experience</DialogDescription>
              </div>
            </div>
            {hasUnsavedChanges && (
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                Unsaved Changes
              </Badge>
            )}
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-black/20 border-white/10">
            <TabsTrigger value="appearance">
              <Palette className="h-4 w-4 mr-2" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="layout">
              <Layout className="h-4 w-4 mr-2" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy">
              <Shield className="h-4 w-4 mr-2" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="platforms">
              <Star className="h-4 w-4 mr-2" />
              Platforms
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appearance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-sm">Theme Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Color Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => updateSetting("theme", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto (System)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Card Size</Label>
                    <Select value={settings.cardSize} onValueChange={(value) => updateSetting("cardSize", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Metrics</Label>
                      <p className="text-xs text-muted-foreground">Display user count and growth stats</p>
                    </div>
                    <Switch
                      checked={settings.showMetrics}
                      onCheckedChange={(checked) => updateSetting("showMetrics", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Show Descriptions</Label>
                      <p className="text-xs text-muted-foreground">Display platform descriptions</p>
                    </div>
                    <Switch
                      checked={settings.showDescriptions}
                      onCheckedChange={(checked) => updateSetting("showDescriptions", checked)}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-sm">Animation & Effects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Enable Animations</Label>
                      <p className="text-xs text-muted-foreground">Smooth transitions and hover effects</p>
                    </div>
                    <Switch
                      checked={settings.enableAnimations}
                      onCheckedChange={(checked) => updateSetting("enableAnimations", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Refresh</Label>
                      <p className="text-xs text-muted-foreground">Automatically update platform data</p>
                    </div>
                    <Switch
                      checked={settings.autoRefresh}
                      onCheckedChange={(checked) => updateSetting("autoRefresh", checked)}
                    />
                  </div>

                  {settings.autoRefresh && (
                    <div className="space-y-2">
                      <Label>Refresh Interval (seconds)</Label>
                      <Input
                        type="number"
                        min="10"
                        max="300"
                        value={settings.refreshInterval}
                        onChange={(e) => updateSetting("refreshInterval", Number.parseInt(e.target.value))}
                        className="bg-white/10 border-white/20"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Accessibility Settings */}
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm">Accessibility</CardTitle>
                <CardDescription>Make the dashboard more accessible</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>High Contrast</Label>
                      <p className="text-xs text-muted-foreground">Increase color contrast</p>
                    </div>
                    <Switch
                      checked={settings.accessibility.highContrast}
                      onCheckedChange={(checked) => updateSetting("accessibility.highContrast", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Reduced Motion</Label>
                      <p className="text-xs text-muted-foreground">Minimize animations</p>
                    </div>
                    <Switch
                      checked={settings.accessibility.reducedMotion}
                      onCheckedChange={(checked) => updateSetting("accessibility.reducedMotion", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Large Text</Label>
                      <p className="text-xs text-muted-foreground">Increase font sizes</p>
                    </div>
                    <Switch
                      checked={settings.accessibility.largeText}
                      onCheckedChange={(checked) => updateSetting("accessibility.largeText", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Screen Reader Support</Label>
                      <p className="text-xs text-muted-foreground">Enhanced screen reader compatibility</p>
                    </div>
                    <Switch
                      checked={settings.accessibility.screenReader}
                      onCheckedChange={(checked) => updateSetting("accessibility.screenReader", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="layout" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-sm">Layout Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Layout</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { value: "grid", icon: Grid, label: "Grid" },
                        { value: "list", icon: List, label: "List" },
                        { value: "compact", icon: Columns, label: "Compact" },
                      ].map((layout) => (
                        <Button
                          key={layout.value}
                          variant={settings.layout === layout.value ? "default" : "outline"}
                          size="sm"
                          onClick={() => updateSetting("layout", layout.value)}
                          className="flex flex-col items-center gap-1 h-auto p-3"
                        >
                          <layout.icon className="h-4 w-4" />
                          <span className="text-xs">{layout.label}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Actions</CardTitle>
                  <CardDescription>Customize your quick action toolbar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Available Actions</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["sync", "search", "help", "settings", "export", "import", "refresh", "customize"].map(
                        (action) => (
                          <div key={action} className="flex items-center space-x-2">
                            <Switch
                              checked={settings.quickActions.includes(action)}
                              onCheckedChange={(checked) => {
                                const newActions = checked
                                  ? [...settings.quickActions, action]
                                  : settings.quickActions.filter((a) => a !== action)
                                updateSetting("quickActions", newActions)
                              }}
                            />
                            <Label className="text-sm capitalize">{action}</Label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm">Notification Preferences</CardTitle>
                <CardDescription>Choose what notifications you want to receive</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Platforms</Label>
                      <p className="text-xs text-muted-foreground">When new platforms are added</p>
                    </div>
                    <Switch
                      checked={settings.notifications.newPlatforms}
                      onCheckedChange={(checked) => updateSetting("notifications.newPlatforms", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Platform Updates</Label>
                      <p className="text-xs text-muted-foreground">Feature updates and improvements</p>
                    </div>
                    <Switch
                      checked={settings.notifications.updates}
                      onCheckedChange={(checked) => updateSetting("notifications.updates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Alerts</Label>
                      <p className="text-xs text-muted-foreground">Scheduled maintenance notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.maintenance}
                      onCheckedChange={(checked) => updateSetting("notifications.maintenance", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Achievements</Label>
                      <p className="text-xs text-muted-foreground">Progress and milestone notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.achievements}
                      onCheckedChange={(checked) => updateSetting("notifications.achievements", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="text-sm">Privacy Settings</CardTitle>
                <CardDescription>Control your data and privacy preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Hide Usage Statistics</Label>
                      <p className="text-xs text-muted-foreground">Don't display personal usage data</p>
                    </div>
                    <Switch
                      checked={settings.privacy.hideUsageStats}
                      onCheckedChange={(checked) => updateSetting("privacy.hideUsageStats", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Anonymize Data</Label>
                      <p className="text-xs text-muted-foreground">Remove personal identifiers from analytics</p>
                    </div>
                    <Switch
                      checked={settings.privacy.anonymizeData}
                      onCheckedChange={(checked) => updateSetting("privacy.anonymizeData", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Share Analytics</Label>
                      <p className="text-xs text-muted-foreground">Help improve the platform with usage data</p>
                    </div>
                    <Switch
                      checked={settings.privacy.shareAnalytics}
                      onCheckedChange={(checked) => updateSetting("privacy.shareAnalytics", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="text-sm">Platform Management</CardTitle>
                  <CardDescription>Pin, hide, or organize your platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {environments.map((env) => (
                      <div key={env.id} className="flex items-center justify-between p-2 rounded bg-white/5">
                        <div className="flex items-center gap-2">
                          <env.icon className="h-4 w-4" />
                          <span className="text-sm">{env.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleEnvironmentPin(env.id)}
                            className={`h-6 w-6 p-0 ${
                              settings.pinnedEnvironments.includes(env.id) ? "text-yellow-400" : "text-gray-400"
                            }`}
                          >
                            <Bookmark className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleEnvironmentHidden(env.id)}
                            className={`h-6 w-6 p-0 ${
                              settings.hiddenEnvironments.includes(env.id) ? "text-red-400" : "text-gray-400"
                            }`}
                          >
                            {settings.hiddenEnvironments.includes(env.id) ? (
                              <EyeOff className="h-3 w-3" />
                            ) : (
                              <Eye className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-sm">Custom Categories</CardTitle>
                      <CardDescription>Create your own platform groupings</CardDescription>
                    </div>
                    <Button size="sm" onClick={addCustomCategory} className="h-6">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    <AnimatePresence>
                      {settings.customCategories.map((category) => (
                        <motion.div
                          key={category.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-2 rounded bg-white/5 space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <Input
                              value={category.name}
                              onChange={(e) => {
                                const newCategories = settings.customCategories.map((cat) =>
                                  cat.id === category.id ? { ...cat, name: e.target.value } : cat,
                                )
                                updateSetting("customCategories", newCategories)
                              }}
                              className="h-6 text-sm bg-transparent border-none p-0"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCustomCategory(category.id)}
                              className="h-6 w-6 p-0 text-red-400"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                          <div className="text-xs text-muted-foreground">{category.environments.length} platforms</div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportSettings} size="sm">
              <Download className="h-3 w-3 mr-2" />
              Export
            </Button>
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleImportSettings}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" size="sm">
                <Upload className="h-3 w-3 mr-2" />
                Import
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleReset}
              size="sm"
              className="text-red-400 border-red-400/30 bg-transparent"
            >
              <RotateCcw className="h-3 w-3 mr-2" />
              Reset
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!hasUnsavedChanges}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
