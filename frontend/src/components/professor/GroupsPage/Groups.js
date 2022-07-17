import React, { useState } from 'react'
import { Row } from 'react-bootstrap'
import { Content } from '../../App/AppGeneralStyles'
import { AddButton, Title } from './GroupsStyle'
import GroupsTable from './Table/GroupsTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import GroupAdditionModal from '../GroupAdditionPage/GroupAdditionModal'

export default function Groups() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <Content>
      <AddButton className='m-5' onClick={() => setModalOpen(true)}>
        <FontAwesomeIcon icon={faPlus} size='2x' />
      </AddButton>
      <Row className='m-3'>
        <Title>Grupy</Title>
      </Row>
      <Row className='m-3'>
        <GroupsTable />
      </Row>
      <GroupAdditionModal show={modalOpen} setModalOpen={setModalOpen} />
    </Content>
  )
}
