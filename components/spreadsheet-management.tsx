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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileSpreadsheet, Plus, Trash2, Users, ExternalLink, Edit, Eye } from "lucide-react"
import { GoogleSheetsService, type UserSpreadsheet } from "@/lib/google-sheets"
import { useAuth } from "@/lib/simple-backend-auth"

export function SpreadsheetManagement() {
  const { getAllUsers } = useAuth()
  const [allUsers, setAllUsers] = useState<any[]>([])
  const [userSpreadsheets, setUserSpreadsheets] = useState<Map<string, UserSpreadsheet[]>>(new Map())
  const [loading, setLoading] = useState(true)

  // Form state for adding new spreadsheet access
  const [selectedUser, setSelectedUser] = useState("")
  const [spreadsheetId, setSpreadsheetId] = useState("")
  const [spreadsheetName, setSpreadsheetName] = useState("")
  const [accessLevel, setAccessLevel] = useState<"view" | "edit">("view")
  const [sheetNames, setSheetNames] = useState("")

  const sheetsService = GoogleSheetsService.getInstance()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const users = await getAllUsers()
      setAllUsers(users)

      // Fetch spreadsheets for each user
      const spreadsheetsMap = new Map<string, UserSpreadsheet[]>()
      for (const user of users) {
        const userSheets = await sheetsService.getUserSpreadsheets(user.email)
        spreadsheetsMap.set(user.email, userSheets)
      }
      setUserSpreadsheets(spreadsheetsMap)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddSpreadsheet = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedUser || !spreadsheetId || !spreadsheetName) {
      alert("Please fill in all required fields")
      return
    }

    try {
      const sheetNamesArray = sheetNames
        .split(",")
        .map((name) => name.trim())
        .filter((name) => name)

      const newSpreadsheet = {
        spreadsheetId,
        spreadsheetName,
        accessLevel,
        sheetNames: sheetNamesArray.length > 0 ? sheetNamesArray : ["Sheet1"],
      }

      await sheetsService.addUserSpreadsheet(selectedUser, newSpreadsheet)

      // Reset form
      setSelectedUser("")
      setSpreadsheetId("")
      setSpreadsheetName("")
      setAccessLevel("view")
      setSheetNames("")

      // Refresh data
      await fetchData()
      alert("Spreadsheet access added successfully!")
    } catch (error) {
      console.error("Error adding spreadsheet:", error)
      alert("Error adding spreadsheet access")
    }
  }

  const handleRemoveSpreadsheet = async (userEmail: string, spreadsheetId: string) => {
    if (!confirm("Are you sure you want to remove this spreadsheet access?")) {
      return
    }

    try {
      await sheetsService.removeUserSpreadsheet(userEmail, spreadsheetId)
      await fetchData()
      alert("Spreadsheet access removed successfully!")
    } catch (error) {
      console.error("Error removing spreadsheet:", error)
      alert("Error removing spreadsheet access")
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading spreadsheet data...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Tabs defaultValue="manage" className="space-y-6">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="manage">Manage Access</TabsTrigger>
        <TabsTrigger value="overview">Overview</TabsTrigger>
      </TabsList>

      <TabsContent value="manage" className="space-y-6">
        {/* Add New Spreadsheet Access */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add Spreadsheet Access
            </CardTitle>
            <CardDescription>Grant users access to Google Sheets</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSpreadsheet} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user">Select User</Label>
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a user" />
                    </SelectTrigger>
                    <SelectContent>
                      {allUsers.map((user) => (
                        <SelectItem key={user.id} value={user.email}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accessLevel">Access Level</Label>
                  <Select value={accessLevel} onValueChange={(value: "view" | "edit") => setAccessLevel(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="view">View Only</SelectItem>
                      <SelectItem value="edit">Edit Access</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="spreadsheetId">Spreadsheet ID</Label>
                  <Input
                    id="spreadsheetId"
                    value={spreadsheetId}
                    onChange={(e) => setSpreadsheetId(e.target.value)}
                    placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                    required
                  />
                  <p className="text-xs text-gray-500">Copy from the Google Sheets URL between /d/ and /edit</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spreadsheetName">Display Name</Label>
                  <Input
                    id="spreadsheetName"
                    value={spreadsheetName}
                    onChange={(e) => setSpreadsheetName(e.target.value)}
                    placeholder="My Spreadsheet"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sheetNames">Sheet Names (optional)</Label>
                <Input
                  id="sheetNames"
                  value={sheetNames}
                  onChange={(e) => setSheetNames(e.target.value)}
                  placeholder="Sheet1, Data, Summary (comma-separated)"
                />
                <p className="text-xs text-gray-500">Leave empty to default to "Sheet1"</p>
              </div>

              <Button type="submit" className="w-full md:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Spreadsheet Access
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Current Access List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Current Spreadsheet Access
            </CardTitle>
            <CardDescription>Manage existing spreadsheet permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Spreadsheet</TableHead>
                    <TableHead>Access Level</TableHead>
                    <TableHead>Sheets</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from(userSpreadsheets.entries()).map(([userEmail, sheets]) =>
                    sheets.map((sheet) => {
                      const user = allUsers.find((u) => u.email === userEmail)
                      return (
                        <TableRow key={`${userEmail}-${sheet.spreadsheetId}`}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user?.name || "Unknown User"}</div>
                              <div className="text-sm text-gray-500">{userEmail}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{sheet.spreadsheetName}</div>
                            <div className="text-xs text-gray-500 font-mono">{sheet.spreadsheetId}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={sheet.accessLevel === "edit" ? "default" : "secondary"}>
                              {sheet.accessLevel === "edit" ? (
                                <>
                                  <Edit className="w-3 h-3 mr-1" /> Edit
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3 h-3 mr-1" /> View
                                </>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {sheet.sheetNames.slice(0, 2).map((name) => (
                                <Badge key={name} variant="outline" className="text-xs">
                                  {name}
                                </Badge>
                              ))}
                              {sheet.sheetNames.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{sheet.sheetNames.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  window.open(`https://docs.google.com/spreadsheets/d/${sheet.spreadsheetId}`, "_blank")
                                }
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleRemoveSpreadsheet(userEmail, sheet.spreadsheetId)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    }),
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileSpreadsheet className="w-5 h-5 mr-2" />
              Spreadsheet Access Overview
            </CardTitle>
            <CardDescription>Summary of all spreadsheet permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-600">Total Users with Access</h3>
                <p className="text-2xl font-bold text-blue-800">{userSpreadsheets.size}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-600">Total Spreadsheets</h3>
                <p className="text-2xl font-bold text-green-800">
                  {Array.from(userSpreadsheets.values()).reduce((total, sheets) => total + sheets.length, 0)}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-purple-600">Edit Access Granted</h3>
                <p className="text-2xl font-bold text-purple-800">
                  {
                    Array.from(userSpreadsheets.values())
                      .flat()
                      .filter((sheet) => sheet.accessLevel === "edit").length
                  }
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {Array.from(userSpreadsheets.entries()).map(([userEmail, sheets]) => {
                const user = allUsers.find((u) => u.email === userEmail)
                return (
                  <Card key={userEmail} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{user?.name || "Unknown User"}</h4>
                        <Badge variant="outline">
                          {sheets.length} spreadsheet{sheets.length !== 1 ? "s" : ""}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{userEmail}</p>
                      <div className="grid gap-2">
                        {sheets.map((sheet) => (
                          <div
                            key={sheet.spreadsheetId}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <span className="font-medium">{sheet.spreadsheetName}</span>
                            <Badge variant={sheet.accessLevel === "edit" ? "default" : "secondary"}>
                              {sheet.accessLevel}
                            </Badge>
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
