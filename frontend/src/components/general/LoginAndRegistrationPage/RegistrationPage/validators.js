import { DIFFERENT_PASSWORDS, FIELD_REQUIRED, PASSWORD_VALIDATION_ERROR } from '../../../../utils/constants'

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

export const validateEmail = (email) => {
  const regexEmail =
    /^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/
  let error = ''

  if (!email) {
    error = FIELD_REQUIRED
  } else if (!regexEmail.test(email)) {
    error = 'Podaj poprawny adres email.'
  }
  return error
}

// index number may include D in the last position for PhD students, not important for us (I hope so)
export const validateIndex = (index) => {
  const numbersRegex = /^[0-9]+$/
  if (!index) return FIELD_REQUIRED
  else if (index.length !== 6) return 'Nr indeksu musi się składać z sześciu cyfr.'
  else if (!numbersRegex.test(index)) return 'Nr indeksu musi składać się z samych cyfr.'
  return ''
}
