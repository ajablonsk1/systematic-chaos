import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Button, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { GeneralRoutes } from '../../../../routes/PageRoutes'
import { MultiStepProgressBar } from './ResetPasswordFormStyle'
import { debounce } from 'lodash'
import { validateEmail } from '../RegistrationPage/validators'
import { AccountType } from '../../../../utils/userRole'

function ResetPasswordForm(props) {
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [emailValue, setEmailValue] = useState('')
  const [error, setError] = useState(undefined)

  const firstStepForm = useMemo(() => {
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

        {error ? (
          <p className={'py-3 text-center'} style={{ color: props.theme.danger }}>
            {error}
          </p>
        ) : null}

        <div className={'my-4 d-flex justify-content-center gap-2 '}>
          <Button
            style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger, width: 100 }}
            onClick={onCancel}
          >
            Anuluj
          </Button>
          <Button
            style={{ backgroundColor: props.theme.success, borderColor: props.theme.success, width: 100 }}
            disabled={!emailValue || !!error}
            onClick={() => setStep(1)}
          >
            Dalej
          </Button>
        </div>
      </FormGroup>
    )
  }, [emailValue, error, navigate, props.theme.danger, props.theme.font, props.theme.success])

  const secondStepForm = useMemo(() => {
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
          <Button
            style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger, width: 100 }}
            onClick={() => setStep(0)}
          >
            Wstecz
          </Button>
          <Button
            style={{ backgroundColor: props.theme.secondary, borderColor: props.theme.secondary, width: 200 }}
            onClick={() => {
              /*TODO*/
            }}
          >
            Wyślij ponownie email
          </Button>
          <Button
            style={{ backgroundColor: props.theme.success, borderColor: props.theme.success, width: 100 }}
            onClick={() => setStep(2)}
          >
            Dalej
          </Button>
        </div>
      </>
    )
  }, [props.theme])

  const thirdStepForm = useMemo(() => {}, [])

  const formContents = [firstStepForm, secondStepForm, thirdStepForm]

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
