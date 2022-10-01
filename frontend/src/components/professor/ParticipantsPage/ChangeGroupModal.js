import React, { useEffect, useState } from 'react'
import { Button, Card, Form, Modal, Spinner } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'
import Loader from '../../general/Loader/Loader'
import GroupService from '../../../api/services/group.service'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { SuccessModal } from '../SuccessModal'

function ChangeGroupModal(props) {
  const [student, setStudent] = useState()
  const [groups, setGroups] = useState([])
  const [newGroup, setNewGroup] = useState()
  const [isFetching, setIsFetching] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  useEffect(() => setStudent(props.student), [props.student])
  useEffect(() => {
    GroupService.getGroups()
      .then((response) => {
        setGroups([...response])
        setNewGroup(response?.find((group) => group.name === student?.groupName)) //defaultValue in select list
      })
      .catch(() => setGroups(null))
  }, [student])

  const selectGroup = (event) => {
    setNewGroup(groups.find((group) => group.name === event.target.value))
  }

  const submitChange = () => {
    setIsFetching(true)
    GroupService.changeStudentGroup(student?.id, newGroup?.id)
      .then(() => {
        setIsFetching(false)
        props.setModalOpen(false)
        setSuccessModalOpen(true)
      })
      .catch(() => {
        setIsFetching(false)
      })
  }

  return (
    <>
      <Modal show={props.show}>
        <Card>
          <CardHeader className={'text-center'}>
            <Card.Title>Zmiana grupy</Card.Title>
            <p>Zmień grupę wybranego studenta wybierając jego nową grupę z poniższej listy</p>
          </CardHeader>
          {!student || groups === undefined ? (
            <Loader />
          ) : (
            <>
              <Card.Body>
                {groups == null ? (
                  <p className={'text-center text-danger h6'}>{ERROR_OCCURRED}</p>
                ) : (
                  <>
                    <h6>
                      Wybrany student: {student?.firstName} {student?.lastName}
                    </h6>
                    <Form>
                      <span>Przypisz do grupy: </span>
                      <select defaultValue={student?.groupName} onChange={selectGroup}>
                        {groups.map((group) => (
                          <option key={group.id} value={group.name}>
                            {group.name}
                          </option>
                        ))}
                      </select>
                    </Form>{' '}
                  </>
                )}
              </Card.Body>
              <Card.Footer className={'d-flex justify-content-center align-items-center'}>
                <Button onClick={() => props.setModalOpen(false)} variant={'danger'}>
                  Anuluj
                </Button>
                <Button style={{ backgroundColor: 'var(--button-green)' }} className={'ms-2'} onClick={submitChange}>
                  {isFetching ? <Spinner animation={'border'} size={'sm'} /> : <span>Zapisz</span>}
                </Button>
              </Card.Footer>
            </>
          )}
        </Card>
      </Modal>
      <SuccessModal
        isSuccessModalOpen={successModalOpen}
        setIsSuccessModalOpen={setSuccessModalOpen}
        text={`Grupa studenta ${student?.firstName} ${student?.lastName}
          została zmieniona pomyślnie z ${student?.groupName} na ${newGroup?.name}`}
        headerText='Zmiana zakończona'
      />
    </>
  )
}

export default ChangeGroupModal
