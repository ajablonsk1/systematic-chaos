import React from 'react';

import { Container, Row } from 'react-bootstrap';
import { getActivityImg } from '../../../utils/constants';
import { LegendCol } from './LegendStyles';

function Legend(props) {
    return (
        <Container>
            <Row className="m-0">
                <LegendCol lg={3} md={6} xs={12} className="my-2">
                    <div>
                        <img src={getActivityImg('expedition')} alt="Ekspedycja" />
                        <p>Ekspedycja</p>
                    </div>
                </LegendCol>
                <LegendCol lg={3} md={6} xs={12} className="my-2">
                    <div>
                        <img src={getActivityImg('task')} alt="Zadanie bojowe" />
                        <p>Zadanie bojowe</p>
                    </div>
                </LegendCol>
                <LegendCol lg={3} md={6} xs={12} className="my-2">
                    <div>
                        <img src={getActivityImg('survey')} alt="Wywiad" />
                        <p>Wywiad</p>
                    </div>
                </LegendCol>
                <LegendCol lg={3} md={6} xs={12} className="my-2">
                    <div>
                        <img src={getActivityImg('information')} alt="Wytyczne" />
                        <p>Wytyczne</p>
                    </div>
                </LegendCol>
            </Row>
        </Container>
    );
}

export default Legend;
