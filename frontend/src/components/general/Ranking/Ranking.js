import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { ERROR_OCCURRED, getHeroName } from '../../../utils/constants'
import { CustomIcon, TableContainer, TableRow } from './RankingStyle'
import { getSortIcon, nextSortingOrder, sortArray } from './sortHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { isMobileView } from '../../../utils/mobileHelper'

const headersWithSortedInfo = [
  { headerName: 'Pozycja', sortedVar1: 'position' },
  { headerName: 'Gracz', sortedVar1: 'firstName', sortedVar2: 'lastName' },
  { headerName: 'Grupa zajęciowa', sortedVar1: 'groupName' },
  { headerName: 'Typ bohatera', sortedVar1: 'heroType' },
  { headerName: 'Punkty', sortedVar1: 'points' }
]

function Ranking(props) {
  const [ranking, setRanking] = useState(props.rankingList)
  const [sortingOrders, setSortingOrders] = useState(headersWithSortedInfo.map(() => 'DESC'))

  const rowColor = (index) =>
    props.studentPosition && index === props.studentPosition ? props.theme.success : props.theme.secondary

  useEffect(() => {
    setRanking(props.rankingList)
    setSortingOrders((prevState) => prevState.map(() => 'DESC'))
  }, [props])

  const sortBy = useCallback(
    (headerId, sortedVariables) => {
      const options = {}
      if (sortedVariables.includes('heroType')) {
        options.customComparingFunction = getHeroName
      }
      options.isString = !sortedVariables.includes('points') && !sortedVariables.includes('position')

      setRanking(sortArray(ranking, sortingOrders[headerId], sortedVariables, options))
      setSortingOrders((prevState) => {
        return prevState.map((order, index) => {
          if (index === headerId) {
            return nextSortingOrder(order)
          }
          return order
        })
      })
    },
    [ranking, sortingOrders]
  )

  const tableHeaders = useMemo(() => {
    return (
      <tr>
        {headersWithSortedInfo.map((header, index) => (
          <th key={index + Date.now()}>
            <span className={'me-2'}>{header.headerName}</span>
            <CustomIcon
              icon={getSortIcon(sortingOrders[index])}
              onClick={() => sortBy(index, [header.sortedVar1, header.sortedVar2])}
            />
          </th>
        ))}
        {!!props.iconCallback && <th />}
      </tr>
    )
  }, [sortBy, sortingOrders, props])

  return (
    <TableContainer
      $customHeight={isMobileView() ? '80vh' : props.customHeight}
      $fontColor={props.theme.font}
      $backgroundColor={props.theme.primary}
      style={{ margin: isMobileView() ? '0' : '0 25px' }}
    >
      <Table className={'my-0'}>
        <thead>{tableHeaders}</thead>
        <tbody>
          {ranking === undefined ? (
            <tr>
              <td colSpan='100%' className={'text-center'}>
                <Spinner animation={'border'} />
              </td>
            </tr>
          ) : ranking == null || ranking.length === 0 ? (
            <tr>
              <td colSpan='100%' className={'text-center'}>
                <p>{ranking == null ? ERROR_OCCURRED : 'Brak studentów do wyświetlenia'}</p>
              </td>
            </tr>
          ) : (
            ranking.map((student, index) => (
              <TableRow
                key={index + Date.now()}
                $backgroundColor={rowColor(index + 1)}
                $hoverColor={props.theme.primary}
              >
                <td>{student.position}</td>
                <td>{student.firstName + ' ' + student.lastName}</td>
                <td>{student.groupName}</td>
                <td>{getHeroName(student.heroType)}</td>
                <td>{student.points ?? props.noPointsMessage ?? 'Brak danych'}</td>
                {!!props.iconCallback && (
                  <td>
                    <FontAwesomeIcon icon={faInfo} onClick={() => props.iconCallback(student.email)} />
                  </td>
                )}
              </TableRow>
            ))
          )}
        </tbody>
      </Table>
    </TableContainer>
  )
}

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(Ranking)
