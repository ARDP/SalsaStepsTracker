"use client"
import Button from "apps/web/components/atoms/Button"
import TextField from "apps/web/components/atoms/TextField"
import { useState } from "react"

const Register = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  //TODO: move this to a separate file
  const handleRegister = async () => {
    const res = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })

    const result = await res.json()
    console.log(result.message)
  }
  //TODO: add validation with formik
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
