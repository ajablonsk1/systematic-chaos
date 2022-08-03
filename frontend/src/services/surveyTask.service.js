import { axiosApiGet } from '../utils/axios'
import { SURVEY_TASK_GET_INFO } from './urls'

class SurveyTaskService {
  getSurveyTask(taskId) {
    return axiosApiGet(SURVEY_TASK_GET_INFO, { surveyId: taskId }).catch((error) => {
      throw error
    })
  }
}

export default new SurveyTaskService()
