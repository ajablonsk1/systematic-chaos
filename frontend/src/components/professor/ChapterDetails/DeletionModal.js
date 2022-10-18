import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { connect } from 'react-redux'

function DeletionModal(props) {
  return (
    <Modal show={props.showModal} onHide={() => props.setModalOpen(false)}>
      <Card>
        <Card.Header>
          <Card.Title>{props.modalTitle}</Card.Title>
        </Card.Header>
        <Card.Body>{props.modalBody}</Card.Body>
        <Card.Footer className={'text-center'}>
          <Button
            className={'me-1'}
            style={{ backgroundColor: props.theme.secondary, borderColor: props.theme.secondary }}
            onClick={() => props.setModalOpen(false)}
          >
            Anuluj
          </Button>
          <Button
            style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
            onClick={props.onClick}
          >
            Usuń
          </Button>
        </Card.Footer>
      </Card>
    </Modal>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(DeletionModal)
