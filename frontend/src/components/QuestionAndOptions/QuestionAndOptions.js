import { Col, Row } from 'react-bootstrap';
import { Answer, ButtonRow, ContentWithBackground, QuestionCard } from './QuestionAndOptionsStyle';

function QuestionAndOptions({ props }) {
    const { category, answers, points, content, multipleChoice } = props;

    return (
        <ContentWithBackground>
            <Row style={{ margin: 0 }}>
                <Col lg={8}>
                    <QuestionCard>
                        <div>{category}</div>
                        <div>
                            <p>{content}</p>
                        </div>
                        <div>Punkty: {points}</div>
                    </QuestionCard>
                </Col>
                <Col lg={4} className="py-lg-0 py-3">
                    {answers.map(answer => (
                        <Answer key={answer} className="mx-lg-0 mx-auto">
                            <Col xxl={1} xs={2}>
                                <input name="answer" type={multipleChoice ? 'checkbox' : 'radio'} />
                                {/* <span className='checkmark'/> */}
                            </Col>
                            <Col xxl={11} xs={10}>
                                {answer}
                            </Col>
                        </Answer>
                    ))}
                    <ButtonRow>
                        <button>Wyślij</button>
                    </ButtonRow>
                </Col>
            </Row>
        </ContentWithBackground>
    );
}

export default QuestionAndOptions;
