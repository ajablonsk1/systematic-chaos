import { Content } from '../App/AppGeneralStyles';
import {
    HeaderRow,
    HeaderCol,
    ActivityImg,
    ActivityName,
    ActivityType,
    FullDivider,
    ActivityCol,
    SmallDivider,
} from '../ActivityInfo/ActivityInfoStyles';
import { FIELD_REQUIRED, getActivityImg, getActivityTypeName } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { InfoContainer } from '../ActivityInfo/InfoContainer';
import { getSurveyTask } from '../../storage/surveyTask';
import { Formik } from 'formik';
import { Row, Col, Spinner, Form, Container } from 'react-bootstrap';
import { faThumbsDown, faThumbsUp, faFaceMeh } from '@fortawesome/free-solid-svg-icons';
import { IconColumn } from './IconColumn';
import { FormButton, FormikRange, FormikTextarea } from './SurveyTaskStyle';

export default function FeedbackTask() {
    const location = useLocation();
    //also chapterID later
    const { activityId: taskId } = location.state;
    //later with correct ids
    const task = getSurveyTask(null, taskId); // todo: use endpoint

    return (
        <Content>
            <InfoContainer>
                {taskId === undefined ? (
                    <Loader />
                ) : (
                    <ActivityCol className="invisible-scroll">
                        <HeaderCol>
                            <HeaderRow>
                                <ActivityImg src={getActivityImg(task.type)}></ActivityImg>
                                <ActivityType>{getActivityTypeName(task.type)}</ActivityType>
                                <ActivityName>{task.name}</ActivityName>
                            </HeaderRow>
                            <FullDivider />
                            <div>
                                <h5>
                                    Podziel się opinią na temat rozdziału aby zdobyć dodatkowe
                                    punkty.
                                </h5>
                                <SmallDivider />
                                <h5>Punkty do zdobycia: {task.points}</h5>
                                <p>
                                    Przyznane punkty: <strong>nie</strong>{' '}
                                    {/*// todo: info from endpoint*/}
                                </p>{' '}
                                <SmallDivider />
                            </div>
                            <FullDivider />
                            <Formik
                                initialValues={{
                                    opinion: '',
                                    score: '3',
                                }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.opinion) errors.opinion = FIELD_REQUIRED;
                                    if (!values.score) errors.score = FIELD_REQUIRED;
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting, values, errors, handleSubmit }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Container>
                                            <Row className="mx-auto"></Row>
                                            <p>
                                                Jakie są Twoje wrażenia z tego rodziału? Co można
                                                zmienić, poprawić, a co było w porządku?
                                            </p>
                                            <FormikTextarea
                                                as="textarea"
                                                type="text"
                                                name="opinion"
                                            />

                                            <Row className="mt-4 w-80">
                                                {/*// todo: use mapper maybe*/}
                                                <IconColumn icons={[faThumbsDown, faThumbsDown]} />
                                                <IconColumn icons={[faThumbsDown]} />
                                                <IconColumn icons={[faFaceMeh]} />
                                                <IconColumn icons={[faThumbsUp]} />
                                                <IconColumn icons={[faThumbsUp, faThumbsUp]} />
                                            </Row>
                                            <Row className="mt-4 justify-content-center">
                                                <FormikRange
                                                    type="range"
                                                    min={1}
                                                    max={5}
                                                    name="score"
                                                ></FormikRange>
                                            </Row>

                                            <Row className="mt-4 d-flex justify-content-center">
                                                <Col
                                                    sm={12}
                                                    className="d-flex justify-content-center mb-2"
                                                >
                                                    <FormButton
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                    >
                                                        {isSubmitting ? (
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                            />
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
    );
}
