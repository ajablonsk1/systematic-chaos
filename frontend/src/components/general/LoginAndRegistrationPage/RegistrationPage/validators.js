import {
  DIFFERENT_PASSWORDS,
  FIELD_REQUIRED,
  INCORRECT_EMAIL,
  INDEX_WITH_CHARS,
  PASSWORD_VALIDATION_ERROR,
  WRONG_INDEX_LENGTH
} from '../../../../utils/constants'
import { AccountType } from '../../../../utils/userRole'

export const validatePassword = (values) => {
  let error = ''
  const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{1,}$/
  if (!values) {
    error = FIELD_REQUIRED
  } else if (!passwordRegex.test(values)) {
    error = PASSWORD_VALIDATION_ERROR
  }
  return error
}

export const validateConfirmPassword = (pass, value) => {
  let error = ''
  if (!value || !pass) {
    error = FIELD_REQUIRED
  } else if (pass && value) {
    if (pass !== value) {
      error = DIFFERENT_PASSWORDS
    }
  }
  return error
}

export const validateEmail = (email, accountType) => {
  const studentEmail = /[a-zA-Z](([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@student\.agh\.edu\.pl$/
  const professorEmail = /[a-zA-Z](([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@agh\.edu\.pl$/

  let error = ''

  if (!email) {
    error = FIELD_REQUIRED
  } else if (
    (!studentEmail.test(email) && !professorEmail.test(email)) ||
    (studentEmail.test(email) && accountType !== AccountType.STUDENT) ||
    (professorEmail.test(email) && accountType !== AccountType.PROFESSOR)
  ) {
    error = INCORRECT_EMAIL
  }
  return error
}

// index number may include D in the last position for PhD students, not important for us (I hope so)
export const validateIndex = (index) => {
  const numbersRegex = /^[0-9]+$/
  if (!index) {
    return FIELD_REQUIRED
  } else if (index.length !== 6) {
    return WRONG_INDEX_LENGTH
  } else if (!numbersRegex.test(index)) {
    return INDEX_WITH_CHARS
  }
  return ''
}
