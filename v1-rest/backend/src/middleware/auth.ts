import { Request, Response, NextFunction } from "express"
import { verifyToken } from "src/utils/auth.js"

const JWT_SECRET = process.env.JWT_SECRET

export interface AuthRequest extends Request {
  user?: { userId: string }
}

export function authenticateJWT(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or malformed token" })
  }

  const token = authHeader.split(" ")[1]

  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined")
    }
    const decoded = verifyToken(token)
    req.user = { userId: decoded.userId }
    next()
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" })
  }
}
