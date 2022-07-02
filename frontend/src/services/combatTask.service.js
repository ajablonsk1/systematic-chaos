import {axiosApiDelete, axiosApiGet, axiosApiPost} from "../utils/axios";
import {COMBAT_TASK_GET_FILE, COMBAT_TASK_GET_INFO, COMBAT_TASK_REMOVE_FILE, COMBAT_TASK_SEND_ANSWER} from "./urls";
import StudentService from "./student.service";

class CombatTaskService {
    getCombatTask(taskId) {
        return axiosApiGet(COMBAT_TASK_GET_INFO, {
            fileTaskId: taskId,
            studentEmail: StudentService.getEmail()
        });
    }

    getCombatFile(fileApiId) {
        return axiosApiGet(COMBAT_TASK_GET_FILE, {
            fileId: fileApiId,
            studentEmail: StudentService.getEmail()
        })
    }

    removeCombatTaskFile(taskId, index) {
        return axiosApiDelete(COMBAT_TASK_REMOVE_FILE, {
            fileTaskId: taskId,
            studentEmail: StudentService.getEmail(),
            index: index
        });
    }

    saveCombatTaskAnswer(taskId, openAnswer, fileName, fileString){
        return axiosApiPost(COMBAT_TASK_SEND_ANSWER, {
            fileTaskId: taskId,
            openAnswer: openAnswer,
            fileName: fileName,
            fileString: fileString,
            studentEmail: StudentService.getEmail()
        });
    }
}

export default new CombatTaskService();