import React, { useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../../utils/constants';
import { Answer, ButtonRow, QuestionCard } from '../QuestionAndOptionsStyle';
import StudentService from "../../../services/student.service";

function ClosedQuestionPage(props) {
    const navigate = useNavigate();
    const answersParent = useRef(null);
    //ta tablica powinna mieć tylko id
    const [userAnswers, setUserAnswers] = useState([]);

    const updateUserAnswers = () => {
        // remove last element using slice, it's the confirm answer button
        const answers = Array.from(answersParent.current.children).slice(0, -1);
        const answersInputs = answers.map(answer => answer.children[0].children[0]);

        const chosenAnswers = answersInputs
            .filter(input => input.checked)
            .map(element => ({id: +element.value}));

        console.log(chosenAnswers);
        setUserAnswers(chosenAnswers);
    };

    const saveAnswers = (taskResultId) => {
        let acceptWarning = null;

        if (userAnswers.length === 0) {
            acceptWarning = window.confirm(
                'Nie wybrałeś żadnej odpowiedzi. Na pewno chcesz przejść dalej?'
            );
        }

        // todo: save answers is exactly the same as in open question so use a hook
        // if acceptWarning == null or true
        if (acceptWarning !== false) {
            let result = null;

            if(props.question.type === 'SINGLE_CHOICE'){
                result = {
                    resultId: taskResultId,
                    questionId: props.question.id,
                    answerForm: {
                        option: userAnswers[0],
                    },
                }
            } else {
                result = {
                    resultId: taskResultId,
                    questionId: props.question.id,
                    answerForm: {
                        options: userAnswers,
                    },
                }
            }

            // // get actual answers list from expedition
            // // todo: use endpoint
            // let actualAnswersList = JSON.parse(localStorage.getItem('userAnswers')) || [];
            // console.log(actualAnswersList);

            // // new answer from actual question
            // let answerToAdd = {
            //     questionId: props.question.id,
            //     answers: userAnswers,
            // };



            // // todo: use endpoint
            // if (!actualAnswersList.find(answer => answer.questionId === answerToAdd.questionId)) {
            //     // save answer and go to next doors selection only if user didn't answer this question before
            //     actualAnswersList.push(answerToAdd);
            //     console.log(actualAnswersList);
            //     localStorage.setItem('userAnswers', JSON.stringify(actualAnswersList));
            // }

            StudentService.saveAnswer(result).then(response => {
                console.log(response);
                navigate(`${PageRoutes.QUESTION_SELECTION}`, {
                    state: { activityId: props.expeditionId, nodeId: props.question.id, taskResultId },
                });
            })
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
                    <button style={{ marginBottom: '50px' }} onClick={() => saveAnswers(props.taskResultId)}>
                        Wyślij
                    </button>
                </ButtonRow>
            </Col>
        </Row>
    );
}

export default ClosedQuestionPage;
