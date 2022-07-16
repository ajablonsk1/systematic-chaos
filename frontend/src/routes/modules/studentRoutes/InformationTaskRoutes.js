import { Route, Routes } from 'react-router-dom'
import { PageRoutes } from '../../PageRoutes'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import Information from '../../../components/student/AllActivities/InfoTask/Information'

export default function InformationTaskRoutes() {
  return (
    <Routes>
      <Route
        path={`${PageRoutes.Student.GameMap.InformationTask.INFORMATION}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <Information />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
