"use client"
import { useEffect, useState } from "react"
import { Box, Typography, Grid as MuiGrid } from "@mui/material"
import StepCard from "apps/web/components/molecules/Card"
import Button from "apps/web/components/atoms/Button"
import StepsModal from "apps/web/components/molecules/StepsModal"
import { Step } from "@prisma/client"
import { useUser } from "apps/web/lib/UserContext"

export default function StepsPage() {
  const [steps, setSteps] = useState<Step[]>([])
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("BEGINNER")
  const [videoUrl, setVideoUrl] = useState("")
  const [variation, setVariation] = useState("")
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    fetch("http://localhost:3001/steps", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setSteps(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch steps:", error)
        setLoading(false)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (isEdit) {
      const updatedStep = {
        id,
        title,
        description,
        difficulty,
        videoUrl,
        variation,
      }

      const res = await fetch(`http://localhost:3001/steps/steps/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedStep),
      })

      if (res.ok) {
        const updatedData = await res.json()
        setSteps((prev) =>
          prev.map((step) => (step.id === id ? updatedData : step))
        )
      } else {
        console.error("Failed to update step:", res.statusText)
      }
    } else {
      const newStep = {
        title,
        description,
        difficulty,
        videoUrl,
        variation,
      }

      const res = await fetch("http://localhost:3001/steps/steps", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStep),
      })

      if (res.ok) {
        const createdStep = await res.json()
        setSteps((prev) => [...prev, createdStep])
        setTitle("")
        setDescription("")
        setDifficulty("BEGINNER")
        setVideoUrl("")
        setVariation("")
      } else {
        console.error("Failed to create step:", res.statusText)
      }
    }
    setOpen(false)
    setIsEdit(false)
    setId(null)
  }

  if (loading) return <Typography>Loading steps...</Typography>
  const handleOpenModal = ({
    step,
    isEdit,
  }: {
    step?: Step
    isEdit: boolean
  }) => {
    if (isEdit && step) {
      setIsEdit(true)
      setId(step.id)
      setTitle(step.title)
      setDescription(step.description || "")
      setDifficulty(step.difficulty)
      setVideoUrl(step.videoUrl || "")
      setVariation(step.parentId || "")
    } else {
      setIsEdit(false)
      setTitle("")
      setDescription("")
      setDifficulty("BEGINNER")
      setVideoUrl("")
      setVariation("")
    }

    setOpen(true)
  }

  const user = useUser()
  if (!user) {
    return <Typography>Please log in to view steps.</Typography>
  }
  return (
    <Box>
      <Button
        sx={{ mb: 2, ml: 2 }}
        variant="contained"
        color="primary"
        onClick={() => {
          handleOpenModal({ isEdit: false })
        }}
      >
        Create Step
      </Button>
      <MuiGrid container spacing={2}>
        {steps.length > 0 &&
          steps.map((step) => (
            <Box key={step.id} sx={{ mb: 2 }}>
              <StepCard
                setSteps={setSteps}
                onClick={() => {
                  handleOpenModal({ step, isEdit: true })
                }}
                step={step}
              />
            </Box>
          ))}
      </MuiGrid>
      <StepsModal
        open={open}
        handleClose={handleClose}
        isEdit={isEdit}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        videoUrl={videoUrl}
        setVideoUrl={setVideoUrl}
        handleSubmit={handleSubmit}
        setVariation={setVariation}
        variation={variation}
        stepsCreated={steps}
      />
    </Box>
  )
}
