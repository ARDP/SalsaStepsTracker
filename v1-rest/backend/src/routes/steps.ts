import { Router } from "express"
import { prisma } from "@repo/prisma/client.js"
import { AuthRequest, requireAuth } from "../middleware/auth.js"

const router = Router()

router.get("/", requireAuth, async (req: AuthRequest, res) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" })

  const steps = await prisma.step.findMany({
    where: {
      userId: req.user.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  res.json(steps)
})

router.post("/steps", requireAuth, async (req: AuthRequest, res) => {
  const { title, description, difficulty, videoUrl } = req.body

  if (!req.user) return res.status(401).json({ error: "Unauthorized" })

  const step = await prisma.step.create({
    data: {
      title,
      description,
      difficulty,
      videoUrl,
      userId: req.user.userId,
    },
  })

  res.status(201).json(step)
})
export default router
