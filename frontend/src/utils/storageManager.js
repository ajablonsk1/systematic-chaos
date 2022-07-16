import { AccountType } from './userRole'
import { getExpedition, parseJwt } from './Api'
import moment from 'moment'

export const isStudent = (user) => (user ? parseJwt(user.access_token).roles.includes(AccountType.STUDENT) : false)

export const getRemainingTime = (expeditionId) => {
  const startTime = moment(new Date(localStorage.getItem('startDate')))
  const now = moment()
  const timeToSolveTask = +getExpedition(expeditionId).timeToSolveTask // in seconds !
  const duration = Math.floor(moment.duration(now.diff(startTime)).asSeconds())
  return timeToSolveTask - duration
}

export const timer = (remainingTime) => moment.utc(remainingTime * 1000).format('mm:ss')

export const finishExpedition = () => {
  localStorage.removeItem('startDate')
}
