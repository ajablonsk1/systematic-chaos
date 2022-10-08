import React, { useEffect, useState } from 'react'
import { FormikProvider, useFormik } from 'formik'
import { ERROR_OCCURRED, FIELD_REQUIRED, FILE_INPUT_REQUIRED } from '../../../../utils/constants'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FormCol } from '../../../general/LoginAndRegistrationPage/FormCol'
import { connect } from 'react-redux'
import RankService from '../../../../services/rank.service'
import { successToast } from '../../../../utils/toasts'

function EditionForm(props) {
  const [editFormInitialValues, setEditFormInitialValues] = useState({})
  const [chosenFile, setChosenFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const formik = useFormik({
    initialValues: { name: props.item.item.name ?? '', minPoints: props.item.item.minPoints ?? '', description: '' },
    onSubmit: (values) => {
      if (!chosenFile) {
        setErrorMessage(FILE_INPUT_REQUIRED)
      } else {
        switch (props.formVariant) {
          case 'RANKS':
            RankService.editRank(props.item.item.rankId, values.name, values.minPoints, chosenFile, props.item.type)
              .then(() => {
                props.setModalOpen(false)
                successToast('Ranga została edytowana pomyślnie.')
                props.onSuccess()
              })
              .catch((error) => {
                setErrorMessage(error.response?.data?.message ?? ERROR_OCCURRED)
              })
            break
          case 'BADGES':
            break // TODO
          default:
            break
        }
      }
    },
    validate: (values) => {
      const errors = {}
      Object.keys(editFormInitialValues).forEach((key) => {
        if (!values[key] && key !== 'image') errors[key] = FIELD_REQUIRED
      })
      return errors
    }
  })

  const getFormData = (valueId, formColId) => {
    return Object.values(editFormInitialValues).map((value) => value[valueId])[formColId]
  }

  useEffect(() => {
    if (props.formVariant === 'RANKS') {
      setEditFormInitialValues({
        name: ['text', 'Nazwa rangi'],
        minPoints: ['number', 'Dolna granica punktowa'],
        image: ['file', 'Ikona dla rangi']
      })
    } else if (props.formVariant === 'BADGES') {
      setEditFormInitialValues({
        name: ['text', 'Nazwa odznaki'],
        image: ['file', 'Ikona dla odznaki'],
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
                {key !== 'image' ? (
                  FormCol(getFormData(1, idx), getFormData(0, idx), key, 12, {
                    errorColor: props.theme.danger
                  })
                ) : (
                  <>
                    <h6>{getFormData(1, idx)}</h6>
                    <input
                      name='file'
                      type='file'
                      onChange={(event) => {
                        setChosenFile(event.currentTarget.files[0])
                      }}
                    />
                  </>
                )}
              </Col>
            ))}
          </Row>
          <Row className='mt-4 d-flex justify-content-center'>
            <Col sm={12} className='d-flex justify-content-center mb-2'>
              <Button
                style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
                className={'me-3'}
                onClick={() => props.setModalOpen(false)}
              >
                Anuluj
              </Button>
              <Button type='submit' style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}>
                Zapisz zmiany
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
    </FormikProvider>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(EditionForm)
