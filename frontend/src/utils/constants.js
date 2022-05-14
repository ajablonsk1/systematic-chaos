import ExpeditionImg from './resources/activities/expedition.png';
import InformationImg from './resources/activities/information.png';
import SurveyImg from './resources/activities/survey.png';
import TaskImg from './resources/activities/task.png';

export const PageRoutes = {
    HOME: '/',
    QUESTION_SELECTION: '/doors-selection',
    QUESTION_ANSWER: '/question',
    EXPEDITION_INFO: '/expedition-info',
    // TODO: add new path routes in the future
};

export const UserSidebarTitles = {
    [PageRoutes.HOME]: 'Strona Główna',
    // TODO: add new elements to the map according to the sidebar in Figma, e.g. [PathRoutes.GAME_MAP]: "Mapa Gry"
};

export const TeacherSidebarTitles = {
    // TODO
};

export const START_GRAPH_NODE_ID = -1;
export const END_GRAPH_NODE_ID = -2;

export const getActivityImg = (type) => {
    switch(type) {
        case "expedition":
            return ExpeditionImg
        case "information":
            return InformationImg;
        case "survey":
            return SurveyImg;
        case "task":
            return TaskImg;
        default:
            return;
      }
}
