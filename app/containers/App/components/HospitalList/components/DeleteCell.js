import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  IconButton
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

const DeleteCell = ({ data, value, params }) => {
  const [open, setOpen] = useState(false)
  const { dataId = null, description = '' } = data
  const dispatch = useDispatch()

  const displayConfirmationDialog = e => setOpen(true)

  const handleClose = () => {
    setOpen(false)
  }

  const deleteHospitalRecord = e => {
    if (dataId) {
      dispatch({
        type: 'DELETE_HOSPITAL',
        payload: {
          dataId
        }
      })
      setOpen(false)
    }
  }

  return (
    <>
      <IconButton
        onClick={displayConfirmationDialog}
        size="small"
        type="button"
      >
        <DeleteIcon style={{ color: '#d9534f' }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete ${description}?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteHospitalRecord} color="primary">
            OK
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default DeleteCell
