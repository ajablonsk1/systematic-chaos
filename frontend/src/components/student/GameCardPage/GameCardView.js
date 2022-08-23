import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Content } from '../../App/AppGeneralStyles'
import GameCard from './GameCard'
import {
  GradesStatsContent,
  HeroStatsContent,
  LastActivitiesContent,
  PersonalRankingInfoContent
} from './gameCardContents'

export default function GameCardView() {
  return (
    <Content>
      <Row className='m-0 pt-4' style={{ height: '50vh' }}>
        <Col md={5} className={'h-100'}>
          <GameCard headerText={'Statystyki bohatera'} content={<HeroStatsContent />} />
        </Col>
        <Col md={7} className={'h-100'}>
          <GameCard headerText={'Statystyki ocen'} content={<GradesStatsContent />} />
        </Col>
      </Row>
      <Row className='m-0 pt-3' style={{ height: '50vh' }}>
        <Col md={5} className={'h-100'}>
          <GameCard headerText={'Miejsce w rankingu'} content={<PersonalRankingInfoContent />} />
        </Col>
        <Col md={7} className={'h-100'}>
          <GameCard headerText={'Ostatnio dodane aktywności'} content={<LastActivitiesContent />} />
        </Col>
      </Row>
    </Content>
  )
}
