import React from 'react'
import { Formik } from 'formik'
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { FormCol } from '../../general/LoginAndRegistrationPage/FormCol'
import { FIELD_REQUIRED } from '../../../utils/constants'
import GroupService from '../../../api/services/group.service'

export default function GroupAdditionForm(props) {
  return (
    // todo: think about general Form component that can be extended
    <Formik
      initialValues={{
        name: '',
        code: ''
      }}
      validate={(values) => {
        const errors = {}
        if (!values.name) errors.name = FIELD_REQUIRED
        if (!values.code) errors.code = FIELD_REQUIRED
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        GroupService.addGroup(values.name, values.code).then(() => {
          props.refreshFunction()
          props.setModalOpen(false)
        })

        setSubmitting(false)
      }}
    >
      {({ isSubmitting, values, errors, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row
              className='mx-auto'
              style={{
                width: '70%'
              }}
            >
              {FormCol('Nazwa grupy', 'text', 'name')}
              {FormCol('Kod grupy', 'text', 'code')}
            </Row>
            <Row className='mt-4 d-flex justify-content-center'>
              <Col sm={12} className='d-flex justify-content-center mb-2'>
                <Button variant={'danger'} className='me-3' onClick={() => props.setModalOpen(false)}>
                  Anuluj
                </Button>
                <Button
                  style={{ backgroundColor: 'var(--button-green)', border: 'none' }}
                  type='submit'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner as='span' animation='border' size='sm' role='status' /> : <span>Dodaj</span>}
                </Button>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  )
}
