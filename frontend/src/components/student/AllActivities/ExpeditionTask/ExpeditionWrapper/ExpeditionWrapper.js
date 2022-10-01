import { useEffect, useState, useCallback, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { EXPEDITION_STATUS } from '../../../../../utils/constants'
import { StudentRoutes } from '../../../../../routes/PageRoutes'
import ExpeditionService from '../../../../../api/services/expedition.service'
import QuestionSelectionDoor from '../QuestionSelectionDoor/QuestionSelectionDoor'
import QuestionAndOptions from '../QuestionAndOptions/QuestionAndOptions'
import InfoContainer from '../InfoContainer/InfoContainer'

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
  const { activityId, alreadyStarted, maxPoints } = location.state

  const [expeditionState, setExpeditionState] = useState(undefined)

  // we will pass this function to "lower" components so that we can reload info from endpoint
  // in wrapper on changes
  // if it breaks, check whether we don't need to pass activityId in here explicitly
  const reloadState = useCallback(
    () =>
      ExpeditionService.getCurrentState(activityId).then((response) => {
        setExpeditionState(response)
      }),
    [activityId]
  )

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
    if (activityId) {
      if (alreadyStarted) {
        // no need to start the expedition again, just do getInfo
        reloadState()
      } else {
        // else start the expedition and do getInfo then
        ExpeditionService.setExpeditionStart(activityId).then(() => {
          reloadState()
        })
      }
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
    <Spinner animation={'border'} />
  ) : (
    <InfoContainer
      activityId={activityId}
      timeToSolveMillis={expeditionState.timeRemaining}
      endAction={goToSummary}
      actualPoints={expeditionState.actualPointsReceived}
      maxPoints={maxPoints}
      questionsPath={expeditionState.currentPath}
      actualQuestionId={expeditionState.questionDetails?.questionId}
    >
      {wrapperContent}
    </InfoContainer>
  )
}
