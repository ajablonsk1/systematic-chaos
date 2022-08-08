import { AccountType } from './userRole'
import { parseJwt } from './Api'
import moment from 'moment'

export const isStudent = (user) => (user ? parseJwt(user.access_token).roles.includes(AccountType.STUDENT) : false)

export const getTimer = (remainingTime) => moment.utc(remainingTime * 1000).format('mm:ss')
