import { parseJwt } from '../utils/Api'
import { axiosApiGet, axiosApiGetFile, axiosApiPost, axiosApiSendFile } from '../utils/axios'
import {
  GET_CSV,
  GET_TASKS_TO_EVALUATE,
  GET_FIRST_TASK_TO_EVALUATE,
  PROF_FEEDBACK,
  ADD_BONUS_POINTS,
  GET_STUDENT_POINTS_PROFESSOR,
  GET_GAME_SUMMARY_STATS
} from './urls'

class ProfessorService {
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getEmail() {
    return parseJwt(this.getUser().access_token).sub
  }

  getCSVGradesFile(studentsId, activitiesId) {
    return axiosApiGetFile(GET_CSV, { studentIds: studentsId, forms: activitiesId }).catch((error) => {
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
    return axiosApiSendFile(PROF_FEEDBACK, {
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

  getStudentPointsList(studentEmail) {
    return axiosApiGet(GET_STUDENT_POINTS_PROFESSOR, { studentEmail: studentEmail }).catch((error) => {
      throw error
    })
  }

  getGameSummaryStats() {
    return axiosApiGet(GET_GAME_SUMMARY_STATS).catch((error) => {
      throw error
    })
  }
}

export default new ProfessorService()
