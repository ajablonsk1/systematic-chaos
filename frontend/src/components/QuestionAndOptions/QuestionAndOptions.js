import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClosedQuestionPage from './ClosedQuestionPage/ClosedQuestionPage';
import { getQuestion } from '../../utils/Api';
import { PageRoutes } from '../../utils/constants';
import Loader from '../Loader/Loader';
import { ContentWithBackground } from './QuestionAndOptionsStyle';
import OpenQuestionPage from './OpenQuestionPage/OpenQuestionPage';
import { Timer } from '../QuestionSelectionDoor/Timer';
import { getRemainingTime, timer } from '../../utils/storageManager';

function QuestionAndOptions() {
    const [question, setQuestion] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const { activityId: expeditionId, nodeId: questionId } = location.state;
    const [remainingTimeInSeconds, setRemainingTimeInSeconds] = useState(
        getRemainingTime(+expeditionId)
    );
    const [remainingTime, setRemainingTime] = useState(timer(remainingTimeInSeconds));
    const [timerInterval, setTimerInterval] = useState();

    useEffect(() => {
        if (expeditionId == null || questionId == null) {
            navigate(PageRoutes.HOME);
        } else {
            setQuestion(getQuestion(+expeditionId, +questionId));
        }

        setTimerInterval(
            setInterval(function () {
                setRemainingTimeInSeconds(getRemainingTime(+expeditionId));
            }, 1000)
        );
    }, [questionId, expeditionId, navigate, remainingTime]);

    // complete the expedition and record user responses if the expedition has not been completed
    // before the timer runs out
    useEffect(() => {
        if (remainingTimeInSeconds === 0) {
            clearInterval(timerInterval);
            navigate(PageRoutes.EXPEDITION_SUMMARY, {
                state: { expeditionId: expeditionId },
            });
        } else {
            setRemainingTime(timer(remainingTimeInSeconds));
        }
    }, [remainingTimeInSeconds, expeditionId, navigate, remainingTime, timerInterval]);

    return (
        <ContentWithBackground>
            <Timer time={remainingTimeInSeconds}>{remainingTime}</Timer>
            {question === undefined ? (
                <Loader />
            ) : (
                <>
                    {question.type === 'open' ? (
                        <OpenQuestionPage expeditionId={expeditionId} question={question} />
                    ) : (
                        <ClosedQuestionPage expeditionId={expeditionId} question={question} />
                    )}
                </>
            )}
        </ContentWithBackground>
    );
}

export default QuestionAndOptions;
