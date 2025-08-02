"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Newspaper, TrendingUp, TrendingDown, Search, Filter, Clock, Globe, Zap, Activity } from "lucide-react"

interface NewsItem {
  id: string
  headline: string
  summary: string
  source: string
  timestamp: Date
  sentiment: "positive" | "negative" | "neutral"
  impact: "high" | "medium" | "low"
  category: "earnings" | "economic" | "regulation" | "market" | "company"
  relatedSymbols: string[]
  readTime: number
}

interface NewsFeedProps {
  eliteMode: boolean
}

export function Nasdaq2035NewsFeed({ eliteMode }: NewsFeedProps) {
  const [news, setNews] = useState<NewsItem[]>([])
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [sentimentFilter, setSentimentFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [impactFilter, setImpactFilter] = useState("all")

  // Generate realistic news data
  useEffect(() => {
    const generateNews = (): NewsItem[] => {
      const headlines = [
        {
          headline: "DAX Reaches New All-Time High Amid Strong Economic Data",
          summary: "German stock index surges 2.3% following better-than-expected GDP growth and manufacturing data.",
          sentiment: "positive" as const,
          impact: "high" as const,
          category: "market" as const,
          symbols: ["DAX", "SIE", "SAP"],
        },
        {
          headline: "ECB Signals Potential Rate Cut in Q2 2024",
          summary: "European Central Bank hints at monetary policy easing as inflation shows signs of cooling.",
          sentiment: "positive" as const,
          impact: "high" as const,
          category: "economic" as const,
          symbols: ["DAX", "ALV", "DTE"],
        },
        {
          headline: "SAP Reports Record Q4 Cloud Revenue Growth",
          summary: "Software giant beats analyst expectations with 35% cloud revenue increase year-over-year.",
          sentiment: "positive" as const,
          impact: "medium" as const,
          category: "earnings" as const,
          symbols: ["SAP"],
        },
        {
          headline: "New EU AI Regulation Could Impact Tech Sector",
          summary: "Proposed artificial intelligence regulations may require significant compliance investments.",
          sentiment: "negative" as const,
          impact: "medium" as const,
          category: "regulation" as const,
          symbols: ["SAP", "SIE"],
        },
        {
          headline: "Siemens Announces Major Green Energy Investment",
          summary: "Industrial conglomerate commits €5B to renewable energy infrastructure over next 3 years.",
          sentiment: "positive" as const,
          impact: "medium" as const,
          category: "company" as const,
          symbols: ["SIE"],
        },
        {
          headline: "German Manufacturing PMI Beats Expectations",
          summary: "Manufacturing activity index rises to 52.1, indicating expansion for third consecutive month.",
          sentiment: "positive" as const,
          impact: "high" as const,
          category: "economic" as const,
          symbols: ["DAX", "SIE", "BAS"],
        },
        {
          headline: "ASML Faces Supply Chain Disruptions",
          summary: "Semiconductor equipment maker warns of potential delivery delays due to component shortages.",
          sentiment: "negative" as const,
          impact: "medium" as const,
          category: "company" as const,
          symbols: ["ASML"],
        },
        {
          headline: "Allianz Raises Full-Year Guidance",
          summary:
            "Insurance giant increases profit outlook following strong performance in property-casualty segment.",
          sentiment: "positive" as const,
          impact: "low" as const,
          category: "earnings" as const,
          symbols: ["ALV"],
        },
      ]

      const sources = ["Reuters", "Bloomberg", "Financial Times", "Wall Street Journal", "MarketWatch", "CNBC"]

      return headlines
        .map((item, index) => ({
          id: `news-${index}`,
          headline: item.headline,
          summary: item.summary,
          source: sources[Math.floor(Math.random() * sources.length)],
          timestamp: new Date(Date.now() - Math.random() * 3600000 * 24), // Random time within last 24 hours
          sentiment: item.sentiment,
          impact: item.impact,
          category: item.category,
          relatedSymbols: item.symbols,
          readTime: Math.floor(Math.random() * 5) + 1,
        }))
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
    }

    setNews(generateNews())
  }, [])

  // Filter news based on search and filters
  useEffect(() => {
    let filtered = news

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.relatedSymbols.some((symbol) => symbol.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    if (sentimentFilter !== "all") {
      filtered = filtered.filter((item) => item.sentiment === sentimentFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((item) => item.category === categoryFilter)
    }

    if (impactFilter !== "all") {
      filtered = filtered.filter((item) => item.impact === impactFilter)
    }

    setFilteredNews(filtered)
  }, [news, searchQuery, sentimentFilter, categoryFilter, impactFilter])

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "negative":
        return <TrendingDown className="w-4 h-4 text-red-400" />
      default:
        return <Activity className="w-4 h-4 text-yellow-400" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "negative":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-green-500/20 text-green-400 border-green-500/30"
    }
  }

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - timestamp.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else {
      return timestamp.toLocaleDateString()
    }
  }

  return (
    <div className="space-y-6">
      {/* News Controls */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center">
              <Newspaper className="w-5 h-5 mr-2 text-blue-400" />
              Elite Market News
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">Live Feed</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search news, symbols, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-slate-800/50 border-slate-700/50 text-white placeholder-slate-400"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Sentiment</label>
              <Select value={sentimentFilter} onValueChange={setSentimentFilter}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="all">All Sentiment</SelectItem>
                  <SelectItem value="positive">Positive</SelectItem>
                  <SelectItem value="negative">Negative</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="earnings">Earnings</SelectItem>
                  <SelectItem value="economic">Economic</SelectItem>
                  <SelectItem value="regulation">Regulation</SelectItem>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-300">Impact</label>
              <Select value={impactFilter} onValueChange={setImpactFilter}>
                <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="all">All Impact</SelectItem>
                  <SelectItem value="high">High Impact</SelectItem>
                  <SelectItem value="medium">Medium Impact</SelectItem>
                  <SelectItem value="low">Low Impact</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* News Feed */}
      <Card className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 border-slate-700/30 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Latest News ({filteredNews.length})</span>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
            >
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/30 hover:bg-slate-700/30 transition-colors cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {getSentimentIcon(item.sentiment)}
                    <Badge className={getSentimentColor(item.sentiment)}>{item.sentiment.toUpperCase()}</Badge>
                    <Badge className={getImpactColor(item.impact)}>{item.impact.toUpperCase()}</Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {item.category.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <Clock className="w-3 h-3" />
                    {formatTimeAgo(item.timestamp)}
                  </div>
                </div>

                <h3 className="text-white font-semibold mb-2 leading-tight">{item.headline}</h3>

                <p className="text-slate-300 text-sm mb-3 leading-relaxed">{item.summary}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-slate-400">
                      <Globe className="w-3 h-3" />
                      {item.source}
                    </div>
                    <div className="text-sm text-slate-400">{item.readTime} min read</div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {item.relatedSymbols.map((symbol) => (
                      <Badge key={symbol} variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                        {symbol}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {filteredNews.length === 0 && (
              <div className="text-center py-8">
                <Newspaper className="w-12 h-12 text-slate-400 mx-auto mb-4 opacity-50" />
                <p className="text-slate-400">No news found matching your criteria</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Elite News Analytics */}
      {eliteMode && (
        <Card className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border-purple-500/20 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Zap className="w-5 h-5 mr-2 text-purple-400" />
              News Sentiment Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">Market Sentiment</div>
                <div className="text-2xl font-bold text-green-400">Bullish</div>
                <div className="text-xs text-slate-400">68% positive news</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">News Volume</div>
                <div className="text-2xl font-bold text-white">{news.length}</div>
                <div className="text-xs text-slate-400">Last 24 hours</div>
              </div>
              <div className="text-center p-3 bg-slate-800/30 rounded-lg">
                <div className="text-sm text-slate-400">High Impact</div>
                <div className="text-2xl font-bold text-red-400">{news.filter((n) => n.impact === "high").length}</div>
                <div className="text-xs text-slate-400">Breaking stories</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
