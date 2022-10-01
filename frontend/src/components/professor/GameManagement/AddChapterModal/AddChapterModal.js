import React, { useEffect, useRef, useState } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import FormikContext from '../../../general/FormikContext/FormikContext'

const MAP_HEIGHT = 500
const MAP_WIDTH = 1.5 * MAP_HEIGHT
const EMPTY_INITIAL_VALUES = {
  name: '',
  sizeX: '',
  sizeY: '',
  posX: '',
  posY: '',
  imageId: ''
}

export function AddChapterModal({ showModal, setShowModal, isLoaded, refetchChapterList, chapterDetails }) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [images, setImages] = useState(undefined)
  const [graphPreviewNode, setGraphPreviewNode] = useState({
    id: 0,
    position: { x: 0, y: 0 },
    label: '',
    size: Math.min(MAP_HEIGHT / 8, MAP_WIDTH / 10) / 5
  })

  const modalTitle = refetchChapterList ? 'Dodaj nowy rozdział' : 'Edytuj rozdział'
  const actionTitle = refetchChapterList ? 'Dodaj rozdział' : 'Zapisz zmiany'

  let currentActivityValues = null

  if (chapterDetails) {
    const { name, mapSize, posX, posY, imageId } = chapterDetails
    const [sizeX, sizeY] = mapSize.split(' x ')

    currentActivityValues = {
      name: name,
      sizeX: sizeX,
      sizeY: sizeY,
      posX: posX,
      posY: posY,
      imageId: imageId
    }
  }

  console.log({ showModal, setShowModal, isLoaded, refetchChapterList, chapterDetails })

  const formikContextRef = useRef()

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
            response?.map((imageData) => {
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

  const updateMap = () => {
    const labelValue = formikContextRef.current?.getValue('name')
    const positionX = formikContextRef.current?.getValue('posX')
    const positionY = formikContextRef.current?.getValue('posY')
    setGraphPreviewNode({ ...graphPreviewNode, label: labelValue, position: { x: positionX, y: positionY } })
  }

  return (
    images &&
    currentActivityValues !== undefined && (
      <>
        <Modal show={showModal} size={'lg'} onHide={() => setShowModal(false)}>
          <ModalHeader>
            <h4 className={'text-center w-100'}>{modalTitle}</h4>
          </ModalHeader>
          <ModalBody>
            <Tabs defaultActiveKey={'form'}>
              <Tab eventKey={'form'} title={'Formularz'} className={'pt-4'}>
                <Formik
                  initialValues={currentActivityValues ? currentActivityValues : EMPTY_INITIAL_VALUES}
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
                    if (!chapterDetails) {
                      ChapterService.sendNewChapterData({
                        name: values.name,
                        sizeX: values.sizeX,
                        sizeY: values.sizeY,
                        imageId: values.imageId,
                        posX: values.posX,
                        posY: values.posY
                      })
                        .then(() => {
                          setSubmitting(false)
                          setShowModal(false)
                          setIsSuccessModalOpen(true)
                          setErrorMessage('')
                          if (refetchChapterList) {
                            refetchChapterList()
                          }
                        })
                        .catch((error) => {
                          setSubmitting(false)
                          setErrorMessage(error.response.data.message)
                        })
                    }
                  }}
                >
                  {({ isSubmitting, values, handleSubmit, setFieldValue }) => {
                    return (
                      <Form onSubmit={handleSubmit}>
                        <FormikContext ref={formikContextRef} />
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
                                  <span>{actionTitle}</span>
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
                <FontAwesomeIcon icon={faRefresh} onClick={updateMap} style={{ cursor: 'pointer' }} />
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
