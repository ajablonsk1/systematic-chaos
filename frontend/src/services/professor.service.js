import { parseJwt } from '../utils/Api'
import { axiosApiGet, axiosApiGetFile, axiosApiSendProfessorFeedback, axiosApiPost } from '../utils/axios'
import { GET_CSV, GET_TASKS_TO_EVALUATE, GET_FIRST_TASK_TO_EVALUATE, PROF_FEEDBACK, ADD_BONUS_POINTS } from './urls'

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

  sendTaskEvaluation(taskId, remarks, points, file, fileName) {
    return axiosApiSendProfessorFeedback(PROF_FEEDBACK, {
      fileTaskResultId: taskId,
      content: remarks,
      points: points,
      file,
      fileName
    }).catch((error) => {
      throw error
    })
  }

  sendBonusPoints(studentId, points, description, dateInMillis) {
    return axiosApiPost(ADD_BONUS_POINTS, {
      studentId,
      points,
      description,
      dateInMillis
    }).catch((error) => {
      throw error
    })
  }
}

export default new ProfessorService()
