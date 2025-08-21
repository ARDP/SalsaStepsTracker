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

router.get("/allSteps", requireAuth, async (req: AuthRequest, res) => {
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
  const { title, description, difficulty, videoUrl, variation } = req.body

  if (!req.user) return res.status(401).json({ error: "Unauthorized" })

  //check if step is already created by the user with the same title
  const existingStep = await prisma.step.findFirst({
    where: {
      title,
      userId: req.user.userId,
    },
  })
  if (existingStep) {
    return res
      .status(400)
      .json({ error: "Step with this title already exists" })
  }

  const step = await prisma.step.create({
    data: {
      title,
      description,
      difficulty,
      videoUrl,
      userId: req.user.userId,
      parentId: variation || null,
    },
  })

  res.status(201).json(step)
})

router.put("/steps/:id", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.params
  const { title, description, difficulty, videoUrl, variation } = req.body
  if (!req.user) return res.status(401).json({ error: "Unauthorized" })
  const step = await prisma.step.update({
    where: {
      id,
      userId: req.user.userId,
    },
    data: {
      title,
      description,
      difficulty,
      videoUrl,
      parentId: variation || null,
    },
  })
  res.json(step)
})

router.delete("/steps/:id", requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.params

  if (!req.user) return res.status(401).json({ error: "Unauthorized" })

  //first check if the step exists
  const existingStep = await prisma.step.findUnique({
    where: {
      id,
      userId: req.user.userId,
    },
  })
  if (!existingStep) {
    return res.status(404).json({ error: "Step not found" })
  }

  await prisma.step.delete({
    where: {
      id,
      userId: req.user.userId,
    },
  })

  res.status(204).send()
})

export default router
