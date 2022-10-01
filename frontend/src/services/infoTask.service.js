import { axiosApiGet } from '../utils/axios'
import { GET_INFO } from './urls'

class InfoTaskService {
  getInformation(infoId) {
    return axiosApiGet(GET_INFO, { infoId: infoId }).catch((error) => {
      throw error
    })
  }
}

export default new InfoTaskService()
