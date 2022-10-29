import React, { useEffect, useMemo, useState } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Tab } from 'react-bootstrap'
import { TabsContainer } from '../../../general/LoginAndRegistrationPage/AuthStyle'
import { HeroType } from '../../../../utils/userRole'
import { base64Header, ERROR_OCCURRED, getHeroName } from '../../../../utils/constants'
import ContentCard from './ContentCard'
import Table from './Table'
import EditionForm from './EditionForm'
import { connect } from 'react-redux'
import RankService from '../../../../services/rank.service'
import RankCreationForm from './RankCreationForm'
import { successToast } from '../../../../utils/toasts'
import { isMobileView } from '../../../../utils/mobileHelper'
import UserService from '../../../../services/user.service'
import Loader from '../../../general/Loader/Loader'

function RankAndBadgesManagement(props) {
  const isMobileDisplay = isMobileView()

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editedDataType, setEditedDataType] = useState('')
  const [ranksData, setRanksData] = useState(undefined)
  const [isRankAdditionModalOpen, setIsRankAdditionModalOpen] = useState(false)
  const [selectedHeroType, setSelectedHeroType] = useState(HeroType.WARRIOR)
  const [chosenItem, setChosenItem] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [badgesList, setBadgesList] = useState(null)

  const getRanksList = () => {
    RankService.getAllRanks()
      .then((response) => {
        setRanksData(response)
      })
      .catch(() => {
        setRanksData(null)
      })
  }

  useEffect(() => {
    UserService.getAllBadges()
      .then((response) => {
        setBadgesList(response)
      })
      .catch(() => {
        setBadgesList(null)
      })
  }, [])

  useEffect(() => {
    getRanksList()
  }, [])

  const deleteRank = () => {
    RankService.deleteRank(chosenItem.id)
      .then(() => {
        successToast('Ranga usunięta pomyślnie')
        setIsDeleteModalOpen(false)
        getRanksList()
      })
      .catch((error) => {
        setErrorMessage(error.response?.data?.message ?? ERROR_OCCURRED)
      })
  }

  const ranksContent = useMemo(() => {
    if (ranksData === undefined) {
      return <Spinner animation={'border'} />
    }
    if (ranksData == null) {
      return <p style={{ color: props.theme.danger }}>{ERROR_OCCURRED}</p>
    }

    return (
      <TabsContainer defaultActiveKey={HeroType.WARRIOR} style={{ fontSize: 20 }}>
        {ranksData.map((rank, index) => (
          <Tab
            className={'text-center'}
            key={index + Date.now()}
            eventKey={rank.heroType}
            title={getHeroName(rank.heroType)}
          >
            <div className={'text-center'} style={{ maxHeight: '74.5vh', overflow: 'auto' }}>
              <Table
                headers={['Ikona', 'Nazwa rangi', 'Zakres punktowy']}
                body={rank.ranks.map((listElements) => [
                  <img width={100} src={base64Header + listElements.image} alt={'rank-icon'} />,
                  <span>{listElements.name}</span>,
                  <span>{`> ${listElements.minPoints}`}</span>
                ])}
                deleteIconCallback={(idx) => {
                  setIsDeleteModalOpen(true)
                  setChosenItem({ id: rank.ranks[idx].rankId })
                }}
                editIconCallback={(idx) => {
                  setEditedDataType('RANKS')
                  setIsEditModalOpen(true)
                  setChosenItem({ item: rank.ranks[idx], type: rank.heroType })
                }}
              />
            </div>
            <Button
              className={'my-3'}
              onClick={() => {
                setSelectedHeroType(rank.heroType)
                setIsRankAdditionModalOpen(true)
              }}
              style={{ backgroundColor: props.theme.success, borderColor: props.theme.success }}
            >
              Dodaj nową rangę
            </Button>
          </Tab>
        ))}
      </TabsContainer>
    )
  }, [props.theme.danger, props.theme.success, ranksData])

  const badgesContent = useMemo(() => {
    return (
      <>
        <div className={'text-center'} style={{ maxHeight: '100%', overflow: 'auto' }}>
          {badgesList === undefined ? (
            <Loader />
          ) : badgesList == null ? (
            <p>{ERROR_OCCURRED}</p>
          ) : (
            <Table
              headers={['Ikona', 'Nazwa odznaki', 'Opis']}
              body={badgesList.map((badge) => [
                <img width={100} src={base64Header + badge.file.file} alt={'badge-icon'} />,
                <span>{badge.title}</span>,
                <span>{badge.description}</span>
              ])}
              editIconCallback={(idx) => {
                setEditedDataType('BADGES')
                setIsEditModalOpen(true)
                setChosenItem({ item: badgesList[idx] })
              }}
            />
          )}
        </div>
      </>
    )
  }, [badgesList])

  return (
    <Content>
      <Row className={'w-100'} style={{ margin: isMobileDisplay ? '0 0 85px 0' : 0 }}>
        <Col md={6} className={'pt-4'} style={{ padding: isMobileDisplay ? '5px' : 'auto' }}>
          <ContentCard header={'Rangi'} body={ranksContent} />
        </Col>
        <Col md={6} className={'pt-4'} style={{ padding: isMobileDisplay ? '5px' : 'auto' }}>
          <ContentCard header={'Odznaki'} body={badgesContent} />
        </Col>
      </Row>

      <Modal show={isDeleteModalOpen} onHide={() => setIsDeleteModalOpen(false)}>
        <ModalHeader>
          <h5>Usunięcie elementu</h5>
        </ModalHeader>
        <ModalBody>Czy na pewno chcesz usunąć ten element? Tej operacji nie można cofnąć.</ModalBody>
        <ModalFooter>
          <Button
            style={{ backgroundColor: props.theme.secondary, borderColor: props.theme.secondary }}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Anuluj
          </Button>
          <Button style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }} onClick={deleteRank}>
            Usuń
          </Button>
        </ModalFooter>
        {errorMessage && (
          <p className={'text-center mt-2'} style={{ color: props.theme.danger }}>
            {errorMessage}
          </p>
        )}
      </Modal>

      <Modal show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)} size={'lg'}>
        <ModalHeader>
          <h5>Edycja elementu</h5>
        </ModalHeader>
        <ModalBody>
          <EditionForm
            onSuccess={getRanksList}
            formVariant={editedDataType}
            setModalOpen={setIsEditModalOpen}
            item={chosenItem}
          />
        </ModalBody>
      </Modal>

      <Modal show={isRankAdditionModalOpen} onHide={() => setIsRankAdditionModalOpen(false)}>
        <ModalHeader>
          <h5>Dodawanie nowej rangi dla typu: {getHeroName(selectedHeroType)}</h5>
        </ModalHeader>
        <ModalBody>
          <RankCreationForm
            heroType={selectedHeroType}
            setModalOpen={setIsRankAdditionModalOpen}
            onSuccess={getRanksList}
          />
        </ModalBody>
      </Modal>
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(RankAndBadgesManagement)
