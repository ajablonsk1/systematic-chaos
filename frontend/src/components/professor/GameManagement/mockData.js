const chaptersList = [
  {
    id: 1,
    name: 'Rozdział 1: Witaj w dżungli!',
    noActivities: 6,
    noExpeditions: 2,
    noSurveyTasks: 1,
    noInfoTasks: 1,
    noCombatTasks: 2,
    points: 500,
    mapSize: '11 x 7',
    activities: [
      {
        id: 1,
        posX: 5,
        posY: 4,
        type: 'EXPEDITION',
        title: 'Dżungla kabli 1',
        points: 10
      },
      {
        id: 2,
        posX: 2,
        posY: 2,
        type: 'EXPEDITION',
        title: 'Dżungla kabli 2',
        points: 30
      },
      {
        id: 1,
        posX: 3,
        posY: 3,
        type: 'TASK',
        title: 'Skakanka',
        points: 55
      },
      {
        id: 1,
        posX: 3,
        posY: 0,
        type: 'INFO',
        title: 'Wszystko co musisz wiedzieć o kablach.',
        points: 0
      }
    ]
  },
  {
    id: 2,
    name: 'Rozdział 2: Kable! Wszędzie kable!',
    noActivities: 4,
    noExpeditions: 2,
    noSurveyTasks: 1,
    noInfoTasks: 1,
    noCombatTasks: 2,
    points: 750,
    mapSize: '8 x 6',
    activities: [
      {
        id: 1,
        posX: 5,
        posY: 4,
        type: 'EXPEDITION',
        title: 'Dżungla kabli 1',
        points: 10
      },
      {
        id: 2,
        posX: 2,
        posY: 2,
        type: 'EXPEDITION',
        title: 'Dżungla kabli 2',
        points: 30
      },
      {
        id: 1,
        posX: 3,
        posY: 3,
        type: 'TASK',
        title: 'Skakanka',
        points: 55
      },
      {
        id: 1,
        posX: 3,
        posY: 0,
        type: 'INFO',
        title: 'Wszystko co musisz wiedzieć o kablach.',
        points: 0
      }
    ]
  }
]

export const getChaptersList = () => {
  return chaptersList
}

export const getChapterDetails = (chapterId) => {
  return chaptersList.find(({ id }) => id === chapterId)
}
