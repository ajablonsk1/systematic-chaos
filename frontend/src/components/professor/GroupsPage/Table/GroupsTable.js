import React from 'react'
import { getTableContent } from '../../../../storage/groupsTable'
import { TableContainer } from '../../../student/PointsPage/Table/TableStyle'

export default function GroupsTable() {
  const tableContent = getTableContent() // todo: get from endpoint

  const TableBody = tableContent.map((row, idx) => (
    <tr key={idx}>
      <td>{idx + 1}</td>
      <td>{row.name}</td>
      <td>{row.code}</td>
    </tr>
  ))

  return (
    // marginBottom prevents last records coverage by add button
    <TableContainer striped bordered hover style={{ marginBottom: '150px' }}>
      <thead>
        <tr>
          <th>Nr</th>
          <th>Nazwa grupy</th>
          <th>Kod</th>
        </tr>
      </thead>
      <tbody>{TableBody}</tbody>
    </TableContainer>
  )
}