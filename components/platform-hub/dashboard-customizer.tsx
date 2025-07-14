"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { DropResult } from "@hello-pangea/dnd"
import {
  Settings,
  Palette,
  Layout,
  Eye,
  Star,
  Grid,
  List,
  Columns,
  Save,
  RotateCcw,
  Download,
  Upload,
  Trash2,
  Plus,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
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
  isBookmarked?: boolean
  isHidden?: boolean
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
  layout: "grid" | "list" | "compact" | "masonry"
  theme: "dark" | "light" | "auto" | "neon" | "royal"
  density: "comfortable" | "compact" | "spacious"
  animations: boolean
  showDescriptions: boolean
  showMetrics: boolean
  showBadges: boolean
  groupByCategory: boolean
  sortBy: "name" | "usage" | "recent" | "custom"
  itemsPerRow: number
  cardSize: "small" | "medium" | "large"
  backgroundEffect: "none" | "particles" | "gradient" | "neural"
  accentColor: string
  customCategories: Array<{
    id: string
    name: string
    color: string
    items: string[]
  }>
}

const defaultSettings: CustomizationSettings = {
  layout: "grid",
  theme: "dark",
  density: "comfortable",
  animations: true,
  showDescriptions: true,
  showMetrics: true,
  showBadges: true,
  groupByCategory: true,
  sortBy: "name",
  itemsPerRow: 4,
  cardSize: "medium",
  backgroundEffect: "gradient",
  accentColor: "#8b5cf6",
  customCategories: [],
}

const themeOptions = [
  { id: "dark", name: "Dark", description: "Classic dark theme" },
  { id: "light", name: "Light", description: "Clean light theme" },
  { id: "neon", name: "Neon", description: "Cyberpunk neon theme" },
  { id: "royal", name: "Royal", description: "Luxury royal theme" },
  { id: "auto", name: "Auto", description: "System preference" },
]

const layoutOptions = [
  { id: "grid", name: "Grid", icon: Grid, description: "Card grid layout" },
  { id: "list", name: "List", icon: List, description: "Compact list view" },
  { id: "compact", name: "Compact", icon: Columns, description: "Dense compact view" },
  { id: "masonry", name: "Masonry", icon: Layout, description: "Pinterest-style layout" },
]

const accentColors = [
  "#8b5cf6", // Purple
  "#3b82f6", // Blue
  "#10b981", // Green
  "#f59e0b", // Yellow
  "#ef4444", // Red
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#84cc16", // Lime
]

export function DashboardCustomizer({
  isOpen,
  onClose,
  environments,
  environmentSettings,
  onUpdateSettings,
}: DashboardCustomizerProps) {
  const [settings, setSettings] = useState<CustomizationSettings>(defaultSettings)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [activeTab, setActiveTab] = useState("layout")
  const [customCategoryName, setCustomCategoryName] = useState("")
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isDirty, setIsDirty] = useState(false)

  // Load saved settings
  useEffect(() => {
    const savedSettings = localStorage.getItem("dashboard-customization")
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.error("Error loading customization settings:", error)
      }
    }
  }, [])

  // Save settings
  const saveSettings = () => {
    localStorage.setItem("dashboard-customization", JSON.stringify(settings))
    onUpdateSettings(environmentSettings)
    setIsDirty(false)
  }

  // Reset to defaults
  const resetSettings = () => {
    setSettings(defaultSettings)
    setIsDirty(true)
  }

  // Export settings
  const exportSettings = () => {
    const exportData = {
      customization: settings,
      environments: environmentSettings,
      exportedAt: new Date().toISOString(),
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "snapifi-dashboard-settings.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  // Import settings
  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        if (data.customization) {
          setSettings({ ...defaultSettings, ...data.customization })
          setIsDirty(true)
        }
        if (data.environments) {
          onUpdateSettings(data.environments)
        }
      } catch (error) {
        console.error("Error importing settings:", error)
      }
    }
    reader.readAsText(file)
  }

  // Update setting
  const updateSetting = <K extends keyof CustomizationSettings>(key: K, value: CustomizationSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    setIsDirty(true)
  }

  // Create custom category
  const createCustomCategory = () => {
    if (!customCategoryName.trim()) return

    const newCategory = {
      id: `custom-${Date.now()}`,
      name: customCategoryName,
      color: accentColors[Math.floor(Math.random() * accentColors.length)],
      items: selectedItems,
    }

    updateSetting("customCategories", [...settings.customCategories, newCategory])
    setCustomCategoryName("")
    setSelectedItems([])
  }

  // Remove custom category
  const removeCustomCategory = (categoryId: string) => {
    updateSetting(
      "customCategories",
      settings.customCategories.filter((cat) => cat.id !== categoryId),
    )
  }

  // Handle drag and drop for environments
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(environments)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    // Update environment order
    // This would typically update the environments array
    console.log("Reordered environments:", items)
  }

  const getPreviewClass = () => {
    switch (previewMode) {
      case "tablet":
        return "max-w-2xl"
      case "mobile":
        return "max-w-sm"
      default:
        return "max-w-6xl"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] bg-gradient-to-br from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-purple-500/30">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">Dashboard Customizer</DialogTitle>
                <DialogDescription className="text-purple-300">Personalize your SnapAiFi experience</DialogDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isDirty && (
                <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                  Unsaved Changes
                </Badge>
              )}
              <Button variant="outline" onClick={saveSettings} disabled={!isDirty}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5 bg-black/20 border-white/10">
              <TabsTrigger value="layout" className="flex items-center gap-2">
                <Layout className="h-4 w-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="content" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Content
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Advanced
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {/* Settings Panel */}
                <div className="lg:col-span-1 space-y-6 overflow-y-auto">
                  <TabsContent value="layout" className="space-y-6 mt-0">
                    <Card className="bg-black/20 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-sm">Layout Style</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-2">
                          {layoutOptions.map((option) => (
                            <Button
                              key={option.id}
                              variant={settings.layout === option.id ? "default" : "outline"}
                              size="sm"
                              onClick={() => updateSetting("layout", option.id as any)}
                              className="flex flex-col items-center gap-2 h-16"
                            >
                              <option.icon className="h-4 w-4" />
                              <span className="text-xs">{option.name}</span>
                            </Button>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <Label>Items per Row</Label>
                          <Select
                            value={settings.itemsPerRow.toString()}
                            onValueChange={(value) => updateSetting("itemsPerRow", Number.parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2">2 items</SelectItem>
                              <SelectItem value="3">3 items</SelectItem>
                              <SelectItem value="4">4 items</SelectItem>
                              <SelectItem value="5">5 items</SelectItem>
                              <SelectItem value="6">6 items</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Card Size</Label>
                          <Select
                            value={settings.cardSize}
                            onValueChange={(value) => updateSetting("cardSize", value as any)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="small">Small</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="large">Large</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Density</Label>
                          <Select
                            value={settings.density}
                            onValueChange={(value) => updateSetting("density", value as any)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="compact">Compact</SelectItem>
                              <SelectItem value="comfortable">Comfortable</SelectItem>
                              <SelectItem value="spacious">Spacious</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="appearance" className="space-y-6 mt-0">
                    <Card className="bg-black/20 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-sm">Theme & Colors</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Theme</Label>
                          <Select
                            value={settings.theme}
                            onValueChange={(value) => updateSetting("theme", value as any)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {themeOptions.map((theme) => (
                                <SelectItem key={theme.id} value={theme.id}>
                                  {theme.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Accent Color</Label>
                          <div className="grid grid-cols-4 gap-2">
                            {accentColors.map((color) => (
                              <button
                                key={color}
                                onClick={() => updateSetting("accentColor", color)}
                                className={`w-8 h-8 rounded-lg border-2 ${
                                  settings.accentColor === color ? "border-white" : "border-transparent"
                                }`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Background Effect</Label>
                          <Select
                            value={settings.backgroundEffect}
                            onValueChange={(value) => updateSetting("backgroundEffect", value as any)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="gradient">Gradient</SelectItem>
                              <SelectItem value="particles">Particles</SelectItem>
                              <SelectItem value="neural">Neural Network</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Animations</Label>
                          <Switch
                            checked={settings.animations}
                            onCheckedChange={(checked) => updateSetting("animations", checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-6 mt-0">
                    <Card className="bg-black/20 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-sm">Content Display</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Show Descriptions</Label>
                          <Switch
                            checked={settings.showDescriptions}
                            onCheckedChange={(checked) => updateSetting("showDescriptions", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Show Metrics</Label>
                          <Switch
                            checked={settings.showMetrics}
                            onCheckedChange={(checked) => updateSetting("showMetrics", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Show Badges</Label>
                          <Switch
                            checked={settings.showBadges}
                            onCheckedChange={(checked) => updateSetting("showBadges", checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Group by Category</Label>
                          <Switch
                            checked={settings.groupByCategory}
                            onCheckedChange={(checked) => updateSetting("groupByCategory", checked)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Sort By</Label>
                          <Select
                            value={settings.sortBy}
                            onValueChange={(value) => updateSetting("sortBy", value as any)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="name">Name</SelectItem>
                              <SelectItem value="usage">Usage</SelectItem>
                              <SelectItem value="recent">Recent</SelectItem>
                              <SelectItem value="custom">Custom Order</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="categories" className="space-y-6 mt-0">
                    <Card className="bg-black/20 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-sm">Custom Categories</CardTitle>
                        <CardDescription className="text-xs">
                          Create custom groupings for your platforms
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Category Name</Label>
                          <Input
                            value={customCategoryName}
                            onChange={(e) => setCustomCategoryName(e.target.value)}
                            placeholder="Enter category name"
                            className="bg-white/10 border-white/20"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Select Platforms</Label>
                          <div className="max-h-32 overflow-y-auto space-y-1">
                            {environments.map((env) => (
                              <div key={env.id} className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id={env.id}
                                  checked={selectedItems.includes(env.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedItems([...selectedItems, env.id])
                                    } else {
                                      setSelectedItems(selectedItems.filter((id) => id !== env.id))
                                    }
                                  }}
                                  className="rounded"
                                />
                                <Label htmlFor={env.id} className="text-sm">
                                  {env.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button
                          onClick={createCustomCategory}
                          disabled={!customCategoryName.trim() || selectedItems.length === 0}
                          className="w-full"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Create Category
                        </Button>

                        {/* Existing Custom Categories */}
                        <div className="space-y-2">
                          {settings.customCategories.map((category) => (
                            <div
                              key={category.id}
                              className="flex items-center justify-between p-2 rounded-lg bg-white/5"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                                <span className="text-sm">{category.name}</span>
                                <Badge variant="secondary" className="text-xs">
                                  {category.items.length}
                                </Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeCustomCategory(category.id)}
                                className="h-6 w-6 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-6 mt-0">
                    <Card className="bg-black/20 border-white/10">
                      <CardHeader>
                        <CardTitle className="text-sm">Advanced Settings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Import/Export Settings</Label>
                          <div className="flex gap-2">
                            <Button variant="outline" onClick={exportSettings} className="flex-1 bg-transparent">
                              <Download className="h-4 w-4 mr-2" />
                              Export
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent" asChild>
                              <label htmlFor="import-settings">
                                <Upload className="h-4 w-4 mr-2" />
                                Import
                              </label>
                            </Button>
                            <input
                              id="import-settings"
                              type="file"
                              accept=".json"
                              onChange={importSettings}
                              className="hidden"
                            />
                          </div>
                        </div>

                        <Button variant="outline" onClick={resetSettings} className="w-full bg-transparent">
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reset to Defaults
                        </Button>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </div>

                {/* Preview Panel */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Preview</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant={previewMode === "desktop" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewMode("desktop")}
                      >
                        <Monitor className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={previewMode === "tablet" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewMode("tablet")}
                      >
                        <Tablet className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={previewMode === "mobile" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setPreviewMode("mobile")}
                      >
                        <Smartphone className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="border border-white/20 rounded-lg p-4 bg-black/10 overflow-auto">
                    <div className={`mx-auto transition-all duration-300 ${getPreviewClass()}`}>
                      {/* Preview Content */}
                      <div
                        className={`
                          grid gap-4
                          ${
                            settings.layout === "grid"
                              ? `grid-cols-${Math.min(settings.itemsPerRow, previewMode === "mobile" ? 1 : previewMode === "tablet" ? 2 : 4)}`
                              : settings.layout === "list"
                                ? "grid-cols-1"
                                : settings.layout === "compact"
                                  ? "grid-cols-2"
                                  : "grid-cols-3"
                          }
                        `}
                      >
                        {environments.slice(0, 6).map((env, index) => (
                          <motion.div
                            key={env.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                              p-4 rounded-lg border border-white/20 bg-gradient-to-br from-white/5 to-white/10
                              ${settings.cardSize === "small" ? "p-2" : settings.cardSize === "large" ? "p-6" : "p-4"}
                              ${settings.density === "compact" ? "space-y-1" : settings.density === "spacious" ? "space-y-4" : "space-y-2"}
                            `}
                            style={{
                              borderColor: settings.accentColor + "40",
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="p-2 rounded-lg" style={{ backgroundColor: settings.accentColor + "20" }}>
                                <env.icon className="h-4 w-4" style={{ color: settings.accentColor }} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{env.name}</h4>
                                {settings.showDescriptions && (
                                  <p className="text-xs text-muted-foreground">{env.description}</p>
                                )}
                              </div>
                              {settings.showBadges && env.status === "beta" && (
                                <Badge variant="secondary" className="text-xs">
                                  Beta
                                </Badge>
                              )}
                            </div>
                            {settings.showMetrics && (
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{env.users.toLocaleString()} users</span>
                                <span>+{env.growth}%</span>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
