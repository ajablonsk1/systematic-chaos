import { axiosApiGet } from '../utils/axios'
import { ACTIVITY_MAP, GET_ACTIVITIES_LIST } from './urls'

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
}

export default new ActivityService()
