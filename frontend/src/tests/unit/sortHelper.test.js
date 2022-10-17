import { getSortIcon, nextSortingOrder } from '../../components/general/Ranking/sortHelper'
import { ICONS_DATA } from './storage/sortIconsData'

describe('Sort icon getter tests', () => {
  it.each(ICONS_DATA)('should return appropriate icon for given sorting order', (iconData) => {
    // when
    const icon = getSortIcon(iconData.order)

    // then
    expect(icon).toBe(iconData.expectedIcon)
  })
})

describe('Sorting order getter tests', () => {
  it.each(ICONS_DATA)('should return appropriate next sorting order for given order', (iconData) => {
    // when
    const nextOrder = nextSortingOrder(iconData.order)

    // then
    expect(nextOrder).toBe(iconData.nextOrder)
  })
})
