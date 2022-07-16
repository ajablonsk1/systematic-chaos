import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import { PageRoutes } from '../../PageRoutes'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import GameSummary from '../../../components/professor/GameSummary/GameSummary'

export default function GameSummaryRoutes() {
  return (
    <Routes>
      <Route
        path={`${PageRoutes.Teacher.GameSummary.GAME_SUMMARY}`}
        element={
          <PageGuard role={Role.LOGGED_IS_AS_TEACHER}>
            <GameSummary />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
