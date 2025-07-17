import jwt from "jsonwebtoken"
import { Request, Response, NextFunction } from "express"
import { JWT_SECRET } from "../config.js"

export interface AuthRequest extends Request {
  user?: { userId: string }
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({ error: "Missing token in cookies" })
  }

  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined")
    }
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }

    req.user = { userId: decoded.userId }
    next()
  } catch (err) {
    console.error("Token verification failed:", err)
    return res.status(403).json({ error: "Invalid or expired token" })
  }
}
