import express from "express"
import { prisma } from "@repo/prisma/client.js"
import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs"
import { signToken, verifyToken } from "src/utils/auth.js"

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

router.post("/register", async (req, res) => {
  if (!JWT_SECRET) {
    return res.status(500).json({ error: "Server configuration error" })
  }
  const { email, name, password } = req.body

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(409).json({ error: "User already exists" })
  const hashed = await bcrypt.hash(password, 10)
  const newUser = await prisma.user.create({
    data: { email, name, password: hashed },
  })

  const token = jwt.sign(
    { userId: newUser.id, name: newUser.name },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  )

  return res
    .status(201)
    .json({ token, user: { id: newUser.id, email: newUser.email } })
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(401).json({ error: "Invalid email" })

  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) return res.status(401).json({ error: "Invalid password" })

  const token = signToken({ userId: user.id, name: user.name ?? undefined })

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  })

  res.status(200).json({ message: "Login successful" })
})

router.post("/logout", (req, res) => {
  res.clearCookie("token")
  res.status(200).json({ message: "Logged out" })
})

router.get("/me", (req, res) => {
  const token = req.cookies.token

  if (!token) return res.status(401).json({ error: "Unauthorized" })

  try {
    const decoded = verifyToken(token)

    if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
      return res.status(401).json({ error: "Invalid token payload" })
    }

    res.json({
      id: decoded.userId,
      name: decoded.name,
    })
  } catch (err) {
    console.error("❌ Token error in /auth/me:", err)
    res.status(401).json({ error: "Invalid token" })
  }
})
export default router
