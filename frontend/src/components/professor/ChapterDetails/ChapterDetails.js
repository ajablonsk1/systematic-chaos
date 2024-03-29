import React, { useCallback, useEffect, useRef, useState, useLayoutEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Content } from '../../App/AppGeneralStyles'
import {
  Button,
  Card,
  Col,
  Collapse,
  ListGroup,
  ListGroupItem,
  OverlayTrigger,
  Row,
  Spinner,
  Table
} from 'react-bootstrap'
import { ERROR_OCCURRED, getActivityImg, getActivityTypeName } from '../../../utils/constants'
import { ActivitiesCard, ButtonsCol, CustomTooltip, MapCard, SummaryCard, TableRow } from './ChapterDetailsStyles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import ChapterMap from '../../student/GameMapPage/Map/ChapterMap'
import DeletionModal from './DeletionModal'
import ChapterService from '../../../services/chapter.service'
import EditActivityModal from './EditActivityModal'
import AddActivityModal from './AddActivityModal'
import { TeacherRoutes } from '../../../routes/PageRoutes'
import ChapterModal from '../GameManagement/ChapterModal/ChapterModal'
import { successToast } from '../../../utils/toasts'
import { connect } from 'react-redux'
import ActivityService from '../../../services/activity.service'
import { isMobileView } from '../../../utils/mobileHelper'
import GameCard from '../../student/GameCardPage/GameCard'
import Loader from '../../general/Loader/Loader'

function ChapterDetails(props) {
  const { id: chapterId } = useParams()
  const [openActivitiesDetailsList, setOpenActivitiesDetailsList] = useState(false)
  const [isDeletionModalOpen, setDeletionModalOpen] = useState(false)
  const [isEditChapterModalOpen, setEditChapterModalOpen] = useState(false)
  const [chosenActivityData, setChosenActivityData] = useState(null)
  const [isEditActivityModalOpen, setIsEditActivityModalOpen] = useState(false)
  const [isDeleteActivityModalOpen, setIsDeleteActivityModalOpen] = useState(false)
  const [chapterDetails, setChapterDetails] = useState(undefined)
  const [isAddActivityModalOpen, setIsAddActivityModalOpen] = useState(false)
  const [mapContainerSize, setMapContainerSize] = useState({ x: 0, y: 0 })
  const [shouldLoadEditChapterModal, setShouldLoadEditChapterModal] = useState(false)
  const [deleteChapterError, setDeleteChapterError] = useState(undefined)
  const [reloadMapNeeded, setReloadMapNeeded] = useState(false)
  const [deleteActivityError, setDeleteActivityError] = useState(undefined)

  const mapCardBody = useRef()

  const navigate = useNavigate()
  const location = useLocation()

  useLayoutEffect(() => {
    setMapContainerSize({
      x: mapCardBody.current?.offsetWidth ?? 0,
      y: mapCardBody.current?.offsetHeight ?? 0
    })
  }, [])

  useEffect(() => {
    const updateContainerSize = () =>
      setMapContainerSize({
        x: mapCardBody.current?.offsetWidth ?? 0,
        y: mapCardBody.current?.offsetHeight ?? 0
      })

    window.addEventListener('resize', updateContainerSize)

    return () => {
      window.removeEventListener('resize', updateContainerSize)
    }
  }, [])

  const getChapterDetails = useCallback(() => {
    setReloadMapNeeded(false)
    ChapterService.getChapterDetails(chapterId)
      .then((response) => {
        setChapterDetails(response)
        setReloadMapNeeded(true)
      })
      .catch(() => {
        setChapterDetails(null)
      })
  }, [chapterId])

  useEffect(() => {
    getChapterDetails()
  }, [getChapterDetails])

  useEffect(() => {
    if (chosenActivityData?.jsonConfig) {
      setIsEditActivityModalOpen(true)
    }
  }, [chosenActivityData?.jsonConfig])

  const getActivityInfo = useCallback((activityId) => {
    ActivityService.getActivityInfo(activityId)
      .then((response) => {
        return setChosenActivityData((prevState) => ({ ...prevState, jsonConfig: response.activityBody }))
      })
      .catch(() => {
        setChosenActivityData((prevState) => ({ ...prevState, jsonConfig: null }))
      })
  }, [])

  const goToChapterDetails = (activityName, activityId, activityType) => {
    navigate(location.pathname + `/activity/${activityName}`, {
      state: {
        activityId: activityId,
        activityType: activityType,
        chapterName: chapterDetails.name,
        chapterId: chapterId
      }
    })
  }

  const startActivityEdition = (activity) => {
    setReloadMapNeeded(false)
    setChosenActivityData({
      activityId: activity.id,
      activityType: activity.type,
      activityName: activity.title
    })
    getActivityInfo(activity.id)
  }

  const startActivityDeletion = (activity) => {
    setChosenActivityData({
      activityId: activity.id,
      activityType: getActivityTypeName(activity.type),
      activityName: activity.title
    })
    setIsDeleteActivityModalOpen(true)
  }

  const deleteChapter = () => {
    ChapterService.deleteChapter(chapterId)
      .then(() => {
        successToast('Rozdział usunięty pomyślnie.')
        setDeletionModalOpen(false)
        navigate(TeacherRoutes.GAME_MANAGEMENT.MAIN)
      })
      .catch((error) => setDeleteChapterError(error.response?.data?.message ?? ERROR_OCCURRED))
  }

  const deleteActivity = () => {
    ActivityService.deleteActivity(chosenActivityData.activityId)
      .then(() => {
        successToast(
          <p>
            Aktywność <strong>{chosenActivityData.activityName}</strong> usunięta pomyślnie.
          </p>
        )
        setIsDeleteActivityModalOpen(false)
        getChapterDetails()
      })
      .catch((error) => {
        setDeleteActivityError(error.response?.data?.message ?? ERROR_OCCURRED)
      })
  }

  const goToRequirements = () => {
    navigate(TeacherRoutes.GAME_MANAGEMENT.CHAPTER.REQUIREMENTS, {
      state: { chapterId: chapterId, chapterName: chapterDetails.name }
    })
  }

  return (
    <Content style={{ overflowX: 'hidden', marginBottom: isMobileView() ? 60 : 0 }}>
      <Row className={'px-0 m-0'} style={{ height: '100vh' }}>
        <Col className={'m-0 h-100'} md={6}>
          <Col md={12} className={'h-50'}>
            <MapCard
              $bodyColor={props.theme.secondary}
              $headerColor={props.theme.primary}
              $fontColor={props.theme.font}
              className={'mt-2'}
            >
              <Card.Header>Mapa rozdziału</Card.Header>
              <Card.Body ref={mapCardBody}>
                <ChapterMap chapterId={chapterId} marginNeeded parentSize={mapContainerSize} reload={reloadMapNeeded} />
              </Card.Body>
            </MapCard>
          </Col>
          <Col md={12} style={{ height: '25%' }}>
            <SummaryCard
              $bodyColor={props.theme.secondary}
              $headerColor={props.theme.primary}
              $fontColor={props.theme.font}
              className={'h-100'}
            >
              <Card.Header>Podsumowanie rozdziału</Card.Header>
              <Card.Body className={'p-0'}>
                {chapterDetails === undefined ? (
                  <Loader />
                ) : chapterDetails == null ? (
                  <p>{ERROR_OCCURRED}</p>
                ) : (
                  <ListGroup>
                    <ListGroupItem>Nazwa rozdziału: {chapterDetails.name}</ListGroupItem>
                    <ListGroupItem>
                      <Row className={'d-flex align-items-center'}>
                        <Col xs={10}>Liczba dodanych aktywności: {chapterDetails.noActivities}</Col>
                        <Col xs={2} className={'text-end'}>
                          <FontAwesomeIcon
                            icon={openActivitiesDetailsList ? faArrowUp : faArrowDown}
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
                  </ListGroup>
                )}
              </Card.Body>
            </SummaryCard>
          </Col>
          <Col md={12} style={{ height: '20%' }} className={'my-2'}>
            <GameCard
              onButtonClick={goToRequirements}
              headerText={'Wymagania'}
              content={
                <p className={'text-center'}>
                  Edycja wymagań rozdziału, które musi spełnić student, aby zobaczyć rozdział na mapie gry.
                </p>
              }
            />
          </Col>
        </Col>
        <Col className={'m-0 h-100'} md={6}>
          <Col md={12} style={{ height: '85vh' }}>
            <ActivitiesCard
              $bodyColor={props.theme.secondary}
              $headerColor={props.theme.primary}
              $fontColor={props.theme.font}
              style={{ height: '96.5%' }}
              className={'mt-2'}
            >
              <Card.Header>Lista aktywności</Card.Header>
              <Card.Body className={'p-0 mx-100'} style={{ overflow: 'auto' }}>
                <Table style={{ width: isMobileView() ? '200%' : '100%' }}>
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
                          <p>{chapterDetails == null ? ERROR_OCCURRED : 'Lista aktywności jest pusta'}</p>
                        </td>
                      </tr>
                    ) : (
                      chapterDetails.mapTasks.map((activity, index) => (
                        <OverlayTrigger
                          key={activity.title + index}
                          placement='top'
                          overlay={
                            activity.isActivityBlocked ? (
                              <CustomTooltip style={{ position: 'fixed' }}>
                                Aktywność została zablokowana. Studenci nie mogą jej zobaczyć. Żeby była odblokowana
                                musisz zmienić to w zakładce "Wymagania".
                              </CustomTooltip>
                            ) : (
                              <></>
                            )
                          }
                        >
                          <TableRow
                            $background={props.theme.primary}
                            onClick={() => goToChapterDetails(activity.title, activity.id, activity.type)}
                            style={{ opacity: activity.isActivityBlocked ? 0.4 : 1 }}
                          >
                            <td>
                              <img src={getActivityImg(activity.type)} width={32} height={32} alt={'activity img'} />
                            </td>
                            <td>{getActivityTypeName(activity.type)}</td>
                            <td>{activity.title}</td>
                            <td>
                              ({activity.posX}, {activity.posY})
                            </td>
                            <td>Pkt: {activity.points ?? '-'}</td>
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
                                  startActivityDeletion(activity)
                                }}
                              />
                            </td>
                          </TableRow>
                        </OverlayTrigger>
                      ))
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </ActivitiesCard>
          </Col>
          <ButtonsCol md={12} style={{ height: '10vh' }}>
            <Link to={TeacherRoutes.GAME_MANAGEMENT.MAIN}>
              <Button style={{ backgroundColor: props.theme.warning, borderColor: props.theme.warning }}>Wyjdź</Button>
            </Link>
            <Button
              style={{ backgroundColor: props.theme.secondary, borderColor: props.theme.secondary }}
              onClick={() => {
                setEditChapterModalOpen(true)
                setShouldLoadEditChapterModal(true)
              }}
            >
              Edytuj rozdział
            </Button>
            <Button
              style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
              onClick={() => setDeletionModalOpen(true)}
            >
              Usuń rozdział
            </Button>
            <Button
              style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
              onClick={() => setIsAddActivityModalOpen(true)}
            >
              Dodaj aktywność
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
            <div>
              Czy na pewno chcesz usunąć rozdział: <br />
              <strong>{chapterDetails?.name}</strong>?
            </div>
            {deleteChapterError && <p style={{ color: props.theme.danger }}>{deleteChapterError}</p>}
          </>
        }
        chapterId={chapterId}
        onClick={deleteChapter}
      />

      <ChapterModal
        showModal={isEditChapterModalOpen}
        setShowModal={setEditChapterModalOpen}
        isLoaded={shouldLoadEditChapterModal}
        chapterDetails={chapterDetails}
        onSuccess={getChapterDetails}
      />

      <EditActivityModal
        setShowModal={setIsEditActivityModalOpen}
        showModal={isEditActivityModalOpen}
        activityId={chosenActivityData?.activityId}
        activityType={chosenActivityData?.activityType}
        jsonConfig={chosenActivityData?.jsonConfig}
        modalHeader={`Edycja aktywności: ${chosenActivityData?.activityName}`}
        successModalBody={
          <p>
            Twoje zmiany wprowadzone dla aktywności typu:{' '}
            <strong>{getActivityTypeName(chosenActivityData?.activityType)}</strong>
            <br /> o nazwie: <strong>{chosenActivityData?.activityName}</strong> zakończyła się pomyślnie.
          </p>
        }
        onSuccess={() => {
          getChapterDetails()
          setReloadMapNeeded(true)
        }}
      />

      <DeletionModal
        showModal={isDeleteActivityModalOpen}
        setModalOpen={setIsDeleteActivityModalOpen}
        modalTitle={'Usunięcie aktywności'}
        modalBody={
          <>
            <div>
              Czy na pewno chcesz usunąć aktywność typu: <strong>{chosenActivityData?.activityType}</strong>
              <br />o nazwie: <strong>{chosenActivityData?.activityName}</strong>?
            </div>
            {deleteActivityError && <p style={{ color: props.theme.danger }}>{deleteActivityError}</p>}
          </>
        }
        onClick={deleteActivity}
      />

      <AddActivityModal
        showModal={isAddActivityModalOpen}
        setShow={setIsAddActivityModalOpen}
        chapterId={chapterId}
        onSuccess={getChapterDetails}
      />
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ChapterDetails)
