import { Route, Routes } from 'react-router-dom'
import { PageRoutes } from '../../PageRoutes'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import SurveyTask from '../../../components/student/AllActivities/SurveyTask/SurveyTask'

export default function SurveyTaskRoutes() {
  return (
    <Routes>
      <Route
        path={`${PageRoutes.Student.GameMap.SurveyTask.SURVEY_TASK}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <SurveyTask />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
