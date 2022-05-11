import { Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react/cjs/react.production.min';
import { useState } from 'react/cjs/react.production.min';
import { getQuestion } from '../../utils/Api';
import { PageRoutes } from '../../utils/constants';
import { Answer, ButtonRow, ContentWithBackground, QuestionCard } from './QuestionAndOptionsStyle';

function QuestionAndOptions() {
    const { expeditionId, questionId } = useParams();
    const [{ id, category, answers, points, content, multipleChoice }, setQuestion] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (expeditionId == null || questionId == null) {
            navigate(PageRoutes.HOME);
        } else {
            setQuestion(getQuestion(+expeditionId, +questionId));
        }
    }, [
        expeditionId,
        id,
        category,
        answers,
        points,
        content,
        multipleChoice,
        questionId,
        navigate,
    ]);

    return (
        <ContentWithBackground>
            <Row style={{ margin: 0 }}>
                <Col lg={8}>
                    <QuestionCard>
                        <div>{category}</div>
                        <div>
                            <p>{content}</p>
                        </div>
                        <div>Punkty: {points}</div>
                    </QuestionCard>
                </Col>
                <Col lg={4} className="py-lg-0 py-3">
                    {answers.map(answer => (
                        <Answer key={answer} className="mx-lg-0 mx-auto">
                            <Col xxl={1} xs={2}>
                                <input name="answer" type={multipleChoice ? 'checkbox' : 'radio'} />
                                {/* <span className='checkmark'/> */}
                            </Col>
                            <Col xxl={11} xs={10}>
                                {answer}
                            </Col>
                        </Answer>
                    ))}
                    <ButtonRow>
                        <button
                            onClick={() =>
                                // todo: send answer
                                navigate(`${PageRoutes.QUESTION_SELECTION}/${expeditionId}/${id}`)
                            }
                        >
                            Wyślij
                        </button>
                    </ButtonRow>
                </Col>
            </Row>
        </ContentWithBackground>
    );
}

export default QuestionAndOptions;
