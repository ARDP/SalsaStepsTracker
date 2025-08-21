"use client"
import { UserContext, User } from "../lib/UserContext"

export default function UserProvider({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
