import { useQuery } from '../useQuery'
import ChapterService from '../../services/chapter.service'

export const useGetChapterQuery = (options) => {
  return useQuery({ query: ChapterService.getChaptersList, options })
}
