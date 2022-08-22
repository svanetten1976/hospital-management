/**
 * HOC that returns a reducer function
 * @param {object} initialState - reducer initial state
 * @param {object} behaviors - keyed reducer mapping
 * @returns {function} with the current state and payload
 */

const createReducer = (initialState, behaviors, noResetOnLogout = false) => (
  state = initialState,
  action = { type: '' }
) => {
  const { type } = action

  const reducer = behaviors[type]
  return reducer ? reducer(state, action) : state
}

export default createReducer
