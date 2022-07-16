import React from 'react'
import { Formik } from 'formik'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { FormCol } from '../FormCol'
import { login } from '../../../../actions/auth'
import { connect } from 'react-redux'
import { FIELD_REQUIRED } from '../../../../utils/constants'

function LoginForm(props) {
  const { dispatch } = props

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
        dispatch(login(values)) // that should be enough
        setSubmitting(false)
      }}
    >
      {({ isSubmitting, values, errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row className='mx-auto'>
              {FormCol('Email', 'email', 'email')}
              {FormCol('Hasło', 'password', 'password')}
            </Row>
            <Row className='mt-4 d-flex justify-content-center'>
              <Col sm={12} className='d-flex justify-content-center mb-2'>
                <Button
                  type='submit'
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: 'var(--button-green)',
                    borderColor: 'var(--button-green)'
                  }}
                >
                  {isSubmitting ? (
                    <Spinner as='span' animation='border' size='sm' role='status' />
                  ) : (
                    <span>Zaloguj</span>
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
  return {}
}
export default connect(mapStateToProps)(LoginForm)
