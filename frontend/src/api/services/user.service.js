import { axiosApiGet } from '../../utils/axios'
import { GET_USER_CURRENT } from '../urls'
import { parseJwt } from '../../utils/Api'

class UserService {
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getEmail() {
    return parseJwt(this.getUser().access_token).sub
  }

  getUserData() {
    return axiosApiGet(GET_USER_CURRENT).catch((error) => {
      throw error
    })
  }
}

export default new UserService()
