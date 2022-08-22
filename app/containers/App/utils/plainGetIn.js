import { toPath } from 'lodash'

/**
 * grabs an item from an object / collection
 * @param {Object} state - state object / collection
 * @param {string} field - key to grab
 * @returns {any} returns the value
 */
const plainGetIn = (state, field) => {
  if (!state) {
    return state
  }

  const path = toPath(field)
  const length = path.length // eslint-disable-line
  if (!length) {
    return undefined
  }

  let result = state
  for (let i = 0; i < length && !!result; ++i) {
    result = result[path[i]]
  }

  return result
}

export default plainGetIn
