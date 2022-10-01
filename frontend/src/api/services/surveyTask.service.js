import { axiosApiGet } from '../../utils/axios'
import { GET_SURVEY } from '../urls'

class SurveyTaskService {
  getSurveyTask(taskId) {
    return axiosApiGet(GET_SURVEY, { surveyId: taskId }).catch((error) => {
      throw error
    })
  }
}

export default new SurveyTaskService()
