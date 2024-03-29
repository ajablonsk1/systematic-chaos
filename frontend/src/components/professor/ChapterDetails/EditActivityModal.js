import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner, Tab, Tabs } from 'react-bootstrap'
import JSONEditor from '../../general/jsonEditor/JSONEditor'
import { connect } from 'react-redux'
import ActivityService from '../../../services/activity.service'
import { ERROR_OCCURRED } from '../../../utils/constants'
import FileUpload from './AddActivity/FileUpload'

function EditActivityModal(props) {
  const [placeholderJson, setPlaceholderJson] = useState(undefined)
  const [isSending, setIsSending] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)

  const jsonEditorRef = useRef()

  useEffect(() => {
    setPlaceholderJson(props.jsonConfig)
  }, [props.jsonConfig])

  const sendJsonConfig = () => {
    setIsSending(true)
    const editedJson = jsonEditorRef.current?.getJson()

    ActivityService.setActivityEditData(props.activityId, props.activityType, editedJson)
      .then(() => {
        setIsSending(false)
        props.setShowModal(false)
        setSuccessModalVisible(true)
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message ?? ERROR_OCCURRED)
        setIsSending(false)
      })
  }

  return (
    <>
      <Modal show={props.showModal} onHide={() => props.setShowModal(false)} size={'lg'}>
        <ModalHeader>
          <h4 className={'text-center w-100'}>{props.modalHeader}</h4>
        </ModalHeader>
        <ModalBody>
          <Tabs defaultActiveKey={'editor'}>
            <p className={'fw-bold text-center'}>W polu "infoContent" możesz wpisywać tekst markdown.</p>
            <Tab eventKey={'editor'} title={'Tryb edycji'}>
              <JSONEditor ref={jsonEditorRef} jsonConfig={placeholderJson} />
            </Tab>
            <Tab eventKey={'file-upload'} title={'Dodawanie pliku'}>
              <FileUpload
                jsonToDownload={jsonEditorRef.current?.getJson()}
                setPlaceholderJson={setPlaceholderJson}
                activityType={props.activityType}
              />
            </Tab>
          </Tabs>
        </ModalBody>
        <ModalFooter className={'d-flex justify-content-center'}>
          <Button
            style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
            onClick={() => {
              props.setShowModal(false)
              setErrorMessage(null)
            }}
          >
            Anuluj
          </Button>

          <Button
            style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
            disabled={isSending}
            onClick={sendJsonConfig}
          >
            {isSending ? <Spinner animation={'border'} size={'sm'} /> : <span>Zapisz zmiany</span>}
          </Button>
        </ModalFooter>
        {errorMessage && (
          <p className={'text-center'} style={{ color: props.theme.danger }}>
            {errorMessage}
          </p>
        )}
      </Modal>
      <Modal show={successModalVisible} onHide={() => setSuccessModalVisible(false)}>
        <ModalHeader>
          <h4 className={'text-center w-100'}>Edycja zakończona pomyślnie</h4>
        </ModalHeader>
        <ModalBody>{props.successModalBody}</ModalBody>
        <ModalFooter className={'d-flex justify-content-center'}>
          <Button
            style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
            onClick={() => {
              setSuccessModalVisible(false)
              setErrorMessage(null)
              props.onSuccess()
            }}
          >
            Zakończ
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(EditActivityModal)
