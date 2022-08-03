import { axiosApiGet } from '../utils/axios'
import { ACTIVITY_MAP } from './urls'

class ActivityService {
  getActivityMap(mapId) {
    return axiosApiGet(ACTIVITY_MAP, { activityMapId: mapId }).catch((error) => {
      throw error
    })
  }
}

export default new ActivityService()
