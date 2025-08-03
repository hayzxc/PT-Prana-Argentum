"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ExternalLink, RefreshCw, FileSpreadsheet, Eye, Edit, Calendar, Users } from "lucide-react"
import { GoogleSheetsService, type UserSpreadsheet, type SpreadsheetData } from "@/lib/google-sheets"

interface SpreadsheetViewerProps {
  userEmail: string
}

export function SpreadsheetViewer({ userEmail }: SpreadsheetViewerProps) {
  const [spreadsheets, setSpreadsheets] = useState<UserSpreadsheet[]>([])
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState<SpreadsheetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingData, setLoadingData] = useState(false)
  const [selectedSheet, setSelectedSheet] = useState<string>("")

  const sheetsService = GoogleSheetsService.getInstance()

  useEffect(() => {
    fetchUserSpreadsheets()
  }, [userEmail])

  const fetchUserSpreadsheets = async () => {
    try {
      setLoading(true)
      const userSheets = await sheetsService.getUserSpreadsheets(userEmail)
      setSpreadsheets(userSheets)
    } catch (error) {
      console.error("Error fetching spreadsheets:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadSpreadsheetData = async (spreadsheetId: string, sheetName?: string) => {
    try {
      setLoadingData(true)
      const data = await sheetsService.getSpreadsheetData(spreadsheetId, sheetName)
      setSelectedSpreadsheet(data)
      setSelectedSheet(sheetName || "")
    } catch (error) {
      console.error("Error loading spreadsheet data:", error)
    } finally {
      setLoadingData(false)
    }
  }

  const refreshData = () => {
    if (selectedSpreadsheet) {
      loadSpreadsheetData(selectedSpreadsheet.id, selectedSheet)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading spreadsheets...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (spreadsheets.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Spreadsheets Found</h3>
            <p className="text-gray-600 mb-4">
              You don't have access to any spreadsheets yet. Contact your administrator to get access.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Spreadsheets List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            My Spreadsheets
          </CardTitle>
          <CardDescription>Access your assigned Google Sheets and data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {spreadsheets.map((sheet) => (
              <Card key={sheet.spreadsheetId} className="certificate-card cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-lg">{sheet.spreadsheetName}</h4>
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
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {sheet.sheetNames.length} sheet{sheet.sheetNames.length !== 1 ? "s" : ""}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {sheet.sheetNames.slice(0, 3).map((name) => (
                        <Badge key={name} variant="outline" className="text-xs">
                          {name}
                        </Badge>
                      ))}
                      {sheet.sheetNames.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{sheet.sheetNames.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => loadSpreadsheetData(sheet.spreadsheetId)} className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View Data
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        window.open(`https://docs.google.com/spreadsheets/d/${sheet.spreadsheetId}`, "_blank")
                      }
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Spreadsheet Data Viewer */}
      {selectedSpreadsheet && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <FileSpreadsheet className="w-5 h-5 mr-2" />
                  {selectedSpreadsheet.name}
                </CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Last updated: {new Date(selectedSpreadsheet.lastModified).toLocaleString()}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={refreshData} disabled={loadingData}>
                  <RefreshCw className={`w-4 h-4 mr-1 ${loadingData ? "animate-spin" : ""}`} />
                  Refresh
                </Button>
                <Button size="sm" variant="outline" onClick={() => window.open(selectedSpreadsheet.url, "_blank")}>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Open in Sheets
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loadingData ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading data...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {selectedSpreadsheet.data[0]?.map((header, index) => (
                        <TableHead key={index} className="font-semibold">
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedSpreadsheet.data.slice(1).map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <TableCell key={cellIndex}>{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
