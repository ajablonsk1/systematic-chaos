import { Route, Routes } from 'react-router-dom'
import NotFound from '../components/general/NotFoundPage/NotFound'
import PageGuard from '../components/general/PageGuard/PageGuard'
import { Role } from '../utils/userRole'
import LoginAndRegistration from '../components/general/LoginAndRegistrationPage/LoginAndRegistration'
import GameCardRoutes from './modules/studentRoutes/GameCardRoutes'
import GameMapRoutes from './modules/studentRoutes/GameMapRoutes'
import PointsRoutes from './modules/studentRoutes/PointsRoutes'
import StudentRankingRoutes from './modules/studentRoutes/RankingRoutes'
import BadgesAndAchievementsRoutes from './modules/studentRoutes/BadgesAndAchievementsRoutes'
import GameSummaryRoutes from './modules/teacherRoutes/GameSummaryRoutes'
import GameManagementRoutes from './modules/teacherRoutes/GameManagementRoutes'
import ParticipantsRoutes from './modules/teacherRoutes/ParticipantsRoutes'
import ActivityAssessmentRoutes from './modules/teacherRoutes/ActivityAssessmentRoutes'
import GradesRoutes from './modules/teacherRoutes/GradesRoutes'
import TeacherRankingRoutes from './modules/teacherRoutes/RankingRoutes'
import CanvasMap from '../components/student/CanvasMapPage/CanvasMap'
import ProfileRoutes from './modules/studentRoutes/ProfileRoutes'

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        exact
        element={
          <PageGuard role={Role.NOT_LOGGED_IN}>
            <LoginAndRegistration />
          </PageGuard>
        }
      />

      <Route
        path={'/canvas'}
        exact
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <CanvasMap />
          </PageGuard>
        }
      />

      <Route path={'/game-card/*'} element={<GameCardRoutes />} />

      <Route path={'/game-map/*'} element={<GameMapRoutes />} />

      <Route path={'/points/*'} element={<PointsRoutes />} />

      <Route path={'/ranking/*'} element={<StudentRankingRoutes />} />

      <Route path={'/badges-achievements/*'} element={<BadgesAndAchievementsRoutes />} />

      <Route path={'/profile/*'} element={<ProfileRoutes />} />

      <Route path={'/game-summary/*'} element={<GameSummaryRoutes />} />

      <Route path={'/students-ranking/*'} element={<TeacherRankingRoutes />} />

      <Route path={'/game-management/*'} element={<GameManagementRoutes />} />

      <Route path={'/participants/*'} element={<ParticipantsRoutes />} />

      <Route path={'/assessment/*'} element={<ActivityAssessmentRoutes />} />

      <Route path={'/grades/*'} element={<GradesRoutes />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
