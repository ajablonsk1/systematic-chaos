import {
  validateConfirmPassword,
  validatePassword
} from '../../components/general/LoginAndRegistrationPage/RegistrationPage/validators'
import { DIFFERENT_PASSWORDS, FIELD_REQUIRED, PASSWORD_VALIDATION_ERROR } from '../../utils/constants'

describe('Password validator tests:', () => {
  it('should validate password for correct password', () => {
    // given
    const examplePassword = 'Ab1'

    // when
    const validatorMessage = validatePassword(examplePassword)

    //then
    expect(validatorMessage).toBe('')
  })
  it('should return FIELD_REQUIRED error for empty password string', () => {
    // given
    const examplePassword = ''

    // when
    const validatorMessage = validatePassword(examplePassword)

    // then
    expect(validatorMessage).toBe(FIELD_REQUIRED)
  })
  it('should return PASSWORD_VALIDATION_ERROR for incorrect password', () => {
    // given
    const examplePassword = 'password'

    // when
    const validatorMessage = validatePassword(examplePassword)

    // then
    expect(validatorMessage).toBe(PASSWORD_VALIDATION_ERROR)
  })
})

describe('Confirm password validator tests:', () => {
  it('should validate confirm password with success for identical passwords', () => {
    // given
    const examplePassword = 'Ab1'
    const exampleConfirmPassword = 'Ab1'

    // when
    const validatorMessage = validateConfirmPassword(examplePassword, exampleConfirmPassword)

    // then
    expect(validatorMessage).toBe('')
  })
  it('should return FIELD_REQUIRED error for empty password or confirmPassword string', () => {
    // given
    const examplePassword = ''
    const exampleConfirmPassword = 'password'

    // when
    const validatorMessage1 = validateConfirmPassword(examplePassword, exampleConfirmPassword)
    const validatorMessage2 = validateConfirmPassword(exampleConfirmPassword, examplePassword)

    // then
    expect(validatorMessage1).toBe(FIELD_REQUIRED)
    expect(validatorMessage2).toBe(FIELD_REQUIRED)
  })
  it('should return DIFFERENT_PASSWORDS error when passwords are different', () => {
    // given
    const examplePassword = 'Psw1'
    const exampleConfirmPassword = 'Psw2'

    // when
    const validatorMessage1 = validateConfirmPassword(examplePassword, exampleConfirmPassword)
    const validatorMessage2 = validateConfirmPassword(exampleConfirmPassword, examplePassword)

    // then
    expect(validatorMessage1).toBe(DIFFERENT_PASSWORDS)
    expect(validatorMessage2).toBe(DIFFERENT_PASSWORDS)
  })
})

describe('Email validator tests:', () => {})

describe('Index validator tests:', () => {})
