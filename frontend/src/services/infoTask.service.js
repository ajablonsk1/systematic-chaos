import { axiosApiGet } from '../utils/axios'
import { INFORMATION_URL } from './urls'

class InfoTaskService {
  getInformation(infoId) {
    return axiosApiGet(INFORMATION_URL, { infoId: infoId }).catch((error) => {
      throw error
    })
  }
}

export default new InfoTaskService()
