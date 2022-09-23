import { Door, DoorColumn } from './QuestionSelectionDoorStyles'
import { Button, Row } from 'react-bootstrap'
import { Content } from '../../../../App/AppGeneralStyles'
import ExpeditionService from '../../../../../services/expedition.service'
import { ERROR_OCCURRED } from '../../../../../utils/constants'

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

function QuestionSelectionDoor(props) {
  const { activityId: expeditionId, questions, reloadInfo } = props

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
