import React, { useCallback, useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Card, Carousel, CarouselItem, Col, Row } from 'react-bootstrap'
import { CustomCard } from '../../student/GameCardPage/GameCardStyles'
import CardHeader from 'react-bootstrap/CardHeader'
import { getGameSummaryInfo } from './mockData'
import GameSummaryCard from './GameSummaryCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

export default function GameSummary() {
  const summaryDetails = getGameSummaryInfo()

  const [activeChapterId, setActiveChapterId] = useState(0)

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

  const getChapterNames = () => {
    return summaryDetails.avgGradesList.map((chapter) => chapter.chapterName)
  }

  const statsCardBody = useCallback((titles) => {
    return titles.map((title, index) => (
      <p key={index + Date.now()} className={'mb-1'} style={{ fontSize: 15 }}>
        <strong>{title.text} </strong>
        <span>{title.value}</span>
      </p>
    ))
  }, [])

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
              <Carousel
                fade
                interval={null}
                indicators={false}
                nextLabel={null}
                prevLabel={null}
                nextIcon={<FontAwesomeIcon icon={faArrowRight} color={'var(--font-color)'} />}
                prevIcon={<FontAwesomeIcon icon={faArrowLeft} color={'var(--font-color)'} />}
                onSelect={setActiveChapterId}
              >
                {getChapterNames().map((name, index) => (
                  <CarouselItem key={index + Date.now()}>
                    <p className={'text-center m-0'}>{name}</p>
                  </CarouselItem>
                ))}
              </Carousel>
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
            <Card.Body>body</Card.Body>
          </CustomCard>
        </Col>
        <Col md={6} className={'py-2'}>
          <CustomCard>
            <CardHeader>
              <h5>Nieocenione aktywności</h5>
            </CardHeader>
            <Card.Body>body</Card.Body>
          </CustomCard>
        </Col>
      </Row>
    </Content>
  )
}
