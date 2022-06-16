import {
    GRAPH_GET_TASK_ANSWER_ID,
    GRAPH_QUESTION,
    GRAPH_QUESTION_NEXT,
    GRAPH_TASK_GET_ALL_POINTS,
    GRAPH_TASK_GET_CLOSED_POINTS,
    GRAPH_TASK_GET_MAX_POSSIBLE,
    GRAPH_TASK_RESULT_URL,
    GRAPH_TASK_SEND_ANSWER,
    GRAPH_TASK_URL,
    USER_GROUP
} from './urls';
import {axiosApiGet, axiosApiPost} from "../utils/axios";
import {parseJwt} from "../utils/Api";

// todo: test extends UserService
class StudentService{
    getUser(){
        return JSON.parse(localStorage.getItem("user"));
    }

    getEmail(){
        return parseJwt(this.getUser().access_token).sub;
    }

    getActivityScore(activityId) {
        return axiosApiGet(GRAPH_TASK_RESULT_URL, {graphTaskId: activityId, studentEmail: this.getEmail()})
    }

    getTaskAnswerId(activityId) {
        return axiosApiPost(GRAPH_GET_TASK_ANSWER_ID, {graphTaskId: activityId, userEmail: this.getEmail()});
    }

    saveAnswer(answer) {
        return axiosApiPost(GRAPH_TASK_SEND_ANSWER, answer);
    }

    getActivitiesMap(chapterId) {}

    getStudentGroup() {}

    // returns all info about activity
    getActivity(activityId) {
        return axiosApiGet(GRAPH_TASK_URL, { id: activityId });
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

    getActivityMaxPoints(taskResultId) {
        return axiosApiGet(GRAPH_TASK_GET_MAX_POSSIBLE,{graphTaskResultId: taskResultId});
    }

    getActivityAllPoints(taskResultId) {
        return axiosApiGet(GRAPH_TASK_GET_ALL_POINTS, {graphTaskResultId: taskResultId});
    }

    getActivityPointsClosed(taskResultId) {
        return axiosApiGet(GRAPH_TASK_GET_CLOSED_POINTS, {graphTaskResultId: taskResultId});
    }

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

    getQuestion(questionId) {
        return axiosApiGet(GRAPH_QUESTION, {questionId: questionId});
    }
    /*
    [{
        id: Number,
        difficulty: string,
        category: string,
    }]
    */
    getChildQuestions(parentQuestionId) {
        return axiosApiGet(GRAPH_QUESTION_NEXT, {questionId: parentQuestionId});
    }

    getSurveyTask(taskId) {}

    getUserGroup() {
        return axiosApiGet(USER_GROUP, {email: this.getEmail()});
    }
}

export default new StudentService();
