import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Set environment variables for next-lite
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "development-secret-key-change-in-production"
}

if (!process.env.NEXTAUTH_URL) {
  process.env.NEXTAUTH_URL = "http://localhost:3000"
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
