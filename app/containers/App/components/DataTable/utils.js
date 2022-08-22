import memoize from 'memoize-one'
import moment from 'moment'
import { startCase } from 'lodash'
import { fromJS } from 'immutable'
import plainDeepEqual from '../../utils/plainDeepEqual'

export const descendingComparator = memoize((a, b, orderBy) => {
  let dataPointA = a[orderBy]
  let dataPointB = b[orderBy]
  dataPointA =
    typeof dataPointA === 'string' ? dataPointA.toLowerCase() : dataPointA
  dataPointB =
    typeof dataPointB === 'string' ? dataPointB.toLowerCase() : dataPointB

  if (
    typeof dataPointA === 'object' &&
    dataPointA !== null &&
    dataPointA.value &&
    typeof dataPointB === 'object' &&
    dataPointB !== null &&
    dataPointB.value
  ) {
    /* 
      account for comparisions of data objects that have the structure 
      { value: 'X', tooltip: 'Y' }
    */

    if (dataPointB.value < dataPointA.value) {
      return -1
    }

    if (dataPointB.value > dataPointA.value) {
      return 1
    }

    return 0
  }

  if (dataPointB < dataPointA || !dataPointB) {
    return -1
  }

  if (dataPointB > dataPointA || !dataPointA) {
    return 1
  }

  return 0
}, plainDeepEqual)

export const dateComparator = memoize((a, b, order, orderBy) => {
  if (!a[orderBy] || !b[orderBy]) {
    if (!a[orderBy]) {
      return order === 'desc' ? 0 : -1
    }

    if (!b[orderBy]) {
      return order === 'desc' ? -1 : 0
    }
  }

  if (moment(a[orderBy]) < moment(b[orderBy])) {
    return order === 'asc' ? -1 : 1
  }

  if (moment(a[orderBy]) > moment(b[orderBy])) {
    return order === 'asc' ? 1 : -1
  }

  return 0
}, plainDeepEqual)

/* 
  need to parameterize getComparator function here and allow
  for sorting of nested objects
*/

export const getComparator = memoize((order, orderBy) => {
  if (orderBy.match(/date/gi)) {
    return (a, b) => dateComparator(a, b, order, orderBy)
  }

  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
})

export const stableSort = memoize((array, comparator) => {
  const isImm = array.toJS
  array = isImm ? array.toJS() : array
  const stabilizedThis = array.map((el, index) => [el, index])

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })

  return isImm
    ? fromJS(stabilizedThis.map(el => el[0]))
    : stabilizedThis.map(el => el[0])
}, plainDeepEqual)

// <TableCell style={
//   col.cellStyle && typeof col.cellStyle === 'function' && typeof col.cellStyle(x) === 'object' ?
//   col.cellStyle(x) :
//   col.cellStyle && typeof col.cellStyle === 'object' ? col.cellStyle : null
// }>

/* could have done this as a nested ternary like this^^ but the memoized fn is more readable and more efficent */
export const getColCellStyle = memoize((col, data) => {
  if (!col) {
    return null
  }

  if (
    col.cellStyle &&
    typeof col.cellStyle === 'function' &&
    typeof col.cellStyle(data) === 'object'
  ) {
    return col.cellStyle(data)
  }

  if (col.cellStyle && typeof col.cellStyle === 'object') {
    return col.cellStyle
  }

  return null
}, plainDeepEqual)

export const getHeaderStyle = memoize(col => {
  if (!col) {
    return null
  }

  if (col.headerStyle && typeof col.headerStyle === 'object') {
    return col.headerStyle
  }

  return null
}, plainDeepEqual)

export const getSortableHeaderStyle = memoize(col => {
  if (!col) {
    return null
  }

  if (col.sortableHeaderStyle && typeof col.sortableHeaderStyle === 'object') {
    return col.sortableHeaderStyle
  }

  return null
}, plainDeepEqual)

export const getItemGroups = memoize(
  (data = [], itemGroupsRowDataKey = 'lineItems') => {
    const itemGroups =
      data && Array.isArray(data) && data.length
        ? data.reduce((acc, next, idx) => {
            const groupName = next.itemGroupId
              ? startCase(next.itemGroupId)
              : next.itemGroupDescription
            const groupDesc = next.itemGroupDescription
            if (acc[groupName]) {
              acc = {
                ...acc,
                [groupName]: {
                  ...acc[groupName],
                  [itemGroupsRowDataKey]: [
                    ...acc[groupName][itemGroupsRowDataKey],
                    { ...next, rowIndex: idx }
                  ]
                }
              }
            } else {
              acc = {
                ...acc,
                [groupName]: {
                  [itemGroupsRowDataKey]: [{ ...next, rowIndex: idx }],
                  description: groupDesc
                }
              }
            }
            return acc
          }, {})
        : {}

    return itemGroups
  },
  plainDeepEqual
)
