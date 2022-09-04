import { Route, Routes } from 'react-router-dom'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import CombatTask from '../../../components/student/AllActivities/CombatTask/CombatTask'

export default function CombatTaskRoutes() {
  return (
    <Routes>
      <Route
        path={''}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <CombatTask />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
