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
import SuccessModal from '../../SuccessModal'
import ImagesGallery from '../../../general/ImagesGallery/ImagesGallery'
import GameMapContainer from '../../../student/GameMapPage/GameMapContainer'
import { getGraphElements } from '../../../general/Graph/graphHelper'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRefresh } from '@fortawesome/free-solid-svg-icons'
import FormikContext from '../../../general/FormikContext/FormikContext'
import { useCallback } from 'react'
import { connect } from 'react-redux'

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

function ChapterModal(props) {
  const { showModal, setShowModal, isLoaded, onSuccess, chapterDetails } = props
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [images, setImages] = useState(undefined)
  const [graphPreviewNode, setGraphPreviewNode] = useState({
    id: 0,
    position: { x: 0, y: 0 },
    label: '',
    size: Math.min(MAP_HEIGHT / 8, MAP_WIDTH / 10) / 5
  })
  const [activityValues, setActivityValues] = useState(EMPTY_INITIAL_VALUES)

  const modalTitle = chapterDetails ? 'Edytuj rozdział' : 'Dodaj nowy rozdział'
  const actionTitle = chapterDetails ? 'Zapisz zmiany' : 'Dodaj rozdział'
  const successText = chapterDetails ? 'Pomyślnie zmieniono dane rozdziału' : 'Pomyślnie dodano nowy rozdział'

  const formikContextRef = useRef()

  // we need this memo to avoid re-rendering the layout too many times
  //
  // why not useMemo? specifying dependencies which are scoped inside the formik call
  // is hard, and all of the approaches I've tried have failed - React.memo() which
  // updates the component only on shallow comparison dependency change should be enough
  const MemoImagesGallery = React.memo(ImagesGallery)

  const afterSendAction = useCallback(
    (setSubmitting) => {
      setSubmitting(false)
      setShowModal(false)
      setIsSuccessModalOpen(true)
      setErrorMessage('')
      if (onSuccess) {
        onSuccess()
      }
    },
    [onSuccess, setShowModal]
  )

  const sendAction = useCallback(
    (setSubmitting, editedValues, afterSendAction) => {
      if (!chapterDetails) {
        ChapterService.sendNewChapterData(editedValues)
          .then(() => afterSendAction(setSubmitting))
          .catch((error) => {
            setSubmitting(false)
            setErrorMessage(error.response.data.message)
          })
      } else {
        ChapterService.sendEditChapterData({ chapterId: chapterDetails.id, editionForm: editedValues })
          .then(() => afterSendAction(setSubmitting))
          .catch((error) => {
            setSubmitting(false)
            setErrorMessage(error.response.data.message)
          })
      }
    },
    [chapterDetails]
  )

  useEffect(() => {
    if (isLoaded) {
      if (chapterDetails) {
        const { name, mapSize, posX, posY, imageId } = chapterDetails
        const [sizeX, sizeY] = mapSize.split(' x ')

        setActivityValues({
          name: name,
          sizeX: +sizeX,
          sizeY: +sizeY,
          posX: posX,
          posY: posY,
          imageId: imageId
        })
      }
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
  }, [isLoaded, chapterDetails])

  const updateMap = () => {
    const labelValue = formikContextRef.current?.getValue('name')
    const positionX = formikContextRef.current?.getValue('posX')
    const positionY = formikContextRef.current?.getValue('posY')
    setGraphPreviewNode({ ...graphPreviewNode, label: labelValue, position: { x: positionX, y: positionY } })
  }

  return (
    images && (
      <>
        <Modal show={showModal} size={'lg'} onHide={() => setShowModal(false)}>
          <ModalHeader>
            <h4 className={'text-center w-100'}>{modalTitle}</h4>
          </ModalHeader>
          <ModalBody>
            <Tabs defaultActiveKey={'form'}>
              <Tab eventKey={'form'} title={'Formularz'} className={'pt-4'}>
                <Formik
                  initialValues={activityValues}
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
                    const editedValues = {
                      name: values.name,
                      sizeX: values.sizeX,
                      sizeY: values.sizeY,
                      imageId: values.imageId,
                      posX: values.posX,
                      posY: values.posY
                    }
                    sendAction(setSubmitting, editedValues, afterSendAction)
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
                              <Button
                                style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
                                className={'me-2'}
                                onClick={() => setShowModal(false)}
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
                {errorMessage && (
                  <p className={'text-center mt-2'} style={{ color: props.theme.danger }}>
                    {errorMessage}
                  </p>
                )}
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
          text={successText}
        />
      </>
    )
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}

export default connect(mapStateToProps)(ChapterModal)
