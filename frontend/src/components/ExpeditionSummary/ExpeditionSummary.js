import React from 'react';
import { Row } from 'react-bootstrap';
import { SummaryContainer } from './ExpeditionSummaryStyle';
import { ButtonRow } from '../QuestionAndOptions/QuestionAndOptionsStyle';
import { useNavigate } from 'react-router-dom';
import { PageRoutes } from '../../utils/constants';

export default function ExpeditionSummary() {
    const navigate = useNavigate();
    return (
        <SummaryContainer>
            <Row className="m-0">
                <h2>Gratulacje, ukończyłeś ekspedycję!</h2>
            </Row>
            <Row className="m-0">
                <h3>Twój wynik:</h3>
            </Row>
            <Row className="mx-0 my-5 d-flex flex-column">
                <p style={{ fontSize: 20 }}>Liczba punktów razem:</p>
                <p style={{ fontSize: 20 }}>Punkty z pytań zamkniętych:</p>
                <p style={{ fontSize: 20 }}>Punkty z pytań otwartych: nieocenione</p>
            </Row>
            <Row>
                <ButtonRow>
                    <button className="w-100" onClick={() => navigate(PageRoutes.HOME)}>
                        Wróć do strony głównej
                    </button>
                </ButtonRow>
            </Row>
        </SummaryContainer>
    );
}
