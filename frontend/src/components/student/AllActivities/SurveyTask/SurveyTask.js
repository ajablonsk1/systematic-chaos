import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Activity,
  ALL_REQUIRED_FIELDS_MUST_BE_FULFILLED,
  ANSWER_SAVED,
  ERROR_OCCURRED,
  getActivityTypeName
} from '../../../../utils/constants'
import { useLocation } from 'react-router-dom'
import Loader from '../../../general/Loader/Loader'
import { Button, Col, Form, FormControl, FormGroup, FormLabel, Row, Spinner } from 'react-bootstrap'
import { fa1, fa2, fa3, fa4, fa5 } from '@fortawesome/free-solid-svg-icons'
import { RangeSlider } from './SurveyTaskStyle'
import SurveyTaskService from '../../../../services/surveyTask.service'
import { connect } from 'react-redux'
import GameCard from '../../GameCardPage/GameCard'
import { CustomTable } from '../../GameCardPage/gameCardContentsStyle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { successToast } from '../../../../utils/toasts'

const icons = [fa1, fa2, fa3, fa4, fa5]

function FeedbackTask(props) {
  const location = useLocation()
  const { activityId: taskId } = location.state

  const [task, setTask] = useState(undefined)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const [isAnswerSending, setIsAnswerSending] = useState(false)

  const feedbackRef = useRef()
  const rateRef = useRef()

  const tableContent = useMemo(
    () => [
      {
        header: 'Typ aktywności',
        body: getActivityTypeName(Activity.SURVEY)
      },
      {
        header: 'Nazwa aktywności',
        body: task?.name
      },
      {
        header: 'Opis aktywności',
        body: task?.description
      },
      {
        header: 'Punkty do zdobycia',
        body: task?.experience
      }
    ],
    [task?.name, task?.description, task?.experience]
  )

  useEffect(() => {
    SurveyTaskService.getSurveyTask(taskId)
      .then((response) => {
        setTask(response)
      })
      .catch(() => {
        setTask(ERROR_OCCURRED)
      })
  }, [taskId])

  const sendAnswer = () => {
    if (!!rateRef.current?.value && !!feedbackRef.current?.value) {
      setIsAnswerSending(true)
      SurveyTaskService.sendSurveyFeedback(taskId, rateRef.current.value, feedbackRef.current.value)
        .then(() => {
          setErrorMessage(undefined)
          successToast(ANSWER_SAVED)
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message ?? ERROR_OCCURRED)
        })
        .finally(() => {
          setIsAnswerSending(false)
        })
    } else {
      setErrorMessage(ALL_REQUIRED_FIELDS_MUST_BE_FULFILLED)
    }
  }

  return (
    <>
      <Row className={'m-0 pt-2'}>
        <Col>
          <GameCard
            headerText={'Informacje o aktywności'}
            content={
              task === undefined ? (
                <Loader />
              ) : task == null ? (
                <p>{ERROR_OCCURRED}</p>
              ) : (
                <CustomTable
                  $borderColor={props.theme.secondary}
                  $background={props.theme.secondary}
                  $fontColor={props.theme.font}
                  style={{ border: 'none' }}
                >
                  <tbody>
                    {tableContent.map((row, index) => (
                      <tr key={index}>
                        <th width={'25%'}>{row.header}</th>
                        <td>{row.body}</td>
                      </tr>
                    ))}
                  </tbody>
                </CustomTable>
              )
            }
          />
        </Col>
      </Row>
      <Row className={'m-0 pt-2'}>
        <Col>
          <GameCard
            headerText={'Twoja odpowiedź'}
            content={
              task === undefined ? (
                <Loader />
              ) : task == null ? (
                <p>{ERROR_OCCURRED}</p>
              ) : (
                <Form>
                  <FormGroup>
                    <FormLabel>Twoja opinia (wymagane)</FormLabel>
                    <FormControl
                      as={'textarea'}
                      ref={feedbackRef}
                      rows={3}
                      defaultValue={task.feedback.feedback}
                      style={{
                        color: props.theme.font,
                        backgroundColor: props.theme.secondary,
                        borderColor: props.theme.primary
                      }}
                    />
                  </FormGroup>
                  <FormGroup className={'my-3'}>
                    <FormLabel>Twoja ocena (wymagane)</FormLabel>
                    <div className={'d-flex justify-content-between w-100 h5 mt-3'}>
                      {icons.map((icon, index) => (
                        <FontAwesomeIcon key={index} icon={icon} />
                      ))}
                    </div>
                    <RangeSlider
                      ref={rateRef}
                      type={'range'}
                      min={1}
                      max={5}
                      defaultValue={task.feedback.rate}
                      $accentColor={props.theme.success}
                    />
                  </FormGroup>
                  <Button
                    onClick={sendAnswer}
                    className={'position-relative start-50 translate-middle-x mb-3'}
                    style={{ borderColor: props.theme.success, backgroundColor: props.theme.success }}
                  >
                    {isAnswerSending ? <Spinner animation={'border'} /> : <span>Wyślij</span>}
                  </Button>
                  {errorMessage ? (
                    <p style={{ color: props.theme.danger }} className={'text-center'}>
                      {errorMessage}
                    </p>
                  ) : null}
                </Form>
              )
            }
          />
        </Col>
      </Row>
    </>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(FeedbackTask)
