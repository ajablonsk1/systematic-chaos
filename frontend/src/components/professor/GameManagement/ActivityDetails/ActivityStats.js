import React, { useMemo } from 'react'
import { getStatsForActivity } from './mockData'
import { Content } from '../../../App/AppGeneralStyles'
import { CustomCard } from '../../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card, Col, Row } from 'react-bootstrap'
import { CustomTable } from '../../../student/GameCardPage/gameCardContentsStyle'

function ActivityStats(props) {
  const statsData = getStatsForActivity() // use props.activityId

  const statsCardBody = useMemo(() => {
    return (
      <CustomTable>
        <tbody>
          <tr>
            <td>Punkty do zdobycia w aktywności</td>
            <td>{statsData.activity100}</td>
          </tr>
          <tr>
            <td>Liczba przesłanych rozwiązań</td>
            <td>{statsData.answersNumber}</td>
          </tr>
          <tr>
            <td>Średni wynik punktowy dla wszystkich grup</td>
            <td>{statsData.avgPoints}</td>
          </tr>
          <tr>
            <td>Średni wynik procentowy dla wszystkich grup</td>
            <td>{statsData.avgPercentageResult}</td>
          </tr>
          <tr>
            <td>Najlepszy wynik</td>
            <td>{statsData.bestScore}</td>
          </tr>
          <tr>
            <td>Najgorszy wynik</td>
            <td>{statsData.worstScore}</td>
          </tr>
        </tbody>
      </CustomTable>
    )
  }, [statsData])

  return (
    <Row className={'m-0'}>
      <Col md={6}>
        <CustomCard>
          <CardHeader>
            <h5>Statystyki</h5>
          </CardHeader>
          <Card.Body>{statsCardBody}</Card.Body>
        </CustomCard>
      </Col>
    </Row>
  )
}

export default ActivityStats
