import { useQuery } from '../useQuery'
import ChapterService from '../../services/chapter.service'

export const usePostChapterCreateQuery = (requestData = {}, options = {}) => {
  return useQuery({ requestData, query: ChapterService.sendNewChapterData, options })
}
