import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { verifyToken } from "@/lib/auth-utils"

async function getAuthenticatedUser(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  if (!token) return null

  return verifyToken(token)
}

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let query = supabaseAdmin.from("certificates").select("*")

    // If user is not admin, only show their certificates
    if (user.role !== "admin") {
      query = query.eq("recipient_email", user.email)
    }

    const { data: certificates, error } = await query.order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 })
    }

    return NextResponse.json(certificates)
  } catch (error) {
    console.error("Get certificates error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthenticatedUser(request)

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, recipient_email, recipient_name, file_url, file_name, file_size } = await request.json()

    if (!name || !recipient_email || !recipient_name) {
      return NextResponse.json({ error: "Name, recipient email, and recipient name are required" }, { status: 400 })
    }

    const { data: certificate, error } = await supabaseAdmin
      .from("certificates")
      .insert([
        {
          name,
          recipient_email,
          recipient_name,
          issue_date: new Date().toISOString().split("T")[0],
          file_url,
          file_name,
          file_size,
          issued_by: user.id,
        },
      ])
      .select("*")
      .single()

    if (error) {
      return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 })
    }

    return NextResponse.json(certificate, { status: 201 })
  } catch (error) {
    console.error("Create certificate error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
