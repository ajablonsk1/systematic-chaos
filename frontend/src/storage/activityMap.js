const activityMap = {
  // todo: remove it
  activityMap: {
    activities: [
      {
        id: 16,
        activityType: 'expedition',
        posX: 0,
        posY: 3,
        unlockCriteria: {
          mustFulfill: 'NONE',
          requirements: null
        },
        completed: false
      },
      {
        id: 1,
        activityType: 'task',
        posX: 1,
        posY: 4,
        unlockCriteria: {
          mustFulfill: 'ANY',
          requirements: {
            finished: [0],
            score: null,
            time: null
          }
        },
        completed: false
      },
      {
        id: 2,
        activityType: 'survey',
        posX: 3,
        posY: 2,
        unlockCriteria: {
          mustFulfill: 'ALL',
          requirements: {
            finished: [0, 1],
            score: 15,
            time: null
          }
        },
        completed: false
      },
      {
        id: 3,
        activityType: 'information',
        posX: 7,
        posY: 4,
        unlockCriteria: {
          mustFulfill: 'ANY',
          requirements: {
            finished: [0],
            score: null,
            time: null
          }
        },
        completed: false
      },
      {
        id: 5,
        activityType: 'expedition',
        posX: 7,
        posY: 1,
        unlockCriteria: {
          mustFulfill: 'NONE',
          requirements: null
        },
        completed: false
      }
    ],
    mapSizeX: 8,
    mapSizeY: 5
  }
}

export function getActivityByPosition(chapterId, x, y) {
  return activityMap.activityMap.activities.find((activity) => activity.posX === x && activity.posY === y)
}
