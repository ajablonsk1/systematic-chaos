import React, { useState } from 'react'
import { Button, Card, Form, Modal, Spinner } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'
import Loader from '../../general/Loader/Loader'
import GroupService from '../../../api/services/group.service'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { SuccessModal } from '../SuccessModal'
import { useGetGroupInvitationCodeListQuery } from '../../../api/hooks/groupController.hooks'

function ChangeGroupModal(props) {
  const [newGroup, setNewGroup] = useState()
  const [isFetching, setIsFetching] = useState(false)
  const [successModalOpen, setSuccessModalOpen] = useState(false)

  const groupData = useGetGroupInvitationCodeListQuery()

  const selectGroup = (event) => {
    setNewGroup(groupData.data?.find((group) => group.name === event.target.value))
  }

  const submitChange = () => {
    setIsFetching(true)
    GroupService.changeStudentGroup(props.student?.id, newGroup?.id)
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
          {!props.student || groupData.isFetching ? (
            <Loader />
          ) : (
            <>
              <Card.Body>
                {groupData.isError ? (
                  <p className={'text-center text-danger h6'}>{ERROR_OCCURRED}</p>
                ) : (
                  <>
                    <h6>
                      Wybrany student: {props.student?.firstName} {props.student?.lastName}
                    </h6>
                    <Form>
                      <span>Przypisz do grupy: </span>
                      <select defaultValue={props.student?.groupName} onChange={selectGroup}>
                        {groupData.data?.map((group) => (
                          <option key={group.id} value={group.name}>
                            {group.name}
                          </option>
                        ))}
                      </select>
                    </Form>
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
        text={`Grupa studenta ${props.student?.firstName} ${props.student?.lastName}
          została zmieniona pomyślnie z ${props.student?.groupName} na ${newGroup?.name}`}
        headerText='Zmiana zakończona'
      />
    </>
  )
}

export default ChangeGroupModal
