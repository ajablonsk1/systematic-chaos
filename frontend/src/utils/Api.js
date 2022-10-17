import moment from 'moment'
import 'moment/locale/pl'

export const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    console.log(e)
    return null
  }
}

export const getRemainingDate = (endDateString) => {
  if (endDateString === undefined) {
    return NaN
  }

  const today = moment(new Date())
  const endDate = moment(new Date(endDateString))

  // duration
  return moment.duration(endDate.diff(today))
}

export const convertDateToStringInfo = (endDate) => {
  if (!(endDate instanceof Date && isFinite(endDate))) {
    return 'Invalid date object given'
  }

  const duration = getRemainingDate(endDate)
  const days = Math.floor(duration.asDays())
  const stringFormat = moment.utc(duration.asSeconds() * 1000).format('HH:mm:ss')
  const splitString = stringFormat.split(':')

  return `${days} dni, ${splitString[0]} godz, ${splitString[1]} min`
}
