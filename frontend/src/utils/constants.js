import priestImg from './resources/heroes/pope.png'
import rogueImg from './resources/heroes/rogue.png'
import warriorImg from './resources/heroes/warrior.png'
import wizardImg from './resources/heroes/wizard.png'
import ExpeditionImg from './resources/activities/graphTaskIcon.png'
import InformationImg from './resources/activities/infoTaskIcon.png'
import SurveyImg from './resources/activities/surveyTaskIcon.png'
import TaskImg from './resources/activities/fileTaskIcon.png'

import warrior1 from './resources/warrior/0.png'
import warrior2 from './resources/warrior/1.png'
import warrior11 from './resources/warrior/10.png'
import warrior12 from './resources/warrior/11.png'
import warrior3 from './resources/warrior/2.png'
import warrior4 from './resources/warrior/3.png'
import warrior5 from './resources/warrior/4.png'
import warrior6 from './resources/warrior/5.png'
import warrior7 from './resources/warrior/6.png'
import warrior8 from './resources/warrior/7.png'
import warrior10 from './resources/warrior/9.png'
import warrior13 from './resources/warrior/12.png'
import warrior14 from './resources/warrior/13.png'
import warrior15 from './resources/warrior/14.png'
import warrior16 from './resources/warrior/15.png'
import warrior17 from './resources/warrior/16.png'
import { HeroType, PlayerType } from './userRole'
import moment from 'moment'
import { GeneralRoutes, StudentRoutes } from '../routes/PageRoutes'

export const FIELD_REQUIRED = 'Pole wymagane.'
export const NONNEGATIVE_NUMBER = 'Wymagana liczba nieujemna'
export const NOT_LOGGED_IN_ERROR = 'Logowanie nieudane. Niepoprawny login lub hasło.'
export const ERROR_OCCURRED = 'Wystąpił nieoczekiwany błąd'
export const PASSWORD_VALIDATION_ERROR =
  'Hasło musi zawierać przynajmniej jedną cyfrę i co najmniej jedną małą i jedną wielką literę'
export const DIFFERENT_PASSWORDS = 'Hasła się różnią.'
export const INCORRECT_EMAIL = 'Podaj poprawny adres email z domeny agh.edu.pl'
export const WRONG_INDEX_LENGTH = 'Nr indeksu musi się składać z sześciu cyfr.'
export const INDEX_WITH_CHARS = 'Nr indeksu musi składać się z samych cyfr.'
export const FILE_INPUT_REQUIRED = 'Nie wybrano żadnego pliku.'
export const ALL_REQUIRED_FIELDS_MUST_BE_FULFILLED = 'Wszystkie wymagane pola muszą zostać wypełnione'
export const ANSWER_SAVED = 'Twoja odpowiedź została zapisana'

export const SANE_MAP_FIELDCOUNT_LIMIT = 10
export const NUMBER_FROM_RANGE = (rangeMin, rangeMax) => `Wymagana liczba z przedziału [${rangeMin}, ${rangeMax}]`

export const FIELD_WITH_NAME_REQUIRED = (fieldName) => `Pole o nazwie "${fieldName}" jest wymagane.`
export const ALL_FIELDS_REQUIRED = 'Wszystkie pola są wymagane.'

export const GRAPH_NODE_BASIC_SIZE = 20
export const GRAPH_NODE_SPECIAL_SIZE = 40

export const base64Header = 'data:image/jpeg;base64,'

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
  token: ['Klucz dostępu', 'password'],
  heroType: ['Typ osobowości postaci', 'select'],
  password: ['Hasło', 'password'],
  passwordRepeat: ['Powtórz hasło', 'password']
}

export const HeroDescriptions = {
  [HeroType.WARRIOR]: `Skupiony na zdolnościach walki, całkowicie pozbawiony magicznych zdolności. 
            Łatwiej mu pokonać trudnego przeciwnika. Pozwala na odkrycie typu pytania kilka razy w jednej ekspedycji (umiejętność dostępna raz na tydzień).
            W karcie gry widzisz informację, na którym miejscu w rankingu się znajdujesz oraz porównanie z osobą przed Tobą i za Tobą w rankingu.`,
  [HeroType.WIZARD]: `Przejawiający zdolności magiczne, lecz fizycznie słaby. Dzięki swoim czarom może kilka razy w jednek ekspedycji
            poznać punktację dowolnego pytania przed przejściem do tego pytania (umiejętność dostępna raz na tydzień).
            W karcie gry widzisz informację w jakim % graczy się znajdujesz.`,
  [HeroType.PRIEST]: `Specjalizujący się w uzdrawianiu. Dzięki swoim umiejętnościom uzdrawiania może jednorazowo w ekspedycji wydłużyć czas jej trwania 
            (umiejętność dostępna raz na tydzień). W karcie gry widzisz informację w jakim % graczy się znajdujesz.`,
  [HeroType.ROGUE]: `Potrafi poruszać się bezszelestnie, skradanie to jego dominująca umiejętność. Dzięki swoim zdolnościom 
            umożliwi Ci pominąć jedno pytanie w ekspedycji na poziomie łatwym warte nie więcej niż 5pkt. 
            W karcie gry widzisz informację, na którym miejscu w rankingu się znajdujesz oraz porównanie z osobą przed Tobą i za Tobą w rankingu.`
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
  switch (requirement.type.toLowerCase()) {
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
  if (playerType === PlayerType.CHALLENGING) {
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

export const INVALID_DATE_MESSAGE = 'Invalid date object given'

export const BadgeType = {
  ACTIVITY_NUMBER: 'ACTIVITY_NUMBER',
  ACTIVITY_SCORE: 'ACTIVITY_SCORE',
  CONSISTENCY: 'CONSISTENCY',
  FILE_TASK_NUMBER: 'FILE_TASK_NUMBER',
  GRAPH_TASK_NUMBER: 'GRAPH_TASK_NUMBER',
  TOP_SCORE: 'TOP_SCORE'
}

export const sidebarExcludedPaths = [GeneralRoutes.HOME, GeneralRoutes.PASSWORD_RESET]

export const getSpecifyDescription = (heroType) => {
  const baseInfo = `Wartość mocy postaci na poziomie 1. <br/> Dla wybranej postaci: ${getHeroName(
    heroType
  )} wartość ta oznacza <br/>`

  const MAX_NUMBER_OF_USAGE = 'maksymalną liczbę możliwych wykorzystań umiejętności w jednej ekspedycji.'

  const heroTypeSuperPowerDescription = {
    [HeroType.PRIEST]: 'liczbę ms o jaką gracz wydłuży sobie czas. Umiejętność jest dostępna raz na ekspedycję.',
    [HeroType.ROGUE]:
      'maksymalną liczbę punktów, którą może mieć zadanie, aby gracz mógł je pominąć. Umiejętność jest dostępna raz na ekspedycję.',
    [HeroType.WARRIOR]: MAX_NUMBER_OF_USAGE,
    [HeroType.WIZARD]: MAX_NUMBER_OF_USAGE
  }

  return baseInfo + heroTypeSuperPowerDescription[heroType]
}

export const coolDownDescription = (heroType) =>
  `Wartość ta (podana w minutach) oznacza po jakim czasie bohater o wybranym typie: ${getHeroName(heroType)} <br/> 
   będzie mógł użyć swojej mocy ponownie w tej samej ekspedycji.`

export const ActivityFileName = {
  [Activity.INFO]: 'info-task-configuration.json',
  [Activity.TASK]: 'combat-task-configuration.json',
  [Activity.SURVEY]: 'survey-task-configuration.json',
  [Activity.EXPEDITION]: 'graph-task-configuration.json'
}
