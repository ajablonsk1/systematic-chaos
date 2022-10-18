import { getArrayValue, getSortIcon, nextSortingOrder } from '../../components/general/Ranking/sortHelper'
import {
  iconsData,
  incorrectArrayItemValues,
  incorrectOptionsValues,
  incorrectSortedVariables,
  sortedArray
} from './storage/sortHelperData'
import { getHeroName } from '../../utils/constants'

describe('Sort icon getter tests', () => {
  it.each(iconsData)('should return appropriate icon for given sorting order: %s', (iconData) => {
    // when
    const icon = getSortIcon(iconData.order)

    // then
    expect(icon).toBe(iconData.expectedIcon)
  })
})

describe('Sorting order getter tests', () => {
  it.each(iconsData)('should return appropriate next sorting order for given order: %s', (iconData) => {
    // when
    const nextOrder = nextSortingOrder(iconData.order)

    // then
    expect(nextOrder).toBe(iconData.nextOrder)
  })
})

describe('Array value getter tests', () => {
  it.each(sortedArray)('should return appropriate array value for string type: %s', (arrayItem) => {
    // given
    const options = { isString: true }
    const sortedVariables = ['firstName']

    // when
    const arrayValue = getArrayValue(sortedVariables, arrayItem, options)

    // then
    expect(arrayValue).toBe(arrayItem.firstName)
  })
  it.each(sortedArray)('should return appropriate array value for non-string type: %s', (arrayItem) => {
    // given
    const options = { isString: false }
    const sortedVariables = ['position']

    // when
    const arrayValue = getArrayValue(sortedVariables, arrayItem, options)

    // then
    expect(arrayValue).toBe(arrayItem.position)
  })
  it.each(sortedArray)('should return appropriate array value for customComparingFunction: %s', (arrayItem) => {
    // given
    const options = { isString: true, customComparingFunction: getHeroName }
    const sortedVariables = ['heroType']

    // when
    const arrayValue = getArrayValue(sortedVariables, arrayItem, options)

    // then
    expect(arrayValue).toBe(getHeroName(arrayItem.heroType))
  })
  it.each(incorrectSortedVariables)('should return null for incorrect sortedVariables value: %s', (sortedVariables) => {
    // when
    const arrayValue = getArrayValue(sortedVariables, {})

    // then
    expect(arrayValue).toBeNull()
  })
  it.each(incorrectArrayItemValues)('should return null for incorrect arrayItem value: %s', (arrayItem) => {
    // given
    const sortedVariables = ['']

    // when
    const arrayValue = getArrayValue(sortedVariables, arrayItem)

    // then
    expect(arrayValue).toBeNull()
  })
  it.each(incorrectOptionsValues)('should return null for incorrect options type: %s', (options) => {
    // given
    const sortedVariables = ['']
    const arrayItem = {}

    // when
    const arrayValue = getArrayValue(sortedVariables, arrayItem, options)

    // then
    expect(arrayValue).toBeNull()
  })
  it('should return correct value for undefined options (default empty object)', () => {
    // given
    const options = undefined
    const arrayItem = sortedArray[0]
    const sortedVariables = ['firstName']

    // when
    const arrayValue = getArrayValue(sortedVariables, arrayItem, options)

    // then
    expect(arrayValue).toBe(arrayItem.firstName)
  })
})
