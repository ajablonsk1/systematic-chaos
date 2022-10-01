import React, { useState, useMemo } from 'react'
import { Col, Row, Spinner, Table } from 'react-bootstrap'
import ProfileCard from '../../student/Profile/ProfileCard'
import EditPasswordModal from '../../student/Profile/EditPasswordModal'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { useGetRegistrationTokenQuery, useGetUserCurrentQuery } from '../../../api/hooks/userController.hooks'

function ProfessorSettings(props) {
  const [isEditPasswordModalOpen, setIsEditPasswordModalOpen] = useState(false)

  const registrationTokenData = useGetRegistrationTokenQuery()
  const userData = useGetUserCurrentQuery()

  const userInfoBody = useMemo(() => {
    if (userData.isFetching) {
      return <Spinner animation={'border'} />
    }

    if (userData.isError) {
      return <p className={'text-center'}>{ERROR_OCCURRED}</p>
    }

    if (userData.data) {
      const tableHeaders = [
        { text: 'Imię', value: userData.data.firstName },
        { text: 'Nazwisko', value: userData.data.lastName },
        { text: 'Email', value: userData.data.email }
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
    }
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
          <ProfileCard header={'Kod dostępu dla prowadzącego'} body={<p>{registrationTokenData?.data}</p>} />
        </Col>
      </Row>

      <EditPasswordModal show={isEditPasswordModalOpen} setModalOpen={setIsEditPasswordModalOpen} />
    </>
  )
}

export default ProfessorSettings
