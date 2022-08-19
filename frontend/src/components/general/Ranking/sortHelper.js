import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

const getArrayValue = (sortedVariables, arrayItem, options) => {
  if (options.isString) {
    return sortedVariables
      .map((variable) => {
        if (options.customComparingFunction) {
          return options.customComparingFunction(arrayItem[variable])
        }
        return arrayItem[variable]
      })
      .join('')
  }

  return arrayItem[sortedVariables[0]]
}

export const sortArray = (array, order, sortedVariables, options = {}) => {
  const arrayCopy = [...array]
  const orderOffset = order === 'DESC' ? -1 : 1

  return arrayCopy.sort((a, b) => {
    let result
    const firstValue = getArrayValue(sortedVariables, a, options)
    const secondValue = getArrayValue(sortedVariables, b, options)

    // We can compare latin extended chars thanks to localeCompare (pl lang)
    if (options.isString) {
      return orderOffset * firstValue.localeCompare(secondValue)
    } else {
      if (firstValue > secondValue) {
        result = 1
      } else if (firstValue < secondValue) {
        result = -1
      } else {
        result = 0
      }
    }

    return result * orderOffset
  })
}

export const nextSortingOrder = (currentOrder) => (currentOrder === 'ASC' ? 'DESC' : 'ASC')

export const getSortIcon = (order) => (order === 'ASC' ? faArrowUp : faArrowDown)
