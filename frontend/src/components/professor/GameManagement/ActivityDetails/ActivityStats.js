import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { CustomCard } from '../../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { ChartCol, CustomTable } from '../../../student/GameCardPage/gameCardContentsStyle'
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import { getChartConfig, getChartDetails } from '../../../general/chartHelper'
import StatsCard from './StatsCard'
import { Activity, ERROR_OCCURRED } from '../../../../utils/constants'
import PercentageCircle from '../../../student/PointsPage/ChartAndStats/PercentageCircle'
import { connect } from 'react-redux'
import { isMobileView } from '../../../../utils/mobileHelper'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

function ActivityStats(props) {
  const isSurvey = props.activityType === Activity.SURVEY
  const isInfoTask = props.activityType === Activity.INFO
  const statsData = props.statsData

  const [pieChartConfig, setPieChartConfig] = useState({})
  const [pointsBarConfig, setPointsBarConfig] = useState({})
  const [percentageBarConfig, setPercentageBarConfig] = useState({})

  const rounded = (value) => Math.round(value * 10) / 10

  useEffect(() => {
    if (statsData) {
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

      setPieChartConfig({ data: pieData, options: pieOptions })
      setPointsBarConfig({ data: pointsBarData, options: pointsBarOptions })
      setPercentageBarConfig({ data: percentageBarData, options: percentageBarOptions })
    }
  }, [statsData])

  const statsCardBody = useMemo(() => {
    if (isInfoTask) {
      return <p>Brak statystyk dla aktywności typu: Wytyczne</p>
    }
    if (statsData === undefined) {
      return <Spinner animation={'border'} />
    }
    if (statsData == null) {
      return <p>{ERROR_OCCURRED}</p>
    }

    const bodyRows = [
      { info: 'Punkty do zdobycia w aktywności', value: statsData.activity100 },
      { info: 'Liczba przesłanych rozwiązań', value: statsData.answersNumber },
      {
        info: isSurvey ? 'Średnia ocena studentów' : 'Średni wynik punktowy dla wszystkich grup',
        value: rounded(statsData.avgPoints)
      }
    ]

    if (!isSurvey) {
      bodyRows.push({
        info: 'Średni wynik procentowy dla wszystkich grup',
        value: rounded(statsData.avgPercentageResult) + '%'
      })
      bodyRows.push({ info: 'Najlepszy wynik', value: statsData.bestScore })
      bodyRows.push({ info: 'Najgorszy wynik', value: statsData.worstScore })
    }

    return (
      <CustomTable $fontColor={props.theme.font} $borderColor={props.theme.primary} $background={props.theme.secondary}>
        <tbody>
          {bodyRows.map((row, index) => (
            <tr key={index + Date.now()}>
              <td>{row.info}</td>
              <td>{row.value ?? '-'}</td>
            </tr>
          ))}
        </tbody>
      </CustomTable>
    )
  }, [isInfoTask, isSurvey, props.theme.font, props.theme.primary, props.theme.secondary, statsData])

  const chartCard = useCallback((chartType, data, options, header) => {
    if (!data || !options) {
      return <></>
    }

    if (data.datasets.length === 0 || !data.datasets.find((set) => set.data.find((element) => element > 0))) {
      return <StatsCard header={header} body={<p>Nie można narysować wykresu</p>} />
    }

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
      <Row className={'m-0 mt-3 gy-2'} style={{ height: isMobileView() ? '100vh' : '45vh' }}>
        <Col md={6}>
          <CustomCard
            $fontColor={props.theme.font}
            $background={props.theme.primary}
            $bodyColor={props.theme.secondary}
          >
            <CardHeader>
              <h5>Statystyki</h5>
            </CardHeader>
            <Card.Body>{statsCardBody}</Card.Body>
          </CustomCard>
        </Col>
        <Col md={6}>
          {isSurvey ? (
            <CustomCard
              $fontColor={props.theme.font}
              $background={props.theme.primary}
              $bodyColor={props.theme.secondary}
            >
              <CardHeader>
                <h5>Średnia ocena studentów</h5>
              </CardHeader>
              <Card.Body>
                {statsData === undefined ? (
                  <Spinner animation={'border'} />
                ) : statsData == null ? (
                  <p>{ERROR_OCCURRED}</p>
                ) : (
                  <PercentageCircle
                    percentageValue={(100 * statsData.avgPoints ?? 0) / 5}
                    points={statsData.avgPoints ?? 0}
                    maxPoints={5}
                  />
                )}
              </Card.Body>
            </CustomCard>
          ) : (
            pieChartConfig &&
            chartCard('PIE', pieChartConfig.data, pieChartConfig.options, 'Ilość wyników w przedziale ocenowym')
          )}
        </Col>
      </Row>
      <Row className={'m-0 mt-3 gy-2'} style={{ height: isMobileView() ? '70vh' : '45vh' }}>
        <Col md={6}>
          {chartCard(
            'BAR',
            pointsBarConfig.data,
            pointsBarConfig.options,
            isSurvey ? 'Średnia ocena studentów w każdej grupie' : 'Średni wynik punktowy każdej grupy'
          )}
        </Col>
        <Col md={6}>
          {isSurvey
            ? chartCard('PIE', pieChartConfig.data, pieChartConfig.options, 'Liczba ocen dla każdej oceny')
            : chartCard(
                'BAR',
                percentageBarConfig.data,
                percentageBarConfig.options,
                'Średni wynik procentowy każdej grupy'
              )}
        </Col>
      </Row>
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ActivityStats)
