import { useNavigate } from 'react-router-dom'
import { Col, Spinner } from 'react-bootstrap'
import {
  Activity,
  ERROR_OCCURED,
  getActivityImg,
  getActivityTypeName,
  START_GRAPH_NODE_ID
} from '../../../../../utils/constants'
import {
  ActivityCol,
  ActivityImg,
  ActivityName,
  ActivityType,
  ButtonFooter,
  FullDivider,
  HeaderCol,
  HeaderRow,
  SmallDivider,
  Spacer,
  StartActivityButton
} from './ActivityInfoStyles'
import { useEffect, useState } from 'react'

import StudentService from '../../../../../services/student.service'
import { convertSecondsToStringInfo } from '../../../../../utils/Api'
import ExpeditionService from '../../../../../services/expedition.service'
import { generateFullPath, PageRoutes } from '../../../../../routes/PageRoutes'

export default function ActivityContent(props) {
  const navigate = useNavigate()
  const activityId = props.activityId

  const [loadedScore, setLoadedScore] = useState(false)
  const [activityScore, setActivityScore] = useState(undefined)
  const [pointsReceived, setPointsReceived] = useState(0)
  const [startDate, setStartDate] = useState(undefined)
  const [endDate, setEndDate] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)

  useEffect(() => {
    ExpeditionService.getExpeditionScore(activityId)
      .then((response) => {
        setActivityScore(response || 0)
        setLoadedScore(true)
      })
      .catch(() => {
        setErrorMessage(ERROR_OCCURED)
      })
  }, [activityId, props])

  useEffect(() => {
    if (loadedScore) {
      StudentService.getUserGroup()
        .then((activityGroup) => {
          const givenTimeData = props.activity.requirement?.accessDates.find((el) =>
            el.group.find((el) => el.name === activityGroup.name)
          )

          if (givenTimeData) {
            setStartDate(new Date(...givenTimeData.dateFrom))
            setEndDate(new Date(...givenTimeData.dateTo))
          }
        })
        .catch(() => {
          setStartDate(ERROR_OCCURED)
          setEndDate(ERROR_OCCURED)
        })

      if (activityScore?.id) {
        ExpeditionService.getExpeditionAllPoints(activityScore.id)
          .then((response) => setPointsReceived(response ?? 0))
          .catch(() => setPointsReceived(0))
      }
    }
  }, [loadedScore, activityScore?.id, props.activity.requirement])

  const resetStorageAndStart = () => {
    const navigateTo = (nodeId, taskResultId) =>
      navigate(
        generateFullPath(() => PageRoutes.Student.GameMap.Expedition.QUESTION_SELECTION),
        {
          state: {
            activityId: activityId,
            nodeId: nodeId,
            taskResultId: taskResultId,
            timeToSolveMillis: props.activity.timeToSolveMillis
          }
        }
      )

    if (activityScore?.id) {
      // clean previous answers
      navigateTo(START_GRAPH_NODE_ID, activityScore.id)
    } else {
      // returns resultId value, very important
      ExpeditionService.getTaskAnswerId(activityId)
        .then((response) => {
          // set startTime in milliseconds
          ExpeditionService.setStartTime(response.id, Date.now())
            .then(() => {
              // later get the first question on endpoint
              navigateTo(props.activity.questions[0].id, response.id)
            })
            .catch(() => {})
        })
        .catch(() => {})
    }
  }

  return (
    <>
      {!loadedScore && !errorMessage ? (
        <Spinner animation={'border'} />
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        <ActivityCol className='invisible-scroll'>
          <HeaderCol>
            <HeaderRow>
              <ActivityImg src={getActivityImg(Activity.EXPEDITION)} />
              <ActivityType>{getActivityTypeName(Activity.EXPEDITION)}</ActivityType>
              <ActivityName>{props.activity.name}</ActivityName>
            </HeaderRow>
            <FullDivider />
          </HeaderCol>

          <div>
            <p>{props.activity.description}</p>
            <SmallDivider />
            {props.activity.requiredKnowledge && (
              <>
                <p>Wymagana wiedza:</p>
                <p>{props.activity.requiredKnowledge}</p>
              </>
            )}
            <Spacer />

            <p>Obecna liczba punktów - {pointsReceived}</p>
            <p>Maksymalna liczba punktów do zdobycia - {props.activity.maxPoints}</p>
            <p>Liczba punktów licząca się jako 100% - {props.activity.maxPoints100}</p>
            <Spacer />

            {startDate === ERROR_OCCURED ? (
              <p>
                Data dostępności aktywności: <br />
                <strong>{ERROR_OCCURED}</strong>
              </p>
            ) : !props.activity.requirement ? (
              <p>Aktywność nie ma ustawionego limitu czasowego</p>
            ) : (
              <>
                <p>
                  Data dostępności aktywności - od{' '}
                  {startDate && startDate.toLocaleDateString() + ' ' + startDate.toLocaleTimeString()} do{' '}
                  {endDate && endDate.toLocaleDateString() + ' ' + endDate.toLocaleTimeString()}
                </p>
                <p>Pozostało {convertSecondsToStringInfo(endDate)}</p>
              </>
            )}
          </div>

          <ButtonFooter>
            <Col>
              <FullDivider />
              {/* for now only one attempt is possible */}
              <StartActivityButton disabled={activityScore.id} onClick={() => resetStorageAndStart()}>
                Rozpocznij
              </StartActivityButton>
            </Col>
          </ButtonFooter>
        </ActivityCol>
      )}
    </>
  )
}
