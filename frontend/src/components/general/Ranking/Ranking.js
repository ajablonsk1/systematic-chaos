import React from 'react'
import { Table } from 'react-bootstrap'
import { getHeroName } from '../../../utils/constants'
import { TableBodyRow } from '../../professor/GameManagement/TableStyles'
import { TableContainer } from './RankingStyle'

function Ranking(props) {
  return (
    <TableContainer>
      <Table className={'my-0'} style={{ color: 'var(--font-color)' }}>
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
              <TableBodyRow key={index + Date.now()}>
                <td>{index + 1}</td>
                <td>{student.firstName + ' ' + student.lastName}</td>
                <td>{student.groupName}</td>
                <td>{getHeroName(student.heroType)}</td>
                <td>{student.points}</td>
              </TableBodyRow>
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
