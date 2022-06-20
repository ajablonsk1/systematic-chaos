import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClosedQuestionPage from './ClosedQuestionPage/ClosedQuestionPage';
import { PageRoutes } from '../../utils/constants';
import Loader from '../Loader/Loader';
import { ContentWithBackground } from './QuestionAndOptionsStyle';
import OpenQuestionPage from './OpenQuestionPage/OpenQuestionPage';
import StudentService from "../../services/student.service";

function QuestionAndOptions(props) {
    const [question, setQuestion] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    const { activityId: expeditionId, nodeId: questionId, taskResultId } = location.state;
    const remainingTime = props.remainingTime;
    // todo: why we use props and location ? use first or second option

    useEffect(() => {
        if (expeditionId == null || questionId == null || taskResultId == null) {
            navigate(PageRoutes.HOME);
        } else {
            StudentService.getQuestion(questionId).then(response => {console.log(response); setQuestion(response)});
            //setQuestion(getQuestion(+expeditionId, +questionId)); // todo: use endpoint
        }
    }, [questionId, expeditionId, navigate, taskResultId]);

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
                    {question.type === 'OPENED' ? (
                        <OpenQuestionPage expeditionId={expeditionId} question={question} taskResultId={taskResultId} />
                    ) : (
                        <ClosedQuestionPage expeditionId={expeditionId} question={question} taskResultId={taskResultId} />
                    )}
                </>
            )}
        </ContentWithBackground>
    );
}

export default QuestionAndOptions;
