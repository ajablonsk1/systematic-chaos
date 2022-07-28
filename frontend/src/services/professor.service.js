import { parseJwt } from '../utils/Api'
import { axiosApiPostFile } from '../utils/axios'
import { GET_CSV } from './urls'

class ProfessorService {
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getEmail() {
    return parseJwt(this.getUser().access_token).sub
  }

  getCSVGradesFile(studentsId) {
    return axiosApiPostFile(GET_CSV, studentsId).catch((err) => {
      throw err
    })
  }
}

export default new ProfessorService()
