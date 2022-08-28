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
