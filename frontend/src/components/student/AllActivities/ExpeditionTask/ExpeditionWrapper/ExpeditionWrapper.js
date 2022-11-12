import { useEffect, useState, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { EXPEDITION_STATUS } from '../../../../../utils/constants'
import { StudentRoutes } from '../../../../../routes/PageRoutes'
import ExpeditionService from '../../../../../services/expedition.service'
import QuestionSelectionDoor from '../QuestionSelectionDoor/QuestionSelectionDoor'
import QuestionAndOptions from '../QuestionAndOptions/QuestionAndOptions'
import InfoContainer from '../InfoContainer/InfoContainer'
import Loader from '../../../../general/Loader/Loader'

/* 
wrapped elements should be:

-- in ANSWER
QuestionAndOptions
ClosedQuestionPage
OpenQuestionPage

-- in CHOOSE
QuestionSelectionDoor
*/

export function ExpeditionWrapper() {
  const navigate = useNavigate()
  const location = useLocation()
  const { activityId, maxPoints } = location.state

  const [expeditionState, setExpeditionState] = useState(undefined)
  const [alreadyStarted, setAlreadyStarted] = useState(undefined)

  // we will pass this function to "lower" components so that we can reload info from endpoint
  // in wrapper on changes
  // if it breaks, check whether we don't need to pass activityId in here explicitly
  const reloadState = useCallback(() => {
    if (activityId) {
      ExpeditionService.getCurrentState(activityId)
        .then((response) => {
          setExpeditionState(response)
          setAlreadyStarted(true)
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setAlreadyStarted(false)
          }
        })
    }
  }, [activityId])

  // Get current state always on page refresh (rerender)
  useEffect(() => {
    reloadState()
  }, [reloadState])

  const goToSummary = useCallback(() => {
    if (expeditionState) {
      navigate(StudentRoutes.GAME_MAP.GRAPH_TASK.SUMMARY, {
        state: {
          expeditionId: activityId,
          remainingTime: expeditionState.timeRemaining,
          isFinished: expeditionState.finished
        }
      })
    }
  }, [activityId, expeditionState, navigate])

  useEffect(() => {
    if (alreadyStarted === false && activityId) {
      ExpeditionService.setExpeditionStart(activityId).then(() => {
        reloadState()
      })
    }
  }, [activityId, alreadyStarted, reloadState])

  useEffect(() => {
    if (
      expeditionState &&
      (expeditionState.timeRemaining <= 0 ||
        (expeditionState.status === EXPEDITION_STATUS.CHOOSE && !expeditionState.questions.length))
    ) {
      goToSummary()
    }
  }, [expeditionState, goToSummary])

  const wrapperContent = useMemo(() => {
    if (expeditionState == null) {
      return <></>
    }
    switch (expeditionState.status) {
      case EXPEDITION_STATUS.ANSWER:
        return (
          <QuestionAndOptions
            activityId={activityId}
            question={expeditionState.questionDetails}
            reloadInfo={reloadState}
          />
        )
      case EXPEDITION_STATUS.CHOOSE:
        return (
          <QuestionSelectionDoor
            activityId={activityId}
            questions={expeditionState.questions}
            reloadInfo={reloadState}
          />
        )
      default:
        return <></>
    }
  }, [activityId, expeditionState, reloadState])

  return expeditionState === undefined ? (
    <Loader />
  ) : (
    <InfoContainer
      activityId={activityId}
      timeToSolveMillis={expeditionState.timeRemaining}
      endAction={goToSummary}
      actualPoints={expeditionState.actualPointsReceived}
      maxPoints={maxPoints}
      questionsPath={expeditionState.currentPath}
      actualQuestionId={expeditionState.questionDetails?.questionId}
      questions={expeditionState.questions}
      status={expeditionState.status}
    >
      {wrapperContent}
    </InfoContainer>
  )
}
