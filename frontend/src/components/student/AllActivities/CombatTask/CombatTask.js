import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Content } from '../../../App/AppGeneralStyles'
import Loader from '../../../general/Loader/Loader'
import { InfoContainer } from '../ExpeditionTask/ActivityInfo/InfoContainer'
import {
  ActivityCol,
  ActivityImg,
  ActivityName,
  ActivityType,
  FullDivider,
  HeaderCol,
  HeaderRow,
  SmallDivider
} from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import { ERROR_OCCURRED, getActivityImg, getActivityTypeName } from '../../../../utils/constants'
import FileService from './FileService'
import {
  RemarksCol,
  RemarksTextArea
} from '../../../professor/ActivityAssessmentDetails/ActivityAssesmentDetailsStyles'
import { SendTaskButton } from './CombatTaskStyles'
import CombatTaskService from '../../../../services/combatTask.service'
import { Spinner } from 'react-bootstrap'
import FeedbackFileService from './FeedbackFileService'

export default function CombatTask() {
  const location = useLocation()
  const { activityId: taskState } = location.state

  const [task, setTask] = useState(undefined)
  const [fileBlob, setFileBlob] = useState()
  const [fileName, setFileName] = useState()
  const [answer, setAnswer] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const resetStates = () => {
    setIsFetching(false)
    setFileBlob(null)
    setFileName(null)
    setAnswer('')
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

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value)
  }

  return (
    <Content>
      <InfoContainer fluid className='p-0'>
        {!task && errorMessage === '' ? (
          <Loader />
        ) : errorMessage !== '' ? (
          <p>{errorMessage}</p>
        ) : (
          <ActivityCol className='invisible-scroll'>
            <HeaderCol>
              <HeaderRow>
                <ActivityImg src={getActivityImg('TASK')}></ActivityImg>
                <ActivityType>{getActivityTypeName('TASK')}</ActivityType>
                <ActivityName>{task.name}</ActivityName>
              </HeaderRow>
              <FullDivider />
            </HeaderCol>
            <div>
              <h5>{task.description}</h5>
              {task.points !== null && (
                <>
                  <SmallDivider />
                  <p>
                    Zdobyte punkty: <strong>{task.points}</strong>
                  </p>
                  {task.remarks && (
                    <>
                      <p>Uwagi od prowadzącego:</p>
                      <p>{task.remarks}</p>
                      {task.feedbackFile && <FeedbackFileService feedbackFile={task.feedbackFile} />}
                    </>
                  )}
                </>
              )}
              <SmallDivider />
              {task.points === null && (
                <RemarksCol>
                  <h4>Odpowiedź:</h4>
                  <RemarksTextArea value={answer} onChange={handleAnswerChange} />
                </RemarksCol>
              )}
              <FileService
                task={task}
                setFile={setFileBlob}
                setFileName={setFileName}
                setIsFetching={setIsFetching}
                isFetching={isFetching}
                isRevieved={!!task.remarks}
              />
            </div>
            <SendTaskButton
              disabled={(!fileName && answer === '') || task.remarks !== null}
              onClick={() => sendAnswer()}
            >
              {isFetching ? (
                <Spinner animation={'border'} />
              ) : task.remarks === null ? (
                <span>Wyślij</span>
              ) : (
                <span>Aktywność została oceniona</span>
              )}
            </SendTaskButton>
          </ActivityCol>
        )}
      </InfoContainer>
    </Content>
  )
}
