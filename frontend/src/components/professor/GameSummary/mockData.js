export const getGameSummaryInfo = () => {
  return {
    avgGrade: 3.3,
    medianGrade: 3.0,
    bestScoreActivityName: 'Super Ekspedycja 1',
    worstScoreActivityName: 'Super Ekspedycja 2',
    assessedActivitiesCounter: 8,
    notAssessedActivityCounter: 1,
    waitingAnswersNumber: 30,
    avgGradesList: [
      {
        chapterName: 'Rozdział 1',
        avgGradesForChapter: [
          {
            groupName: 'pn1250A',
            avgGrade: '3.3',
            medianGrade: '3.2'
          },
          {
            groupName: 'wt1250B',
            avgGrade: '4.5',
            medianGrade: '3.4'
          }
        ]
      },
      {
        chapterName: 'Rozdział 2',
        avgGradesForChapter: [
          {
            groupName: 'pn1250A',
            avgGrade: '3.6',
            medianGrade: '2.5'
          },
          {
            groupName: 'wt1250B',
            avgGrade: '4.2',
            medianGrade: '3.8'
          }
        ]
      }
    ],
    avgActivitiesScore: [
      {
        chapterName: 'Rozdział 1',
        activitiesScore: [
          {
            activityName: 'Ekspedycja 1',
            scores: [
              {
                groupName: 'pn1440A',
                score: '75'
              },
              {
                groupName: 'wt1250A',
                score: '82'
              }
            ]
          },
          {
            activityName: 'Zadanie bojowe 1',
            scores: [
              {
                groupName: 'pn1440A',
                score: '79'
              },
              {
                groupName: 'wt1250A',
                score: '81'
              }
            ]
          }
        ]
      }
    ],
    notAssessedActivitiesTable: [
      {
        activityName: 'Ekspedycja 1',
        activityType: 'Ekspedycja',
        waitingAnswersNumber: 10
      },
      {
        activityName: 'Zadanie bojowe 1',
        activityType: 'Zadanie bojowe',
        waitingAnswersNumber: 20
      },
      {
        activityName: 'Ekspedycja 1',
        activityType: 'Ekspedycja',
        waitingAnswersNumber: 10
      },
      {
        activityName: 'Zadanie bojowe 1',
        activityType: 'Zadanie bojowe',
        waitingAnswersNumber: 20
      },
      {
        activityName: 'Ekspedycja 1',
        activityType: 'Ekspedycja',
        waitingAnswersNumber: 10
      },
      {
        activityName: 'Zadanie bojowe 1',
        activityType: 'Zadanie bojowe',
        waitingAnswersNumber: 20
      },
      {
        activityName: 'Ekspedycja 1',
        activityType: 'Ekspedycja',
        waitingAnswersNumber: 10
      },
      {
        activityName: 'Zadanie bojowe 1',
        activityType: 'Zadanie bojowe',
        waitingAnswersNumber: 20
      }
    ]
  }
}
