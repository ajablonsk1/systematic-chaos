import { getSortIcon } from '../../components/general/Ranking/sortHelper'
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const ASC = 'ASC'
const DESC = 'DESC'

describe('Sort icon getter tests', () => {
  it('should return appropriate icon for ascending sorting', () => {
    // when
    const icon = getSortIcon(ASC)

    // then
    expect(icon).toBe(faArrowUp)
  })
  it('should return appropriate icon for descending sorting', () => {
    // when
    const icon = getSortIcon(DESC)

    // then
    expect(icon).toBe(faArrowDown)
  })
  it('should return descending sorting icon for wrong string as the default icon', () => {
    //given
    const exampleString = 'test'

    // when
    const icon = getSortIcon(exampleString)

    // then
    expect(icon).toBe(faArrowDown)
  })
})
