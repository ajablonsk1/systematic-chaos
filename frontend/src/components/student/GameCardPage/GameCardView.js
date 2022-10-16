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
import StudentService from '../../../services/student.service'
import Loader from '../../general/Loader/Loader'
import { ERROR_OCCURRED } from '../../../utils/constants'
import { connect } from 'react-redux'
import { isMobileView } from '../../../utils/mobileHelper'

function GameCardView(props) {
  const isMobile = isMobileView()
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
          <Row className='m-0 pt-4 gy-2' style={{ height: isMobile ? 'auto' : '50vh' }}>
            <Col md={5} style={{ height: isMobile ? '45%' : '100%' }}>
              <GameCard
                headerText={'Statystyki bohatera'}
                content={
                  <HeroStatsContent
                    stats={{ ...dashboardStats.heroStats, heroType: dashboardStats.heroTypeStats.heroType }}
                  />
                }
              />
            </Col>
            <Col md={7} style={{ height: isMobile ? '55%' : '100%' }}>
              <GameCard
                headerText={'Statystyki ocen'}
                content={<GradesStatsContent stats={dashboardStats.generalStats} />}
              />
            </Col>
          </Row>
          <Row className='m-0 mb-5 m-md-0 pt-3' style={{ height: isMobile ? '140vh' : '50vh' }}>
            <Col md={5} style={{ height: isMobile ? '30%' : '100%' }}>
              <GameCard
                headerText={'Miejsce w rankingu'}
                content={
                  <PersonalRankingInfoContent
                    stats={{ ...dashboardStats.heroTypeStats, userPoints: dashboardStats.generalStats.allPoints }}
                  />
                }
              />
            </Col>
            <Col md={7} style={{ height: isMobile ? '68%' : '100%', marginBottom: isMobile ? '20px' : 'auto' }}>
              <GameCard
                headerText={'Ostatnio dodane aktywności'}
                content={<LastActivitiesContent theme={props.theme} stats={dashboardStats.lastAddedActivities} />}
              />
            </Col>
          </Row>
        </>
      )}
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(GameCardView)
