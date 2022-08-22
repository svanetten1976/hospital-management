import React from 'react'
import { getIn, fromJS, setIn } from 'immutable'
import { connect } from 'react-redux'
import shortid from 'shortid'

import createReducer from './utils/createReducer'
import deleteIn from './utils/deleteIn'
// import getIn from './utils/getIn'
import toCamelCase from './utils/toCamelCase'

import HospitalList from './components/HospitalList'

const ConnectedHospitalsList = props => <HospitalList {...props} />

const mapStateToProps = (state, ownProps) => {
  const hospitals = getIn(state, ['hospitals', 'hospitals']) || fromJS([])
  console.log('mapStateToProps', state, hospitals)
  return { hospitals }
}

export default connect(
  mapStateToProps,
  null,
  null,
  { forwardRef: true }
)(ConnectedHospitalsList)
