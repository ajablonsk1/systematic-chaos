import React from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Col, Row } from 'react-bootstrap'
import { HorizontalPointsLine, Tooltip } from './BadgesStyle'
import { getBadgesInfo, getBadgesList, getLastUnlockedBadge, getRankInfo, getStudentPoints } from './mockData'
import ContentCard from './ContentCard'

function BadgesPage() {
  const studentRankInfo = getRankInfo()
  const [studentPoints, missingPoints] = getStudentPoints()
  const [studentBadgesNumber, allBadgesNumber] = getBadgesInfo()
  const badgesList = getBadgesList()
  const lastUnlockedBadge = getLastUnlockedBadge()

  const sortBadges = (a, b) => {
    if (a.unlocked) {
      return -1
    } else return 1
  }

  return (
    <Content>
      <Row className={'m-0 text-center py-3'}>
        <Col>
          <strong>Twoja ranga: </strong>
          <span>{studentRankInfo[1].name}</span>
        </Col>
        <Col>
          <strong>Liczba punktów: </strong>
          <span>{studentPoints}</span>
        </Col>
        <Col>
          <strong>Do następnej rangi brakuje: </strong>
          <span>{missingPoints} pkt</span>
        </Col>
      </Row>
      <Row className={'m-0'}>
        <Col md={12}>
          <HorizontalPointsLine>
            <ul>
              {studentRankInfo.map((rankInfo, index) => (
                <li key={index + Date.now()}>
                  <div>
                    <div className={'pointsInfo'}>
                      {rankInfo.minPoints} - {rankInfo.maxPoints} pkt
                    </div>
                    <div className={'rankInfo'}>
                      <div className={'left-arrow'} />
                      <p>
                        <strong>{rankInfo.name}</strong>
                      </p>
                      <img width={100} src={rankInfo.imgSrc} alt={'rank-profile'} />
                      <div className={'right-arrow'} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </HorizontalPointsLine>
        </Col>
      </Row>
      <Row className={'mx-0 my-5'} style={{ maxHeight: '55vh' }}>
        <Col md={9}>
          <ContentCard
            header={'Odznaki'}
            body={
              <Row className={'m-0 w-100 h-100'} style={{ overflow: 'visible' }}>
                {badgesList.sort(sortBadges).map((badge, index) => (
                  <Col
                    md={4}
                    className={'text-center d-flex flex-column align-items-center justify-content-center'}
                    key={index + Date.now()}
                  >
                    <Tooltip>
                      <img style={{ opacity: badge.unlocked ? 1 : 0.4 }} src={badge.src} alt={'badge-icon'} />
                      <div>
                        {badge.unlocked ? (
                          <span>Odblokowano: {badge.unlockedDate}</span>
                        ) : (
                          <span>Odznaka nadal nie została zdobyta.</span>
                        )}
                      </div>
                    </Tooltip>
                    <strong style={{ opacity: badge.unlocked ? 1 : 0.4 }}>{badge.name}</strong>
                    <p style={{ opacity: badge.unlocked ? 1 : 0.4 }} className={'px-2'}>
                      {badge.description}
                    </p>
                  </Col>
                ))}
              </Row>
            }
          />
        </Col>
        <Col md={3} className={'p-0'}>
          <Row className={'m-0 h-50 pb-2 pr-2'}>
            <ContentCard
              header={'Posiadasz'}
              body={
                <div className={'h-100 w-100'}>
                  <p className={'text-center m-0'}>
                    <span style={{ fontSize: 80 }}>{studentBadgesNumber}</span>
                    <span className={'pl-5 position-absolute'} style={{ top: '50%' }}>
                      / {allBadgesNumber}
                    </span>
                    <br />
                    <span>odznak</span>
                  </p>
                  <p className={'text-center m-0'}>
                    Co stanowi
                    <strong> {Math.floor((studentBadgesNumber * 100) / allBadgesNumber)}% </strong>
                    wszystkich odznak.
                  </p>
                </div>
              }
            />
          </Row>
          <Row className={'m-0 h-50 pr-2'}>
            <ContentCard
              header={'Ostatnio zdobyta'}
              body={
                <div className={'h-100 w-100 text-center d-flex justify-content-center align-items-center flex-column'}>
                  <img width={75} src={lastUnlockedBadge.src} alt={'last unlocked badge'} />
                  <strong>{lastUnlockedBadge.name}</strong>
                  <p className={'px-2 '}>{lastUnlockedBadge.description}</p>
                </div>
              }
            />
          </Row>
        </Col>
      </Row>
    </Content>
  )
}

export default BadgesPage
