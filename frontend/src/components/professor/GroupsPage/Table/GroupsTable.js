import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import GroupService from '../../../../services/group.service'
import { TableContainer } from '../../../student/PointsPage/Table/TableStyle'
import { ERROR_OCCURRED } from '../../../../utils/constants'

export default function GroupsTable(props) {
  const [tableContent, setTableContent] = useState(undefined)

  const updateTableContent = () => {
    GroupService.getGroups()
      .then((response) => {
        setTableContent(response)
      })
      .catch(() => setTableContent(null))
  }

  useEffect(() => {
    updateTableContent()
    props.setRefreshFunction(() => updateTableContent)
    // I want this code to run ONLY ONCE, I don't care what this warning says, you are free to change it and see the consequences
    // eslint-disable-next-line
  }, [])

  const TableBody = (tableContent) => {
    return tableContent.map((row, idx) => (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{row.name}</td>
        <td>{row.invitationCode}</td>
      </tr>
    ))
  }

  return (
    // marginBottom prevents last records coverage by add button
    <>
      <TableContainer striped bordered hover style={{ marginBottom: '150px' }}>
        <thead>
          <tr>
            <th>Nr</th>
            <th>Nazwa grupy</th>
            <th>Kod</th>
          </tr>
        </thead>
        <tbody>
          {tableContent == null ? (
            <tr>
              <td colSpan={3}>{ERROR_OCCURRED}</td>
            </tr>
          ) : (
            TableBody(tableContent)
          )}
        </tbody>
      </TableContainer>
      {tableContent === undefined && <Spinner animation={'border'} />}
    </>
  )
}
