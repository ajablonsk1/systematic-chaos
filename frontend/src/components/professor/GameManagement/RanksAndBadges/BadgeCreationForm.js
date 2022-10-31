import React, { useRef, useState, useTransition } from 'react'
import { Formik } from 'formik'
import { BadgeType, ERROR_OCCURRED, FIELD_REQUIRED, FILE_INPUT_REQUIRED } from '../../../../utils/constants'
import { successToast } from '../../../../utils/toasts'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { FormCol } from '../../../general/LoginAndRegistrationPage/FormCol'
import UserService from '../../../../services/user.service'
import { connect } from 'react-redux'

function BadgeCreationForm(props) {
  const [isFetching, startAddition] = useTransition()
  const [errorMessage, setErrorMessage] = useState(undefined)

  // Formik does not support field type input, so we have to do it manually
  const [chosenFile, setChosenFile] = useState(null)

  const checkboxRef = useRef()

  const addNewBadge = (values) => {
    UserService.addBadge(
      values.title,
      values.description,
      chosenFile,
      values.customValue,
      checkboxRef.current?.checked,
      values.type
    )
      .then(() => {
        props.setModalOpen(false)
        successToast('Nowa odznaka została dodana pomyślnie')
        props.onSuccess()
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message ?? ERROR_OCCURRED)
      })
  }

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        customValue: '',
        type: Object.keys(BadgeType)[0]
      }}
      validate={(values) => {
        const errors = {}
        if (!values.title) errors.title = FIELD_REQUIRED
        if (!values.description) errors.description = FIELD_REQUIRED
        if (!values.customValue) errors.customValue = FIELD_REQUIRED
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (!chosenFile) {
          setErrorMessage(FILE_INPUT_REQUIRED)
        } else {
          startAddition(() => {
            addNewBadge(values)
            setSubmitting(false)
          })
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row className='mx-auto'>
              {FormCol('Nazwa odznaki', 'text', 'title', 12, {
                errorColor: props.theme.danger
              })}
              {FormCol('Opis', 'textarea', 'description', 12, {
                errorColor: props.theme.danger
              })}
              {FormCol('Wartość odblokowująca', 'number', 'customValue', 12, {
                errorColor: props.theme.danger
              })}
              {FormCol('Typ odznaki', 'select', 'type', 12, {
                errorColor: props.theme.danger,
                options: Object.keys(BadgeType).map((key) => ({ name: key, value: key }))
              })}
              <Col md={12}>
                <h6>Ikona dla odznaki</h6>
                <input
                  name='file'
                  type='file'
                  onChange={(event) => {
                    setChosenFile(event.currentTarget.files[0])
                  }}
                />
              </Col>
              <Col md={12}>
                <Form.Check
                  ref={checkboxRef}
                  className={'my-3'}
                  label={'Zastosuj tylko dla grupy, do której należy student.'}
                  name={'forGroup'}
                />
              </Col>
            </Row>
            <Row className='mt-4 d-flex justify-content-center'>
              <Col sm={12} className='d-flex justify-content-center mb-2'>
                <Button
                  type='submit'
                  disabled={isFetching}
                  style={{
                    backgroundColor: props.theme.success,
                    borderColor: props.theme.success
                  }}
                >
                  {isFetching ? (
                    <Spinner as='span' animation='border' size='sm' role='status' />
                  ) : (
                    <span>Dodaj odznakę</span>
                  )}
                </Button>
              </Col>
            </Row>
            {errorMessage ? (
              <p className={'text-center mt-2'} style={{ color: props.theme.danger }}>
                {errorMessage}
              </p>
            ) : null}
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
export default connect(mapStateToProps)(BadgeCreationForm)
