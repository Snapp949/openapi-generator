"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  DollarSign,
  Calendar,
  MapPin,
  CreditCard,
  User,
  Building,
  Tag,
  FileText,
  Edit,
  Save,
  X,
  Trash2,
  Copy,
  ExternalLink,
  Receipt,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Share2,
  Flag,
  Star,
} from "lucide-react"

interface Transaction {
  id: string
  amount: number
  type: "income" | "expense" | "transfer"
  category: string
  subcategory?: string
  merchant: string
  description: string
  date: string
  status: "completed" | "pending" | "failed" | "cancelled"
  paymentMethod: string
  accountId: string
  accountName: string
  location?: {
    address: string
    city: string
    state: string
    country: string
    coordinates?: { lat: number; lng: number }
  }
  tags: string[]
  notes: string
  receiptUrl?: string
  referenceNumber: string
  fees?: number
  exchangeRate?: number
  originalAmount?: number
  originalCurrency?: string
  recurring?: {
    isRecurring: boolean
    frequency?: string
    nextDate?: string
  }
  relatedTransactions?: string[]
  metadata?: Record<string, any>
}

interface TransactionHistory {
  id: string
  action: string
  timestamp: string
  user: string
  details: string
}

interface EnhancedTransactionDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
  onUpdate: (transaction: Transaction) => void
  onDelete: (transactionId: string) => void
}

const sampleTransaction: Transaction = {
  id: "txn_1234567890",
  amount: 89.99,
  type: "expense",
  category: "Food & Dining",
  subcategory: "Restaurants",
  merchant: "The Gourmet Bistro",
  description: "Dinner with clients",
  date: "2024-01-15T19:30:00Z",
  status: "completed",
  paymentMethod: "Credit Card",
  accountId: "acc_main_checking",
  accountName: "Main Checking Account",
  location: {
    address: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    country: "USA",
    coordinates: { lat: 37.7749, lng: -122.4194 },
  },
  tags: ["business", "client-dinner", "tax-deductible"],
  notes: "Business dinner with potential new clients. Discussed Q1 partnership opportunities.",
  receiptUrl: "/receipts/txn_1234567890.pdf",
  referenceNumber: "REF-2024-0115-001",
  fees: 2.5,
  recurring: {
    isRecurring: false,
  },
  relatedTransactions: ["txn_1234567891", "txn_1234567892"],
}

const sampleHistory: TransactionHistory[] = [
  {
    id: "hist_1",
    action: "Transaction Created",
    timestamp: "2024-01-15T19:30:00Z",
    user: "System",
    details: "Transaction automatically imported from bank feed",
  },
  {
    id: "hist_2",
    action: "Category Updated",
    timestamp: "2024-01-15T20:15:00Z",
    user: "John Doe",
    details: "Changed category from 'Uncategorized' to 'Food & Dining'",
  },
  {
    id: "hist_3",
    action: "Tags Added",
    timestamp: "2024-01-15T20:16:00Z",
    user: "John Doe",
    details: "Added tags: business, client-dinner, tax-deductible",
  },
  {
    id: "hist_4",
    action: "Notes Added",
    timestamp: "2024-01-15T20:18:00Z",
    user: "John Doe",
    details: "Added business notes and context",
  },
]

export function EnhancedTransactionDetailsModal({
  isOpen,
  onClose,
  transaction,
  onUpdate,
  onDelete,
}: EnhancedTransactionDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTransaction, setEditedTransaction] = useState<Transaction | null>(null)
  const [newTag, setNewTag] = useState("")
  const [newNote, setNewNote] = useState("")
  const [history, setHistory] = useState<TransactionHistory[]>(sampleHistory)

  const currentTransaction = transaction || sampleTransaction

  const handleEdit = () => {
    setEditedTransaction({ ...currentTransaction })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedTransaction) {
      onUpdate(editedTransaction)
      setIsEditing(false)
      // Add to history
      const newHistoryItem: TransactionHistory = {
        id: `hist_${Date.now()}`,
        action: "Transaction Updated",
        timestamp: new Date().toISOString(),
        user: "Current User",
        details: "Transaction details were modified",
      }
      setHistory([newHistoryItem, ...history])
    }
  }

  const handleCancel = () => {
    setEditedTransaction(null)
    setIsEditing(false)
  }

  const handleDelete = () => {
    onDelete(currentTransaction.id)
    onClose()
  }

  const handleAddTag = () => {
    if (newTag.trim() && editedTransaction) {
      const updatedTransaction = {
        ...editedTransaction,
        tags: [...editedTransaction.tags, newTag.trim()],
      }
      setEditedTransaction(updatedTransaction)
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    if (editedTransaction) {
      const updatedTransaction = {
        ...editedTransaction,
        tags: editedTransaction.tags.filter((tag) => tag !== tagToRemove),
      }
      setEditedTransaction(updatedTransaction)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <X className="w-4 h-4 text-red-400" />
      case "cancelled":
        return <X className="w-4 h-4 text-gray-400" />
      default:
        return <Clock className="w-4 h-4 text-slate-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/50"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/50"
      case "cancelled":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/50"
    }
  }

  const displayTransaction = isEditing ? editedTransaction : currentTransaction

  if (!displayTransaction) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] bg-gradient-to-br from-slate-800/95 to-slate-900/95 border-slate-700/50 backdrop-blur-sm">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <DialogTitle className="text-xl text-white">Transaction Details</DialogTitle>
                <DialogDescription className="text-slate-400">
                  {displayTransaction.referenceNumber} • {displayTransaction.merchant}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEdit}
                    className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-800 border-slate-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white">Delete Transaction</AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400">
                          Are you sure you want to delete this transaction? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSave}
                    className="bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancel}
                    className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="details" className="data-[state=active]:bg-blue-600">
                Details
              </TabsTrigger>
              <TabsTrigger value="location" className="data-[state=active]:bg-blue-600">
                Location
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-blue-600">
                History
              </TabsTrigger>
              <TabsTrigger value="related" className="data-[state=active]:bg-blue-600">
                Related
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6 mt-6">
              {/* Main Transaction Info */}
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold text-white">
                          {displayTransaction.type === "expense" ? "-" : "+"}$
                          {displayTransaction.amount.toLocaleString()}
                        </span>
                        <Badge className={getStatusColor(displayTransaction.status)}>
                          {getStatusIcon(displayTransaction.status)}
                          <span className="ml-1 capitalize">{displayTransaction.status}</span>
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-slate-400" />
                          {isEditing ? (
                            <Input
                              value={displayTransaction.merchant}
                              onChange={(e) =>
                                setEditedTransaction({ ...displayTransaction, merchant: e.target.value })
                              }
                              className="bg-slate-700/50 border-slate-600/50 text-white"
                            />
                          ) : (
                            <span className="text-white font-medium">{displayTransaction.merchant}</span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">
                            {new Date(displayTransaction.date).toLocaleDateString()} at{" "}
                            {new Date(displayTransaction.date).toLocaleTimeString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-slate-400" />
                          {isEditing ? (
                            <Select
                              value={displayTransaction.paymentMethod}
                              onValueChange={(value) =>
                                setEditedTransaction({ ...displayTransaction, paymentMethod: value })
                              }
                            >
                              <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Credit Card">Credit Card</SelectItem>
                                <SelectItem value="Debit Card">Debit Card</SelectItem>
                                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                <SelectItem value="PayPal">PayPal</SelectItem>
                                <SelectItem value="Cash">Cash</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <span className="text-slate-300">{displayTransaction.paymentMethod}</span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{displayTransaction.accountName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-slate-400">Category</Label>
                        {isEditing ? (
                          <Select
                            value={displayTransaction.category}
                            onValueChange={(value) => setEditedTransaction({ ...displayTransaction, category: value })}
                          >
                            <SelectTrigger className="bg-slate-700/50 border-slate-600/50 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Food & Dining">Food & Dining</SelectItem>
                              <SelectItem value="Shopping">Shopping</SelectItem>
                              <SelectItem value="Transportation">Transportation</SelectItem>
                              <SelectItem value="Entertainment">Entertainment</SelectItem>
                              <SelectItem value="Bills & Utilities">Bills & Utilities</SelectItem>
                              <SelectItem value="Healthcare">Healthcare</SelectItem>
                              <SelectItem value="Travel">Travel</SelectItem>
                              <SelectItem value="Business">Business</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="text-white font-medium">{displayTransaction.category}</div>
                        )}
                        {displayTransaction.subcategory && (
                          <div className="text-sm text-slate-400">{displayTransaction.subcategory}</div>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm text-slate-400">Description</Label>
                        {isEditing ? (
                          <Input
                            value={displayTransaction.description}
                            onChange={(e) =>
                              setEditedTransaction({ ...displayTransaction, description: e.target.value })
                            }
                            className="bg-slate-700/50 border-slate-600/50 text-white"
                          />
                        ) : (
                          <div className="text-white">{displayTransaction.description}</div>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm text-slate-400">Reference Number</Label>
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-mono text-sm">{displayTransaction.referenceNumber}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(displayTransaction.referenceNumber)}
                            className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      {displayTransaction.fees && (
                        <div>
                          <Label className="text-sm text-slate-400">Fees</Label>
                          <div className="text-white">${displayTransaction.fees.toFixed(2)}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Tag className="w-5 h-5 mr-2 text-blue-400" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {displayTransaction.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-500/20 text-blue-300 cursor-pointer hover:bg-blue-500/30"
                      >
                        {tag}
                        {isEditing && (
                          <X className="w-3 h-3 ml-1 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                        )}
                      </Badge>
                    ))}
                  </div>
                  {isEditing && (
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add new tag..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                        className="bg-slate-700/50 border-slate-600/50 text-white"
                      />
                      <Button onClick={handleAddTag} size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Add
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notes */}
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-green-400" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <Textarea
                      value={displayTransaction.notes}
                      onChange={(e) => setEditedTransaction({ ...displayTransaction, notes: e.target.value })}
                      placeholder="Add notes about this transaction..."
                      className="bg-slate-700/50 border-slate-600/50 text-white min-h-[100px]"
                    />
                  ) : (
                    <div className="text-slate-300 whitespace-pre-wrap">
                      {displayTransaction.notes || "No notes added"}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Receipt */}
              {displayTransaction.receiptUrl && (
                <Card className="bg-slate-800/30 border-slate-700/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Receipt className="w-5 h-5 mr-2 text-purple-400" />
                      Receipt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-slate-700/50 border-slate-600/50 text-white hover:bg-slate-600/50"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-slate-700/50 border-slate-600/50 text-white hover:bg-slate-600/50"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="location" className="space-y-6 mt-6">
              {displayTransaction.location && (
                <Card className="bg-slate-800/30 border-slate-700/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-400" />
                      Transaction Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-slate-400">Address</Label>
                        <div className="text-white">{displayTransaction.location.address}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-slate-400">City</Label>
                        <div className="text-white">{displayTransaction.location.city}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-slate-400">State</Label>
                        <div className="text-white">{displayTransaction.location.state}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-slate-400">Country</Label>
                        <div className="text-white">{displayTransaction.location.country}</div>
                      </div>
                    </div>
                    {displayTransaction.location.coordinates && (
                      <div className="pt-4 border-t border-slate-700/50">
                        <div className="bg-slate-700/30 rounded-lg p-4 text-center">
                          <MapPin className="w-8 h-8 text-red-400 mx-auto mb-2" />
                          <div className="text-white font-medium">Map View</div>
                          <div className="text-sm text-slate-400">
                            {displayTransaction.location.coordinates.lat.toFixed(6)},{" "}
                            {displayTransaction.location.coordinates.lng.toFixed(6)}
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 bg-slate-700/50 border-slate-600/50 text-white hover:bg-slate-600/50"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open in Maps
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="history" className="space-y-6 mt-6">
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-yellow-400" />
                    Transaction History
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Complete audit trail of all changes and actions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {history.map((item, index) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="text-white font-medium">{item.action}</div>
                            <div className="text-sm text-slate-400">{new Date(item.timestamp).toLocaleString()}</div>
                          </div>
                          <div className="text-sm text-slate-400">{item.details}</div>
                          <div className="text-xs text-slate-500">by {item.user}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="related" className="space-y-6 mt-6">
              <Card className="bg-slate-800/30 border-slate-700/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <RefreshCw className="w-5 h-5 mr-2 text-green-400" />
                    Related Transactions
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Transactions that are connected or part of the same group
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {displayTransaction.relatedTransactions && displayTransaction.relatedTransactions.length > 0 ? (
                    <div className="space-y-3">
                      {displayTransaction.relatedTransactions.map((relatedId, index) => (
                        <div
                          key={relatedId}
                          className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <DollarSign className="w-4 h-4 text-blue-400" />
                            <div>
                              <div className="text-white font-medium">Transaction {relatedId}</div>
                              <div className="text-sm text-slate-400">Related transaction</div>
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-slate-700/50 border-slate-600/50 text-white hover:bg-slate-600/50"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      <RefreshCw className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <div>No related transactions found</div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {displayTransaction.recurring?.isRecurring && (
                <Card className="bg-slate-800/30 border-slate-700/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <RefreshCw className="w-5 h-5 mr-2 text-purple-400" />
                      Recurring Transaction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-slate-400">Frequency</Label>
                        <div className="text-white">{displayTransaction.recurring.frequency}</div>
                      </div>
                      <div>
                        <Label className="text-sm text-slate-400">Next Date</Label>
                        <div className="text-white">
                          {displayTransaction.recurring.nextDate
                            ? new Date(displayTransaction.recurring.nextDate).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-slate-700/50 border-slate-600/50 text-white hover:bg-slate-600/50"
                      >
                        View Series
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-red-500/20 border-red-500/50 text-red-400 hover:bg-red-500/30"
                      >
                        Cancel Recurring
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <Flag className="w-4 h-4 mr-2" />
              Flag
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <Star className="w-4 h-4 mr-2" />
              Favorite
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
