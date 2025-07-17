import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

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

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  onCancel,
}: {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  onCancel: () => void
}) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const handleCancel = () => {
    onCancel()
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Action
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Are you sure you want to proceed?
        </Typography>
        <Box mt={4} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
