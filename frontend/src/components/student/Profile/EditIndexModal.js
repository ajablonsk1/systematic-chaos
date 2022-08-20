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

function EditIndexModal(props) {
  const [validatorMessage, setValidatorMessage] = useState(null)
  const [isFetching, setIsFetching] = useState(false)

  const debounceValidation = debounce((event) => {
    setValidatorMessage(validateIndex(event.target.value))
  }, 300)

  const onIndexSubmit = () => {
    setIsFetching(true)
    // TODO: use endpoint here
    setIsFetching(false)
    props.setModalOpen(false)
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
        {!!validatorMessage && <p className={'text-danger text-center py-2 my-0'}>{validatorMessage}</p>}
      </ModalBody>
      <ModalFooter>
        <Button variant={'danger'} onClick={() => props.setModalOpen(false)}>
          Anuluj
        </Button>
        <Button variant={'success'} onClick={onIndexSubmit} disabled={validatorMessage !== ''}>
          {isFetching ? <Spinner animation={'border'} /> : <span>Zapisz</span>}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditIndexModal
