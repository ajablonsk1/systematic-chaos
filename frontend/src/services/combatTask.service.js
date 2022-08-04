import { axiosApiDelete, axiosApiDownloadFile, axiosApiGet, axiosApiSendFile } from '../utils/axios'
import { COMBAT_TASK_GET_INFO, COMBAT_TASK_REMOVE_FILE, COMBAT_TASK_RESULT_FILE, COMBAT_TASK_SEND_ANSWER } from './urls'
import StudentService from './student.service'

class CombatTaskService {
  getCombatTask(taskId) {
    return axiosApiGet(COMBAT_TASK_GET_INFO, {
      fileTaskId: taskId
    }).catch((error) => {
      throw error
    })
  }

  getCombatFile(fileApiId) {
    return axiosApiDownloadFile(COMBAT_TASK_RESULT_FILE, {
      fileId: fileApiId
    }).catch(() => {})
  }

  removeCombatTaskFile(taskId, index) {
    return axiosApiDelete(COMBAT_TASK_REMOVE_FILE, {
      fileTaskId: taskId,
      index: index
    }).catch((error) => {
      throw error
    })
  }

  saveCombatTaskAnswer(taskId, openAnswer, fileName, fileBlob) {
    return axiosApiSendFile(COMBAT_TASK_SEND_ANSWER, {
      fileTaskId: taskId,
      openAnswer: openAnswer,
      fileName: fileName,
      file: fileBlob
    }).catch((error) => {
      throw error
    })
  }
}

export default new CombatTaskService()
