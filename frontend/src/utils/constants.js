import ExpeditionImg from './resources/activities/expedition.png';
import InformationImg from './resources/activities/information.png';
import SurveyImg from './resources/activities/survey.png';
import TaskImg from './resources/activities/task.png';
import { faChessBoard, faHouse, faRankingStar, faCertificate, faStar} from '@fortawesome/free-solid-svg-icons'

export const PageRoutes = {
    HOME: '/',
    QUESTION_SELECTION: '/doors-selection',
    QUESTION_ANSWER: '/question',
    EXPEDITION_INFO: '/expedition-info',
    GAME_CARD: '/card-game',
    GAME_MAP: '/game-map',
    POINTS: '/points',
    RANKING: '/ranking',
    BADGES_ACHIEVEMENTS: '/badges-achievements'
    // TODO: add new path routes in the future
};

export const UserSidebarTitles = {
    [PageRoutes.GAME_CARD]: ['Karta gry', faHouse],
    [PageRoutes.GAME_MAP]: ['Mapa gry', faChessBoard],
    [PageRoutes.POINTS]: ['Punkty', faStar],
    [PageRoutes.RANKING]: ['Ranking', faRankingStar],
    [PageRoutes.BADGES_ACHIEVEMENTS]: ['Odznaki i osiągnięcia', faCertificate],
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
