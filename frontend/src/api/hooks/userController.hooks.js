import { useQuery } from './useQuery'
import ProfessorService from '../services/professor.service'
import UserService from '../services/user.service'
import GroupService from '../services/group.service'

export const useGetRegistrationTokenQuery = () => {
  return useQuery({ query: ProfessorService.getRegistrationToken })
}

export const useGetUserCurrentQuery = () => {
  return useQuery({ query: UserService.getUserData })
}

export const useGetStudentsWithGroupAllQuery = (options) => {
  return useQuery({ query: GroupService.getAllStudents, options })
}
