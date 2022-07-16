import React from 'react'
import { Button, Card, Form, Modal } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'
import { getGroups } from './mockData'

function ChangeGroupModal(props) {
  const studentData = props.data
  const groups = getGroups()

  return (
    <Modal show={props.show}>
      <Card>
        <CardHeader className={'text-center'}>
          <Card.Title>Zmiana grupy</Card.Title>
          <p>Zmień grupę wybranego studenta wybierając jego nową grupę z poniższej listy</p>
        </CardHeader>
        <Card.Body>
          <h6>Wybrany student: {studentData?.name}</h6>
          <Form>
            <span>Przypisz do grupy: </span>
            <select defaultValue={studentData?.groupName}>
              {groups.map((group, index) => (
                <option key={group.groupKey + index} value={group.groupName}>
                  {group.groupName}
                </option>
              ))}
            </select>
          </Form>
        </Card.Body>
        <Card.Footer className={'d-flex justify-content-center align-items-center'}>
          <Button onClick={() => props.setModalOpen(false)} variant={'danger'}>
            Anuluj
          </Button>
          <Button style={{ backgroundColor: 'var(--button-green)' }} className={'ml-2'}>
            Zapisz
          </Button>
        </Card.Footer>
      </Card>
    </Modal>
  )
}

export default ChangeGroupModal
