import React from 'react'
import { debounce } from 'lodash'
import { useDispatch } from 'react-redux'
import { Button, IconButton, Icon } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'

const DescriptionCell = ({ data, value, params }) => {
  const { dataId = null } = data
  const { onClickEditHospital } = params

  return (
    <Button
      onClick={e => onClickEditHospital(e, dataId)}
      size="small"
      style={{ padding: 5, textTransform: 'none', textAlign: 'left' }}
      startIcon={<EditIcon />}
      type="button"
    >
      {value}
    </Button>
  )
}

export default DescriptionCell
