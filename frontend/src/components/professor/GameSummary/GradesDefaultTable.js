import { TableContainer } from '../../student/PointsPage/Tables/TableStyle'
import React from 'react'
import { GradesData, GradesTableContent, GradesTableHeaders } from './utils'

export const GradesDefaultTable = (tableType) => {
  const headers = GradesTableHeaders(tableType)
  const tableContent = GradesData(tableType)

  const content = tableContent.map((row, idx1) => {
    return (
      <tr key={idx1}>
        {GradesTableContent(tableType, row, idx1).map(([key, value], idx2) => {
          return <td key={idx2}>{value}</td>
        })}
      </tr>
    )
  })

  return (
    <TableContainer striped bordered hover>
      <thead>
        <tr>
          {headers.map((header, idx) => {
            return <td key={idx}>{header}</td>
          })}
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </TableContainer>
  )
}
