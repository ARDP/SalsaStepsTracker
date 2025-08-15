import React from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Grid,
} from "@mui/material"
import Link from "next/link"
import { ROUTES } from "apps/web/lib/routes"
import { getUserFromToken } from "apps/web/lib/getUser"
import { LogoutButton } from "apps/web/components/molecules/LogoutButton"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

export default async function Navbar() {
  const user = await getUserFromToken()

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="h6">Salsa Steps</Typography>

          <Button color="inherit" component={Link} href={ROUTES.steps}>
            Steps
          </Button>
        </Box>

        {user ? (
          <>
            <Grid container alignItems="center" spacing={1}>
              <Grid item>
                <Button color="inherit">{user.name}</Button>
              </Grid>
              <Grid item>
                <AccountCircleIcon />
              </Grid>
              <Grid item>
                <LogoutButton />
              </Grid>
            </Grid>
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
