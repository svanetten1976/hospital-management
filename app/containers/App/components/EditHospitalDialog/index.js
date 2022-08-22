import React, { createRef, forwardRef, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent
} from '@material-ui/core'
import Form from './components/Form'

let hospitalForm

const EditHospitalDialog = props => {
  const dispatch = useDispatch()
  hospitalForm = useRef(null)

  const { onClose, open, selectedHospital } = props

  const onBackdropClick = e => e.preventDefault()

  const handleClose = () => {
    onClose()
  }

  const onSaveHospital = e => {
    e.preventDefault()
    e.stopPropagation()

    const payload = hospitalForm.current.getState()

    if (payload && payload.description) {
      dispatch({
        type: 'SAVE_HOSPITAL',
        payload
      })

      onClose()
    }
  }

  const dialogTitle =
    selectedHospital && selectedHospital.dataId
      ? 'Edit Hospital'
      : 'Add New Hospital'

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      maxWidth={false}
      onBackdropClick={onBackdropClick}
      disableBackdropClick
    >
      <DialogTitle id="simple-dialog-title">{dialogTitle}</DialogTitle>
      <DialogContent>
        <div style={{ width: 800 }}>
          <Form initialState={selectedHospital} ref={hospitalForm} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSaveHospital} variant="contained" color="primary">
          Save
        </Button>
        <Button onClick={handleClose} variant="contained" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditHospitalDialog
