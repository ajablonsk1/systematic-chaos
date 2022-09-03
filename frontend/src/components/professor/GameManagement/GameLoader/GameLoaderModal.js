import React, { useRef, useState } from 'react'
import { getConfigJson } from './mockData'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'react-bootstrap'
import JSONEditor from '../../../general/jsonEditor/JSONEditor'

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
          <Button variant={'danger'} onClick={() => props.setShowModal(false)}>
            Anuluj
          </Button>

          <Button variant={'success'} disabled={isSending} onClick={saveJson}>
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
          <Button variant={'success'} onClick={() => setSuccessModalVisible(false)}>
            Zakończ
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default GameLoaderModal
