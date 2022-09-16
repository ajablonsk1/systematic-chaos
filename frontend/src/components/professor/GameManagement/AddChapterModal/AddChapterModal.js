import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Button,
  Container,
  Form,
  Spinner,
  Card,
  Tabs,
  Tab
} from 'react-bootstrap'
import {
  FIELD_REQUIRED,
  NONNEGATIVE_NUMBER,
  NUMBER_FROM_RANGE,
  SANE_MAP_FIELDCOUNT_LIMIT
} from '../../../../utils/constants'
import { FormCol } from '../../../general/LoginAndRegistrationPage/FormCol'
import ChapterService from '../../../../services/chapter.service'
import { SuccessModal } from '../../SuccessModal'
import ImagesGallery from '../../../general/ImagesGallery/ImagesGallery'
import GameMapContainer from '../../../student/GameMapPage/GameMapContainer'
import { getGraphElements } from '../../../general/Graph/graphHelper'

const MAP_HEIGHT = 500
const MAP_WIDTH = 1.5 * MAP_HEIGHT

export function AddChapterModal({ showModal, setShowModal, refetchChapterList, isLoaded }) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [images, setImages] = useState(undefined)
  const [graphPreviewNode, setGraphPreviewNode] = useState({
    id: 0,
    position: { x: 0, y: 0 },
    label: '',
    size: Math.min(MAP_HEIGHT / 8, MAP_WIDTH / 10) / 5
  })

  const getGraphNodeDetails = (e) => {
    if (e.target.name === 'name') {
      setGraphPreviewNode({ ...graphPreviewNode, label: e.target.value })
    } else if (e.target.name === 'posX') {
      setGraphPreviewNode({ ...graphPreviewNode, position: { x: +e.target.value, y: graphPreviewNode.position.y } })
    } else if (e.target.name === 'posY') {
      setGraphPreviewNode({ ...graphPreviewNode, position: { y: +e.target.value, x: graphPreviewNode.position.x } })
    }
  }

  // we need this memo to avoid re-rendering the layout too many times
  //
  // why not useMemo? specifying dependencies which are scoped inside the formik call
  // is hard, and all of the approaches I've tried have failed - React.memo() which
  // updates the component only on shallow comparison dependency change should be enough
  const MemoImagesGallery = React.memo(ImagesGallery)

  useEffect(() => {
    if (isLoaded) {
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
        .catch(() => {})
    }
  }, [isLoaded])

  return (
    images && (
      <>
        <Modal show={showModal} size={'lg'} onHide={() => setShowModal(false)}>
          <ModalHeader>
            <h4 className={'text-center w-100'}>Dodaj nowy rozdział</h4>
          </ModalHeader>
          <ModalBody>
            <Tabs defaultActiveKey={'form'}>
              <Tab eventKey={'form'} title={'Formularz'} className={'pt-4'}>
                <Formik
                  initialValues={{
                    name: '',
                    sizeX: '',
                    sizeY: '',
                    posX: '',
                    posY: '',
                    imageId: ''
                  }}
                  validate={(values) => {
                    const errors = {}
                    if (!values.name) errors.chapterName = FIELD_REQUIRED
                    if (values.sizeX < 1 || values.sizeX > SANE_MAP_FIELDCOUNT_LIMIT)
                      errors.sizeX = NUMBER_FROM_RANGE(1, 10)
                    if (values.sizeY < 1 || values.sizeY > SANE_MAP_FIELDCOUNT_LIMIT)
                      errors.sizeY = NUMBER_FROM_RANGE(1, 10)
                    if (values.imageId < 0) errors.imageId = NONNEGATIVE_NUMBER
                    if (!values.imageId) errors.imageId = FIELD_REQUIRED
                    if (!values.posX || values.posX <= 0 || values.posX > 10) errors.posX = NUMBER_FROM_RANGE(1, 10)
                    if (!values.posY || values.posY <= 0 || values.posY > 8) errors.posY = NUMBER_FROM_RANGE(1, 8)
                    return errors
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    ChapterService.sendNewChapterData({
                      name: values.name,
                      sizeX: values.sizeX,
                      sizeY: values.sizeY,
                      imageId: values.imageId
                    })
                      .then(() => {
                        setSubmitting(false)
                        setShowModal(false)
                        setIsSuccessModalOpen(true)
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
                      <Form onSubmit={handleSubmit} onBlur={getGraphNodeDetails}>
                        <Container>
                          <Row className='mx-auto'>
                            {FormCol('Nazwa rozdziału', 'text', 'name', 12)}
                            <div className={'m-2'}></div>
                            {FormCol('Liczba kolumn', 'number', 'sizeX', 6, { min: 1 })}
                            {FormCol('Liczba wierszy', 'number', 'sizeY', 6, { min: 1 })}
                            <div className={'m-2'}></div>
                            {FormCol('Pozycja X', 'number', 'posX', 6)}
                            {FormCol('Pozycja Y', 'number', 'posY', 6)}
                            <div className={'m-2'}></div>
                          </Row>

                          <label className='pb-1'>Wybierz zdjęcie</label>
                          <Card className={'p-0'} style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <Card.Body>
                              <MemoImagesGallery
                                width={700}
                                images={images}
                                cols={4}
                                imagesWithId={true}
                                pickedImage={values.imageId}
                                setFieldValue={setFieldValue}
                              />
                            </Card.Body>
                          </Card>

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
                    )
                  }}
                </Formik>
                {errorMessage && <p className={'text-center text-danger mt-2'}>{errorMessage}</p>}
              </Tab>
              <Tab eventKey={'preview'} title={'Podgląd mapy gry'}>
                <GameMapContainer
                  elements={getGraphElements([graphPreviewNode])}
                  labels={[{ id: 0, label: graphPreviewNode.label }]}
                  customHeight={MAP_HEIGHT}
                  nodeClickCallback={() => {}}
                />
              </Tab>
            </Tabs>
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
