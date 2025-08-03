"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  loading: boolean
  createUser: (userData: Omit<User, "id"> & { password: string }) => Promise<boolean>
  getAllUsers: () => User[]
  deleteUser: (userId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users database - in production, use a real database
let users = [
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user")
    const storedUsers = localStorage.getItem("users")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    if (storedUsers) {
      users = JSON.parse(storedUsers)
    }

    setLoading(false)
  }, [])

  const saveUsersToStorage = (updatedUsers: typeof users) => {
    users = updatedUsers
    localStorage.setItem("users", JSON.stringify(users))
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
      }
      setUser(userSession)
      localStorage.setItem("user", JSON.stringify(userSession))
      return true
    }

    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const createUser = async (userData: Omit<User, "id"> & { password: string }): Promise<boolean> => {
    // Check if user already exists
    const existingUser = users.find((u) => u.email === userData.email)
    if (existingUser) {
      return false
    }

    const newUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.name,
      role: userData.role,
      password: userData.password,
    }

    const updatedUsers = [...users, newUser]
    saveUsersToStorage(updatedUsers)
    return true
  }

  const getAllUsers = (): User[] => {
    return users.map(({ password, ...user }) => user)
  }

  const deleteUser = (userId: string): boolean => {
    const updatedUsers = users.filter((u) => u.id !== userId)
    if (updatedUsers.length < users.length) {
      saveUsersToStorage(updatedUsers)
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, createUser, getAllUsers, deleteUser }}>
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
