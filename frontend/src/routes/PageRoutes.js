export const GeneralRoutes = {
  HOME: '/',
  PASSWORD_RESET: '/password-reset',
  CANVAS: '/canvas' // other case
}

export const StudentRoutes = {
  GAME_CARD: '/game-card',
  GAME_MAP: {
    MAIN: '/game-map',
    GRAPH_TASK: {
      MAIN: '/game-map/expedition',
      INFO: '/game-map/expedition/info',
      QUESTION_SELECTION: '/game-map/expedition/doors-selection',
      QUESTION_CONTENT: '/game-map/expedition/question',
      SUMMARY: '/game-map/expedition/summary',
      EXPEDITION_WRAPPER: '/game-map/expedition/test'
    },
    COMBAT_TASK: '/game-map/combat-task',
    SURVEY_TASK: '/game-map/survey-task',
    INFO_TASK: '/game-map/information'
  },
  POINTS: '/points',
  RANKING: '/ranking',
  BADGES: '/badges-achievements',
  PROFILE: '/profile'
}

export const TeacherRoutes = {
  GAME_SUMMARY: '/game-summary',
  RANKING: '/students-ranking',
  GAME_MANAGEMENT: {
    MAIN: '/game-management',
    GROUPS: '/game-management/groups',
    CHAPTER: {
      MAIN: '/game-management/chapter',
      REQUIREMENTS: '/game-management/chapter/:name/:id/requirements'
    },
    RANKS_AND_BADGES: '/game-management/ranks-and-badges',
    GAME_SETTINGS: '/game-management/game-settings',
    LOGS: '/game-management/logs'
  },
  PARTICIPANTS: '/participants',
  ACTIVITY_ASSESSMENT: {
    LIST: '/assessment/list',
    ACTIVITY: '/assessment/activity-assessment'
  },
  GRADES: '/grades',
  SETTINGS: '/settings'
}
