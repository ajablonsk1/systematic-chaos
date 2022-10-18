import { Modal, ModalBody, ModalFooter, Button } from 'react-bootstrap'
import { connect } from 'react-redux'

function SuccessModal(props) {
  const { isSuccessModalOpen, setIsSuccessModalOpen, text, headerText } = props
  return (
    <Modal show={isSuccessModalOpen}>
      {headerText && (
        <Modal.Header>
          <Modal.Title>Zmiana zakończona.</Modal.Title>
        </Modal.Header>
      )}
      <ModalBody className={'text-center'}>{text}</ModalBody>
      <ModalFooter className={'justify-content-center'}>
        <Button
          style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
          onClick={() => setIsSuccessModalOpen(false)}
        >
          Zakończ
        </Button>
      </ModalFooter>
    </Modal>
  )
}

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(SuccessModal)
