import React, { useState } from 'react'
import { Button, Col, Container, Form, Modal, ModalBody, ModalFooter, ModalHeader, Row } from 'react-bootstrap'
import { FIELD_REQUIRED, NUMBER_FROM_RANGE } from '../../../utils/constants'
import { FormCol } from '../../general/LoginAndRegistrationPage/FormCol'
import { Formik } from 'formik'
import ProfessorService from '../../../services/professor.service'
import { connect } from 'react-redux'

function BonusPointsModal(props) {
  const [isFinishModalOpen, setIsFinishModalOpen] = useState(false)
  const [finishModalDescription, setFinishModalDescription] = useState(undefined)

  return (
    <>
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
              if (values.points === 0) errors.points = NUMBER_FROM_RANGE(1, 10)
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              ProfessorService.sendBonusPoints(props?.studentId, parseInt(values.points), values.reason, Date.now())
                .then(() => {
                  setFinishModalDescription('Proces przyznawania dodatkowych punktów zakończył się pomyślnie.')
                })
                .catch((error) => {
                  setFinishModalDescription(`Napotkano pewne problemy. Punkty nie zostały przyznane. <br/> ${error}`)
                })
              props.setModalOpen(false)
              setIsFinishModalOpen(true)
              setSubmitting(false)
            }}
          >
            {({ isSubmitting, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Container>
                  <Row className='mx-auto'>
                    {FormCol('Informacja zwrotna (opcjonalnie)', 'textarea', 'reason', 12, {
                      errorColor: props.theme.danger
                    })}
                    {FormCol('Punkty', 'number', 'points', 12, { errorColor: props.theme.danger })}
                  </Row>
                  <Row className='mt-4 d-flex justify-content-center'>
                    <Col sm={12} className='d-flex justify-content-center mb-2'>
                      <Button
                        className={'me-2'}
                        style={{
                          backgroundColor: props.theme.danger,
                          borderColor: props.theme.danger
                        }}
                        onClick={() => props.setModalOpen(false)}
                      >
                        Anuluj
                      </Button>
                      <Button
                        type='submit'
                        disabled={isSubmitting}
                        style={{
                          backgroundColor: props.theme.success,
                          borderColor: props.theme.success
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
      <Modal show={isFinishModalOpen} onHide={() => setFinishModalDescription(false)}>
        <ModalHeader>
          <h4 className={'text-center'}>Zakończono proces.</h4>
        </ModalHeader>
        <ModalBody>
          <p>{finishModalDescription}</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setIsFinishModalOpen(false)}>Zakończ</Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(BonusPointsModal)
