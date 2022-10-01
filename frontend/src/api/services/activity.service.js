import { axiosApiGet, axiosApiPost } from '../../utils/axios'
import {
  GET_MAP,
  GET_TASK_FILE_CREATE,
  GET_TASK_ACTIVITIES,
  GET_TASK_REQUIREMENTS,
  GET_RANKING_ACTIVITY,
  GET_TASK_RESULT_ACTIVITY_STATISTICS,
  GET_RANKING_ACTIVITY_SEARCH,
  GET_TASK_GRAPH_CREATE,
  GET_INFO_CREATE,
  POST_TASK_REQUIREMENTS,
  GET_SURVEY_CREATE,
  POST_TASK_GRAPH_CREATE,
  POST_TASK_FILE_CREATE,
  POST_SURVEY_CREATE,
  POST_INFO_CREATE
} from '../urls'

class ActivityService {
  getActivityMap(mapId) {
    return axiosApiGet(GET_MAP, { activityMapId: mapId }).catch((error) => {
      throw error
    })
  }

  getActivitiesList() {
    return axiosApiGet(GET_TASK_ACTIVITIES).catch((error) => {
      throw error
    })
  }

  getStudentsResultList(activityId) {
    return axiosApiGet(GET_RANKING_ACTIVITY, { activityID: activityId }).catch((error) => {
      throw error
    })
  }

  getFilteredStudentsResultList(activityId, query) {
    return axiosApiGet(GET_RANKING_ACTIVITY_SEARCH, {
      activityID: activityId,
      search: query
    }).catch((error) => {
      throw error
    })
  }

  getActivityStats(activityId) {
    return axiosApiGet(GET_TASK_RESULT_ACTIVITY_STATISTICS, { activityID: activityId }).catch((error) => {
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

  getFileTaskJson() {
    return axiosApiGet(GET_TASK_FILE_CREATE).catch((error) => {
      throw error
    })
  }

  setFileTaskJson(chapterId, form) {
    return axiosApiPost(POST_TASK_FILE_CREATE, {
      chapterId: chapterId,
      form: form
    }).catch((error) => {
      throw error
    })
  }

  getInfoTaskJson() {
    return axiosApiGet(GET_INFO_CREATE).catch((error) => {
      throw error
    })
  }

  setInfoTaskJson(chapterId, form) {
    return axiosApiPost(POST_INFO_CREATE, {
      chapterId: chapterId,
      form: form
    }).catch((error) => {
      throw error
    })
  }

  getSurveyTaskJson() {
    return axiosApiGet(GET_SURVEY_CREATE).catch((error) => {
      throw error
    })
  }

  setSurveyTaskJson(chapterId, form) {
    return axiosApiPost(POST_SURVEY_CREATE, {
      chapterId: chapterId,
      form: form
    }).catch((error) => {
      throw error
    })
  }

  getActivityRequirements(activityId) {
    return axiosApiGet(GET_TASK_REQUIREMENTS, {
      activityId: activityId
    }).catch((error) => {
      throw error
    })
  }

  setActivityRequirements(activityId, requirements) {
    return axiosApiPost(POST_TASK_REQUIREMENTS, {
      activityId: activityId,
      requirements: requirements
    }).catch((error) => {
      throw error
    })
  }
}

export default new ActivityService()
