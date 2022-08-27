import React, { useEffect, useMemo, useState, useRef, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import { Content } from '../../../App/AppGeneralStyles'
import Loader from '../../../general/Loader/Loader'
import { ActivityImg, ActivityName, ActivityType, HeaderRow } from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { ERROR_OCCURRED, getActivityImg, getActivityTypeName } from '../../../../utils/constants'
import FileService from './FileService'
import { RemarksTextArea } from '../../../professor/ActivityAssessmentDetails/ActivityAssesmentDetailsStyles'
import { SendTaskButton } from './CombatTaskStyles'
import CombatTaskService from '../../../../services/combatTask.service'
import { Spinner, Row, Col } from 'react-bootstrap'
import { debounce } from 'lodash'
import { faHourglass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FeedbackFileService from './FeedbackFileService'

export default function CombatTask() {
  const location = useLocation()
  const { activityId: taskState } = location.state

  const MD_WHEN_TASK_NOT_SENT = 12
  const MD_WHEN_TASK_SENT = 6

  const [task, setTask] = useState(undefined)
  const [fileBlob, setFileBlob] = useState()
  const [fileName, setFileName] = useState()
  const [answer, setAnswer] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [answerWasSentNow, setAnswerWasSentNow] = useState(false)

  const textAreaRef = useRef(null)
  const isReviewed = () => {
    return task.points
  }

  const resetStates = () => {
    setIsFetching(false)
    setFileBlob(null)
    setFileName(null)
    setAnswer('')
    setAnswerWasSentNow(true)
    textAreaRef.current.value = ''
  }

  useEffect(() => {
    CombatTaskService.getCombatTask(taskState)
      .then((response) => {
        setTask(response)
      })
      .catch(() => {
        setErrorMessage(ERROR_OCCURRED)
      })
  }, [isFetching, taskState])

  const sendAnswer = () => {
    setIsFetching(true)

    CombatTaskService.saveCombatTaskAnswer(taskState, answer, fileName, fileBlob)
      .then(() => {
        resetStates()
      })
      .catch((error) => {
        // if there is an error from the 5XX group, the object can be added anyway, so we do resetState,
        // and when an error from the 4XX group occurs, we do not clean to send again
        if (error.response?.status < 400 || error.response?.status >= 500) {
          resetStates()
        }
        setIsFetching(false)
      })
  }

  const handleAnswerChange = useMemo(
    () =>
      debounce((event) => {
        setAnswer(event.target.value)
      }, 200),
    []
  )

  //add overflows where needed

  const Header = () => (
    <>
      <ActivityImg src={getActivityImg('TASK')}></ActivityImg>
      <ActivityType>{getActivityTypeName('TASK')}</ActivityType>
      <ActivityName>{task.name}</ActivityName>
    </>
  )

  const VerticalSpacer = () => <Row style={{ height: '2vh' }}></Row>

  const HorizontalSpacer = () => <Col style={{ height: '3vh' }} />

  const ActivityDetails = () => (
    <Col>
      <h2>Treść:</h2>
      <p>{task.description}</p>
    </Col>
  )

  const AwaitingFeedbackField = () => (
    <Col md={6} className={'text-center p-4 my-auto'}>
      <FontAwesomeIcon className={'m-2'} icon={faHourglass} size='5x' spin />
      <h2 className={'m-2'}>Odpowiedź została przesłana, oczekiwanie na sprawdzenie przez prowadzącego</h2>
    </Col>
  )

  const content = () => {
    return !task && errorMessage === '' ? (
      <Loader />
    ) : errorMessage !== '' ? (
      <p>{errorMessage}</p>
    ) : (
      <>
        <HorizontalSpacer />
        <Col
          className='m-0 pt-4 mx-auto'
          style={{ height: '94vh', width: '90%', backgroundColor: 'var(--light-blue)' }}
        >
          <HeaderRow className='p-2 rounded mx-2' style={{ backgroundColor: 'var(--dark-blue)', height: '8vh' }}>
            <Header />
          </HeaderRow>
          <VerticalSpacer />
          <Row
            className='p-2 rounded mx-2 overflow-auto'
            style={{ backgroundColor: 'var(--dark-blue)', height: '25vh' }}
          >
            <ActivityDetails />
          </Row>
          <VerticalSpacer />
          <Row className='p-2 rounded mx-2' style={{ backgroundColor: 'var(--dark-blue)', height: '50vh' }}>
            <Col
              md={task.answer || answerWasSentNow ? MD_WHEN_TASK_SENT : MD_WHEN_TASK_NOT_SENT}
              className={'h-100 overflow-auto'}
            >
              <h4>Odpowiedź:</h4>
              {isReviewed() ? (
                <Col>
                  <h4>Twoja odpowiedź</h4>
                  <p>{task.answer}</p>
                </Col>
              ) : (
                <>
                  {task.answer && (
                    <Col>
                      <h5>Twoja obecna odpowiedź</h5>
                      <p>{task.answer}</p>
                    </Col>
                  )}
                  <RemarksTextArea ref={textAreaRef} disabled={isReviewed()} onChange={handleAnswerChange} />
                </>
              )}
              <Col className={'text-center overflow-auto'}>
                <FileService
                  task={task}
                  setFile={setFileBlob}
                  setFileName={setFileName}
                  setIsFetching={setIsFetching}
                  isFetching={isFetching}
                  isRevieved={isReviewed()}
                />
              </Col>
              <Col className={'w-100 text-center'}>
                <SendTaskButton disabled={task.points !== null} onClick={sendAnswer}>
                  {isFetching ? (
                    <Spinner animation={'border'} />
                  ) : isReviewed() ? (
                    <span>Aktywność została oceniona</span>
                  ) : (
                    <span>Wyślij</span>
                  )}
                </SendTaskButton>
              </Col>
            </Col>
            {task.answer != null || task.files != null || answerWasSentNow ? (
              !isReviewed() ? (
                <AwaitingFeedbackField />
              ) : (
                <Col className={'border-left border-warning overflow-auto'}>
                  <h4>Aktywność została oceniona</h4>
                  <VerticalSpacer />
                  <Col className={'text-center mx-auto border border-warning p-1 rounded'} style={{ width: '20%' }}>
                    <h5>Punkty </h5>
                    <p>{task.points}</p>
                  </Col>
                  <VerticalSpacer />
                  <h5>Uwagi:</h5>
                  {task.remarks ? <p>{task.remarks}</p> : 'Brak uwag'}
                  <FeedbackFileService feedbackFile={task.feedbackFile} />
                </Col>
              )
            ) : null}
          </Row>
        </Col>
        <HorizontalSpacer />
      </>
    )
  }

  return <Content style={{ color: 'var(--font-color)' }}>{content()}</Content>
}
