import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'
import GradeListAndExport from '../../../components/professor/GradeListAndExport/GradeListAndExport'
import { PageRoutes } from '../../PageRoutes'
import PageGuard from '../../../components/general/PageGuard/PageGuard'
import { Role } from '../../../utils/userRole'
export default function GradesRoutes() {
  return (
    <Routes>
      <Route
        path={`${PageRoutes.Teacher.Grades.GRADES}`}
        element={
          <PageGuard role={Role.LOGGED_IN_AS_TEACHER}>
            <GradeListAndExport />
          </PageGuard>
        }
      />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
