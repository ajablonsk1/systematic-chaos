import React, { useEffect, useState } from 'react'
import { Door, DoorColumn } from './QuestionSelectionDoorStyles'
import { Button, Row } from 'react-bootstrap'
import { Content } from '../../../../App/AppGeneralStyles'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../../../general/Loader/Loader'
import ExpeditionService from '../../../../../services/expedition.service'
import { ERROR_OCCURRED } from '../../../../../utils/constants'
import { GeneralRoutes, StudentRoutes } from '../../../../../routes/PageRoutes'

// if only one element of id -1 or -2 then do not generate doors but go to score screen
// will be done in routing after answering a question, so that we never get only the start or only the end node here

//with API - with null?

function generateDoor(question, expeditionId, noDoors, reloadInfo) {
  return (
    <DoorColumn key={question.id + Date.now()} xl={12 / noDoors} md={12}>
      <Row className='mx-auto'>
        <h3>{question.difficulty?.toUpperCase()}</h3>
      </Row>

      <Row>
        <Door />
      </Row>

      <Row className='mx-auto'>
        <h3>{question.hint?.toUpperCase()}</h3>
      </Row>

      <Row className='mx-auto'>
        <Button
          onClick={() =>
            // change state, reloadInfo
            ExpeditionService.sendAction({
              status: 'CHOOSE',
              graphTaskId: expeditionId,
              questionId: question.id,
              answerForm: null
            }).then(() => reloadInfo())
          }
        >
          Wybierz
        </Button>
      </Row>
    </DoorColumn>
  )
}

// what do we need here?
// activityId
// reload callback
// list of questions
// remaining time

function QuestionSelectionDoor(props) {
  const { activityId: expeditionId, questions, reloadInfo } = props

  // useEffect(() => {
  //   if (parentId == null || expeditionId == null || taskResultId == null) {
  //     navigate(GeneralRoutes.HOME)
  //   } else {
  //     ExpeditionService.getChildQuestions(parentId)
  //       .then((response) => setQuestions(response))
  //       .catch(() => setQuestions(null))
  //   }
  // }, [parentId, expeditionId, navigate, taskResultId])

  // useEffect(() => {
  //   if (remainingTime === 0 || questionList?.length === 0) {
  //     ExpeditionService.setSendTime(taskResultId, Date.now())
  //       .then(() => {
  //         navigate(StudentRoutes.GAME_MAP.GRAPH_TASK.SUMMARY, {
  //           state: {
  //             expeditionId: expeditionId,
  //             remainingTime: remainingTime,
  //             taskResultId: taskResultId
  //           }
  //         })
  //       })
  //       .catch(() => {})
  //   }
  // }, [questions, expeditionId, navigate, remainingTime, taskResultId])

  return (
    <Content>
      {questions == null ? (
        <p className={'text-center text-danger h3 p-5'}>{ERROR_OCCURRED}</p>
      ) : (
        <Row className='m-0'>
          {questions.map((question) => generateDoor(question, expeditionId, questions.length, reloadInfo))}
        </Row>
      )}
    </Content>
  )
}

export default QuestionSelectionDoor
