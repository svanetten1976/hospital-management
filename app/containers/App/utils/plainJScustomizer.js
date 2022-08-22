/**
 * customizer function for plain objects
 * @param {object} obj - object to compare
 * @param {object} other - object for comparision
 * @returns {Boolean|undefined} can return true/false/undefined
 */
const plainJScustomizer = (obj, other) => {
  if (obj == other) return true // eslint-disable-line eqeqeq
  if (
    (obj == null || obj === '' || obj === false) &&
    (other == null || other === '' || other === false)
  )
    return true

  if (obj && other && obj._error !== other._error) return false
  if (obj && other && obj._warning !== other._warning) return false
  return undefined
}

export default plainJScustomizer
