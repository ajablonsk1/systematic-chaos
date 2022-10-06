import React, { useEffect, useState } from 'react'
import { FormikProvider, useFormik } from 'formik'
import { FIELD_REQUIRED } from '../../../../utils/constants'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FormCol } from '../../../general/LoginAndRegistrationPage/FormCol'
import { connect } from 'react-redux'

function EditionForm(props) {
  const [editFormInitialValues, setEditFormInitialValues] = useState({})

  const formik = useFormik({
    initialValues: { name: '', pointsMin: '', pointsMax: '', description: '' },
    onSubmit: (values) => props.onSubmit(),
    validate: (values) => {
      const errors = {}
      Object.keys(editFormInitialValues).forEach((key) => {
        if (!values[key] && key !== 'icon') errors[key] = FIELD_REQUIRED
      })
      return errors
    }
  })

  const getFormData = (valueId, formColId) => {
    return Object.values(editFormInitialValues).map((value) => value[valueId])[formColId]
  }

  const getAdditionalOptions = (key) => {
    if (key === 'pointsMax' && formik.values.pointsMin) {
      return {
        min: +formik.values.pointsMin + 1
      }
    }
  }

  useEffect(() => {
    if (props.formVariant === 'RANKS') {
      setEditFormInitialValues({
        name: ['text', 'Nazwa rangi'],
        icon: ['file', 'Ikona dla rangi'],
        pointsMin: ['number', 'Dolna granica punktowa'],
        pointsMax: ['number', 'Górna granica punktowa']
      })
    } else if (props.formVariant === 'BADGES') {
      setEditFormInitialValues({
        name: ['text', 'Nazwa odznaki'],
        icon: ['file', 'Ikona dla odznaki'],
        description: ['textarea', 'Opis']
      })
    }
  }, [props.formVariant])

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Container>
          <Row className='mx-auto'>
            {Object.keys(editFormInitialValues).map((key, idx) => (
              <Col className='form-group' md={12} key={idx}>
                {FormCol(getFormData(1, idx), getFormData(0, idx), key, 12, {
                  ...getAdditionalOptions(key),
                  errorColor: props.theme.danger
                })}
              </Col>
            ))}
          </Row>
          <Row className='mt-4 d-flex justify-content-center'>
            <Col sm={12} className='d-flex justify-content-center mb-2'>
              <Button
                style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
                className={'me-3'}
                onClick={props.onCancel}
              >
                Anuluj
              </Button>
              <Button type='submit' style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}>
                Zapisz zmiany
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </FormikProvider>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(EditionForm)
