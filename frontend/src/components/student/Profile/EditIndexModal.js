import React, { useState } from 'react'
import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner
} from 'react-bootstrap'
import { validateIndex } from '../../general/LoginAndRegistrationPage/RegistrationPage/validators'
import { debounce } from 'lodash/function'
import StudentService from '../../../services/student.service'
import { connect } from 'react-redux'
import { successToast } from '../../../utils/toasts'

function EditIndexModal(props) {
  const [validatorMessage, setValidatorMessage] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [newIndexNumber, setNewIndexNumber] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const debounceValidation = debounce((event) => {
    setValidatorMessage(validateIndex(event.target.value))
    setNewIndexNumber(event.target.value)
  }, 300)

  const onIndexSubmit = () => {
    setIsFetching(true)
    StudentService.setIndexNumber(+newIndexNumber)
      .then((response) => {
        props.setIndexNumber(response)
        props.setModalOpen(false)
        setIsFetching(false)
        successToast('Numer indeksu został zmieniony.')
      })
      .catch((error) => {
        setIsFetching(false)
        setErrorMessage(error.response.data.message)
      })
  }

  return (
    <Modal show={props.show} onHide={() => props.setModalOpen(false)}>
      <ModalHeader>
        <h4>Edycja indeksu</h4>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <FormLabel>Podaj nowy numer indeksu</FormLabel>
          <FormControl type={'text'} size={'lg'} onChange={(e) => debounceValidation(e)} />
        </FormGroup>
        {!!validatorMessage && (
          <p className={'text-center py-2 my-0'} style={{ color: props.theme.danger }}>
            {validatorMessage}
          </p>
        )}
      </ModalBody>
      <ModalFooter>
        <Button
          style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
          onClick={() => props.setModalOpen(false)}
        >
          Anuluj
        </Button>
        <Button
          style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
          onClick={onIndexSubmit}
          disabled={validatorMessage !== ''}
        >
          {isFetching ? <Spinner animation={'border'} size='sm' /> : <span>Zapisz</span>}
        </Button>
      </ModalFooter>
      {errorMessage && (
        <p className={'text-center'} style={{ color: props.theme.danger }}>
          {errorMessage}
        </p>
      )}
    </Modal>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(EditIndexModal)
