import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'

function DeletionModal(props) {
  return (
    <Modal show={props.showModal} onHide={() => props.setModalOpen(false)}>
      <Card>
        <Card.Header>
          <Card.Title>{props.modalTitle}</Card.Title>
        </Card.Header>
        <Card.Body>{props.modalBody}</Card.Body>
        <Card.Footer className={'text-center'}>
          <Button className={'me-1'} variant={'secondary'} onClick={() => props.setModalOpen(false)}>
            Anuluj
          </Button>
          <Button variant={'danger'}>Usuń</Button>
        </Card.Footer>
      </Card>
    </Modal>
  )
}

export default DeletionModal
