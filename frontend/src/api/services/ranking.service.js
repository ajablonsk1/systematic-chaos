import { axiosApiGet } from '../../utils/axios'
import {
  GET_RANKING_SEARCH,
  GET_RANKING,
  GET_RANKING_POSITION,
  GET_RANKING_GROUP_POSITION,
  GET_RANKING_GROUP
} from '../urls'

class RankingService {
  getGlobalRankingList() {
    return axiosApiGet(GET_RANKING).catch((error) => {
      throw error
    })
  }

  getStudentGroupRankingList() {
    return axiosApiGet(GET_RANKING_GROUP).catch((error) => {
      throw error
    })
  }

  getFilteredRanking(filterQuery) {
    return axiosApiGet(GET_RANKING_SEARCH, { search: filterQuery }).catch((error) => {
      throw error
    })
  }

  getStudentPositionInGlobalRanking() {
    return axiosApiGet(GET_RANKING_POSITION).catch((error) => {
      throw error
    })
  }

  getStudentPositionInGroupRanking() {
    return axiosApiGet(GET_RANKING_GROUP_POSITION).catch((error) => {
      throw error
    })
  }
}

export default new RankingService()
