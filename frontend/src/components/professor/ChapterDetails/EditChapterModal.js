import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row, Spinner } from 'react-bootstrap'
import { FIELD_REQUIRED, POSITIVE_NUMBER } from '../../../utils/constants'
import { FormCol } from '../../general/LoginAndRegistrationPage/FormCol'
import { Formik } from 'formik'
import { SuccessModal } from '../GameManagement/SuccessModal'

function EditChapterModal(props) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  return (
    <>
      <Modal show={props.showModal} size={'lg'} centered>
        <Card>
          <Card.Header>
            <Card.Title>Edycja rozdziału</Card.Title>
          </Card.Header>
          <Card.Body>
            <Formik
              initialValues={{
                chapterName: '',
                chapterSizeX: '',
                chapterSizeY: '',
                points100: '',
                chapterConditions: []
              }}
              validate={(values) => {
                const errors = {}
                if (!values.chapterName) errors.chapterName = FIELD_REQUIRED
                if (!values.chapterSizeX) errors.chapterSizeX = POSITIVE_NUMBER
                if (!values.chapterSizeY) errors.chapterSizeY = POSITIVE_NUMBER
                if (!values.points100) errors.points100 = POSITIVE_NUMBER
                if (values.chapterConditions.length === 0) errors.chapterConditions = FIELD_REQUIRED
                return errors
              }}
              onSubmit={(values, { setSubmitting }) => {
                // TODO: send edit data to backend
                props.setModalOpen(false)
                setIsSuccessModalOpen(true)
                setSubmitting(false)
              }}
            >
              {({ isSubmitting, values, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <Container>
                    <Row className='mx-auto'>
                      {FormCol('Nazwa rozdziału', 'text', 'chapterName', 6)}
                      {FormCol('Liczba kolumn', 'number', 'chapterSizeX', 3, { min: 1 })}
                      {FormCol('Liczba wierszy', 'number', 'chapterSizeY', 3, { min: 1 })}
                      {FormCol('Punkty liczone jako 100%', 'number', 'points100', 4, { min: 1 })}
                      {FormCol('Warunki odblokowania kolejnego rozdziału', 'checkbox', 'chapterConditions', 8, {
                        options: [
                          { value: 'option1', name: 'Uczestnik musi zdobyć 50% punktów z liczonych jako 100%' },
                          { value: 'option2', name: 'Gdy minie data otwarcia kolejnego rozdziału' },
                          { value: 'option3', name: 'Option 1' },
                          { value: 'option4', name: 'Option 2' }
                        ]
                      })}
                    </Row>
                    <Row className='mt-4 d-flex justify-content-center'>
                      <Col sm={12} className='d-flex justify-content-center mb-2'>
                        <Button variant={'danger'} className={'me-2'} onClick={() => props.setModalOpen(false)}>
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
                          {isSubmitting ? (
                            <Spinner as='span' animation='border' size='sm' role='status' />
                          ) : (
                            <span>Zapisz zmiany</span>
                          )}
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Form>
              )}
            </Formik>
          </Card.Body>
        </Card>
      </Modal>
      <SuccessModal
        isSuccessModalOpen={isSuccessModalOpen}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
        text='Dane rozdziału zmieniono pomyślnie'
      />
    </>
  )
}

export default EditChapterModal
