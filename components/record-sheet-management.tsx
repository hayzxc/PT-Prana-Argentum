"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileSpreadsheet, Plus, Trash2, ExternalLink, Edit, Link } from "lucide-react"
import {
  getAllRecordSheets,
  addRecordSheet,
  updateRecordSheet,
  deleteRecordSheet,
  RECORD_SHEET_CATEGORIES,
  type RecordSheet,
} from "@/lib/record-sheets"
import { useAuth } from "@/lib/simple-backend-auth"

export function RecordSheetManagement() {
  const { getAllUsers } = useAuth()
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [recordSheets, setRecordSheets] = useState<RecordSheet[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSheet, setEditingSheet] = useState<RecordSheet | null>(null)

  // Form state for adding new record sheet
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState<keyof typeof RECORD_SHEET_CATEGORIES>("GENERAL")
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const users = await getAllUsers()
      setAllUsers(users)

      const sheets = getAllRecordSheets()
      setRecordSheets(sheets)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddRecordSheet = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title || !url) {
      alert("Judul dan URL wajib diisi")
      return
    }

    try {
      const newSheet = addRecordSheet({
        title,
        description,
        url,
        category,
        assignedUsers: selectedUsers,
        createdBy: "admin@pranaargentum.com",
        isActive: true,
      })

      setRecordSheets([newSheet, ...recordSheets])

      // Reset form
      setTitle("")
      setDescription("")
      setUrl("")
      setCategory("GENERAL")
      setSelectedUsers([])

      alert("Record sheet berhasil ditambahkan!")
    } catch (error) {
      console.error("Error adding record sheet:", error)
      alert("Error menambahkan record sheet")
    }
  }

  const handleUpdateRecordSheet = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingSheet || !title || !url) {
      alert("Judul dan URL wajib diisi")
      return
    }

    try {
      const success = updateRecordSheet(editingSheet.id, {
        title,
        description,
        url,
        category,
        assignedUsers: selectedUsers,
      })

      if (success) {
        await fetchData()
        setEditingSheet(null)
        resetForm()
        alert("Record sheet berhasil diupdate!")
      } else {
        alert("Error mengupdate record sheet")
      }
    } catch (error) {
      console.error("Error updating record sheet:", error)
      alert("Error mengupdate record sheet")
    }
  }

  const handleEditSheet = (sheet: RecordSheet) => {
    setEditingSheet(sheet)
    setTitle(sheet.title)
    setDescription(sheet.description)
    setUrl(sheet.url)
    setCategory(sheet.category)
    setSelectedUsers(sheet.assignedUsers)
  }

  const handleDeleteSheet = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus record sheet ini?")) {
      return
    }

    try {
      const success = deleteRecordSheet(id)
      if (success) {
        setRecordSheets(recordSheets.filter((sheet) => sheet.id !== id))
        alert("Record sheet berhasil dihapus!")
      } else {
        alert("Error menghapus record sheet")
      }
    } catch (error) {
      console.error("Error deleting record sheet:", error)
      alert("Error menghapus record sheet")
    }
  }

  const resetForm = () => {
    setTitle("")
    setDescription("")
    setUrl("")
    setCategory("GENERAL")
    setSelectedUsers([])
    setEditingSheet(null)
  }

  const handleUserSelection = (userEmail: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userEmail])
    } else {
      setSelectedUsers(selectedUsers.filter((email) => email !== userEmail))
    }
  }

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString)
      return true
    } catch {
      return false
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-prana-blue"></div>
            <span className="ml-2 text-prana-gray">Loading record sheets...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="manage" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2 bg-white">
        <TabsTrigger value="manage" className="text-prana-navy">
          Kelola Record Sheet
        </TabsTrigger>
        <TabsTrigger value="overview" className="text-prana-navy">
          Overview
        </TabsTrigger>
      </TabsList>

      <TabsContent value="manage" className="space-y-6">
        {/* Add/Edit Record Sheet Form */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-prana-navy">
              <Plus className="w-5 h-5 mr-2" />
              {editingSheet ? "Edit Record Sheet" : "Tambah Record Sheet Baru"}
            </CardTitle>
            <CardDescription>
              {editingSheet ? "Update informasi record sheet" : "Tambahkan link record sheet untuk pengguna"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={editingSheet ? handleUpdateRecordSheet : handleAddRecordSheet} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Judul Record Sheet *</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Fumigation Record Sheet Template"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Select
                    value={category}
                    onValueChange={(value: keyof typeof RECORD_SHEET_CATEGORIES) => setCategory(value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(RECORD_SHEET_CATEGORIES).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL Link *</Label>
                <Input
                  id="url"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  required
                />
                {url && !isValidUrl(url) && (
                  <p className="text-sm text-red-600">URL tidak valid. Pastikan dimulai dengan http:// atau https://</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Deskripsi singkat tentang record sheet ini"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Assign ke Pengguna</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3">
                  {allUsers.map((user) => (
                    <div key={user.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={user.id}
                        checked={selectedUsers.includes(user.email)}
                        onCheckedChange={(checked) => handleUserSelection(user.email, checked as boolean)}
                      />
                      <Label htmlFor={user.id} className="text-sm cursor-pointer">
                        {user.name} ({user.email})
                      </Label>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-prana-gray">Pilih pengguna yang dapat mengakses record sheet ini</p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-prana-navy hover:bg-prana-blue"
                  disabled={!title || !url || !isValidUrl(url)}
                >
                  {editingSheet ? "Update Record Sheet" : "Tambah Record Sheet"}
                </Button>

                {editingSheet && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Record Sheets List */}
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-prana-navy">
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Daftar Record Sheet
            </CardTitle>
            <CardDescription>Kelola semua record sheet dalam sistem</CardDescription>
          </CardHeader>
          <CardContent>
            {recordSheets.length === 0 ? (
              <div className="text-center py-8">
                <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-prana-gray">Belum ada record sheet yang ditambahkan</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-prana-navy">Judul</TableHead>
                      <TableHead className="text-prana-navy">Kategori</TableHead>
                      <TableHead className="text-prana-navy">Assigned Users</TableHead>
                      <TableHead className="text-prana-navy">Dibuat</TableHead>
                      <TableHead className="text-prana-navy">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recordSheets.map((sheet) => (
                      <TableRow key={sheet.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-prana-navy">{sheet.title}</div>
                            {sheet.description && <div className="text-sm text-prana-gray">{sheet.description}</div>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-prana-blue border-prana-blue">
                            {RECORD_SHEET_CATEGORIES[sheet.category]}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {sheet.assignedUsers.slice(0, 2).map((email) => {
                              const user = allUsers.find((u) => u.email === email)
                              return (
                                <Badge key={email} variant="secondary" className="text-xs">
                                  {user?.name || email.split("@")[0]}
                                </Badge>
                              )
                            })}
                            {sheet.assignedUsers.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{sheet.assignedUsers.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-prana-gray">
                            {new Date(sheet.createdAt).toLocaleDateString("id-ID")}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(sheet.url, "_blank")}
                              className="text-prana-blue border-prana-blue hover:bg-prana-blue hover:text-white"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditSheet(sheet)}
                              className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteSheet(sheet.id)}
                              className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="overview">
        <Card className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-prana-navy">
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Overview Record Sheet
            </CardTitle>
            <CardDescription>Ringkasan semua record sheet dan assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-prana-blue">Total Record Sheet</h3>
                <p className="text-2xl font-bold text-prana-navy">{recordSheets.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-600">Aktif</h3>
                <p className="text-2xl font-bold text-prana-navy">
                  {recordSheets.filter((sheet) => sheet.isActive).length}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-600">Total Assignment</h3>
                <p className="text-2xl font-bold text-prana-navy">
                  {recordSheets.reduce((total, sheet) => total + sheet.assignedUsers.length, 0)}
                </p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="font-semibold text-orange-600">Kategori</h3>
                <p className="text-2xl font-bold text-prana-navy">
                  {new Set(recordSheets.map((sheet) => sheet.category)).size}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {Object.entries(RECORD_SHEET_CATEGORIES).map(([categoryKey, categoryName]) => {
                const categorySheets = recordSheets.filter((sheet) => sheet.category === categoryKey)
                if (categorySheets.length === 0) return null

                return (
                  <Card key={categoryKey} className="border-l-4 border-l-prana-blue">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-prana-navy">{categoryName}</h4>
                        <Badge variant="outline" className="text-prana-blue border-prana-blue">
                          {categorySheets.length} sheet{categorySheets.length !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                      <div className="grid gap-2">
                        {categorySheets.map((sheet) => (
                          <div key={sheet.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div>
                              <span className="font-medium text-prana-navy">{sheet.title}</span>
                              <div className="text-xs text-prana-gray">{sheet.assignedUsers.length} user assigned</div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(sheet.url, "_blank")}
                              className="text-prana-blue border-prana-blue hover:bg-prana-blue hover:text-white"
                            >
                              <Link className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
