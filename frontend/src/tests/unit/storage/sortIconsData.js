import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const ASC = 'ASC'
const DESC = 'DESC'

export const ICONS_DATA = [
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
