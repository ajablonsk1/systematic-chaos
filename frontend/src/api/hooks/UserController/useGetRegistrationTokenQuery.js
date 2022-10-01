import ProfessorService from '../../services/professor.service'
import { useQuery } from '../useQuery'

export const useGetRegistrationTokenQuery = () => {
  return useQuery({ query: ProfessorService.getRegistrationToken })
}
