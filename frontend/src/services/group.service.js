import { axiosApiGet, axiosApiPost } from '../utils/axios'
import { ADD_GROUP, GET_GROUPS } from './urls'

class GroupService {
  addGroup(groupName, groupKey) {
    return axiosApiPost(ADD_GROUP, {
      name: groupName,
      invitationCode: groupKey
    }).catch((error) => {
      throw error.message
    })
  }
  getGroups() {
    return axiosApiGet(GET_GROUPS)
  }
}

export default new GroupService()
