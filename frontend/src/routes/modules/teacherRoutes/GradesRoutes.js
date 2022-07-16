import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'

export default function GradesRoutes() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
