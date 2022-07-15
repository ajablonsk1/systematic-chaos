import { USER_GROUP } from './urls'
import { axiosApiGet } from '../utils/axios'
import { parseJwt } from '../utils/Api'

class StudentService {
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getEmail() {
    return parseJwt(this.getUser().access_token).sub
  }

  getUserGroup() {
    return axiosApiGet(USER_GROUP, { email: this.getEmail() })
  }
}

export default new StudentService()
