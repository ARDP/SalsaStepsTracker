"use client"
import { createContext, useContext } from "react"

export type User = { id: string; name: string } | null

export const UserContext = createContext<User>(null)

export function useUser() {
  return useContext(UserContext)
}
