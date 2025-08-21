import * as React from "react"
import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import { Modal, TextField } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

import { useState } from "react"
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button as MUIButton,
  Grid,
} from "@mui/material"
import ConfirmationModal from "./ConfirmationModal"

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

export default function StepCard({
  step,
  onClick,
  setSteps,
}: {
  step: any
  onClick?: () => void
  setSteps: React.Dispatch<React.SetStateAction<any[]>>
}) {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [difficulty, setDifficulty] = useState("BEGINNER")
  const [videoUrl, setVideoUrl] = useState("")

  const handleDeleteStep = async () => {
    const res = await fetch(`http://localhost:3001/steps/steps/${step.id}`, {
      method: "DELETE",
      credentials: "include",
    })

    if (res.ok) {
      // Logic to remove step from state
      console.log("Step deleted successfully")
      //have to refresh the steps list
      setSteps((prev) => prev.filter((s) => s.id !== step.id))
      setOpen(false)
    } else {
      console.error("Failed to delete step:", res.statusText)
    }
  }
  const [modalOpen, setModalOpen] = useState(false)

  const handleConfirm = () => {
    handleDeleteStep()
    setModalOpen(false)
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  return (
    <>
      <Card sx={{ minHeight: 200, height: "100%", margin: 2, width: 300 }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {step.title}
          </Typography>
          <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
            {step.difficulty}
          </Typography>
          <Typography variant="body2">
            {step.description}
            <br />
            {step.videoUrl ? (
              <a href={step.videoUrl} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            ) : (
              <div style={{ color: "red", marginTop: "10px" }}>
                <span>No Video Available</span>
              </div>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => setModalOpen(true)}>
            <DeleteIcon />
          </Button>
          <Button size="small" onClick={onClick}>
            <EditIcon />
          </Button>
        </CardActions>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box p={4}>
            <Box
              component="form"
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
          </Box>
        </Box>
      </Modal>
      <ConfirmationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  )
}
