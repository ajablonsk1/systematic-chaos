import React, { useState, useEffect } from 'react';
import { Door, DoorColumn } from './QuestionSelectionDoorStyles';
import { Button, Row } from 'react-bootstrap';
import { ContentWithoutMargin } from '../App/AppGeneralStyles';
import { useNavigate, useParams } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';
import { getParentQuestions } from '../../utils/Api';
import Loader from '../Loader/Loader';
import ExpeditionSummary from '../ExpeditionSummary/ExpeditionSummary';

// if only one element of id -1 or -2 then do not generate doors but go to score screen
// will be done in routing after answering a question, so that we never get only the start or only the end node here

function generateDoor(question, navigate, expeditionId, noDoors) {
    return (
        <DoorColumn key={question.id} xl={12 / noDoors} md={12}>
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
    const { expeditionId, parentId } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState();

    useEffect(() => {
        if (parentId == null || expeditionId == null) {
            navigate(PageRoutes.HOME); //TODO: when ExpeditionInfo component will be ready, navigate to them
        } else {
            setQuestions(getParentQuestions(+parentId, +expeditionId));
        }
    }, [parentId, expeditionId, navigate]);

    return (
        <ContentWithoutMargin>
            {questions === undefined ? (
                <Loader />
            ) : (
                <>
                    {questions.find(q => q.id === -2) ? (
                        // TODO: think about better solution - displaying expedition summary using url "doors-selection/:id/:id" is weird
                        <ExpeditionSummary />
                    ) : (
                        <Row>
                            {questions.map((question, key) =>
                                generateDoor(question, navigate, expeditionId, questions.length)
                            )}
                        </Row>
                    )}
                </>
            )}
        </ContentWithoutMargin>
    );
}

export default QuestionSelectionDoor;
