import { type NextRequest, NextResponse } from "next/server"

// Simple password verification for demo (in production, use proper hashing)
function verifyPassword(password: string, storedPassword: string): boolean {
  return password === storedPassword
}

function generateToken(user: any): string {
  // Simple token generation for demo
  return btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    }),
  )
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Demo users for testing
    const demoUsers = [
      {
        id: "1",
        email: "admin@pranaargentum.com",
        password: "admin123",
        name: "Admin User",
        role: "admin",
      },
      {
        id: "2",
        email: "user@example.com",
        password: "user123",
        name: "John Doe",
        role: "user",
      },
    ]

    // Find user in demo data
    const user = demoUsers.find((u) => u.email === email)

    if (!user || !verifyPassword(password, user.password)) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate token
    const token = generateToken(user)

    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      token,
    })

    // Set HTTP-only cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
