import { fromJS, setIn } from 'immutable'
import shortid from 'shortid'

import createReducer from './utils/createReducer'
import { get as localGet } from './utils/local'

const initialHospitalList = localGet('hospitalList') || null

const hospitalList =
  initialHospitalList && Array.isArray(initialHospitalList)
    ? initialHospitalList
    : [
        {
          dataId: 'riverview-medical-center',
          description: 'Riverview Medical Center',
          email: 'info@riverviewmedical.com',
          phone: '732-741-2700',
          address1: '500 West Front Street',
          address2: '',
          city: 'Red Bank',
          state: 'NJ',
          zip: '07701',
          comments: ''
        }
      ]

const initialState = {
  hospitals: fromJS(hospitalList)
}

const behaviors = {
  DELETE_HOSPITAL: (state, { payload }) => {
    let result = state

    let { hospitals } = result

    if (payload.dataId) {
      const rowIndex = hospitals.findIndex(
        x => x.get('dataId') === payload.dataId
      )

      hospitals = hospitals.delete(rowIndex)
      result = setIn(result, ['hospitals'], hospitals)
    }

    return result
  },
  SAVE_HOSPITAL: (state, { payload }) => {
    let result = state

    let { hospitals } = result

    if (payload.dataId) {
      const rowIndex = hospitals.findIndex(
        x => x.get('dataId') === payload.dataId
      )

      for (const prop in payload) {
        if (prop !== 'dataId') {
          hospitals = hospitals.update(rowIndex, data =>
            data.set(prop, payload[prop])
          )
        }
      }
    } else {
      hospitals = hospitals.insert(
        hospitals.size,
        fromJS({
          ...payload,
          dataId: shortid.generate()
        })
      )
    }

    result = setIn(result, ['hospitals'], hospitals)

    return result
  }
}

export default createReducer(initialState, behaviors)
