import Navbar from "../components/organisms/Navbar"
import "./globals.css"
import React from "react"
import ThemeRegistry from "../app/ThemeRegistry"
import { getUserFromToken } from "../lib/getUser"

import UserProvider from "../providers/UserProvider"

export const metadata = {
  title: "Salsa Steps Viewer",
  description: "Consume REST API from v1 backend",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserFromToken()

  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <UserProvider user={user}>
            <nav>
              <Navbar />
            </nav>
            <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
              {children}
            </div>
          </UserProvider>
        </ThemeRegistry>
      </body>
    </html>
  )
}
