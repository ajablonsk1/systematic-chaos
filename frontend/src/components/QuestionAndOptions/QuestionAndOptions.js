import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClosedQuestionPage from './ClosedQuestionPage/ClosedQuestionPage';
import { getQuestion } from '../../utils/Api';
import { PageRoutes } from '../../utils/constants';
import Loader from '../Loader/Loader';
import { ContentWithBackground } from './QuestionAndOptionsStyle';
import OpenQuestionPage from './OpenQuestionPage/OpenQuestionPage';

function QuestionAndOptions() {
    const [question, setQuestion] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const { activityId: expeditionId, nodeId: questionId } = location.state;

    useEffect(() => {
        if (expeditionId == null || questionId == null) {
            navigate(PageRoutes.HOME);
        } else {
            setQuestion(getQuestion(+expeditionId, +questionId));
        }
    }, [questionId, expeditionId, navigate]);

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
