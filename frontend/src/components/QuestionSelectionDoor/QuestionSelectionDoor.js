import React, { useState, useEffect } from 'react';
import { Door, DoorColumn } from './QuestionSelectionDoorStyles';
import { Button, Row } from 'react-bootstrap';
import { Content } from '../App/AppGeneralStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';
import { getRemainingTime, timer } from '../../utils/storageManager';
import { getParentQuestions } from '../../utils/Api';
import Loader from '../Loader/Loader';
import { Timer } from './Timer';

// if only one element of id -1 or -2 then do not generate doors but go to score screen
// will be done in routing after answering a question, so that we never get only the start or only the end node here

function generateDoor(question, navigate, expeditionId, noDoors) {
    return (
        <DoorColumn key={question.id} xl={12 / noDoors} md={12}>
            <Row className="mx-auto">
                <h3>{question.difficulty?.toUpperCase()}</h3>
            </Row>

            <Row>
                <Door />
            </Row>

            <Row className="mx-auto">
                <h3>{question.category?.toUpperCase()}</h3>
            </Row>

            <Row className="mx-auto">
                <Button
                    onClick={() =>
                        navigate(`${PageRoutes.QUESTION_ANSWER}`, {
                            state: { activityId: expeditionId, nodeId: question.id },
                        })
                    }
                >
                    Wybierz
                </Button>
            </Row>
        </DoorColumn>
    );
}

function QuestionSelectionDoor() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState();
    const location = useLocation();
    const { activityId: expeditionId, nodeId: parentId } = location.state;
    const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(
        getRemainingTime(+expeditionId)
    );
    const [remainingTime, setRemainingTime] = useState(timer(remainingTimeInSeconds));
    const [timerInterval, setTimerInterval] = useState();

    useEffect(() => {
        if (parentId == null || expeditionId == null) {
            navigate(PageRoutes.HOME); //TODO: when ExpeditionInfo component will be ready, navigate to them
        } else {
            setQuestions(getParentQuestions(+parentId, +expeditionId));
        }

        setTimerInterval(
            setInterval(function () {
                setRemainingTimeInSeconds(getRemainingTime(+expeditionId));
            }, 1000)
        );
    }, [parentId, expeditionId, navigate]);

    // complete the expedition and record user responses if the expedition has not been completed
    // before the timer runs out
    useEffect(() => {
        if (remainingTimeInSeconds === 0 || questions?.find(q => q.id === -2)) {
            clearInterval(timerInterval);
            navigate(PageRoutes.EXPEDITION_SUMMARY, {
                state: { 
                    expeditionId: expeditionId,
                    remainingTime: remainingTimeInSeconds     
                },
            });
        } else {
            setRemainingTime(timer(remainingTimeInSeconds));
        }
    }, [remainingTimeInSeconds, expeditionId, navigate, remainingTime, timerInterval, questions]);

    return (
        <Content>
            {!questions ? (
                <Loader />
            ) : (
                <>
                    <Timer time={remainingTimeInSeconds}>{remainingTime}</Timer>
                    <Row className="m-0">
                        {questions.map((question, key) =>
                            generateDoor(question, navigate, expeditionId, questions.length)
                        )}
                    </Row>
                </>
            )}
        </Content>
    );
}

export default QuestionSelectionDoor;
