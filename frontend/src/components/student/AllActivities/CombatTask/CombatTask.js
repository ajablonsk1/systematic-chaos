import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Content } from '../../../App/AppGeneralStyles'
import Loader from '../../../general/Loader/Loader'
import { Activity, ERROR_OCCURRED } from '../../../../utils/constants'
import FileService from './FileService'
import { RemarksTextArea } from '../../../professor/ActivityAssessmentDetails/ActivityAssesmentDetailsStyles'
import { SendTaskButton } from './CombatTaskStyles'
import CombatTaskService from '../../../../services/combatTask.service'
import { Spinner, Row, Col } from 'react-bootstrap'
import { debounce } from 'lodash'
import { faHourglass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FeedbackFileService from './FeedbackFileService'
import { Header, VerticalSpacer, HorizontalSpacer, ActivityDetails } from '../../../general/TaskSharedComponents'
import { Fade } from 'react-awesome-reveal'

const FIELD_DELAY = 600

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
        setTask(null)
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

  const AwaitingFeedbackField = () => (
    <Col md={6} className={'text-center p-4 my-auto'}>
      <Fade delay={FIELD_DELAY}>
        <FontAwesomeIcon className={'m-2'} icon={faHourglass} size='5x' spin />
        <h2 className={'m-2'}>Odpowiedź została przesłana, oczekiwanie na sprawdzenie przez prowadzącego</h2>
      </Fade>
    </Col>
  )

  const contentBody = () => {
    return (
      <>
        <HorizontalSpacer height={'3vh'} />
        <Col
          className='m-0 pt-4 mx-auto'
          style={{ height: '94vh', width: '90%', backgroundColor: 'var(--light-blue)' }}
        >
          <Row className='p-2 rounded mx-2' style={{ backgroundColor: 'var(--dark-blue)', height: '6vh' }}>
            <Header activityName={task.name} activityType={Activity.TASK} />
          </Row>
          <VerticalSpacer height={'2vh'} />
          <Row
            className='p-2 rounded mx-2 overflow-auto'
            style={{ backgroundColor: 'var(--dark-blue)', height: '25vh' }}
          >
            <ActivityDetails description={task.description} />
          </Row>
          <VerticalSpacer height={'2vh'} />
          <Row className='p-2 rounded mx-2' style={{ backgroundColor: 'var(--dark-blue)', height: '50vh' }}>
            <Col
              md={task.answer || answerWasSentNow ? MD_WHEN_TASK_SENT : MD_WHEN_TASK_NOT_SENT}
              className={'h-100 overflow-auto'}
            >
              <Fade delay={FIELD_DELAY}>
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
                <Col className={'text-center'}>
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
                  <SendTaskButton disabled={task.points != null} onClick={sendAnswer}>
                    {isFetching ? (
                      <Spinner animation={'border'} />
                    ) : isReviewed() ? (
                      <span>Aktywność została oceniona</span>
                    ) : (
                      <span>Wyślij</span>
                    )}
                  </SendTaskButton>
                </Col>
              </Fade>
            </Col>

            {task.answer != null || task.files != null || answerWasSentNow ? (
              !isReviewed() ? (
                <AwaitingFeedbackField />
              ) : (
                <Col className={'border-left border-warning overflow-auto'}>
                  <h4>Aktywność została oceniona</h4>
                  <VerticalSpacer height={'2vh'} />
                  <Col className={'text-center mx-auto border border-warning p-1 rounded'} style={{ width: '20%' }}>
                    <h5>Punkty </h5>
                    <p>{task.points}</p>
                  </Col>
                  <VerticalSpacer height={'2vh'} />
                  <h5>Uwagi:</h5>
                  {task.remarks ? <p>{task.remarks}</p> : 'Brak uwag'}
                  <FeedbackFileService feedbackFile={task.feedbackFile} />
                </Col>
              )
            ) : (
              <></>
            )}
          </Row>
        </Col>
        <HorizontalSpacer height={'3vh'} />
      </>
    )
  }

  return (
    <Content style={{ color: 'var(--font-color)' }}>
      {task === undefined ? <Loader /> : task == null ? ERROR_OCCURRED : contentBody()}
    </Content>
  )
}
