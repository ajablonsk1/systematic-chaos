import { axiosApi} from '../utils/axios';
import { METHOD } from './method';
import { GRAPH_TASK_URL } from './urls';

class StudentService {
    getActivityScore(activityId) {
        // return axiosApi(METHOD.GET, GRAPH_TASK_POINTS + '/all', {})
    }

    saveAnswer(activityId, questionId, answer) {}

    getActivitiesMap(chapterId) {}

    getStudentGroup() {}

    // returns all info about activity
    getActivity(activityId) {
        return axiosApi(METHOD.GET, GRAPH_TASK_URL, { id: activityId });
    }

    /*
        id: Number,
        name: string,
        description: string
        files: string[] (base64),
        type: string,
        professorFeedback: string,
        scoredPoints: Number
    */
    getCombatTask(taskId) {}

    saveCombatTaskFile(taskId, base64FileString) {}

    removeCombatTaskFile(taskId, fileId) {}

    setTaskComplete(taskId) {}

    getActivityPoints(activityId) {}

    getPointsFromClosedQuestions(expeditionId) {}

    getUserBadges() {}

    getRecentCompletedActivities() {}

    /*
        chapterId: Number,
        isUnlocked: Boolean
    */
    getChaptersUnlockStatus() {}

    /*
    [{
        name: "supergrupa2",
        code: "supergrupa2"
    }]
    */
    getAllGroupsList() {}

    /*
        id: Number,
        name: string,
        images: base64String[],
        content: string
        type: string,
    */
    getInformationActivity(informationId) {}

    /*
        isAlreadySent: Boolean
    */
    getIsAnswerSent(questionId) {}

    /*
        id: Number,
        category: string,
        points: Number,
        content: string,
        answers: string[],
        type: string,
        multipleChoice: Boolean,
    */
    getQuestion(questionId) {}

    /*
    [{
        id: Number,
        difficulty: string,
        category: string,
    }]
    */
    getChildQuestions(parentQuestionId) {}

    getSurveyTask(taskId) {}
}

export default new StudentService();
