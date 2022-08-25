import React, { useMemo } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { Button, Col, Row, Tab } from 'react-bootstrap'
import { TabsContainer } from '../../../general/LoginAndRegistrationPage/AuthStyle'
import { getRanksData } from './mockData'
import { HeroType } from '../../../../utils/userRole'
import { getHeroName } from '../../../../utils/constants'
import { getBadgesList } from '../../../student/BadgesPage/mockData'
import ContentCard from './ContentCard'
import Table from './Table'

function RankAndBadgesManagement(props) {
  const ranksData = getRanksData()

  const ranksContent = useMemo(() => {
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
                body={rank.ranksList.map((listElements) => [
                  <img width={100} src={listElements.imgSrc} alt={'rank-icon'} />,
                  <span>{listElements.name}</span>,
                  <span>
                    {listElements.minPoints} - {listElements.maxPoints}
                  </span>
                ])}
              />
            </div>
            <Button className={'my-3'}>Dodaj nową rangę</Button>
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
    </Content>
  )
}

export default RankAndBadgesManagement
