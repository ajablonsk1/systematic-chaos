import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import { PageRoutes } from '../../PageRoutes'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import StudentsRanking from '../../../components/professor/StudentsRanking/StudentsRanking'

export default function RankingRoutes() {
  return (
    <Routes>
      <Route
        path={PageRoutes.Teacher.Ranking.RANKING}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <StudentsRanking />
          </PageGuard>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
