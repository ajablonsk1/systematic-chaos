import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import { Content } from '../../App/AppGeneralStyles'
import { Title } from './GroupsStyle'
import GroupsTable from './Table/GroupsTable'
import GroupAdditionModal from '../GroupAdditionPage/GroupAdditionModal'
import { connect } from 'react-redux'

function Groups(props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [refreshFunction, setRefreshFunction] = useState(() => {})

  return (
    <>
      <Content className={'d-flex flex-column align-items-center h-100'}>
        <Row className='m-3'>
          <Title>Grupy</Title>
        </Row>
        <Row className='m-3 w-100 px-3'>
          <GroupsTable setRefreshFunction={setRefreshFunction} />
        </Row>
        <Button
          style={{
            position: 'absolute',
            top: 'calc(100% - 10px)',
            transform: 'translateY(-100%)',
            backgroundColor: props.theme.success,
            borderColor: props.theme.success
          }}
          className={'justify-content-end'}
          onClick={() => setModalOpen(true)}
        >
          Dodaj grupę
        </Button>
      </Content>
      <GroupAdditionModal show={modalOpen} setModalOpen={setModalOpen} refreshFunction={refreshFunction} />
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme
  return {
    theme
  }
}
export default connect(mapStateToProps)(Groups)
