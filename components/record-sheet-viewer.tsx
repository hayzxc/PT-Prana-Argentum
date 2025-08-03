"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, FileSpreadsheet, Calendar, User } from "lucide-react"
import { getRecordSheetsByUser, RECORD_SHEET_CATEGORIES, type RecordSheet } from "@/lib/record-sheets"

interface RecordSheetViewerProps {
  userEmail: string
}

export function RecordSheetViewer({ userEmail }: RecordSheetViewerProps) {
  const [recordSheets, setRecordSheets] = useState<RecordSheet[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserRecordSheets()
  }, [userEmail])

  const fetchUserRecordSheets = async () => {
    try {
      setLoading(true)
      const userSheets = getRecordSheetsByUser(userEmail)
      setRecordSheets(userSheets)
    } catch (error) {
      console.error("Error fetching record sheets:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleOpenSheet = (url: string) => {
    window.open(url, "_blank")
  }

  if (loading) {
    return (
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-prana-blue"></div>
            <span className="ml-2 text-prana-gray">Loading record sheets...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (recordSheets.length === 0) {
    return (
      <Card className="bg-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center py-8">
            <FileSpreadsheet className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-prana-navy mb-2">Belum Ada Record Sheet</h3>
            <p className="text-prana-gray mb-4">
              Anda belum memiliki akses ke record sheet apapun. Hubungi administrator untuk mendapatkan akses.
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Group record sheets by category
  const groupedSheets = recordSheets.reduce(
    (groups, sheet) => {
      const category = sheet.category
      if (!groups[category]) {
        groups[category] = []
      }
      groups[category].push(sheet)
      return groups
    },
    {} as Record<string, RecordSheet[]>,
  )

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <Card className="bg-white border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-prana-navy">
            <FileSpreadsheet className="w-5 h-5 mr-2" />
            Record Sheet Saya
          </CardTitle>
          <CardDescription>Akses record sheet dan form yang telah diberikan kepada Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-prana-blue">Total Record Sheet</h3>
              <p className="text-2xl font-bold text-prana-navy">{recordSheets.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-600">Kategori</h3>
              <p className="text-2xl font-bold text-prana-navy">{Object.keys(groupedSheets).length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-600">Terakhir Update</h3>
              <p className="text-sm font-bold text-prana-navy">
                {recordSheets.length > 0
                  ? new Date(
                      Math.max(...recordSheets.map((sheet) => new Date(sheet.updatedAt).getTime())),
                    ).toLocaleDateString("id-ID")
                  : "-"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Record Sheets by Category */}
      {Object.entries(groupedSheets).map(([categoryKey, sheets]) => (
        <Card key={categoryKey} className="bg-white border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-prana-navy">
              <Badge variant="outline" className="mr-3 text-prana-blue border-prana-blue">
                {RECORD_SHEET_CATEGORIES[categoryKey as keyof typeof RECORD_SHEET_CATEGORIES]}
              </Badge>
              <span className="text-sm text-prana-gray">({sheets.length} item)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sheets.map((sheet) => (
                <Card
                  key={sheet.id}
                  className="certificate-card border border-gray-200 hover:border-prana-blue transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold text-prana-navy text-sm leading-tight">{sheet.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {RECORD_SHEET_CATEGORIES[sheet.category]}
                      </Badge>
                    </div>

                    {sheet.description && (
                      <p className="text-sm text-prana-gray mb-3 line-clamp-2">{sheet.description}</p>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-xs text-prana-gray">
                        <Calendar className="w-3 h-3 mr-1" />
                        Dibuat: {new Date(sheet.createdAt).toLocaleDateString("id-ID")}
                      </div>
                      <div className="flex items-center text-xs text-prana-gray">
                        <User className="w-3 h-3 mr-1" />
                        Update: {new Date(sheet.updatedAt).toLocaleDateString("id-ID")}
                      </div>
                    </div>

                    <Button
                      onClick={() => handleOpenSheet(sheet.url)}
                      className="w-full bg-prana-navy hover:bg-prana-blue text-white"
                      size="sm"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Buka Record Sheet
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
