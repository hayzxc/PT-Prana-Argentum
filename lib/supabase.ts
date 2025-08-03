import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: "admin" | "user"
          password_hash: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role?: "admin" | "user"
          password_hash: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: "admin" | "user"
          password_hash?: string
          created_at?: string
          updated_at?: string
        }
      }
      certificates: {
        Row: {
          id: string
          name: string
          recipient_email: string
          recipient_name: string
          issue_date: string
          status: "valid" | "expired" | "revoked"
          file_url: string | null
          file_name: string | null
          file_size: number | null
          issued_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          recipient_email: string
          recipient_name: string
          issue_date: string
          status?: "valid" | "expired" | "revoked"
          file_url?: string | null
          file_name?: string | null
          file_size?: number | null
          issued_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          recipient_email?: string
          recipient_name?: string
          issue_date?: string
          status?: "valid" | "expired" | "revoked"
          file_url?: string | null
          file_name?: string | null
          file_size?: number | null
          issued_by?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
