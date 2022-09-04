import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import Timer from '../../../components/student/AllActivities/ExpeditionTask/Timer/Timer'
import QuestionSelectionDoor from '../../../components/student/AllActivities/ExpeditionTask/QuestionSelectionDoor/QuestionSelectionDoor'
import ExpeditionSummary from '../../../components/student/AllActivities/ExpeditionTask/ExpeditionSummary/ExpeditionSummary'
import QuestionAndOptions from '../../../components/student/AllActivities/ExpeditionTask/QuestionAndOptions/QuestionAndOptions'
import ActivityInfo from '../../../components/student/AllActivities/ExpeditionTask/ActivityInfo/ActivityInfo'

export default function ExpeditionRoutes() {
  return (
    <Routes>
      <Route
        path={'doors-selection'}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <Timer>
              <QuestionSelectionDoor />
            </Timer>
          </PageGuard>
        }
      />

      <Route
        path={'summary'}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <ExpeditionSummary />
          </PageGuard>
        }
      />

      <Route
        path={'question'}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <Timer>
              <QuestionAndOptions />
            </Timer>
          </PageGuard>
        }
      />

      <Route
        path={'info'}
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
