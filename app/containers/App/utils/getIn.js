import { Map, List } from 'immutable'
import { toPath } from 'lodash'
import plainGetIn from './plainGetIn'

/**
 * plucks a value from an Immutable state object
 * @param {object} state - state object (list or Map)
 * @param {string} field - field name
 * @returns {object} returns the value of the field
 */
const getIn = (state, field) =>
  Map.isMap(state) || List.isList(state)
    ? state.getIn(toPath(field))
    : plainGetIn(state, field)

export default getIn
