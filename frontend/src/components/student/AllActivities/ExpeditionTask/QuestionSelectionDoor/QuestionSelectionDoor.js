import React, { useEffect, useState } from 'react'
import { Door, DoorColumn } from './QuestionSelectionDoorStyles'
import { Button, Row } from 'react-bootstrap'
import { Content } from '../../../../App/AppGeneralStyles'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../../../general/Loader/Loader'
import ExpeditionService from '../../../../../services/expedition.service'
import { generateFullPath, PageRoutes } from '../../../../../routes/PageRoutes'
import { ERROR_OCCURED } from '../../../../../utils/constants'

// if only one element of id -1 or -2 then do not generate doors but go to score screen
// will be done in routing after answering a question, so that we never get only the start or only the end node here

//with API - with null?

function generateDoor(question, navigate, expeditionId, noDoors, taskResultId) {
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
            navigate(
              generateFullPath(() => PageRoutes.Student.GameMap.Expedition.QUESTION_ANSWER),
              {
                state: { activityId: expeditionId, nodeId: question.id, taskResultId }
              }
            )
          }
        >
          Wybierz
        </Button>
      </Row>
    </DoorColumn>
  )
}

function QuestionSelectionDoor(props) {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState(null)
  const location = useLocation()
  const { activityId: expeditionId, nodeId: parentId, taskResultId } = location.state
  const remainingTime = props.remainingTime

  useEffect(() => {
    if (parentId == null || expeditionId == null || taskResultId == null) {
      navigate(generateFullPath(() => PageRoutes.General.HOME))
    } else {
      ExpeditionService.getChildQuestions(parentId)
        .then((response) => setQuestions(response))
        .catch(() => setQuestions(null))
    }
  }, [parentId, expeditionId, navigate, taskResultId])

  useEffect(() => {
    if (remainingTime === 0 || questions?.length === 0) {
      navigate(
        generateFullPath(() => PageRoutes.Student.GameMap.Expedition.EXPEDITION_SUMMARY),
        {
          state: {
            expeditionId: expeditionId,
            remainingTime: remainingTime,
            taskResultId: taskResultId
          }
        }
      )
    }
  }, [questions, expeditionId, navigate, remainingTime, taskResultId])

  return (
    <Content>
      {questions === undefined ? (
        <Loader />
      ) : questions == null ? (
        <p className={'text-center text-danger h3 p-5'}>{ERROR_OCCURED}</p>
      ) : (
        <Row className='m-0'>
          {questions.map((question) => generateDoor(question, navigate, expeditionId, questions.length, taskResultId))}
        </Row>
      )}
    </Content>
  )
}

export default QuestionSelectionDoor
