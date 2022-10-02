import { axiosApiGet, axiosApiPost } from '../utils/axios'
import {
  GET_MAP,
  GET_RANKING_ACTIVITY,
  GET_RANKING_ACTIVITY_SEARCH,
  GET_TASK_ACTIVITIES,
  GET_TASK_REQUIREMENTS,
  GET_TASK_RESULT_ACTIVITY_STATISTICS,
  POST_TASK_REQUIREMENTS
} from './urls'

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
