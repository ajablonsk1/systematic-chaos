import { convertDateToStringInfo, getRemainingDate, parseJwt } from '../../utils/Api'
import { INVALID_DATE_MESSAGE } from '../../utils/constants'
import { commonInvalidObjects } from './storage/commonInvalidObjects'
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
  it.each(testInvalidTokens)('invalid token %s returns null', (token) => {
    //when
    const parsedToken = parseJwt(token.access_token)

    //then
    expect(parsedToken).toBeNull()
  })
  it.each(commonInvalidObjects)('invalid object %s returns null', (invalidObject) => {
    //when
    const parsedToken = parseJwt(invalidObject)

    //then
    expect(parsedToken).toBeNull()
  })
})

describe('getRemainingDate() tests', () => {
  it.each(testEndDates)('returns correct remaining time for dateMillis %s', (endDate) => {
    //when
    const remainingDate = getRemainingDate(endDate.dateMillis)

    //then
    expect(remainingDate).not.toEqual(INVALID_DATE_MESSAGE)
    expect(remainingDate.asDays()).toEqual(endDate.remainingDays)
  })
  it.each(testEndDates)('returns an INVALID_DATE_MESSAGE for date string %s', (endDate) => {
    //when
    const remainingDate = getRemainingDate(endDate.date)

    //then
    expect(remainingDate).toEqual(INVALID_DATE_MESSAGE)
  })
  it.each(testEndDates)('returns an INVALID_DATE_MESSAGE for date object %s', (endDate) => {
    //when
    const remainingDate = getRemainingDate(endDate.dateObject)

    //then
    expect(remainingDate).toEqual(INVALID_DATE_MESSAGE)
  })
  it.each(commonInvalidObjects)('returns an INVALID_DATE_MESSAGE for common invalid object %s', (invalidObject) => {
    //when
    const remainingDate = getRemainingDate(invalidObject)

    //then
    expect(remainingDate).toEqual(INVALID_DATE_MESSAGE)
  })
})

describe('convertDateToStringInfo() tests', () => {
  it.each(testEndDates)('returns correct date string from given dateMillis %s', (endDate) => {
    //when
    const stringInfo = convertDateToStringInfo(endDate.dateMillis)

    //then
    expect(stringInfo).not.toEqual(INVALID_DATE_MESSAGE)
    expect(stringInfo).toEqual(endDate.expectedStringInfo)
  })
  it.each(testEndDates)('returns an INVALID_DATE_MESSAGE for date string %s', (endDate) => {
    //when
    const stringInfo = convertDateToStringInfo(endDate.date)

    //then
    expect(stringInfo).toEqual(INVALID_DATE_MESSAGE)
  })
  it.each(testEndDates)('returns an INVALID_DATE_MESSAGE for date object %s', (endDate) => {
    //when
    const stringInfo = convertDateToStringInfo(endDate.dateObject)

    //then
    expect(stringInfo).toEqual(INVALID_DATE_MESSAGE)
  })

  it.each(commonInvalidObjects)('returns "Invalid date object given" for invalid objects given', (invalidObject) => {
    //when
    const stringInfo = convertDateToStringInfo(invalidObject)

    //then
    expect(stringInfo).toEqual(INVALID_DATE_MESSAGE)
  })
})
