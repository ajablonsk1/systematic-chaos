import React from 'react'
import { Table } from 'react-bootstrap'
import { getHeroName } from '../../../utils/constants'
import { TableContainer, TableRow } from './RankingStyle'

function Ranking(props) {
  const rowColor = (index) => (props.studentId && index === props.studentId ? 'var(--button-green)' : '#223762')

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
          {props.rankingList.length > 0 ? (
            props.rankingList.map((student, index) => (
              <TableRow key={index + Date.now()} $backgroundColor={rowColor(index)}>
                <td>{index + 1}</td>
                <td>{student.firstName + ' ' + student.lastName}</td>
                <td>{student.groupName}</td>
                <td>{getHeroName(student.heroType)}</td>
                <td>{student.points}</td>
              </TableRow>
            ))
          ) : (
            <tr>
              <td colSpan='100%' className={'text-center'}>
                <p>Brak studentów do wyświetlenia</p>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  )
}

export default Ranking
