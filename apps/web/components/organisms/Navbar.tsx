import React from "react"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material"
import { Grid } from "@mui/material"
import Link from "next/link"
import { ROUTES } from "apps/web/lib/routes"
import { LogoutButton } from "apps/web/components/molecules/LogoutButton"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { getUserFromToken } from "apps/web/lib/getUser"

export default async function Navbar() {
  const user = await getUserFromToken()

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">Salsa Steps</Typography>
        </Box>

        {user ? (
          <>
            <Grid container alignItems="center" spacing={1}>
              <Grid size="grow">
                <Button color="inherit">{user.name}</Button>
              </Grid>
              <Grid size="grow">
                <AccountCircleIcon />
              </Grid>
              <Grid size="grow">
                <LogoutButton />
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid container alignItems="center" spacing={1}>
            <Button color="inherit" component={Link} href={ROUTES.login}>
              Login
            </Button>
            <Button color="inherit" component={Link} href={ROUTES.register}>
              Register
            </Button>
          </Grid>
        )}
      </Toolbar>
    </AppBar>
  )
}
