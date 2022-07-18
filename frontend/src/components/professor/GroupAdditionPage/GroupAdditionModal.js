import React from 'react'
import { Card, Modal } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/CardHeader'
import GroupAdditionForm from './GroupAdditionForm'

function GroupAdditionModal(props) {
  return (
    <Modal show={props.show}>
      <Card>
        <CardHeader>
          <Card.Title className={'text-center'}>Dodaj nową grupę.</Card.Title>
        </CardHeader>
        <Card.Body>
          <GroupAdditionForm setModalOpen={props.setModalOpen} refreshFunction={props.refreshFunction} />
        </Card.Body>
      </Card>
    </Modal>
  )
}

export default GroupAdditionModal
