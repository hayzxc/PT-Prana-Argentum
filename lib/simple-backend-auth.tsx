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

// Mock users database with localStorage persistence
const getStoredUsers = () => {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("users")
    return stored
      ? JSON.parse(stored)
      : [
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
  } catch {
    return []
  }
}

const saveUsers = (users: any[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("users", JSON.stringify(users))
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Error parsing stored user:", error)
        localStorage.removeItem("currentUser")
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const users = getStoredUsers()
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (foundUser) {
        const userSession = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          role: foundUser.role,
        }
        setUser(userSession)
        localStorage.setItem("currentUser", JSON.stringify(userSession))
        return { success: true }
      } else {
        return { success: false, error: "Invalid email or password" }
      }
    } catch (error) {
      console.error("Login error:", error)
      return { success: false, error: "Login failed. Please try again." }
    }
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem("currentUser")
  }

  const createUser = async (userData: { email: string; name: string; password: string; role: "admin" | "user" }) => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const users = getStoredUsers()

      // Check if user already exists
      const existingUser = users.find((u: any) => u.email === userData.email)
      if (existingUser) {
        return { success: false, error: "User with this email already exists" }
      }

      const newUser = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        role: userData.role,
        password: userData.password,
      }

      const updatedUsers = [...users, newUser]
      saveUsers(updatedUsers)

      return { success: true }
    } catch (error) {
      console.error("Create user error:", error)
      return { success: false, error: "Failed to create user. Please try again." }
    }
  }

  const getAllUsers = async (): Promise<User[]> => {
    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 300))

      const users = getStoredUsers()
      return users.map(({ password, ...user }: any) => user)
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
