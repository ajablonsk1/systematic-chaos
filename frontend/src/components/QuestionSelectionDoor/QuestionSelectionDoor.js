import React from 'react';
import { Door, DoorColumn } from './QuestionSelectionDoorStyles';
import { Button, Row } from 'react-bootstrap';
import { ContentWithoutMargin } from '../App/AppGeneralStyles';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.production.min';
import { PageRoutes } from '../../utils/constants';
import { useState } from 'react/cjs/react.production.min';
import { getParentQuestions } from '../../utils/Api';
import Loader from '../Loader/Loader';
import ExpeditionSummary from '../ExpeditionSummary/ExpeditionSummary';

// if only one element of id -1 or -2 then do not generate doors but go to score screen
// will be done in routing after answering a question, so that we never get only the start or only the end node here

function generateDoor(question, key, navigate, expeditionId) {
    return (
        <DoorColumn key={key} xl={4} md={12}>
            <Row className="mx-auto">
                <h3>{question.difficulty.toUpperCase()}</h3>
            </Row>

            <Row>
                <Door />
            </Row>

            <Row className="mx-auto">
                <h3>{question.category.toUpperCase()}</h3>
            </Row>

            <Row className="mx-auto">
                <Button
                    onClick={() =>
                        navigate(`${PageRoutes.QUESTION_ANSWER}/${expeditionId}/${question.id}`)
                    }
                >
                    Wybierz
                </Button>
            </Row>
        </DoorColumn>
    );
}

function QuestionSelectionDoor() {
    const { expeditionId, parentQuestionId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState();

    useEffect(() => {
        if (parentQuestionId == null || expeditionId == null) {
            navigate(PageRoutes.HOME); //TODO: when ExpeditionInfo component will be ready, navigate to them
        } else {
            console.log(
                parentQuestionId,
                typeof parentQuestionId,
                +parentQuestionId,
                typeof +parentQuestionId
            );

            setQuestions(getParentQuestions(+parentQuestionId, +expeditionId));
            console.log(questions);
        }
    }, [parentQuestionId, questions, navigate, expeditionId]);

    return (
        <ContentWithoutMargin>
            {parentQuestionId === undefined && expeditionId === undefined ? (
                <Loader />
            ) : (
                <>
                    {questions.includes(-2) ? (
                        <ExpeditionSummary />
                    ) : (
                        <Row>
                            {questions.map((question, key) =>
                                generateDoor(question, key, navigate, expeditionId)
                            )}
                        </Row>
                    )}
                </>
            )}
        </ContentWithoutMargin>
    );
}

export default QuestionSelectionDoor;
