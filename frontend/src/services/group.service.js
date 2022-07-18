import { axiosApiGet, axiosApiPost } from '../utils/axios'
import { ADD_GROUP, GET_GROUPS } from './urls'

class GroupService {
  addGroup(groupName, groupKey) {
    return axiosApiPost(ADD_GROUP, {
      name: groupName,
      invitationCode: groupKey
    })
  }
  getGroups() {
    return axiosApiGet(GET_GROUPS)
  }
}

export default new GroupService()
