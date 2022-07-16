import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import ActivityAssessmentList from '../../../components/professor/ActivityAssessmentList/ActivityAssessmentList'
import ActivityAssessmentDetails from '../../../components/professor/ActivityAssessmentDetails/ActivityAssessmentDetails'
import { PageRoutes } from '../../PageRoutes'

export default function ActivityAssessmentRoutes() {
  return (
    <Routes>
      <Route
        path={`${PageRoutes.Teacher.ActivityAssessment.ACTIVITY_ASSESSMENT_LIST}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <ActivityAssessmentList />
          </PageGuard>
        }
      />

      <Route
        path={`${PageRoutes.Teacher.ActivityAssessment.ACTIVITY_ASSESSMENT}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <ActivityAssessmentDetails />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
