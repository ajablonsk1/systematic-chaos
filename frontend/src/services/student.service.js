import {
  GET_BONUS_POINTS,
  GET_POINTS_STATISTICS,
  SET_INDEX_NUMBER,
  USER_GROUP,
  GET_RECEIVED_TOTAL_POINTS,
  GET_STUDENT_DASHBOARD_STATS
} from './urls'
import { axiosApiGet, axiosApiPost } from '../utils/axios'

class StudentService {
  getUserGroup() {
    return axiosApiGet(USER_GROUP).catch((error) => {
      throw error
    })
  }

  getPointsStats() {
    return axiosApiGet(GET_POINTS_STATISTICS).catch((error) => {
      throw error
    })
  }

  getBonusPointsList() {
    return axiosApiGet(GET_BONUS_POINTS).catch((error) => {
      throw error
    })
  }

  getTotalReceivedPoints() {
    return axiosApiGet(GET_RECEIVED_TOTAL_POINTS).catch((error) => {
      throw error
    })
  }

  setIndexNumber(newIndexNumber) {
    return axiosApiPost(SET_INDEX_NUMBER, { newIndexNumber: newIndexNumber }).catch((error) => {
      throw error
    })
  }

  getDashboardStats() {
    return axiosApiGet(GET_STUDENT_DASHBOARD_STATS).catch((error) => {
      throw error
    })
  }
}

export default new StudentService()
