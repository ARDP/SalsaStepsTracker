import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in .env")
}

type TokenPayload = {
  userId: string
  name?: string
}

export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET!, { expiresIn: "7d" })
}

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET!) as TokenPayload
}
