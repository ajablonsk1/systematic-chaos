import { axiosApiGet, axiosApiPost } from '../utils/axios'
import {
  GET_CHAPTER_DETAILS,
  GET_CHAPTER_LIST,
  ADD_NEW_CHAPTER,
  GET_CHAPTER_IMAGES_LIST,
  GET_CHAPTER_IMAGE
} from './urls'

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

  sendNewChapterData({ name, sizeX, sizeY, imageId }) {
    return axiosApiPost(ADD_NEW_CHAPTER, { name: name, sizeX: sizeX, sizeY: sizeY, imageId: imageId }).catch(
      (error) => {
        throw error
      }
    )
  }

  getChapterImagesList() {
    return axiosApiGet(GET_CHAPTER_IMAGES_LIST, {}).catch((error) => {
      throw error
    })
  }

  getChapterImage({ imageId }) {
    return axiosApiGet(GET_CHAPTER_IMAGE, { id: imageId }).catch((error) => {
      throw error
    })
  }
}

export default new ChapterService()
