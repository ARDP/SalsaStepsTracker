import express from "express"
import cors from "cors"
import stepRoutes from "./routes/steps.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import { Request, Response, NextFunction } from "express"

const app = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = [
  "http://localhost:3000", // ✅ dev frontend
]

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🧪 Incoming origin:", origin)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
    optionsSuccessStatus: 200, // ✅ Helps avoid issues in dev
  })
)
app.use(express.json())
app.use(cookieParser())
app.use("/steps", stepRoutes)
app.use("/auth", authRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("🔥 Uncaught server error:", err)
  res.status(500).send("Something went wrong")
})
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`)
})
