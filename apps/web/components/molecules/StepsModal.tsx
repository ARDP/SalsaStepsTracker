import React, { useEffect } from "react"
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button as MUIButton,
  Modal,
} from "@mui/material"
import { Step } from "@prisma/client"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

type StepsModalProps = {
  open: boolean
  handleClose: () => void
  isEdit: boolean
  title: string
  setTitle: (value: string) => void
  description: string
  setDescription: (value: string) => void
  difficulty: string
  setDifficulty: (value: string) => void
  videoUrl: string
  setVideoUrl: (value: string) => void
  variation: string
  setVariation: (value: string) => void
  stepsCreated: Step[]
  handleSubmit: (e: React.FormEvent) => Promise<void>
}
const StepsModal = ({
  open,
  handleClose,
  isEdit,
  title,
  setTitle,
  description,
  setDescription,
  difficulty,
  setDifficulty,
  videoUrl,
  setVideoUrl,
  variation,
  setVariation,
  handleSubmit,
  stepsCreated,
}: StepsModalProps) => {
  const [steps, setSteps] = React.useState([])
  const [, setLoading] = React.useState(true)

  useEffect(() => {
    fetch("http://localhost:3001/steps/allSteps", {
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
  }, [stepsCreated])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box p={4}>
          <Typography variant="h4" mb={4}>
            {isEdit ? "Edit Step" : "Create Step"}
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

            <FormControl fullWidth>
              <InputLabel>This is a variation</InputLabel>
              <Select
                value={variation}
                label="This is a variation from"
                onChange={(e) => setVariation(e.target.value)}
              >
                {steps.map((step: Step) => (
                  <MenuItem key={step.id} value={step.id}>
                    {step.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <MUIButton variant="contained" color="primary" type="submit">
              Save
            </MUIButton>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}

export default StepsModal
