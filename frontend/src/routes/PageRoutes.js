export const PageRoutes = {
  General: {
    MAIN_PATH: '/*',
    HOME: '',
    CANVAS: 'canvas' // other case
  },

  Student: {
    MAIN_PATH: '/*',
    GameCard: {
      MAIN_PATH: 'game-card/*',
      GAME_CARD: ''
    },
    GameMap: {
      MAIN_PATH: 'game-map/*',
      GAME_MAP: '',
      Expedition: {
        MAIN_PATH: 'expedition/*',
        ACTIVITY_INFO: 'info',
        QUESTION_SELECTION: 'doors-selection',
        QUESTION_ANSWER: 'question',
        EXPEDITION_SUMMARY: 'summary'
      },
      CombatTask: {
        MAIN_PATH: 'combat-task/*',
        COMBAT_TASK: ''
      },
      SurveyTask: {
        MAIN_PATH: 'survey-task/*',
        SURVEY_TASK: ''
      },
      InformationTask: {
        MAIN_PATH: 'information/*',
        INFORMATION: ''
      }
    },
    Points: {
      MAIN_PATH: 'points/*',
      POINTS: ''
    },
    Ranking: {
      MAIN_PATH: 'ranking/*',
      RANKING: ''
    },
    BadgesAndAchievements: {
      MAIN_PATH: 'badges-achievements/*',
      BADGES_ACHIEVEMENTS: ''
    }
  },

  Teacher: {
    MAIN_PATH: '/*',
    GameSummary: {
      MAIN_PATH: 'game-summary/*',
      GAME_SUMMARY: ''
    },
    Ranking: {
      MAIN_PATH: 'ranking/*',
      RANKING: ''
    },
    GameManagement: {
      MAIN_PATH: 'game-management/*',
      GAME_MANAGEMENT: '',
      Groups: {
        MAIN_PATH: '*',
        GROUPS: 'groups',
        GROUP_ADDITION: 'groups/group-addition'
      }
    },
    Participants: {
      MAIN_PATH: 'participants/*',
      PARTICIPANTS: ''
    },
    ActivityAssessment: {
      MAIN_PATH: 'assessment/*',
      ACTIVITY_ASSESSMENT_LIST: 'list',
      ACTIVITY_ASSESSMENT: 'activity-assessment'
    },
    Grades: {
      MAIN_PATH: 'grades/*',
      GRADES: 'grades'
    }
  }
}

export const generateFullPath = (callback) => {
  const pathStartIndex = callback.toString().indexOf('PageRoutes.')

  const givenPathKeys = callback.toString().slice(pathStartIndex).split('.').slice(1)

  let fullPath = ''
  let searchedObject = PageRoutes

  for (let pathFragment of givenPathKeys) {
    searchedObject = searchedObject[pathFragment]

    if (typeof searchedObject == 'object') {
      fullPath += searchedObject.MAIN_PATH.replace('*', '')
    } else {
      fullPath += searchedObject
    }
  }

  return fullPath
}
