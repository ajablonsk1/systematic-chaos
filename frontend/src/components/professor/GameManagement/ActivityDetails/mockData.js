import { HeroType } from '../../../../utils/userRole'

const resultsList = [
  {
    id: 1,
    firstName: 'Jan',
    lastName: 'Kowalski',
    groupName: 'pon1440B',
    heroType: HeroType.WARRIOR,
    points: 40,
    position: 1
  },
  {
    id: 2,
    firstName: 'Józef',
    lastName: 'Nowak',
    groupName: 'pon1250A',
    heroType: HeroType.ROGUE,
    points: 12,
    position: 2
  }
]

export const getResultsList = () => {
  return resultsList
}

export const getStatsForActivity = () => {
  return {
    activity100: 40,
    answersNumber: 65,
    avgPoints: 23,
    avgPercentageResult: 65,
    bestScore: 39,
    worstScore: 2,
    avgScores: [
      {
        groupName: 'pn1440A',
        avgPoints: 33,
        avgPercentageResult: 70
      },
      {
        groupName: 'pn1440B',
        avgPoints: 25,
        avgPercentageResult: 60
      },
      {
        groupName: 'wt1440A',
        avgPoints: 13,
        avgPercentageResult: 30
      }
    ],
    scaleScores: [
      {
        grade: '5.0',
        results: 5
      },
      {
        grade: '4.5',
        results: 10
      },
      {
        grade: '4.0',
        results: 15
      },
      {
        grade: '3.5',
        results: 20
      },
      {
        grade: '3.0',
        results: 10
      },
      {
        grade: '2.0',
        results: 5
      }
    ],
    heroAnswers: [
      {
        heroType: HeroType.WARRIOR,
        results: 20
      },
      {
        heroType: HeroType.WIZARD,
        results: 25
      },
      {
        heroType: HeroType.ROGUE,
        results: 10
      },
      {
        heroType: HeroType.PRIEST,
        results: 10
      }
    ]
  }
}
