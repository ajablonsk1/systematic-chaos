import { getArrayValue, getSortIcon, nextSortingOrder, sortArray } from '../../components/general/Ranking/sortHelper'
import {
  ASC,
  iconsData,
  incorrectArrayItemValues,
  incorrectArrays,
  incorrectOptionsValues,
  incorrectSortedVariables,
  arrayToSort,
  expectedSortedArray
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
  it.each(arrayToSort)('should return appropriate array value for string type: %s', (arrayItem) => {
    // given
    const options = { isString: true }
    const sortedVariables = ['firstName']

    // when
    const arrayValue = getArrayValue(sortedVariables, arrayItem, options)

    // then
    expect(arrayValue).toBe(arrayItem.firstName)
  })
  it.each(arrayToSort)('should return appropriate array value for non-string type: %s', (arrayItem) => {
    // given
    const options = { isString: false }
    const sortedVariables = ['position']

    // when
    const arrayValue = getArrayValue(sortedVariables, arrayItem, options)

    // then
    expect(arrayValue).toBe(arrayItem.position)
  })
  it.each(arrayToSort)('should return appropriate array value for customComparingFunction: %s', (arrayItem) => {
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
    const arrayItem = arrayToSort[0]
    const sortedVariables = ['firstName']

    // when
    const arrayValue = getArrayValue(sortedVariables, arrayItem, options)

    // then
    expect(arrayValue).toBe(arrayItem.firstName)
  })
})

describe('Sort array function tests', () => {
  it.each(incorrectArrays)('should return empty array if given array is empty or wrong type: %s', (array) => {
    // when
    const sortedArray = sortArray(array, ASC, {})

    // then
    expect(sortedArray).toMatchObject([])
  })
  it.each(incorrectOptionsValues)(
    'should return the same array order if given options are incorrect and array is not empty: %s',
    (options) => {
      // given
      const array = [2, 1, 3]

      // when
      const sortedArray = sortArray(array, ASC, {}, options)

      // then
      expect(sortedArray).toMatchObject(array)
    }
  )
  it.each(incorrectSortedVariables)(
    'should return the same array if sortedVariables is incorrect: %s',
    (sortedVariables) => {
      // given
      const array = [2, 1, 4]

      // when
      const sortedArray = sortArray(array, ASC, sortedVariables)

      // then
      expect(sortedArray).toMatchObject(array)
    }
  )
  /* First I wrote: it.each(expectedSortedArray)('should return sorted array if given dataset is correct: %s', (dataset) => ...
   *  but for some unknown reason it doesn't work ...
   * This is why test below looks... different ;)
   * */
  it('should return sorted array if given dataset is correct', () => {
    expectedSortedArray.forEach((dataset) => {
      // when
      const a = sortArray(arrayToSort, dataset.order, dataset.sortingBy, dataset.options)

      // then
      expect(a).toStrictEqual(dataset.sortedArray)
    })
  })
})
