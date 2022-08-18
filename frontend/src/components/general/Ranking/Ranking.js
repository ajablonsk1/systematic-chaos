import React from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { ERROR_OCCURRED, getHeroName } from '../../../utils/constants'
import { TableContainer, TableRow } from './RankingStyle'

function Ranking(props) {
  const rowColor = (index) =>
    props.studentId && index === props.studentId ? 'var(--button-green)' : 'var(--light-blue)'

  return (
    <TableContainer>
      <Table className={'my-0'}>
        <thead>
          <tr>
            <th>Pozycja</th>
            <th>Gracz</th>
            <th>Grupa zajęciowa</th>
            <th>Typ bohatera</th>
            <th>Punkty</th>
          </tr>
        </thead>
        <tbody>
          {props.rankingList === undefined ? (
            <tr>
              <td colSpan='100%' className={'text-center'}>
                <Spinner animation={'border'} />
              </td>
            </tr>
          ) : props.rankingList == null || props.rankingList.length === 0 ? (
            <tr>
              <td colSpan='100%' className={'text-center'}>
                <p>{props.rankingList == null ? ERROR_OCCURRED : 'Brak studentów do wyświetlenia'}</p>
              </td>
            </tr>
          ) : (
            props.rankingList.map((student, index) => (
              <TableRow key={index + Date.now()} $backgroundColor={rowColor(index)}>
                <td>{index + 1}</td>
                <td>{student.firstName + ' ' + student.lastName}</td>
                <td>{student.groupName}</td>
                <td>{getHeroName(student.heroType)}</td>
                <td>{student.points}</td>
              </TableRow>
            ))
          )}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default Ranking
