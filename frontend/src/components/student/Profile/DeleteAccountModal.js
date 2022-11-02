import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'react-bootstrap'
import { connect } from 'react-redux'
import StudentService from '../../../services/student.service'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../../actions/auth'
import { successToast } from '../../../utils/toasts'

function DeleteAccountModal(props) {
  const navigate = useNavigate()

  const deleteAccount = () => {
    StudentService.deleteAccount().then(() => {
      props.dispatch(logout(navigate))
      successToast('Konto zostało usunięte.')
    })
  }

  return (
    <Modal show={props.show} onHide={() => props.setModalOpen(false)}>
      <ModalHeader>
        <h5>Usunięcie konta</h5>
      </ModalHeader>
      <ModalBody>
        <p>Czy na pewno chcesz usunąć konto? Tej operacji nie można cofnąć. Utracisz cały postęp z gry.</p>
      </ModalBody>
      <ModalFooter>
        <Button
          style={{ backgroundColor: props.theme.warning, borderColor: props.theme.warning }}
          onClick={() => props.setModalOpen(false)}
        >
          Anuluj
        </Button>
        <Button
          style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
          onClick={deleteAccount}
        >
          Usuń
        </Button>
      </ModalFooter>
    </Modal>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(DeleteAccountModal)
