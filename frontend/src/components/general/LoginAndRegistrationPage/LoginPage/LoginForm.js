import React, { useState } from 'react'
import { Formik } from 'formik'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { FormCol } from '../FormCol'
import { login } from '../../../../actions/auth'
import { connect } from 'react-redux'
import { FIELD_REQUIRED, NOT_LOGGED_IN_ERROR } from '../../../../utils/constants'

function LoginForm(props) {
  const { dispatch } = props
  const [isFetching, setIsFetching] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validate={(values) => {
        const errors = {}
        if (!values.email) errors.email = FIELD_REQUIRED
        if (!values.password) errors.password = FIELD_REQUIRED
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        const registerPromise = new Promise((resolve) => {
          resolve(dispatch(login(values)))
        })
        registerPromise
          .then(() => {
            setIsFetching(false)
            setErrorMessage('')
          })
          .catch(() => {
            setIsFetching(false)
            setErrorMessage(NOT_LOGGED_IN_ERROR)
          })

        setSubmitting(false)
      }}
    >
      {({ isSubmitting, values, errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row className='mx-auto'>
              {FormCol('Email', 'email', 'email', 12, { errorColor: props.theme.danger })}
              {FormCol('Hasło', 'password', 'password', 12, { errorColor: props.theme.danger })}
            </Row>
            <Row className='mt-4 d-flex justify-content-center'>
              <Col sm={12} className='d-flex justify-content-center mb-2'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: props.theme.success,
                    borderColor: props.theme.success
                  }}
                >
                  {isFetching ? <Spinner as='span' animation='border' size='sm' role='status' /> : <span>Zaloguj</span>}
                </Button>
              </Col>
            </Row>
            {errorMessage && (
              <p className={'text-center mt-2'} style={{ color: props.theme.danger }}>
                {errorMessage}
              </p>
            )}
          </Container>
        </Form>
      )}
    </Formik>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(LoginForm)
