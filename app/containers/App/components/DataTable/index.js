import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Checkbox,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Icon,
  IconButton
} from '@material-ui/core'
import SortableTableHeader from './components/SortableTableHeader'
import DataTableRow, {
  getExpansionPanelColSpan
} from './components/DataTableRow'

import {
  stableSort,
  getComparator,
  getItemGroups,
  getColCellStyle
} from './utils'

const DataTable = ({
  rowIdentifier = 'dataId',
  defaultOrderBy = 'dataId',
  defaultSortOrder = 'desc',
  columns = [],
  data = [],
  isFetching = false,
  setSelectedRowsAction = null,
  selectionEnabledKey = '',
  rowsPerPageOptions = [5, 10, 25, 100],
  defaultRowsPerPage = 5,
  hasCheckboxSelection = true,
  ignoreOddRowStyle = false,
  expansionPanelKey = '',
  ExpansionPanelDetailsRenderer = null,
  hasItemGroups = false,
  itemGroupsRowDataKey = 'lineItems'
}) => {
  const dispatch = useDispatch()

  const [state, setState] = useState({
    orderBy: defaultOrderBy,
    order: defaultSortOrder,
    rowsPerPage: defaultRowsPerPage,
    page: 0,
    selected: [],
    expandedGroups: []
  })

  const { order, orderBy, rowsPerPage, page, selected, expandedGroups } = state

  const handleSelectAllClick = event => {
    // debugger
    if (event.target.checked) {
      const newSelecteds = selectionEnabledKey
        ? data.filter(x => x[selectionEnabledKey]).map(n => n[rowIdentifier])
        : data.map(n => n[rowIdentifier])

      setState({
        ...state,
        selected: newSelecteds
      })

      return
    }

    setState({
      ...state,
      selected: []
    })
  }

  const handleSelection = (event, row, name) => {
    if (
      (selectionEnabledKey && !row[selectionEnabledKey]) ||
      !hasCheckboxSelection
    ) {
      return
    }

    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setState({
      ...state,
      selected: newSelected
    })
  }

  const handleChangePage = (e, newPage) => {
    setState({
      ...state,
      page: newPage
    })
  }

  const handleChangeRowsPerPage = event => {
    setState({
      ...state,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    })
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'

    setState({
      ...state,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property
    })
  }

  const isSelected = rowId => selected.includes(rowId)

  const numSelected = selected.length

  const rowCount =
    data && Array.isArray(data) && data.length
      ? selectionEnabledKey
        ? data.filter(x => x[selectionEnabledKey]).length
        : data.length
      : 0

  const onExpandGroup = (e, group) => {
    if (expandedGroups.includes(group)) {
      setState({
        ...state,
        expandedGroups: expandedGroups.filter(x => x !== group)
      })
    } else {
      setState({
        ...state,
        expandedGroups: [...expandedGroups, group]
      })
    }
  }

  const itemGroups =
    hasItemGroups && data && Array.isArray(data) && data.length
      ? getItemGroups(data)
      : {}

  const itemGroupKeys = Object.keys(itemGroups) || []

  if (isFetching) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
          width: '100%'
        }}
      >
        <CircularProgress thickness={7} size={100} />
      </div>
    )
  }

  return (
    <TableContainer>
      <Table size="small">
        <SortableTableHeader
          columns={columns}
          order={order}
          orderBy={orderBy}
          numSelected={numSelected}
          rowCount={rowCount}
          handleSelectAllClick={handleSelectAllClick}
          handleRequestSort={handleRequestSort}
          hasCheckboxSelection={hasCheckboxSelection}
          expansionPanelKey={expansionPanelKey}
        />
        <TableBody>
          {data && Array.isArray(data) && data.length ? (
            hasItemGroups && itemGroups && Object.keys(itemGroups).length ? (
              itemGroupKeys.map(group => (
                <>
                  <TableRow style={{ background: '#e5ebf0' }}>
                    <TableCell
                      colspan={getExpansionPanelColSpan(
                        columns,
                        hasCheckboxSelection,
                        expansionPanelKey
                      )}
                      style={{
                        color: '#517b9c',
                        padding: 5,
                        fontWeight: 'bold',
                        cursor: 'pointer'
                      }}
                      onClick={e => onExpandGroup(e, group)}
                    >
                      <IconButton style={{ color: '#517b9c', padding: 5 }}>
                        <Icon>
                          {expandedGroups.includes(group)
                            ? 'expand_less'
                            : 'expand_more'}
                        </Icon>
                      </IconButton>
                      <span>
                        {`${itemGroups[group].description} (${
                          itemGroups[group][itemGroupsRowDataKey].length
                        })`}
                      </span>
                    </TableCell>
                  </TableRow>
                  {expandedGroups.includes(group)
                    ? stableSort(
                        itemGroups[group][itemGroupsRowDataKey],
                        getComparator(order, orderBy)
                      ).map(x => {
                        // console.log(x)
                        const isItemSelected = isSelected(x[rowIdentifier])
                        return (
                          <DataTableRow
                            rowData={x}
                            rowIdentifier={rowIdentifier}
                            hasCheckboxSelection={hasCheckboxSelection}
                            handleSelection={handleSelection}
                            ignoreOddRowStyle={ignoreOddRowStyle}
                            isItemSelected={isItemSelected}
                            selectionEnabledKey={selectionEnabledKey}
                            columns={columns}
                            expansionPanelKey={expansionPanelKey}
                            ExpansionPanelDetailsRenderer={
                              ExpansionPanelDetailsRenderer
                            }
                          />
                        )
                      })
                    : null}
                </>
              ))
            ) : (
              stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((x, i) => {
                  // console.log(x)
                  const isItemSelected = isSelected(x[rowIdentifier])
                  return (
                    <DataTableRow
                      rowData={x}
                      rowIdentifier={rowIdentifier}
                      hasCheckboxSelection={hasCheckboxSelection}
                      handleSelection={handleSelection}
                      ignoreOddRowStyle={ignoreOddRowStyle}
                      isItemSelected={isItemSelected}
                      selectionEnabledKey={selectionEnabledKey}
                      columns={columns}
                      expansionPanelKey={expansionPanelKey}
                      ExpansionPanelDetailsRenderer={
                        ExpansionPanelDetailsRenderer
                      }
                    />
                  )
                })
            )
          ) : (
            <TableRow style={{ background: '#fff' }}>
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
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!hasItemGroups ? (
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : null}
    </TableContainer>
  )
}

// export default React.memo(DataTable, plainDeepEqual)
export default DataTable
