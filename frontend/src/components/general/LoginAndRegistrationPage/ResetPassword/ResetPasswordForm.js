import React, { useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Button, FormControl, FormGroup, FormLabel, FormText } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { GeneralRoutes } from '../../../../routes/PageRoutes'
import { MultiStepProgressBar } from './ResetPasswordFormStyle'
import { debounce } from 'lodash'
import { validateEmail } from '../RegistrationPage/validators'
import { AccountType } from '../../../../utils/userRole'

// TODO: walidacja maila funkcją do walidacji
// TODO: wycentrowanie logo lub reszty - coś jest krzywo
// TODO: nierówne rozmiary przycisków

function ResetPasswordForm(props) {
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [emailValue, setEmailValue] = useState(undefined)
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
        <FormControl type={'email'} onChange={onInputChange} />
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
            onClick={() => setStep(2)}
          >
            Dalej
          </Button>
        </div>
      </FormGroup>
    )
  }, [emailValue, error, navigate, props.theme.danger, props.theme.font, props.theme.success])

  const secondStepForm = useMemo(() => {}, [])

  return (
    <div>
      <MultiStepProgressBar $step={step} $accentColor={props.theme.font} />
      {step === 1 ? firstStepForm : step === 2 ? secondStepForm : null}
    </div>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ResetPasswordForm)
