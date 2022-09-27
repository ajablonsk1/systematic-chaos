import {
  fa5,
  faArrowsToEye,
  faBullseye,
  faCertificate,
  faChessBoard,
  faHouse,
  faListCheck,
  faRankingStar,
  faStar,
  faUsers,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import priestImg from '../storage/resources/pope.png'
import rogueImg from '../storage/resources/rogue.png'
import warriorImg from '../storage/resources/warrior.png'
import wizardImg from '../storage/resources/wizard.png'
import ExpeditionImg from './resources/activities/graphTaskIcon.png'
import InformationImg from './resources/activities/infoTaskIcon.png'
import SurveyImg from './resources/activities/surveyTaskIcon.png'
import TaskImg from './resources/activities/fileTaskIcon.png'

import warrior1 from '../storage/resources/warrior/0.png'
import warrior2 from '../storage/resources/warrior/1.png'
import warrior11 from '../storage/resources/warrior/10.png'
import warrior12 from '../storage/resources/warrior/11.png'
import warrior3 from '../storage/resources/warrior/2.png'
import warrior4 from '../storage/resources/warrior/3.png'
import warrior5 from '../storage/resources/warrior/4.png'
import warrior6 from '../storage/resources/warrior/5.png'
import warrior7 from '../storage/resources/warrior/6.png'
import warrior8 from '../storage/resources/warrior/7.png'
import warrior10 from '../storage/resources/warrior/9.png'
import warrior13 from '../storage/resources/warrior/12.png'
import warrior14 from '../storage/resources/warrior/13.png'
import warrior15 from '../storage/resources/warrior/14.png'
import warrior16 from '../storage/resources/warrior/15.png'
import warrior17 from '../storage/resources/warrior/16.png'
import { HeroType, PlayerType } from './userRole'
import moment from 'moment'
import { GeneralRoutes, StudentRoutes, TeacherRoutes } from '../routes/PageRoutes'

export const UserSidebarTitles = {
  [StudentRoutes.GAME_CARD]: ['Karta gry', faHouse],
  [StudentRoutes.GAME_MAP.MAIN]: ['Mapa gry', faChessBoard],
  [StudentRoutes.POINTS]: ['Punkty', faStar],
  [StudentRoutes.RANKING]: ['Ranking', faRankingStar],
  [StudentRoutes.BADGES]: ['Rangi i odznaki', faCertificate],
  [GeneralRoutes.CANVAS]: ['Świat gry', faChessBoard],
  [StudentRoutes.PROFILE]: ['Profil', faUser]
}

export const TeacherSidebarTitles = {
  [TeacherRoutes.GAME_SUMMARY]: ['Podsumowanie gry', faBullseye],
  [TeacherRoutes.RANKING]: ['Ranking', faRankingStar],
  [TeacherRoutes.GAME_MANAGEMENT.MAIN]: ['Zarządzanie grą', faListCheck],
  [TeacherRoutes.PARTICIPANTS]: ['Uczestnicy', faUsers],
  [TeacherRoutes.ACTIVITY_ASSESSMENT.LIST]: ['Sprawdzanie aktywności', faArrowsToEye],
  [TeacherRoutes.GRADES]: ['Oceny', fa5]
}

export const FIELD_REQUIRED = 'Pole wymagane.'
export const NONNEGATIVE_NUMBER = 'Wymagana liczba nieujemna'
export const NOT_LOGGED_IN_ERROR = 'Logowanie nieudane. Niepoprawny login lub hasło.'
export const ERROR_OCCURRED = 'Wystąpił nieoczekiwany błąd'
export const SANE_MAP_FIELDCOUNT_LIMIT = 10
export const NUMBER_FROM_RANGE = (rangeMin, rangeMax) => `Wymagana liczba z przedziału [${rangeMin}, ${rangeMax}]`

export const Activity = {
  EXPEDITION: 'EXPEDITION',
  INFO: 'INFO',
  SURVEY: 'SURVEY',
  TASK: 'TASK',
  ADDITIONAL: 'ADDITIONAL'
}

export const QuestionType = {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  OPEN_QUESTION: 'OPENED'
}

export const getActivityImg = (type) => {
  switch (type) {
    case Activity.EXPEDITION:
      return ExpeditionImg
    case Activity.INFO:
      return InformationImg
    case Activity.SURVEY:
      return SurveyImg
    case Activity.TASK:
      return TaskImg
    default:
      return
  }
}

export const getActivityTypeName = (type) => {
  switch (type) {
    case Activity.EXPEDITION:
      return 'Ekspedycja'
    case Activity.INFO:
      return 'Wytyczne'
    case Activity.SURVEY:
      return 'Sondaż'
    case Activity.TASK:
      return 'Zadanie bojowe'
    case Activity.ADDITIONAL:
      return 'Bonus'
    default:
      return
  }
}

export const getActivityPath = (type) => {
  switch (type) {
    case Activity.EXPEDITION:
      return StudentRoutes.GAME_MAP.GRAPH_TASK.INFO
    case Activity.TASK:
      return StudentRoutes.GAME_MAP.COMBAT_TASK
    case Activity.SURVEY:
      return StudentRoutes.GAME_MAP.SURVEY_TASK
    case Activity.INFO:
      return StudentRoutes.GAME_MAP.INFO_TASK
    default:
      return
  }
}

export const RegistrationLabelsAndTypes = {
  firstName: ['Imię', 'text'],
  lastName: ['Nazwisko', 'text'],
  index: ['Nr. indeksu', 'text'],
  email: ['Email', 'email'],
  invitationCode: ['Klucz dostępu', 'text'],
  heroType: ['Typ osobowości postaci', 'select'],
  password: ['Hasło', 'password'],
  passwordRepeat: ['Powtórz hasło', 'password']
}

export const HeroDescriptions = {
  [HeroType.WARRIOR]: `Skupiony na zdolnościach walki, całkowicie pozbawiony magicznych zdolności. 
            Łatwiej mu pokonać trudnego przeciwnika (daje raz w miesiącu możliwość podmiany 
            treści pytania trudnego na treść pytania łatwego w ekspedycji bez zmiany ilości puntków za zadanie).
            W karcie gry widzisz informację, na którym miejscu w rankingu się znajdujesz.`,
  [HeroType.WIZARD]: `Przejawiający zdolności magiczne, lecz fizycznie słaby. Dzięki swoim czarom może cofnąć się w grafie
            ekspedycji do wyboru pytania (anulować ostatni wybór) i wybrać inne (umiejętność dostępna raz na miesiąc).
            W karcie gry widzisz informację, na którym miejscu w rankingu się znajdujesz.`,
  [HeroType.PRIEST]: `Specjalizujący się w uzdrawianiu. Dzięki swoim umiejętnościom uzdrawiania może dodać sobie 5pkt po zakończeniu
            ekspedycji. Umiejętność ta jest dostępna raz w miesiącu. W karcie gry widzisz informację jaki % graczy jest
            lepszych od Ciebie i od jakiego % graczy Ty jesteś wyżej w rankingu.`,
  [HeroType.ROGUE]: `Potrafi poruszać się bezszelestnie, skradanie to jego dominująca umiejętność. Dzięki swoim zdolnościom 
            umożliwi Ci pominąć jedno pytanie w ekspedycji na poziomie łatwym warte nie więcej niż 5pkt. Umiejętność
            ta jest dostępna raz w miesiącu. W karcie gry widzisz informację jaki % graczy jest
            lepszych od Ciebie i od jakiego % graczy Ty jesteś wyżej w rankingu.`
}

export const HeroImg = {
  WARRIOR: warriorImg,
  WIZARD: wizardImg,
  PRIEST: priestImg,
  ROGUE: rogueImg
}

export const HeroDataset = {
  warrior: [
    warrior1,
    warrior2,
    warrior3,
    warrior4,
    warrior5,
    warrior6,
    warrior7,
    warrior8,
    warrior10,
    warrior11,
    warrior12,
    warrior13,
    warrior14,
    warrior15,
    warrior16,
    warrior17
  ],
  wizard: wizardImg,
  priest: priestImg,
  rogue: rogueImg
}

export const percentagesToGrade = (percentages) => {
  const FAILING_GRADE = 2.0
  const MIN_POSITIVE_GRADE = 3.0
  const MIN_PERCENTAGE_FOR_POSITIVE_GRADE = 0.5
  const PERCENTAGE_FOR_HIGHER_GRADE = 0.1
  const HIGHER_GRADE_STEP = 0.5

  if (percentages < MIN_PERCENTAGE_FOR_POSITIVE_GRADE) return FAILING_GRADE
  else {
    return (
      MIN_POSITIVE_GRADE +
      Math.floor((percentages - MIN_PERCENTAGE_FOR_POSITIVE_GRADE) / PERCENTAGE_FOR_HIGHER_GRADE) * HIGHER_GRADE_STEP
    )
  }
}

export const getHeroName = (heroName) => {
  switch (heroName) {
    case HeroType.PRIEST:
      return 'Kapłan'
    case HeroType.ROGUE:
      return 'Łotrzyk'
    case HeroType.WARRIOR:
      return 'Wojownik'
    case HeroType.WIZARD:
      return 'Czarodziej'
    default:
      return
  }
}

export const RequirementType = {
  NUMBER: 'number',
  TEXT: 'text',
  BOOLEAN: 'boolean',
  DATE: 'date',
  MULTI_SELECT: 'multi_select',
  SELECT: 'select'
}

export const requirementValueConverter = (requirement) => {
  switch (requirement.type) {
    case RequirementType.DATE:
      return moment(requirement.value).format('DD.MM.YYYY, HH:mm')
    case RequirementType.SELECT:
      return requirement.value[0] // TODO later endpoint will get one value
    case RequirementType.MULTI_SELECT:
      return requirement.value.join(', ')
    case RequirementType.BOOLEAN:
      return requirement.value ? 'TAK' : 'NIE'
    case RequirementType.TEXT:
    case RequirementType.NUMBER:
      return requirement.value
    default:
      return ''
  }
}

export const EXPEDITION_STATUS = {
  ANSWER: 'ANSWER',
  CHOOSE: 'CHOOSE'
}

export const convertHeroTypeToPlayerType = (heroType) => {
  if (heroType === HeroType.ROGUE || heroType === HeroType.WARRIOR) {
    return PlayerType.CHALLENGING
  }
  return PlayerType.CALM
}

export const getGameCardInfo = (playerType, data) => {
  if (playerType === PlayerType.CALM) {
    return (
      <span>
        Zajmujesz <strong>{data.rankPosition}</strong> miejsce na <strong>{data.rankLength}</strong>!
      </span>
    )
  }
  return (
    <span>
      Jesteś w grupie <strong>{data.userPoints}</strong>% najlepszych graczy.
    </span>
  )
}
