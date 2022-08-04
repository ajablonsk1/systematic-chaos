import { axiosApiGet, axiosApiPost } from '../utils/axios'
import {
  GRAPH_GET_TASK_ANSWER_ID,
  GRAPH_QUESTION,
  GRAPH_QUESTION_NEXT,
  GRAPH_TASK_GET_ALL_POINTS,
  GRAPH_TASK_GET_CLOSED_POINTS,
  GRAPH_TASK_GET_MAX_AVAILABLE_ALL,
  GRAPH_TASK_GET_MAX_AVAILABLE_CLOSED,
  GRAPH_TASK_GET_MAX_AVAILABLE_OPEN,
  GRAPH_TASK_RESULT_URL,
  GRAPH_TASK_SEND_ANSWER,
  GRAPH_TASK_URL
} from './urls'
import StudentService from './student.service'

class ExpeditionService {
  // returns all info about activity
  getExpedition(activityId) {
    return axiosApiGet(GRAPH_TASK_URL, { id: activityId }).catch((error) => {
      throw error
    })
  }

  getExpeditionScore(activityId) {
    return axiosApiGet(GRAPH_TASK_RESULT_URL, {
      graphTaskId: activityId
    }).catch((error) => {
      throw error
    })
  }

  saveAnswer(answer) {
    return axiosApiPost(GRAPH_TASK_SEND_ANSWER, answer).catch((error) => {
      throw error
    })
  }

  getTaskAnswerId(activityId) {
    return axiosApiPost(GRAPH_GET_TASK_ANSWER_ID, {
      graphTaskId: activityId
    }).catch(() => {})
  }

  getActivityMaxPoints(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_MAX_AVAILABLE_ALL, {
      graphTaskResultId: taskResultId
    }).catch((error) => {
      throw error
    })
  }

  getExpeditionAllPoints(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_ALL_POINTS, {
      graphTaskResultId: taskResultId
    }).catch((error) => {
      throw error
    })
  }

  getExpeditionPointsClosed(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_CLOSED_POINTS, {
      graphTaskResultId: taskResultId
    }).catch((error) => {
      throw error
    })
  }

  getQuestion(questionId) {
    return axiosApiGet(GRAPH_QUESTION, {
      questionId: questionId
    }).catch((error) => {
      throw error
    })
  }

  getChildQuestions(parentQuestionId) {
    return axiosApiGet(GRAPH_QUESTION_NEXT, {
      questionId: parentQuestionId
    }).catch((error) => {
      throw error
    })
  }

  getExpeditionPointsMaxClosed(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_MAX_AVAILABLE_CLOSED, {
      graphTaskResultId: taskResultId
    }).catch((error) => {
      throw error
    })
  }

  getExpeditionPointsMaxOpen(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_MAX_AVAILABLE_OPEN, {
      graphTaskResultId: taskResultId
    }).catch((error) => {
      throw error
    })
  }
}

export default new ExpeditionService()
