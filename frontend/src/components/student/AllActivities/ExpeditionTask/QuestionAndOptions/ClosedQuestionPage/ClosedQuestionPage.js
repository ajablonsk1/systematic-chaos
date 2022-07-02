import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Answer, ButtonRow, QuestionCard } from '../QuestionAndOptionsStyle';
import answerSaver from "../answerSaver";
import {useNavigate} from "react-router-dom";

function ClosedQuestionPage(props) {
    const answersParent = useRef(null);
    const navigate = useNavigate();

    // this array should only have an id
    const [userAnswers, setUserAnswers] = useState([]);

    const updateUserAnswers = () => {
        // remove last element using slice, it's the confirm answer button
        const answers = Array.from(answersParent.current.children).slice(0, -1);
        const answersInputs = answers.map(answer => answer.children[0].children[0]);

        const chosenAnswers = answersInputs
            .filter(input => input.checked)
            .map(element => ({id: +element.value}));

        setUserAnswers(chosenAnswers);
    };

    const saveAnswer = () => {
        answerSaver(userAnswers, props.question.type, props.taskResultId, props.question.id, props.expeditionId, navigate);
    }

    return (
        <Row
            style={{
                margin: 0,
            }}
        >
            <Col lg={8}>
                <QuestionCard>
                    <div>{props.question.hint}</div>
                    <div>
                        <p>{props.question.content}</p>
                    </div>
                    <div>Punkty: {props.question.points}</div>
                </QuestionCard>
            </Col>
            <Col lg={4} className="py-lg-0 py-3" ref={answersParent}>
                {props.question.options.map(answer => (
                    <Answer key={answer.id} className="mx-lg-0 mx-auto">
                        <Col xxl={1} xs={2} onChange={() => updateUserAnswers()}>
                            <input
                                name="answer"
                                type={props.question.type === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'}
                                value={answer.id}
                            />
                            {/* <span className='checkmark'/> */}
                        </Col>
                        <Col xxl={11} xs={10}>
                            {answer.content}
                        </Col>
                    </Answer>
                ))}
                <ButtonRow>
                    <button style={{ marginBottom: '50px' }} onClick={() => saveAnswer()}>
                        Wyślij
                    </button>
                </ButtonRow>
            </Col>
        </Row>
    );
}

export default ClosedQuestionPage;
