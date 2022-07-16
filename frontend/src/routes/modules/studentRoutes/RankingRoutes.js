import { Route, Routes } from 'react-router-dom'
import NotFound from '../../../components/general/NotFoundPage/NotFound'

export default function RankingRoutes() {
  return (
    <Routes>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}
