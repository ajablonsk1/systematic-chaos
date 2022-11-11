import React, { useCallback, useEffect, useState } from 'react'
import { Content } from '../../App/AppGeneralStyles'
import { Col, Row } from 'react-bootstrap'
import { HorizontalPointsLine, PercentageBar } from './BadgesStyle'
import ContentCard from './ContentCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Bounce, Slide } from 'react-awesome-reveal'
import { connect } from 'react-redux'
import RankService from '../../../services/rank.service'
import Loader from '../../general/Loader/Loader'
import { base64Header, ERROR_OCCURRED } from '../../../utils/constants'
import { isMobileView } from '../../../utils/mobileHelper'
import UserService from '../../../services/user.service'
import { sortArray } from '../../general/Ranking/sortHelper'
import moment from 'moment'
import Tooltip from '../../general/Tooltip/Tooltip'

const LATER_ITEM_DELAY = 1200

function BadgesPage(props) {
  const isMobileDisplay = isMobileView()

  const [rankInfo, setRankInfo] = useState(undefined)
  const [allBadgesList, setAllBadgesList] = useState(undefined)
  const [unlockedBadgesList, setUnlockedBadgesList] = useState(undefined)
  const [lastUnlockedBadge, setLastUnlockedBadge] = useState(null)

  useEffect(() => {
    RankService.getCurrentStudentRank()
      .then((response) => {
        setRankInfo(response)
      })
      .catch(() => {
        setRankInfo(null)
      })

    UserService.getAllBadges()
      .then((response) => {
        setAllBadgesList(response)
      })
      .catch(() => {
        setAllBadgesList(null)
      })

    UserService.getUnlockedBadges()
      .then((response) => {
        setUnlockedBadgesList(response)
        setLastUnlockedBadge(sortArray(response, 'DESC', ['unlockedDateMillis'], {})[0])
      })
      .catch(() => {
        setUnlockedBadgesList(null)
      })
  }, [])

  const calculateMissingPoints = () => {
    if (!rankInfo.nextRank) {
      return '-'
    }

    return `${rankInfo.nextRank.minPoints - rankInfo.currentPoints}pkt`
  }

  const additionalContent = useCallback(
    (rankIndex) => {
      if (rankIndex === 0) {
        return rankInfo.previousRank ? <FontAwesomeIcon icon={faCircleCheck} /> : null
      }

      if (rankIndex === 1) {
        const PERCENTAGE_BAR_WIDTH = 200
        const studentPoints = rankInfo.currentPoints
        const nextRankPoints = rankInfo.nextRank?.minPoints
        const currentRankPoints = rankInfo.currentRank.minPoints

        if (!nextRankPoints) {
          return null
        }

        const progressPercentage = (studentPoints - currentRankPoints) / (nextRankPoints - currentRankPoints)
        const getGreenBarWidth = (progressPercentage * PERCENTAGE_BAR_WIDTH).toFixed(0)
        const getPercentageValue = Math.floor(progressPercentage * 100)

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

  const badgeContent = useCallback(
    (badge, index) => {
      const badgeUnlockedDate = unlockedBadgesList?.find((b) => {
        return b.badge.title === badge.title
      })?.unlockedDateMillis

      const tooltipText = !!badgeUnlockedDate
        ? `Odblokowano: ${moment(badgeUnlockedDate).format('DD.MM.YYYY, HH:mm')}`
        : 'Odznaka nadal nie została zdobyta.'

      return (
        <Col md={4} className={'text-center d-flex flex-column align-items-center'} key={index + Date.now()}>
          <img
            data-for={'badge-' + index}
            data-tip={tooltipText}
            style={{ opacity: !!badgeUnlockedDate ? 1 : 0.4 }}
            width={100}
            src={base64Header + badge.file.file}
            alt={'badge-icon'}
          />

          <p className={'m-0'}>
            <strong style={{ opacity: !!badgeUnlockedDate ? 1 : 0.4 }}>{badge.title}</strong>
          </p>
          <p style={{ opacity: !!badgeUnlockedDate ? 1 : 0.4 }} className={'px-2'}>
            {badge.description}
          </p>

          <Tooltip id={'badge-' + index} />
        </Col>
      )
    },
    [unlockedBadgesList]
  )

  return (
    <Content>
      {rankInfo === undefined ? (
        <Loader />
      ) : rankInfo == null ? (
        <p>{ERROR_OCCURRED}</p>
      ) : (
        <>
          <Slide delay={LATER_ITEM_DELAY} direction={'down'}>
            <Row className={'m-0 text-center py-3'}>
              <Col md={4}>
                <strong>Twoja ranga: </strong>
                <span>{rankInfo.currentRank.name}</span>
              </Col>
              <Col md={4}>
                <strong>Liczba punktów: </strong>
                <span>{rankInfo.currentPoints}</span>
              </Col>
              <Col md={4}>
                <strong>Do następnej rangi brakuje: </strong>
                <span>{calculateMissingPoints()}</span>
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
      <Row className={'mx-0 my-5'} style={{ maxHeight: isMobileDisplay ? '330vh' : '55vh' }}>
        <Col md={9} className={isMobileDisplay ? 'mb-3' : 'm-auto'}>
          <ContentCard
            maxHeight={'55vh'}
            header={'Odznaki'}
            body={
              allBadgesList === undefined ? (
                <Loader />
              ) : allBadgesList == null ? (
                <p>{ERROR_OCCURRED}</p>
              ) : (
                <Row className={'m-0 w-100 h-100'} style={{ overflow: 'visible' }}>
                  {allBadgesList?.map((badge, index) => badgeContent(badge, index))}
                </Row>
              )
            }
          />
        </Col>
        <Col md={3} className={`p-0 ${isMobileDisplay ? 'mb-5' : 'mb-0'}`}>
          <Row className={`pb-2 pr-2 m-0 ${isMobileDisplay ? 'mb-3' : 'mb-0 h-50'}`}>
            <ContentCard
              header={'Posiadasz'}
              body={
                <div className={'h-100 w-100'}>
                  <Bounce delay={LATER_ITEM_DELAY}>
                    <p className={'text-center m-0'}>
                      <span style={{ fontSize: 80 }}>{unlockedBadgesList?.length ?? 0}</span>
                      <span className={'pl-5 position-absolute'} style={{ top: '50%' }}>
                        / {allBadgesList?.length ?? 0}
                      </span>
                      <br />
                      <span>odznak</span>
                    </p>
                    <p className={'text-center m-0'}>
                      Co stanowi
                      <strong>
                        {' '}
                        {unlockedBadgesList && allBadgesList && allBadgesList?.length > 0
                          ? Math.floor((unlockedBadgesList.length * 100) / allBadgesList.length)
                          : 0}
                        %{' '}
                      </strong>
                      wszystkich odznak.
                    </p>
                  </Bounce>
                </div>
              }
            />
          </Row>

          <Row className={`m-0 pr-2 ${isMobileDisplay ? '' : 'h-50'}`}>
            <ContentCard
              header={'Ostatnio zdobyta'}
              body={
                <div className={'h-100 w-100 text-center'}>
                  <Bounce delay={LATER_ITEM_DELAY}>
                    {!lastUnlockedBadge ? (
                      <p>Nie zdobyto jeszcze żadnej odznaki.</p>
                    ) : (
                      <div className={'d-flex justify-content-center align-items-center flex-column'}>
                        <img
                          width={75}
                          src={base64Header + lastUnlockedBadge?.badge.file.file}
                          alt={lastUnlockedBadge.badge.file.name}
                        />
                        <strong>{lastUnlockedBadge.badge.title}</strong>
                        <p className={'px-2'}>{lastUnlockedBadge.badge.description}</p>
                      </div>
                    )}
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
