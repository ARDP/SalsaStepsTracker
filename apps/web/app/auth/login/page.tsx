"use client"
import Button from "apps/web/components/atoms/Button"
import TextField from "apps/web/components/atoms/TextField"
import { ROUTES } from "apps/web/lib/routes"
import Link from "next/link"
import { useState } from "react"
import { loginUser } from "apps/web/lib/api/auth"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
    try {
      const result = await loginUser(email, password)
      if (result) {
        //move this to context
        window.location.href = ROUTES.home
      }
    } catch (error) {
      console.error("Login failed:", error)
      alert("Login failed. Please check your credentials and try again.")
    }
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
