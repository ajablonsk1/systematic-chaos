import { parseJwt } from '../utils/Api'
import { axiosApiGetFile } from '../utils/axios'
import { GET_CSV } from './urls'

class ProfessorService {
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getEmail() {
    return parseJwt(this.getUser().access_token).sub
  }

  getCSVGradesFile(studentsId) {
    return axiosApiGetFile(GET_CSV, studentsId).catch((error) => {
      throw error
    })
  }
}

export default new ProfessorService()
