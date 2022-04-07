import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material"
import * as React from "react"

export interface CommentDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
}

const CommentDialog = (props: CommentDialogProps) => {
  const { onClose, selectedValue, open } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a comment</DialogTitle>
        <Box
          sx={{
            width: 500,
            height: 0,
            my: 0,
            mx: 0,
          }}
        ></Box>
        <DialogContent sx={{ paddingTop: 0 }}>
          <TextField
            autoFocus
            margin="dense"
            fullWidth
            id="outlined-multiline-flexible"
            label="Comment"
            multiline
            maxRows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default CommentDialog
