import { Modal, ModalBody, ModalFooter, Button } from 'react-bootstrap'

export function SuccessModal({ isSuccessModalOpen, setIsSuccessModalOpen, text, headerText }) {
  return (
    <Modal show={isSuccessModalOpen}>
      {headerText && (
        <Modal.Header>
          <Modal.Title>Zmiana zakończona.</Modal.Title>
        </Modal.Header>
      )}
      <ModalBody className={'text-center'}>{text}</ModalBody>
      <ModalFooter className={'justify-content-center'}>
        <Button variant={'success'} onClick={() => setIsSuccessModalOpen(false)}>
          Zakończ
        </Button>
      </ModalFooter>
    </Modal>
  )
}
