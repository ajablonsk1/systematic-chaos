import React from 'react'
import { getTableContent } from '../../../../storage/pointsTable'
import { getActivityTypeName } from '../../../../utils/constants'
import { TableContainer } from './TableStyle'

export default function PointsTable() {
  const tableContent = getTableContent()

  const tableHeaders = ['Data', 'Liczba punktów', 'Typ aktywności', 'Nazwa aktywności'].map((title, index) => (
    <th key={index} className='w-25'>
      {title}
    </th>
  ))

  return (
    <TableContainer className='mb-md-0 mb-5' striped bordered hover>
      <thead>
        <tr className='w-100'>{tableHeaders}</tr>
      </thead>
      <tbody>
        {tableContent.map((row, idx) => (
          <tr className='w-100' key={idx}>
            <td className='w-25'>{row.date}</td>
            <td className='w-25'>{row.points}</td>
            <td className='w-25'>{getActivityTypeName(row.activityType)}</td>
            <td className='w-25'>{row.activityName}</td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  )
}
