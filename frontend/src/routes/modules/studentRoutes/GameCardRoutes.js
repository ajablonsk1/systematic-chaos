import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import GameCard from '../../../components/student/GameCardPage/GameCard'
import { PageRoutes } from '../../PageRoutes'

export default function GameCardRoutes() {
  return (
    <Routes>
      <Route
        path={`${PageRoutes.Student.GameCard.GAME_CARD}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <GameCard />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
