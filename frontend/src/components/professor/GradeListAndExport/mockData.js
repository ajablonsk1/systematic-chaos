import { Activity } from '../../../utils/constants'

const activities = [
  {
    id: 1,
    activityName: 'Name 1',
    activityType: Activity.EXPEDITION,
    chapterName: 'Chapter 1'
  },
  {
    id: 2,
    activityName: 'Name 2',
    activityType: Activity.EXPEDITION,
    chapterName: 'Chapter 1'
  },
  {
    id: 3,
    activityName: 'Name 3',
    activityType: Activity.TASK,
    chapterName: 'Chapter 1'
  },
  {
    id: 4,
    activityName: 'Name 4',
    activityType: Activity.SURVEY,
    chapterName: 'Chapter 1'
  },
  {
    id: 5,
    activityName: 'Name 5',
    activityType: Activity.TASK,
    chapterName: 'Chapter 1'
  }
]

export const getActivitiesList = () => {
  return activities
}
