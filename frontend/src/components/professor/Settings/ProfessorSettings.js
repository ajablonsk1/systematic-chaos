import React, { useState, useEffect, useMemo } from 'react'
import { Col, Row, Spinner, Table } from 'react-bootstrap'
import ProfileCard from '../../student/Profile/ProfileCard'
import EditPasswordModal from '../../student/Profile/EditPasswordModal'
import UserService from '../../../services/user.service'
import { ERROR_OCCURRED } from '../../../utils/constants'
import ProfessorService from '../../../services/professor.service'

function ProfessorSettings(props) {
  const [userData, setUserData] = useState(undefined)
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false)
  const [registrationToken, setRegistrationToken] = useState(undefined)

  useEffect(() => {
    UserService.getUserData()
      .then((response) => {
        setUserData(response)
      })
      .catch(() => {
        setUserData(null)
      })
  }, [])

  useEffect(() => {
    ProfessorService.getRegistrationToken()
      .then((response) => {
        setRegistrationToken(response)
      })
      .catch(() => {
        setRegistrationToken(null)
      })
  }, [])

  const userInfoBody = useMemo(() => {
    if (userData === undefined) {
      return <Spinner animation={'border'} />
    }
    if (userData == null) {
      return <p className={'text-center'}>{ERROR_OCCURRED}</p>
    }

    const tableHeaders = [
      { text: 'Imię', value: userData.firstName },
      { text: 'Nazwisko', value: userData.lastName },
      { text: 'Email', value: userData.email }
    ]

    return (
      <Table>
        <tbody>
          {tableHeaders.map((header, index) => (
            <tr key={index + Date.now()}>
              <td>
                <strong>{header.text}</strong>
              </td>
              <td>{header.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    )
  }, [userData])

  return (
    <>
      <Row className={'p-0 m-0'}>
        <Col md={12}>
          <h4>Ustawienia konta</h4>
        </Col>
        <Col md={6}>
          <ProfileCard header={'Informacje o profilu'} body={userInfoBody} />
        </Col>

        <Col md={6}>
          <ProfileCard
            header={'Zmień hasło'}
            body={<p className={'text-center h-75'}>Otwórz formularz do zmiany hasła.</p>}
            showButton
            buttonCallback={() => setIsEditPasswordModalOpen(true)}
          />
        </Col>
      </Row>

      <Row className={'p-0 m-0 py-2'}>
        <Col>
          <ProfileCard header={'Kod dostępu dla prowadzącego'} body={<p>{registrationToken}</p>} />
        </Col>
      </Row>

      <EditPasswordModal show={isEditPasswordModalOpen} setModalOpen={setIsEditPasswordModalOpen} />
    </>
  )
}

export default ProfessorSettings
