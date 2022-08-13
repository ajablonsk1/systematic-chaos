import React from 'react'
import { getBonusPoints } from '../../../../storage/pointsTable'
import { TableContainer } from './TableStyle'

function BonusPointsTable() {
  const bonusPoints = getBonusPoints()

  const tableHeaders = ['Data', 'Liczba punktów', 'Opis', 'Osoba przyznająca'].map((title, index) => (
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
        {bonusPoints.map((row, idx) => (
          <tr className='w-100' key={idx}>
            <td className='w-25'>{row.date}</td>
            <td className='w-25'>{row.points}</td>
            <td className='w-25'>{row.reason}</td>
            <td className='w-25'>{row.professor}</td>
          </tr>
        ))}
      </tbody>
    </TableContainer>
  )
}

export default BonusPointsTable
