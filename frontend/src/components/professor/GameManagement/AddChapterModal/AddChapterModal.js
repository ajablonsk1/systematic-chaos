import { useState } from 'react'
import { Formik } from 'formik'
import { Modal, ModalBody, ModalHeader, Row, Col, Button, Container, Form, Spinner } from 'react-bootstrap'
import { FIELD_REQUIRED, NONNEGATIVE_NUMBER, POSITIVE_NUMBER } from '../../../../utils/constants'
import { FormCol } from '../../../general/LoginAndRegistrationPage/FormCol'
import ChapterService from '../../../../services/chapter.service'
import { SuccessModal } from '../../SuccessModal'

export function AddChapterModal({ showModal, setShowModal }) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  return (
    <>
      <Modal show={showModal}>
        <ModalHeader>
          <h4 className={'text-center w-100'}>Dodaj nowy rozdział</h4>
        </ModalHeader>
        <ModalBody>
          <Formik
            initialValues={{
              name: '',
              sizeX: '',
              sizeY: '',
              imageId: ''
            }}
            validate={(values) => {
              const errors = {}
              if (!values.name) errors.chapterName = FIELD_REQUIRED
              if (values.sizeX < 1) errors.chapterSizeX = POSITIVE_NUMBER
              if (values.sizeY < 1) errors.chapterSizeY = POSITIVE_NUMBER
              if (values.imageId < 0) errors.imageId = NONNEGATIVE_NUMBER
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              ChapterService.sendNewChapterData({
                name: values.name,
                sizeX: values.sizeX,
                sizeY: values.sizeY,
                imageId: values.imageId
              })
                .then((response) => {
                  setShowModal(false)
                  setIsSuccessModalOpen(true)
                  setSubmitting(false)
                })
                .catch(() => {})
            }}
          >
            {({ isSubmitting, values, errors, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Container>
                  <Row className='mx-auto'>
                    {FormCol('Nazwa rozdziału', 'text', 'name', 12)}
                    {FormCol('Liczba kolumn', 'number', 'sizeX', 6, { min: 1 })}
                    {FormCol('Liczba wierszy', 'number', 'sizeY', 6, { min: 1 })}
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
      <SuccessModal
        isSuccessModalOpen={isSuccessModalOpen}
        setIsSuccessModalOpen={setIsSuccessModalOpen}
        text='Pomyślnie dodano nowy rozdział'
      />
    </>
  )
}
