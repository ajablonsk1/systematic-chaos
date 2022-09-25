import { Door, DoorColumn } from './QuestionSelectionDoorStyles'
import { Button, Row } from 'react-bootstrap'
import { Content } from '../../../../App/AppGeneralStyles'
import ExpeditionService from '../../../../../services/expedition.service'
import { ERROR_OCCURRED, EXPEDITION_STATUS } from '../../../../../utils/constants'

function generateDoor(question, noDoors, onDoorClick) {
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
        <Button onClick={() => onDoorClick(question.id)}>Wybierz</Button>
      </Row>
    </DoorColumn>
  )
}

function QuestionSelectionDoor(props) {
  const { activityId: expeditionId, questions, reloadInfo } = props

  const onDoorClick = (questionId) => {
    // change state, reloadInfo
    ExpeditionService.sendAction({
      status: EXPEDITION_STATUS.CHOOSE,
      graphTaskId: expeditionId,
      questionId: questionId,
      answerForm: null
    }).then(() => reloadInfo())
  }

  return (
    <Content>
      {questions == null ? (
        <p className={'text-center text-danger h3 p-5'}>{ERROR_OCCURRED}</p>
      ) : (
        <Row className='m-0'>{questions.map((question) => generateDoor(question, questions.length, onDoorClick))}</Row>
      )}
    </Content>
  )
}

export default QuestionSelectionDoor
