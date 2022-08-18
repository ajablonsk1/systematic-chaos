import { axiosApiGet } from '../utils/axios'
import { GET_RANKING } from './urls'

class RankingService {
  getRankingList() {
    return axiosApiGet(GET_RANKING).catch((error) => {
      throw error
    })
  }
}

export default new RankingService()
