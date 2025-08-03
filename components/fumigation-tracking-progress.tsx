"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatDistanceToNowStrict, isPast, parseISO } from "date-fns"
import { id } from "date-fns/locale" // Import Indonesian locale
import { CheckCircle, Hourglass } from "lucide-react"
import { PROGRESS_STATUS, type FumigationTracking } from "@/lib/fumigation-tracking"

interface FumigationTrackingProgressProps {
  tracking: FumigationTracking
}

export function FumigationTrackingProgress({ tracking }: FumigationTrackingProgressProps) {
  const gassingTime = tracking.gassingTime ? parseISO(tracking.gassingTime) : null
  const aerationStartTime = tracking.aerationStartTime ? parseISO(tracking.aerationStartTime) : null
  const containerReadyTime = tracking.containerReadyTime ? parseISO(tracking.containerReadyTime) : null

  const now = new Date()

  // Calculate progress percentage
  let progressValue = 0
  if (tracking.progressStatus === "gassing") {
    progressValue = 33
  } else if (tracking.progressStatus === "aeration") {
    progressValue = 66
  } else if (tracking.progressStatus === "ready" || tracking.progressStatus === "completed") {
    progressValue = 100
  }

  // Calculate countdown for container ready time
  const [countdown, setCountdown] = React.useState<string | null>(null)
  const [isReady, setIsReady] = React.useState(false)

  React.useEffect(() => {
    if (!containerReadyTime) {
      setCountdown(null)
      setIsReady(false)
      return
    }

    const updateCountdown = () => {
      const diff = containerReadyTime.getTime() - now.getTime()
      if (diff <= 0) {
        setCountdown("Kontainer siap keluar!")
        setIsReady(true)
      } else {
        const distance = formatDistanceToNowStrict(containerReadyTime, { addSuffix: true, locale: id })
        setCountdown(`Siap keluar ${distance}`)
        setIsReady(false)
      }
    }

    updateCountdown() // Initial call
    const interval = setInterval(updateCountdown, 1000) // Update every second

    return () => clearInterval(interval)
  }, [containerReadyTime, now])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-prana-navy">Progress Fumigasi</h3>
        <Badge
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium",
            tracking.progressStatus === "pending" && "bg-gray-100 text-gray-800",
            tracking.progressStatus === "gassing" && "bg-blue-100 text-blue-800",
            tracking.progressStatus === "aeration" && "bg-yellow-100 text-yellow-800",
            tracking.progressStatus === "ready" && "bg-green-100 text-green-800",
            tracking.progressStatus === "completed" && "bg-purple-100 text-purple-800",
          )}
        >
          {PROGRESS_STATUS[tracking.progressStatus]}
        </Badge>
      </div>

      <Progress value={progressValue} className="w-full h-2 rounded-full bg-gray-200" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          {gassingTime ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Hourglass className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <p className="font-medium text-prana-navy">Waktu Gassing</p>
            <p className="text-prana-gray">
              {gassingTime ? gassingTime.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) : "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {aerationStartTime && isPast(aerationStartTime) ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Hourglass className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <p className="font-medium text-prana-navy">Mulai Aerasi</p>
            <p className="text-prana-gray">
              {aerationStartTime
                ? aerationStartTime.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {containerReadyTime && isPast(containerReadyTime) ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <Hourglass className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <p className="font-medium text-prana-navy">Kontainer Siap Keluar</p>
            <p className="text-prana-gray">
              {containerReadyTime
                ? containerReadyTime.toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      {countdown && (
        <div
          className={cn(
            "mt-4 p-3 rounded-lg text-center font-semibold",
            isReady ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700",
          )}
        >
          {countdown}
        </div>
      )}

      {tracking.notes && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-prana-gray">
          <p className="font-medium text-prana-navy">Catatan Admin:</p>
          <p>{tracking.notes}</p>
        </div>
      )}
    </div>
  )
}
