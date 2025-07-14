"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Download, FileText, ImageIcon, File, Trash2, Eye, Search } from "lucide-react"

interface TaxDocument {
  id: string
  name: string
  type: "form" | "supporting" | "correspondence" | "receipt"
  category: string
  uploadDate: string
  size: string
  status: "uploaded" | "processing" | "verified" | "rejected"
}

export function TaxDocumentManager() {
  const [documents] = useState<TaxDocument[]>([
    {
      id: "1",
      name: "Form 656 - Offer in Compromise",
      type: "form",
      category: "Settlement Forms",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      status: "verified",
    },
    {
      id: "2",
      name: "Bank Statements - 2023",
      type: "supporting",
      category: "Financial Documents",
      uploadDate: "2024-01-16",
      size: "1.8 MB",
      status: "verified",
    },
    {
      id: "3",
      name: "IRS Notice CP504",
      type: "correspondence",
      category: "IRS Correspondence",
      uploadDate: "2024-01-10",
      size: "456 KB",
      status: "uploaded",
    },
    {
      id: "4",
      name: "Payment Receipt",
      type: "receipt",
      category: "Payment Records",
      uploadDate: "2024-02-01",
      size: "234 KB",
      status: "verified",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-500"
      case "processing":
        return "bg-yellow-500"
      case "uploaded":
        return "bg-blue-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "form":
        return <FileText className="w-5 h-5" />
      case "supporting":
        return <File className="w-5 h-5" />
      case "correspondence":
        return <FileText className="w-5 h-5" />
      case "receipt":
        return <ImageIcon className="w-5 h-5" />
      default:
        return <File className="w-5 h-5" />
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Document Manager</h2>
          <p className="text-muted-foreground">Organize and manage your tax-related documents</p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Documents
        </Button>
      </div>

      <Tabs defaultValue="all-documents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all-documents">All Documents</TabsTrigger>
          <TabsTrigger value="forms">Tax Forms</TabsTrigger>
          <TabsTrigger value="supporting">Supporting Docs</TabsTrigger>
          <TabsTrigger value="correspondence">Correspondence</TabsTrigger>
        </TabsList>

        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="search">Search Documents</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            >
              <option value="all">All Categories</option>
              <option value="Settlement Forms">Settlement Forms</option>
              <option value="Financial Documents">Financial Documents</option>
              <option value="IRS Correspondence">IRS Correspondence</option>
              <option value="Payment Records">Payment Records</option>
            </select>
          </div>
        </div>

        <TabsContent value="all-documents" className="space-y-4">
          {filteredDocuments.map((document) => (
            <Card key={document.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg">{getFileIcon(document.type)}</div>
                    <div>
                      <h3 className="font-semibold">{document.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{document.category}</span>
                        <span>•</span>
                        <span>{document.size}</span>
                        <span>•</span>
                        <span>Uploaded {new Date(document.uploadDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(document.status)} text-white`}>{document.status}</Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="forms">
          <Card>
            <CardHeader>
              <CardTitle>Tax Forms</CardTitle>
              <CardDescription>Official tax forms and applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">Form 656</h3>
                    <p className="text-sm text-muted-foreground">Offer in Compromise</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">Form 9465</h3>
                    <p className="text-sm text-muted-foreground">Installment Agreement Request</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 text-center">
                    <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <h3 className="font-semibold">Form 843</h3>
                    <p className="text-sm text-muted-foreground">Claim for Refund</p>
                    <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                      Download Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="supporting">
          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
              <CardDescription>Financial statements, bank records, and other supporting materials</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Upload supporting documents to strengthen your case.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="correspondence">
          <Card>
            <CardHeader>
              <CardTitle>IRS Correspondence</CardTitle>
              <CardDescription>Letters, notices, and official communications from the IRS</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Keep track of all IRS communications in one place.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
