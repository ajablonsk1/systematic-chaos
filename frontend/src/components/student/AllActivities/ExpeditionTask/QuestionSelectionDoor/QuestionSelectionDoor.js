import { Door, DoorColumn } from './QuestionSelectionDoorStyles'
import { Button, Row } from 'react-bootstrap'
import { Content } from '../../../../App/AppGeneralStyles'
import ExpeditionService from '../../../../../services/expedition.service'
import { ERROR_OCCURRED, EXPEDITION_STATUS } from '../../../../../utils/constants'
import { connect } from 'react-redux'

function generateDoor(question, noDoors, onDoorClick, buttonColor, questionType) {
  return (
    <DoorColumn key={question.id + Date.now()} xl={12 / noDoors} md={12}>
      <Row className='mx-auto'>
        <h3 className={'text-center'}>{question.difficulty?.toUpperCase()}</h3>
        {questionType?.id === question.id ? (
          <h5 className={'m-0 p-0 text-center'}>{questionType.type} pkt</h5>
        ) : (
          <p style={{ margin: '12px 0' }} />
        )}
      </Row>

      <Row>
        <Door />
      </Row>

      <Row className='mx-auto'>
        <h3>{question.hint?.toUpperCase()}</h3>
      </Row>

      <Row className='mx-auto'>
        <Button
          onClick={() => onDoorClick(question.id)}
          style={{ backgroundColor: buttonColor, borderColor: buttonColor }}
        >
          Wybierz
        </Button>
      </Row>
    </DoorColumn>
  )
}

function QuestionSelectionDoor(props) {
  const { activityId: expeditionId, questions, reloadInfo } = props
  const questionType = JSON.parse(localStorage.getItem('questionPoints'))

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
        <p className={'text-center h3 p-5'} style={{ color: props.theme.danger }}>
          {ERROR_OCCURRED}
        </p>
      ) : (
        <Row className='m-0'>
          {questions.map((question) =>
            generateDoor(question, questions.length, onDoorClick, props.theme.success, questionType)
          )}
        </Row>
      )}
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(QuestionSelectionDoor)
