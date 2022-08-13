import { parseJwt } from '../utils/Api'
import { axiosApiGet, axiosApiGetFile, axiosApiPostParams } from '../utils/axios'
import { GET_CSV, GET_TASKS_TO_EVALUATE, GET_FIRST_TASK_TO_EVALUATE, PROF_FEEDBACK } from './urls'

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
    return axiosApiGet(GET_TASKS_TO_EVALUATE).catch((error) => {
      throw error
    })
  }

  getFirstTaskToEvaluate(taskId) {
    return axiosApiGet(GET_FIRST_TASK_TO_EVALUATE, { fileTaskId: taskId }).catch((error) => {
      throw error
    })
  }

  sendTaskEvaluation(taskId, remarks, points) {
    return axiosApiPostParams(PROF_FEEDBACK, {fileTaskResultId: taskId, content: remarks, points: points })
  }
}

export default new ProfessorService()
