import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getChapterDetails } from '../GameManagement/mockData'
import { Content } from '../../App/AppGeneralStyles'
import { Button, Card, Col, Collapse, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { getActivityImg, getActivityTypeName } from '../../../utils/constants'
import { ActivitiesCard, ButtonsCol, MapCard, SummaryCard } from './ChapterDetailsStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { generateFullPath, PageRoutes } from '../../../routes/PageRoutes'
import ActivityService from '../../../services/activity.service'
import ChapterMap from '../../student/GameMapPage/Map/ChapterMap'
import DeletionModal from './DeletionModal'
import EditChapterModal from './EditChapterModal'

function ChapterDetails() {
  const { id: chapterId } = useParams()
  const [openActivitiesDetailsList, setOpenActivitiesDetailsList] = useState(false)
  const [openConditionsList, setOpenConditionsList] = useState(false)
  const [chapterMap, setChapterMap] = useState()
  const [isDeletionModalOpen, setDeletionModalOpen] = useState(false)
  const [isEditChapterModalOpen, setEditChapterModalOpen] = useState(false)
  const mapCardBody = useRef()

  const chapterDetails = getChapterDetails(+chapterId)

  useEffect(() => {
    // todo: set mapId, now we always get first map
    ActivityService.getActivityMap(1).then((response) => setChapterMap(response))
  }, [])

  return (
    <Content>
      <Row className={'px-0 m-0'} style={{ height: '100vh' }}>
        <Col className={'m-0 h-100'} md={6}>
          <Col md={12} className={'h-50'}>
            <MapCard className={'mt-2'}>
              <Card.Header>Mapa rozdziału</Card.Header>
              <Card.Body ref={mapCardBody}>
                {chapterMap && <ChapterMap map={chapterMap} marginNeeded parentRef={mapCardBody} />}
              </Card.Body>
            </MapCard>
          </Col>
          <Col md={12} style={{ height: '45%' }}>
            <SummaryCard className={'h-100'}>
              <Card.Header>Podsumowanie rozdziału</Card.Header>
              <Card.Body className={'p-0'}>
                <ListGroup>
                  <ListGroupItem>Nazwa rozdziału: {chapterDetails.name}</ListGroupItem>
                  <ListGroupItem>
                    <Row className={'d-flex align-items-center'}>
                      <Col sm={10}>Liczba dodanych aktywności: {chapterDetails.noActivities}</Col>
                      <Col sm={2}>
                        <FontAwesomeIcon
                          icon={openActivitiesDetailsList ? faArrowUp : faArrowDown}
                          className={'mx-5'}
                          onClick={() => setOpenActivitiesDetailsList(!openActivitiesDetailsList)}
                          aria-controls={'activities'}
                          aria-expanded={openActivitiesDetailsList}
                        />
                      </Col>
                    </Row>
                    <Collapse in={openActivitiesDetailsList}>
                      <div id='activities'>
                        <div>Ekspedycje: {chapterDetails.noExpeditions}</div>
                        <div>Zadania bojowe: {chapterDetails.noCombatTasks}</div>
                        <div>Wytyczne: {chapterDetails.noInfoTasks}</div>
                        <div>Wywiady: {chapterDetails.noSurveyTasks}</div>
                      </div>
                    </Collapse>
                  </ListGroupItem>
                  <ListGroupItem>Suma punktów możliwych do zdobycia w rozdziale: {chapterDetails.points}</ListGroupItem>
                  <ListGroupItem>Punkty liczone jako 100%: {chapterDetails.points * 0.85}</ListGroupItem>
                  <ListGroupItem>Aktualny rozmiar mapy: {chapterDetails.mapSize}</ListGroupItem>
                  <ListGroupItem>
                    <Row className={'d-flex align-items-center'}>
                      <Col sm={10}>Warunki odblokowania kolejnego rozdziału:</Col>
                      <Col sm={2}>
                        <FontAwesomeIcon
                          icon={openConditionsList ? faArrowUp : faArrowDown}
                          className={'mx-5'}
                          onClick={() => setOpenConditionsList(!openConditionsList)}
                          aria-controls={'conditions'}
                          aria-expanded={openConditionsList}
                        />
                      </Col>
                    </Row>
                    <Collapse in={openConditionsList}>
                      <div id='conditions'>
                        <ol>
                          <li>uczestnik musi zdobyć 300 pkt</li>
                          <li>data po 15.10.2022</li>
                        </ol>
                      </div>
                    </Collapse>
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </SummaryCard>
          </Col>
        </Col>
        <Col className={'m-0 h-100'} md={6}>
          <Col md={12} style={{ height: '85vh' }}>
            <ActivitiesCard style={{ height: '96.5%' }} className={'mt-2'}>
              <Card.Header>Lista aktywności</Card.Header>
              <Card.Body className={'p-0'}>
                {chapterDetails.activities.map((activity, index) => (
                  <ListGroup horizontal className={'w-100'} key={index + activity.title}>
                    <ListGroupItem className={'p-0 d-flex align-items-center'}>
                      <img src={getActivityImg(activity.type)} width={32} height={32} alt={'activity img'} />
                    </ListGroupItem>
                    <ListGroupItem className={'w-50'}>{getActivityTypeName(activity.type)}</ListGroupItem>
                    <ListGroupItem className={'w-100'}>{activity.title}</ListGroupItem>
                    <ListGroupItem className={'w-25'}>
                      ({activity.posX}, {activity.posY})
                    </ListGroupItem>
                    <ListGroupItem className={'w-25'}>Pkt: {activity.points}</ListGroupItem>
                  </ListGroup>
                ))}
              </Card.Body>
            </ActivitiesCard>
          </Col>
          <ButtonsCol md={12} style={{ height: '10vh' }}>
            <Link to={generateFullPath(() => PageRoutes.Teacher.GameManagement.GAME_MANAGEMENT)}>
              <Button variant={'warning'}>Wyjdź</Button>
            </Link>
            <Button onClick={() => setEditChapterModalOpen(true)}>Edytuj rozdział</Button>
            <Button variant={'danger'} onClick={() => setDeletionModalOpen(true)}>
              Usuń rozdział
            </Button>
          </ButtonsCol>
        </Col>
      </Row>

      <DeletionModal
        showModal={isDeletionModalOpen}
        setModalOpen={setDeletionModalOpen}
        chapterTitle={chapterDetails.name}
      />
      <EditChapterModal showModal={isEditChapterModalOpen} setModalOpen={setEditChapterModalOpen} />
    </Content>
  )
}

export default ChapterDetails