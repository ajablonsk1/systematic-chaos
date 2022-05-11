import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { getQuestion } from '../../utils/Api';
import { PageRoutes } from '../../utils/constants';
import Loader from '../Loader/Loader';
import { Answer, ButtonRow, ContentWithBackground, QuestionCard } from './QuestionAndOptionsStyle';

function QuestionAndOptions() {
    const { expeditionId, questionId } = useParams();
    const [question, setQuestion] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (expeditionId == null || questionId == null) {
            navigate(PageRoutes.HOME);
        } else {
            setQuestion(getQuestion(+expeditionId, +questionId));
        }
    }, [questionId]);

    return (
        <ContentWithBackground>
            {question === undefined ? (
                <Loader />
            ) : (
                <Row style={{ margin: 0 }}>
                    <Col lg={8}>
                        <QuestionCard>
                            <div>{question.category}</div>
                            <div>
                                <p>{question.content}</p>
                            </div>
                            <div>Punkty: {question.points}</div>
                        </QuestionCard>
                    </Col>
                    <Col lg={4} className="py-lg-0 py-3">
                        {question.answers.map(answer => (
                            <Answer key={answer} className="mx-lg-0 mx-auto">
                                <Col xxl={1} xs={2}>
                                    <input
                                        name="answer"
                                        type={question.multipleChoice ? 'checkbox' : 'radio'}
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
                                        `${PageRoutes.QUESTION_SELECTION}/${expeditionId}/${question.id}`
                                    )
                                }
                            >
                                Wyślij
                            </button>
                        </ButtonRow>
                    </Col>
                </Row>
            )}
        </ContentWithBackground>
    );
}

export default QuestionAndOptions;
