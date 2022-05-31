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
import { getActivityImg, getActivityTypeName } from '../../utils/constants';
import { useLocation } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { InfoContainer } from '../ActivityInfo/InfoContainer';
import { getSurveyTask } from '../../storage/surveyTask';
import { Formik } from 'formik';
import { Row, Col, Button, Spinner, Form, Container } from 'react-bootstrap';

export default function FeedbackTask() {
    const location = useLocation();
    //also chapterID later
    const { activityId: taskId } = location.state;
    console.log(taskId);
    //later with correct ids
    const task = getSurveyTask(null, taskId);

    console.log(task);

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
                                    Przyznane punkty: <strong>nie</strong>
                                </p>{' '}
                                <SmallDivider />
                            </div>
                            <FullDivider />
                            <Formik
                                initialValues={{
                                    opinion: '',
                                    score: '',
                                }}
                                validate={values => {
                                    const errors = {};
                                    if (!values.opinion) errors.opinion = 'Pole wymagane.';
                                    if (!values.score) errors.score = 'Pole wymagane';
                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    alert(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting, values, errors }) => (
                                    <Form>
                                        <Container>
                                            <Row className="mx-auto"></Row>

                                            <Row className="mt-4 d-flex justify-content-center">
                                                <Col
                                                    sm={12}
                                                    className="d-flex justify-content-center mb-2"
                                                >
                                                    <Button
                                                        type="submit"
                                                        disabled={isSubmitting}
                                                        style={{
                                                            backgroundColor: 'var(--button-green)',
                                                            borderColor: 'var(--button-green)',
                                                        }}
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
                                                    </Button>
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
