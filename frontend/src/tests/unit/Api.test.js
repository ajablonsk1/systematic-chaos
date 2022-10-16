import { parseJwt } from '../../utils/Api'
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
