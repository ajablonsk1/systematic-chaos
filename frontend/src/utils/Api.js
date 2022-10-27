import moment from 'moment'
import 'moment/locale/pl'
import { INVALID_DATE_MESSAGE } from './constants'

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getRemainingDate = (endDateGiven) => {
  if (typeof endDateGiven === 'number') {
    // duration
    const today = moment(new Date())
    const endDate = moment(new Date(endDateGiven))
    return moment.duration(endDate.diff(today))
  }
  return INVALID_DATE_MESSAGE
}

// we should ALWAYS get date as millis from back from what there currently is
// also we need to update the fetch as it relies on old api and will always show '-'
export const convertDateToStringInfo = (endDate) => {
  const duration = getRemainingDate(endDate)
  if (duration !== INVALID_DATE_MESSAGE) {
    const days = Math.floor(duration.asDays())
    const stringFormat = moment.utc(duration.asSeconds() * 1000).format('HH:mm:ss')
    const splitString = stringFormat.split(':')

    return `${days} dni, ${splitString[0]} godz, ${splitString[1]} min`
  }

  return INVALID_DATE_MESSAGE
}
