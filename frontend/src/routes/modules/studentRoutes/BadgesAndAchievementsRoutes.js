import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import { PageRoutes } from '../../PageRoutes'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import BadgesPage from '../../../components/student/BadgesPage/BadgesPage'

export default function BadgesAndAchievementsRoutes() {
  return (
    <Routes>
      <Route
        path={PageRoutes.Student.BadgesAndAchievements.BADGES_ACHIEVEMENTS}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <BadgesPage />
          </PageGuard>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
