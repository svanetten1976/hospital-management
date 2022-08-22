import React, { useEffect, useState } from 'react'
import { Button, Paper } from '@material-ui/core'
import { withDispatch } from 'react-redux'

import DataTable from '../DataTable'

import EditHosptialDialog from '../EditHospitalDialog'
import DeleteCell from './components/DeleteCell'
import DescriptionCell from './components/DescriptionCell'

import usePrevious from '../../hooks/usePrevious'
import plainDeepEqual from '../../utils/plainDeepEqual'
import { set as localSet } from '../../utils/local'

const HospitalList = props => {
  let { hospitals } = props
  hospitals = hospitals && hospitals.toJS ? hospitals.toJS() : []
  const prevHospitals = usePrevious(hospitals)
  const [open, setOpen] = useState(false)
  const [selectedHospital, setSelectedHospital] = useState({})

  useEffect(() => {
    if (!plainDeepEqual(hospitals, prevHospitals)) {
      try {
        localSet('hospitalList', hospitals)
      } catch (e) {
        console.log(e)
      }
    }
  }, [hospitals, prevHospitals])

  const handleClose = value => {
    setOpen(false)
  }

  const onClickEditHospital = (event, dataId) => {
    const selected = dataId
      ? hospitals.find(x => x.dataId === dataId) || {}
      : {}

    setSelectedHospital(selected)
    setOpen(true)
  }

  const addNewHospital = e => {
    setSelectedHospital({})
    setOpen(true)
  }

  const columns = [
    {
      field: 'description',
      headerName: 'Hospital Name',
      cellStyle: { fontSize: 12 },
      cellRenderer: DescriptionCell,
      cellRendererParams: {
        onClickEditHospital
      }
    },
    {
      field: 'type',
      headerName: 'Type'
    },
    {
      field: 'address1',
      headerName: 'Address 1'
    },
    {
      field: 'address2',
      headerName: 'Address 2'
    },
    {
      field: 'phone',
      headerName: 'Phone'
    },
    {
      field: 'email',
      headerName: 'Email'
    },
    {
      field: 'city',
      headerName: 'City'
    },
    {
      field: 'state',
      headerName: 'State'
    },
    {
      field: 'zip',
      headerName: 'Zip'
    },
    {
      cellStyle: { textAlign: 'center', width: 50 },
      field: '',
      headerName: '',
      headerStyle: { textAlign: 'center', width: 50 },
      cellRenderer: DeleteCell,
      suppressSort: true
    }
  ]

  return (
    <div style={{ margin: 10 }}>
      <Paper>
        <DataTable
          defaultSortOrder="asc"
          defaultOrderBy="description"
          hasCheckboxSelection={false}
          data={hospitals}
          isFetching={false}
          columns={columns}
          // ignoreOddRowStyle
          defaultRowsPerPage={10}
          rowsPerPageOptions={[10, 20, 30]}
        />
      </Paper>
      <div
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          display: 'flex'
        }}
      >
        <Button variant="contained" color="primary" onClick={addNewHospital}>
          Add New Hospital
        </Button>
      </div>
      <EditHosptialDialog
        open={open}
        onClose={handleClose}
        selectedHospital={selectedHospital}
      />
    </div>
  )
}

export default HospitalList
