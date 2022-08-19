import { axiosApiGet } from '../utils/axios'
import { GET_RANKING, GET_STUDENT_GROUP_RANKING } from './urls'

class RankingService {
  getGlobalRankingList() {
    return axiosApiGet(GET_RANKING).catch((error) => {
      throw error
    })
  }

  getStudentGroupRankingList() {
    // TODO: remove it when backend will be ready
    return axiosApiGet(GET_STUDENT_GROUP_RANKING, { groupName: 'pn-1440-B' }).catch((error) => {
      throw error
    })
  }
}

export default new RankingService()
