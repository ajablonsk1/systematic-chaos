import { parseJwt } from '../../utils/Api'
import { testStudentTokens } from './testHelpers/tokens'

describe('parseJwt() tests', () => {
  it.each(testStudentTokens)('student token parsed correctly', (token) => {
    expect(parseJwt(token.access_token)).toEqual(token.token_data)
  })
})
