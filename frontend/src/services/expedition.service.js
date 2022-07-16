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
    return axiosApiGet(GRAPH_TASK_URL, { id: activityId })
  }

  getExpeditionScore(activityId) {
    return axiosApiGet(GRAPH_TASK_RESULT_URL, {
      graphTaskId: activityId,
      studentEmail: StudentService.getEmail()
    })
  }

  saveAnswer(answer) {
    return axiosApiPost(GRAPH_TASK_SEND_ANSWER, answer)
  }

  getTaskAnswerId(activityId) {
    return axiosApiPost(GRAPH_GET_TASK_ANSWER_ID, {
      graphTaskId: activityId,
      userEmail: StudentService.getEmail()
    })
  }

  getActivityMaxPoints(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_MAX_AVAILABLE_ALL, {
      graphTaskResultId: taskResultId
    })
  }

  getExpeditionAllPoints(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_ALL_POINTS, {
      graphTaskResultId: taskResultId
    })
  }

  getExpeditionPointsClosed(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_CLOSED_POINTS, {
      graphTaskResultId: taskResultId
    })
  }

  getQuestion(questionId) {
    return axiosApiGet(GRAPH_QUESTION, {
      questionId: questionId
    })
  }

  getChildQuestions(parentQuestionId) {
    return axiosApiGet(GRAPH_QUESTION_NEXT, {
      questionId: parentQuestionId
    })
  }

  getExpeditionPointsMaxClosed(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_MAX_AVAILABLE_CLOSED, {
      graphTaskResultId: taskResultId
    })
  }

  getExpeditionPointsMaxOpen(taskResultId) {
    return axiosApiGet(GRAPH_TASK_GET_MAX_AVAILABLE_OPEN, {
      graphTaskResultId: taskResultId
    })
  }
}

export default new ExpeditionService()
