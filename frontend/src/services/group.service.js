import { axiosApiPost } from '../utils/axios'
import { ADD_GROUP } from './urls'

class GroupService {
  addGroup(groupName, groupKey) {
    // TODO: remove dates later

    return axiosApiPost(ADD_GROUP, {
      name: groupName,
      dateFrom: new Date(),
      dateTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      invitationCode: groupKey
    })
  }
}

export default new GroupService()
