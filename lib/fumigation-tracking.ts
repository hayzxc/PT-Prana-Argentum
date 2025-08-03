export interface FumigationTracking {
  id: string
  containerNumber: string
  noticeId: string
  woNumber?: string
  companyName: string
  companyEmail: string
  location: string
  gassingTime?: string // When gassing started
  aerationStartTime?: string // When aeration started (calculated)
  containerReadyTime?: string // When container is ready (calculated)
  progressStatus: "pending" | "gassing" | "aeration" | "ready" | "completed"
  notes?: string
}

let fumigationTrackings: FumigationTracking[] = [
  {
    id: "FUM-TRACK-001",
    containerNumber: "TEMU1234567",
    noticeId: "NOT-2023-001",
    woNumber: "WO-2023-001",
    companyName: "PT. Logistik Nusantara",
    companyEmail: "user@example.com",
    location: "Tanjung Perak Port",
    gassingTime: "2023-12-15T08:00:00",
    aerationStartTime: "2023-12-15T08:00:00", // Example: same as gassing for initial state
    containerReadyTime: "2023-12-16T11:00:00", // Example: 27 hours after gassing
    progressStatus: "completed",
    notes: "Fumigasi selesai, kontainer siap diambil.",
  },
  {
    id: "FUM-TRACK-002",
    containerNumber: "MSKU9876543",
    noticeId: "NOT-2023-002",
    woNumber: "WO-2023-002",
    companyName: "PT. Ekspor Jaya",
    companyEmail: "user@example.com",
    location: "Pelabuhan Tanjung Priok",
    gassingTime: "2023-12-16T14:00:00",
    aerationStartTime: "2023-12-16T14:00:00",
    containerReadyTime: "2023-12-17T17:00:00",
    progressStatus: "aeration",
    notes: "Proses aerasi sedang berlangsung. Periksa kembali dalam beberapa jam.",
  },
  {
    id: "FUM-TRACK-003",
    containerNumber: "FCIU5432109",
    noticeId: "NOT-2023-003",
    woNumber: "WO-2023-003",
    companyName: "PT. Impor Makmur",
    companyEmail: "user2@example.com",
    location: "Gudang Cikarang",
    gassingTime: "2023-12-17T10:00:00",
    aerationStartTime: "2023-12-17T10:00:00",
    containerReadyTime: "2023-12-18T13:00:00",
    progressStatus: "gassing",
    notes: "Kontainer baru saja digassing. Durasi treatment 27 jam.",
  },
]

// Load fumigation trackings from localStorage on initialization
if (typeof window !== "undefined") {
  const storedTrackings = localStorage.getItem("fumigationTrackings")
  if (storedTrackings) {
    fumigationTrackings = JSON.parse(storedTrackings)
  }
}

export function getAllFumigationTrackings(): FumigationTracking[] {
  return fumigationTrackings
}

export function getFumigationTrackingsByEmail(email: string): FumigationTracking[] {
  return fumigationTrackings.filter((tracking) => tracking.companyEmail === email)
}

export function getFumigationTrackingByContainerAndNotice(
  containerNumber: string,
  noticeId: string,
): FumigationTracking | null {
  return (
    fumigationTrackings.find(
      (tracking) => tracking.containerNumber === containerNumber && tracking.noticeId === noticeId,
    ) || null
  )
}

export function addFumigationTracking(
  tracking: Omit<FumigationTracking, "id" | "aerationStartTime" | "containerReadyTime">,
): FumigationTracking {
  const newTracking: FumigationTracking = {
    ...tracking,
    id: `FUM-TRACK-${Date.now()}`,
  }

  // Auto-calculate times if gassing time is provided
  if (tracking.gassingTime) {
    const gassingDate = new Date(tracking.gassingTime)
    newTracking.aerationStartTime = tracking.gassingTime // Aeration starts immediately after gassing for tracking purposes

    // Add 27 hours for container ready time
    const readyDate = new Date(gassingDate.getTime() + 27 * 60 * 60 * 1000)
    newTracking.containerReadyTime = readyDate.toISOString()
  }

  fumigationTrackings.push(newTracking)

  // Save to localStorage for persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("fumigationTrackings", JSON.stringify(fumigationTrackings))
  }
  return newTracking
}

export function updateFumigationTrackingProgress(
  id: string,
  progressStatus: FumigationTracking["progressStatus"],
  notes?: string,
): boolean {
  const index = fumigationTrackings.findIndex((tracking) => tracking.id === id)
  if (index > -1) {
    fumigationTrackings[index].progressStatus = progressStatus
    if (notes !== undefined) {
      fumigationTrackings[index].notes = notes
    }

    // Update timestamps based on progress
    const now = new Date().toISOString()
    if (progressStatus === "aeration" && !fumigationTrackings[index].aerationStartTime) {
      fumigationTrackings[index].aerationStartTime = now
    } else if (progressStatus === "ready" && !fumigationTrackings[index].containerReadyTime) {
      // If gassingTime exists, calculate ready time 27 hours after gassing
      if (fumigationTrackings[index].gassingTime) {
        const gassingDate = new Date(fumigationTrackings[index].gassingTime!)
        const readyDate = new Date(gassingDate.getTime() + 27 * 60 * 60 * 1000)
        fumigationTrackings[index].containerReadyTime = readyDate.toISOString()
      } else {
        // Fallback if gassingTime is not set, use current time
        fumigationTrackings[index].containerReadyTime = now
      }
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("fumigationTrackings", JSON.stringify(fumigationTrackings))
    }
    return true
  }
  return false
}

export function deleteFumigationTracking(id: string): boolean {
  const index = fumigationTrackings.findIndex((tracking) => tracking.id === id)
  if (index > -1) {
    fumigationTrackings.splice(index, 1)
    if (typeof window !== "undefined") {
      localStorage.setItem("fumigationTrackings", JSON.stringify(fumigationTrackings))
    }
    return true
  }
  return false
}

// Progress status mapping
export const PROGRESS_STATUS = {
  pending: "Menunggu",
  gassing: "Proses Gassing",
  aeration: "Proses Aerasi",
  ready: "Kontainer Siap Keluar",
  completed: "Selesai",
}
