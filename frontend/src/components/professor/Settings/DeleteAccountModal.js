import React, { useEffect, useState } from 'react'
import { Button, FormCheck, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import ProfessorService from '../../../services/professor.service'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { logout } from '../../../actions/auth'
import { successToast } from '../../../utils/toasts'
import { useNavigate } from 'react-router-dom'

function DeleteAccountModal(props) {
  const navigate = useNavigate()

  const [professorsList, setProfessorsList] = useState(undefined)
  const [selectedProfessorEmail, setSelectedProfessorEmail] = useState(undefined)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    ProfessorService.getProfessorsEmails()
      .then((response) => {
        setProfessorsList(response)
      })
      .catch(() => {
        setProfessorsList(null)
      })
  }, [])

  const deleteAccount = () => {
    ProfessorService.deleteAccount(selectedProfessorEmail).then(() => {
      props.dispatch(logout(navigate))
      successToast('Konto zostało usunięte.')
    })
  }

  return (
    <>
      <Modal show={props.show} onHide={() => props.setModalOpen(false)} size={'lg'}>
        <ModalHeader>
          <h5>Usunięcie konta</h5>
        </ModalHeader>
        <ModalBody>
          <p>
            Aby usunąć konto, musisz wybrać innego prowadzącego, który przejmie Twoje aktywności (m.in. sprawdzanie).
          </p>
          {professorsList === undefined ? (
            <Spinner animation={'border'} />
          ) : professorsList == null ? (
            <p>{ERROR_OCCURRED}</p>
          ) : (
            <FormGroup style={{ maxHeight: '60vh', overflow: 'auto' }}>
              {professorsList.map((professor) => (
                <FormCheck
                  key={professor}
                  type={'radio'}
                  value={professor}
                  label={professor}
                  checked={selectedProfessorEmail === professor}
                  onChange={() => setSelectedProfessorEmail(professor)}
                />
              ))}
            </FormGroup>
          )}
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
            onClick={() => {
              props.setModalOpen(false)
              setIsDeleteModalOpen(true)
            }}
            disabled={!selectedProfessorEmail}
          >
            Dalej
          </Button>
        </ModalFooter>
      </Modal>

      <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
        <ModalHeader>
          <h5>Potwierdzenie usunięcia.</h5>
        </ModalHeader>
        <ModalBody>
          <p>Czy na pewno chcesz usunąć konto? Tej operacji nie można cofnąć.</p>
        </ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: props.theme.warning, borderColor: props.theme.warning }}
            onClick={() => setIsDeleteModalOpen(false)}
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
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(DeleteAccountModal)
