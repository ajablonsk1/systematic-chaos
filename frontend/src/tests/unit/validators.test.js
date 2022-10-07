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
  const incorrectEmails = [
    'testEmail',
    'testEmail@',
    'testEmail@test.',
    'test@test.com',
    'test@agh.edu.pl.test.pl',
    '@agh.edu.pl',
    '123456@agh.edu.pl'
  ]
  const correctStudentEmails = ['student@student.agh.edu.pl', 'F2@student.agh.edu.pl']
  const correctProfessorEmails = ['prof@agh.edu.pl', 'z1@agh.edu.pl']

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
  it.each(incorrectEmails)('should return INCORRECT_EMAIL error for %s', (email) => {
    // when
    const validatorMessage1 = validateEmail(email, AccountType.STUDENT)
    const validatorMessage2 = validateEmail(email, AccountType.PROFESSOR)

    // then
    expect(validatorMessage1).toBe(INCORRECT_EMAIL)
    expect(validatorMessage2).toBe(INCORRECT_EMAIL)
  })
  it.each(correctStudentEmails)('should validate student email %s correctly', (email) => {
    // when
    const validatorMessage = validateEmail(email, AccountType.STUDENT)

    // then
    expect(validatorMessage).toBe('')
  })
  it.each(correctProfessorEmails)('should validate professor email %s correctly', (email) => {
    // when
    const validatorMessage = validateEmail(email, AccountType.PROFESSOR)

    // then
    expect(validatorMessage).toBe('')
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
  const wrongLengthIndexes = ['1', '1234', '1234567']
  const indexesWithChars = ['12345a', 'a12345', '123a45']

  it('should return FIELD_REQUIRED error for empty index number string', () => {
    // given
    const exampleIndex = ''

    // when
    const validatorMessage1 = validateIndex(exampleIndex)

    // then
    expect(validatorMessage1).toBe(FIELD_REQUIRED)
  })
  it.each(wrongLengthIndexes)('should return WRONG_INDEX_LENGTH error for index %s', (index) => {
    // when
    const validatorMessage = validateIndex(index)

    // then
    expect(validatorMessage).toBe(WRONG_INDEX_LENGTH)
  })
  it.each(indexesWithChars)('should return INDEX_WITH_CHARS error for index %s', (index) => {
    // when
    const validatorMessage = validateIndex(index)

    // then
    expect(validatorMessage).toBe(INDEX_WITH_CHARS)
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
