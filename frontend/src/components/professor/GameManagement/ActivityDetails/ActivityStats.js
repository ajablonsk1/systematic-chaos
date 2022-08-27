import React, { useCallback, useMemo } from 'react'
import { getStatsForActivity } from './mockData'
import { CustomCard } from '../../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card, Col, Row } from 'react-bootstrap'
import { ChartCol, CustomTable } from '../../../student/GameCardPage/gameCardContentsStyle'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { getChartConfig, getChartDetails } from './chartHelper'
import StatsCard from './StatsCard'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

function ActivityStats(props) {
  const statsData = getStatsForActivity() // use props.activityId

  const { data: pieData, options: pieOptions } = getChartConfig(
    'PIE',
    getChartDetails(statsData.scaleScores, 'grade', 'results')
  )
  const { data: pointsBarData, options: pointsBarOptions } = getChartConfig(
    'BAR',
    getChartDetails(statsData.avgScores, 'groupName', 'avgPoints')
  )
  const { data: percentageBarData, options: percentageBarOptions } = getChartConfig(
    'BAR',
    getChartDetails(statsData.avgScores, 'groupName', 'avgPercentageResult')
  )

  const statsCardBody = useMemo(() => {
    const bodyRows = [
      { info: 'Punkty do zdobycia w aktywności', value: statsData.activity100 },
      { info: 'Liczba przesłanych rozwiązań', value: statsData.answersNumber },
      { info: 'Średni wynik punktowy dla wszystkich grup', value: statsData.avgPoints },
      { info: 'Średni wynik procentowy dla wszystkich grup', value: statsData.avgPercentageResult },
      { info: 'Najlepszy wynik', value: statsData.bestScore },
      { info: 'Najgorszy wynik', value: statsData.worstScore }
    ]
    return (
      <CustomTable>
        <tbody>
          {bodyRows.map((row, index) => (
            <tr key={index + Date.now()}>
              <td>{row.info}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </CustomTable>
    )
  }, [statsData])

  const chartCard = useCallback((chartType, data, options, header) => {
    return (
      <StatsCard
        header={header}
        body={
          <ChartCol $customHeight={'95%'}>
            {chartType === 'BAR' ? <Bar data={data} options={options} /> : <Pie data={data} options={options} />}
          </ChartCol>
        }
      />
    )
  }, [])

  return (
    <>
      <Row className={'m-0 mt-3'}>
        <Col md={6}>
          <CustomCard>
            <CardHeader>
              <h5>Statystyki</h5>
            </CardHeader>
            <Card.Body>{statsCardBody}</Card.Body>
          </CustomCard>
        </Col>
        <Col md={6}>{chartCard('PIE', pieData, pieOptions, 'Ilość wyników w przedziale ocenowym')}</Col>
      </Row>
      <Row className={'m-0 mt-3'} style={{ height: '45vh' }}>
        <Col md={6}>{chartCard('BAR', pointsBarData, pointsBarOptions, 'Średni wynik punktowy każdej grupy')}</Col>
        <Col md={6}>
          {chartCard('BAR', percentageBarData, percentageBarOptions, 'Średni wynik procentowy każdej grupy')}
        </Col>
      </Row>
    </>
  )
}

export default ActivityStats
