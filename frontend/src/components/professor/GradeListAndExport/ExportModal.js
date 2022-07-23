import React from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'

function ExportModal(props) {
  return (
    <Modal show={props.isModalVisible}>
      <Card>
        <CardHeader className={'text-center'}>
          <Card.Title>Eksport ocen.</Card.Title>
          <p>Czy na pewno chcesz rozpocząć eksport ocen dla wybranych studentów?</p>
        </CardHeader>
        <Card.Footer className={'text-center'}>
          <Button variant={'danger'} onClick={() => props.setModalVisible(false)}>
            Anuluj
          </Button>
          <Button variant={'success'} className={'ml-2'}>
            Eksportuj
          </Button>
        </Card.Footer>
      </Card>
    </Modal>
  )
}

export default ExportModal
