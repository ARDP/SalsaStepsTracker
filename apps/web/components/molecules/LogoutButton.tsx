"use client"

import { Button } from "@mui/material"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const res = await fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      credentials: "include",
    })

    if (res.ok) {
      router.push("/")
      router.refresh() // refresh to update server components like Navbar
    } else {
      console.error("Logout failed")
    }
  }

  return (
    <Button onClick={handleLogout} color="inherit">
      Logout
    </Button>
  )
}
