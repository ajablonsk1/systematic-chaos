import { useQuery } from './useQuery'
import SurveyTaskService from '../services/surveyTask.service'

export const useGetSurveyQuery = (requestData) => {
  return useQuery({ requestData, query: SurveyTaskService.getSurveyTask })
}

export const useGetSurveyCreateQuery = () => {
  return useQuery({ query: SurveyTaskService.getSurveyTaskJson })
}

export const usePostSurveyCreateQuery = (requestData, options) => {
  return useQuery({ requestData, query: SurveyTaskService.setSurveyTaskJson, options })
}
