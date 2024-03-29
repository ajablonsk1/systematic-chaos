import React, { useState } from 'react'
import { Button, Row } from 'react-bootstrap'
import { Content } from '../../App/AppGeneralStyles'
import { Title } from './GroupsStyle'
import GroupsTable from './Table/GroupsTable'
import GroupAdditionModal from '../GroupAdditionPage/GroupAdditionModal'
import { connect } from 'react-redux'
import { isMobileView } from '../../../utils/mobileHelper'
import GoBackButton from '../../general/GoBackButton/GoBackButton'
import { TeacherRoutes } from '../../../routes/PageRoutes'

function Groups(props) {
  const [modalOpen, setModalOpen] = useState(false)
  const [refreshFunction, setRefreshFunction] = useState(() => {})
  const buttonStyle = { backgroundColor: props.theme.success, borderColor: props.theme.success }

  const isMobileDisplay = isMobileView()

  return (
    <>
      <Content
        className={'d-flex flex-column align-items-center h-100'}
        style={{ marginBottom: isMobileDisplay ? 85 : 0 }}
      >
        <Row className='m-3'>
          <Title>Grupy</Title>
        </Row>
        <Row className='m-3 w-100 px-3' style={{ maxHeight: '80%', overflow: 'auto' }}>
          <GroupsTable setRefreshFunction={setRefreshFunction} />
        </Row>

        <div
          className={'d-flex justify-content-center gap-2 position-absolute'}
          style={isMobileDisplay ? null : { bottom: 10 }}
        >
          <GoBackButton goTo={TeacherRoutes.GAME_MANAGEMENT.MAIN} customClass={'position-relative'} />
          <Button
            style={isMobileDisplay ? { ...buttonStyle } : { ...buttonStyle, position: 'relative' }}
            className={'justify-content-end'}
            onClick={() => setModalOpen(true)}
          >
            Dodaj grupę
          </Button>
        </div>
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
