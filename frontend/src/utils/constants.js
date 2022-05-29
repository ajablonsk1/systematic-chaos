import ExpeditionImg from './resources/activities/expedition.png';
import InformationImg from './resources/activities/information.png';
import SurveyImg from './resources/activities/survey.png';
import TaskImg from './resources/activities/task.png';
import {
    faChessBoard,
    faHouse,
    faRankingStar,
    faCertificate,
    faStar,
} from '@fortawesome/free-solid-svg-icons';

export const PageRoutes = {
    HOME: '/',
    QUESTION_SELECTION: '/doors-selection',
    QUESTION_ANSWER: '/question',
    ACTIVITY_INFO: '/activity-info',
    GAME_CARD: '/card-game',
    GAME_MAP: '/game-map',
    POINTS: '/points',
    RANKING: '/ranking',
    BADGES_ACHIEVEMENTS: '/badges-achievements',
    LOGIN_REGISTRATION: '/login-registration',
    COMBAT_TASK: '/combat-task',
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

export const getActivityImg = type => {
    switch (type) {
        case 'expedition':
            return ExpeditionImg;
        case 'information':
            return InformationImg;
        case 'survey':
            return SurveyImg;
        case 'task':
            return TaskImg;
        default:
            return;
    }
};

export const getActivityTypeName = type => {
    switch (type) {
        case 'expedition':
            return 'Ekspedycja';
        case 'information':
            return 'Wytyczne';
        case 'survey':
            return 'Sondaż';
        case 'task':
            return 'Zadanie bojowe';
        default:
            return;
    }
};

export const getActivityPath = type => {
    switch(type){
        case 'expedition':
            return PageRoutes.ACTIVITY_INFO;
        case 'task':
            return PageRoutes.COMBAT_TASK;
        default:
            return;
    }
}

export const RegistrationLabelsAndTypes = {
    fullname: ['Imię i nazwisko', 'text'],
    email: ['Email', 'email'],
    code: ['Klucz dostępu', 'text'],
    type: ['Typ osobowości postaci', 'select'],
    password: ['Hasło', 'password'],
    passwordRepeat: ['Powtórz hasło', 'password'],
};

export const HeroDescriptions = {
    warrior: `Skupiony na zdolnościach walki, całkowicie pozbawiony magicznych zdolności. 
            Łatwiej mu pokonać trudnego przeciwnika (daje raz w miesiącu możliwość podmiany 
            treści pytania trudnego na treść pytania łatwego w ekspedycji bez zmiany ilości puntków za zadanie).
            W karcie gry widzisz informację, na którym miejscu w rankingu się znajdujesz.`,
    wizard: `Przejawiający zdolności magiczne, lecz fizycznie słaby. Dzięki swoim czarom może cofnąć się w grafie
            ekspedycji do wyboru pytania (anulować ostatni wybór) i wybrać inne (umiejętność dostępna raz na miesiąc).
            W karcie gry widzisz informację, na którym miejscu w rankingu się znajdujesz.`,
    priest: `Specjalizujący się w uzdrawianiu. Dzięki swoim umiejętnościom uzdrawiania może dodać sobie 5pkt po zakończeniu
            ekspedycji. Umiejętność ta jest dostępna raz w miesiącu. W karcie gry widzisz informację jaki % graczy jest
            lepszych od Ciebie i od jakiego % graczy Ty jesteś wyżej w rankingu.`,
    rogue: `Potrafi poruszać się bezszelestnie, skradanie to jego dominująca umiejętność. Dzięki swoim zdolnościom 
            umożliwi Ci pominąć jedno pytanie w ekspedycji na poziomie łatwym warte nie więcej niż 5pkt. Umiejętność
            ta jest dostępna raz w miesiącu. W karcie gry widzisz informację jaki % graczy jest
            lepszych od Ciebie i od jakiego % graczy Ty jesteś wyżej w rankingu.`,
};
