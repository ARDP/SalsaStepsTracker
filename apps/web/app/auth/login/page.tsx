"use client"
import Button from "apps/web/components/atoms/Button"
import TextField from "apps/web/components/atoms/TextField"
import { ROUTES } from "apps/web/lib/routes"
import Link from "next/link"
import { useState } from "react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    //TODO: move this to a separate file
    const res = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      credentials: "include", // allow cookies to be set
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const result = await res.json()
    console.log(result.message)
  }

  return (
    <div>
      <h1>Login Page</h1>
      <p>This is the login page. Please enter your credentials.</p>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>
        Don't have an account? <Link href={ROUTES.register}>Register</Link>
      </p>
      <Button type="submit" onClick={handleLogin}>
        Login
      </Button>
    </div>
  )
}
export default Login
