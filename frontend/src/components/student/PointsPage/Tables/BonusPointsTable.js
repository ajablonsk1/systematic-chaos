import React, { useEffect, useState } from 'react'
import { TableContainer } from './TableStyle'
import StudentService from '../../../../services/student.service'
import { Spinner } from 'react-bootstrap'
import { ERROR_OCCURRED } from '../../../../utils/constants'
import moment from 'moment'

function BonusPointsTable() {
  const [bonusPoints, setBonusPoints] = useState(undefined)

  useEffect(() => {
    StudentService.getBonusPointsList()
      .then((response) => {
        setBonusPoints(response)
      })
      .catch(() => {
        setBonusPoints(null)
      })
  }, [])

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
        {bonusPoints === undefined ? (
          <tr>
            <td colSpan='100%'>
              <Spinner animation={'border'} />
            </td>
          </tr>
        ) : bonusPoints == null || bonusPoints.length === 0 ? (
          <tr>
            <td colSpan='100%'>
              <p className={'text-center h6 text-warning'}>{bonusPoints ? 'Brak punktów' : ERROR_OCCURRED}</p>
            </td>
          </tr>
        ) : (
          bonusPoints.map((row, idx) => (
            <tr className='w-100' key={idx}>
              <td className='w-25'>{moment(row.dateMillis).format('DD.MM.YYYY, HH:mm')}</td>
              <td className='w-25'>{row.points}</td>
              <td className='w-25'>{row.description}</td>
              <td className='w-25'>{row.professor}</td>
            </tr>
          ))
        )}
      </tbody>
    </TableContainer>
  )
}

export default BonusPointsTable
