import { axiosApiGet } from '../utils/axios'
import { parseJwt } from '../utils/Api'
import { GET_USER_CURRENT } from './urls'

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
