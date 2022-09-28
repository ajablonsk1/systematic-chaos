import { axiosApiGet, axiosApiPost } from '../utils/axios'
import {
  GET_CURRENT_EXPEDITION_STATUS,
  GET_GRAPH_QUESTIONS,
  GET_REMAINING_TIME,
  GRAPH_TASK_GET_ALL_POINTS,
  GRAPH_TASK_GET_CLOSED_POINTS,
  GRAPH_TASK_GET_MAX_AVAILABLE_CLOSED,
  GRAPH_TASK_GET_MAX_AVAILABLE_OPEN,
  GRAPH_TASK_RESULT_URL,
  GRAPH_TASK_URL,
  SEND_EXPEDITION_ACTION,
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

  getRemainingTime(resultId) {
    return axiosApiGet(GET_REMAINING_TIME, {
      resultId: resultId
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

  getQuestionsList(activityId) {
    return axiosApiGet(GET_GRAPH_QUESTIONS, { graphTaskID: activityId }).catch((error) => {
      throw error
    })
  }
}

export default new ExpeditionService()
