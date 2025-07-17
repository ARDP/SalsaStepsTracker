"use client"
import Button from "apps/web/components/atoms/Button"
import TextField from "apps/web/components/atoms/TextField"
import { registerUser } from "apps/web/lib/api/auth"
import { useState } from "react"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleRegister = async () => {
    try {
      const res = await registerUser(email, password, name)
      if (res) {
        console.log("Registration successful:", res)
      }
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Registration failed. Please check your details and try again.")
    }
  }

  return (
    <div>
      <h1>Register Page</h1>
      <p>This is the register page. Please enter your credentials.</p>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
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
      <Button type="submit" onClick={handleRegister}>
        Register
      </Button>
    </div>
  )
}
export default Register
