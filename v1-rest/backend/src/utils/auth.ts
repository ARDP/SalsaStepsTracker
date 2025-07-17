import jwt from "jsonwebtoken"
import { JWT_SECRET } from "src/config.js"

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
