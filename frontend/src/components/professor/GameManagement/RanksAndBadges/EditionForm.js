import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FormikProvider, useFormik } from 'formik'
import { ERROR_OCCURRED, FIELD_REQUIRED } from '../../../../utils/constants'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { FormCol } from '../../../general/LoginAndRegistrationPage/FormCol'
import { connect } from 'react-redux'
import RankService from '../../../../services/rank.service'
import { successToast } from '../../../../utils/toasts'
import UserService from '../../../../services/user.service'

function EditionForm(props) {
  const [editFormInitialValues, setEditFormInitialValues] = useState({})
  const [chosenFile, setChosenFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const checkboxRef = useRef()

  const formik = useFormik({
    initialValues:
      props.formVariant === 'RANKS'
        ? { name: props.item.item.name ?? '', minPoints: props.item.item.minPoints ?? '' }
        : {
            title: props.item.item.title,
            description: props.item.item.description,
            customValue: props.item.item.value,
            forGroup: props.item.item.forGroup
          },

    onSubmit: (values) => {
      switch (props.formVariant) {
        case 'RANKS':
          RankService.editRank(
            props.item.item.rankId,
            values.name,
            values.minPoints,
            chosenFile ?? undefined,
            props.item.type
          )
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
          UserService.editBadge(
            values.title,
            values.description,
            chosenFile ?? undefined,
            values.customValue,
            checkboxRef.current?.checked,
            props.item.item.id
          )
            .then(() => {
              props.setModalOpen(false)
              successToast('Odznaka została edytowana pomyślnie.')
              props.onSuccess()
            })
            .catch((error) => {
              setErrorMessage(error.response?.data?.message ?? ERROR_OCCURRED)
            })
          break
        default:
          break
      }
    },
    validate: (values) => {
      const errors = {}
      Object.keys(editFormInitialValues).forEach((key) => {
        // null because 0 is a valid value
        if (values[key] == null && key !== 'image' && key !== 'forGroup') errors[key] = FIELD_REQUIRED
      })
      return errors
    }
  })

  useEffect(() => {
    if (props.formVariant === 'RANKS') {
      setEditFormInitialValues({
        name: ['text', 'Nazwa rangi'],
        minPoints: ['number', 'Dolna granica punktowa'],
        image: ['file', 'Ikona dla rangi']
      })
    } else if (props.formVariant === 'BADGES') {
      setEditFormInitialValues({
        title: ['text', 'Nazwa odznaki'],
        image: ['file', 'Ikona dla odznaki'],
        customValue: ['text', 'Wartość odblokowania'],
        description: ['textarea', 'Opis'],
        forGroup: ['checkbox', 'Zastosuj tylko dla grupy, do której należy student']
      })
    }
  }, [props.formVariant])

  const getFormCol = useCallback(
    (key, idx) => {
      const getFormData = (valueId, formColId) => {
        return Object.values(editFormInitialValues).map((value) => value[valueId])[formColId]
      }

      if (key === 'image') {
        return (
          <>
            <h6>{getFormData(1, idx)}</h6>
            <input
              name='file'
              type='file'
              onChange={(event) => {
                setErrorMessage(undefined)
                setChosenFile(event.currentTarget.files[0])
              }}
            />
          </>
        )
      }

      if (key === 'forGroup') {
        if (formik.initialValues.forGroup == null) {
          return null
        }
        return (
          <Form.Check
            ref={checkboxRef}
            className={'my-3'}
            label={getFormData(1, idx)}
            name={key}
            defaultChecked={!!formik.initialValues.forGroup}
          />
        )
      }

      return (
        <div className={'my-3'}>
          {FormCol(getFormData(1, idx), getFormData(0, idx), key, 12, {
            errorColor: props.theme.danger
          })}
        </div>
      )
    },
    [editFormInitialValues, formik.initialValues.forGroup, props.theme.danger]
  )

  return (
    <FormikProvider value={formik}>
      <Form onSubmit={formik.handleSubmit}>
        <Container>
          <Row className='mx-auto'>
            {Object.keys(editFormInitialValues).map((key, idx) => (
              <Col className='form-group' md={12} key={idx}>
                {getFormCol(key, idx)}
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
