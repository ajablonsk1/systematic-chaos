import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import { ERROR_OCCURRED, getHeroName } from '../../../utils/constants'
import { CustomIcon, TableContainer, TableRow } from './RankingStyle'
import { getSortIcon, nextSortingOrder, sortArray } from './sortHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import ReactTooltip from 'react-tooltip'

const headersWithSortedInfo = [
  { headerName: 'Pozycja', sortedVar1: 'position' },
  { headerName: 'Gracz', sortedVar1: 'lastName', sortedVar2: 'firstName' },
  { headerName: 'Grupa zajęciowa', sortedVar1: 'groupName' },
  { headerName: 'Typ bohatera', sortedVar1: 'heroType' },
  { headerName: 'Ranga', sortedVar1: 'rank' },
  { headerName: 'Odblokowane odznaki', sortedVar1: 'unblockedBadges' },
  { headerName: 'Punkty', sortedVar1: 'points' }
]

const getStudentEmailByPosition = (position, ranking) => {
  return ranking?.find((s) => s.position === position)?.email
}

const getStudentPositionByEmail = (email, ranking) => {
  return ranking?.findIndex((s) => s.email === email) + 1
}

function Ranking(props) {
  const [ranking, setRanking] = useState(props.rankingList)
  const [sortingOrders, setSortingOrders] = useState(headersWithSortedInfo.map(() => 'DESC'))
  const [student, setStudent] = useState({
    email: getStudentEmailByPosition(props.studentPosition, props.rankingList),
    position: props.studentPosition
  })

  const rowColor = (index) => {
    return student?.position && index === student?.position ? props.theme.success : props.theme.secondary
  }

  useEffect(() => {
    setRanking(props.rankingList)
    setStudent({
      position: props.studentPosition,
      email: getStudentEmailByPosition(props.studentPosition, props.rankingList)
    })
    setSortingOrders((prevState) => prevState.map(() => 'DESC'))
  }, [props])

  const sortBy = useCallback(
    (headerId, sortedVariables) => {
      const options = {}
      if (sortedVariables.includes('heroType')) {
        options.customComparingFunction = getHeroName
      }
      options.isString =
        !sortedVariables.includes('points') &&
        !sortedVariables.includes('position') &&
        !sortedVariables.includes('unblockedBadges')

      const rankingAfterSorting = sortArray(ranking, sortingOrders[headerId], sortedVariables, options)
      setRanking(rankingAfterSorting)
      setStudent({ ...student, position: getStudentPositionByEmail(student.email, rankingAfterSorting) })
      setSortingOrders((prevState) => {
        return prevState.map((order, index) => {
          if (index === headerId) {
            return nextSortingOrder(order)
          }
          return order
        })
      })
    },
    [ranking, sortingOrders, student]
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
      $customHeight={props.customHeight}
      $fontColor={props.theme.font}
      $backgroundColor={props.theme.primary}
    >
      <Table className={'my-0'}>
        <thead>{tableHeaders}</thead>
        <tbody>
          {ranking === undefined ? (
            <tr style={{ backgroundColor: props.theme.secondary }}>
              <td colSpan='100%' className={'text-center'}>
                <Spinner animation={'border'} />
              </td>
            </tr>
          ) : ranking == null || ranking.length === 0 ? (
            <tr style={{ backgroundColor: props.theme.secondary }}>
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
                <td>{student.rank}</td>
                <td>{student.unblockedBadges}</td>
                <td>{student.points ?? props.noPointsMessage ?? 'Brak danych'}</td>
                {!!props.iconCallback && (
                  <td>
                    <FontAwesomeIcon
                      icon={faInfo}
                      onClick={() => props.iconCallback(student)}
                      data-for={'info-icon'}
                      data-tip={'Tabela punktów studenta'}
                    />
                    {/*TODO: if SC-349 is already merged, replace it with <Tooltip/>*/}
                    <ReactTooltip
                      id={'info-icon'}
                      place='top'
                      type='dark'
                      effect='solid'
                      multiline
                      event='mouseover mouseenter'
                      eventOff='mouseleave mouseout scroll mousewheel blur'
                    />
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
