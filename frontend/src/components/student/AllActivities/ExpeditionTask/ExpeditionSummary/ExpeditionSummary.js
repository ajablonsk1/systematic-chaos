import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { SummaryContainer } from './ExpeditionSummaryStyle'
import { ButtonRow } from '../QuestionAndOptions/QuestionAndOptionsStyle'
import { useLocation, useNavigate } from 'react-router-dom'
import { finishExpedition, timer } from '../../../../../utils/storageManager'

import Loader from '../../../../general/Loader/Loader'

import { Content } from '../../../../App/AppGeneralStyles'
import ExpeditionService from '../../../../../services/expedition.service'
import { generateFullPath, PageRoutes } from '../../../../../routes/PageRoutes'

export default function ExpeditionSummary() {
  const navigate = useNavigate()
  const [maxPointsOpen, setMaxPointsOpen] = useState()
  const [maxPointsClosed, setMaxPointsClosed] = useState()
  const [scoredPoints, setScoredPoints] = useState()
  const [closedQuestionPoints, setClosedQuestionPoints] = useState()
  const location = useLocation()
  const { expeditionId, remainingTime, taskResultId } = location.state
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (expeditionId == null) {
      navigate(generateFullPath(() => PageRoutes.General.HOME))
    } else {
      const promise1 = ExpeditionService.getExpeditionPointsMaxOpen(taskResultId).then((response) =>
        setMaxPointsOpen(response)
      )

      // TODO: For now we get points from /all, later we will get it from getActivityScore() when it gets fixed
      //StudentService.getActivityScore()...
      const promise2 = ExpeditionService.getExpeditionAllPoints(taskResultId).then((response) =>
        setScoredPoints(response)
      )

      const promise3 = ExpeditionService.getExpeditionPointsClosed(taskResultId).then((response) =>
        setClosedQuestionPoints(response)
      )

      const promise4 = ExpeditionService.getExpeditionPointsMaxClosed(taskResultId).then((response) =>
        setMaxPointsClosed(response)
      )

      Promise.allSettled([promise1, promise2, promise3, promise4]).then(() => setLoaded(true))
    }
  }, [expeditionId, navigate, taskResultId])

  const finishExpeditionAndGoHome = () => {
    finishExpedition(expeditionId)
    navigate(generateFullPath(() => PageRoutes.Student.GameMap.GAME_MAP))
  }

  const showRemainingTime = () =>
    remainingTime > 60 ? timer(remainingTime).replace(':', 'min ') + 's' : remainingTime + 's'

  return (
    <Content>
      {!loaded ? (
        <Loader />
      ) : (
        <SummaryContainer>
          <Row className='m-0'>
            <h2>Gratulacje, uko??czy??e?? ekspedycj??!</h2>
          </Row>
          <Row className='m-0'>
            <h3>Tw??j wynik:</h3>
          </Row>
          <Row className='mx-0 my-5 d-flex flex-column'>
            <p style={{ fontSize: 20 }}>
              Liczba punkt??w razem:{' '}
              <strong>
                {scoredPoints}/{maxPointsClosed + maxPointsOpen}
              </strong>
            </p>
            <p style={{ fontSize: 20 }}>
              Punkty z pyta?? zamkni??tych: {/* there will be a closed all endpoint later*/}
              <strong>
                {closedQuestionPoints} / {maxPointsClosed}
              </strong>
            </p>
            <p style={{ fontSize: 20 }}>
              Punkty z pyta?? otwartych: {/* there will be a closed all endpoint later*/}
              <strong>
                {scoredPoints - closedQuestionPoints}/{maxPointsOpen}
              </strong>
            </p>
            <p style={{ fontSize: 20 }}>
              Uko??czono: <strong>{showRemainingTime()}</strong> przed czasem.
            </p>
          </Row>
          <Row>
            <ButtonRow>
              <button className='w-100' onClick={() => finishExpeditionAndGoHome()}>
                Wr???? do strony g????wnej
              </button>
            </ButtonRow>
          </Row>
        </SummaryContainer>
      )}
    </Content>
  )
}
