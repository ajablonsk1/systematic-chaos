import { axiosApiGet } from '../utils/axios'
import { GET_CHAPTER_DETAILS, GET_CHAPTER_LIST } from './urls'

class ChapterService {
  getChaptersList() {
    return axiosApiGet(GET_CHAPTER_LIST).catch((error) => {
      throw error
    })
  }

  getChapterDetails(chapterId) {
    return axiosApiGet(GET_CHAPTER_DETAILS, { id: chapterId }).catch((error) => {
      throw error
    })
  }
}

export default new ChapterService()
