import React from 'react'
import { ERROR_OCCURRED, getActivityTypeName } from '../../../../utils/constants'
import { TableContainer } from './TableStyle'
import { Spinner } from 'react-bootstrap'
import moment from 'moment'

export default function LastPointsTable(props) {
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
        {props.pointsList === undefined ? (
          <tr>
            <td colSpan='100%'>
              <Spinner animation={'border'} />
            </td>
          </tr>
        ) : props.pointsList == null || props.pointsList.length === 0 ? (
          <tr>
            <td colSpan='100%'>
              <p className={'text-center h6 text-warning'}>{props.pointsList ? 'Brak punktów' : ERROR_OCCURRED}</p>
            </td>
          </tr>
        ) : (
          props.pointsList.map((row, idx) => (
            <tr className='w-100' key={idx}>
              <td className='w-25'>{moment(row.dateInMillis).format('DD.MM.YYYY, HH:mm')}</td>
              <td className='w-25'>{row.pointsReceived ?? 'Nieocenione'}</td>
              <td className='w-25'>{getActivityTypeName(row.activityType)}</td>
              <td className='w-25'>{row.activityName}</td>
            </tr>
          ))
        )}
      </tbody>
    </TableContainer>
  )
}
