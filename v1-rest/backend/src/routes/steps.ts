import { Router } from "express";
import { prisma } from "@repo/prisma/client.js";

const router = Router();

router.get("/", async (_req, res) => {
  const steps = await prisma.step.findMany();
  res.json(steps);
});

router.post("/", async (req, res) => {
  const { title, description, difficulty, videoUrl } = req.body;
  const newStep = await prisma.step.create({
    data: { title, description, difficulty, videoUrl },
  });
  res.status(201).json(newStep);
});

export default router;