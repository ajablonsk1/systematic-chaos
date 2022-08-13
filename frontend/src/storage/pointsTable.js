import { Activity } from '../utils/constants'

const table = [
  {
    date: '12.04.2022',
    points: 200,
    activityType: Activity.EXPEDITION,
    activityName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    date: '10.04.2022',
    points: 300,
    activityType: Activity.TASK,
    activityName: 'Pellentesque aliquet ante at consequat vestibulum.'
  },
  {
    date: '08.04.2022',
    points: 500,
    activityType: Activity.EXPEDITION,
    activityName: 'Nunc pulvinar dui tortor'
  },
  {
    date: '01.04.2022',
    points: 50,
    activityType: Activity.SURVEY,
    activityName: 'Pellentesque vestibulum erat eget condimentum scelerisque.'
  },
  {
    date: '25.03.2022',
    points: 100,
    activityType: Activity.EXPEDITION,
    activityName: 'Dżungla kabli'
  },
  {
    date: '22.03.2022',
    points: 20,
    activityType: Activity.EXPEDITION,
    activityName: 'Curabitur molestie eu magna ac dignissim.'
  },
  {
    date: '20.03.2022',
    points: 10,
    activityType: Activity.TASK,
    activityName: 'Dżungla kabli'
  },
  {
    date: '15.03.2022',
    points: 400,
    activityType: Activity.SURVEY,
    activityName: 'Dżungla kabli'
  },
  {
    date: '12.03.2022',
    points: 500,
    activityType: Activity.EXPEDITION,
    activityName: 'Cras rhoncus augue eu pulvinar consequat'
  },
  {
    date: '10.03.2022',
    points: 320,
    activityType: Activity.TASK,
    activityName: 'Dżungla kabli'
  }
]

const bonusPoints = [
  {
    date: '10.03.2022',
    points: 20,
    reason: 'Praca na zajęciach',
    professor: 'Marian Nowak'
  },
  {
    date: '17.03.2022',
    points: 10,
    reason: 'Praca na zajęciach',
    professor: 'Marian Nowak'
  },
  {
    date: '20.03.2022',
    points: 50,
    reason: 'Super praca na grupie zastępczej',
    professor: 'Janusz Kowal'
  },
  {
    date: '01.04.2022',
    points: 2,
    reason: 'prima aprilis',
    professor: 'Janusz Kowal'
  },
  {
    date: '12.04.2022',
    points: 11,
    reason: 'Praca na zajęciach innej grupy',
    professor: 'Marian Nowak'
  },
  {
    date: '13.05.2022',
    points: 50,
    reason: 'Wysoka aktywność w komentarzach',
    professor: 'Marian Nowak'
  },
  {
    date: '15.05.2022',
    points: 10,
    reason: 'Prezent na zakończenie przedmiotu',
    professor: 'Marian Nowak'
  }
]

export function getTableContent() {
  return table
}

export function getBonusPoints() {
  return bonusPoints
}
