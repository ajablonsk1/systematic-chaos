import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { SummaryContainer } from './ExpeditionSummaryStyle';
import { ButtonRow } from '../QuestionAndOptions/QuestionAndOptionsStyle';
import { useNavigate, useParams } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';
import { getExpeditionPoints, getExpeditionPointsClosed } from '../../utils/Api';
import Loader from '../Loader/Loader';
import { getUserPoints } from '../../utils/pointsCalculator';

export default function ExpeditionSummary() {
    const navigate = useNavigate();
    const { expeditionId } = useParams();
    const [maxPoints, setMaxPoints] = useState();
    const [scoredPoints, setScoredPoints] = useState();
    const [closedQuestionPoints, setClosedQuestionPoints] = useState();

    useEffect(() => {
        if (expeditionId == null) {
            navigate(PageRoutes.HOME);
        } else {
            setMaxPoints(getExpeditionPoints(expeditionId));
            setScoredPoints(getUserPoints());
            setClosedQuestionPoints(getExpeditionPointsClosed(expeditionId));
        }
    }, [expeditionId, navigate]);

    return (
        <SummaryContainer>
            {maxPoints === undefined ? (
                <Loader />
            ) : (
                <>
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
                    </Row>
                    <Row>
                        <ButtonRow>
                            <button className="w-100" onClick={() => navigate(PageRoutes.HOME)}>
                                Wróć do strony głównej
                            </button>
                        </ButtonRow>
                    </Row>
                </>
            )}
        </SummaryContainer>
    );
}
