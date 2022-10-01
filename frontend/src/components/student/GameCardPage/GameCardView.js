import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Content } from '../../App/AppGeneralStyles'
import GameCard from './GameCard'
import {
  GradesStatsContent,
  HeroStatsContent,
  LastActivitiesContent,
  PersonalRankingInfoContent
} from './gameCardContents'
import StudentService from '../../../api/services/student.service'
import Loader from '../../general/Loader/Loader'
import { ERROR_OCCURRED } from '../../../utils/constants'

export default function GameCardView() {
  const [dashboardStats, setDashboardStats] = useState(undefined)

  useEffect(() => {
    StudentService.getDashboardStats()
      .then((response) => setDashboardStats(response))
      .catch(() => setDashboardStats(null))
  }, [])

  return (
    <Content>
      {dashboardStats === undefined ? (
        <Loader />
      ) : dashboardStats == null ? (
        <p className={'text-danger'}>{ERROR_OCCURRED}</p>
      ) : (
        <>
          <Row className='m-0 pt-4' style={{ height: '50vh' }}>
            <Col md={5} className={'h-100'}>
              <GameCard
                headerText={'Statystyki bohatera'}
                content={
                  <HeroStatsContent
                    stats={{ ...dashboardStats.heroStats, heroType: dashboardStats.heroTypeStats.heroType }}
                  />
                }
              />
            </Col>
            <Col md={7} className={'h-100'}>
              <GameCard
                headerText={'Statystyki ocen'}
                content={<GradesStatsContent stats={dashboardStats.generalStats} />}
              />
            </Col>
          </Row>
          <Row className='m-0 pt-3' style={{ height: '50vh' }}>
            <Col md={5} className={'h-100'}>
              <GameCard
                headerText={'Miejsce w rankingu'}
                content={
                  <PersonalRankingInfoContent
                    stats={{ ...dashboardStats.heroTypeStats, userPoints: dashboardStats.generalStats.allPoints }}
                  />
                }
              />
            </Col>
            <Col md={7} className={'h-100'}>
              <GameCard
                headerText={'Ostatnio dodane aktywności'}
                content={<LastActivitiesContent stats={dashboardStats.lastAddedActivities} />}
              />
            </Col>
          </Row>
        </>
      )}
    </Content>
  )
}
