import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'

export const getArrayValue = (sortedVariables, arrayItem, options = {}) => {
  if (!sortedVariables || sortedVariables.constructor !== Array) {
    return null
  }

  if (!arrayItem || arrayItem.constructor !== Object) {
    return null
  }

  if (!options || options.constructor !== Object) {
    return null
  }

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
  if (!array || array.constructor !== Array) {
    return []
  }

  const arrayCopy = [...array]
  const orderOffset = order === 'DESC' ? -1 : 1

  return arrayCopy.sort((a, b) => {
    let result
    const firstValue = getArrayValue(sortedVariables, a, options)
    const secondValue = getArrayValue(sortedVariables, b, options)

    if (!firstValue || !secondValue) {
      return 0
    }

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
