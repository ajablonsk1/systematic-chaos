import { axiosApiGet, axiosApiPost } from '../../utils/axios'
import { GET_SURVEY, GET_SURVEY_CREATE, POST_SURVEY_CREATE } from '../urls'

class SurveyTaskService {
  getSurveyTask(taskId) {
    return axiosApiGet(GET_SURVEY, { surveyId: taskId }).catch((error) => {
      throw error
    })
  }

  getSurveyTaskJson() {
    return axiosApiGet(GET_SURVEY_CREATE).catch((error) => {
      throw error
    })
  }

  setSurveyTaskJson({ chapterId, form }) {
    return axiosApiPost(POST_SURVEY_CREATE, {
      chapterId: chapterId,
      form: form
    }).catch((error) => {
      throw error
    })
  }
}

export default new SurveyTaskService()
