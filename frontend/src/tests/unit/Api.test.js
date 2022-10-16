import { getRemainingDate, parseJwt } from '../../utils/Api'
import { testInvalidTokens, testProfessorTokens, testStudentTokens } from './testHelpers/tokens'

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
  const endDates = [
    {
      date: '2022-05-14T12:00:00.000Z',
      remainingDays: 1
    },
    {
      date: '2022-05-13T12:00:00.000Z',
      remainingDays: 0
    },
    {
      date: '2022-05-12T12:00:00.000Z',
      remainingDays: -1
    },
    {
      date: '2022-07-15T13:50:00.000Z',
      remainingDays: 63.076388888888886
    },
    {
      date: '2022-05-13T12:00:00.001Z',
      remainingDays: 1.1574074074074074e-8
    }
  ]

  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date('2022-05-13T12:00:00.000Z'))
  })

  it.each(endDates)('remaining time to date %s', (endDate) => {
    //when
    const remainingDate = getRemainingDate(endDate.date)

    //then
    expect(remainingDate.asDays()).toEqual(endDate.remainingDays)
  })
})
