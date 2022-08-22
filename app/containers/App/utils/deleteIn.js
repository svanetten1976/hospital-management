import { toPath } from 'lodash'

/**
 * removes a key/value pair from any Immutable Map
 * @param {object} state - state object
 * @param {string} field - field to remove
 * @returns {object} returns an updated state Map
 */
const deleteIn = (state, field) => state.deleteIn(toPath(field))

export default deleteIn
