import React from "react"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import Link from "next/link"
import { ROUTES } from "apps/web/lib/routes"
import { getUserFromToken } from "apps/web/lib/getUser"

export default async function Navbar() {
  const user = await getUserFromToken()

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">Salsa Steps</Typography>
          <Button color="inherit" component={Link} href={ROUTES.home}>
            Home
          </Button>
          <Button color="inherit" component={Link} href={ROUTES.steps}>
            Steps
          </Button>
        </Box>

        {user ? (
          <>
            <span>Hola, {user.name}</span>
            <Link href="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} href={ROUTES.login}>
              Login
            </Button>
            <Button color="inherit" component={Link} href={ROUTES.register}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
