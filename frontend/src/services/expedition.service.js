import { axiosApiGet, axiosApiPost } from '../utils/axios'
import {
  GET_QUESTION_INFO,
  GET_TASK_GRAPH_MAP,
  GET_TASK_GRAPH_RESULT_TIME_REMAINING,
  GET_TASK_GRAPH_RESULT,
  GET_TASK_GRAPH,
  POST_QUESTION_ACTION,
  POST_TASK_GRAPH_RESULT_START,
  GET_TASK_GRAPH_RESULT_POINTS_ALL,
  GET_TASK_GRAPH_RESULT_POINTS_CLOSED,
  GET_TASK_GRAPH_RESULT_POINTS_AVAILABLE_CLOSED,
  GET_TASK_GRAPH_RESULT_POINTS_AVAILABLE_OPENED,
  GET_TASK_GRAPH_CREATE,
  POST_TASK_GRAPH_CREATE
} from './urls'

class ExpeditionService {
  // returns all info about activity
  getExpedition(activityId) {
    return axiosApiGet(GET_TASK_GRAPH, { id: activityId }).catch((error) => {
      throw error
    })
  }

  getExpeditionScore(activityId) {
    return axiosApiGet(GET_TASK_GRAPH_RESULT, {
      graphTaskId: activityId
    }).catch((error) => {
      throw error
    })
  }

  getExpeditionAllPoints(taskResultId) {
    return axiosApiGet(GET_TASK_GRAPH_RESULT_POINTS_ALL, {
      graphTaskResultId: taskResultId
    }).catch((error) => {
      throw error
    })
  }

  getExpeditionPointsClosed(taskResultId) {
    return axiosApiGet(GET_TASK_GRAPH_RESULT_POINTS_CLOSED, {
      graphTaskResultId: taskResultId
    }).catch((error) => {
      throw error
    })
  }

  getExpeditionPointsMaxClosed(taskResultId) {
    return axiosApiGet(GET_TASK_GRAPH_RESULT_POINTS_AVAILABLE_CLOSED, {
      graphTaskResultId: taskResultId
    }).catch((error) => {
      throw error
    })
  }

  getExpeditionPointsMaxOpen(taskResultId) {
    return axiosApiGet(GET_TASK_GRAPH_RESULT_POINTS_AVAILABLE_OPENED, {
      graphTaskResultId: taskResultId
    }).catch((error) => {
      throw error
    })
  }

  getRemainingTime(resultId) {
    return axiosApiGet(GET_TASK_GRAPH_RESULT_TIME_REMAINING, {
      resultId: resultId
    }).catch((error) => {
      throw error
    })
  }

  //reworked flow endpoints
  setExpeditionStart(activityId) {
    return axiosApiPost(POST_TASK_GRAPH_RESULT_START, {
      graphTaskId: activityId
    }).catch((error) => {
      throw error
    })
  }

  // check whether body works correctly
  sendAction(action) {
    return axiosApiPost(POST_QUESTION_ACTION, action).catch((error) => {
      throw error
    })
  }

  getCurrentState(activityId) {
    return axiosApiGet(GET_QUESTION_INFO, { graphTaskId: activityId }).catch((error) => {
      throw error
    })
  }

  getQuestionsList(activityId) {
    return axiosApiGet(GET_TASK_GRAPH_MAP, { graphTaskID: activityId }).catch((error) => {
      throw error
    })
  }

  getGraphTaskJson() {
    return axiosApiGet(GET_TASK_GRAPH_CREATE).catch((error) => {
      throw error
    })
  }

  setGraphTaskJson(chapterId, form) {
    return axiosApiPost(POST_TASK_GRAPH_CREATE, {
      chapterId: chapterId,
      form: form
    }).catch((error) => {
      throw error
    })
  }
}

export default new ExpeditionService()
