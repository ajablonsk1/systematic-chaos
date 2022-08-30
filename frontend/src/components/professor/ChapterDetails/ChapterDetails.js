import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Content } from '../../App/AppGeneralStyles'
import { Button, Card, Col, Collapse, ListGroup, ListGroupItem, Row, Spinner, Table } from 'react-bootstrap'
import { ERROR_OCCURRED, getActivityImg, getActivityTypeName } from '../../../utils/constants'
import { ActivitiesCard, ButtonsCol, MapCard, SummaryCard, TableRow } from './ChapterDetailsStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { generateFullPath, PageRoutes } from '../../../routes/PageRoutes'
import ActivityService from '../../../services/activity.service'
import ChapterMap from '../../student/GameMapPage/Map/ChapterMap'
import DeletionModal from './DeletionModal'
import EditChapterModal from './EditChapterModal'
import JSONEditor from '../../general/jsonEditor/JSONEditor'
import { getConfigJson } from '../GameManagement/GameLoader/mockData'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import ChapterService from '../../../services/chapter.service'

function ChapterDetails() {
  const { id: chapterId } = useParams()
  const [openActivitiesDetailsList, setOpenActivitiesDetailsList] = useState(false)
  const [openConditionsList, setOpenConditionsList] = useState(false)
  const [chapterMap, setChapterMap] = useState(undefined)
  const [isDeletionModalOpen, setDeletionModalOpen] = useState(false)
  const [isEditChapterModalOpen, setEditChapterModalOpen] = useState(false)
  const [chosenActivityData, setChosenActivityData] = useState(null)
  const [isEditActivityModalOpen, setIsEditActivityModalOpen] = useState(false)
  const [isDeleteActivityModalOpen, setIsDeleteActivityModalOpen] = useState(false)
  const [chapterDetails, setChapterDetails] = useState(undefined)

  const mapCardBody = useRef()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    ChapterService.getChapterDetails(chapterId)
      .then((response) => {
        setChapterDetails(response)
      })
      .catch(() => {
        setChapterDetails(null)
      })
  }, [chapterId])

  const goToChapterDetails = (activityName, activityId, activityType) => {
    navigate(location.pathname + `/activity/${activityName}`, {
      state: { activityId: activityId, activityType: activityType }
    })
  }

  useEffect(() => {
    ActivityService.getActivityMap(chapterId)
      .then((response) => setChapterMap(response))
      .catch(() => setChapterMap(null))
  }, [chapterId])

  const startActivityEdition = (activity) => {
    // TODO: depending on the type of activity, we will use a different endpoint
    setChosenActivityData({
      activityId: activity.id,
      activityType: getActivityTypeName(activity.type),
      activityName: activity.title,
      jsonConfig: getConfigJson() // TODO: endpoint response
    })
    setIsEditActivityModalOpen(true)
  }

  const deleteActivity = (activity) => {
    setChosenActivityData({
      activityId: activity.id,
      activityType: getActivityTypeName(activity.type),
      activityName: activity.title
    })
    setIsDeleteActivityModalOpen(true)
  }

  return (
    <Content>
      <Row className={'px-0 m-0'} style={{ height: '100vh' }}>
        <Col className={'m-0 h-100'} md={6}>
          <Col md={12} className={'h-50'}>
            <MapCard className={'mt-2'}>
              <Card.Header>Mapa rozdziału</Card.Header>
              <Card.Body ref={mapCardBody}>
                {chapterMap ? (
                  <ChapterMap map={chapterMap} marginNeeded parentRef={mapCardBody} />
                ) : (
                  chapterMap == null && <p className={'text-center h6 p-4'}>{ERROR_OCCURRED}</p>
                )}
              </Card.Body>
            </MapCard>
          </Col>
          <Col md={12} style={{ height: '45%' }}>
            <SummaryCard className={'h-100'}>
              <Card.Header>Podsumowanie rozdziału</Card.Header>
              <Card.Body className={'p-0'}>
                {chapterDetails === undefined ? (
                  <Spinner animation={'border'}></Spinner>
                ) : chapterDetails == null ? (
                  <p>{ERROR_OCCURRED}</p>
                ) : (
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
                          <div>Ekspedycje: {chapterDetails.noGraphTasks}</div>
                          <div>Zadania bojowe: {chapterDetails.noFileTasks}</div>
                          <div>Wytyczne: {chapterDetails.noInfoTasks}</div>
                          <div>Wywiady: {chapterDetails.noSurveyTasks}</div>
                        </div>
                      </Collapse>
                    </ListGroupItem>
                    <ListGroupItem>
                      Suma punktów możliwych do zdobycia w rozdziale: {chapterDetails.maxPoints}
                    </ListGroupItem>
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
                )}
              </Card.Body>
            </SummaryCard>
          </Col>
        </Col>
        <Col className={'m-0 h-100'} md={6}>
          <Col md={12} style={{ height: '85vh' }}>
            <ActivitiesCard style={{ height: '96.5%' }} className={'mt-2'}>
              <Card.Header>Lista aktywności</Card.Header>
              <Card.Body className={'p-0'}>
                <Table>
                  <tbody>
                    {chapterDetails === undefined ? (
                      <tr>
                        <td colSpan='100%' className={'text-center'}>
                          <Spinner animation={'border'} />
                        </td>
                      </tr>
                    ) : chapterDetails == null || chapterDetails.mapTasks.length === 0 ? (
                      <tr>
                        <td colSpan='100%' className={'text-center'}>
                          <p>{chapterDetails == null ? ERROR_OCCURRED : 'Lista rozdziałów jest pusta'}</p>
                        </td>
                      </tr>
                    ) : (
                      chapterDetails.mapTasks.map((activity, index) => (
                        <TableRow
                          key={activity.title + index}
                          onClick={() => goToChapterDetails(activity.title, activity.id, activity.type)}
                        >
                          <td>
                            <img src={getActivityImg(activity.type)} width={32} height={32} alt={'activity img'} />
                          </td>
                          <td>{getActivityTypeName(activity.type)}</td>
                          <td>{activity.title}</td>
                          <td>
                            ({activity.posX}, {activity.posY})
                          </td>
                          <td>Pkt: {activity.points}</td>
                          <td>
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              onClick={(e) => {
                                e.stopPropagation()
                                startActivityEdition(activity)
                              }}
                            />
                          </td>
                          <td>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteActivity(activity)
                              }}
                            />
                          </td>
                        </TableRow>
                      ))
                    )}
                  </tbody>
                </Table>
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
        modalTitle={'Usunięcie rozdziału'}
        modalBody={
          <>
            Czy na pewno chcesz usunąć rozdział: <br />
            <strong>{chapterDetails?.name}</strong>?
          </>
        }
      />

      <EditChapterModal showModal={isEditChapterModalOpen} setModalOpen={setEditChapterModalOpen} />

      <JSONEditor
        setShowModal={setIsEditActivityModalOpen}
        showModal={isEditActivityModalOpen}
        modalHeader={`Edycja aktywności: ${chosenActivityData?.activityName}`}
        jsonConfig={chosenActivityData?.jsonConfig}
        submitButtonText={'Zapisz zmiany'}
        successModalHeader={'Edycja zakończona pomyślnie'}
        successModalBody={
          <p>
            Twoje zmiany wprowadzone dla aktywności typu: <strong>{chosenActivityData?.activityType}</strong>
            <br /> o nazwie: <strong>{chosenActivityData?.activityName}</strong> zakończyła się pomyślnie.
          </p>
        }
      />

      <DeletionModal
        showModal={isDeleteActivityModalOpen}
        setModalOpen={setIsDeleteActivityModalOpen}
        modalTitle={'Usunięcie aktywności'}
        modalBody={
          <>
            Czy na pewno chcesz usunąć aktywność typu: <strong>{chosenActivityData?.activityType}</strong>
            <br />o nazwie: <strong>{chosenActivityData?.activityName}</strong>?
          </>
        }
      />
    </Content>
  )
}

export default ChapterDetails
