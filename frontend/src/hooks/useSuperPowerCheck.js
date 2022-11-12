import { useEffect, useState } from 'react'
import { EXPEDITION_STATUS } from '../utils/constants'

export const useSuperPowerCheck = (checkFunction, superPowerInfo, skip = false, onSkipObject = undefined) => {
  const [superPowerCanBeUsed, setSuperPowerCanBeUsed] = useState(undefined)

  useEffect(() => {
    if (!skip) {
      checkFunction()
        .then((response) => {
          setSuperPowerCanBeUsed(response)
        })
        .catch(() => {
          setSuperPowerCanBeUsed(null)
        })
    } else {
      setSuperPowerCanBeUsed(onSkipObject)
    }

    // eslint-disable-next-line
  }, [superPowerInfo, skip])

  return superPowerCanBeUsed
}

export const useRogueSuperPowerCheck = (checkFunction, superPowerInfo, status) => {
  const onSkipObject = { canBeUsed: false, message: 'Moc nie może być użyta w wyborze pytania.' }
  const skip = status !== EXPEDITION_STATUS.ANSWER

  return useSuperPowerCheck(checkFunction, superPowerInfo, skip, onSkipObject)
}

export const useQuestionInfoSuperPowerCheck = (checkFunction, superPowerInfo, status) => {
  const onSkipObject = { canBeUsed: false, message: 'Moc może być użyta tylko w wyborze pytania.' }
  const skip = status !== EXPEDITION_STATUS.CHOOSE

  return useSuperPowerCheck(checkFunction, superPowerInfo, skip, onSkipObject)
}
