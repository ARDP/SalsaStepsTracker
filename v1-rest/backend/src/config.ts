import dotenv from "dotenv"
dotenv.config()

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in .env")
}

export const JWT_SECRET = process.env.JWT_SECRET
