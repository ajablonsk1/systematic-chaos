import {
  GET_ADDITIONAL_POINTS,
  GET_TASK_RESULT_POINTS_STATISTICS,
  POST_USER_INDEX,
  GET_USER_GROUP,
  GET_POINTS_ALL_TOTAL,
  GET_DASHBOARD,
  DELETE_USER_STUDENT
} from './urls'
import { axiosApiDelete, axiosApiGet, axiosApiPost } from '../utils/axios'

class StudentService {
  getUserGroup() {
    return axiosApiGet(GET_USER_GROUP).catch((error) => {
      throw error
    })
  }

  getPointsStats() {
    return axiosApiGet(GET_TASK_RESULT_POINTS_STATISTICS).catch((error) => {
      throw error
    })
  }

  getBonusPointsList() {
    return axiosApiGet(GET_ADDITIONAL_POINTS).catch((error) => {
      throw error
    })
  }

  getTotalReceivedPoints() {
    return axiosApiGet(GET_POINTS_ALL_TOTAL).catch((error) => {
      throw error
    })
  }

  setIndexNumber(newIndexNumber) {
    return axiosApiPost(POST_USER_INDEX, { newIndexNumber: newIndexNumber }).catch((error) => {
      throw error
    })
  }

  getDashboardStats() {
    return axiosApiGet(GET_DASHBOARD).catch((error) => {
      throw error
    })
  }

  deleteAccount() {
    return axiosApiDelete(DELETE_USER_STUDENT).catch((error) => {
      throw error
    })
  }
}

export default new StudentService()
