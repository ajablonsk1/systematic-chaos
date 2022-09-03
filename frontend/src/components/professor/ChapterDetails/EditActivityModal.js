import React, { useRef, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'react-bootstrap'
import JSONEditor from '../../general/jsonEditor/JSONEditor'

function EditActivityModal(props) {
  const [isSending, setIsSending] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)
  const jsonEditorRef = useRef()

  const sendJsonConfig = () => {
    const editedJson = jsonEditorRef.current?.getJson()
    console.log(editedJson)

    setIsSending(true)
    // TODO: send config using endpoint
    setIsSending(false)

    // only if sending was successful:
    setSuccessModalVisible(true)
  }

  return (
    <>
      <Modal show={props.showModal} onHide={() => props.setShowModal(false)} size={'lg'}>
        <ModalHeader>
          <h4 className={'text-center w-100'}>{props.modalHeader}</h4>
        </ModalHeader>
        <ModalBody>
          <JSONEditor ref={jsonEditorRef} jsonConfig={props.jsonConfig} />
        </ModalBody>
        <ModalFooter className={'d-flex justify-content-center'}>
          <Button variant={'danger'} onClick={() => props.setShowModal(false)}>
            Anuluj
          </Button>

          <Button variant={'success'} disabled={isSending} onClick={sendJsonConfig}>
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

export default EditActivityModal
