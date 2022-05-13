import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClosedQuestionPage from './ClosedQuestionPage/ClosedQuestionPage';
import { getQuestion } from '../../utils/Api';
import { PageRoutes } from '../../utils/constants';
import Loader from '../Loader/Loader';
import { ContentWithBackground } from './QuestionAndOptionsStyle';

function QuestionAndOptions() {
    const { expeditionId, questionId } = useParams();
    const [question, setQuestion] = useState();
    const navigate = useNavigate();

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
                        <div>hello</div>
                    ) : (
                        <ClosedQuestionPage
                            expeditionId={expeditionId}
                            question={question}
                        ></ClosedQuestionPage>
                    )}
                </>
            )}
        </ContentWithBackground>
    );
}

export default QuestionAndOptions;