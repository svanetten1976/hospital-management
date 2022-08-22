import { isEqual } from 'lodash'
import plainJScustomizer from './plainJScustomizer'

/**
 * Compares two objects
 * @param {Object} a - object to compare
 * @param {Object} b - object to comapare against
 * @returns {Boolean} returns a bool
 */
const plainDeepEqual = isEqual // isEqualWith(a, b, plainJScustomizer)

export default plainDeepEqual
