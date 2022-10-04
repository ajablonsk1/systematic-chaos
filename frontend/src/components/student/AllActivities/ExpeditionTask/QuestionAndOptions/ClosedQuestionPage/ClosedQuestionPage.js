import React, { useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Answer, ButtonRow, QuestionCard } from '../QuestionAndOptionsStyle'
import answerSaver from '../answerSaver'
import { connect } from 'react-redux'

function ClosedQuestionPage(props) {
  const answersParent = useRef(null)

  // this array should only have an id
  const [userAnswers, setUserAnswers] = useState([])

  const updateUserAnswers = () => {
    // remove last element using slice, it's the confirm answer button
    const answers = Array.from(answersParent.current.children).slice(0, -1)
    const answersInputs = answers.map((answer) => answer.children[0].children[0])

    const chosenAnswers = answersInputs.filter((input) => input.checked).map((element) => ({ id: +element.value }))

    setUserAnswers(chosenAnswers)
  }

  const saveAnswer = () => {
    answerSaver(userAnswers, props.question.type, props.expeditionId, props.question.id, props.reloadInfo)
  }

  return (
    <Row
      style={{
        margin: 0
      }}
    >
      <Col lg={8}>
        <QuestionCard $fontColor={props.theme.font} $background={props.theme.primary}>
          <div>{props.question.hint}</div>
          <div>
            <p>{props.question.content}</p>
          </div>
          <div>Punkty: {props.question.points}</div>
        </QuestionCard>
      </Col>
      <Col lg={4} className='py-lg-0 py-3' ref={answersParent}>
        {props.question.options.map((answer) => (
          <Answer key={answer.id} className='mx-lg-0 mx-auto'>
            <Col xxl={1} xs={2} onChange={() => updateUserAnswers()}>
              <input
                name='answer'
                type={props.question.type === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'}
                value={answer.id}
              />
              {/* <span className='checkmark'/> */}
            </Col>
            <Col xxl={11} xs={10}>
              {answer.content}
            </Col>
          </Answer>
        ))}
        <ButtonRow>
          <button style={{ marginBottom: '50px' }} onClick={() => saveAnswer()}>
            Wyślij
          </button>
        </ButtonRow>
      </Col>
    </Row>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(ClosedQuestionPage)
