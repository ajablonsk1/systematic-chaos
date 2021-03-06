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

export const UserSidebarTitles = {
  [generateFullPath(() => PageRoutes.Student.GameCard.GAME_CARD)]: ['Karta gry', faHouse],
  [generateFullPath(() => PageRoutes.Student.GameMap.GAME_MAP)]: ['Mapa gry', faChessBoard],
  [generateFullPath(() => PageRoutes.Student.Points.POINTS)]: ['Punkty', faStar],
  [generateFullPath(() => PageRoutes.Student.Ranking.RANKING)]: ['Ranking', faRankingStar],
  [generateFullPath(() => PageRoutes.Student.BadgesAndAchievements.BADGES_ACHIEVEMENTS)]: [
    'Odznaki i osi??gni??cia',
    faCertificate
  ],
  [generateFullPath(() => PageRoutes.General.CANVAS)]: ['??wiat gry', faChessBoard]
}

export const TeacherSidebarTitles = {
  [generateFullPath(() => PageRoutes.Teacher.GameSummary.GAME_SUMMARY)]: ['Podsumowanie gry', faBullseye],
  [generateFullPath(() => PageRoutes.Teacher.Ranking.RANKING)]: ['Ranking', faRankingStar],
  [generateFullPath(() => PageRoutes.Teacher.GameManagement.GAME_MANAGEMENT)]: ['Zarz??dzanie gr??', faListCheck],
  [generateFullPath(() => PageRoutes.Teacher.Participants.PARTICIPANTS)]: ['Uczestnicy', faUsers],
  [generateFullPath(() => PageRoutes.Teacher.ActivityAssessment.ACTIVITY_ASSESSMENT_LIST)]: [
    'Sprawdzanie aktywno??ci',
    faArrowsToEye
  ],
  [generateFullPath(() => PageRoutes.Teacher.Grades.GRADES)]: ['Oceny', fa5]
}

export const FIELD_REQUIRED = 'Pole wymagane.'
export const START_GRAPH_NODE_ID = -1

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
      return 'Sonda??'
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
  firstName: ['Imi??', 'text'],
  lastName: ['Nazwisko', 'text'],
  index: ['Nr. indeksu', 'text'],
  email: ['Email', 'email'],
  invitationCode: ['Klucz dost??pu', 'text'],
  heroType: ['Typ osobowo??ci postaci', 'select'],
  password: ['Has??o', 'password'],
  passwordRepeat: ['Powt??rz has??o', 'password']
}

export const HeroDescriptions = {
  warrior: `Skupiony na zdolno??ciach walki, ca??kowicie pozbawiony magicznych zdolno??ci. 
            ??atwiej mu pokona?? trudnego przeciwnika (daje raz w miesi??cu mo??liwo???? podmiany 
            tre??ci pytania trudnego na tre???? pytania ??atwego w ekspedycji bez zmiany ilo??ci puntk??w za zadanie).
            W karcie gry widzisz informacj??, na kt??rym miejscu w rankingu si?? znajdujesz.`,
  wizard: `Przejawiaj??cy zdolno??ci magiczne, lecz fizycznie s??aby. Dzi??ki swoim czarom mo??e cofn???? si?? w grafie
            ekspedycji do wyboru pytania (anulowa?? ostatni wyb??r) i wybra?? inne (umiej??tno???? dost??pna raz na miesi??c).
            W karcie gry widzisz informacj??, na kt??rym miejscu w rankingu si?? znajdujesz.`,
  priest: `Specjalizuj??cy si?? w uzdrawianiu. Dzi??ki swoim umiej??tno??ciom uzdrawiania mo??e doda?? sobie 5pkt po zako??czeniu
            ekspedycji. Umiej??tno???? ta jest dost??pna raz w miesi??cu. W karcie gry widzisz informacj?? jaki % graczy jest
            lepszych od Ciebie i od jakiego % graczy Ty jeste?? wy??ej w rankingu.`,
  rogue: `Potrafi porusza?? si?? bezszelestnie, skradanie to jego dominuj??ca umiej??tno????. Dzi??ki swoim zdolno??ciom 
            umo??liwi Ci pomin???? jedno pytanie w ekspedycji na poziomie ??atwym warte nie wi??cej ni?? 5pkt. Umiej??tno????
            ta jest dost??pna raz w miesi??cu. W karcie gry widzisz informacj?? jaki % graczy jest
            lepszych od Ciebie i od jakiego % graczy Ty jeste?? wy??ej w rankingu.`
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
