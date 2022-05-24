import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../../utils/constants';
import { Answer, ButtonRow, QuestionCard } from '../QuestionAndOptionsStyle';

function ClosedQuestionPage(props) {
    const navigate = useNavigate();
    const answersParent = useRef(null);
    const [userAnswers, setUserAnswers] = useState([]);

    const updateUserAnswers = () => {
        // remove last element using slice, it's the confirm answer button
        const answers = Array.from(answersParent.current.children).slice(0, -1);
        const answersInputs = answers.map(answer => answer.children[0].children[0]);

        const choosenAnswers = answersInputs
            .filter(input => input.checked)
            .map(element => element.value);

        setUserAnswers(choosenAnswers);
    };

    const saveAnswers = () => {
        let acceptWarning = null;

        if (userAnswers.length === 0) {
            acceptWarning = window.confirm(
                'Nie wybrałeś żadnej odpowiedzi. Na pewno chcesz przejść dalej?'
            );
        }
        // if acceptWarning == null or true
        if (acceptWarning !== false) {
            // get actual answers list from expedition
            let actualAnswersList = JSON.parse(localStorage.getItem('userAnswers')) || [];

            // new answer from actual question
            let answerToAdd = {
                questionId: props.question.id,
                answers: userAnswers,
            };

            if (!actualAnswersList.find(answer => answer.questionId === answerToAdd.questionId)) {
                // save answer and go to next doors selection only if user didn't answer this question before
                actualAnswersList.push(answerToAdd);
                localStorage.setItem('userAnswers', JSON.stringify(actualAnswersList));
            }
            navigate(`${PageRoutes.QUESTION_SELECTION}`, {
                state: { activityId: props.expeditionId, nodeId: props.question.id },
            });
        }
    };

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
            <Col lg={4} className="py-lg-0 py-3" ref={answersParent}>
                {props.question.answers.map(answer => (
                    <Answer key={answer} className="mx-lg-0 mx-auto">
                        <Col xxl={1} xs={2} onChange={() => updateUserAnswers()}>
                            <input
                                name="answer"
                                type={props.question.multipleChoice ? 'checkbox' : 'radio'}
                                value={answer}
                            />
                            {/* <span className='checkmark'/> */}
                        </Col>
                        <Col xxl={11} xs={10}>
                            {answer}
                        </Col>
                    </Answer>
                ))}
                <ButtonRow>
                    <button style={{ marginBottom: '50px' }} onClick={() => saveAnswers()}>
                        Wyślij
                    </button>
                </ButtonRow>
            </Col>
        </Row>
    );
}

export default ClosedQuestionPage;
