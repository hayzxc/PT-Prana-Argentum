import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { getCertificatesByEmail } from "@/lib/certificates"

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const certificates = getCertificatesByEmail(session.user.email)
  return NextResponse.json(certificates)
}
