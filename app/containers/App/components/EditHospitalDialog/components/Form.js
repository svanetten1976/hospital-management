import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField
} from '@material-ui/core'

import statesList from '../../../utils/statesList'
import '../styles/form.scss'

const types = [
  { dataId: 'C', description: 'Cancer Center' },
  { dataId: 'G', description: 'General Hospital' },
  { dataId: 'O', description: 'Other' },
  { dataId: 'P', description: 'Pediatric' }
]

const Form = forwardRef(
  (
    {
      initialState = {
        dataId: null,
        description: '',
        name: '',
        phone: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        comments: ''
      }
    },
    ref
  ) => {
    const [state, setState] = useState(initialState)

    useImperativeHandle(ref, () => ({
      getState() {
        console.log(state)
        return state
      }
    }))

    const handleTextFieldChange = name => event =>
      setState({
        ...state,
        [name]: event.target.value
      })

    const onSelectChange = name => event =>
      setState({
        ...state,
        [name]: event.target.value
      })

    return (
      <div className="form-wrapper" ref={ref}>
        <div className="form-row">
          <TextField
            value={state.description}
            label="Description"
            onChange={handleTextFieldChange('description')}
            error={!state.description}
            helperText={!state.description ? 'This field is required' : ''}
          />
          <div>
            <FormControl style={{ width: '100%' }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={state.type}
                onChange={onSelectChange('type')}
                style={{ width: '100%' }}
              >
                {types.map((x, i) => (
                  <MenuItem value={x.dataId}>{x.description}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="form-row">
          <TextField
            value={state.address1}
            label="Address Line 1"
            onChange={handleTextFieldChange('address1')}
          />
          <TextField
            value={state.address2}
            label="Address Line 2"
            onChange={handleTextFieldChange('address2')}
          />
        </div>
        <div className="form-row">
          <TextField
            value={state.city}
            label="City"
            onChange={handleTextFieldChange('city')}
          />
          <div>
            <FormControl style={{ width: '100%' }}>
              <InputLabel>State</InputLabel>
              <Select
                value={state.state}
                onChange={onSelectChange('state')}
                style={{ width: '100%' }}
              >
                {statesList.map((x, i) => (
                  <MenuItem value={x.dataId}>{x.description}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="form-row">
          <TextField
            value={state.phone}
            label="Phone"
            onChange={handleTextFieldChange('phone')}
          />
          <TextField
            value={state.email}
            label="Email"
            onChange={handleTextFieldChange('email')}
          />
        </div>
        <div className="form-row form-row-wide">
          <TextField
            value={state.comments}
            label="Comments"
            onChange={handleTextFieldChange('comments')}
            variant="outlined"
            rows={4}
            multiline
          />
        </div>
      </div>
    )
  }
)

export default Form
