import { axiosApiGet, axiosApiPost } from '../utils/axios'
import { GROUP, GET_ALL_STUDENTS, GET_GROUPS, GET_GROUP_STUDENTS, SET_STUDENT_GROUP } from './urls'

class GroupService {
  addGroup(groupName, groupKey) {
    return axiosApiPost(GROUP, {
      name: groupName,
      invitationCode: groupKey
    }).catch((error) => {
      throw error
    })
  }
  getGroups() {
    return axiosApiGet(GET_GROUPS).catch((error) => {
      throw error
    })
  }

  getAllStudents() {
    return axiosApiGet(GET_ALL_STUDENTS).catch((error) => {
      throw error
    })
  }

  getGroupStudents(groupId) {
    return axiosApiGet(GET_GROUP_STUDENTS, { groupId: groupId }).catch((error) => {
      throw error
    })
  }

  changeStudentGroup(studentId, newGroupId) {
    return axiosApiPost(SET_STUDENT_GROUP, {
      studentId: studentId,
      newGroupId: newGroupId
    }).catch((error) => {
      throw error
    })
  }
}

export default new GroupService()
