import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { SummaryContainer } from './ExpeditionSummaryStyle';
import { ButtonRow } from '../QuestionAndOptions/QuestionAndOptionsStyle';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';
import { finishExpedition, timer } from '../../utils/storageManager';
import { getExpeditionPoints, getExpeditionPointsClosed } from '../../utils/Api';
import Loader from '../Loader/Loader';
import { getUserPoints } from '../../utils/pointsCalculator';
import { Content } from '../App/AppGeneralStyles';

export default function ExpeditionSummary() {
    const navigate = useNavigate();
    const [maxPoints, setMaxPoints] = useState();
    const [scoredPoints, setScoredPoints] = useState();
    const [closedQuestionPoints, setClosedQuestionPoints] = useState();
    const location = useLocation();
    const { expeditionId, remainingTime } = location.state;

    useEffect(() => {
        if (expeditionId == null) {
            navigate(PageRoutes.HOME);
        } else {
            setMaxPoints(getExpeditionPoints(expeditionId)); // todo: points from endpoint
            setScoredPoints(getUserPoints()); // todo points from endpoint
            setClosedQuestionPoints(getExpeditionPointsClosed(expeditionId)); // todo: points from endpoint
            localStorage.setItem('currentScore', getUserPoints()); // todo: delete it and send point to database

            // Moved removing question answers from localStorage to onClick navigate to fix a bug
            // Also starting the expedition clears answers

            //TODO: send user answers from open questions to the database (+ notification to the teacher)
        }
    }, [expeditionId, navigate]);

    const finishExpeditionAndGoHome = () => {
        finishExpedition(expeditionId);
        navigate(PageRoutes.HOME);
    };

    const showRemainingTime = () =>
        remainingTime > 60 ? timer(remainingTime).replace(':', 'min ') + 's' : remainingTime + 's';

    return (
        <Content>
            {maxPoints === undefined ? (
                <Loader />
            ) : (
                <SummaryContainer>
                    <Row className="m-0">
                        <h2>Gratulacje, ukończyłeś ekspedycję!</h2>
                    </Row>
                    <Row className="m-0">
                        <h3>Twój wynik:</h3>
                    </Row>
                    <Row className="mx-0 my-5 d-flex flex-column">
                        <p style={{ fontSize: 20 }}>
                            Liczba punktów razem:{' '}
                            <strong>
                                {scoredPoints}/{maxPoints}
                            </strong>
                        </p>
                        <p style={{ fontSize: 20 }}>
                            Punkty z pytań zamkniętych:{' '}
                            <strong>
                                {scoredPoints} / {closedQuestionPoints}
                            </strong>
                        </p>
                        <p style={{ fontSize: 20 }}>
                            Punkty z pytań otwartych:{' '}
                            <strong>0/{maxPoints - closedQuestionPoints}</strong> (nieocenione)
                        </p>
                        <p style={{ fontSize: 20 }}>
                            Ukończono: <strong>{showRemainingTime()}</strong> przed czasem.
                        </p>
                    </Row>
                    <Row>
                        <ButtonRow>
                            <button className="w-100" onClick={() => finishExpeditionAndGoHome()}>
                                Wróć do strony głównej
                            </button>
                        </ButtonRow>
                    </Row>
                </SummaryContainer>
            )}
        </Content>
    );
}
