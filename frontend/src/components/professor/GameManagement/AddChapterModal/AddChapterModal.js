import { useEffect, useState } from 'react'
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
import GridLayout from 'react-grid-layout'
import { ImageContainer } from '../../../general/ImagesGallery/ImagesGalleryStyle'

const IMAGE_SELECT_COLUMNS = 3
const IMAGE_SELECT_ROW_HEIGHT = 300
const IMAGE_HEIGHT = 200
const IMAGE_WIDTH = 300
export function AddChapterModal({ showModal, setShowModal, refetchChapterList }) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [layout, setLayout] = useState(undefined)
  const [imagesHeight, setImagesHeight] = useState([])
  const images = [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wikipe-tan_full_length.svg/800px-Wikipe-tan_full_length.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wikipe-tan_full_length.svg/800px-Wikipe-tan_full_length.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wikipe-tan_full_length.svg/800px-Wikipe-tan_full_length.svg.png',
    'https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png'
  ]

  useEffect(() => {
    //change to props

    const images = [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wikipe-tan_full_length.svg/800px-Wikipe-tan_full_length.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wikipe-tan_full_length.svg/800px-Wikipe-tan_full_length.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Wikipe-tan_full_length.svg/800px-Wikipe-tan_full_length.svg.png',
      'https://upload.wikimedia.org/wikipedia/commons/1/1f/Wiki-sisters.png'
    ]
    setImagesHeight(Array(images.length).fill(0))

    const layoutConfig = images.map((url, index) => {
      const rowNumber = Math.floor(index / IMAGE_SELECT_COLUMNS)

      return {
        i: index.toString(),
        x: index % IMAGE_SELECT_COLUMNS,
        y: index >= IMAGE_SELECT_COLUMNS ? IMAGE_HEIGHT + rowNumber : 0,
        w: 1,
        h: Math.ceil(IMAGE_HEIGHT / IMAGE_SELECT_ROW_HEIGHT)
      }
    })

    setLayout(layoutConfig)
  }, [])

  return (
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
            {({ isSubmitting, values, errors, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Container>
                  <Row className='mx-auto'>
                    {FormCol('Nazwa rozdziału', 'text', 'name', 12)}
                    <div className={'m-2'}></div>
                    {FormCol('Liczba kolumn', 'number', 'sizeX', 6, { min: 1 })}
                    {FormCol('Liczba wierszy', 'number', 'sizeY', 6, { min: 1 })}
                    <div className={'m-2'}></div>
                    {FormCol('Id obrazu', 'number', 'imageId', 12, { min: 0 })}
                  </Row>
                  <Row>
                    {layout && (
                      <GridLayout
                        cols={IMAGE_SELECT_COLUMNS}
                        className='layout'
                        layout={layout}
                        width={IMAGE_WIDTH * 2}
                        rowHeight={IMAGE_SELECT_ROW_HEIGHT}
                        isDraggable={false}
                      >
                        {images.map((url, index) => (
                          <ImageContainer key={index.toString()}>
                            <img
                              className={'p-3'}
                              width={'100%'}
                              height={'100%'}
                              src={url}
                              alt={'info-task-attachment'}
                            />
                          </ImageContainer>
                        ))}
                      </GridLayout>
                    )}
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
}
