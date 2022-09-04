import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import GameMap from '../../../components/student/GameMapPage/GameMap'
import ExpeditionRoutes from './ExpeditionRoutes'
import CombatTaskRoutes from './CombatTaskRoutes'
import SurveyTaskRoutes from './SurveyTaskRoutes'
import InformationTaskRoutes from './InformationTaskRoutes'

export default function GameMapRoutes() {
  return (
    <Routes>
      <Route
        path={''}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <GameMap />
          </PageGuard>
        }
      />

      <Route path={'combat-task/*'} element={<CombatTaskRoutes />} />

      <Route path={'survey-task/*'} element={<SurveyTaskRoutes />} />

      <Route path={'information/*'} element={<InformationTaskRoutes />} />

      <Route path={'expedition/*'} element={<ExpeditionRoutes />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
