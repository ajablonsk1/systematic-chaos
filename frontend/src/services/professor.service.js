import { parseJwt } from '../utils/Api'
import { axiosApiGet, axiosApiGetFile } from '../utils/axios'
import { GET_CSV, GET_TASKS_TO_EVALUATE } from './urls'

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

  getTasksToEvaluateList() {
    return axiosApiGet(GET_TASKS_TO_EVALUATE, { professorEmail: this.getEmail() })
  }
}

export default new ProfessorService()
