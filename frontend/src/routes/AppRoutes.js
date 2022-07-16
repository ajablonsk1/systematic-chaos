import { Route, Routes } from 'react-router-dom'
import NotFound from '../components/general/NotFoundPage/NotFound'
import { generateFullPath, PageRoutes } from './PageRoutes'
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
        path={generateFullPath(() => PageRoutes.General.CANVAS)}
        exact
        element={
          <PageGuard role={Role.LOGGED_IN_AS_STUDENT}>
            <CanvasMap />
          </PageGuard>
        }
      />

      <Route path={PageRoutes.Student.GameCard.MAIN_PATH} element={<GameCardRoutes />} />

      <Route path={PageRoutes.Student.GameMap.MAIN_PATH} element={<GameMapRoutes />} />

      <Route path={PageRoutes.Student.Points.MAIN_PATH} element={<PointsRoutes />} />

      <Route path={PageRoutes.Student.Ranking.MAIN_PATH} element={<StudentRankingRoutes />} />

      <Route path={PageRoutes.Student.BadgesAndAchievements.MAIN_PATH} element={<BadgesAndAchievementsRoutes />} />

      <Route path={PageRoutes.Teacher.GameSummary.MAIN_PATH} element={<GameSummaryRoutes />} />

      <Route path={PageRoutes.Teacher.Ranking.MAIN_PATH} element={<TeacherRankingRoutes />} />

      <Route path={PageRoutes.Teacher.GameManagement.MAIN_PATH} element={<GameManagementRoutes />} />

      <Route path={PageRoutes.Teacher.Participants.MAIN_PATH} element={<ParticipantsRoutes />} />

      <Route path={PageRoutes.Teacher.ActivityAssessment.MAIN_PATH} element={<ActivityAssessmentRoutes />} />

      <Route path={PageRoutes.Teacher.Grades.MAIN_PATH} element={<GradesRoutes />} />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
