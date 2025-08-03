export interface RecordSheet {
  id: string
  title: string
  description: string
  url: string
  category: "FUMIGATION" | "SURVEY" | "INSPECTION" | "GENERAL"
  assignedUsers: string[] // email addresses
  createdBy: string
  createdAt: string
  updatedAt: string
  isActive: boolean
}

// Mock record sheets database
let recordSheets: RecordSheet[] = [
  {
    id: "RS-001",
    title: "Fumigation Record Sheet Template",
    description: "Template untuk pencatatan proses fumigasi kontainer",
    url: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit",
    category: "FUMIGATION",
    assignedUsers: ["user@example.com"],
    createdBy: "admin@pranaargentum.com",
    createdAt: "2023-12-15T08:00:00Z",
    updatedAt: "2023-12-15T08:00:00Z",
    isActive: true,
  },
  {
    id: "RS-002",
    title: "Marine Survey Checklist",
    description: "Checklist untuk survei maritim dan inspeksi kapal",
    url: "https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit",
    category: "SURVEY",
    assignedUsers: ["user@example.com"],
    createdBy: "admin@pranaargentum.com",
    createdAt: "2023-12-14T10:00:00Z",
    updatedAt: "2023-12-14T10:00:00Z",
    isActive: true,
  },
  {
    id: "RS-003",
    title: "Cargo Inspection Form",
    description: "Form inspeksi kargo untuk pre-shipment",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSf9d8g7h6j5k4l3m2n1o0p9q8r7s6t5u4v3w2x1y0z/viewform",
    category: "INSPECTION",
    assignedUsers: ["user@example.com"],
    createdBy: "admin@pranaargentum.com",
    createdAt: "2023-12-13T14:00:00Z",
    updatedAt: "2023-12-13T14:00:00Z",
    isActive: true,
  },
]

export function getAllRecordSheets(): RecordSheet[] {
  return recordSheets
}

export function getRecordSheetsByUser(userEmail: string): RecordSheet[] {
  return recordSheets.filter((sheet) => sheet.assignedUsers.includes(userEmail) && sheet.isActive)
}

export function addRecordSheet(sheet: Omit<RecordSheet, "id" | "createdAt" | "updatedAt">): RecordSheet {
  const newSheet: RecordSheet = {
    ...sheet,
    id: `RS-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  recordSheets.push(newSheet)

  // Save to localStorage for persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("recordSheets", JSON.stringify(recordSheets))
  }

  return newSheet
}

export function updateRecordSheet(id: string, updates: Partial<RecordSheet>): boolean {
  const index = recordSheets.findIndex((sheet) => sheet.id === id)
  if (index > -1) {
    recordSheets[index] = {
      ...recordSheets[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("recordSheets", JSON.stringify(recordSheets))
    }
    return true
  }
  return false
}

export function deleteRecordSheet(id: string): boolean {
  const index = recordSheets.findIndex((sheet) => sheet.id === id)
  if (index > -1) {
    recordSheets.splice(index, 1)

    if (typeof window !== "undefined") {
      localStorage.setItem("recordSheets", JSON.stringify(recordSheets))
    }
    return true
  }
  return false
}

export function assignRecordSheetToUser(sheetId: string, userEmail: string): boolean {
  const sheet = recordSheets.find((s) => s.id === sheetId)
  if (sheet && !sheet.assignedUsers.includes(userEmail)) {
    sheet.assignedUsers.push(userEmail)
    sheet.updatedAt = new Date().toISOString()

    if (typeof window !== "undefined") {
      localStorage.setItem("recordSheets", JSON.stringify(recordSheets))
    }
    return true
  }
  return false
}

export function removeRecordSheetFromUser(sheetId: string, userEmail: string): boolean {
  const sheet = recordSheets.find((s) => s.id === sheetId)
  if (sheet) {
    sheet.assignedUsers = sheet.assignedUsers.filter((email) => email !== userEmail)
    sheet.updatedAt = new Date().toISOString()

    if (typeof window !== "undefined") {
      localStorage.setItem("recordSheets", JSON.stringify(recordSheets))
    }
    return true
  }
  return false
}

// Load record sheets from localStorage on initialization
if (typeof window !== "undefined") {
  const storedRecordSheets = localStorage.getItem("recordSheets")
  if (storedRecordSheets) {
    recordSheets = JSON.parse(storedRecordSheets)
  }
}

// Category mapping
export const RECORD_SHEET_CATEGORIES = {
  FUMIGATION: "Fumigasi",
  SURVEY: "Survei",
  INSPECTION: "Inspeksi",
  GENERAL: "Umum",
}
