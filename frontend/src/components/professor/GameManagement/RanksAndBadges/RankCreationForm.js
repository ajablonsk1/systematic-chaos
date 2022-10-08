import React, { useState, useTransition } from 'react'
import { ERROR_OCCURRED, FIELD_REQUIRED, FILE_INPUT_REQUIRED } from '../../../../utils/constants'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { FormCol } from '../../../general/LoginAndRegistrationPage/FormCol'
import { Formik } from 'formik'
import RankService from '../../../../services/rank.service'
import { successToast } from '../../../../utils/toasts'
import { connect } from 'react-redux'

function RankCreationForm(props) {
  const [isFetching, startAddition] = useTransition()
  const [errorMessage, setErrorMessage] = useState(undefined)

  // Formik does not support field type input, so we have to do it manually
  const [chosenFile, setChosenFile] = useState(null)

  return (
    <Formik
      initialValues={{
        name: '',
        minPoints: ''
      }}
      validate={(values) => {
        const errors = {}
        if (!values.name) errors.name = FIELD_REQUIRED
        if (!values.minPoints) errors.minPoints = FIELD_REQUIRED
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        if (!chosenFile) {
          setErrorMessage(FILE_INPUT_REQUIRED)
        } else {
          startAddition(() => {
            RankService.addNewRank(values.name, values.minPoints, chosenFile, props.heroType)
              .then(() => {
                props.setModalOpen(false)
                successToast('Nowa ranga została dodana pomyślnie')
                props.onSuccess()
              })
              .catch((error) => {
                setErrorMessage(error.response?.data?.message ?? ERROR_OCCURRED)
              })

            setSubmitting(false)
          })
        }
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row className='mx-auto'>
              {FormCol('Nazwa rangi', 'text', 'name', 12, {
                errorColor: props.theme.danger
              })}
              {FormCol('Punktowa granica odblokowania', 'number', 'minPoints', 12, {
                errorColor: props.theme.danger
              })}
              <Col md={12}>
                <h6>Ikona dla rangi</h6>
                <input
                  name='file'
                  type='file'
                  onChange={(event) => {
                    setChosenFile(event.currentTarget.files[0])
                  }}
                />
              </Col>
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
                  {isFetching ? (
                    <Spinner as='span' animation='border' size='sm' role='status' />
                  ) : (
                    <span>Dodaj rangę</span>
                  )}
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
export default connect(mapStateToProps)(RankCreationForm)
