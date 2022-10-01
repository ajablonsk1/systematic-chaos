import { useQuery } from './useQuery'
import InfoTaskService from '../services/infoTask.service'

export const useGetInfoQuery = (requestData) => {
  return useQuery({ requestData, query: InfoTaskService.getInformation })
}

export const useGetInfoCreateQuery = () => {
  return useQuery({ query: InfoTaskService.getInfoTaskJson })
}

export const usePostInfoCreateQuery = (requestData, options) => {
  return useQuery({ requestData, query: InfoTaskService.setInfoTaskJson, options })
}
