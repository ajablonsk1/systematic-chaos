import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import Participants from '../../../components/professor/ParticipantsPage/Participants'
import { Role } from '../../../utils/userRole'
import PageGuard from '../../../components/general/PageGuard/PageGuard'

export default function ParticipantsRoutes() {
  return (
    <Routes>
      <Route
        path={''}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <Participants />
          </PageGuard>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
