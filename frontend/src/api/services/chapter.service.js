import { axiosApiDelete, axiosApiGet, axiosApiPost } from '../../utils/axios'
import {
  GET_CHAPTER_INFO,
  GET_CHAPTER,
  POST_CHAPTER_CREATE,
  GET_FILE_CHAPTER_IMAGES,
  GET_FILE,
  DELETE_CHAPTER
} from '../urls'

class ChapterService {
  getChaptersList() {
    return axiosApiGet(GET_CHAPTER).catch((error) => {
      throw error
    })
  }

  getChapterDetails(chapterId) {
    return axiosApiGet(GET_CHAPTER_INFO, { id: chapterId }).catch((error) => {
      throw error
    })
  }

  sendNewChapterData({ name, sizeX, sizeY, imageId, posX, posY }) {
    return axiosApiPost(POST_CHAPTER_CREATE, {
      name: name,
      sizeX: sizeX,
      sizeY: sizeY,
      imageId: imageId,
      posX: posX,
      posY: posY
    }).catch((error) => {
      throw error
    })
  }

  getChapterImagesList() {
    return axiosApiGet(GET_FILE_CHAPTER_IMAGES, {}).catch((error) => {
      throw error
    })
  }

  getChapterImage({ imageId }) {
    return axiosApiGet(GET_FILE, { id: imageId }).catch((error) => {
      throw error
    })
  }

  deleteChapter(chapterId) {
    return axiosApiDelete(DELETE_CHAPTER, { chapterID: chapterId }).catch((error) => {
      throw error
    })
  }
}

export default new ChapterService()
