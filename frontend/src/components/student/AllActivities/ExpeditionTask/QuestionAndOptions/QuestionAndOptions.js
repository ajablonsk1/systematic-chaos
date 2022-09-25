import ClosedQuestionPage from './ClosedQuestionPage/ClosedQuestionPage'
import { ERROR_OCCURRED, QuestionType } from '../../../../../utils/constants'
import Loader from '../../../../general/Loader/Loader'
import { ContentWithBackground } from './QuestionAndOptionsStyle'
import OpenQuestionPage from './OpenQuestionPage/OpenQuestionPage'

// we don't need navigate, we don't need location - props are enough

function QuestionAndOptions(props) {
  const { activityId: expeditionId, question, reloadInfo } = props

  // NOTE: do we need the below block at all? don't we record it on endpoint already?

  // complete the expedition and record user responses if the expedition has not been completed
  // before the timer runs out
  // useEffect(() => {
  //   if (remainingTime === 0) {
  //     ExpeditionService.setSendTime(taskResultId, Date.now())
  //       .then(() => {
  //         navigate(StudentRoutes.GAME_MAP.GRAPH_TASK.SUMMARY, {
  //           state: {
  //             expeditionId: expeditionId,
  //             remainingTime: remainingTime,
  //             taskResultId: taskResultId
  //           }
  //         })
  //       })
  //       .catch(() => {})
  //   }
  // }, [expeditionId, navigate, remainingTime, taskResultId])

  return (
    <ContentWithBackground>
      {question === undefined ? (
        <Loader />
      ) : question == null ? (
        <p className={'text-center text-danger h3'}>{ERROR_OCCURRED}</p>
      ) : (
        <>
          {question.type === QuestionType.OPEN_QUESTION ? (
            <OpenQuestionPage expeditionId={expeditionId} question={question} reloadInfo={reloadInfo} />
          ) : (
            <ClosedQuestionPage expeditionId={expeditionId} question={question} reloadInfo={reloadInfo} />
          )}
        </>
      )}
    </ContentWithBackground>
  )
}

export default QuestionAndOptions
