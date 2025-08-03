// Google Sheets integration utilities
export interface SpreadsheetData {
  id: string
  name: string
  url: string
  lastModified: string
  data: any[][]
}

export interface UserSpreadsheet {
  userId: string
  spreadsheetId: string
  spreadsheetName: string
  accessLevel: "view" | "edit"
  sheetNames: string[]
}

// Mock Google Sheets API integration
// In production, you would use the actual Google Sheets API
export class GoogleSheetsService {
  private static instance: GoogleSheetsService
  private userSpreadsheets: Map<string, UserSpreadsheet[]> = new Map()

  static getInstance(): GoogleSheetsService {
    if (!GoogleSheetsService.instance) {
      GoogleSheetsService.instance = new GoogleSheetsService()
    }
    return GoogleSheetsService.instance
  }

  constructor() {
    // Initialize with mock data
    this.initializeMockData()
  }

  private initializeMockData() {
    // Mock spreadsheets for demo users
    this.userSpreadsheets.set("user@example.com", [
      {
        userId: "user@example.com",
        spreadsheetId: "mock-sheet-1",
        spreadsheetName: "Certificate Tracking",
        accessLevel: "view",
        sheetNames: ["Certificates", "Progress", "Summary"],
      },
      {
        userId: "user@example.com",
        spreadsheetId: "mock-sheet-2",
        spreadsheetName: "Training Records",
        accessLevel: "edit",
        sheetNames: ["Training Log", "Completed Courses"],
      },
    ])

    this.userSpreadsheets.set("admin@pranaargentum.com", [
      {
        userId: "admin@pranaargentum.com",
        spreadsheetId: "admin-sheet-1",
        spreadsheetName: "All Certificates Dashboard",
        accessLevel: "edit",
        sheetNames: ["Overview", "Users", "Certificates", "Analytics"],
      },
      {
        userId: "admin@pranaargentum.com",
        spreadsheetId: "admin-sheet-2",
        spreadsheetName: "Company Reports",
        accessLevel: "edit",
        sheetNames: ["Monthly Reports", "KPIs", "User Activity"],
      },
    ])
  }

  async getUserSpreadsheets(userEmail: string): Promise<UserSpreadsheet[]> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return this.userSpreadsheets.get(userEmail) || []
  }

  async getSpreadsheetData(spreadsheetId: string, sheetName?: string): Promise<SpreadsheetData> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock data based on spreadsheet ID
    const mockData = this.generateMockSpreadsheetData(spreadsheetId, sheetName)

    return {
      id: spreadsheetId,
      name: mockData.name,
      url: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`,
      lastModified: new Date().toISOString(),
      data: mockData.data,
    }
  }

  private generateMockSpreadsheetData(spreadsheetId: string, sheetName?: string) {
    if (spreadsheetId === "mock-sheet-1") {
      return {
        name: "Certificate Tracking",
        data: [
          ["Certificate Name", "Issue Date", "Status", "Expiry Date", "Progress"],
          ["Project Management Professional", "2023-05-15", "Active", "2025-05-15", "100%"],
          ["Advanced Data Analysis", "2023-06-02", "Active", "2025-06-02", "100%"],
          ["Safety Training Certificate", "2023-07-10", "Pending", "2025-07-10", "75%"],
          ["Quality Management", "2023-08-20", "In Progress", "2025-08-20", "50%"],
        ],
      }
    } else if (spreadsheetId === "mock-sheet-2") {
      return {
        name: "Training Records",
        data: [
          ["Course Name", "Start Date", "Completion Date", "Score", "Instructor"],
          ["Basic Safety Training", "2023-01-15", "2023-01-20", "95%", "John Smith"],
          ["Advanced Fumigation", "2023-02-10", "2023-02-25", "88%", "Jane Doe"],
          ["Container Inspection", "2023-03-05", "2023-03-15", "92%", "Mike Johnson"],
          ["Quality Control", "2023-04-01", "In Progress", "-", "Sarah Wilson"],
        ],
      }
    } else if (spreadsheetId === "admin-sheet-1") {
      return {
        name: "All Certificates Dashboard",
        data: [
          ["User Email", "Certificate Count", "Active Certificates", "Expired", "Last Activity"],
          ["user@example.com", "4", "2", "0", "2023-12-15"],
          ["john.doe@company.com", "3", "3", "0", "2023-12-14"],
          ["jane.smith@company.com", "5", "4", "1", "2023-12-13"],
          ["mike.wilson@company.com", "2", "2", "0", "2023-12-12"],
        ],
      }
    } else {
      return {
        name: "Company Reports",
        data: [
          ["Month", "Certificates Issued", "Active Users", "Completion Rate"],
          ["January 2023", "15", "25", "85%"],
          ["February 2023", "18", "28", "88%"],
          ["March 2023", "22", "32", "90%"],
          ["April 2023", "20", "35", "87%"],
        ],
      }
    }
  }

  async addUserSpreadsheet(userEmail: string, spreadsheet: Omit<UserSpreadsheet, "userId">): Promise<boolean> {
    const userSheets = this.userSpreadsheets.get(userEmail) || []
    const newSpreadsheet: UserSpreadsheet = {
      ...spreadsheet,
      userId: userEmail,
    }

    userSheets.push(newSpreadsheet)
    this.userSpreadsheets.set(userEmail, userSheets)

    return true
  }

  async removeUserSpreadsheet(userEmail: string, spreadsheetId: string): Promise<boolean> {
    const userSheets = this.userSpreadsheets.get(userEmail) || []
    const filteredSheets = userSheets.filter((sheet) => sheet.spreadsheetId !== spreadsheetId)
    this.userSpreadsheets.set(userEmail, filteredSheets)

    return true
  }
}
