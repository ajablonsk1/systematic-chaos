import { axiosApiGet } from '../utils/axios'
import { ACTIVITY_MAP, GET_ACTIVITIES_LIST, GET_ACTIVITY_RESULT_LIST, GET_FILTERED_ACTIVITY_RESULT_LIST } from './urls'

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
}

export default new ActivityService()
