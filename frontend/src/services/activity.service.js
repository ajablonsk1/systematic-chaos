import { axiosApiDelete, axiosApiGet, axiosApiPost } from '../utils/axios'
import {
  DELETE_ACTIVITY,
  GET_ACTIVITY_EDIT_INFO,
  GET_MAP,
  GET_RANKING_ACTIVITY,
  GET_RANKING_ACTIVITY_SEARCH,
  GET_TASK_ACTIVITIES,
  GET_TASK_REQUIREMENTS,
  GET_TASK_RESULT_ACTIVITY_STATISTICS,
  POST_ACTIVITY_EDIT,
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

  setActivityRequirements(activityId, requirements, isBlocked) {
    return axiosApiPost(POST_TASK_REQUIREMENTS, {
      activityId: activityId,
      isBlocked: isBlocked,
      requirements: requirements
    }).catch((error) => {
      throw error
    })
  }

  getActivityInfo(activityID) {
    return axiosApiGet(GET_ACTIVITY_EDIT_INFO, { activityID }).catch((error) => {
      throw error
    })
  }

  setActivityEditData(activityID, activityType, activityBody) {
    return axiosApiPost(POST_ACTIVITY_EDIT, {
      activityID,
      activityType,
      activityBody
    }).catch((error) => {
      throw error
    })
  }

  deleteActivity(activityId) {
    return axiosApiDelete(DELETE_ACTIVITY, {
      activityID: activityId
    }).catch((error) => {
      throw error
    })
  }
}

export default new ActivityService()
