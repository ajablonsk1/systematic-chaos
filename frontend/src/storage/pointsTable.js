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

export function getBonusPoints() {
  return bonusPoints
}
