import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClosedQuestionPage from './ClosedQuestionPage/ClosedQuestionPage';
import { getQuestion } from '../../utils/Api';
import { PageRoutes } from '../../utils/constants';
import Loader from '../Loader/Loader';
import { ContentWithBackground } from './QuestionAndOptionsStyle';
import OpenQuestionPage from './OpenQuestionPage/OpenQuestionPage';

function QuestionAndOptions(props) {
    const [question, setQuestion] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const { activityId: expeditionId, nodeId: questionId } = location.state;
    const remainingTime = props.remainingTime;

    useEffect(() => {
        if (expeditionId == null || questionId == null) {
            navigate(PageRoutes.HOME);
        } else {
            setQuestion(getQuestion(+expeditionId, +questionId));
        }
    }, [questionId, expeditionId, navigate]);

    // complete the expedition and record user responses if the expedition has not been completed
    // before the timer runs out
    useEffect(() => {
        if (remainingTime === 0) {
            navigate(PageRoutes.EXPEDITION_SUMMARY, {
                state: {
                    expeditionId: expeditionId,
                    remainingTime: remainingTime,
                },
            });
        }
    }, [expeditionId, navigate, remainingTime]);

    return (
        <ContentWithBackground>
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
