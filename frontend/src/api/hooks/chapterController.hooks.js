import { useQuery } from './useQuery'
import ChapterService from '../services/chapter.service'

export const useDeleteChapterQuery = (requestData, options) => {
  return useQuery({ requestData, query: ChapterService.deleteChapter, options })
}

export const useGetChapterDetailsQuery = (requestData, options) => {
  return useQuery({ requestData, query: ChapterService.getChapterDetails, options })
}

export const useGetChapterQuery = (options) => {
  return useQuery({ query: ChapterService.getChaptersList, options })
}

export const usePostChapterCreateQuery = (requestData = {}, options = {}) => {
  return useQuery({ requestData, query: ChapterService.sendNewChapterData, options })
}
