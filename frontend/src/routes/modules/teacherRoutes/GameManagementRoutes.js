import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
import Groups from '../../../components/professor/GroupsPage/Groups'
import { PageRoutes } from '../../PageRoutes'
import GameManagement from '../../../components/professor/GameManagement/GameManagement'
import ChapterDetails from '../../../components/professor/ChapterDetails/ChapterDetails'
import RankAndBadgesManagement from '../../../components/professor/GameManagement/RanksAndBadges/RankAndBadgesManagement'
import ActivityDetails from '../../../components/professor/GameManagement/ActivityDetails/ActivityDetails'

export default function GameManagementRoutes() {
  return (
    <Routes>
      <Route
        path={PageRoutes.Teacher.GameManagement.GAME_MANAGEMENT}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <GameManagement />
          </PageGuard>
        }
      />

      <Route
        path={PageRoutes.Teacher.GameManagement.Groups.GROUPS}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <Groups />
          </PageGuard>
        }
      />

      <Route
        path={PageRoutes.Teacher.GameManagement.Chapters.CHAPTER + '/:name/:id'}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <ChapterDetails />
          </PageGuard>
        }
      />

      <Route
        path={PageRoutes.Teacher.GameManagement.Chapters.CHAPTER + '/:name/:id/activity/:activityName'}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <ActivityDetails />
          </PageGuard>
        }
      />

      <Route
        path={PageRoutes.Teacher.GameManagement.RanksAndBadgesManagement.RANKS_BADGES}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <RankAndBadgesManagement />
          </PageGuard>
        }
      />

      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
