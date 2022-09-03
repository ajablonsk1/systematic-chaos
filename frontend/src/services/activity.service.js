import { axiosApiGet, axiosApiPost } from '../utils/axios'
import {
  ACTIVITY_MAP,
  GET_ACTIVITIES_LIST,
  GET_ACTIVITY_RESULT_LIST,
  GET_ACTIVITY_STATS,
  GET_FILTERED_ACTIVITY_RESULT_LIST,
  GRAPH_TASK_JSON
} from './urls'

class ActivityService {
  getActivityMap(mapId) {
    return axiosApiGet(ACTIVITY_MAP, { activityMapId: mapId }).catch((error) => {
      throw error
    })
  }

  getActivitiesList() {
    return axiosApiGet(GET_ACTIVITIES_LIST).catch((error) => {
      throw error
    })
  }

  getStudentsResultList(activityId) {
    return axiosApiGet(GET_ACTIVITY_RESULT_LIST, { activityID: activityId }).catch((error) => {
      throw error
    })
  }

  getFilteredStudentsResultList(activityId, query) {
    return axiosApiGet(GET_FILTERED_ACTIVITY_RESULT_LIST, {
      activityID: activityId,
      search: query
    }).catch((error) => {
      throw error
    })
  }

  getActivityStats(activityId) {
    return axiosApiGet(GET_ACTIVITY_STATS, { activityID: activityId }).catch((error) => {
      throw error
    })
  }

  getGraphTaskJson() {
    return axiosApiGet(GRAPH_TASK_JSON).catch((error) => {
      throw error
    })
  }

  setGraphTaskJson(chapterId, form) {
    return axiosApiPost(GRAPH_TASK_JSON, {
      chapterId: chapterId,
      form: form
    }).catch((error) => {
      throw error
    })
  }
}

export default new ActivityService()
