import { Content } from '../../../App/AppGeneralStyles'
import {
  ActivityCol,
  ActivityImg,
  ActivityName,
  ActivityType,
  FullDivider,
  HeaderCol,
  HeaderRow,
  SmallDivider
} from '../ExpeditionTask/ActivityInfo/ActivityInfoStyles'
import {
  Activity,
  ERROR_OCCURRED,
  FIELD_REQUIRED,
  getActivityImg,
  getActivityTypeName
} from '../../../../utils/constants'
import { useLocation } from 'react-router-dom'
import Loader from '../../../general/Loader/Loader'
import { InfoContainer } from '../ExpeditionTask/ActivityInfo/InfoContainer'
import { Formik } from 'formik'
import { Col, Container, Form, Row, Spinner } from 'react-bootstrap'
import { faFaceMeh, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { IconColumn } from './IconColumn'
import { FormButton, FormikRange, FormikTextarea } from './SurveyTaskStyle'
import { useEffect, useState } from 'react'
import SurveyTaskService from '../../../../services/surveyTask.service'
import { connect } from 'react-redux'

function FeedbackTask(props) {
  const location = useLocation()
  const { activityId: taskId } = location.state
  const [task, setTask] = useState(undefined)

  useEffect(() => {
    SurveyTaskService.getSurveyTask(taskId)
      .then((response) => {
        setTask(response)
      })
      .catch(() => {
        setTask(ERROR_OCCURRED)
      })
  }, [taskId])

  return (
    <Content>
      <InfoContainer $background={props.theme.primary} $fontColor={props.theme.font}>
        {!task ? (
          <Loader />
        ) : task === ERROR_OCCURRED ? (
          <p>{ERROR_OCCURRED}</p>
        ) : (
          <ActivityCol className='invisible-scroll'>
            <HeaderCol $background={props.theme.primary}>
              <HeaderRow $background={props.theme.primary} $fontColor={props.theme.font}>
                <ActivityImg src={getActivityImg(Activity.SURVEY)}></ActivityImg>
                <ActivityType>{getActivityTypeName(Activity.SURVEY)}</ActivityType>
                <ActivityName>{task.name}</ActivityName>
              </HeaderRow>
              <FullDivider $background={props.theme.warning} />
              <div>
                <h5>{task.description}</h5>
                <SmallDivider $background={props.theme.warning} />
                <h5>Punkty do zdobycia: {task.experience}</h5>
                <p>
                  Przyznane punkty: <strong>nie</strong> {/*// todo: info from endpoint*/}
                </p>
                <SmallDivider $background={props.theme.warning} />
              </div>
              <FullDivider $background={props.theme.warning} />
              <Formik
                initialValues={{
                  opinion: '',
                  score: '3'
                }}
                validate={(values) => {
                  const errors = {}
                  if (!values.opinion) errors.opinion = FIELD_REQUIRED
                  if (!values.score) errors.score = FIELD_REQUIRED
                  return errors
                }}
                onSubmit={(values, { setSubmitting }) => {
                  alert(JSON.stringify(values, null, 2))
                  setSubmitting(false)
                }}
              >
                {({ isSubmitting, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Container>
                      <Row className='mx-auto'></Row>
                      <p>Jakie są Twoje wrażenia z tego rodziału? Co można zmienić, poprawić, a co było w porządku?</p>
                      <FormikTextarea
                        as='textarea'
                        type='text'
                        name='opinion'
                        $fontColor={props.theme.font}
                        $background={props.theme.primary}
                      />

                      <Row className='mt-4 w-80'>
                        <IconColumn icons={[faThumbsDown, faThumbsDown]} />
                        <IconColumn icons={[faThumbsDown]} />
                        <IconColumn icons={[faFaceMeh]} />
                        <IconColumn icons={[faThumbsUp]} />
                        <IconColumn icons={[faThumbsUp, faThumbsUp]} />
                      </Row>
                      <Row className='mt-4 justify-content-center'>
                        <FormikRange
                          $accentColor={props.theme.success}
                          type='range'
                          min={1}
                          max={5}
                          name='score'
                        ></FormikRange>
                      </Row>

                      <Row className='mt-4 d-flex justify-content-center'>
                        <Col sm={12} className='d-flex justify-content-center mb-2'>
                          <FormButton $buttonColor={props.theme.success} type='submit' disabled={isSubmitting}>
                            {isSubmitting ? (
                              <Spinner as='span' animation='border' size='sm' role='status' />
                            ) : (
                              <span>Wyślij</span>
                            )}
                          </FormButton>
                        </Col>
                      </Row>
                    </Container>
                  </Form>
                )}
              </Formik>
            </HeaderCol>
          </ActivityCol>
        )}
      </InfoContainer>
    </Content>
  )
}

function mapStateToProps(state) {
  const theme = state.theme

  return { theme }
}
export default connect(mapStateToProps)(FeedbackTask)
