import { axiosApiPost } from '../utils/axios'
import { ADD_GROUP } from './urls'

class GroupService {
  addGroup(groupName, groupKey) {
    return axiosApiPost(ADD_GROUP, {
      name: groupName,
      invitationCode: groupKey
    })
  }
}

export default new GroupService()
