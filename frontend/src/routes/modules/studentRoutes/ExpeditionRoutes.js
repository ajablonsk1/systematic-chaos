import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import Timer from '../../../components/student/AllActivities/ExpeditionTask/Timer/Timer'
import QuestionSelectionDoor
  from '../../../components/student/AllActivities/ExpeditionTask/QuestionSelectionDoor/QuestionSelectionDoor'
import ExpeditionSummary
  from '../../../components/student/AllActivities/ExpeditionTask/ExpeditionSummary/ExpeditionSummary'
import QuestionAndOptions
  from '../../../components/student/AllActivities/ExpeditionTask/QuestionAndOptions/QuestionAndOptions'
import ActivityInfo from '../../../components/student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfo'
import { PageRoutes } from '../../PageRoutes'

export default function ExpeditionRoutes() {
  return (
    <Routes>
      <Route
        path={`${PageRoutes.Student.GameMap.Expedition.QUESTION_SELECTION}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <Timer>
              <QuestionSelectionDoor />
            </Timer>
          </PageGuard>
        }
      />

      <Route
        path={`${PageRoutes.Student.GameMap.Expedition.EXPEDITION_SUMMARY}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <ExpeditionSummary />
          </PageGuard>
        }
      />

      <Route
        path={`${PageRoutes.Student.GameMap.Expedition.QUESTION_ANSWER}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <Timer>
              <QuestionAndOptions />
            </Timer>
          </PageGuard>
        }
      />

      <Route
        path={`${PageRoutes.Student.GameMap.Expedition.ACTIVITY_INFO}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <ActivityInfo />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
