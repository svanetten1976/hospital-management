import { camelCase } from 'lodash'

/**
 * converts a string, along with the optional removal
 * of a prefix, to a camelCased string
 * @param {string} str - string to transform
 * @param {string} prefix - prefix to lop off, if necessary
 * @returns {string} returns a camelCased string
 */
const toCamelCase = (str, prefix) => {
  const ret = prefix ? camelCase(str.replace(`${prefix}-`, '')) : camelCase(str)
  return ret
}
export default toCamelCase
