import React, { useEffect, useMemo, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Col, Row, Spinner, Table } from 'react-bootstrap'
import { ERROR_OCCURRED, getHeroName, HeroImg } from '../../../utils/constants'
import StudentService from '../../../services/student.service'
import ProfileCard from './ProfileCard'
import EditIndexModal from './EditIndexModal'

function Profile() {
  const [userData, setUserData] = useState(undefined)
  const [isEditIndexModalOpen, setIsEditIndexModalOpen] = useState(false)

  useEffect(() => {
    StudentService.getUserData()
      .then((response) => {
        setUserData(response)
      })
      .catch(() => {
        setUserData(null)
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
      { text: 'Email', value: userData.email },
      { text: 'Numer indeksu', value: userData.indexNumber },
      { text: 'Grupa zajęciowa', value: userData.group.name },
      { text: 'Typ bohatera', value: getHeroName(userData.heroType) }
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

  const heroInfoCard = useMemo(() => {
    const cardBody =
      userData === undefined ? (
        <Spinner animation={'border'} />
      ) : userData == null ? (
        <p>{ERROR_OCCURRED}</p>
      ) : (
        <img style={{ maxWidth: '100%' }} height={'90%'} src={HeroImg[userData.heroType]} alt={'Your hero'} />
      )
    return (
      <ProfileCard
        header={
          <>
            <span>Wybrana postać: </span>
            <strong>{userData && getHeroName(userData.heroType)}</strong>
          </>
        }
        body={cardBody}
      />
    )
  }, [userData])

  return (
    <Content>
      <h3 className={'text-center py-3'}>Mój profil</h3>
      <Row className={'px-0 mx-0'}>
        <Col md={6}>
          <ProfileCard header={'Informacje o profilu'} body={userInfoBody} />
        </Col>
        <Col md={6}>{heroInfoCard}</Col>
      </Row>
      <Row className={'px-0 mx-0 py-2'}>
        <Col md={4}>
          <ProfileCard
            header={'Zmień numer indeksu'}
            body={
              <p className={'text-center h-75'}>
                Otwórz okno do edycji numeru indeksu. Pamiętaj, że gdy podasz zły numer, prowadzący nie będzie w stanie
                wystawić oceny końcowej.
              </p>
            }
            showButton
            buttonCallback={() => setIsEditIndexModalOpen(true)}
          />
        </Col>
        <Col md={4}>
          <ProfileCard
            header={'Zmień hasło'}
            body={<p className={'text-center h-75'}>Otwórz formularz do zmiany hasła.</p>}
            showButton
          />
        </Col>
        <Col md={4}>
          <ProfileCard
            header={'Usuń konto'}
            body={<p className={'text-center h-75'}>Pamiętaj, że tego procesu nie możesz cofnąć.</p>}
            showButton
            customButton={'danger'}
            buttonText={'Usuń'}
          />
        </Col>
      </Row>
      <EditIndexModal show={isEditIndexModalOpen} setModalOpen={setIsEditIndexModalOpen} />
    </Content>
  )
}

export default Profile
