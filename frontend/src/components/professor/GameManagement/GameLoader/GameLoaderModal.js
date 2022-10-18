import React, { useRef, useState } from 'react'
import { getConfigJson } from './mockData'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'react-bootstrap'
import JSONEditor from '../../../general/jsonEditor/JSONEditor'
import { connect } from 'react-redux'

function GameLoaderModal(props) {
  const jsonConfig = getConfigJson()
  const [isSending, setIsSending] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const jsonEditorRef = useRef()

  const saveJson = () => {
    const editedJson = jsonEditorRef.current?.getJson()
    console.log(editedJson)

    setIsSending(true)
    // TODO: send config using endpoint
    setIsSending(false)
  }

  return (
    <>
      <Modal show={props.showModal} onHide={() => props.setShowModal(false)} size={'lg'}>
        <ModalHeader>
          <h4 className={'text-center w-100'}>Wczytaj konfigurację gry</h4>
        </ModalHeader>
        <ModalBody>
          <JSONEditor ref={jsonEditorRef} jsonConfig={jsonConfig} />
        </ModalBody>
        <ModalFooter className={'d-flex justify-content-center'}>
          <Button
            style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
            onClick={() => props.setShowModal(false)}
          >
            Anuluj
          </Button>

          <Button
            style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
            disabled={isSending}
            onClick={saveJson}
          >
            {isSending ? <Spinner animation={'border'} /> : <span>Zapisz zmiany</span>}
          </Button>
        </ModalFooter>
      </Modal>
      <Modal show={successModalVisible} onHide={() => setSuccessModalVisible(false)}>
        <ModalHeader>
          <h4 className={'text-center w-100'}>Edycja zakończona pomyślnie</h4>
        </ModalHeader>
        <ModalBody>{props.successModalBody}</ModalBody>
        <ModalFooter className={'d-flex justify-content-center'}>
          <Button
            style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
            onClick={() => setSuccessModalVisible(false)}
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
export default connect(mapStateToProps)(GameLoaderModal)
