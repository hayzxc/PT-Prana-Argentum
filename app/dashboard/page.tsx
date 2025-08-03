"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/simple-backend-auth"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, Download, FileText, Container } from "lucide-react"
import { CertificatePreview } from "@/components/certificate-preview"
import { UserMenu } from "@/components/user-menu"
import { RecordSheetViewer } from "@/components/record-sheet-viewer"
import { ContainerTracking } from "@/components/container-tracking"
import { FumigationTrackingProgress } from "@/components/fumigation-tracking-progress"
import { getAllRecordSheets } from "@/lib/record-sheets"
import { getFumigationTrackingsByEmail } from "@/lib/fumigation-tracking"
import type { FumigationTracking } from "@/lib/fumigation-tracking"

interface Certificate {
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
  serviceType?: string
  location?: string
  description?: string
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

export default function UserDashboard() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [fumigationTrackings, setFumigationTrackings] = useState<FumigationTracking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (user.role === "admin") {
      router.push("/admin")
      return
    }

    fetchData()
  }, [user, authLoading, router])

  const fetchData = async () => {
    try {
      // Get certificates from localStorage and filter by user email
      const storedCertificates = localStorage.getItem("certificates")
      const allCertificates = storedCertificates ? JSON.parse(storedCertificates) : []
      const userCertificates = allCertificates.filter((cert: Certificate) => cert.recipientEmail === user?.email)

      setCertificates(userCertificates)

      // Get fumigation trackings by user email
      const userTrackings = getFumigationTrackingsByEmail(user?.email || "")
      setFumigationTrackings(userTrackings)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewCertificate = (cert: Certificate) => {
    if (cert.fileUrl) {
      window.open(cert.fileUrl, "_blank")
    } else {
      alert(`Viewing certificate: ${cert.name}`)
    }
  }

  const handleDownloadCertificate = (cert: Certificate) => {
    if (cert.fileUrl && cert.fileName) {
      const link = document.createElement("a")
      link.href = cert.fileUrl
      link.download = cert.fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      alert(`Downloading certificate: ${cert.name}`)
    }
  }

  const handleViewPhytosanitary = (cert: Certificate) => {
    if (cert.phytosanitaryUrl) {
      window.open(cert.phytosanitaryUrl, "_blank")
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen prana-light-gray flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-prana-blue mx-auto"></div>
          <p className="mt-4 text-prana-gray">Loading...</p>
        </div>
      </div>
    )
  }

  const fumigationCertificates = certificates.filter((cert) => cert.serviceType === "FUMIGATION")
  const otherCertificates = certificates.filter((cert) => cert.serviceType !== "FUMIGATION")
  const recordSheets = getAllRecordSheets()

  return (
    <div className="min-h-screen prana-light-gray">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-prana-navy">Dashboard Saya</h1>
            <p className="text-prana-gray mt-2">Selamat datang, {user?.name}</p>
          </div>
          <UserMenu />
        </div>

        <div className="grid gap-6 mb-8">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-prana-navy">
                <FileText className="w-5 h-5 mr-2" />
                Ringkasan Akun
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-prana-blue">Total Sertifikat</h3>
                  <p className="text-2xl font-bold text-prana-navy">{certificates.length}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-600">Survei & Inspeksi</h3>
                  <p className="text-2xl font-bold text-prana-navy">
                    {certificates.filter((c) => c.status === "valid" && c.serviceType !== "FUMIGATION").length}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-600">Fumigasi</h3>
                  <p className="text-2xl font-bold text-prana-navy">{fumigationCertificates.length}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-yellow-600">Tracking Aktif</h3>
                  <p className="text-2xl font-bold text-prana-navy">
                    {fumigationTrackings.filter((t) => ["gassing", "aeration"].includes(t.progressStatus)).length}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-600">Record Sheet</h3>
                  <p className="text-2xl font-bold text-prana-navy">{recordSheets.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="certificates" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="certificates" className="text-prana-navy">
              Sertifikat Saya
            </TabsTrigger>
            <TabsTrigger value="phytosanitary" className="text-prana-navy">
              Phytosanitary
            </TabsTrigger>
            <TabsTrigger value="tracking" className="text-prana-navy">
              Tracking Fumigasi
            </TabsTrigger>
            <TabsTrigger value="recordsheets" className="text-prana-navy">
              Record Sheet
            </TabsTrigger>
          </TabsList>

          <TabsContent value="certificates">
            <div className="space-y-6">
              {/* Only Other Certificates - Remove Fumigation section */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-prana-navy">Sertifikat Survei & Inspeksi</CardTitle>
                  <CardDescription>Daftar sertifikat survei dan inspeksi</CardDescription>
                </CardHeader>
                <CardContent>
                  {otherCertificates.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-prana-gray">Belum ada sertifikat survei yang diterbitkan untuk Anda</p>
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherCertificates.map((cert) => (
                        <Card key={cert.id} className="certificate-card border border-gray-200">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-semibold text-lg text-prana-navy">{cert.name}</h4>
                                <p className="text-prana-gray text-sm">
                                  Diterbitkan: {new Date(cert.issueDate).toLocaleDateString("id-ID")}
                                </p>
                              </div>
                              <Badge
                                variant={cert.status === "valid" ? "default" : "destructive"}
                                className={cert.status === "valid" ? "bg-green-100 text-green-800" : ""}
                              >
                                {cert.status === "valid" ? "Valid" : "Tidak Valid"}
                              </Badge>
                            </div>

                            <CertificatePreview
                              certificateName={cert.name}
                              className="w-full mb-4"
                              serviceType={cert.serviceType}
                              location={cert.location}
                              description={cert.description}
                            />

                            {cert.fileName && (
                              <div className="mb-4 p-2 bg-gray-50 rounded text-sm">
                                <p className="font-medium text-prana-navy">File: {cert.fileName}</p>
                                {cert.fileSize && (
                                  <p className="text-prana-gray">Size: {(cert.fileSize / 1024 / 1024).toFixed(2)} MB</p>
                                )}
                              </div>
                            )}

                            <div className="flex justify-between">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewCertificate(cert)}
                                className="flex items-center text-prana-blue border-prana-blue hover:bg-prana-blue hover:text-white"
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadCertificate(cert)}
                                className="flex items-center text-prana-navy border-prana-navy hover:bg-prana-navy hover:text-white"
                              >
                                <Download className="w-4 h-4 mr-1" />
                                Download
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="phytosanitary">
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center text-prana-navy">
                  <FileText className="w-5 h-5 mr-2" />
                  Sertifikat Phytosanitary
                </CardTitle>
                <CardDescription>Akses sertifikat phytosanitary untuk fumigasi kontainer</CardDescription>
              </CardHeader>
              <CardContent>
                {fumigationCertificates.filter((cert) => cert.phytosanitaryUrl).length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-prana-gray">Belum ada sertifikat phytosanitary yang tersedia</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fumigationCertificates
                      .filter((cert) => cert.phytosanitaryUrl)
                      .map((cert) => (
                        <Card key={cert.id} className="certificate-card border border-gray-200">
                          <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h4 className="font-semibold text-lg text-prana-navy">Phytosanitary Certificate</h4>
                                <p className="text-prana-gray text-sm">Container: {cert.containerNumber}</p>
                                <p className="text-prana-gray text-sm">Notice: {cert.noticeId}</p>
                                <p className="text-prana-gray text-sm">
                                  Diterbitkan: {new Date(cert.issueDate).toLocaleDateString("id-ID")}
                                </p>
                              </div>
                              <Badge className="bg-green-100 text-green-800">Phytosanitary</Badge>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg mb-4">
                              <div className="flex items-center justify-center mb-2">
                                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                                  <FileText className="w-6 h-6 text-white" />
                                </div>
                              </div>
                              <h5 className="text-center font-semibold text-green-800">Sertifikat Phytosanitary</h5>
                              <p className="text-center text-sm text-green-600 mt-1">Dokumen resmi untuk ekspor</p>
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex justify-between text-sm">
                                <span className="text-prana-gray">Perusahaan:</span>
                                <span className="font-medium text-prana-navy">{cert.recipientName}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-prana-gray">Lokasi:</span>
                                <span className="font-medium text-prana-navy">{cert.location}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-prana-gray">Status:</span>
                                <Badge variant="outline" className="text-green-600 border-green-600">
                                  Valid
                                </Badge>
                              </div>
                            </div>

                            <Button
                              onClick={() => handleViewPhytosanitary(cert)}
                              className="w-full bg-green-600 hover:bg-green-700 text-white"
                            >
                              <FileText className="w-4 h-4 mr-2" />
                              Lihat Sertifikat Phytosanitary
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tracking">
            <div className="space-y-6">
              {/* Container Tracking Component */}
              <ContainerTracking />

              {/* My Fumigation Tracking */}
              {fumigationTrackings.length > 0 && (
                <Card className="bg-white border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center text-prana-navy">
                      <Container className="w-5 h-5 mr-2" />
                      Tracking Fumigasi Saya
                    </CardTitle>
                    <CardDescription>Monitor progress fumigasi kontainer Anda</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {fumigationTrackings.map((tracking) => (
                        <div key={tracking.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-prana-navy">{tracking.containerNumber}</h4>
                              <p className="text-sm text-prana-gray">
                                WO: {tracking.woNumber} | Notice: {tracking.noticeId}
                              </p>
                              <p className="text-sm text-prana-gray">Lokasi: {tracking.location}</p>
                            </div>
                          </div>

                          <FumigationTrackingProgress tracking={tracking} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="recordsheets">
            <RecordSheetViewer userEmail={user?.email || ""} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
