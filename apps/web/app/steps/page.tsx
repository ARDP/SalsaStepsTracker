"use client"
import { useEffect, useState } from "react"
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button as MUIButton,
  Card,
  CardContent,
} from "@mui/material"

type Step = {
  id: string
  title: string
  description?: string
  difficulty: string
  videoUrl?: string
}

export default function StepsPage() {
  const [steps, setSteps] = useState<Step[]>([])
  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("BEGINNER")
  const [videoUrl, setVideoUrl] = useState("")

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
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newStep = { title, description, difficulty, videoUrl }

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
    } else {
      console.error("Failed to create step:", res.statusText)
    }
  }

  if (loading) return <Typography>Loading steps...</Typography>

  return (
    <Box p={4}>
      <Typography variant="h4" mb={4}>
        Salsa Steps (REST)
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        mb={4}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl fullWidth>
          <InputLabel>Difficulty</InputLabel>
          <Select
            value={difficulty}
            label="Difficulty"
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <MenuItem value="BEGINNER">BEGINNER</MenuItem>
            <MenuItem value="INTERMEDIATE">INTERMEDIATE</MenuItem>
            <MenuItem value="ADVANCED">ADVANCED</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <MUIButton variant="contained" color="primary" type="submit">
          Create Step
        </MUIButton>
      </Box>

      {steps.length > 0 &&
        steps.map((step) => (
          <Card key={step.id} sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {step.title} — <small>{step.difficulty}</small>
              </Typography>
              {step.description && (
                <Typography variant="body2" color="text.secondary">
                  {step.description}
                </Typography>
              )}
              {step.videoUrl && (
                <Typography>
                  <a
                    href={step.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </a>
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
    </Box>
  )
}
