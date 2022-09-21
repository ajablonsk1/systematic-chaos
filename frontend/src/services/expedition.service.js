import { axiosApiGet, axiosApiPost } from '../utils/axios'
import {
  GET_CURRENT_EXPEDITION_STATUS,
  GET_REMAINING_TIME,
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
  GRAPH_TASK_URL,
  SEND_EXPEDITION_ACTION,
  SEND_EXPEDITION_FINISHED_TIME,
  SET_START_TIME,
  START_EXPEDITION_TASK
} from './urls'

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

  setStartTime(resultId, timeMs) {
    return axiosApiPost(SET_START_TIME, {
      resultId: resultId,
      startDateMillis: timeMs
    }).catch((error) => {
      throw error
    })
  }

  getRemainingTime(resultId) {
    return axiosApiGet(GET_REMAINING_TIME, {
      resultId: resultId
    }).catch((error) => {
      throw error
    })
  }

  setSendTime(resultId, sendDateMillis) {
    return axiosApiPost(SEND_EXPEDITION_FINISHED_TIME, {
      resultId: resultId,
      sendDateMillis: sendDateMillis
    }).catch((error) => {
      throw error
    })
  }

  //reworked flow endpoints
  setExpeditionStart(activityId) {
    return axiosApiPost(START_EXPEDITION_TASK, {
      graphTaskId: activityId
    }).catch((error) => {
      throw error
    })
  }

  // check whether body works correctly
  sendAction(action) {
    return axiosApiPost(SEND_EXPEDITION_ACTION, action).catch((error) => {
      throw error
    })
  }

  getCurrentState(activityId) {
    return axiosApiGet(GET_CURRENT_EXPEDITION_STATUS, { graphTaskId: activityId }).catch((error) => {
      throw error
    })
  }
}

export default new ExpeditionService()
