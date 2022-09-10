import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { Modal, ModalBody, ModalHeader, Row, Col, Button, Container, Form, Spinner } from 'react-bootstrap'
import {
  FIELD_REQUIRED,
  NONNEGATIVE_NUMBER,
  POSITIVE_NUMBER,
  SANE_MAP_FIELDCOUNT_LIMIT
} from '../../../../utils/constants'
import { FormCol } from '../../../general/LoginAndRegistrationPage/FormCol'
import ChapterService from '../../../../services/chapter.service'
import { SuccessModal } from '../../SuccessModal'
import { BackgroundImagePicker } from './BackgroundImagePicker'

export function AddChapterModal({ showModal, setShowModal, refetchChapterList }) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [images, setImages] = useState(undefined)

  // we need this memo to avoid re-rendering the layout too many times
  //
  // why not useMemo? specifying dependencies which are scoped inside the formik call
  // is hard, and all of the approaches I've tried have failed - React.memo() which
  // updates the component only on shallow comparison dependency change should be enough
  const MemoBackgroundImagePicker = React.memo(BackgroundImagePicker)

  useEffect(() => {
    ChapterService.getChapterImagesList()
      .then((response) => {
        Promise.all(
          response.map((imageData) => {
            return ChapterService.getChapterImage({ imageId: imageData.id })
          })
        ).then((responseList) => {
          const convertedImages = responseList.map((fullImageData) => {
            return {
              id: fullImageData.id,
              url: 'data:image/png;base64, ' + fullImageData.file
            }
          })
          setImages(convertedImages)
        })
      })
      .catch({})
  }, [])

  return (
    images && (
      <>
        <Modal show={showModal} className={'modal-lg'}>
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
                if (values.sizeX < 1 || values.sizeX > SANE_MAP_FIELDCOUNT_LIMIT) errors.sizeX = POSITIVE_NUMBER
                if (values.sizeY < 1 || values.sizeY > SANE_MAP_FIELDCOUNT_LIMIT) errors.sizeY = POSITIVE_NUMBER
                if (values.imageId < 0) errors.imageId = NONNEGATIVE_NUMBER
                if (!values.imageId) errors.imageId = FIELD_REQUIRED
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
                    setErrorMessage('')
                    refetchChapterList()
                  })
                  .catch((errorMessage) => {
                    setSubmitting(false)
                    setErrorMessage(errorMessage)
                  })
              }}
            >
              {({ isSubmitting, values, errors, handleSubmit, setFieldValue }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <Container>
                      <Row className='mx-auto'>
                        {FormCol('Nazwa rozdziału', 'text', 'name', 12)}
                        <div className={'m-2'}></div>
                        {FormCol('Liczba kolumn', 'number', 'sizeX', 6, { min: 1 })}
                        {FormCol('Liczba wierszy', 'number', 'sizeY', 6, { min: 1 })}
                        <div className={'m-2'}></div>
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
                      <MemoBackgroundImagePicker
                        width={700}
                        cols={2}
                        images={images}
                        setFieldValue={setFieldValue}
                        pickedImage={values.imageId}
                      />
                    </Container>
                  </Form>
                )
              }}
            </Formik>
            {errorMessage && <p className={'text-center text-danger mt-2'}>{errorMessage}</p>}
          </ModalBody>
        </Modal>
        <SuccessModal
          isSuccessModalOpen={isSuccessModalOpen}
          setIsSuccessModalOpen={setIsSuccessModalOpen}
          text='Pomyślnie dodano nowy rozdział'
        />
      </>
    )
  )
}
