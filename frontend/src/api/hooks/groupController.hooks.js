import { useQuery } from './useQuery'
import GroupService from '../services/group.service'

export const useGetGroupStudentsQuery = (requestData, options) => {
  return useQuery({ requestData, query: GroupService.getGroupStudents, options })
}

export const usePostGroupQuery = (requestData, options) => {
  return useQuery({ requestData, query: GroupService.addGroup, options })
}

export const useGetGroupInvitationCodeListQuery = (options = {}) => {
  return useQuery({ query: GroupService.getGroups, options })
}
