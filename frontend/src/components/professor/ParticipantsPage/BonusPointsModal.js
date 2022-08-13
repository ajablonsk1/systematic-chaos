import React from 'react'
import { Button, Col, Container, Form, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap'
import { FIELD_REQUIRED, POSITIVE_NUMBER } from '../../../utils/constants'
import { FormCol } from '../../general/LoginAndRegistrationPage/FormCol'
import { Formik } from 'formik'

function BonusPointsModal(props) {
  return (
    <Modal show={props.show} onHide={() => props.setModalOpen(false)} size={'lg'}>
      <ModalHeader>
        <h4 className={'text-center w-100'}>Przyznaj dodatkowe punkty</h4>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            reason: 'Praca na zajęciach',
            points: ''
          }}
          validate={(values) => {
            const errors = {}
            if (!values.points) errors.points = FIELD_REQUIRED
            if (values.points === 0) errors.points = POSITIVE_NUMBER
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            // TODO: send values to backend
            props.setModalOpen(false)
            setSubmitting(false)
          }}
        >
          {({ isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Container>
                <Row className='mx-auto'>
                  {FormCol('Informacja zwrotna (opcjonalnie)', 'textarea', 'reason')}
                  {FormCol('Punkty', 'number', 'points')}
                </Row>
                <Row className='mt-4 d-flex justify-content-center'>
                  <Col sm={12} className='d-flex justify-content-center mb-2'>
                    <Button className={'mr-2'} variant={'danger'} onClick={() => props.setModalOpen(false)}>
                      Anuluj
                    </Button>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      style={{
                        backgroundColor: 'var(--button-green)',
                        borderColor: 'var(--button-green)'
                      }}
                    >
                      Przyznaj punkty
                    </Button>
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

export default BonusPointsModal
