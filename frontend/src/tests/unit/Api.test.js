import { convertSecondsToStringInfo, getRemainingDate, parseJwt } from '../../utils/Api'
import { testEndDates } from './storage/endDates'
import { testInvalidTokens, testProfessorTokens, testStudentTokens } from './storage/tokens'

// useFakeTimers does not work in describe-scope so we apply it to all tests in the file
// it does not change anything in them anyway
beforeAll(() => {
  jest.useFakeTimers().setSystemTime(new Date('2022-05-13T12:00:00.000Z'))
})

afterAll(() => {
  jest.useRealTimers()
})

describe('parseJwt() tests', () => {
  it.each(testStudentTokens)('student token %s parsed correctly', (token) => {
    //when
    const parsedToken = parseJwt(token.access_token)

    //then
    expect(parsedToken).toEqual(token.token_data)
  })
  it.each(testProfessorTokens)('professor token %s parsed correctly', (token) => {
    //when
    const parsedToken = parseJwt(token.access_token)

    //then
    expect(parsedToken).toEqual(token.token_data)
  })
  it.each(testInvalidTokens)('invalid token %s throws error', (token) => {
    //when
    const parsedToken = parseJwt(token.access_token)

    //then
    expect(parsedToken).toBeNull()
  })
})

describe('getRemainingDate() tests', () => {
  it.each(testEndDates)('returns correct remaining time to date %s', (endDate) => {
    //when
    const remainingDate = getRemainingDate(endDate.date)

    //then
    expect(remainingDate.asDays()).toEqual(endDate.remainingDays)
  })
})

describe('convertSecondsToStringInfo() tests', () => {
  it.each(testEndDates)('returns correct date from seconds %s', (endDate) => {
    //when
    const stringInfo = convertSecondsToStringInfo(endDate.date)

    //then
    expect(stringInfo).toEqual(endDate.expectedStringInfo)
  })
})
