import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import GameMap from '../../../components/student/GameMapPage/GameMap'
import ExpeditionRoutes from './ExpeditionRoutes'
import { PageRoutes } from '../../PageRoutes'
import CombatTaskRoutes from './CombatTaskRoutes'
import SurveyTaskRoutes from './SurveyTaskRoutes'
import InformationTaskRoutes from './InformationTaskRoutes'

export default function GameMapRoutes() {
  return (
    <Routes>
      <Route
        path={PageRoutes.Student.GameMap.GAME_MAP}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <GameMap />
          </PageGuard>
        }
      />

      <Route path={PageRoutes.Student.GameMap.CombatTask.MAIN_PATH} element={<CombatTaskRoutes />} />

      <Route path={PageRoutes.Student.GameMap.SurveyTask.MAIN_PATH} element={<SurveyTaskRoutes />} />

      <Route path={PageRoutes.Student.GameMap.InformationTask.MAIN_PATH} element={<InformationTaskRoutes />} />

      <Route path={PageRoutes.Student.GameMap.Expedition.MAIN_PATH} element={<ExpeditionRoutes />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
