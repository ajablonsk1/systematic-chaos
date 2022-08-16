import { parseJwt } from '../utils/Api'
import { axiosApiGet, axiosApiGetFile, axiosApiSendFile, axiosApiPostParams } from '../utils/axios'
import {
  GET_CSV,
  GET_TASKS_TO_EVALUATE,
  GET_FIRST_TASK_TO_EVALUATE,
  PROF_FEEDBACK,
  PROF_FEEDBACK_ADD_FILE
} from './urls'

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
    return axiosApiPostParams(PROF_FEEDBACK, { fileTaskResultId: taskId, content: remarks, points: points }).catch(
      (error) => {
        throw error
      }
    )
  }

  addAFileToTask(fileTaskId, studentEmail, file, fileName) {
    return axiosApiSendFile(PROF_FEEDBACK_ADD_FILE, { fileTaskId, studentEmail, file, fileName }).catch((error) => {
      throw error
    })
  }
}

export default new ProfessorService()
