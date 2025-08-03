import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { deleteCertificate } from "@/lib/certificates"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const success = deleteCertificate(params.id)

  if (success) {
    return NextResponse.json({ message: "Certificate deleted" })
  } else {
    return NextResponse.json({ error: "Certificate not found" }, { status: 404 })
  }
}
