import { axiosApiGet } from '../utils/axios'
import { USER_DATA } from './urls'
import { parseJwt } from '../utils/Api'

class UserService {
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
}

export default new UserService()
