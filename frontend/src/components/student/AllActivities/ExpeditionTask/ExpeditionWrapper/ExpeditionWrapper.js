import { useEffect, useState, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { EXPEDITION_STATUS } from './ExpeditionWrapperHelpers'
import { StudentRoutes } from '../../../../../routes/PageRoutes'
import ExpeditionService from '../../../../../services/expedition.service'

export function ExpeditionWrapper() {
  const navigate = useNavigate()
  const location = useLocation()
  const { activityId, alreadyStarted } = location.state

  const [remainingTime, setRemainingTime] = useState(undefined)
  const [score, setScore] = useState(0)
  const [expeditionState, setExpeditionState] = useState(undefined)

  // we will pass this function to "lower" components so that we can reload info from endpoint
  // in wrapper on changes
  // if it breaks, check whether we don't need to pass activityId in here explicitly
  const reloadState = useCallback(
    () => ExpeditionService.getCurrentState(activityId).then((response) => setExpeditionState(response)),
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

  if (expeditionState.status === EXPEDITION_STATUS.CHOOSE) {
    // return changed Question Select screen

    if (expeditionState.questions.length === 0) {
      //navigate to summary if there are no questions left
      //navigate(StudentRoutes.GAME_MAP.GRAPH_TASK.SUMMARY)
      return <p>I am in choose state without questions!</p>
    }

    return <p>I am in choose state with questions!</p>
  }

  if (expeditionState.status === EXPEDITION_STATUS.ANSWER) {
    // return changed Question Answer Screen
    // a thing I missed - we don't return a question type on answer state, for now I'll hardcode all as multiple
    return <p> I am in answer mode</p>
  }

  return <p>... I shouldn't be here</p>
}
