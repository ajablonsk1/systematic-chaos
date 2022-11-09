import React, { useCallback, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Button, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { GeneralRoutes } from '../../../../routes/PageRoutes'
import { MultiStepProgressBar } from './ResetPasswordFormStyle'
import { debounce } from 'lodash'
import { validateConfirmPassword, validateEmail, validatePassword } from '../RegistrationPage/validators'
import { AccountType } from '../../../../utils/userRole'
import { ALL_FIELDS_REQUIRED, FIELD_WITH_NAME_REQUIRED } from '../../../../utils/constants'

function ResetPasswordForm(props) {
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [codeValue, setCodeValue] = useState('')
  const [error, setError] = useState(undefined)

  const sendResetMail = () => {
    // TODO: send email to the appropriate endpoint (#1)
  }

  const resetPassword = () => {
    if (!passwordValue || !codeValue) {
      setError(ALL_FIELDS_REQUIRED)
    } else {
      // TODO: send code and password to the appropriate endpoint (#2)
    }
  }

  const FormButton = useCallback(
    ({ text, onClick, color = props.theme.success, width = 100, disabled = false }) => {
      return (
        <Button
          style={{ backgroundColor: color, borderColor: color, width: width }}
          disabled={disabled}
          onClick={onClick}
        >
          {text}
        </Button>
      )
    },
    [props.theme.success]
  )

  const ErrorMessage = useMemo(() => {
    return error ? (
      <p className={'py-3 text-center'} style={{ color: props.theme.danger }}>
        {error}
      </p>
    ) : null
  }, [error, props.theme.danger])

  const FirstStepForm = useMemo(() => {
    const onCancel = () => {
      navigate(GeneralRoutes.HOME)
    }

    const onInputChange = debounce((emailInput) => {
      const email = emailInput.target.value
      setEmailValue(email)
      setError(validateEmail(email, AccountType.NOT_LOGGED_IN))
    }, 200)

    return (
      <FormGroup className={'w-75 position-relative translate-middle-x start-50'}>
        <FormLabel className={'fw-bold'} style={{ color: props.theme.font }}>
          Email
        </FormLabel>
        <FormControl type={'email'} onChange={onInputChange} defaultValue={emailValue} />
        <FormText style={{ color: props.theme.font, display: 'block' }}>
          Na podany powyżej adres email zostanie wysłany mail umożliwiający reset hasła.
        </FormText>

        {ErrorMessage}

        <div className={'my-4 d-flex justify-content-center gap-2 '}>
          {FormButton({ text: 'Anuluj', onClick: onCancel, color: props.theme.danger })}
          {FormButton({
            text: 'Dalej',
            onClick: () => {
              setStep(1)
              sendResetMail()
            },
            disabled: !emailValue || !!error
          })}
        </div>
      </FormGroup>
    )
  }, [ErrorMessage, FormButton, emailValue, error, navigate, props.theme.danger, props.theme.font])

  const SecondStepForm = useMemo(() => {
    return (
      <>
        <p
          style={{ color: props.theme.font }}
          className={'text-center position-relative translate-middle-x start-50 w-75'}
        >
          Twój kod do resetu hasła zostanie wysłany na podany adres email. Jeżeli nie widzisz maila, sprawdź spam.
          Jeżeli w przeciągu 5min nie otrzymasz maila z kodem, kliknij przycisk "Wyślij ponownie email"
        </p>

        <div className={'my-4 d-flex justify-content-center gap-2 '}>
          {FormButton({ text: 'Wstecz', onClick: () => setStep(0), color: props.theme.danger })}
          {FormButton({
            text: 'Wyślij ponownie email',
            onClick: sendResetMail,
            color: props.theme.secondary,
            width: 200
          })}
          {FormButton({ text: 'Dalej', onClick: () => setStep(2) })}
        </div>
      </>
    )
  }, [FormButton, props.theme.danger, props.theme.font, props.theme.secondary])

  const ThirdStepForm = useMemo(() => {
    const onPasswordInputChange = debounce((passwordInput) => {
      const password = passwordInput.target.value
      setPasswordValue(password)
      if (error === ALL_FIELDS_REQUIRED && passwordValue && codeValue) {
        setError(undefined)
      } else {
        setError(validatePassword(password))
      }
    }, 200)

    const onConfirmPasswordInputChange = debounce((confirmPasswordInput) => {
      const confirmPassword = confirmPasswordInput.target.value
      setError(validateConfirmPassword(passwordValue, confirmPassword))
    })

    const onCodeInputChange = debounce((codeInput) => {
      const codeInputValue = codeInput.target.value
      setCodeValue(codeInputValue)
      if (!codeInputValue) {
        setError(FIELD_WITH_NAME_REQUIRED('Kod resetu hasła'))
      } else if (
        error === FIELD_WITH_NAME_REQUIRED('Kod resetu hasła') ||
        (error === ALL_FIELDS_REQUIRED && passwordValue)
      ) {
        setError(undefined)
      }
    })

    const Input = ({ label, type, onChange = null }) => (
      <div>
        <FormLabel className={'fw-bold'} style={{ color: props.theme.font }}>
          {label}
        </FormLabel>
        <FormControl type={type} onChange={onChange} />
      </div>
    )

    return (
      <FormGroup className={'w-75 position-relative translate-middle-x start-50'}>
        {Input({ label: 'Kod resetu hasła', type: 'text', onChange: onCodeInputChange })}
        {Input({ label: 'Nowe hasło', type: 'password', onChange: onPasswordInputChange })}
        {Input({ label: 'Powtórz nowe hasło', type: 'password', onChange: onConfirmPasswordInputChange })}
        {ErrorMessage}
        <div className={'my-4 d-flex justify-content-center gap-2 '}>
          {FormButton({ text: 'Wstecz', onClick: () => setStep(1), color: props.theme.danger })}
          {FormButton({
            text: 'Zmień hasło',
            onClick: resetPassword,
            width: 150
          })}
        </div>
      </FormGroup>
    )
    //eslint-disable-next-line
  }, [ErrorMessage, FormButton, error, passwordValue, props.theme.danger, props.theme.font])

  const formContents = [FirstStepForm, SecondStepForm, ThirdStepForm]

  return (
    <div>
      <MultiStepProgressBar $step={step} $accentColor={props.theme.font}>
        <div /> {/*helper - second circle*/}
      </MultiStepProgressBar>
      <>{formContents[step]}</>
    </div>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ResetPasswordForm)
