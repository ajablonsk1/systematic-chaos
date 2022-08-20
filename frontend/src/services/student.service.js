import { GET_BONUS_POINTS, GET_POINTS_STATISTICS, USER_DATA, USER_GROUP } from './urls'
import { axiosApiGet } from '../utils/axios'
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
}

export default new StudentService()
