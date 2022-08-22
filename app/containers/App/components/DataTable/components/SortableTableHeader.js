import React from 'react'
import { noop } from 'lodash'
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core'
import { getHeaderStyle, getSortableHeaderStyle } from '../utils'
import toCamelCase from '../../../utils/toCamelCase'

const SortableTableHeader = ({
  order,
  orderBy,
  numSelected = 0,
  rowCount = 0,
  columns = [],
  handleSelectAllClick = noop,
  handleRequestSort = noop,
  hasCheckboxSelection = true,
  expansionPanelKey = ''
}) => {
  const createSortHandler = property => event => {
    handleRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {expansionPanelKey ? (
          <TableCell style={{ padding: '6px 5px' }} />
        ) : null}
        {hasCheckboxSelection ? (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={handleSelectAllClick}
              inputProps={{ 'aria-label': 'select all' }}
              disabled={!rowCount}
            />
          </TableCell>
        ) : null}
        {columns && Array.isArray(columns) && columns.length
          ? columns.map((col, i) => {
              // console.log('here_column', col)
              if (!col.field || col.suppressSort) {
                return (
                  <TableCell
                    key={
                      col.headerName ? toCamelCase(col.headerName) : `col-${i}`
                    }
                    style={getHeaderStyle(col)}
                  >
                    {col.headerName ? col.headerName : ''}
                  </TableCell>
                )
              }

              return (
                <TableCell
                  key={col.field}
                  sortDirection={orderBy === col.field ? order : false}
                  style={getHeaderStyle(col)}
                >
                  <TableSortLabel
                    active={orderBy === col.field}
                    direction={orderBy === col.field ? order : 'asc'}
                    onClick={createSortHandler(col.field)}
                    style={getSortableHeaderStyle(col)}
                  >
                    {col.headerName}
                  </TableSortLabel>
                </TableCell>
              )
            })
          : null}
      </TableRow>
    </TableHead>
  )
}

// export default React.memo(SortableTableHeader, plainDeepEqual)
export default SortableTableHeader
