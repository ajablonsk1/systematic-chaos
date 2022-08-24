import React, { useMemo } from 'react'
import { Content } from '../../../App/AppGeneralStyles'
import { Button, Col, Row, Tab } from 'react-bootstrap'
import GameCard from '../../../student/GameCardPage/GameCard'
import { TabsContainer } from '../../../general/LoginAndRegistrationPage/AuthStyle'
import { getRanksData } from './mockData'
import { HeroType } from '../../../../utils/userRole'
import { getHeroName } from '../../../../utils/constants'
import { CustomTable } from '../../../student/GameCardPage/gameCardContentsStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

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
            <CustomTable style={{ marginTop: 10 }}>
              <thead>
                <tr>
                  <th>Ikonka</th>
                  <th>Nazwa rangi</th>
                  <th>Zakres punktowy</th>
                </tr>
              </thead>
              <tbody>
                {rank.ranksList.map((rankDetails, i) => (
                  <tr key={i + Date.now()}>
                    <td>
                      <img width={100} src={rankDetails.imgSrc} alt={'rank-icon'} />
                    </td>
                    <td className={'align-middle'}>{rankDetails.name}</td>
                    <td className={'align-middle'}>
                      {rankDetails.minPoints} - {rankDetails.maxPoints}
                    </td>
                    <td className={'align-middle'}>
                      <FontAwesomeIcon icon={faEdit} />
                    </td>
                    <td className={'align-middle'}>
                      <FontAwesomeIcon icon={faTrash} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </CustomTable>
            <Button className={'my-3'}>Dodaj nową rangę</Button>
          </Tab>
        ))}
      </TabsContainer>
    )
  }, [ranksData])

  const badgesContent = useMemo(() => {}, [])

  return (
    <Content>
      <Row className={'m-0 vh-100 w-100'}>
        <Col md={6} className={'pt-4'}>
          <GameCard headerText={'Rangi'} content={ranksContent} />
        </Col>
        <Col md={6} className={'pt-4'}>
          <GameCard headerText={'Odznaki'} content={badgesContent} />
        </Col>
      </Row>
    </Content>
  )
}

export default RankAndBadgesManagement
