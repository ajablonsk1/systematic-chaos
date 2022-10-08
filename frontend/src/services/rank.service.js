import { axiosApiDelete, axiosApiGet, axiosApiPost, axiosApiPutFile } from '../utils/axios'
import { DELETE_RANK, GET_RANK_ALL, GET_RANK_CURRENT, POST_RANK, PUT_RANK } from './urls'

class RankService {
  editRank(rankId, rankName, minPoints, image, rankType) {
    return axiosApiPutFile(PUT_RANK, {
      name: rankName,
      minPoints,
      image,
      type: rankType,
      rankId
    }).catch((error) => {
      throw error
    })
  }

  addNewRank(rankName, minPoints, image, rankType) {
    return axiosApiPost(POST_RANK, {
      name: rankName,
      minPoints,
      image,
      type: rankType
    }).catch((error) => {
      throw error
    })
  }

  getCurrentStudentRank() {
    return axiosApiGet(GET_RANK_CURRENT).catch((error) => {
      throw error
    })
  }

  getAllRanks() {
    return axiosApiGet(GET_RANK_ALL).catch((error) => {
      throw error
    })
  }

  deleteRank(rankId) {
    return axiosApiDelete(DELETE_RANK, { rankId }).catch((error) => {
      throw error
    })
  }
}

export default new RankService()
