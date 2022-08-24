import prevRankImg from './images/warrior1.png'
import actualRankImg from './images/swordsman.png'
import nextRankImg from './images/knight.png'
import helmetBadge from './images/helmet.png'
import collegeBadge from './images/college.png'
import badge from './images/badge.png'
import badge100 from './images/badge100.png'
import goalBadge from './images/goal.png'
import centerBadge from './images/center.png'

const prevRank = {
  name: 'Uczeń mistrza',
  imgSrc: prevRankImg,
  minPoints: 0,
  maxPoints: 100
}

const actualRank = {
  name: 'Początkujący wojownik',
  imgSrc: actualRankImg,
  minPoints: 101,
  maxPoints: 300
}

const nextRank = {
  name: 'Rycerz bez konia',
  imgSrc: nextRankImg,
  minPoints: 301,
  maxPoints: 600
}

const studentPoints = 250
const missingPoints = 50
const studentBadgesNumber = 6
const allBadgesNumber = 10

const badgesList = [
  {
    src: helmetBadge,
    name: 'To dopiero początek',
    description: 'Za zdobycie rangi "Rycerz bez konia"',
    unlocked: false
  },
  {
    src: collegeBadge,
    name: 'Wzorowy uczeń',
    description: 'Za wyjście z rangi "Uczeń mistrza"',
    unlocked: true,
    unlockedDate: '12.08.2022'
  },
  {
    src: badge,
    name: 'Pyrrusowe zwycięstwo',
    description: 'Za osiągnięcie zysku punktowego nie większego niż 10% w aktywności typu "Ekspedycja"',
    unlocked: false
  },
  {
    src: badge100,
    name: 'Geniusz',
    description: 'Za zdobycie 100% w aktywności typu "Ekspedycja"',
    unlocked: false
  },
  {
    src: goalBadge,
    name: 'Zdobywca',
    description: 'Za wykonanie aktywności typu "Zadanie bojowe"',
    unlocked: true,
    unlockedDate: '13.08.2022'
  },
  {
    src: centerBadge,
    name: 'Strzelec wyborowy',
    description: 'Za wybranie najkrótszej drogi w aktywności typu "Ekspedycja"',
    unlocked: true,
    unlockedDate: '14.08.2022'
  }
]

const lastUnlockedBadge = {
  src: centerBadge,
  name: 'Strzelec wyborowy',
  description: 'Za wybranie najkrótszej drogi w aktywności typu "Ekspedycja"',
  unlocked: true,
  unlockedDate: '14.08.2022'
}

export const getRankInfo = () => {
  return [prevRank, actualRank, nextRank]
}

export const getStudentPoints = () => {
  return [studentPoints, missingPoints]
}

export const getBadgesInfo = () => {
  return [studentBadgesNumber, allBadgesNumber]
}

export const getBadgesList = () => {
  return badgesList
}

export const getLastUnlockedBadge = () => {
  return lastUnlockedBadge
}
