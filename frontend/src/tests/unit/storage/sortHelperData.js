import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { HeroType } from '../../../utils/userRole'

const ASC = 'ASC'
const DESC = 'DESC'

export const incorrectSortedVariables = ['test', null, undefined, 0, {}, true]
export const incorrectArrayItemValues = ['test', null, undefined, 0, [], true]
export const incorrectOptionsValues = ['test', null, 0, [], true]

export const iconsData = [
  {
    order: ASC,
    expectedIcon: faArrowUp,
    nextOrder: DESC
  },
  {
    order: DESC,
    expectedIcon: faArrowDown,
    nextOrder: ASC
  },
  {
    order: 'wrongString',
    expectedIcon: faArrowDown,
    nextOrder: ASC
  }
]

export const sortedArray = [
  {
    firstName: 'Jan',
    lastName: 'Nowak',
    position: 1,
    heroType: HeroType.WARRIOR,
    foo: 'test1'
  },
  {
    firstName: 'Tomasz',
    lastName: 'Kowal',
    position: 4,
    heroType: HeroType.WIZARD,
    foo: 'test2'
  },
  {
    firstName: 'Lucek',
    lastName: 'Kwiatek',
    position: 2,
    heroType: HeroType.ROGUE,
    foo: 'test3'
  },
  {
    firstName: 'Łukasz',
    lastName: 'Baran',
    position: 3,
    heroType: HeroType.PRIEST,
    foo: 'test4'
  }
]
