import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import ProfileCard from '../../student/Profile/ProfileCard'
import EditPasswordModal from '../../student/Profile/EditPasswordModal'

function ProfessorSettings(props) {
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false)

  return (
    <>
      <Row className={'p-0 m-0'}>
        <Col md={12}>
          <h4>Ustawienia konta</h4>
        </Col>
        <Col md={4}>
          <ProfileCard
            header={'Zmień hasło'}
            body={<p className={'text-center h-75'}>Otwórz formularz do zmiany hasła.</p>}
            showButton
            buttonCallback={() => setIsEditPasswordModalOpen(true)}
          />
        </Col>
      </Row>

      <EditPasswordModal show={isEditPasswordModalOpen} setModalOpen={setIsEditPasswordModalOpen} />
    </>
  )
}

export default ProfessorSettings
