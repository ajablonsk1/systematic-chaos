import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'

function DeletionModal(props) {
  return (
    <Modal show={props.showModal}>
      <Card>
        <Card.Header>
          <Card.Title>Usunięcie rozdziału</Card.Title>
        </Card.Header>
        <Card.Body>
          Czy na pewno chcesz usunąć rozdział: <br />
          <strong>{props.chapterTitle}</strong>?
        </Card.Body>
        <Card.Footer className={'text-center'}>
          <Button className={'mr-1'} variant={'secondary'} onClick={() => props.setModalOpen(false)}>
            Anuluj
          </Button>
          <Button variant={'danger'}>Usuń</Button>
        </Card.Footer>
      </Card>
    </Modal>
  )
}

export default DeletionModal
