import { parseJwt } from '../utils/Api'
import { axiosApiGet, axiosApiGetFile, axiosApiPost, axiosApiSendFile } from '../utils/axios'
import {
  POST_TASK_RESULT_CSV,
  GET_TASK_EVALUATE_ALL,
  GET_TASK_EVALUATE_FIRST,
  POST_FEEDBACK_PROFESSOR,
  POST_ADDITIONAL_POINTS,
  GET_POINTS_ALL_LIST_PROFESSOR,
  GET_SUMMARY,
  GET_PROFESSOR_REGISTER_TOKEN,
  GET_GRADES
} from './urls'

class ProfessorService {
  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getEmail() {
    return parseJwt(this.getUser().access_token).sub
  }

  getCSVGradesFile(studentsId, activitiesId) {
    return axiosApiGetFile(POST_TASK_RESULT_CSV, { studentIds: studentsId, forms: activitiesId }).catch((error) => {
      throw error
    })
  }

  getTasksToEvaluateList() {
    return axiosApiGet(GET_TASK_EVALUATE_ALL).catch((error) => {
      throw error
    })
  }

  getFirstTaskToEvaluate(taskId) {
    return axiosApiGet(GET_TASK_EVALUATE_FIRST, { fileTaskId: taskId }).catch((error) => {
      throw error
    })
  }

  sendTaskEvaluation(taskId, remarks, points, file, fileName) {
    return axiosApiSendFile(POST_FEEDBACK_PROFESSOR, {
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
    return axiosApiPost(POST_ADDITIONAL_POINTS, {
      studentId,
      points,
      description,
      dateInMillis
    }).catch((error) => {
      throw error
    })
  }

  getStudentPointsList(studentEmail) {
    return axiosApiGet(GET_POINTS_ALL_LIST_PROFESSOR, { studentEmail: studentEmail }).catch((error) => {
      throw error
    })
  }

  getGameSummaryStats() {
    return axiosApiGet(GET_SUMMARY).catch((error) => {
      throw error
    })
  }

  getRegistrationToken() {
    return axiosApiGet(GET_PROFESSOR_REGISTER_TOKEN).catch((error) => {
      throw error
    })
  }

  getStudentGrades() {
    return axiosApiGet(GET_GRADES).catch((error) => {
      throw error
    })
  }
}

export default new ProfessorService()
