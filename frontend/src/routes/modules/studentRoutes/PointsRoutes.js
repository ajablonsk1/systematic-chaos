import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import Points from '../../../components/student/PointsPage/Points'
import { PageRoutes } from '../../PageRoutes'

export default function PointsRoutes() {
  return (
    <Routes>
      <Route
        path={`${PageRoutes.Student.Points.POINTS}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <Points />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
