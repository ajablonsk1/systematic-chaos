import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { SummaryContainer } from './ExpeditionSummaryStyle'
import { ButtonRow } from '../QuestionAndOptions/QuestionAndOptionsStyle'
import { useLocation, useNavigate } from 'react-router-dom'

import Loader from '../../../../general/Loader/Loader'

import { Content } from '../../../../App/AppGeneralStyles'
import ExpeditionService from '../../../../../services/expedition.service'
import { getTimer } from '../../../../../utils/storageManager'
import { GeneralRoutes, StudentRoutes } from '../../../../../routes/PageRoutes'
import { connect } from 'react-redux'

function ExpeditionSummary(props) {
  const navigate = useNavigate()
  const [maxPointsOpen, setMaxPointsOpen] = useState(0)
  const [maxPointsClosed, setMaxPointsClosed] = useState(0)
  const [scoredPoints, setScoredPoints] = useState(0)
  const [closedQuestionPoints, setClosedQuestionPoints] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const location = useLocation()
  const { expeditionId, isFinished } = location.state
  const [loaded, setLoaded] = useState(false)
  const [activityScore, setActivityScore] = useState(undefined)

  useEffect(() => {
    ExpeditionService.getExpeditionScore(expeditionId)
      .then((response) => {
        setActivityScore(response || -1)
      })
      .catch(() => {
        setActivityScore(null)
      })
  }, [expeditionId])

  useEffect(() => {
    if (expeditionId == null) {
      navigate(GeneralRoutes.HOME)
    } else if (activityScore !== undefined) {
      const promise1 = ExpeditionService.getExpeditionPointsMaxOpen(activityScore)
        .then((response) => setMaxPointsOpen(response ?? 0))
        .catch(() => setMaxPointsOpen(0))

      // TODO: For now we get points from /all, later we will get it from getActivityScore() when it gets fixed
      //StudentService.getActivityScore()...
      const promise2 = ExpeditionService.getExpeditionAllPoints(activityScore)
        .then((response) => {
          setScoredPoints(response !== '' ? response : 0)
        })
        .catch(() => setScoredPoints(0))

      const promise3 = ExpeditionService.getExpeditionPointsClosed(activityScore)
        .then((response) => setClosedQuestionPoints(response ?? 0))
        .catch(() => setClosedQuestionPoints(0))

      const promise4 = ExpeditionService.getExpeditionPointsMaxClosed(activityScore)
        .then((response) => setMaxPointsClosed(response ?? 0))
        .catch(() => setMaxPointsClosed(0))

      const promise5 = ExpeditionService.getRemainingTime(activityScore)
        .then((response) => setRemainingTime(response ?? 0))
        .catch(() => setRemainingTime(0))

      Promise.allSettled([promise1, promise2, promise3, promise4, promise5]).then(() => setLoaded(true))
    }
  }, [expeditionId, navigate, activityScore])

  const finishExpeditionAndGoHome = () => {
    navigate(StudentRoutes.GAME_MAP.MAIN)
  }

  const showRemainingTime = () => {
    const timer = getTimer(remainingTime / 1000).split(':')
    const seconds = timer[2]
    const minutes = timer[1]
    const hours = timer[0]
    let timeString = seconds + 's'

    if (minutes !== '00' || (minutes === '00' && hours !== '00')) {
      timeString = minutes + 'min, ' + timeString
    }

    if (hours !== '00') {
      timeString = hours + 'h, ' + timeString
    }

    return timeString
  }

  return (
    <Content>
      {!loaded ? (
        <Loader />
      ) : (
        <SummaryContainer $background={props.theme.primary} $fontColor={props.theme.font}>
          <Row className='m-0'>
            <h2>Gratulacje, ukończyłeś ekspedycję!</h2>
          </Row>
          <Row className='m-0'>
            <h3>Twój wynik:</h3>
          </Row>
          <Row className='mx-0 my-5 d-flex flex-column'>
            <p style={{ fontSize: 20 }}>
              Liczba punktów razem na wybranej ścieżce:{' '}
              <strong>
                {scoredPoints}/{maxPointsClosed + maxPointsOpen}
              </strong>
            </p>
            <p style={{ fontSize: 20 }}>
              Punkty z pytań zamkniętych na wybranej ścieżce: {/* there will be a closed all endpoint later*/}
              <strong>
                {closedQuestionPoints}/{maxPointsClosed}
              </strong>
            </p>
            <p style={{ fontSize: 20 }}>
              Punkty z pytań otwartych na wybranej ścieżce: {/* there will be a closed all endpoint later*/}
              <strong>
                {scoredPoints - closedQuestionPoints}/{maxPointsOpen}
              </strong>
            </p>
            {/* if expedition is not finished (the user didn't answer the last possible question) we don't show the time */}
            {remainingTime > 0 && isFinished ? (
              <p style={{ fontSize: 20 }}>
                Ukończono: <strong>{showRemainingTime()}</strong> przed czasem.
              </p>
            ) : (
              <p style={{ fontSize: 20 }}>Aktywność nie została ukończona w całości</p>
            )}
          </Row>
          <Row>
            <ButtonRow>
              <button className='w-100' onClick={() => finishExpeditionAndGoHome()}>
                Wróć do strony głównej
              </button>
            </ButtonRow>
          </Row>
        </SummaryContainer>
      )}
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ExpeditionSummary)
