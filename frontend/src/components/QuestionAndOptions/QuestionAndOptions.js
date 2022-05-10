import { Col, Row } from 'react-bootstrap';
import { Answer, ButtonRow, ContentWithBackground, QuestionCard } from './QuestionAndOptionsStyle';

function QuestionAndOptions({ props }) {
    const { category, answers, points, content, multipleChoice } = props;

    return (
        <ContentWithBackground>
            <Row style={{ height: '80vh' }}>
                <Col xs={8}>
                    <QuestionCard>
                        <div>{category}</div>
                        <div>
                            <p>{content}</p>
                        </div>
                        <div>Punkty: {points}</div>
                    </QuestionCard>
                </Col>
                <Col xs={4} className={'p-0'}>
                    {answers.map(answer => (
                        <Answer key={answer}>
                            <Col xs={1}>
                                <input name="answer" type={multipleChoice ? 'checkbox' : 'radio'} />
                                {/* <span className='checkmark'/> */}
                            </Col>
                            <Col xs={11}>{answer}</Col>
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
