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
import { Activity, FIELD_REQUIRED, getActivityImg, getActivityTypeName } from '../../../../utils/constants'
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

export default function FeedbackTask() {
  const location = useLocation()
  const { activityId: taskId } = location.state
  const [task, setTask] = useState()

  useEffect(() => {
    SurveyTaskService.getSurveyTask(taskId).then((response) => {
      setTask(response)
    })
  }, [taskId])

  return (
    <Content>
      <InfoContainer>
        {!task ? (
          <Loader />
        ) : (
          <ActivityCol className='invisible-scroll'>
            <HeaderCol>
              <HeaderRow>
                <ActivityImg src={getActivityImg(Activity.SURVEY)}></ActivityImg>
                <ActivityType>{getActivityTypeName(Activity.SURVEY)}</ActivityType>
                <ActivityName>{task.name}</ActivityName>
              </HeaderRow>
              <FullDivider />
              <div>
                <h5>{task.description}</h5>
                <SmallDivider />
                <h5>Punkty do zdobycia: {task.points}</h5>
                <p>
                  Przyznane punkty: <strong>nie</strong> {/*// todo: info from endpoint*/}
                </p>{' '}
                <SmallDivider />
              </div>
              <FullDivider />
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
                {({ isSubmitting, values, errors, handleSubmit }) => (
                  <Form onSubmit={handleSubmit}>
                    <Container>
                      <Row className='mx-auto'></Row>
                      <p>Jakie są Twoje wrażenia z tego rodziału? Co można zmienić, poprawić, a co było w porządku?</p>
                      <FormikTextarea as='textarea' type='text' name='opinion' />

                      <Row className='mt-4 w-80'>
                        <IconColumn icons={[faThumbsDown, faThumbsDown]} />
                        <IconColumn icons={[faThumbsDown]} />
                        <IconColumn icons={[faFaceMeh]} />
                        <IconColumn icons={[faThumbsUp]} />
                        <IconColumn icons={[faThumbsUp, faThumbsUp]} />
                      </Row>
                      <Row className='mt-4 justify-content-center'>
                        <FormikRange type='range' min={1} max={5} name='score'></FormikRange>
                      </Row>

                      <Row className='mt-4 d-flex justify-content-center'>
                        <Col sm={12} className='d-flex justify-content-center mb-2'>
                          <FormButton type='submit' disabled={isSubmitting}>
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
