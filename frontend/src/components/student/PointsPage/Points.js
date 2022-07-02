import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Content } from '../../App/AppGeneralStyles';
import PercentageCircle from './ChartAndStats/PercentageCircle';
import PointsTable from './Table/PointsTable';

export default function Points() {
    const points = 529;
    const maxPoints = 1000;
    const percentageValue = Math.round(100 * (points / maxPoints));

    return (
        <Content>
            <Row className="m-0">
                <Col className="p-0">
                    <PercentageCircle
                        percentageValue={percentageValue}
                        points={points}
                        maxPoints={maxPoints}
                    />
                </Col>
                <Col className="p-0 justify-content-center d-flex flex-column">
                    <h5>
                        <strong>Twój wynik to: {points}pkt</strong>
                    </h5>
                    <h5>
                        <strong>Co stanowi: {percentageValue}%</strong>
                    </h5>
                    <h5>
                        <strong>Do kolejnego poziomu wymagane jest: {maxPoints}pkt</strong>
                    </h5>
                </Col>
            </Row>
            <Row className="m-3">
                <h2 className="mx-auto">Ostatnio zdobyte punkty</h2>
                <PointsTable />
            </Row>
        </Content>
    );
}
