import {
  validateConfirmPassword,
  validateEmail,
  validateIndex,
  validatePassword
} from '../../components/general/LoginAndRegistrationPage/RegistrationPage/validators'
import {
  DIFFERENT_PASSWORDS,
  FIELD_REQUIRED,
  INCORRECT_EMAIL,
  INDEX_WITH_CHARS,
  PASSWORD_VALIDATION_ERROR,
  WRONG_INDEX_LENGTH
} from '../../utils/constants'
import { AccountType } from '../../utils/userRole'

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

describe('Email validator tests:', () => {
  it('should return FIELD_REQUIRED error if email string is empty', () => {
    // given
    const exampleEmail = ''

    // when
    const validatorMessage1 = validateEmail(exampleEmail, AccountType.STUDENT)
    const validatorMessage2 = validateEmail(exampleEmail, AccountType.PROFESSOR)

    // then
    expect(validatorMessage1).toBe(FIELD_REQUIRED)
    expect(validatorMessage2).toBe(FIELD_REQUIRED)
  })
  it('should return INCORRECT_EMAIL error for bad email string', () => {
    // given
    const exampleEmail1 = 'testEmail'
    const exampleEmail2 = 'testEmail@'
    const exampleEmail3 = 'testEmail@test.'
    const exampleEmail4 = 'test@test.com'
    const exampleEmail5 = 'test@test.pl'
    const exampleEmail6 = 'test@agh.edu.pl.test.pl'
    const exampleEmail7 = '@agh.edu.pl'
    const exampleEmail8 = '123456@agh.edu.pl'

    // when
    const validatorMessage1 = validateEmail(exampleEmail1, AccountType.STUDENT)
    const validatorMessage2 = validateEmail(exampleEmail2, AccountType.PROFESSOR)
    const validatorMessage3 = validateEmail(exampleEmail3, AccountType.PROFESSOR)
    const validatorMessage4 = validateEmail(exampleEmail4, AccountType.STUDENT)
    const validatorMessage5 = validateEmail(exampleEmail5, AccountType.PROFESSOR)
    const validatorMessage6 = validateEmail(exampleEmail6, AccountType.STUDENT)
    const validatorMessage7 = validateEmail(exampleEmail7, AccountType.PROFESSOR)
    const validatorMessage8 = validateEmail(exampleEmail8, AccountType.STUDENT)

    // then
    expect(validatorMessage1).toBe(INCORRECT_EMAIL)
    expect(validatorMessage2).toBe(INCORRECT_EMAIL)
    expect(validatorMessage3).toBe(INCORRECT_EMAIL)
    expect(validatorMessage4).toBe(INCORRECT_EMAIL)
    expect(validatorMessage5).toBe(INCORRECT_EMAIL)
    expect(validatorMessage6).toBe(INCORRECT_EMAIL)
    expect(validatorMessage7).toBe(INCORRECT_EMAIL)
    expect(validatorMessage8).toBe(INCORRECT_EMAIL)
  })
  it('should validate email string correctly for agh domain emails', () => {
    // given
    const exampleEmail1 = 'student@student.agh.edu.pl'
    const exampleEmail2 = 'prof@agh.edu.pl'
    const exampleEmail3 = 'z1@agh.edu.pl'
    const exampleEmail4 = 'F2@student.agh.edu.pl'

    // when
    const validatorMessage1 = validateEmail(exampleEmail1, AccountType.STUDENT)
    const validatorMessage2 = validateEmail(exampleEmail2, AccountType.PROFESSOR)
    const validatorMessage3 = validateEmail(exampleEmail3, AccountType.PROFESSOR)
    const validatorMessage4 = validateEmail(exampleEmail4, AccountType.STUDENT)

    // then
    expect(validatorMessage1).toBe('')
    expect(validatorMessage2).toBe('')
    expect(validatorMessage3).toBe('')
    expect(validatorMessage4).toBe('')
  })
  it('should return INCORRECT_EMAIL error if user enter wrong email type', () => {
    // given
    const exampleEmail1 = 'student@student.agh.edu.pl'
    const exampleEmail2 = 'professor@agh.edu.pl'

    // when
    const validatorMessage1 = validateEmail(exampleEmail1, AccountType.PROFESSOR)
    const validatorMessage2 = validateEmail(exampleEmail2, AccountType.STUDENT)

    // then
    expect(validatorMessage1).toBe(INCORRECT_EMAIL)
    expect(validatorMessage2).toBe(INCORRECT_EMAIL)
  })
})

describe('Index validator tests:', () => {
  it('should return FIELD_REQUIRED error for empty index number string', () => {
    // given
    const exampleIndex = ''

    // when
    const validatorMessage1 = validateIndex(exampleIndex)

    // then
    expect(validatorMessage1).toBe(FIELD_REQUIRED)
  })
  it('should return WRONG_INDEX_LENGTH error for wrong index length', () => {
    // given
    const exampleIndex1 = '1'
    const exampleIndex2 = '1234'
    const exampleIndex3 = '1234567'

    // when
    const validatorMessage1 = validateIndex(exampleIndex1)
    const validatorMessage2 = validateIndex(exampleIndex2)
    const validatorMessage3 = validateIndex(exampleIndex3)

    // then
    expect(validatorMessage1).toBe(WRONG_INDEX_LENGTH)
    expect(validatorMessage2).toBe(WRONG_INDEX_LENGTH)
    expect(validatorMessage3).toBe(WRONG_INDEX_LENGTH)
  })
  it('should return INDEX_WITH_CHARS error when index includes any chars', () => {
    // given
    const exampleIndex1 = '12345a'
    const exampleIndex2 = 'a12345'
    const exampleIndex3 = '123a45'

    // when
    const validatorMessage1 = validateIndex(exampleIndex1)
    const validatorMessage2 = validateIndex(exampleIndex2)
    const validatorMessage3 = validateIndex(exampleIndex3)

    // then
    expect(validatorMessage1).toBe(INDEX_WITH_CHARS)
    expect(validatorMessage2).toBe(INDEX_WITH_CHARS)
    expect(validatorMessage3).toBe(INDEX_WITH_CHARS)
  })
  it('should validate index without errors for correct index number', () => {
    // given
    const exampleIndex = '123456'

    // when
    const validatorMessage = validateIndex(exampleIndex)

    // then
    expect(validatorMessage).toBe('')
  })
})
