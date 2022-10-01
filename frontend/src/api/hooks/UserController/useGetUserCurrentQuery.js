import { useQuery } from '../useQuery'
import UserService from '../../services/user.service'

export const useGetUserCurrentQuery = (options = {}) => {
  return useQuery({ query: UserService.getUserData, options: options })
}
