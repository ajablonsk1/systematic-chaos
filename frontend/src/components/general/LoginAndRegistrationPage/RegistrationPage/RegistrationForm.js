import React, { useEffect, useRef, useState } from 'react'
import { ErrorMessage, Field, Formik } from 'formik'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { FIELD_REQUIRED, HeroDescriptions, HeroImg, RegistrationLabelsAndTypes } from '../../../../utils/constants'
import { Description, Info } from './RegistrationStyle'
import { validateConfirmPassword, validateEmail, validateIndex, validatePassword } from './validators'
import { register } from '../../../../actions/auth'
import { AccountType, HeroType } from '../../../../utils/userRole'
import { connect } from 'react-redux'

function RegistrationForm(props) {
  const [errorMessage, setErrorMessage] = useState()
  const [isFetching, setIsFetching] = useState(false)
  const [character, setCharacter] = useState(HeroType.WARRIOR)
  const description = useRef(null)
  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    token: '',
    password: '',
    passwordRepeat: ''
  }
  if (props.isStudent) {
    initialValues.index = ''
    initialValues.heroType = ''
  }

  const changeCharacter = (event) => {
    setCharacter(event.target.value)
  }

  useEffect(() => {
    setErrorMessage(props.message)
  }, [props.message])

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors = {}
        if (!values.firstName) errors.firstName = FIELD_REQUIRED
        if (!values.lastName) errors.lastName = FIELD_REQUIRED
        if (!values.token) errors.token = FIELD_REQUIRED

        errors.email = validateEmail(values.email)
        errors.password = validatePassword(values.password)
        errors.passwordRepeat = validateConfirmPassword(values.password, values.passwordRepeat)

        if (props.isStudent) {
          errors.index = validateIndex(values.index)
        }

        // without this, errors contains keys with empty string which should not be considered errors
        Object.keys(errors).forEach((key) => {
          if (errors[key] === '') {
            delete errors[key]
          }
        })

        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        setIsFetching(true)
        values.accountType = props.isStudent ? AccountType.STUDENT : AccountType.PROFESSOR
        values.heroType = props.isStudent ? character : null
        const registerPromise = new Promise((resolve) => {
          resolve(props.dispatch(register(values)))
        })
        registerPromise
          .then(() => {
            setIsFetching(false)
          })
          .catch(() => {
            setIsFetching(false)
          })
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, values, errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row className='mx-auto'>
              {Object.keys(initialValues).map((key, idx) => (
                <Col className='form-group' md={6} key={idx}>
                  <h6>{RegistrationLabelsAndTypes[key][0]}</h6>
                  <>
                    {key === 'heroType' ? (
                      <div className='d-flex align-items-center'>
                        <Field
                          className='form-control'
                          as='select'
                          name='heroType'
                          onChange={changeCharacter}
                          value={character}
                        >
                          {/*//TODO: mapper and variable */}
                          <option id='warrior' value={HeroType.WARRIOR}>
                            Wojownik
                          </option>
                          <option id='wizard' value={HeroType.WIZARD}>
                            Czarodziej
                          </option>
                          <option id='priest' value={HeroType.PRIEST}>
                            Kapłan
                          </option>
                          <option id='rogue' value={HeroType.ROGUE}>
                            Łotrzyk
                          </option>
                        </Field>
                        <Info>i</Info>
                        <Description
                          ref={description}
                          style={{
                            display: 'none'
                          }}
                        >
                          {HeroDescriptions[character]}
                          <img src={HeroImg[character]} alt={character} />
                        </Description>
                      </div>
                    ) : (
                      <Field className='form-control' name={key} type={RegistrationLabelsAndTypes[key][1]} />
                    )}
                  </>

                  <ErrorMessage name={key} component='div'>
                    {(msg) => <div style={{ color: 'var(--font-color)' }}>{msg}</div>}
                  </ErrorMessage>
                </Col>
              ))}
              {errorMessage && (
                <p className={'text-center w-100'} style={{ color: 'red' }}>
                  {errorMessage}
                </p>
              )}
            </Row>
            <Row className='mt-4 d-flex justify-content-center'>
              <Col sm={12} className='d-flex justify-content-center mb-2'>
                <Button
                  type='submit'
                  disabled={isFetching}
                  style={{
                    backgroundColor: 'var(--button-green)',
                    borderColor: 'var(--button-green)',
                    width: '150px'
                  }}
                >
                  {isFetching ? (
                    <Spinner as='span' animation='border' size='sm' role='status' />
                  ) : (
                    <span>Załóż konto</span>
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  )
}

function mapStateToProps(state) {
  const { message } = state.message
  return { message }
}

export default connect(mapStateToProps)(RegistrationForm)
