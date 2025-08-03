"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Container, CheckCircle, AlertCircle } from "lucide-react"
import type { Certificate } from "@/lib/certificates"

interface FumigationProgressProps {
  certificate: Certificate
}

export function FumigationProgress({ certificate }: FumigationProgressProps) {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getProgressPercentage = () => {
    switch (certificate.progressStatus) {
      case "pending":
        return 0
      case "gassing":
        return 25
      case "aeration":
        return 50
      case "ready":
        return 75
      case "completed":
        return 100
      default:
        return 0
    }
  }

  const getStatusColor = () => {
    switch (certificate.progressStatus) {
      case "pending":
        return "bg-gray-500"
      case "gassing":
        return "bg-yellow-500"
      case "aeration":
        return "bg-blue-500"
      case "ready":
        return "bg-green-500"
      case "completed":
        return "bg-green-600"
      default:
        return "bg-gray-500"
    }
  }

  const getTimeRemaining = () => {
    if (!certificate.gassingTime) return null

    const gassingDate = new Date(certificate.gassingTime)
    const readyDate = new Date(gassingDate.getTime() + 27 * 60 * 60 * 1000) // 27 hours
    const timeLeft = readyDate.getTime() - currentTime.getTime()

    if (timeLeft <= 0) return "Selesai"

    const hours = Math.floor(timeLeft / (1000 * 60 * 60))
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

    return `${hours}j ${minutes}m tersisa`
  }

  const formatDateTime = (dateString?: string) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center text-prana-navy">
              <Container className="w-5 h-5 mr-2" />
              Progress Fumigasi
            </CardTitle>
            <CardDescription>
              Container: {certificate.containerNumber} | Notice ID: {certificate.noticeId}
            </CardDescription>
          </div>
          <Badge className={`${getStatusColor()} text-white`}>
            {certificate.progressStatus === "pending" && "Menunggu"}
            {certificate.progressStatus === "gassing" && "Proses Gassing"}
            {certificate.progressStatus === "aeration" && "Proses Aerasi"}
            {certificate.progressStatus === "ready" && "Siap Keluar"}
            {certificate.progressStatus === "completed" && "Selesai"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-prana-gray">
            <span>Progress</span>
            <span>{getProgressPercentage()}%</span>
          </div>
          <Progress value={getProgressPercentage()} className="h-3" />
        </div>

        {/* Time Remaining */}
        {certificate.gassingTime && (
          <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 mr-2 text-prana-blue" />
            <span className="font-semibold text-prana-navy">{getTimeRemaining()}</span>
          </div>
        )}

        {/* Progress Steps */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                ["gassing", "aeration", "ready", "completed"].includes(certificate.progressStatus || "")
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {["gassing", "aeration", "ready", "completed"].includes(certificate.progressStatus || "") ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <span className="text-xs font-bold">1</span>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-prana-navy">Proses Gassing</h4>
              <p className="text-sm text-prana-gray">Mulai: {formatDateTime(certificate.gassingTime)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                ["aeration", "ready", "completed"].includes(certificate.progressStatus || "")
                  ? "bg-green-500 text-white"
                  : certificate.progressStatus === "gassing"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              {["aeration", "ready", "completed"].includes(certificate.progressStatus || "") ? (
                <CheckCircle className="w-4 h-4" />
              ) : certificate.progressStatus === "gassing" ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <span className="text-xs font-bold">2</span>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-prana-navy">Proses Aerasi</h4>
              <p className="text-sm text-prana-gray">Mulai: {formatDateTime(certificate.aerationStartTime)}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                ["ready", "completed"].includes(certificate.progressStatus || "")
                  ? "bg-green-500 text-white"
                  : ["gassing", "aeration"].includes(certificate.progressStatus || "")
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-300 text-gray-600"
              }`}
            >
              {["ready", "completed"].includes(certificate.progressStatus || "") ? (
                <CheckCircle className="w-4 h-4" />
              ) : ["gassing", "aeration"].includes(certificate.progressStatus || "") ? (
                <AlertCircle className="w-4 h-4" />
              ) : (
                <span className="text-xs font-bold">3</span>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-prana-navy">Kontainer Siap Keluar Depo</h4>
              <p className="text-sm text-prana-gray">Estimasi: {formatDateTime(certificate.containerReadyTime)}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm font-medium text-prana-navy">Lokasi</p>
            <p className="text-sm text-prana-gray">{certificate.location}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-prana-navy">WO Number</p>
            <p className="text-sm text-prana-gray">{certificate.woNumber || "-"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
