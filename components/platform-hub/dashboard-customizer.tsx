"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Settings,
  Eye,
  EyeOff,
  Bookmark,
  BookmarkCheck,
  Grid,
  Palette,
  Layout,
  Bell,
  Save,
  RotateCcw,
  Sparkles,
  Crown,
  Star,
  Target,
} from "lucide-react"

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

export function DashboardCustomizer({
  isOpen,
  onClose,
  environments,
  environmentSettings,
  onUpdateSettings,
}: DashboardCustomizerProps) {
  const [localSettings, setLocalSettings] = useState(environmentSettings)
  const [viewPreferences, setViewPreferences] = useState({
    defaultView: "grid",
    cardsPerRow: 4,
    showStats: true,
    showDescriptions: true,
    animationSpeed: 50,
    theme: "dark",
  })
  const [notifications, setNotifications] = useState({
    platformUpdates: true,
    growthAlerts: true,
    newFeatures: true,
    maintenanceNotices: true,
  })

  const handleSave = () => {
    onUpdateSettings(localSettings)
    localStorage.setItem("nexus-view-preferences", JSON.stringify(viewPreferences))
    localStorage.setItem("nexus-notifications", JSON.stringify(notifications))
    onClose()
  }

  const handleReset = () => {
    setLocalSettings({})
    setViewPreferences({
      defaultView: "grid",
      cardsPerRow: 4,
      showStats: true,
      showDescriptions: true,
      animationSpeed: 50,
      theme: "dark",
    })
    setNotifications({
      platformUpdates: true,
      growthAlerts: true,
      newFeatures: true,
      maintenanceNotices: true,
    })
  }

  const toggleEnvironmentSetting = (envId: string, setting: string) => {
    setLocalSettings((prev) => ({
      ...prev,
      [envId]: {
        ...prev[envId],
        [setting]: !prev[envId]?.[setting],
      },
    }))
  }

  const getVisibleEnvironments = () => {
    return environments.filter((env) => !localSettings[env.id]?.isHidden)
  }

  const getBookmarkedEnvironments = () => {
    return environments.filter((env) => localSettings[env.id]?.isBookmarked)
  }

  const getHiddenEnvironments = () => {
    return environments.filter((env) => localSettings[env.id]?.isHidden)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 to-purple-900 border-purple-500/30">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dashboard Customization
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Personalize your Nexus Dashboard experience
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="platforms" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-white/10">
            <TabsTrigger value="platforms" className="flex items-center gap-2">
              <Grid className="h-4 w-4" />
              Platforms
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              Layout
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* Platform Management */}
          <TabsContent value="platforms" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Visible Platforms */}
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Eye className="h-5 w-5" />
                    Visible ({getVisibleEnvironments().length})
                  </CardTitle>
                  <CardDescription>Platforms shown on your dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                  {getVisibleEnvironments().map((env) => (
                    <div key={env.id} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                      <div className="flex items-center gap-2">
                        <env.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{env.name}</span>
                        {localSettings[env.id]?.isBookmarked && <BookmarkCheck className="h-3 w-3 text-yellow-400" />}
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleEnvironmentSetting(env.id, "isBookmarked")}
                          className="h-6 w-6 p-0"
                        >
                          {localSettings[env.id]?.isBookmarked ? (
                            <BookmarkCheck className="h-3 w-3 text-yellow-400" />
                          ) : (
                            <Bookmark className="h-3 w-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleEnvironmentSetting(env.id, "isHidden")}
                          className="h-6 w-6 p-0"
                        >
                          <EyeOff className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Bookmarked Platforms */}
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-yellow-400">
                    <Star className="h-5 w-5" />
                    Bookmarked ({getBookmarkedEnvironments().length})
                  </CardTitle>
                  <CardDescription>Your favorite platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                  {getBookmarkedEnvironments().map((env) => (
                    <div key={env.id} className="flex items-center justify-between p-2 rounded-lg bg-yellow-500/10">
                      <div className="flex items-center gap-2">
                        <env.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{env.name}</span>
                        <Crown className="h-3 w-3 text-yellow-400" />
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEnvironmentSetting(env.id, "isBookmarked")}
                        className="h-6 w-6 p-0"
                      >
                        <BookmarkCheck className="h-3 w-3 text-yellow-400" />
                      </Button>
                    </div>
                  ))}
                  {getBookmarkedEnvironments().length === 0 && (
                    <div className="text-center py-4 text-muted-foreground text-sm">No bookmarked platforms yet</div>
                  )}
                </CardContent>
              </Card>

              {/* Hidden Platforms */}
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-400">
                    <EyeOff className="h-5 w-5" />
                    Hidden ({getHiddenEnvironments().length})
                  </CardTitle>
                  <CardDescription>Platforms hidden from dashboard</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                  {getHiddenEnvironments().map((env) => (
                    <div key={env.id} className="flex items-center justify-between p-2 rounded-lg bg-red-500/10">
                      <div className="flex items-center gap-2 opacity-60">
                        <env.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{env.name}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleEnvironmentSetting(env.id, "isHidden")}
                        className="h-6 w-6 p-0"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  {getHiddenEnvironments().length === 0 && (
                    <div className="text-center py-4 text-muted-foreground text-sm">No hidden platforms</div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Appearance Settings */}
          <TabsContent value="appearance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Visual Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select
                      value={viewPreferences.theme}
                      onValueChange={(value) => setViewPreferences((prev) => ({ ...prev, theme: value }))}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Dark Theme</SelectItem>
                        <SelectItem value="light">Light Theme</SelectItem>
                        <SelectItem value="auto">Auto (System)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Animation Speed</Label>
                    <Slider
                      value={[viewPreferences.animationSpeed]}
                      onValueChange={([value]) => setViewPreferences((prev) => ({ ...prev, animationSpeed: value }))}
                      max={100}
                      step={10}
                      className="w-full"
                    />
                    <div className="text-xs text-muted-foreground">{viewPreferences.animationSpeed}% speed</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-stats"
                      checked={viewPreferences.showStats}
                      onCheckedChange={(checked) => setViewPreferences((prev) => ({ ...prev, showStats: checked }))}
                    />
                    <Label htmlFor="show-stats">Show platform statistics</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="show-descriptions"
                      checked={viewPreferences.showDescriptions}
                      onCheckedChange={(checked) =>
                        setViewPreferences((prev) => ({ ...prev, showDescriptions: checked }))
                      }
                    />
                    <Label htmlFor="show-descriptions">Show descriptions</Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Effects & Animations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Card Hover Effects</Label>
                    <Select defaultValue="enhanced">
                      <SelectTrigger className="bg-white/10 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="subtle">Subtle</SelectItem>
                        <SelectItem value="enhanced">Enhanced</SelectItem>
                        <SelectItem value="dramatic">Dramatic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Particle Effects</Label>
                    <Select defaultValue="enabled">
                      <SelectTrigger className="bg-white/10 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disabled">Disabled</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="enabled">Enabled</SelectItem>
                        <SelectItem value="maximum">Maximum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="reduce-motion" />
                    <Label htmlFor="reduce-motion">Reduce motion (accessibility)</Label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Layout Settings */}
          <TabsContent value="layout" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    Grid Layout
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default View Mode</Label>
                    <Select
                      value={viewPreferences.defaultView}
                      onValueChange={(value) => setViewPreferences((prev) => ({ ...prev, defaultView: value }))}
                    >
                      <SelectTrigger className="bg-white/10 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="grid">Grid View</SelectItem>
                        <SelectItem value="list">List View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Cards Per Row (Desktop)</Label>
                    <Slider
                      value={[viewPreferences.cardsPerRow]}
                      onValueChange={([value]) => setViewPreferences((prev) => ({ ...prev, cardsPerRow: value }))}
                      min={2}
                      max={6}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-muted-foreground">{viewPreferences.cardsPerRow} cards per row</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/20 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Content Display
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="compact-mode" defaultChecked={false} />
                    <Label htmlFor="compact-mode">Compact mode</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="auto-refresh" defaultChecked={true} />
                    <Label htmlFor="auto-refresh">Auto-refresh data</Label>
                  </div>

                  <div className="space-y-2">
                    <Label>Refresh Interval</Label>
                    <Select defaultValue="30">
                      <SelectTrigger className="bg-white/10 border-white/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 seconds</SelectItem>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">1 minute</SelectItem>
                        <SelectItem value="300">5 minutes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-black/20 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose what notifications you'd like to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="platform-updates"
                      checked={notifications.platformUpdates}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, platformUpdates: checked }))}
                    />
                    <Label htmlFor="platform-updates">Platform updates</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="growth-alerts"
                      checked={notifications.growthAlerts}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, growthAlerts: checked }))}
                    />
                    <Label htmlFor="growth-alerts">Growth alerts</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="new-features"
                      checked={notifications.newFeatures}
                      onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, newFeatures: checked }))}
                    />
                    <Label htmlFor="new-features">New features</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="maintenance-notices"
                      checked={notifications.maintenanceNotices}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({ ...prev, maintenanceNotices: checked }))
                      }
                    />
                    <Label htmlFor="maintenance-notices">Maintenance notices</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <Button variant="outline" onClick={handleReset} className="bg-white/10 border-white/20">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose} className="bg-white/10 border-white/20">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
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
