import React, { useState } from 'react'
import memoize from 'memoize-one'
import { makeStyles } from '@material-ui/core/styles'
import {
  Collapse,
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  IconButton,
  Icon
} from '@material-ui/core'

import { isEqual } from 'lodash'
import { stableSort, getComparator, getColCellStyle } from '../utils'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset'
    }
  }
})

export const getExpansionPanelColSpan = memoize(
  (columns = [], hasCheckboxSelection, expansionPanelKey) => {
    let colspan = columns.length

    if (hasCheckboxSelection) {
      colspan += 1
    }

    if (expansionPanelKey) {
      colspan += 1
    }

    return colspan
  },
  isEqual
)

const DataTableRow = ({
  rowData,
  rowIdentifier,
  hasCheckboxSelection = true,
  handleSelection,
  ignoreOddRowStyle = false,
  isItemSelected = false,
  selectionEnabledKey = '',
  columns = [],
  expansionPanelKey = '',
  ExpansionPanelDetailsRenderer = null
}) => {
  const [open, setOpen] = useState(false)
  const classes = useRowStyles()

  return (
    <>
      <TableRow
        className={expansionPanelKey ? classes.root : null}
        onClick={e => handleSelection(e, rowData, rowData[rowIdentifier])}
        style={ignoreOddRowStyle ? { background: '#fff' } : null}
      >
        {expansionPanelKey ? (
          <TableCell style={{ padding: '6px 5px' }}>
            <IconButton size="small" onClick={() => setOpen(!open)}>
              {open ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
            </IconButton>
          </TableCell>
        ) : null}
        {hasCheckboxSelection ? (
          <TableCell padding="checkbox">
            <Checkbox
              checked={isItemSelected}
              disabled={
                selectionEnabledKey ? !rowData[selectionEnabledKey] : false
              }
            />
          </TableCell>
        ) : null}
        {columns && Array.isArray(columns) && columns.length ? (
          columns.map(col => {
            const displayedValue =
              col.formatter && typeof col.formatter === 'function'
                ? col.formatter(rowData)
                : rowData[col.field]

            if (col.cellRenderer && typeof col.cellRenderer === 'function') {
              // console.log('cellRenderer', col.headerName, typeof col.cellRenderer)
              return (
                <TableCell style={getColCellStyle(col, rowData)}>
                  <col.cellRenderer
                    data={rowData}
                    value={col.field ? rowData[col.field] : null}
                    params={
                      col.cellRendererParams &&
                      typeof col.cellRendererParams === 'object'
                        ? col.cellRendererParams
                        : {}
                    }
                  />
                </TableCell>
              )
            }

            return (
              <TableCell
                style={getColCellStyle(col, rowData)}
                title={displayedValue}
              >
                {col.onClick && typeof col.onClick === 'function' ? (
                  <button
                    type="button"
                    onClick={e => {
                      e.stopPropagation()
                      col.onClick(rowData)
                    }}
                    style={
                      col.onClickDisabled &&
                      typeof col.onClickDisabled === 'function' &&
                      col.onClickDisabled(rowData)
                        ? { color: '#777' }
                        : { color: '#517b9c', textDecoration: 'underline' }
                    }
                    disabled={
                      col.onClickDisabled &&
                      typeof col.onClickDisabled === 'function'
                        ? col.onClickDisabled(rowData)
                        : false
                    }
                  >
                    {displayedValue}
                  </button>
                ) : (
                  <>{displayedValue}</>
                )}
              </TableCell>
            )
          })
        ) : (
          <TableCell
            style={{ textAlign: 'center' }}
            colspan={getExpansionPanelColSpan(
              columns,
              hasCheckboxSelection,
              expansionPanelKey
            )}
          >
            No rows to show
          </TableCell>
        )}
      </TableRow>
      {expansionPanelKey ? (
        <TableRow style={{ height: 'auto' }}>
          <TableCell
            style={{ background: '#fff', paddingBottom: 0, paddingTop: 0 }}
            colspan={getExpansionPanelColSpan(
              columns,
              hasCheckboxSelection,
              expansionPanelKey
            )}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              {ExpansionPanelDetailsRenderer ? (
                <ExpansionPanelDetailsRenderer
                  data={rowData}
                  value={rowData[expansionPanelKey]}
                />
              ) : (
                'no details'
              )}
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </>
  )
}

export default DataTableRow
