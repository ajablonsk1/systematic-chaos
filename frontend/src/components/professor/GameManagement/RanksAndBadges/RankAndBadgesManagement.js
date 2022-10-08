import React, { useEffect, useMemo, useState } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row, Spinner, Tab } from 'react-bootstrap'
import { TabsContainer } from '../../../general/LoginAndRegistrationPage/AuthStyle'
import { HeroType } from '../../../../utils/userRole'
import { base64Header, ERROR_OCCURRED, getHeroName } from '../../../../utils/constants'
import { getBadgesList } from '../../../student/BadgesPage/mockData'
import ContentCard from './ContentCard'
import Table from './Table'
import EditionForm from './EditionForm'
import { connect } from 'react-redux'
import RankService from '../../../../services/rank.service'
import RankCreationForm from './RankCreationForm'

function RankAndBadgesManagement(props) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editedDataType, setEditedDataType] = useState('')
  const [ranksData, setRanksData] = useState(undefined)
  const [isRankAdditionModalOpen, setIsRankAdditionModalOpen] = useState(false)
  const [selectedHeroType, setSelectedHeroType] = useState(HeroType.WARRIOR)

  useEffect(() => {
    RankService.getAllRanks()
      .then((response) => {
        setRanksData(response)
      })
      .catch(() => {
        setRanksData(null)
      })
  }, [])

  const ranksContent = useMemo(() => {
    if (ranksData === undefined) {
      return <Spinner animation={'border'} />
    }
    if (ranksData == null) {
      return <p className={'text-danger'}>{ERROR_OCCURRED}</p>
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
                body={rank.ranks.map((listElements, index) => [
                  <img width={100} src={base64Header + listElements.image} alt={'rank-icon'} />,
                  <span>{listElements.name}</span>,
                  <span>{`> ${listElements.minPoints}`}</span>
                ])}
                deleteIconCallback={() => setIsDeleteModalOpen(true)}
                editIconCallback={() => {
                  setEditedDataType('RANKS')
                  setIsEditModalOpen(true)
                }}
              />
            </div>
            <Button
              className={'my-3'}
              onClick={() => {
                setSelectedHeroType(rank.heroType)
                setIsRankAdditionModalOpen(true)
              }}
            >
              Dodaj nową rangę
            </Button>
          </Tab>
        ))}
      </TabsContainer>
    )
  }, [ranksData])

  const badgesContent = useMemo(() => {
    return (
      <>
        <div className={'text-center'} style={{ maxHeight: '93%', overflow: 'auto' }}>
          <Table
            headers={['Ikona', 'Nazwa odznaki', 'Opis']}
            body={getBadgesList().map((badge) => [
              <img width={100} src={badge.src} alt={'badge-icon'} />,
              <span>{badge.name}</span>,
              <span>{badge.description}</span>
            ])}
            deleteIconCallback={() => setIsDeleteModalOpen(true)}
            editIconCallback={() => {
              setEditedDataType('BADGES')
              setIsEditModalOpen(true)
            }}
          />
        </div>
        <Button className={'my-3'} style={{ position: 'relative', left: '50%', transform: 'translateX(-50%)' }}>
          Dodaj nową odznakę
        </Button>
      </>
    )
  }, [])

  return (
    <Content>
      <Row className={'m-0 vh-100 w-100'}>
        <Col md={6} className={'pt-4'}>
          <ContentCard header={'Rangi'} body={ranksContent} />
        </Col>
        <Col md={6} className={'pt-4'}>
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
          <Button
            style={{ backgroundColor: props.theme.danger, borderColor: props.theme.danger }}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            Usuń
          </Button>
        </ModalFooter>
      </Modal>

      <Modal show={isEditModalOpen} onHide={() => setIsEditModalOpen(false)} size={'lg'}>
        <ModalHeader>
          <h5>Edycja elementu</h5>
        </ModalHeader>
        <ModalBody>
          <EditionForm
            formVariant={editedDataType}
            onSubmit={() => setIsEditModalOpen(false)}
            onCancel={() => setIsEditModalOpen(false)}
          />
        </ModalBody>
      </Modal>

      <Modal show={isRankAdditionModalOpen} onHide={() => setIsRankAdditionModalOpen(false)}>
        <ModalHeader>
          <h5>Dodawanie nowej rangi dla typu: {getHeroName(selectedHeroType)}</h5>
        </ModalHeader>
        <ModalBody>
          <RankCreationForm heroType={selectedHeroType} setModalOpen={setIsRankAdditionModalOpen} />
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
