import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { EXPEDITION_STATUS } from './ExpeditionWrapperHelpers'
import { StudentRoutes } from '../../../../../routes/PageRoutes'
import ExpeditionService from '../../../../../services/expedition.service'
import QuestionSelectionDoor from '../QuestionSelectionDoor/QuestionSelectionDoor'
import QuestionAndOptions from '../QuestionAndOptions/QuestionAndOptions'
import Timer from '../Timer/Timer'
// wrapped elements should be:

// -- in ANSWER
// QuestionAndOptions
// ClosedQuestionPage
// OpenQuestionPage

// -- in CHOOSE
// QuestionSelectionDoor

export function ExpeditionWrapper() {
  const navigate = useNavigate()
  const location = useLocation()
  const { activityId, alreadyStarted } = location.state

  const [score, setScore] = useState(0)
  const [remainingTime, setRemainingTime] = useState(undefined)
  const [expeditionState, setExpeditionState] = useState(undefined)

  const goToSummary = () => {
    navigate(StudentRoutes.GAME_MAP.GRAPH_TASK.SUMMARY, {
      state: { expeditionId: activityId, remainingTime: expeditionState.timeRemaining }
    })
  }

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

  if (expeditionState === undefined) {
    return <Spinner />
  }

  if (expeditionState.remainingTime <= 0) {
    goToSummary()
  }

  if (expeditionState.status === EXPEDITION_STATUS.CHOOSE) {
    // return changed Question Select screen

    if (expeditionState.questions.length === 0) {
      //navigate to summary if there are no questions left
      goToSummary()
      // return <p>I am in choose state without questions!</p>
    }

    return (
      <Timer activityId={activityId} timeToSolveMillis={expeditionState.timeRemaining} endAction={goToSummary}>
        <QuestionSelectionDoor activityId={activityId} questions={expeditionState.questions} reloadInfo={reloadState} />
      </Timer>
    )
  }

  if (expeditionState.status === EXPEDITION_STATUS.ANSWER) {
    // return changed Question Answer Screen
    console.log(expeditionState)
    return (
      <Timer activityId={activityId} timeToSolveMillis={expeditionState.timeRemaining} endAction={goToSummary}>
        <QuestionAndOptions
          activityId={activityId}
          question={expeditionState.questionDetails}
          reloadInfo={reloadState}
        />
      </Timer>
    )
  }

  return <p>... I shouldn't be here</p>
}
