import { axiosApiDelete, axiosApiDownloadFile, axiosApiGet, axiosApiPost, axiosApiSendFile } from '../utils/axios'

import {
  GET_TASK_FILE,
  DELETE_TASK_FILE_RESULT_FILE,
  GET_TASK_FILE_RESULT_FILE,
  POST_TASK_FILE_RESULT_FILE,
  POST_TASK_FILE_CREATE,
  GET_TASK_FILE_CREATE
} from './urls'

class CombatTaskService {
  getCombatTask(taskId) {
    return axiosApiGet(GET_TASK_FILE, {
      fileTaskId: taskId
    }).catch((error) => {
      throw error
    })
  }

  getCombatFile(fileApiId) {
    return axiosApiDownloadFile(GET_TASK_FILE_RESULT_FILE, {
      fileId: fileApiId
    }).catch(() => {})
  }

  removeCombatTaskFile(taskId, index) {
    return axiosApiDelete(DELETE_TASK_FILE_RESULT_FILE, {
      fileTaskId: taskId,
      index: index
    }).catch((error) => {
      throw error
    })
  }

  saveCombatTaskAnswer(taskId, openAnswer, fileName, fileBlob) {
    return axiosApiSendFile(POST_TASK_FILE_RESULT_FILE, {
      fileTaskId: taskId,
      openAnswer: openAnswer,
      fileName: fileName,
      file: fileBlob
    }).catch((error) => {
      throw error
    })
  }

  getFileTaskJson() {
    return axiosApiGet(GET_TASK_FILE_CREATE).catch((error) => {
      throw error
    })
  }

  setFileTaskJson({ chapterId, form }) {
    return axiosApiPost(POST_TASK_FILE_CREATE, {
      chapterId: chapterId,
      form: form
    }).catch((error) => {
      throw error
    })
  }
}

export default new CombatTaskService()
