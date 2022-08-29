import { useState } from 'react'
import { Formik } from 'formik'
import { Modal, ModalBody, ModalHeader, Row, Col, Button, Container, Form, Spinner } from 'react-bootstrap'
import { FIELD_REQUIRED, NONNEGATIVE_NUMBER, POSITIVE_NUMBER } from '../../../../utils/constants'
import { FormCol } from '../../../general/LoginAndRegistrationPage/FormCol'
import ProfessorService from '../../../../services/professor.service'
export function AddChapterModal({ showModal, setShowModal }) {
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  return (
    <Modal show={showModal}>
      <ModalHeader>
        <h4 className={'text-center w-100'}>Dodaj nowy rozdział</h4>
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            chapterName: '',
            chapterSizeX: '',
            chapterSizeY: '',
            imageId: ''
          }}
          validate={(values) => {
            const errors = {}
            if (!values.chapterName) errors.chapterName = FIELD_REQUIRED
            if (values.chapterSizeX < 1) errors.chapterSizeX = POSITIVE_NUMBER
            if (values.chapterSizeY < 1) errors.chapterSizeY = POSITIVE_NUMBER
            if (values.imageId < 0) errors.imageId = NONNEGATIVE_NUMBER
            return errors
          }}
          onSubmit={(values, { setSubmitting }) => {
            // TODO: send edit data to backend
            ProfessorService.sendNewChapterData(...values)
              .then((response) => {
                console.log(response)
                // setShowModal(false)
                // setSuccessModalOpen(true)
                // setSubmitting(false)
              })
              .catch()
          }}
        >
          {({ isSubmitting, values, errors, handleSubmit }) => (
            <Form onSubmit={() => {}}>
              <Container>
                <Row className='mx-auto'>
                  {FormCol('Nazwa rozdziału', 'text', 'chapterName', 12)}
                  {FormCol('Liczba kolumn', 'number', 'chapterSizeX', 6, { min: 1 })}
                  {FormCol('Liczba wierszy', 'number', 'chapterSizeY', 6, { min: 1 })}
                  {FormCol('Id obrazu', 'number', 'imageId', 12, { min: 0 })}
                </Row>
                <Row className='mt-4 d-flex justify-content-center'>
                  <Col sm={12} className='d-flex justify-content-center mb-2'>
                    <Button variant={'danger'} className={'me-2'} onClick={() => setShowModal(false)}>
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
                        <span>Dodaj rozdział</span>
                      )}
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
