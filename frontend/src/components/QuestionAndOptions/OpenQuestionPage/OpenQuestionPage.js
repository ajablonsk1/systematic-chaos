import React, { useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../../utils/constants';
import { ButtonRow, QuestionCard } from '../QuestionAndOptionsStyle';
import { UserAnswerArea } from './OpenQuestionStyle';

function fitAreaToContent(text) {
    const maxHeight = 300; // px
    text.style.height = '0';
    text.style.height = Math.min(text.scrollHeight, maxHeight) + 'px';
}

export default function OpenQuestionPage(props) {
    const userAnswer = useRef();
    const navigate = useNavigate();

    const saveAnswer = () => {
        let acceptWarning = null;

        if (userAnswer.current.value.length === 0) {
            acceptWarning = window.confirm(
                'Nie podałeś żadnej odpowiedzi. Czy na pewno chcesz przejść dalej?'
            );
        }
        // if acceptWarning == null or true
        if (acceptWarning !== false) {
            // get actual answers list from expedition
            // todo: get from db
            let actualAnswersList = JSON.parse(localStorage.getItem('userOpenAnswers')) || [];

            // new answer from actual question
            let answerToAdd = {
                questionId: props.question.id,
                answer: userAnswer.current.value,
            };

            // todo: use endpoint to save in db
            if (!actualAnswersList.find(answer => answer.questionId === answerToAdd.questionId)) {
                // save answer and go to next doors selection only if user didn't answer this question before
                actualAnswersList.push(answerToAdd);
                localStorage.setItem('userOpenAnswers', JSON.stringify(actualAnswersList));
            }

            navigate(`${PageRoutes.QUESTION_SELECTION}`, {
                state: { activityId: props.expeditionId, nodeId: props.question.id },
            });
        }
    };

    return (
        <Row>
            <Col xs={12}>
                <QuestionCard className="h-auto py-5">
                    <div>{props.question.category}</div>
                    <div>
                        <p>{props.question.content}</p>
                    </div>
                    <div>Punkty: {props.question.points}</div>
                </QuestionCard>
            </Col>
            <Col xs={12}>
                <UserAnswerArea
                    ref={userAnswer}
                    placeholder="Twoja odpowiedź..."
                    onInput={() => fitAreaToContent(userAnswer.current)}
                ></UserAnswerArea>
            </Col>
            <ButtonRow className="w-50">
                <button style={{ marginBottom: '50px' }} onClick={() => saveAnswer()}>
                    Wyślij
                </button>
            </ButtonRow>
        </Row>
    );
}
