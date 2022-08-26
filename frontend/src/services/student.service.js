import {
  GET_BONUS_POINTS,
  GET_POINTS_STATISTICS,
  SET_INDEX_NUMBER,
  USER_DATA,
  USER_GROUP,
  GET_RECEIVED_TOTAL_POINTS
} from './urls'
import { axiosApiGet, axiosApiPost } from '../utils/axios'
import { parseJwt } from '../utils/Api'

class StudentService {
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getEmail() {
    return parseJwt(this.getUser().access_token).sub
  }

  getUserData() {
    return axiosApiGet(USER_DATA).catch((error) => {
      throw error
    })
  }

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
}

export default new StudentService()
