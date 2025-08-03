export interface Certificate {
  id: string
  name: string
  recipientEmail: string
  recipientName: string
  issueDate: string
  status: "valid" | "expired" | "revoked"
  fileUrl?: string
  fileName?: string
  fileSize?: number
  issuedBy: string
  serviceType?: "CARGO_SURVEY" | "MARINE_SURVEY" | "PRESHIPMENT" | "INSURANCE" | "QUALITY_CONTROL" | "FUMIGATION"
  location?: string
  description?: string
  // New fumigation-specific fields
  containerNumber?: string
  noticeId?: string
  woNumber?: string
  gassingTime?: string
  aerationStartTime?: string
  containerReadyTime?: string
  progressStatus?: "pending" | "gassing" | "aeration" | "ready" | "completed"
  phytosanitaryUrl?: string
  phytosanitaryFileName?: string
}

// Mock certificate database with general surveyor services data and fumigation data
let certificates: Certificate[] = [
  {
    id: "CERT-2023-001",
    name: "Cargo Survey Certificate",
    recipientEmail: "user@example.com",
    recipientName: "PT. Logistik Nusantara",
    issueDate: "2023-12-15",
    status: "valid",
    issuedBy: "admin@pranaargentum.com",
    serviceType: "CARGO_SURVEY",
    location: "Tanjung Perak Port",
    description: "Pre-shipment cargo inspection and condition survey",
  },
  {
    id: "CERT-2023-002",
    name: "Marine Survey Certificate",
    recipientEmail: "user@example.com",
    recipientName: "PT. Logistik Nusantara",
    issueDate: "2023-12-10",
    status: "valid",
    issuedBy: "admin@pranaargentum.com",
    serviceType: "MARINE_SURVEY",
    location: "Surabaya Marine Terminal",
    description: "Hull condition and marine equipment survey",
  },
  {
    id: "CERT-2023-003",
    name: "Quality Control Certificate",
    recipientEmail: "user@example.com",
    recipientName: "PT. Logistik Nusantara",
    issueDate: "2023-12-05",
    status: "valid",
    issuedBy: "admin@pranaargentum.com",
    serviceType: "QUALITY_CONTROL",
    location: "Industrial Area Surabaya",
    description: "Quality control inspection and certification",
  },
  {
    id: "CERT-2023-004",
    name: "Fumigation Certificate",
    recipientEmail: "user@example.com",
    recipientName: "PT. Logistik Nusantara",
    issueDate: "2023-12-15",
    status: "valid",
    issuedBy: "admin@pranaargentum.com",
    serviceType: "FUMIGATION",
    location: "Tanjung Perak Port",
    description: "Container fumigation with AFAS treatment",
    containerNumber: "TEMU1234567",
    noticeId: "NOT-2023-001",
    woNumber: "WO-2023-001",
    gassingTime: "2023-12-15T08:00:00",
    aerationStartTime: "2023-12-15T08:00:00",
    containerReadyTime: "2023-12-16T11:00:00",
    progressStatus: "completed",
    phytosanitaryUrl: "/placeholder.pdf",
    phytosanitaryFileName: "phytosanitary-cert.pdf",
  },
  {
    id: "CERT-2023-005",
    name: "Fumigation Certificate",
    recipientEmail: "user@example.com",
    recipientName: "PT. Logistik Nusantara",
    issueDate: "2023-12-16",
    status: "valid",
    issuedBy: "admin@pranaargentum.com",
    serviceType: "FUMIGATION",
    location: "Tanjung Perak Port",
    description: "Container fumigation with AFAS treatment",
    containerNumber: "MSKU9876543",
    noticeId: "NOT-2023-002",
    woNumber: "WO-2023-002",
    gassingTime: "2023-12-16T14:00:00",
    aerationStartTime: "2023-12-16T14:00:00",
    containerReadyTime: "2023-12-17T17:00:00",
    progressStatus: "aeration",
    phytosanitaryUrl: "/placeholder.pdf",
    phytosanitaryFileName: "phytosanitary-cert-2.pdf",
  },
]

export function getCertificatesByEmail(email: string): Certificate[] {
  return certificates.filter((cert) => cert.recipientEmail === email)
}

export function getAllCertificates(): Certificate[] {
  return certificates
}

export function getCertificateByContainerAndNotice(containerNumber: string, noticeId: string): Certificate | null {
  return certificates.find((cert) => cert.containerNumber === containerNumber && cert.noticeId === noticeId) || null
}

export function addCertificate(cert: Omit<Certificate, "id">): Certificate {
  const newCert: Certificate = {
    ...cert,
    id: `CERT-${Date.now()}`,
  }

  // Auto-calculate times if gassing time is provided
  if (cert.gassingTime && cert.serviceType === "FUMIGATION") {
    const gassingDate = new Date(cert.gassingTime)
    newCert.aerationStartTime = cert.gassingTime

    // Add 27 hours for container ready time
    const readyDate = new Date(gassingDate.getTime() + 27 * 60 * 60 * 1000)
    newCert.containerReadyTime = readyDate.toISOString()

    // Set initial progress status
    newCert.progressStatus = "gassing"
  }

  certificates.push(newCert)

  // Save to localStorage for persistence
  if (typeof window !== "undefined") {
    localStorage.setItem("certificates", JSON.stringify(certificates))
  }
  return newCert
}

export function updateCertificateProgress(id: string, progressStatus: Certificate["progressStatus"]): boolean {
  const index = certificates.findIndex((cert) => cert.id === id)
  if (index > -1) {
    certificates[index].progressStatus = progressStatus

    // Update timestamps based on progress
    const now = new Date().toISOString()
    if (progressStatus === "aeration") {
      certificates[index].aerationStartTime = now
    } else if (progressStatus === "ready") {
      // Container ready time should be calculated from gassing time + 27 hours
      if (certificates[index].gassingTime) {
        const gassingDate = new Date(certificates[index].gassingTime!)
        const readyDate = new Date(gassingDate.getTime() + 27 * 60 * 60 * 1000)
        certificates[index].containerReadyTime = readyDate.toISOString()
      }
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("certificates", JSON.stringify(certificates))
    }
    return true
  }
  return false
}

export function deleteCertificate(id: string): boolean {
  const index = certificates.findIndex((cert) => cert.id === id)
  if (index > -1) {
    certificates.splice(index, 1)
    if (typeof window !== "undefined") {
      localStorage.setItem("certificates", JSON.stringify(certificates))
    }
    return true
  }
  return false
}

// Load certificates from localStorage on initialization
if (typeof window !== "undefined") {
  const storedCertificates = localStorage.getItem("certificates")
  if (storedCertificates) {
    certificates = JSON.parse(storedCertificates)
  }
}

// File upload simulation
export function uploadCertificateFile(file: File): Promise<{ url: string; fileName: string; fileSize: number }> {
  return new Promise((resolve) => {
    // Simulate file upload delay
    setTimeout(() => {
      // In a real app, this would upload to a cloud storage service
      const fileUrl = URL.createObjectURL(file)
      resolve({
        url: fileUrl,
        fileName: file.name,
        fileSize: file.size,
      })
    }, 1000)
  })
}

// Service type mapping
export const SERVICE_TYPES = {
  CARGO_SURVEY: "Cargo Survey",
  MARINE_SURVEY: "Marine Survey",
  PRESHIPMENT: "Pre-shipment Inspection",
  INSURANCE: "Insurance Survey",
  QUALITY_CONTROL: "Quality Control",
  FUMIGATION: "Fumigation Service",
}

// Progress status mapping
export const PROGRESS_STATUS = {
  pending: "Menunggu",
  gassing: "Proses Gassing",
  aeration: "Proses Aerasi",
  ready: "Kontainer Siap Keluar",
  completed: "Selesai",
}
