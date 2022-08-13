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
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import priestImg from '../storage/resources/pope.png'
import rogueImg from '../storage/resources/rogue.png'
import warriorImg from '../storage/resources/warrior.png'
import wizardImg from '../storage/resources/wizard.png'
import ExpeditionImg from './resources/activities/expedition.png'
import InformationImg from './resources/activities/information.png'
import SurveyImg from './resources/activities/survey.png'
import TaskImg from './resources/activities/task.png'

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
import { generateFullPath, PageRoutes } from '../routes/PageRoutes'
import { HeroType } from './userRole'

export const UserSidebarTitles = {
  [generateFullPath(() => PageRoutes.Student.GameCard.GAME_CARD)]: ['Karta gry', faHouse],
  [generateFullPath(() => PageRoutes.Student.GameMap.GAME_MAP)]: ['Mapa gry', faChessBoard],
  [generateFullPath(() => PageRoutes.Student.Points.POINTS)]: ['Punkty', faStar],
  [generateFullPath(() => PageRoutes.Student.Ranking.RANKING)]: ['Ranking', faRankingStar],
  [generateFullPath(() => PageRoutes.Student.BadgesAndAchievements.BADGES_ACHIEVEMENTS)]: [
    'Odznaki i osiągnięcia',
    faCertificate
  ],
  [generateFullPath(() => PageRoutes.General.CANVAS)]: ['Świat gry', faChessBoard]
}

export const TeacherSidebarTitles = {
  [generateFullPath(() => PageRoutes.Teacher.GameSummary.GAME_SUMMARY)]: ['Podsumowanie gry', faBullseye],
  [generateFullPath(() => PageRoutes.Teacher.Ranking.RANKING)]: ['Ranking', faRankingStar],
  [generateFullPath(() => PageRoutes.Teacher.GameManagement.GAME_MANAGEMENT)]: ['Zarządzanie grą', faListCheck],
  [generateFullPath(() => PageRoutes.Teacher.Participants.PARTICIPANTS)]: ['Uczestnicy', faUsers],
  [generateFullPath(() => PageRoutes.Teacher.ActivityAssessment.ACTIVITY_ASSESSMENT_LIST)]: [
    'Sprawdzanie aktywności',
    faArrowsToEye
  ],
  [generateFullPath(() => PageRoutes.Teacher.Grades.GRADES)]: ['Oceny', fa5]
}

export const FIELD_REQUIRED = 'Pole wymagane.'
export const POSITIVE_NUMBER = 'Wymagana liczba dodatnia.'
export const START_GRAPH_NODE_ID = -1
export const NOT_LOGGED_IN_ERROR = 'Logowanie nieudane. Niepoprawny login lub hasło.'
export const ERROR_OCCURRED = 'Wystąpił nieoczekiwany błąd'

export const Activity = {
  EXPEDITION: 'EXPEDITION',
  INFO: 'INFO',
  SURVEY: 'SURVEY',
  TASK: 'TASK'
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
    default:
      return
  }
}

export const getActivityPath = (type) => {
  switch (type) {
    case Activity.EXPEDITION:
      return generateFullPath(() => PageRoutes.Student.GameMap.Expedition.ACTIVITY_INFO)
    case Activity.TASK:
      return generateFullPath(() => PageRoutes.Student.GameMap.CombatTask.COMBAT_TASK)
    case Activity.SURVEY:
      return generateFullPath(() => PageRoutes.Student.GameMap.SurveyTask.SURVEY_TASK)
    case Activity.INFO:
      return generateFullPath(() => PageRoutes.Student.GameMap.InformationTask.INFORMATION)
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
            lepszych od Ciebie i od jakiego % graczy Ty jesteś wyżej w rankingu.`
}

export const HeroImg = {
  warrior: warriorImg,
  wizard: wizardImg,
  priest: priestImg,
  rogue: rogueImg
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

export const GradesTableType = {
  GRADES_TABLE: 0,
  UNMARKED_ACTIVITIES_TABLE: 1
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
