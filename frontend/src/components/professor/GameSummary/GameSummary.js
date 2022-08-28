import React, { useCallback, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Card, Carousel, CarouselItem, Col, Row } from 'react-bootstrap'
import { CustomCard } from '../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { getGameSummaryInfo } from './mockData'
import GameSummaryCard from './GameSummaryCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { getChartConfig, getChartDetails } from '../../general/chartHelper'
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement)

export default function GameSummary() {
  const summaryDetails = getGameSummaryInfo()

  const [barChartActiveChapterId, setBarChartActiveChapterId] = useState(0)
  const [lineChartActiveChapterId, setLineChartActiveChapterId] = useState(0)

  const gradesStatsCardTitles = [
    { text: 'Średnia ocen studentów:', value: summaryDetails.avgGrade },
    { text: 'Aktywność z najlepszym wynikiem średnim:', value: summaryDetails.bestScoreActivityName },
    { text: 'Aktywność z najgorszym wynikiem średnim:', value: summaryDetails.worstScoreActivityName }
  ]

  const activityStatsCardTitles = [
    { text: 'Liczba ocenionych aktywności:', value: summaryDetails.assessedActivitiesCounter },
    { text: 'Liczba nieocenionych aktywności:', value: summaryDetails.notAssessedActivityCounter },
    { text: 'Liczba odpowiedzi oczekujących na sprawdzenie:', value: summaryDetails.waitingAnswersNumber }
  ]

  const { data: barChartData, options: barChartOptions } = getChartConfig(
    'BAR',
    getChartDetails(summaryDetails.avgGradesList[barChartActiveChapterId].avgGradesForChapter, 'groupName', 'avgGrade')
  )

  const { data: lineChartData, options: lineChartOptions } = lineChartConfig(
    summaryDetails.avgActivitiesScore[lineChartActiveChapterId]?.activitiesScore
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
        return summaryDetails.avgGradesList.map((chapter) => chapter.chapterName)
      }

      return (
        <Carousel
          fade
          interval={null}
          indicators={false}
          nextLabel={null}
          prevLabel={null}
          nextIcon={<FontAwesomeIcon icon={faArrowRight} color={'var(--font-color)'} />}
          prevIcon={<FontAwesomeIcon icon={faArrowLeft} color={'var(--font-color)'} />}
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
    [summaryDetails.avgGradesList]
  )

  return (
    <Content>
      <Row className={'m-0'} style={{ height: '50vh' }}>
        <Col md={6}>
          <Row className={'m-0 h-50 py-2'}>
            <GameSummaryCard header={<h5>Statystyki ocen studentów</h5>} body={statsCardBody(gradesStatsCardTitles)} />
          </Row>
          <Row className={'m-0 h-50 py-2'}>
            <GameSummaryCard header={<h5>Statystyki aktywności</h5>} body={statsCardBody(activityStatsCardTitles)} />
          </Row>
        </Col>
        <Col md={6} className={'py-2'}>
          <CustomCard>
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
      <Row className={'m-0'} style={{ height: '50vh' }}>
        <Col md={6} className={'py-2'}>
          <CustomCard>
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
          <CustomCard>
            <CardHeader>
              <h5>Nieocenione aktywności</h5>
            </CardHeader>
            <Card.Body style={{ maxHeight: '42vh', overflow: 'auto' }}>
              <CustomTable>
                <thead className={'position-sticky'} style={{ top: '-5%', background: 'var(--light-blue)' }}>
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
                      <td>{activity.activityType}</td>
                      <td>{activity.waitingAnswersNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </CustomTable>
            </Card.Body>
          </CustomCard>
        </Col>
      </Row>
    </Content>
  )
}
