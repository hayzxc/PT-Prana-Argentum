"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "admin" | "user"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  createUser: (userData: { email: string; name: string; password: string; role: "admin" | "user" }) => Promise<{
    success: boolean
    error?: string
  }>
  getAllUsers: () => Promise<User[]>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("user")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Include cookies
      })

      if (!response.ok) {
        const errorData = await response.json()
        return { success: false, error: errorData.error || "Login failed" }
      }

      const data = await response.json()
      setUser(data.user)
      localStorage.setItem("user", JSON.stringify(data.user))
      return { success: true }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Network error. Please check your connection." }
    }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
    } catch (error) {
      console.error("Logout error:", error)
    }

    setUser(null)
    localStorage.removeItem("user")
  }

  const createUser = async (userData: { email: string; name: string; password: string; role: "admin" | "user" }) => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      })

      if (!response.ok) {
        const errorData = await response.json()
        return { success: false, error: errorData.error || "Failed to create user" }
      }

      return { success: true }
    } catch (error) {
      console.error("Create user error:", error)
      return { success: false, error: "Network error. Please check your connection." }
    }
  }

  const getAllUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch("/api/users", {
        credentials: "include",
      })
      if (response.ok) {
        return await response.json()
      }
      return []
    } catch (error) {
      console.error("Get users error:", error)
      return []
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, createUser, getAllUsers }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
