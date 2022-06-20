import UserService from "./user.service";

class ProfessorService extends UserService{

    /* 
        answerId: Number,
        activityType: string,
        activityName: string,
        userName: string,
        isLate: boolean,
        activityDetails: string
        userAnswer: string
        activityPoints: Number,
        remaining: Number,
    */
    getActivityToGrade(activityId){

    }

    /* 
        [{
            type: string,
            source: string,
            name: string,
            remaining: Number,
            activityId: Number,
        }]
    */
    getAllActivitiesToGrade(){

    }

}

export default new ProfessorService();
