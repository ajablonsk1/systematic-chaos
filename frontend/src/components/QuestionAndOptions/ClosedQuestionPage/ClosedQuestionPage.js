import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../../utils/constants';
import { Answer, ButtonRow, QuestionCard } from '../QuestionAndOptionsStyle';

function ClosedQuestionPage(props) {
    const navigate = useNavigate();

    return (
        <Row
            style={{
                margin: 0,
            }}
        >
            <Col lg={8}>
                <QuestionCard>
                    <div>{props.question.category}</div>
                    <div>
                        <p>{props.question.content}</p>
                    </div>
                    <div>Punkty: {props.question.points}</div>
                </QuestionCard>
            </Col>
            <Col lg={4} className="py-lg-0 py-3">
                {props.question.answers.map(answer => (
                    <Answer key={answer} className="mx-lg-0 mx-auto">
                        <Col xxl={1} xs={2}>
                            <input
                                name="answer"
                                type={props.question.multipleChoice ? 'checkbox' : 'radio'}
                            />
                            {/* <span className='checkmark'/> */}
                        </Col>
                        <Col xxl={11} xs={10}>
                            {answer}
                        </Col>
                    </Answer>
                ))}
                <ButtonRow>
                    <button
                        onClick={() =>
                            // todo: send answer
                            navigate(
                                `${PageRoutes.QUESTION_SELECTION}/${props.expeditionId}/${props.question.id}`
                            )
                        }
                    >
                        Wyślij
                    </button>
                </ButtonRow>
            </Col>
        </Row>
    );
}

export default ClosedQuestionPage;
