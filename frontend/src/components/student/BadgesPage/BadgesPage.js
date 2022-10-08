import React, { useCallback, useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Col, Row } from 'react-bootstrap'
import { HorizontalPointsLine, PercentageBar, Tooltip } from './BadgesStyle'
import { getBadgesInfo, getBadgesList, getLastUnlockedBadge } from './mockData'
import ContentCard from './ContentCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import Fade, { Bounce, Slide } from 'react-awesome-reveal'
import { connect } from 'react-redux'
import RankService from '../../../services/rank.service'
import Loader from '../../general/Loader/Loader'
import { base64Header, ERROR_OCCURRED } from '../../../utils/constants'

const LATER_ITEM_DELAY = 1200
const BADGE_LIST_STEP = 200

function BadgesPage(props) {
  const [studentBadgesNumber, allBadgesNumber] = getBadgesInfo()
  const badgesList = getBadgesList()
  const lastUnlockedBadge = getLastUnlockedBadge()
  const [rankInfo, setRankInfo] = useState(undefined)

  useEffect(() => {
    RankService.getCurrentStudentRank()
      .then((response) => {
        setRankInfo(response)
      })
      .catch(() => {
        setRankInfo(null)
      })
  }, [])

  const sortBadges = (a, b) => {
    if (a.unlocked) {
      return -1
    } else return 1
  }

  const additionalContent = useCallback(
    (rankIndex) => {
      if (rankIndex === 0) {
        return rankInfo.previousRank ? <FontAwesomeIcon icon={faCircleCheck} /> : null
      }

      if (rankIndex === 1) {
        const PERCENTAGE_BAR_WIDTH = 200
        const studentPoints = rankInfo.currentPoints
        const nextRankPoints = rankInfo?.nextRank.minPoints

        if (!nextRankPoints) {
          return null
        }

        const getGreenBarWidth = ((studentPoints / nextRankPoints) * PERCENTAGE_BAR_WIDTH).toFixed(0)

        const getPercentageValue = Math.floor((studentPoints * 100) / nextRankPoints)

        return (
          <PercentageBar $greenBarWidth={getGreenBarWidth} $grayBarWidth={PERCENTAGE_BAR_WIDTH}>
            <strong>{getPercentageValue}%</strong>
          </PercentageBar>
        )
      }

      return <></>
    },
    [rankInfo]
  )

  return (
    <Content>
      {rankInfo === undefined ? (
        <Loader />
      ) : rankInfo == null ? (
        <p>{ERROR_OCCURRED}</p>
      ) : (
        <>
          <Slide delay={LATER_ITEM_DELAY}>
            <Row className={'m-0 text-center py-3'}>
              <Col>
                <strong>Twoja ranga: </strong>
                <span>{rankInfo.currentRank.name}</span>
              </Col>
              <Col>
                <strong>Liczba punktów: </strong>
                <span>{rankInfo.currentPoints}</span>
              </Col>
              <Col>
                <strong>Do następnej rangi brakuje: </strong>
                <span>{rankInfo.nextRank.minPoints - rankInfo.currentPoints} pkt</span>
              </Col>
            </Row>
          </Slide>
          <Row className={'m-0'}>
            <Col md={12}>
              <HorizontalPointsLine $pointsColor={props.theme.success} $background={props.theme.secondary}>
                <ul>
                  {[rankInfo.previousRank, rankInfo.currentRank, rankInfo.nextRank].map((rank, index) => (
                    <li key={index + Date.now()}>
                      <div>
                        <div className={'pointsInfo'}>{rank ? `> ${rank.minPoints} pkt` : '-'}</div>
                        <div className={'rankInfo'}>
                          <div className={'left-arrow'} />
                          <p>
                            <strong>{rank?.name ?? 'Brak odznaki'}</strong>
                          </p>
                          {rank?.image ? (
                            <img width={100} src={base64Header + rank.image} alt={'rank-profile'} />
                          ) : (
                            <p>Brak obrazka</p>
                          )}

                          {additionalContent(index)}
                          <div className={'right-arrow'} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </HorizontalPointsLine>
            </Col>
          </Row>
        </>
      )}
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
                    <Fade delay={BADGE_LIST_STEP * index}>
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
                    </Fade>
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
                  <Bounce delay={LATER_ITEM_DELAY}>
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
                  </Bounce>
                </div>
              }
            />
          </Row>

          <Row className={'m-0 h-50 pr-2'}>
            <ContentCard
              header={'Ostatnio zdobyta'}
              body={
                <div className={'h-100 w-100 text-center d-flex justify-content-center align-items-center flex-column'}>
                  <Bounce delay={LATER_ITEM_DELAY}>
                    <img width={75} src={lastUnlockedBadge.src} alt={'last unlocked badge'} />
                    <strong>{lastUnlockedBadge.name}</strong>
                    <p className={'px-2 '}>{lastUnlockedBadge.description}</p>
                  </Bounce>
                </div>
              }
            />
          </Row>
        </Col>
      </Row>
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(BadgesPage)
