import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Overlay, Spinner, Tooltip } from 'react-bootstrap'
import JSONInput from 'react-json-editor-ajrm'
import locale from 'react-json-editor-ajrm/locale/en'
import { getConfigJson } from './mockData'
import { debounce } from 'lodash/function'

function GameLoader(props) {
  const jsonConfig = getConfigJson()

  const [editedJson, setEditedJson] = useState(undefined)
  const [isSending, setIsSending] = useState(false)
  const sendButtonRef = useRef()
  const [showTooltip, setShowTooltip] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)

  const editJsonObject = (e) => {
    setEditedJson(e.jsObject)
  }

  const sendJsonConfig = () => {
    setIsSending(true)
    if (editedJson) {
      // TODO: send json data to backend
      setIsSending(false)
      setShowTooltip(false)
      props.setShowModal(false)
      setSuccessModalVisible(true)
    } else {
      setShowTooltip(true)
      setIsSending(false)
    }
  }

  const debounceHideTooltip = useMemo(
    () =>
      debounce(() => {
        setShowTooltip(false)
      }, 5000),
    []
  )
  useEffect(() => {
    if (showTooltip) {
      debounceHideTooltip()
    }
  }, [showTooltip])

  return (
    <>
      <Overlay target={sendButtonRef.current} show={showTooltip} placement='right'>
        <Tooltip>
          Niemożliwe jest zapisanie ponieważ nie dokonano żadnych zmian lub zmiany nadal się zapisują. Spróbuj ponownie
          za chwilę
        </Tooltip>
      </Overlay>

      <Modal show={props.showModal} onHide={() => props.setShowModal(false)} size={'lg'}>
        <ModalHeader>
          <h4 className={'text-center w-100'}>Wczytaj stan gry</h4>
        </ModalHeader>
        <ModalBody>
          <JSONInput
            id='a_unique_id'
            placeholder={jsonConfig}
            locale={locale}
            height='550px'
            width={'100%'}
            style={{ body: { fontSize: '15px' } }}
            onKeyPressUpdate={false}
            onBlur={editJsonObject}
          />
        </ModalBody>
        <ModalFooter className={'d-flex justify-content-center'}>
          <Button variant={'danger'} onClick={() => props.setShowModal(false)}>
            Anuluj
          </Button>

          <Button variant={'success'} onClick={sendJsonConfig} disabled={isSending} ref={sendButtonRef}>
            {isSending ? <Spinner animation={'border'} /> : <span>Zapisz konfigurację</span>}
          </Button>
        </ModalFooter>
      </Modal>
      <Modal show={successModalVisible} onHide={() => setSuccessModalVisible(false)}>
        <ModalHeader>
          <h4 className={'text-center w-100'}>Wczytanie zakończone pomyślnie</h4>
        </ModalHeader>
        <ModalBody>
          <p>Twój plik konfiguracyjny został wczytany pomyślnie, a baza danych wypełniona podanymi danymi.</p>
        </ModalBody>
        <ModalFooter className={'d-flex justify-content-center'}>
          <Button variant={'success'} onClick={() => setSuccessModalVisible(false)}>
            Zakończ
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default GameLoader
