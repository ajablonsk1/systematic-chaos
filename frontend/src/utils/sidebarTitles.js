import {
  fa5,
  faArrowsToEye,
  faBullseye,
  faCertificate,
  faChessBoard,
  faGear,
  faHouse,
  faListCheck,
  faRankingStar,
  faRightFromBracket,
  faStar,
  faTerminal,
  faUser,
  faUserGroup,
  faUsers
} from '@fortawesome/free-solid-svg-icons'
import { GeneralRoutes, StudentRoutes, TeacherRoutes } from '../routes/PageRoutes'

export const UserSidebarTitles = [
  {
    name: 'Karta gry',
    icon: faHouse,
    navigateTo: StudentRoutes.GAME_CARD
  },
  {
    name: 'Mapa gry',
    icon: faChessBoard,
    navigateTo: StudentRoutes.GAME_MAP.MAIN
  },
  {
    name: 'Punkty',
    icon: faStar,
    navigateTo: StudentRoutes.POINTS
  },
  {
    name: 'Ranking',
    icon: faRankingStar,
    navigateTo: StudentRoutes.RANKING
  },
  {
    name: 'Rangi i odznaki',
    icon: faCertificate,
    navigateTo: StudentRoutes.BADGES
  },
  // {
  //   name: 'Świat gry',
  //   icon: faChessBoard,
  //   navigateTo: GeneralRoutes.CANVAS
  // },
  {
    name: 'Profil',
    icon: faUser,
    navigateTo: StudentRoutes.PROFILE
  },
  {
    name: 'Wyloguj',
    icon: faRightFromBracket,
    navigateTo: GeneralRoutes.HOME,
    action: 'LOGOUT'
  }
]

export const ProfessorSidebarTitles = [
  {
    name: 'Podsumowanie gry',
    icon: faBullseye,
    navigateTo: TeacherRoutes.GAME_SUMMARY
  },
  {
    name: 'Ranking',
    icon: faRankingStar,
    navigateTo: TeacherRoutes.RANKING
  },
  {
    name: 'Zarządzanie grą',
    icon: faListCheck,
    navigateTo: TeacherRoutes.GAME_MANAGEMENT.MAIN,
    subpages: [
      {
        name: 'Grupy',
        icon: faUserGroup,
        navigateTo: TeacherRoutes.GAME_MANAGEMENT.GROUPS
      },
      {
        name: 'Rangi i odznaki',
        icon: faCertificate,
        navigateTo: TeacherRoutes.GAME_MANAGEMENT.RANKS_AND_BADGES
      },
      {
        name: 'Logi',
        icon: faTerminal,
        navigateTo: TeacherRoutes.GAME_MANAGEMENT.LOGS
      }
      // {
      //   name: 'Ustawienia gry',
      //   icon: faPalette,
      //   navigateTo: TeacherRoutes.GAME_MANAGEMENT.GAME_SETTINGS
      // }
    ]
  },
  {
    name: 'Uczestnicy',
    icon: faUsers,
    navigateTo: TeacherRoutes.PARTICIPANTS
  },
  {
    name: 'Sprawdzanie aktywności',
    icon: faArrowsToEye,
    navigateTo: TeacherRoutes.ACTIVITY_ASSESSMENT.LIST,
    action: 'BADGE'
  },
  {
    name: 'Oceny',
    icon: fa5,
    navigateTo: TeacherRoutes.GRADES
  },
  {
    name: 'Ustawienia',
    icon: faGear,
    navigateTo: TeacherRoutes.SETTINGS
  },
  {
    name: 'Wyloguj',
    icon: faRightFromBracket,
    navigateTo: GeneralRoutes.HOME,
    action: 'LOGOUT'
  }
]
