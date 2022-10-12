import React, { useCallback, useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Card, Carousel, CarouselItem, Col, Row } from 'react-bootstrap'
import { CustomCard } from '../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import GameSummaryCard from './GameSummaryCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getChartConfig } from '../../general/chartHelper'
import { Bar, Line } from 'react-chartjs-2'
import { ChartCol, CustomTable } from '../../student/GameCardPage/gameCardContentsStyle'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { lineChartConfig } from './lineChartHelper'
import ProfessorService from '../../../services/professor.service'
import Loader from '../../general/Loader/Loader'
import { ERROR_OCCURRED, getActivityTypeName } from '../../../utils/constants'
import { connect } from 'react-redux'
import { isMobileView } from '../../../utils/mobileHelper'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

function GameSummary(props) {
  const [summaryDetails, setSummaryDetails] = useState(undefined)

  const [barChartActiveChapterId, setBarChartActiveChapterId] = useState(0)
  const [lineChartActiveChapterId, setLineChartActiveChapterId] = useState(0)

  useEffect(() => {
    ProfessorService.getGameSummaryStats()
      .then((response) => {
        setSummaryDetails(response)
      })
      .catch(() => {
        setSummaryDetails(null)
      })
  }, [])

  const gradesStatsCardTitles = [
    { text: 'Średnia ocen studentów:', value: summaryDetails?.avgGrade },
    { text: 'Mediana ocen studentów', value: summaryDetails?.medianGrade },
    { text: 'Aktywność z najlepszym wynikiem średnim:', value: summaryDetails?.bestScoreActivityName },
    { text: 'Aktywność z najgorszym wynikiem średnim:', value: summaryDetails?.worstScoreActivityName }
  ]

  const activityStatsCardTitles = [
    { text: 'Liczba ocenionych aktywności:', value: summaryDetails?.assessedActivitiesCounter },
    { text: 'Liczba nieocenionych aktywności:', value: summaryDetails?.notAssessedActivityCounter },
    { text: 'Liczba odpowiedzi oczekujących na sprawdzenie:', value: summaryDetails?.waitingAnswersNumber }
  ]

  const { data: barChartData, options: barChartOptions } = getChartConfig('BAR', {
    mainLabels: summaryDetails?.avgGradesList[barChartActiveChapterId]?.avgGradesForChapter.map(
      (grades) => grades.groupName
    ),
    labels: ['Średnia', 'Mediana'],
    dataset: [
      summaryDetails?.avgGradesList[barChartActiveChapterId]?.avgGradesForChapter.map((grades) => grades.avgGrade),
      summaryDetails?.avgGradesList[barChartActiveChapterId]?.avgGradesForChapter.map((grades) => grades.medianGrade)
    ],
    xAxisDisplay: true
  })

  const { data: lineChartData, options: lineChartOptions } = lineChartConfig(
    summaryDetails?.avgActivitiesScore[lineChartActiveChapterId]?.activitiesScore
  )

  const statsCardBody = useCallback((titles) => {
    return titles.map((title, index) => (
      <p key={index + Date.now()} className={'mb-1'} style={{ fontSize: 15 }}>
        <strong>{title.text} </strong>
        <span>{title.value}</span>
      </p>
    ))
  }, [])

  const carousel = useCallback(
    (onSelectCallback) => {
      const getChapterNames = () => {
        return summaryDetails?.avgGradesList.map((chapter) => chapter.chapterName)
      }

      return (
        <Carousel
          slide={false}
          interval={null}
          indicators={false}
          nextLabel={null}
          prevLabel={null}
          nextIcon={<FontAwesomeIcon icon={faArrowRight} color={props.theme.font} />}
          prevIcon={<FontAwesomeIcon icon={faArrowLeft} color={props.theme.font} />}
          onSelect={onSelectCallback}
        >
          {getChapterNames().map((name, index) => (
            <CarouselItem key={index + Date.now()}>
              <p className={'text-center m-0'}>{name}</p>
            </CarouselItem>
          ))}
        </Carousel>
      )
    },
    [props.theme.font, summaryDetails?.avgGradesList]
  )

  return (
    <Content>
      {summaryDetails === undefined ? (
        <Loader />
      ) : summaryDetails == null ? (
        <p className={'text-center h3'}>{ERROR_OCCURRED}</p>
      ) : (
        <>
          <Row className={'m-0'} style={{ height: isMobileView() ? 'auto' : '50vh' }}>
            <Col md={6}>
              <Row className={`${isMobileView() ? 'h-auto' : 'h-50'} py-2`}>
                <GameSummaryCard
                  header={<h5>Statystyki ocen studentów</h5>}
                  body={statsCardBody(gradesStatsCardTitles)}
                />
              </Row>
              <Row className={`${isMobileView() ? 'h-auto' : 'h-50'} py-2`}>
                <GameSummaryCard
                  header={<h5>Statystyki aktywności</h5>}
                  body={statsCardBody(activityStatsCardTitles)}
                />
              </Row>
            </Col>
            <Col md={6} className={'py-2'}>
              <CustomCard
                $fontColor={props.theme.font}
                $background={props.theme.primary}
                $bodyColor={props.theme.secondary}
              >
                <CardHeader>
                  <h5>Średnia ocen w każdej grupie</h5>
                </CardHeader>
                <Card.Body>
                  {carousel(setBarChartActiveChapterId)}
                  <ChartCol className={'top-50 translate-middle-y'}>
                    <Bar data={barChartData} options={barChartOptions} />
                  </ChartCol>
                </Card.Body>
              </CustomCard>
            </Col>
          </Row>
          <Row style={{ height: isMobileView() ? 'auto' : '50vh', margin: isMobileView() ? '0 0 85px 0' : 0 }}>
            <Col md={6} className={'py-2'}>
              <CustomCard
                $fontColor={props.theme.font}
                $background={props.theme.primary}
                $bodyColor={props.theme.secondary}
              >
                <CardHeader>
                  <h5>Średni wynik z aktywności</h5>
                </CardHeader>
                <Card.Body style={{ maxHeight: '42vh' }}>
                  {carousel(setLineChartActiveChapterId)}
                  <ChartCol className={'top-50 translate-middle-y'}>
                    {lineChartData && lineChartOptions ? (
                      <Line data={lineChartData} options={lineChartOptions} />
                    ) : (
                      <p>Nie można narysować wykresu</p>
                    )}
                  </ChartCol>
                </Card.Body>
              </CustomCard>
            </Col>
            <Col md={6} className={'py-2'}>
              <CustomCard
                $fontColor={props.theme.font}
                $background={props.theme.primary}
                $bodyColor={props.theme.secondary}
              >
                <CardHeader>
                  <h5>Nieocenione aktywności</h5>
                </CardHeader>
                <Card.Body style={{ maxHeight: '42vh', overflow: 'auto' }}>
                  <CustomTable
                    $fontColor={props.theme.font}
                    $borderColor={props.theme.primary}
                    $background={props.theme.secondary}
                  >
                    <thead className={'position-sticky'} style={{ top: '-5%', background: props.theme.secondary }}>
                      <tr>
                        <th>Nazwa aktywności</th>
                        <th>Typ aktywności</th>
                        <th>Liczba odpowiedzi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {summaryDetails.notAssessedActivitiesTable.map((activity, index) => (
                        <tr key={index + Date.now()}>
                          <td>{activity.activityName}</td>
                          <td>{getActivityTypeName(activity.activityType)}</td>
                          <td>{activity.waitingAnswersNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </CustomTable>
                </Card.Body>
              </CustomCard>
            </Col>
          </Row>
        </>
      )}
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(GameSummary)
