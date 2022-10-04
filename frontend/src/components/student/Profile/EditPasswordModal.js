import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import { Formik } from 'formik'
import {
  validateConfirmPassword,
  validatePassword
} from '../../general/LoginAndRegistrationPage/RegistrationPage/validators'
import { FormCol } from '../../general/LoginAndRegistrationPage/FormCol'
import AuthService from '../../../services/auth.service'
import { connect } from 'react-redux'

function EditPasswordModal(props) {
  const [errorMessage, setErrorMessage] = useState('')

  return (
    <Modal show={props.show} onHide={() => props.setModalOpen(false)}>
      <ModalHeader>
        <h5>Edycja hasła</h5>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{ password: '', passwordRepeat: '' }}
          validate={(values) => {
            const errors = {}
            errors.password = validatePassword(values.password)
            errors.passwordRepeat = validateConfirmPassword(values.password, values.passwordRepeat)

            // without this, errors contains keys with empty string which should not be considered errors
            Object.keys(errors).forEach((key) => {
              if (errors[key] === '') {
                delete errors[key]
              }
            })

            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            AuthService.editPassword(values.password).catch((error) => {
              setErrorMessage(error?.response?.data?.message)
            })
            props.setModalOpen(false)
            setSubmitting(false)
          }}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Container>
                <Row className='mx-auto'>
                  {FormCol('Nowe hasło', 'password', 'password')}
                  {FormCol('Powtórz hasło', 'password', 'passwordRepeat')}

                  {errorMessage && (
                    <p className={'text-center w-100'} style={{ color: 'red' }}>
                      {errorMessage}
                    </p>
                  )}
                </Row>
                <Row className='mt-4 d-flex justify-content-center'>
                  <Col sm={12} className='d-flex justify-content-center mb-2 gap-2'>
                    <Button
                      style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
                      onClick={() => props.setModalOpen(false)}
                    >
                      Anuluj
                    </Button>
                    <Button type='submit'>Zapisz</Button>
                  </Col>
                </Row>
              </Container>
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(EditPasswordModal)
